import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { primary, defaultColor } from '../config/colors';
import { BALL_RADIUS } from '../config';
import { CircleCollider } from '../collision/colliders';
import { calculateAdjacentSide, calculateOppositeSide } from '../utils/trigonometry';

/**
 * @property {number} radius
 * @property {number} vx
 * @property {number} vy
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
    let { x, y, v, angle, radius } = this;

    let vx = Math.abs(calculateOppositeSide({ angle, hypotenuse: v }));
    let vy = Math.abs(calculateAdjacentSide({ angle, hypotenuse: v }));

    if (angle < Math.PI) {
      vy *= -1;
    }

    if (angle > Math.PI / 2 && angle < Math.PI * 3 / 2) {
      vx *= -1;
    }

    let dx = vx * dt;
    let dy = vy * dt;

    if (this.collider.collidesWith('Paddle')) {
      this._mirrorVertically();
    } else if (y + dy < radius) {
      this._mirrorVertically();
    } else if (y + dy > canvas.clientHeight - radius) {
      this._game.gameOver();
    }

    if (this.collider.collidesWith('Brick')) {
      const brick = this.collider.getCollisionWith('Brick');

      const botDistance = Math.abs(brick.y + brick.height - this.y);
      const topDistance = Math.abs(brick.y - this.y);
      const leftDistance = Math.abs(brick.x - this.x);
      const rightDistance = Math.abs(brick.x + brick.width - this.x);

      if (botDistance <= leftDistance && botDistance <= rightDistance) {
        this._mirrorVertically();
      } else if (topDistance <= leftDistance && topDistance <= rightDistance) {
        this._mirrorVertically();
      } else {
        this._mirrorHorizontally();
      }

      brick.dead = true;
    }

    if (x + dx < radius || x + dx > canvas.clientWidth - radius) {
      this._mirrorHorizontally();
    }

    vx = Math.abs(calculateOppositeSide({ angle: this.angle, hypotenuse: this.v }));
    vy = Math.abs(calculateAdjacentSide({ angle: this.angle, hypotenuse: this.v }));

    if (this.angle < Math.PI) {
      vy *= -1;
    }

    if (this.angle > Math.PI / 2 && this.angle < Math.PI * 3 / 2) {
      vx *= -1;
    }

    dx = vx * dt;
    dy = vy * dt;

    this.x = x + dx;
    this.y = y + dy;

    this.collider.update({ x: this.x, y: this.y });
  }

  draw() {
    const { x, y, radius } = this;

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = defaultColor;
  }

  _mirrorHorizontally() {
    this.angle = -this.angle + Math.PI;
    if (this.angle < 0) {
      this.angle = (this.angle % (Math.PI * 2)) + Math.PI * 2
    }
  }

  _mirrorVertically() {
    this.angle = -this.angle;
    if (this.angle < 0) {
      this.angle = (this.angle % (Math.PI * 2)) + Math.PI * 2
    }
  }
}

export default Ball;
