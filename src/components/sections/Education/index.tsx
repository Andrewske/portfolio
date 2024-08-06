import { education } from '~/lib/education';
import TextAsCode from '~/components/TextAsCode';
import universityIcon from '~/../public/images/icons8-university-50.png';

const Education = () => {
  return (
    <TextAsCode
      data={education}
      id="education"
      image={universityIcon}
      alt="university-icon"
    />
  );
};

export default Education;
