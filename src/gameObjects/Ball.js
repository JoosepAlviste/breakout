import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { primary, defaultColor } from '../config/colors';
import { BALL_RADIUS } from '../config';
import { CircleCollider } from '../collision/colliders';

class Ball extends GameObject {
  constructor({ x, y, radius = BALL_RADIUS, vx = 250, vy = -250 }) {
    super({ x, y });

    this.radius = radius;
    this.vx = vx;
    this.vy = vy;

    this.collider = new CircleCollider({ x, y, radius, name: 'Ball' });
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
      // TODO: Dead
      window.location.reload();
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
