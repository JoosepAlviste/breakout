import { BreakoutKeyboardControls } from './breakout/controls';
import { Breakout } from './breakout';

function startKeyboardControlledGame() {
  // To override settings we can pass in an instance of BreakoutSettings
  // e.g. settings: new BreakoutSettings() and import from './breakout'.
  const game = new Breakout({
    controls: new BreakoutKeyboardControls(),
  });

  game.start();

  return game;
}

/**
 * @return {Breakout}
 */
function startProgrammaticControlledGame() {
  const game = new Breakout();

  game.reset();

  return game;
}

const game = startKeyboardControlledGame();

// const game = startProgrammaticControlledGame();
// let moves = 0;

// advance();
//
// function advance() {
//   game.step(Math.floor(Math.random() * Math.floor(3)));
//
//   if (moves < 100) {
//     window.requestAnimationFrame(advance);
//     moves++;
//   }
// }

// while (true) {
//   const reward = game.step(Math.floor(Math.random() * Math.floor(3)));
//
//   console.log('reward', reward);
//
//   moves++;
// }
