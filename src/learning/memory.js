import * as tf from '@tensorflow/tfjs';

export default class ExperienceReplayBuffer{
    constructor(size){
        this.size = size
        this.pivot = 0;
        this.memory = []
        this.state_length = 3;
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

    tensorifyMemory(mem){
        return tf.tidy(() => tf.stack(mem, 2).squeeze());
    }
    
    getMemory(m, len=this.state_length){
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
        let arr = this.getMemory(this.pivot-1,this.state_length-1);
        arr.unshift(state);
        return arr;
    }

    _randomIndices(batchsize, domainsize, forbidden){
        let arr = []
        while(arr.length < batchsize){
            let randomnumber = Math.floor(Math.random()*domainsize);
            if (forbidden.includes(randomnumber)) continue;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        return arr;
    }

    // TODO: add more forbidden indices (disjoint states)
    getForbidden(){
        let forbidden = [];
        forbidden.push(this.pivot-1);
        return forbidden;
    }
    
    getBatch(batchsize=32){
        const indices = this._randomIndices(batchsize, this.memory.length, this.getForbidden());
        return tf.tidy(() => {
            let states = [];
            let actions = [];
            let next_states = [];
            let rewards = [];
            
            for(var i = 0; i < batchsize; i++){
                states.push(this.tensorifyMemory(this.getMemory(indices[i])));
                
                actions.push(this.memory[indices[i]].action);
                
                const next_state_index = (indices[i]+1)%this.size;
                next_states.push(this.tensorifyMemory(this.getMemory(next_state_index)));
                
                rewards.push(this.memory[indices[i]].reward);
            }

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
