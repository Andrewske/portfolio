import React from 'react';
import ExperienceItem from './ExperienceItem';
import background from '../../img/rene-bohmer-ypE8q1gZsh4-unsplash.jpg';

const Experience = () => {
  return (
    <section className='container center-col'>
      <img
        src={background}
        alt='Photo by <a href="https://unsplash.com/es/@clarktibbs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Clark Tibbs</a> on <a href="https://unsplash.com/s/photos/black-and-white?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
        className='bg-image'
      />
      <h2>Years of Experience</h2>
      <span className='experience-items'>
        <span className='experience-items-col'>
          <h3 className='red'>Marketing</h3>
          <ExperienceItem
            icon='googleanalytics'
            years={6}
            data='Google Analytics'
          />
          <ExperienceItem icon='googleads' years={6} data='Google Ads' />
          <ExperienceItem icon='bing' years={4} data='Bing Ads' />
          <ExperienceItem icon='facebook' years={4} data='Facebook Ads' />
          <ExperienceItem icon='pinterest' years={4} data='Pinterest Ads' />
        </span>
        <span className='experience-items-col'>
          <h3 className='green'>Data Analysis</h3>
          <ExperienceItem icon='python' years={4} data='Python' />
          <ExperienceItem icon='pandas' years={4} data='Pandas' />
          <ExperienceItem icon='mysql' years={4} data='MySQL' />
          <ExperienceItem icon='postgresql' years={4} data='PostgreSQL' />
          <ExperienceItem icon='mongodb' years={4} data='MongoDB' />
        </span>
        <span className='experience-items-col'>
          <h3 className='blue'>Web Developement</h3>
          <ExperienceItem icon='react' years={2} data='React' />
          <ExperienceItem icon='redux' years={2} data='Redux' />
          <ExperienceItem icon='html5' years={4} data='HTML' />
          <ExperienceItem icon='css3' years={4} data='CSS' />
        </span>
      </span>
    </section>
  );
};

export default Experience;
