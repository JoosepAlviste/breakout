/**
 * @property {GameObject[]} gameObjects
 * @property {boolean} isGameOver;
 * @property {GameLoop} _gameLoop
 * @property {Collision} _collision
 */
class Game {
  /**
   * @param {GameLoop} gameLoop
   * @param {Collision} collision
   */
  constructor({ gameLoop, collision }) {
    this._gameLoop = gameLoop;
    this._gameLoop.setGame(this);
    this._collision = collision;

    this.gameObjects = [];
    this.isGameOver = false;
  }

  /**
   * Start the game.
   */
  start() {
    this.gameObjects = [];
    this.isGameOver = false;

    this._gameLoop.start();
  }

  /**
   * End the game. Feel free to override if this functionality is not enough.
   */
  gameOver() {
    this.isGameOver = true;

    alert('Game Over!');

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
}

export default Game;
