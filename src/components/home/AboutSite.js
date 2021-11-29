import React from 'react';

const AboutSite = () => {
  return (
    <div className='about-site center col'>
      <div className=' about-site-text'>
        <h2 className='h2-3'>About this site</h2>
        <span className='about-site-btn-container'>
          <div className='about-site-btn'>About Me</div>
          <div className='about-site-btn'>Projects</div>
          <div className='about-site-btn'>Contact</div>
        </span>
        <p className='left'>This site was built with:</p>
        <ul className='left'>
          <li>React</li>
          <li>Sass</li>
        </ul>
        <p className='right'>Other things to say</p>
      </div>
    </div>
  );
};

export default AboutSite;
