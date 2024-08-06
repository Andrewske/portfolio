import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import Container from '~/components/Container';
import Row from '~/components/Row';

const Projects = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Row id="projects">
        <Container>
          <div className="flex flex-col gap-4 w-full items-center">
            <h2 className="font-bold text-comment">Projects</h2>

            <Link
              href="#admin-dashboard"
              className="hover:text-keyword "
            >
              <span>
                <h3>Bonanza & Vercado Dashboards</h3>
                <p className="text-center">(Data Analysis & Web Development)</p>
              </span>
            </Link>
          </div>
        </Container>
      </Row>
      {children}
    </div>
  );
};

export default Projects;
