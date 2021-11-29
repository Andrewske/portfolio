import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  transform: translateX(${(props) => props.moveX});
  // grid-column: ${(props) => props.col};
  // grid-row: ${(props) => props.row};
  flex-grow: ${(props) => props.row};
  height: 33vh;
  text-align: center;
  width: fit-content;
  min-width: 350px;
  display: flex;
  align-items: center;
  opacity: ${(props) => props.opacity};
  transition: all 1s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: ${(props) => props.sideLeft};
    right: ${(props) => props.sideRight};
    width: 2px;
    transform: translateX(-00%);
    z-index: 2;
    background: #1db954;
    height: ${(props) => props.height + 'px' || '0px'};
    transition: all 1s ease-in-out;
    transform: rotate(${(props) => props.rotate});
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    left: ${(props) => props.bottomLeft};
    right: ${(props) => props.bottomRight};
    bottom: 0;
    background: #1db954;
    transition: all 1s ease-in-out;
    width: ${(props) => props.width + 'px' || '0px'};
    //max-width: max-content;
  }
`;

const Template = ({
  children,
  row = 2,
  col = '3 / 4',
  moveX = 0,
  sideLeft = 'none',
  sideRight = 'none',
  bottomLeft = 'none',
  bottomRight = 'none',
  rotate = 0,
}) => {
  const [objHeight, setObjHeight] = useState(0);
  const [objWidth, setObjWidth] = useState(0);
  const [borderHeight, setBorderHeight] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const elem = useRef(null);
  const innerHeight = window.innerHeight;

  useEffect(() => {
    const height = elem.current.offsetHeight;
    const width = elem.current.offsetWidth;
    setObjHeight(height);
    setObjWidth(Math.max(width, 350));
    console.log(height, width);
  }, []);

  useEffect(() => {
    setTopPosition(elem.current.getBoundingClientRect().top);
    setBottomPosition(elem.current.getBoundingClientRect().bottom);
  }, [scrollHeight]);

  useEffect(() => {
    if (topPosition <= innerHeight * 0.65) {
      setBorderHeight(objHeight);
      setOpacity(1 - (topPosition / innerHeight) * 0.7);
    } else {
      setBorderHeight(0);
      setOpacity(0);
    }
    if (bottomPosition <= innerHeight * 0.8) {
      setBorderWidth(objWidth);
    } else {
      setBorderWidth(0);
    }
  }, [
    topPosition,
    bottomPosition,
    scrollHeight,
    innerHeight,
    objHeight,
    objWidth,
  ]);

  const setScroll = useCallback(() => {
    setScrollHeight(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', setScroll);

    return () => {
      window.removeEventListener('scroll', setScroll);
    };
  }, [setScroll]);

  return (
    <span styles='width: 100%'>
      <Box
        id='template'
        ref={elem}
        height={borderHeight}
        width={borderWidth}
        row={row}
        col={col}
        moveX={moveX}
        opacity={opacity}
        sideLeft={sideLeft}
        sideRight={sideRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
        rotate={rotate}
      >
        {children}
      </Box>
    </span>
  );
};

export default Template;
