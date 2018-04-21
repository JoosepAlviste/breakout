import { canvas, ctx } from './canvas';
import Game from './Game';

/**
 * Resize the canvas to full screen and make sure it looks good on retina
 * screens.
 *
 * Source:
 * https://stackoverflow.com/questions/24395076/canvas-generated-by-canvg-is-blurry-on-retina-screen
 */
function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  canvas.width = canvas.width * pixelRatio;
  canvas.height = canvas.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

resizeCanvas();

const game = new Game();
game.start();
