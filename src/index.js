import { resizeCanvas } from './canvas';
import Game from './Game';
import KeyboardControls from './controls/KeyboardControls';

resizeCanvas();

// Keyboard controls can be switched with something like reinforcement learning
// controls.
const controls = new KeyboardControls();

const game = new Game({ controls });
game.start();
