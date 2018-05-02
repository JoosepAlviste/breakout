import * as tf from '@tensorflow/tfjs';

export default function getModel(){
    return tf.sequential({
        layers: [
            tf.layers.zeroPadding2d({
                inputShape: [28, 28, 3],
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
