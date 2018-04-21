import { Ball, Paddle } from './gameObjects';
import { ctx, canvas } from './canvas';
import { timestamp, calculateDeltaTime } from './utils/timestamp';
import {
  BALL_RADIUS,
  BRICK_COLUMN_COUNT, BRICK_HEIGHT,
  BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP,
  BRICK_PADDING,
  BRICK_ROW_COUNT,
} from './config';
import Controls from './utils/Controls';
import Collision from './collision';
import Brick from './gameObjects/Brick';
import { brickWidth } from './utils/brickCalculator';

/**
 * The main Game class. Contains the game loop logic.
 *
 * @property {GameObject[]} gameObjects
 *
 * @property {number} _dt - calculate timestamp difference in seconds
 * @property {number} _now
 * @property {number} _last
 * @property {number} _timeStep
 * @property {Controls} _controls
 * @property {Collision} _collision
 * @property {boolean} _isGameOver
 */
class Game {
  constructor() {
    this.gameObjects = [];

    this._dt = 0;
    this._now = timestamp();
    this._last = this._now;
    this._timeStep = 1 / 60;

    this._isGameOver = false;

    this._controls = new Controls();
    this._controls.registerListeners();

    this._collision = new Collision();

    this._frame = this._frame.bind(this);
  }

  start() {
    this.gameObjects.push(new Ball({
      x: (canvas.clientWidth + BALL_RADIUS) / 2,
      y: canvas.clientHeight - BALL_RADIUS - 20,
      game: this,
    }));

    this.gameObjects.push(new Paddle({
      x: 0,
      y: 0,
      controls: this._controls,
    }));

    this._generateBricks().forEach(brick => this.gameObjects.push(brick));

    requestAnimationFrame(this._frame);
  }

  gameOver() {
    this._isGameOver = true;

    alert('Game Over!');
    document.location.reload();
  }

  _update(dt) {
    this.gameObjects = this.gameObjects.filter(object => !object.dead)

    this.gameObjects.forEach(object => object._update(dt));

    this._collision.detect(this.gameObjects);
  }

  _draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    this.gameObjects.forEach(object => object._draw());
  }

  _frame() {
    this._now = timestamp();
    this._dt = this._dt + calculateDeltaTime(this._now, this._last);

    while (this._dt > this._timeStep && !this._isGameOver) {
      this._dt -= this._timeStep;
      this._update(this._timeStep);
    }

    this._draw();

    this._last = this._now;
    requestAnimationFrame(this._frame);
  }

  /**
   * Generate the bricks at the start of the game.
   *
   * @returns {Brick[]}
   *
   * @private
   */
  _generateBricks() {
    const bw = brickWidth();

    const bricks = [];
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      for (let r = 0; r < BRICK_ROW_COUNT; r++) {
        bricks.push(new Brick({
          x: (c * (bw + BRICK_PADDING)) + BRICK_OFFSET_LEFT,
          y: (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP,
          width: bw,
          height: BRICK_HEIGHT,
        }));
      }
    }

    return bricks;
  }
}

export default Game;
