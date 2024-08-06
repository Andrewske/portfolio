import { aboutKevin } from '~/lib/about';
import TextAsCode from '../TextAsCode';

const About = () => {
  return (
    <TextAsCode
      data={aboutKevin}
      id="about"
    />
  );
};

export default About;
