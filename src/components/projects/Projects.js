import React from 'react';
import ProjectCard from './ProjectCard';

import MusicMinionImg from '../../img/music-minion-landing-page.png';
import MasakaliImg from '../../img/masakali-retreat-landing-page.png';

const Projects = () => {
  return (
    <div className='container center col'>
      <header>
        <h2>Projects</h2>
      </header>
      <div className='project-card-grid'>
        <div className='project-card'>
          <div className='project-card-flip rgb'>
            <div
              className='project-card-front '
              style={{ backgroundImage: `url(${MusicMinionImg})` }}
            >
              <div className='project-card-flag'>
                <p>Personal</p>
              </div>
            </div>
            <div className='project-card-back'>
              <span className='text'>
                <p>
                  Music Minion is a personal project I build to improve my
                  learning in React. This site uses the spotify API to provide
                  features for finding new music and analyzing playlists using
                  track data.
                </p>
              </span>
              <span className='flex-evenly buttons'>
                <span className='btn'>
                  <i className='icon-github' />
                  Github
                </span>
                <span
                  onClick={() =>
                    window.open('https://www.musicminion.app', '_blank')
                  }
                  className='btn'
                >
                  <i className='icon-earth' />
                  Website
                </span>
                <span className='btn'>
                  <i className='icon-navigation-more' />
                  Details
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='project-card'>
          <div className='project-card-flip rgb'>
            <div
              className='project-card-front '
              style={{ backgroundImage: `url(${MasakaliImg})` }}
            >
              <div className='project-card-flag'>
                <p>Professional</p>
              </div>
            </div>
            <div className='project-card-back'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
