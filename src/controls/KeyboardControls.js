import Controls from './Controls';
import KEYS from '../utils/keys';

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

  isLeft() {
    return this._isKeyDown(KEYS.LEFT_ARROW);
  }

  isRight() {
    return this._isKeyDown(KEYS.RIGHT_ARROW);
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
