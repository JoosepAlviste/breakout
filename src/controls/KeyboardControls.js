import KEYS from '../core/utils/keys';
import Controls from './Controls';
import { NO_ACTION, LEFT, RIGHT } from '../config/actions';

/**
 * Keyboard controls where pressing the left or right arrow keys triggers
 * movement.
 */
class KeyboardControls extends Controls {
  constructor() {
    super();

    this.keys = {};

    this._registerListeners();
  }

  makeMove() {
    if (this._isKeyDown(KEYS.LEFT_ARROW)) {
      return LEFT;
    } else if (this._isKeyDown(KEYS.RIGHT_ARROW)) {
      return RIGHT;
    } else {
      return NO_ACTION;
    }
  }

  _registerListeners() {
    window.addEventListener('keydown', e => {
      this.keys[e.keyCode] = true;
    });

    window.addEventListener('keyup', e => {
      this.keys[e.keyCode] = false;
    });
  }

  _isKeyDown(keyCode) {
    return this.keys.hasOwnProperty(keyCode) ? this.keys[keyCode] : false;
  }
}

export default KeyboardControls;
