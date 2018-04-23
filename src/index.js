import { resizeCanvas } from './core/utils/canvas';
import { GameLoop, Collision } from './core';
import { KeyboardControls } from './controls';
import Breakout from './Breakout';

resizeCanvas();

// Keyboard controls can be switched with something like reinforcement learning
// controls.
const game = new Breakout({
  gameLoop: new GameLoop(),
  collision: new Collision(),
  controls: new KeyboardControls(),
});

game.start();
