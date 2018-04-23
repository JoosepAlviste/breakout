import GameObject from './GameObject';
import { RectangleCollider } from '../collision/colliders';
import { ctx } from '../canvas';
import { defaultColor, primary } from '../config/colors';

class Brick extends GameObject {
  constructor({ x, y, width, height }) {
    super({ x, y });

    this.width = width;
    this.height = height;

    this.collider = new RectangleCollider({
      x, y, width, height, name: 'Brick', object: this,
    });
  }

  update(dt) {
    this.collider.update({});
  }

  draw() {
    const { x, y, width, height } = this;

    ctx.fillStyle = primary;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = defaultColor;
  }
}

export default Brick;
