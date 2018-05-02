import { Breakout, BreakoutSettings } from './breakout'
import {canvas, ctx, resizeCanvas} from './core/utils/canvas';
import * as tf from '@tensorflow/tfjs';

function getModel(){
    return tf.sequential({
        layers: [
            tf.layers.zeroPadding2d({
                inputShape: [28, 28, 1],
                padding: 2
            }),
            tf.layers.conv2d({
                kernelSize: 4,
                filters: 16,
                strides: 2,
                activation: 'relu',
                kernelInitializer: 'varianceScaling'
            }),
            tf.layers.conv2d({
                kernelSize: 4,
                filters: 32,
                strides: 2,
                activation: 'relu',
                kernelInitializer: 'varianceScaling'
            }),
            tf.layers.flatten(),
            tf.layers.dense({
                units: 256,
                kernelInitializer: 'varianceScaling',
                activation: 'relu'
            }),
            tf.layers.dense({
                units: 256,
                kernelInitializer: 'varianceScaling',
                activation: 'relu'
            }),
            tf.layers.dense({
                units: 3,
                kernelInitializer: 'varianceScaling',
                activation: 'linear'
            })
        ]
    });
}


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
    for(var i = 0; i < iters; i++){
        await sleep(30);
        
        if(Math.random() < epsilon){
            r = g.step(Math.floor(Math.random()*3));
            if(r != 0){
                console.log(r);
            }
        }else{
            const q = tf.tidy(() => {
                return getAction(getState());
            });
            const a = await q.data();
            q.dispose();
            r = g.step(a[0]);
            if(r != 0){
                console.log(r);
            }
        }
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
