import Image from 'next/image';
import universityIcon from '~/../public/images/icons8-university-50.png';
import { textColor } from '~/utils/textColor';
import Row from '../Row';
import Container from '../Container';

const iconSize = 75;

const School = () => {
  return (
    <Row id="school">
      <Container>
        <span className="icon hidden md:flex">
          <Image
            src={universityIcon}
            height={iconSize}
            width={iconSize}
            alt="university-icon"
          />
        </span>
        <span className="flex-center">
          <div className="">
            <p>{textColor('// Education', 'text-comment text-3xl')}</p>
            <p>
              {textColor('const', 'text-keyword')}
              {' BS = '}
              {textColor('Business Administration', 'text-common')}
              {';'}
            </p>
            <p>
              {textColor('const', 'text-keyword')}
              {' specialization = '}
              {textColor('Marketing', 'text-common')}
              {';'}
            </p>
            <p>
              {textColor('const', 'text-keyword')}
              {' college = '}
              {textColor("'Central Washington University'", 'text-common')}
              {';'}
            </p>
            <p>
              {textColor('const', 'text-keyword')}
              {' graduationYear = '}
              {textColor('2016', 'text-common')}
              {';'}
            </p>
          </div>
        </span>
      </Container>
    </Row>
  );
};

export default School;
