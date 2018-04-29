import { resizeCanvas } from './core/utils/canvas';
import { GameLoop, Collision } from './core';
import { BreakoutKeyboardControls } from './controls';
import Breakout from './Breakout';
import { ProgrammaticControls } from './core/controls';

resizeCanvas();

function startKeyboardControlledGame() {
  // Keyboard controls can be switched with something like reinforcement learning
  // controls.
  const game = new Breakout({
    controls: new BreakoutKeyboardControls(),
  });

  game.start();

  return game;
}

function startProgrammaticControlledGame() {
  const game = new Breakout();

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
