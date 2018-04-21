import { canvas, ctx, resizeCanvas } from './canvas';
import Game from './Game';

resizeCanvas();

const game = new Game();
game.start();
