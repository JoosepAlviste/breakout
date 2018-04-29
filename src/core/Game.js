import { Controls, ProgrammaticControls } from './controls';
import GameLoop from './GameLoop';
import { Collision } from './collision';
import Settings from './Settings';
import { resizeCanvas } from './utils/canvas';

/**
 * @property {GameObject[]} gameObjects
 * @property {boolean} isGameOver;
 * @property {GameLoop} _gameLoop
 * @property {Collision} _collision
 * @property {Controls} _controls
 * @property {Settings} _settings
 */
class Game {
  /**
   * @param {GameLoop} gameLoop
   * @param {Collision} collision
   * @param {Controls} controls
   * @param {Settings} settings
   */
  constructor({
                gameLoop = new GameLoop(),
                collision = new Collision(),
                controls = new ProgrammaticControls(),
                settings = new Settings(),
              } = {}) {
    this._gameLoop = gameLoop;
    this._gameLoop.setGame(this);
    this._collision = collision;
    this._controls = controls;
    this._settings = settings;

    this.gameObjects = [];
    this.isGameOver = false;

    resizeCanvas(settings.width, settings.height);
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
   * Step function used to programmatically advance the game state. Returns the
   * reward from the current state.
   *
   * @param {number} action
   *
   * @return {number} - reward
   */
  step(action) {
    if (this._controls instanceof ProgrammaticControls) {
      this._controls.setAction(action);
    }

    this._gameLoop.advanceOneFrame();

    return this.isGameOver ? -100 : 0;
  }
}

export default Game;
