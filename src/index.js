import { BreakoutKeyboardControls } from './breakout/controls';
import { Breakout, BreakoutSettings, actions } from './breakout';

import FlappyKeyboardControls from './flappybird/FlappyKeyboardControls';
import { Flappy, FlappySettings} from './flappybird';


import funcs from './learning';
window.funcs = funcs;

//fills replay buffer with random actions
//funcs.init();

//renders memory (as neural net sees it)
//funcs.renderMemory(0,200);

function startKeyboardControlledGame() {
    
  // To override settings we can pass in an instance of BreakoutSettings
  // e.g. settings: new BreakoutSettings({ ballVelocity: 100 }) and import from
  // './breakout'.
  const game = new Breakout({
    controls: new BreakoutKeyboardControls(),
    settings: new BreakoutSettings({
      brickPadding: 0,
      brickOffsetLeft: 0,
      brickColumnCount: 9,
      brickRowCount: 4,
    }),
  });

  game.start();

  return game;
}

/*
function startKeyboardControlledGame() {
    
  // To override settings we can pass in an instance of BreakoutSettings
  // e.g. settings: new BreakoutSettings({ ballVelocity: 100 }) and import from
  // './breakout'.
  const game = new Flappy({
    controls: new FlappyKeyboardControls(),
  });

  game.start();

  return game;
}
*/
document.querySelector('#js-keyboard-button').addEventListener('click', () => {
  startKeyboardControlledGame();
});

document.querySelector('#js-training-button').addEventListener('click', () => {
  funcs.trainwrapper();
})

//
// /**
//  * @return {Breakout}
//  */
// function startProgrammaticControlledGame() {
//   const game = new Breakout();
//
//   game.reset();
//
//   return game;
// }
//
//
// // All available actions are here: actions.ACTIONS_LIST
//
// const game = startProgrammaticControlledGame();
// let moves = 0;
//
// // advance();
// //
// // function advance() {
// //   game.step(Math.floor(Math.random() * Math.floor(3)));
// //
// //   if (moves < 100) {
// //     window.requestAnimationFrame(advance);
// //     moves++;
// //   }
// // }
//
// while (moves < 100) {
//   const reward = game.step(Math.floor(Math.random() * Math.floor(3)));
//
//   console.log('reward', reward);
//
//   moves++;
// }


