'use client';

import { useState, useEffect } from 'react';
import { type TypingAnimationProps } from '~/lib/types';

const TypingAnimation = ({ text, speed = 50 }: TypingAnimationProps) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <>
      {typedText}
      <span className="animate-pulse">|</span>
    </>
  );
};

export default TypingAnimation;