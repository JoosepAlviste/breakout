import { Controls, ProgrammaticControls } from './controls';
import GameLoop from './GameLoop';
import { Collision } from './collision';

/**
 * @property {GameObject[]} gameObjects
 * @property {boolean} isGameOver;
 * @property {GameLoop} _gameLoop
 * @property {Collision} _collision
 * @property {Controls} _controls
 */
class Game {
  /**
   * @param {GameLoop} gameLoop
   * @param {Collision} collision
   * @param {Controls} controls
   */
  constructor({
                gameLoop = new GameLoop(),
                collision = new Collision(),
                controls = new ProgrammaticControls(),
              } = {}) {
    this._gameLoop = gameLoop;
    this._gameLoop.setGame(this);
    this._collision = collision;
    this._controls = controls;

    this.gameObjects = [];
    this.isGameOver = false;
  }

  /**
   * Start the game.
   */
  start() {
    this._gameLoop.start();
  }

  /**
   * Reset the game to the starting position.
   */
  reset() {
    this.gameObjects = [];
    this.isGameOver = false;
  }

  /**
   * End the game. Feel free to override if this functionality is not enough.
   */
  gameOver() {
    this.isGameOver = true;

    // alert('Game Over!');

    this.start();
  }

  /**
   * Called after all game objects have been updated. Feel free to override if
   * something else needs to be done here.
   *
   * @param {number} dt
   */
  update(dt) {
    this._collision.detect(this.gameObjects);
  }

  /**
   * Step function used to programmatically advance the game state.
   *
   * @param {number} action
   */
  step(action) {
    if (this._controls instanceof ProgrammaticControls) {
      this._controls.setAction(action);
    }

    this._gameLoop.advanceOneFrame();

    return this.isGameOver;
  }
}

export default Game;
