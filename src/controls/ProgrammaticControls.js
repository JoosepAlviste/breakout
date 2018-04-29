import Controls from './Controls';
import { NO_ACTION, RIGHT, LEFT } from '../config/actions';

/**
 * @property {NO_ACTION|LEFT|RIGHT} nextAction
 */
class ProgrammaticControls extends Controls {
  constructor() {
    super();

    this.nextAction = NO_ACTION;
  }

  makeMove() {
    return this.nextAction;
  }

  /**
   * Set the action to be taken next.
   *
   * @param {NO_ACTION|LEFT|RIGHT} action
   */
  setAction(action) {
    this.nextAction = action;
  }
}

export default ProgrammaticControls;
