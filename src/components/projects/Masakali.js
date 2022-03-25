import React, { useState } from 'react';
import ProjectFeature from './ProjectFeature';

const featureDetails = {
  about: {
    name: 'About',
    src: 'https://ik.imagekit.io/4kpopox69zp/Home/navita_deck_lounge_1__KU5WS7eEkr.jpg/tr:w-350',
    details: `<p>
    Masakali is a retreat center in Bali Indonesia. I became a partner and
    began building the website in 2020.
  </p>
  <p>
    The initial site was built with the intention of showing plans to
    investors.
  </p>
  <p>
    Recently, we have begun accepting bookings and I started building a
    direct booking system.
  </p>`,
  },
  gallery: {
    name: 'Gallery',
    src: 'https://ik.imagekit.io/4kpopox69zp/Portfolio/masakali-gallery_-jPDtHzQf.png/tr:w-350',
    details: `<p>masakaliretreat.com contains a homepage gallery and a full gallery</p>`,
  },
  booking: {
    name: 'Booking',
    src: 'https://ik.imagekit.io/4kpopox69zp/Portfolio/masakali-gallery_-jPDtHzQf.png',
  },
};

const Masakali = () => {
  const activeInitialState = { about: false, gallery: false, booking: false };

  const [active, setActive] = useState(activeInitialState);

  return (
    <div className='project-container'>
      <h1>Masakli Retreat</h1>
      <ProjectFeature
        active={active.about}
        handleClick={() => setActive({ ...activeInitialState, about: true })}
        details={featureDetails.about}
      />
      <ProjectFeature
        active={active.gallery}
        handleClick={() => setActive({ ...activeInitialState, gallery: true })}
        details={featureDetails.gallery}
      />

      <ProjectFeature
        active={active.booking}
        handleClick={() => setActive({ ...activeInitialState, booking: true })}
        details={featureDetails.booking}
      />
    </div>
  );
};

export default Masakali;
