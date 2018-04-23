import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { primary, defaultColor } from '../config/colors';
import { BALL_RADIUS } from '../config';
import { CircleCollider } from '../collision/colliders';
import { calculateAdjacentSide, calculateOppositeSide } from '../utils/trigonometry';

/**
 * @property {number} radius
 * @property {number} v
 * @property {number} angle
 * @property {Game} _game
 */
class Ball extends GameObject {
  constructor({ x, y, radius = BALL_RADIUS, v = 250, angle = Math.PI / 4, game }) {
    super({ x, y });

    this.radius = radius;
    this.v = v;
    this.angle = angle;
    this._game = game;

    this.collider = new CircleCollider({ x, y, radius, name: 'Ball', object: this });
  }

  update(dt) {
    const { x, y, v, radius } = this;

    // Calculate initial coordinate changes
    let dx = calculateAdjacentSide({ angle: this.angle, hypotenuse: v }) * dt;
    let dy = -calculateOppositeSide({ angle: this.angle, hypotenuse: v }) * dt;

    // Collision with the floor - Game Over
    if (y + dy > canvas.clientHeight - radius) {
      this._game.gameOver();
    }

    // Collision with the Paddle
    if (this.collider.collidesWith('Paddle')) {
      this._mirrorVertically();
    }

    this._checkBrickCollision();

    // Bounce off of walls
    if (x + dx < radius || x + dx > canvas.clientWidth - radius) {
      this._mirrorHorizontally();
    }
    if (y + dy < radius) {
      this._mirrorVertically();
    }

    // Recalculate the changes because we might have changed something (angle)
    dx = calculateAdjacentSide({ angle: this.angle, hypotenuse: v }) * dt;
    dy = -calculateOppositeSide({ angle: this.angle, hypotenuse: v }) * dt;

    this.x = x + dx;
    this.y = y + dy;

    this.collider.update({ x: this.x, y: this.y });
  }

  draw() {
    const { x, y, radius } = this;

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = defaultColor;
  }

  /**
   * Mirror the angle horizontally to simulate bouncing off of a vertical wall.
   */
  _mirrorHorizontally() {
    this.angle = -this.angle + Math.PI;
    if (this.angle < 0) {
      this.angle = (this.angle % (Math.PI * 2)) + Math.PI * 2
    }
  }

  /**
   * Mirror the angle vertically to simulate bouncing off of a horizontal wall.
   */
  _mirrorVertically() {
    this.angle = -this.angle;
    if (this.angle < 0) {
      this.angle = (this.angle % (Math.PI * 2)) + Math.PI * 2;
    }
  }

  _checkBrickCollision() {
    if (this.collider.collidesWith('Brick')) {
      const { x, y } = this;

      const brick = this.collider.getCollisionWith('Brick');

      if (x >= brick.x && x <= brick.x + brick.width) {
        this._mirrorVertically();
      } else if (y >= brick.y && y <= brick.y + brick.height) {
        this._mirrorHorizontally();
      } else {
        // In the corner, we want to bounce back the way we came
        this._mirrorVertically();
        this._mirrorHorizontally();
      }

      brick.die();
    }
  }
}

export default Ball;
