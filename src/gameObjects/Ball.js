import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { primary, defaultColor } from '../config/colors';
import { BALL_RADIUS } from '../config';
import { CircleCollider } from '../collision/colliders';

/**
 * @property {number} radius
 * @property {number} vx
 * @property {number} vy
 * @property {Game} _game
 */
class Ball extends GameObject {
  constructor({ x, y, radius = BALL_RADIUS, vx = 250, vy = -250, game }) {
    super({ x, y });

    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this._game = game;

    this.collider = new CircleCollider({ x, y, radius, name: 'Ball', object: this });
  }

  _update(dt) {
    let { x, y, vx, vy, radius } = this;

    let dx = vx * dt;
    let dy = vy * dt;

    if (this.collider.collidesWith('Paddle')) {
      this.vy *= -1;
    } else if (y + dy < radius) {
      this.vy *= -1;
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
        this.vy *= -1;
      } else if (topDistance <= leftDistance && topDistance <= rightDistance) {
        this.vy *= -1;
      } else {
        this.vx *= -1;
      }

      brick.dead = true;
    }

    vy = this.vy;
    vx = this.vx;

    dx = vx * dt;
    dy = vy * dt;

    if (x + dx < radius || x + dx > canvas.clientWidth - radius) {
      this.vx *= -1;
    }

    this.x = x + dx;
    this.y = y + dy;

    this.collider.update({ x: this.x, y: this.y });
  }

  _draw() {
    const { x, y, radius } = this;

    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = defaultColor;
  }
}

export default Ball;
