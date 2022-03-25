import React from 'react';
import DOMPurify from 'dompurify';

const ProjectFeature = ({ active, handleClick, details }) => {
  return (
    <div className={`feature ${active && 'active'}`}>
      <span className='header' onClick={handleClick}>
        <h2>{details.name}</h2>
      </span>

      <span className='details'>
        <img src={details.src} alt={details.alt} />
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(details.details),
          }}
        />
      </span>
    </div>
  );
};

export default ProjectFeature;
