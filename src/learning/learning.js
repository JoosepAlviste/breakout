import { Breakout, BreakoutSettings } from '../breakout'
import {canvas, ctx, resizeCanvas} from '../core/utils/canvas';
import * as tf from '@tensorflow/tfjs';
import ExperienceReplayBuffer from './memory';
import getModel from './model';

const memory_size = 1000;
export const memory = new ExperienceReplayBuffer(memory_size);
const model = getModel();

function startProgrammaticControlledGame() {
  const game = new Breakout({
    settings: new BreakoutSettings({
      width: 28,
      height: 28,

      brickHeight: 1,
      brickColumnCount: 3,
      brickRowCount: 2,
      brickOffsetLeft: 2,
      brickOffsetTop: 2,

      paddleHeight: 2,
      paddleWidth: 5,
      paddleVelocity: 150,

      ballRadius: 0.5,
      ballVelocity: 100,
      ballInitialAngle: Math.random()*(2.35-0.785) + 0.785,
    }),
  });

  game.reset();

  return game;
}

function tensorifyMemory(mem){
    return tf.stack(mem, 2).squeeze();
}

function getState(){
    const raw = ctx.getImageData(0,0,canvas.width,canvas.height);
    //return tf.tidy(() => tf.fromPixels(raw,1).cast('float32').div(tf.scalar(255)));
    return tf.tidy(() => tf.fromPixels(raw,1).cast('float32'));
}

window.ctx = ctx;
window.canvas = canvas;
window.model = model;
window.tf = tf;
window.getState = getState;
window.getAction = getAction;

function getAction(state){
    return tf.tidy(() =>{
        return model.predict(state.expandDims()).argMax(1);
    });
}

export async function renderloop(iters, epsilon){
    let r = 0;
    let action = null;
    let state = null;
    let reward = null;
    for(var i = 0; i < iters; i++){
        await sleep(30);
        state = getState();
        if(Math.random() < epsilon){
            action = Math.floor(Math.random()*3);
            reward = g.step(action);
            if(reward != 0){
                console.log(reward);
            }
        }else{
            const q = tf.tidy(() => {
                return getAction(tensorifyMemory(memory.getCurrentState(state)));
            });
            const a = await q.data();
            q.dispose();
            action = a[0];
            reward = g.step(action);
            if(reward != 0){
                console.log(reward);
            }
        }
        memory.push({state: state, action: action, reward: reward});
    }
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

function init(iters=memory_size){
    g.step(0);
    for(var i = 0; i < iters; i++){
        const state = getState();
        const action = Math.floor(Math.random()*3);
        const reward = g.step(action);
        memory.push({state: state, action: action, reward: reward});
    }
    console.log("done");
}


export async function renderMemory(start,stop){
    for(var i = start; i < stop; i++){
        await sleep(100);
        tf.toPixels(tensorifyMemory(memory.getMemory(i,3)).cast('int32'), canvas);
    }
}
init();
renderMemory(0,200);
