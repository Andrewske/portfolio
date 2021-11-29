import React from 'react';
import kevin_banff from '../../img/kevin_banff.jpg';

const About = () => {
  return (
    <section className='container' id='about'>
      <div className='about-me'>
        <span className='left'>
          <img src={kevin_banff} alt='Kevin in Banff' />
        </span>
        <span className='right'>
          <div>
            <h2 className='h2-2'>About Me</h2>
            <p>
              I graduated in <span className='orange'>2016</span> from Central
              Washington University with a
              <span className='blue'> BS in Business Administration</span>,
              Specialization in Marketing
            </p>
            <p>
              I began working at Bonanza in Seattle in{' '}
              <span className='orange'>2016</span> as a{' '}
              <span className='red'>Support Agent</span>.
            </p>
            <p>
              Promoted to <span className='red'>Marketing Project Manager</span>{' '}
              in <span className='orange'>2017</span>.
            </p>
            <p>
              In this role, I became interested in data analysis and learned to
              query our <span className='green'>MySQL</span> database using{' '}
              <span className='green'>Rails</span> syntax.
            </p>
            <p>
              I learned <span className='green'>Python</span> and{' '}
              <span className='green'>Pandas</span> to analyze Bonanza's data.
            </p>
            <p>
              In <span className='orange'>2019</span>, I moved to a full time
              <span className='red'> remote contract</span> role where I
              continued my project management and data analysis duties.
            </p>
            <p>
              In 2019, I began to learn Web Developement, specifically{' '}
              <span className='green'>React</span>,{' '}
              <span className='green'>NodeJS</span>,{' '}
              <span className='green'>MongoDB</span>,{' '}
              <span className='green'>PostgreSQL</span>.
            </p>
          </div>
        </span>
      </div>
    </section>
  );
};

export default About;
