import React, { Fragment } from 'react';

const Arrows = ({ handleClick }) => {
  return (
    <Fragment>
      <span className='top-bar'>
        <i
          className='icon-cheveron-up up-arrow'
          onClick={() => handleClick('up')}
        />
      </span>
      <span className='bottom-bar'>
        <i
          className='icon-cheveron-down down-arrow'
          onClick={() => handleClick('down')}
        />
      </span>
      <span className='left-bar'>
        <i
          className='icon-cheveron-left left-arrow'
          onClick={() => handleClick('left')}
        />
      </span>
      <span className='right-bar'>
        <i
          className='icon-cheveron-right right-arrow'
          onClick={() => handleClick('right')}
        />
      </span>
    </Fragment>
  );
};

export default Arrows;
