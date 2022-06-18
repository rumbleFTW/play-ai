import './style.css';
import * as tf from '@tensorflow/tfjs';
import React, { useState } from 'react';
import Grid from './Grid';

function Panel() {

  
  return (
    <div className='panel--outer'>
      <div className='panel--inner'>
        <h1 className='title'>DIGIT-RECOGNITION</h1>
        <form>
          <Grid/>
          <button type='submit' className='button'>Clear</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
