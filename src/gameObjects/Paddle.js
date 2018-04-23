import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { defaultColor, primary } from '../config/colors';
import { RectangleCollider } from '../collision/colliders';

/**
 * The Paddle game object.
 *
 * @property {number} x
 * @property {number} y
 * @property {Controls} controls
 * @property {number} _width
 * @property {number} _height
 */
class Paddle extends GameObject {

  /**
   * @param {number} x
   * @param {number} y
   * @param {Controls} controls
   * @param {number} width
   * @param {number} height
   */
  constructor({ x, y, controls, width = 100, height = 10 }) {
    super({ x, y });

    this.controls = controls;
    this._width = width;
    this._height = height;
    this.vx = 500;

    this.x = (canvas.clientWidth - this._width) / 2;
    this.y = (canvas.clientHeight - this._height);

    this.collider = new RectangleCollider({
      x: this.x,
      y: this.y,
      width: this._width,
      height: this._height,
      name: 'Paddle',
      object: this,
    });
  }

  update(dt) {
    const { vx } = this;
    const dx = vx * dt;

    if (this.controls.isLeft() && this.x > 0) {
      this.x -= dx;
    }

    if (this.controls.isRight()
      && this.x + this._width < canvas.clientWidth) {
      this.x += dx;
    }

    this.collider.update({ x: this.x });
  }

  draw() {
    const { x, y, _width, _height } = this;

    ctx.fillStyle = primary;
    ctx.fillRect(x, y, _width, _height);
    ctx.fillStyle = defaultColor;
  }
}

export default Paddle;
