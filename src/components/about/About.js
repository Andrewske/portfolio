import React from 'react';
import { MdSchool } from 'react-icons/md';
import bonzLogo from '../../logos/bonanza_hi_res_square.png';
import pythonLogo from '../../logos/python-logo.png';

const About = () => {
  return (
    <section className='container' id='about'>
      <div>
        <h2 className='h2-2'>About Me</h2>
        <span className='about-card'>
          <span className='header'>
            <p className='neon blue'>2016</p>
          </span>
          <span className='about-line'>
            <MdSchool class='md-icon' />
            <span>Central Washington University</span>
          </span>
          <span className='about-line'>
            <MdSchool class='md-icon' />
            <span>BS in Business Marketing - 2016</span>
          </span>
        </span>
        <span className='about-card'></span>
        <span className='about-card'>
          <img src={bonzLogo} alt='bonanza.com' className='bonz-logo' />
          <span>Support Agent at Bonanza - 2016</span>
        </span>
        <span className='about-card'>
          <img src={bonzLogo} alt='bonanza.com' className='bonz-logo' />
          <span>Marketing Project Manager - 2017</span>
        </span>
        <span className='about-card'>
          <img src={pythonLogo} alt='python' className='bonz-logo' />
          <span>Learning Python, Pandas, MySql - 2018</span>
        </span>
        <span className='about-card'>
          <img src={bonzLogo} alt='bonanza.com' className='bonz-logo' />
          <span>Project Manager & Data Analyst - 2019</span>
        </span>
        <p>
          In 2019, I began to learn Web Developement, specifically{' '}
          <span className='green'>React</span>,{' '}
          <span className='green'>NodeJS</span>,{' '}
          <span className='green'>MongoDB</span>,{' '}
          <span className='green'>PostgreSQL</span>.
        </p>
      </div>
    </section>
  );
};

export default About;
