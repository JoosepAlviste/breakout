import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { primary, defaultColor } from '../config/colors';
import { BALL_RADIUS } from '../config';

class Ball extends GameObject {
  constructor(x, y) {
    super(x, y);

    this.radius = BALL_RADIUS;
    this.vx = 250;
    this.vy = -250;
  }

  _update(dt) {
    const { x, y, vx, vy, radius } = this;

    const dx = vx * dt;
    const dy = vy * dt;

    if (x + dx < radius || x + dx > canvas.clientWidth - radius) {
      this.vx *= -1;
    }

    if (y + dy < radius || y + dy > canvas.clientHeight - radius) {
      this.vy *= -1;
    }

    this.x = x + dx;
    this.y = y + dy;
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
