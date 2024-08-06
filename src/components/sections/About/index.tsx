import { aboutKevin } from '~/lib/about';
import TextAsCode from '~/components/TextAsCode';
import kevinImage from '~/../public/images/me-profile.png';

const About = () => {
  return (
    <TextAsCode
      data={aboutKevin}
      id="about"
      image={kevinImage}
      alt="kevin"
    />
  );
};

export default About;
