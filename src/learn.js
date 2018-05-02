import { Breakout, BreakoutSettings, actions } from './breakout';
import {canvas, ctx, resizeCanvas} from './core/utils/canvas';

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function startProgrammaticControlledGame() {
    const game = new Breakout();
    
    game.reset();
    
    return game;
}

const raw = ctx.getImageData(0,0,canvas.width,canvas.height);
export raw;

export async function loop(n){
    const g = startProgrammaticControlledGame();
    for(var i = 0; i < n; i++){
        await sleep(10);
        g.step(Math.floor(Math.random()*3));
    }
}


