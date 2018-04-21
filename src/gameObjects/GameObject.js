/**
 * @property {number} x
 * @property {number} y
 * @property {Collider|null} collider
 * @property {boolean} dead
 */
class GameObject {
  constructor({ x, y, dead = false }) {
    this.x = x;
    this.y = y;
    this.dead = dead;

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
