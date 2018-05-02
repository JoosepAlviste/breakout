import { Breakout, BreakoutSettings } from './breakout'
import {canvas, ctx, resizeCanvas} from './core/utils/canvas';

function startProgrammaticControlledGame() {
    const game = new Breakout({
        settings: new BreakoutSettings({
            width: 28,
            height: 28,
            
            brickHeight: 1,
            brickColumnCount: 3,
            brickRowCount: 2,

            paddleHeight: 1,
            paddleWidth: 4,
            paddleVelocity: 200,

            ballRadius: 0.5,
            ballVelocity: 150,
            ballInitialAngle: Math.random()*(2.35-0.785) + 0.785
        }),
    });

    game.reset();

    return game;
}

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const raw = ctx.getImageData(0,0,canvas.width,canvas.height);
const g = startProgrammaticControlledGame();
window.g = g;

export async function loop(n) {
    for (let i = 0; i < n; i++) {
        await sleep(10);
        g.step(Math.floor(Math.random() * 3));
    }
}
