import { BreakoutKeyboardControls } from './breakout/controls';
import { Breakout, BreakoutSettings, actions } from './breakout';
import * as funcs from './learning';
window.funcs = funcs;

//renderloop(1000, 0);
//loop(100);


// function startKeyboardControlledGame() {
//   // To override settings we can pass in an instance of BreakoutSettings
//   // e.g. settings: new BreakoutSettings({ ballVelocity: 100 }) and import from
//   // './breakout'.
//   const game = new Breakout({
//     controls: new BreakoutKeyboardControls(),
//   });
//
//   game.start();
//
//   return game;
// }
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
// // const game = startKeyboardControlledGame();
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


