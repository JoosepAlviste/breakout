/**
 * @property {number} x
 * @property {number} y
 * @property {Collider|null} collider
 */
class GameObject {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;

    this.collider = null;
  }

  _draw() {
    console.error('Draw not implemented!');
  }

  _update(dt) {
    console.error('Update not implemented!');
  }
}

export default GameObject;
