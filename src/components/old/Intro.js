import React from 'react';
import styled from 'styled-components';
import Template from './Template';

const Box = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  transition: all 1s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('https://source.unsplash.com/gB2tX9EJ91s/500x500');
    background-size: inherit;
    opacity: 0;
    transition: all 1s ease-in-out;
    z-index: 2;
    overflow: hidden;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 1s ease-in-out;
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    &:before {
      opacity: 0.5;
      transform: translateX(-100%);
      transition: all 1s ease-in-out;
      max-width: 500px;
    }

    &:after {
      opacity: 1;
      transform: translateX(100%);
      transition: all 1s ease-in-out;
    }
  }
`;

const Text = styled.div`
  padding: 10px;
`;

const Intro = (props) => {
  return (
    <Template {...props}>
      <Box>
        <Text>
          <h1>I'm Kevin Andrews</h1>
          <ul>
            <li>Software Developer</li>
            <li>Data Analyst</li>
            <li>Marketing Project Manager</li>
          </ul>
        </Text>
      </Box>
    </Template>
  );
};

export default Intro;
