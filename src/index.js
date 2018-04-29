import { resizeCanvas } from './core/utils/canvas';
import { GameLoop, Collision } from './core';
import { KeyboardControls } from './controls';
import Breakout from './Breakout';
import ProgrammaticControls from './controls/ProgrammaticControls';

resizeCanvas();

function startKeyboardControlledGame() {
  // Keyboard controls can be switched with something like reinforcement learning
  // controls.
  const game = new Breakout({
    gameLoop: new GameLoop(),
    collision: new Collision(),
    controls: new KeyboardControls(),
  });

  game.start();

  return game;
}

function startProgrammaticControlledGame() {
  const game = new Breakout({
    gameLoop: new GameLoop(),
    collision: new Collision(),
    controls: new ProgrammaticControls(),
  });

  game.reset();

  return game;
}

const game = startKeyboardControlledGame();

// const game = startProgrammaticControlledGame();
// let test = 0;
//
// advance();
//
// function advance() {
//   game.step(Math.floor(Math.random() * Math.floor(3)));
//
//   if (test < 100) {
//     window.requestAnimationFrame(advance);
//   }
// }
