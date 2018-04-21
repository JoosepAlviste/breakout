import { Ball } from './gameObjects';
import { ctx, canvas } from './canvas';
import { timestamp, calculateDeltaTime } from './utils/timestamp';
import { BALL_RADIUS } from './config';

/**
 * The main Game class. Contains the game loop logic.
 *
 * @property {GameObject[]} gameObjects
 *
 * @property {number} _dt - calculate timestamp difference in seconds
 * @property {number} _now
 * @property {number} _last
 * @property {number} _timeStep
 */
class Game {
  constructor() {
    this.gameObjects = [];

    this._dt = 0;
    this._now = timestamp();
    this._last = this._now;
    this._timeStep = 1 / 60;

    this._frame = this._frame.bind(this);
  }

  start() {
    const ball = new Ball(
      (canvas.clientWidth + BALL_RADIUS) / 2,
      canvas.clientHeight - BALL_RADIUS - 20
    );
    this.gameObjects.push(ball);

    console.log(this.gameObjects);

    requestAnimationFrame(this._frame);
  }

  _update(dt) {
    this.gameObjects.forEach(object => object._update(dt));
  }

  _draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    this.gameObjects.forEach(object => object._draw());
  }

  _frame() {
    this._now = timestamp();
    this._dt = this._dt + calculateDeltaTime(this._now, this._last);

    while (this._dt > this._timeStep) {
      this._dt -= this._timeStep;
      this._update(this._timeStep);
    }

    this._draw();

    this._last = this._now;
    requestAnimationFrame(this._frame);
  }
}

export default Game;
