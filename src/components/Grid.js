import './style.css';
import React from 'react';
import * as tf from '@tensorflow/tfjs';

var matrix = [];
var model;

let refresh = () =>
{
    matrix = [];
    let k = 0;
    for(let i = 0; i<28; i++)
    {
        for(let j = 0; j<28; j++)
        {
            let attr = {key: k, row: i, col: j, active: 0};
            k++;
            matrix.push(attr);
        }
    }
    console.log('Refreshed');
}

window.addEventListener('load',async  (event) =>
{ 
    refresh();
    model = await tf.loadLayersModel('./modelMnist/model.json')
    console.log('Model Loaded');
});


export default function Grid()
{  
    const [length, setLength] = React.useState(0);
    const [click, setClick] = React.useState(false);

    let predict = () =>
    {
        var tens = [];
        for(let i = 0; i<matrix.length; i++)
        {
            if(matrix[i].active === 1)
                tens.push(255);
            else
                tens.push(0);
        }
        let tensor = tf.tensor1d(tens).reshape([1, 28, 28, 1]);
        var pred = model.predict(tensor);
        const ans = Array.from(pred.dataSync()).indexOf(Math.max(...Array.from(pred.dataSync())))
        window.alert(ans)
    }


    return (
        <div className="grid--container">
            {matrix.map((prop) => (
                <div className="grid--pixel" row={prop.row} col={prop.col} active={prop.active} key={prop.key}   draggable="false" onMouseOver={() =>{if(click){matrix[prop.key].active = 1;setLength(length+1);console.log('Drag enter')}}} onMouseDown={() =>{setClick(true)}} onMouseUp={() =>{setClick(false); predict()}}></div>
            ))}
        </div>
    );
}