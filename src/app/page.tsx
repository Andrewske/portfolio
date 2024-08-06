import { type NextPage } from 'next';

import About from '~/components/sections/About';
import School from '~/components/sections/School';
import TextAsCode from '~/components/TextAsCode';

import { bonanzaExperience } from '../lib/bonanzaExperience';
import bonzIcon from '~/../public/images/bonz_green_square@2x.png';
import { masakaliExperience } from '../lib/masakaliExperience';
import { aboutKevin } from '~/lib/about';
import masakaliIcon from '~/../public/images/masakali-logo-sm.png';
import Projects from '~/components/sections/projects';
import AdminDashboard from '~/components/sections/projects/AdminDashboard';
import Contact from '~/components/sections/Contact';
import ZohoTwilio from '~/components/sections/projects/ZohoTwilio';
import SocialLinks from '~/components/SocialLinks';
import TextLink from '~/components/TextLink';
import MasakaliRetreat from '~/components/sections/projects/Masakali';
import ScrollToTop from '~/components/ScrollToTop';

const Home: NextPage = () => {
  return (
    <div className="relative">
      <div className="flex flex-col justify-center items-center font-roboto font-bold w-full ">
        <section
          id="banner"
          className="max-w-[75vw] h-dvh flex flex-col justify-center "
        >
          <TextLink href="#about">
            <h1 className="whitespace-normal">
              Hi I&apos;m <br />
              Kevin Andrews
            </h1>
          </TextLink>
          <TextLink href="#masakali">
            <h2>WEB DEVELOPER</h2>
          </TextLink>
          <TextLink href="#bonanza">
            <h2>DATA ANALYST</h2>
          </TextLink>
          <TextLink href="#projects">
            <h2>PROJECTS</h2>
          </TextLink>
          <TextLink href="#contact">
            <h2>CONTACT</h2>
          </TextLink>
          <SocialLinks />
        </section>
      </div>
      <About />
      <School />
      <TextAsCode
        data={masakaliExperience}
        image={masakaliIcon}
        alt="Masakali Logo"
        id="masakali"
      />
      <TextAsCode
        data={bonanzaExperience}
        image={bonzIcon}
        alt="Bonanza Logo"
        id="bonanza"
      />
      <Projects />
      <Contact />
      <ScrollToTop />
    </div>
  );
};

export default Home;
