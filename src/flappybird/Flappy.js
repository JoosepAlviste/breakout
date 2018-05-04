import { Game } from '../core/index';
import { canvas } from '../core/utils/canvas';
import Ball from './Ball';
import Rect from './Rect';
import FlappySettings from './FlappySettings';

/**
 * @property {GameObject[]} gameObjects
 * @property {boolean} isGameOver;
 * @property {Controls} _controls}
 * @property {GameLoop} _gameLoop
 * @property {Collision} _collision
 * @property {BreakoutSettings} _settings
 * @property {number} _reward
 */
class Flappy extends Game {
    constructor({ settings = new FlappySettings(), ...rest } = {}) {
        super({ settings, ...rest });
    }

    start() {
        this.reset();

        super.start();
    }

    reset() {
        super.reset();

        const {
            ballRadius,
            gravity,
            flapHeight,
            rectWidth,
            rectHeight,
            rectVelocity
        } = this._settings;

        this.gameObjects.push(new Ball({
            x: ballRadius*5,
            y: canvas.clientHeight/2,
            controls: this._controls,
            game: this,
            radius: ballRadius,
            gravity: gravity,
            flapHeight: flapHeight
        }));

        this.gameObjects.push(new Rect({
            x: canvas.clientWidth,
            y: Math.random()*(canvas.clientHeight - rectHeight),
            width: rectWidth,
            height: rectHeight,
            v: rectVelocity,
        }));
    }

    isWon() {
        return false;
    }
}

export default Flappy;
