/**
 * "Interface" for Controls. Can be implemented by keyboard controls, mouse
 * controls or REINFORCEMENT LEARNING controls.
 *
 * A Controls object is injected into the Game.
 */
class Controls {
  isLeft() {
    throw new Error('isLeft not implemented!');
  }

  isRight() {
    throw new Error('isRight not implemented!');
  }
}

export default Controls;
