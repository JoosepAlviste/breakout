/**
 * "Interface" for Controls. Can be implemented by keyboard controls, mouse
 * controls or REINFORCEMENT LEARNING controls.
 *
 * A Controls object is injected into the Game.
 */
class Controls {
  /**
   * Make a move for this frame. Return 'LEFT' for moving to the left, 'RIGHT',
   * for moving to the right and null for making no moves.
   *
   * This could receive some game stats if needed later (for machine learning).
   * Also, after making a move, it could somehow receive a reward.
   *
   * @returns {'LEFT'|'RIGHT'|null}
   */
  makeMove() {
    throw new Error('makeMove not implemented!');
  }
}

export default Controls;
