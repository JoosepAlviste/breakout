import { Breakout, BreakoutSettings } from './breakout'

function startProgrammaticControlledGame() {
  const game = new Breakout();

  game.reset();

  return game;
}

async function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default async function loop(n) {
  const g = startProgrammaticControlledGame();
  window.g = g;

  // const game = new Breakout({
  //   settings: new BreakoutSettings({
  //     ballVelocity: 200,
  //     paddleVelocity: 250,
  //   }),
  // });
  //
  // window.game = game;

  for (let i = 0; i < n; i++) {
    await sleep(10);
    g.step(Math.floor(Math.random() * 3));
  }
}
