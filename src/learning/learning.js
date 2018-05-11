//import { Breakout, BreakoutSettings, actions } from '../breakout'
import { Flappy, FlappySettings, actions} from '../flappybird';

import {canvas, ctx, resizeCanvas} from '../core/utils/canvas';
import * as tf from '@tensorflow/tfjs';
import ExperienceReplayBuffer from './memory';
import {getModel,cloneModel} from './model';

const num_actions = actions.ACTIONS_LIST.length;
const memory_size = 100000;
export const memory = new ExperienceReplayBuffer(memory_size);
export const model = getModel(num_actions);
export let lagged_model = getModel(num_actions);
cloneModel(lagged_model, model);

export const optimizer = tf.train.adam(1e-4);

/*
export function startProgrammaticControlledGame() {
  const game = new Breakout({
    settings: new BreakoutSettings({
      width: 28,
      height: 28,

      brickHeight: 1,
      brickColumnCount: 5,
      brickRowCount: 3,
      brickOffsetLeft: 0,
      brickPadding: 0,
      brickOffsetTop: 2,

      paddleHeight: 2,
      paddleWidth: 7,
      paddleVelocity: 70,

      ballRadius: 0.6,
      ballVelocity: 80,
      ballInitialAngle: Math.random()*(2.35-0.785) + 0.785,
    }),
  });

  game.reset();

  return game;
}
*/

export function startProgrammaticControlledGame() {
    const game = new Flappy();
    game.reset();
    return game;
}


export function tensorifyMemory(mem){
    return tf.tidy(() => tf.stack(mem, 2).squeeze());
}

export function getState(){
    const raw = ctx.getImageData(0,0,canvas.width,canvas.height);
    return tf.tidy(() => tf.fromPixels(raw,1).cast('float32').div(tf.scalar(255)));
    //return tf.tidy(() => tf.fromPixels(raw,1).cast('float32'));
}

window.ctx = ctx;
window.canvas = canvas;
window.model = model;
window.tf = tf;
window.getState = getState;
window.getAction = getAction;

export function getAction(current_state){
    return tf.tidy(() =>{
        const stacked_state = tensorifyMemory(memory.getCurrentState(current_state));
        return model.predict(stacked_state.expandDims()).argMax(1);
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
            action = Math.floor(Math.random()*num_actions);
            reward = g.step(action);
            if(reward != 0){
                console.log(reward);
            }
        }else{
            const q = getAction(state);
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
let g = startProgrammaticControlledGame();
window.g = g;

export async function loop(n) {
    for (let i = 0; i < n; i++) {
        await sleep(10);
        g.step(Math.floor(Math.random() * num_actions));
    }
}

export function init(iters=memory_size){
    g.step(0);
    for(var i = 0; i < iters; i++){
        const state = getState();
        const action = Math.floor(Math.random()*num_actions);
        const reward = g.step(action);
        memory.push({state: state, action: action, reward: reward});
        if(i % 1000 == 0){
            g = startProgrammaticControlledGame();
        }
        if(i % 10000 == 0){
            console.log("Init: ", (i/iters)*100, "%");
        }
    }
    console.log("done");
}

export function renderCurrentState(){
    const state = getState();
    const stack = tensorifyMemory(memory.getCurrentState(state));
    tf.toPixels(stack.cast('int32'), canvas);
}

export async function renderMemory(start,stop){
    for(var i = start; i < stop; i++){
        await sleep(100);
        tf.toPixels(tensorifyMemory(memory.getMemory(i,3)).cast('int32'), canvas);
    }
}


export function doubleTrainOnBatch(){
    const batch = memory.getBatch();
    tf.tidy(() => {
        const next_actions = model.predict(batch.next_states).argMax(1);
        const next_action_mask = tf.oneHot(next_actions, num_actions).cast('float32');
        const next_q_values = lagged_model.predict(batch.next_states).mul(next_action_mask).sum(1);
        
        const target = next_q_values.mul(tf.scalar(0.99)).add(batch.rewards);
        
        const current_action_mask = tf.oneHot(batch.actions, num_actions).cast('float32');

        optimizer.minimize(() => {
            const current_q_values = model.predict(batch.states);
            const q_values_of_actions_taken = current_q_values.mul(current_action_mask).sum(1);
            return q_values_of_actions_taken.sub(target).square().mean();
        });
    });
    batch.states.dispose();
    batch.actions.dispose();
    batch.next_states.dispose();
    batch.rewards.dispose();
}

export let reward_arr = [];

export async function train(iters,epsilon){
    let totalreward = 0;

    const start = performance.now();
    for(var i = 0; i < iters; i++){
        const state = getState();
        let action = null;
        
        if(Math.random() < epsilon){
            action = Math.floor(Math.random()*num_actions);
        }else{
            const q = getAction(state);
            const a = await q.data();
            action = a[0];
            q.dispose();
        }
        
        const reward = g.step(action)
        totalreward += reward
        
        memory.push({state: state, action: action, reward: reward});
        
        doubleTrainOnBatch();
        
        if(i % 1000 == 0){
            g = startProgrammaticControlledGame();
            reward_arr.push(totalreward);
            console.log("Progress: ", (i/iters)*100, "%", "Reward: ", totalreward);
            console.log(reward_arr);
            totalreward = 0;
            cloneModel(lagged_model, model);
        }
        await sleep(1);
    }
    console.log((performance.now()-start)/1000);
}

export async function trainwrapper(){
    window.g = startProgrammaticControlledGame();
    console.log(num_actions);
    console.log("initializing...");
    init();
    console.log("training...");
    await train(50001, .1);
}
