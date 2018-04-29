import { Game } from './core';
import { canvas } from './core/utils/canvas';
import { Ball, Paddle } from './gameObjects';
import { BALL_RADIUS, PADDLE_HEIGHT } from './config';
import { generateBricks } from './utils/brickCalculator';
import ProgrammaticControls from './controls/ProgrammaticControls';

/**
 * @property {GameObject[]} gameObjects
 * @property {boolean} isGameOver;
 * @property {Controls} _controls}
 * @property {GameLoop} _gameLoop
 * @property {Collision} _collision
 */
class Breakout extends Game {
  /**
   * @param {GameLoop} gameLoop
   * @param {Controls} controls
   * @param {Collision} collision
   */
  constructor({ gameLoop, controls, collision }) {
    super({ gameLoop, collision });

    this._controls = controls;
  }

  start() {
    this.reset();

    super.start();
  }

  reset() {
    super.reset();

    this.gameObjects.push(new Ball({
      x: (canvas.clientWidth + BALL_RADIUS) / 2,
      y: canvas.clientHeight - BALL_RADIUS - PADDLE_HEIGHT,
      game: this,
    }));

    this.gameObjects.push(new Paddle({
      x: 0,
      y: 0,
      controls: this._controls,
    }));

    generateBricks().forEach(brick => this.gameObjects.push(brick));
  }

  /**
   * Step function used to programmatically advance the game state.
   *
   * @param {NO_ACTION|LEFT|RIGHT} action
   */
  step(action) {
    if (this._controls instanceof ProgrammaticControls) {
      this._controls.setAction(action);
    }

    this._gameLoop.advanceOneFrame();

    return this.isGameOver;
  }
}

export default Breakout;
