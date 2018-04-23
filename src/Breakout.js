import { Game } from './core';
import { canvas } from './core/utils/canvas';
import { Ball, Paddle } from './gameObjects';
import { BALL_RADIUS } from './config';
import { generateBricks } from './utils/brickCalculator';

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
    super({ gameLoop, controls, collision });
  }

  start() {
    super.start();

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
  }
}

export default Breakout;
