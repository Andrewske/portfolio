import React, { Fragment, useState, useRef } from 'react';
import { isDesktop } from 'react-device-detect';
import Template from './Template';
import Welcome from './home/Welcome';
import Experience from './home/Experience';
import AboutSite from './home/AboutSite';
import About from './about/About';
import Projects from './projects/Projects';
import Masakali from './projects/Masakali';
import Arrows from './Arrows';
import { handleTouchStart, handleTouchEnd } from '../utils/handleTouch';
import { handleKeyDown } from '../utils/handleKeyDown';
import pageChange from '../utils/pageChange';

const pageOrder = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9, 10],
];

const Landing = () => {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleClick = (type) => {
    // Type is a direction string e.g. 'left'
    console.log(type);
    setDirection(type);
    pageChange({ type, current, setCurrent, pageOrder });
  };

  return (
    <Fragment>
      <Welcome />
      <Experience />
      <Projects />
    </Fragment>
  );
};

export default Landing;
