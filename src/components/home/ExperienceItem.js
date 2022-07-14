import React, { useRef, useState } from 'react';
import useHover from '../../hooks/useHover';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { rainbow } from '../../utils/rainbowColors';

const ExperienceItem = ({ icon, years = 0 }) => {
  const pandas = (
    <i data-hover='pandas' className='icon-pandas_mark'>
      <span class='path1'></span>
      <span class='path2'></span>
      <span class='path3'></span>
      <span class='path4'></span>
      <span class='path5'></span>
      <span class='path6'></span>
      <span class='path7'></span>
      <span class='path8'></span>
    </i>
  );
  return (
    <span className={'experience-item'}>
      {icon === 'pandas' ? (
        pandas
      ) : (
        <i data-hover={icon} class={`icon-${icon}`}></i>
      )}
      {[...Array(6).keys()].map((year, i) => (
        <span
          style={
            i >= years
              ? { background: 'black' }
              : { background: rainbow[~~((20 / years) * year + 1)] }
          }
          className='experience-item-year'
        ></span>
      ))}
    </span>
  );
};

export default ExperienceItem;
