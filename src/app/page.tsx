import { type NextPage, Metadata } from 'next';

import Link from 'next/link';

import About from '~/components/sections/About';
import School from '~/components/sections/School';
import TextAsCode from '~/components/TextAsCode';

import { bonanzaExperience } from '../lib/bonanzaExperience';
import bonzIcon from '~/../public/images/bonz_green_square@2x.png';
import { masakaliExperience } from '../lib/masakaliExperience';
import masakaliIcon from '~/../public/images/masakali-logo-sm.png';
import Projects from '~/components/sections/projects';
import AdminDashboard from '~/components/sections/projects/AdminDashboard';

// export const metaData: Metadata = {
//   title: "Kevin Andrews Portfolio"
// }

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center font-roboto font-bold">
        <section
          id="banner"
          className="w-full max-w-[65vw] h-dvh flex flex-col justify-center  container p-1 md:p-4"
        >
          <TextLink href="#about">
            <h1>
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
      <Projects>
        <AdminDashboard />
      </Projects>
    </>
  );
};

export default Home;

const TextLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-105 hover:text-comment"
    >
      {children}
    </Link>
  );
};
