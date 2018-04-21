class GameObject {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  _draw() {
    console.error('Draw not implemented!');
  }

  _update(dt) {
    console.error('Update not implemented!');
  }
}

export default GameObject;
