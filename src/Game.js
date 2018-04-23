import { Ball, Paddle } from './gameObjects';
import { ctx, canvas } from './canvas';
import { timestamp, calculateDeltaTime } from './utils/timestamp';
import { BALL_RADIUS } from './config';
import Collision from './collision';
import { generateBricks } from './utils/brickCalculator';

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
  /**
   * @param {Controls} controls
   */
  constructor({ controls }) {
    this.gameObjects = [];

    this._dt = 0;
    this._now = timestamp();
    this._last = this._now;
    this._timeStep = 1 / 60;
    this._isGameOver = false;

    this._controls = controls;
    this._collision = new Collision();

    this._frame = this._frame.bind(this);
  }

  /**
   * Start the game!
   */
  start() {
    this.gameObjects = [];
    this._isGameOver = false;

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

    generateBricks().forEach(brick => this.gameObjects.push(brick));

    requestAnimationFrame(this._frame);
  }

  /**
   * End the game.
   */
  gameOver() {
    this._isGameOver = true;

    alert('Game Over!');

    this.start();
  }

  /**
   * Trigger the update method on each game object. Also filters out all dead
   * game objects. Also triggers collision detection.
   *
   * @param {number} dt
   *
   * @private
   */
  _update(dt) {
    this.gameObjects = this.gameObjects.filter(object => !object.dead);

    this.gameObjects.forEach(object => object.update(dt));

    this._collision.detect(this.gameObjects);
  }

  /**
   * Clear the canvas and trigger the draw method on every game object.
   *
   * @private
   */
  _draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    this.gameObjects.forEach(object => object.draw());
  }

  /**
   * This is one frame of the game loop. Calculates the delta time, updates
   * all game objects and draws them.
   *
   * @private
   */
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
}

export default Game;
