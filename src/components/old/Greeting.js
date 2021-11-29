import React, { useEffect, useState, useCallback } from 'react';
import Template from './Template';
import styled from 'styled-components';

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 1s ease-in-out;
`;

const Text = styled.h1`
  background-image: url('https://source.unsplash.com/RnCPiXixooY/1000x1000');
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  width: 100%;
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(4rem, 1rem + 7vw, 12rem);
  line-height: 8;
  box-sizing: border-box;
`;

const Greeting = (props) => {
  return (
    <Template {...props}>
      <Box>
        <Text>Welcome</Text>
      </Box>
    </Template>
  );
};

export default Greeting;
