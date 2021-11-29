import React from 'react';

const Welcome = () => {
  return (
    <div className='center col'>
      <h1 className='neon yellow'>Welcome</h1>
      <h3>To Kevin's portfolio site.</h3>

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
