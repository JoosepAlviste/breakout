import { Breakout, BreakoutSettings } from './breakout'
import {canvas, ctx, resizeCanvas} from './core/utils/canvas';

function startProgrammaticControlledGame() {
  const game = new Breakout();

  game.reset();

  return game;
}

async function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const raw = ctx.getImageData(0,0,canvas.width,canvas.height);

export async function loop(n) {
  const g = startProgrammaticControlledGame();
  window.g = g;

  for (let i = 0; i < n; i++) {
    await sleep(10);
    g.step(Math.floor(Math.random() * 3));
  }
}
