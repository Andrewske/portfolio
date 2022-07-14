/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import kevin_banff from '../../img/kevin_banff.jpg';
import background from '../../img/david-werbrouck-5GwLlb-_UYk-unsplash.jpg';

import useHover from '../../hooks/useHover';
import useWindowSize from '../../hooks/useWindowSize';

const rainbow = [
  'rgb(231, 29, 67)',
  'rgb(255, 0, 0)',
  'rgb(255, 55, 0)',
  'rgb(255, 110, 0)',
  'rgb(255,165,0)',
  'rgb(255,195,0)',
  'rgb(255,225,0)',
  'rgb(255,255,0)',
  'rgb(170,213,0)',
  'rgb(85,170,0)',
  'rgb(0,128,0)',
  'rgb(0,85,0)',
  'rgb(0,43,170)',
  'rgb(0,0,255)',
  'rgb(25,0,213)',
  'rgb(50,0,172)',
  'rgb(75,0,130)',
  'rgb(129,43,166)',
  'rgb(184,87,202)',
  'rgb(208,58,135)',
];

const Welcome = () => {
  return (
    <div className='welcome-container'>
      <img
        src={background}
        alt='Photo by Phoebe Strafford on Unsplash'
        className='bg-image'
      />
      <span className='content'>
        <span className='neon lg yellow'>Kevin</span>
        <span className='neon lg yellow'>Andrews</span>
        <div class='waviy'>
          {[...'web developer'].map((x, i) => (
            <span
              style={{
                '--i': i,
                color: rainbow[~~((20 / 13) * i + 1)],
                //color: `var(--rainbow-${~~((20 / 13) * i + 1)}) !important`,
              }}
            >
              {x === ' ' ? <span>&nbsp;</span> : x}
            </span>
          ))}
        </div>
        {/* <span className='jobs'>
          <span className='card red' ref={pmHoverRef}>
            <p className='title'>Marketing Project Manager</p>
            <span className={isPmHovered ? 'details active' : 'details'}>
              <p>2017</p>
              <span className='icons'>
                <i class='icon-googleanalytics' />
                <i class='icon-googleads' />
                <i class='icon-bing' />
                <i class='icon-facebook' />
                <i class='icon-pinterest' />
              </span>
            </span>
          </span>
          <span className='card blue'>
            <p className='title'>Data Analyst</p>
            <span className='details'>
              <p>2019</p>
              <span className='icons'>
                <i className='icon-python'></i>
                <i class='icon-pandas_mark'>
                  <span class='path1'></span>
                  <span class='path2'></span>
                  <span class='path3'></span>
                  <span class='path4'></span>
                  <span class='path5'></span>
                  <span class='path6'></span>
                  <span class='path7'></span>
                  <span class='path8'></span>
                </i>
                <i className='icon-mysql'></i>
                <i className='icon-postgresql'></i>
                <i className='icon-mongodb'></i>
              </span>
            </span>
          </span>
          <span className='card green'>
            <p className='title'>Web Developer</p>
            <span className='details'>
              <p>2020</p>
              <span className='icons'>
                <i class='icon-react' />
                <i class='icon-redux' />
                <i class='icon-html5' />
                <i class='icon-css3' />
                <i class='icon-python' />
              </span>
            </span>
          </span>
        </span> */}
        {/* <p className='welcome-text'>
          I am a Web Developer based in Seattle, Washington. I graduated with a
          degree in Business Marketing. After working in marketing for a few
          years, I discovered a passion for data analysis and web development.
          Solving problems and building applications has become my career focus
          and drive.
        </p> */}
      </span>
    </div>

    // <div className='welcome-info'>
    //   <p className='purple'>Dektop: use arrow keys or visible arrows</p>
    //   <p className='blue'>Mobile: swipe to navigate.</p>
    //   <p style={{ fontSize: '.65rem' }} className='green'>
    //     Desktop recommended for best experience
    //   </p>
    // </div>
  );
};

export default Welcome;
