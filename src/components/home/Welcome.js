import React from 'react';
import kevin_banff from '../../img/kevin_banff.jpg';

const Welcome = () => {
  return (
    <div className='center'>
      <img src={kevin_banff} alt='Kevin in Banff' className='profile-img' />
      <div className='welcome-intro'>
        <span className='heading'>Kevin Andrews,</span>
        <span className='neon yellow'>Web Developer</span>
        <p className='welcome-text'>
          I am a Web Developer based in Seattle, Washington. I graduated with a
          degree in Business Marketing. After working in marketing for a few
          years, I discovered a passion for data analysis and web development.
          Solving problems and building applications has become my career focus
          and drive.
        </p>
      </div>

      <div className='welcome-info'>
        <p className='purple'>Dektop: use arrow keys or visible arrows</p>
        <p className='blue'>Mobile: swipe to navigate.</p>
        <p style={{ fontSize: '.65rem' }} className='green'>
          Desktop recommended for best experience
        </p>
      </div>
    </div>
  );
};

export default Welcome;
