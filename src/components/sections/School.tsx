import Image from 'next/image';
import universityIcon from '~/../public/images/icons8-university-50.png';
import Row from '~/components/Row';
import Container from '~/components/Container';

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
            <p><span className="text-comment text-3xl">{'//'} Education</span></p>
            <p>
              <span className="text-keyword">const</span>
              {' BS = '}
              <span className="text-common">Business Administration</span>
              {';'}
            </p>
            <p>
              <span className="text-keyword">const</span>
              {' specialization = '}
              <span className="text-common">Marketing</span>
              {';'}
            </p>
            <p>
              <span className="text-keyword">const</span>
              {' college = '}
              <span className="text-common">&apos;Central Washington University&apos;</span>
              {';'}
            </p>
            <p>
              <span className="text-keyword">const</span>
              {' graduationYear = '}
              <span className="text-common">2016</span>
              {';'}
            </p>
          </div>
        </span>
      </Container>
    </Row>
  );
};

export default School;
