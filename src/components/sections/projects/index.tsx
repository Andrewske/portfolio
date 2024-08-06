import { link } from 'fs';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import Container from '~/components/Container';
import Row from '~/components/Row';

const Project = ({
  title,
  summary,
  tech,
  link,
  githubLink,
}: {
  title: string;
  summary: string;
  tech: string;
  link: string;
  githubLink?: string;
}) => {
  return (
    <div className="flex flex-col text-left w-4/6 border-2 border-comment rounded-lg p-4 md:p-8 gap-4 bg-black relative">
      {githubLink && (
        <div className="absolute top-0 right-0 text-3xl py-8 bg-black z-50 ">
          <Link
            href={link}
            className="flex hover:text-comment"
          >
            <div className="h-9 flex flex-col justify-center items-center pr-4">
              <span className="icon-github"></span>
            </div>
          </Link>
        </div>
      )}
      <h3>
        <strong className="text-keyword ">Project Title:</strong> {title}
      </h3>
      <h3>
        <strong className="text-keyword">Brief Summary:</strong>
      </h3>
      <p>{summary}</p>
      <h3>
        <strong className="text-keyword">Key Technologies Used:</strong>
      </h3>
      <p>{tech}</p>
      <Link
        href={link}
        className="m-auto text-common hover:text-black text-xl border border-comment rounded-lg px-4 py-2 hover:bg-comment w-max"
      >
        View Project
      </Link>
    </div>
  );
};

const Projects = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Row id="projects">
        <Container>
          <div className="flex flex-col gap-4 w-full items-center">
            <h2 className="font-bold text-comment">Projects</h2>

            <Project
              title="Bonanza & Vercado Dashboards"
              summary="A comprehensive dashboard for Bonanza team and Vercado customers, featuring data visualization and user experience design. The project includes real-time data updates, secure access control, and integration with multiple APIs."
              tech="Python, Pandas, PostgreSQL, Express, AWS, React, Typescript, Tailwind CSS, Next.js, Chart.js, Tanstack Router, Tanstack Query"
              link="/admin-dashboard"
            />
            <Project
              title="Masakali Retreat Website"
              summary="Website for a retreat center in Bali, featuring a dynamic booking system, real-time pricing, and currency conversion. The site integrates with Smoobu API for syncing availability and pricing, and has a secure checkout proces"
              tech="React, Node.js, Express, MongoDB, Passport.js, SendGrid API, Redux, React-Query, Next.js, Tailwind CSS, Prisma, PostgreSQL, Typescript, Xendit API"
              link="/masakali"
              githubLink="https://github.com/Andrewske/masakali-t3"
            />
            <Project
              title="Zoho CRM & Twilio SMS Integration"
              summary="Integration for Fred Astaire Dance Studio to manage SMS communications within Zoho CRM. The application features a chat-like module, automated welcome and follow-up messages, and integration with Zoho Analytics for enhanced data insights."
              tech="Next.js, Prisma, Twilio API, Zoho API, Postgres, Jest"
              link="/zoho-twilio"
              githubLink="https://github.com/Andrewske/zoho_twilio_integration_t3"
            />
          </div>
        </Container>
      </Row>
      {children}
    </div>
  );
};

export default Projects;
