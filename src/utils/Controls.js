class Controls {
  constructor() {
    this.keys = {};

    this.registerListeners();
  }

  registerListeners() {
    window.addEventListener('keydown', e => {
      this.keys[e.keyCode] = true;
    });

    window.addEventListener('keyup', e => {
      this.keys[e.keyCode] = false;
    });
  }

  isDown(keyCode) {
    return this.keys.hasOwnProperty(keyCode) ? this.keys[keyCode] : false;
  }
}

export default Controls;
