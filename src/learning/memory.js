import * as tf from '@tensorflow/tfjs';



export default class ExperienceReplayBuffer{
    constructor(size){
        this.size = size
        this.pivot = 0;
        this.memory = []
    }

    push(transition){
        if(this.memory.length < this.size){
            this.memory.push(null);
        }else{
            this.memory[this.pivot].state.dispose();
        }
        this.memory[this.pivot] = transition;
        this.pivot = (this.pivot+1)%this.size;
    }
    
    getMemory(m,len){
        let arr = [];
        for(var i = 0; i < len; i++){
            let index = m-i;
            if(index < 0){
                index = this.size + index;
            }
            arr.push(this.memory[index].state);
        }
        return arr;
    }

    getCurrentState(state){
        let arr = this.getMemory(this.pivot-1,2);
        arr.unshift(state);
        return arr;
    }

    
    
    getBatch(batchsize=32){
        const indices = randomIndices(batchsize, this.memory.length, (this.pivot-1)%this.size);
        let states = [];
        let actions = [];
        let next_states = [];
        let rewards = [];
        
        for(var i = 0; i < batchsize; i++){
            states.push(this.memory[indices[i]].state);
            actions.push(this.memory[indices[i]].action);
            next_states.push(this.memory[(indices[i]+1)%this.size].state);
            rewards.push(this.memory[indices[i]].reward);
        }

        return tf.tidy(() => {
            return {states: tf.stack(states), actions: tf.tensor(actions).cast('int32'), next_states: tf.stack(next_states), rewards: tf.tensor(rewards)};
        });
    }

    get(ith){
        return this.memory[ith];
    }

    length(){
        return this.memory.length;
    }
}
