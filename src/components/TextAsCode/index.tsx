import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Row from '../Row';
import Container from '../Container';

const iconSize = 75;

interface TextAsCodeDataType {
  data: {
    className: string;
    text: string[][];
  }[];
  image: StaticImageData;
  alt: string;
  id: string;
}

const TextAsCode = ({ data, image, alt, id }: TextAsCodeDataType) => {
  return (
    <Row id={id}>
      <Container>
        <div>
          <Image
            src={image}
            height={iconSize}
            width={iconSize}
            alt={alt}
            className="w-24 object-contain md:flex flex-col justify-center items-center text-center"
          />
        </div>
        <div className="flex flex-col">
          {data.map(({ className, text }, dataIndex) => (
            <div
              key={'row-' + dataIndex}
              className={`${className}`}
            >
              {text.map(([string, type], textIndex) => (
                <span
                  key={'piece-' + textIndex}
                  className={type}
                >
                  {string}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Row>
  );
};

export default TextAsCode;
