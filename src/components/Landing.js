import React, { Fragment, useState, useRef } from 'react';
import { isDesktop } from 'react-device-detect';
import Template from './Template';
import Welcome from './home/Welcome';
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
    <section
      onKeyDown={(e) => handleKeyDown({ e, handleClick })}
      tabIndex='-1'
      onTouchStart={(e) => handleTouchStart({ e, setTouchPosition })}
      onTouchEnd={(e) =>
        handleTouchEnd({ e, touchPosition, setTouchPosition, handleClick })
      }
    >
      {/* {isDesktop && <Arrows handleClick={handleClick} />} */}

      {/* Home Screens */}
      <Template
        children={<Welcome />}
        active={current === 1}
        direction={direction}
      />
      <Template
        children={<AboutSite />}
        active={current === 2}
        direction={direction}
      />

      <Template children={3} active={current === 3} direction={direction} />
      <Template
        children={<About />}
        active={current === 4}
        direction={direction}
      />
      <Template children={5} active={current === 5} direction={direction} />
      <Template children={6} active={current === 6} direction={direction} />
      <Template
        children={<Projects />}
        active={current === 7}
        direction={direction}
      />
      <Template
        children={<Masakali />}
        active={current === 8}
        direction={direction}
      />
      <Template children={9} active={current === 9} direction={direction} />
      <Template children={10} active={current === 10} direction={direction} />
      {/* <About /> */}
    </section>
  );
};

export default Landing;
