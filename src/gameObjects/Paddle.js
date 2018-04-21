import GameObject from './GameObject';
import { ctx, canvas } from '../canvas';
import { defaultColor, primary } from '../config/colors';
import { RectangleCollider } from '../collision/colliders';
import KEYS from '../utils/keys';

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
   */
  constructor({ x, y, controls }) {
    super({ x, y });

    this.controls = controls;
    this._width = 100;
    this._height = 10;
    this.vx = 500;

    this.x = (canvas.clientWidth - this._width) / 2;
    this.y = (canvas.clientHeight - this._height);

    this.collider = new RectangleCollider({
      x: this.x,
      y: this.y,
      width: this._width,
      height: this._height,
      name: 'Paddle',
    });
  }

  _update(dt) {
    const { vx } = this;
    const dx = vx * dt;

    if (this.controls.isDown(KEYS.LEFT_ARROW) && this.x > 0) {
      this.x -= dx;
    }

    if (this.controls.isDown(KEYS.RIGHT_ARROW)
      && this.x + this._width < canvas.clientWidth) {
      this.x += dx;
    }

    this.collider.update({ x: this.x });
  }

  _draw() {
    const { x, y, _width, _height } = this;

    ctx.fillStyle = primary;
    ctx.fillRect(x, y, _width, _height);
    ctx.fillStyle = defaultColor;
  }
}

export default Paddle;
