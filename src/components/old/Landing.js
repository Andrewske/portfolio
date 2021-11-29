import React from 'react';
import Greeting from './Greeting';
import Intro from './Intro';
import Template from './Template';
import Experience from '../experience/Experience';

const Landing = () => {
  return (
    <div className='landing'>
      <Greeting col={'3 / 5'} />
      <span class='flex-row'>
        <div class='empty' />
        <div class='empty' />
        <span class='flex-item'>
          <Intro col={'3 / 4'} row={1} />
        </span>
      </span>
      <span class='flex-row'>
        <div class='empty' />
        <div class='flex-item'>
          <Template
            children={<h1>Things...</h1>}
            row={1}
            sideLeft={0}
            bottomLeft={0}
          />
        </div>
        <div class='flex-item'>
          <Template
            children={<h1>Things...</h1>}
            row={1}
            sideRight={0}
            bottomRight={0}
          />
        </div>
        <div class='empty' />
      </span>
      <span className='flex-row'>
        <Experience />
      </span>
    </div>
  );
};

export default Landing;
