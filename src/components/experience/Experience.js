import React from 'react';
import styled, { keyframes } from 'styled-components';
import { green, black } from '../../colors';
import reactLogo from '../../logos/react-logo.png';
import cssLogo from '../../logos/CSS3-logo.png';
import htmlLogo from '../../logos/html5-logo.png';
import nodejsLogo from '../../logos/nodejs-logo.png';
import pythonLogo from '../../logos/python-logo.png';
import pandasLogo from '../../logos/pandas-logo.png';

import ReactExperience from './ReactExperience';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 25vh;
`;

const Left = styled.div`
  flex: 1 1 40%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1 1 60%;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${green};
  border-radius: 3px;
  margin: 5px;
  transition: all 0.5s ease-in-out;

  &:hover {
    background: ${green};
    color: ${black};
  }
`;

const imageBorder = keyframes`
  0% {
    border: none;
  }
  25% {
    border-top: 1px solid ${green};
  }
  50% {
    border-top: 1px solid ${green};
  }
  25% {
    border-top: 1px solid ${green};
  }
`;

const Experience = () => {
  return (
    <Container>
      <Left>
        <Image src={reactLogo} />
        <Image src={nodejsLogo} />
        <Image src={pythonLogo} />
        <Image src={htmlLogo} />
        <Image src={cssLogo} />
        <Image src={pandasLogo} />
      </Left>
      <Right>
        <ReactExperience />
      </Right>
    </Container>
  );
};

export default Experience;
