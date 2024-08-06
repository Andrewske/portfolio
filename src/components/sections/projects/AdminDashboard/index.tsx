'use client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

import AdminDashboardImage1 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_summary_page.png';
import AdminDashboardImage2 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_activated_page.png';
import AdminDashboardImage3 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_memberships_page.png';
import AdminDashboardImage4 from '~/../public/images/AdminDashboard/vercado_admin_dashboard_backorders_page.png';
import Container from '~/components/Container';
import Row from '~/components/Row';
import { PropsWithChildren } from 'react';

const images = [
  {
    src: AdminDashboardImage1,
    alt: 'Bonanza Admin Dashboard Summary Page',
  },
  {
    src: AdminDashboardImage2,
    alt: 'Bonanza Admin Dashboard Activated Page',
  },
  {
    src: AdminDashboardImage3,
    alt: 'Bonanza Admin Dashboard Memberships Page',
  },
  {
    src: AdminDashboardImage4,
    alt: 'Vercado Admin Dashboard Backorders Page',
  },
];

const renderImages = () => {
  return images.map(({ src, alt }, index) => (
    <Image
      priority={index === 0}
      className="object-contain"
      key={alt}
      src={src}
      alt={alt}
    />
  ));
};

const Section = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-keyword">{title}</h3>
      {children}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <Row id="admin-dashboard">
      <Container>
        <div className="flex flex-col gap-8">
          <h2 className="text-center font-bold text-comment">
            Bonanza Admin & Vercado Customer Dashboard
          </h2>
          <Section title="Project Overview">
            <p>
              The Bonanza Admin Dashboard is a comprehensive tool designed for
              the Bonanza team, featuring various dashboards with charts and
              tables to provide up-to-date data for decision-making. It has been
              expanded to include a consumer-facing dashboard for Vercado,
              enabling users to view stats on their sales and inventory.
            </p>
          </Section>
          <Section title="Development Timeline">
            <ul>
              <li>
                <strong className="text-declaration">Start Date:</strong>{' '}
                September 2023
              </li>
            </ul>
          </Section>
          <Section title="Key Features">
            <ul>
              <li>Multiple dashboards for the Bonanza team</li>
              <li>Consumer-facing dashboard for Vercado (in progress)</li>
              <li>Real-time data visualization and user experience design</li>
            </ul>
          </Section>
          <Section title="Technologies Used">
            <ul>
              <li>
                <strong className="text-declaration">Backend:</strong> Python,
                MySQL, PostgreSQL, Pandas, Polars, AWS
              </li>
              <li>
                <strong className="text-declaration">Frontend:</strong>React,
                Typescript, Tailwind CSS, Tanstack Router, Tanstack Query
              </li>
            </ul>
          </Section>
          <Section title="Challenges and Solutions">
            <ol className="ml-8 list-decimal">
              <li>
                <strong className="text-declaration">Data Query Speed:</strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong> Slow
                  data queries from a large dataset dating back to 2008 using
                  MySQL 5.6 without advanced features.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>
                </li>
                <ul>
                  <li>
                    <span className="text-common">
                      Optimized queries and data processing to reduce execution
                      time from over 10 minutes to less than 5 minutes.
                    </span>
                  </li>
                  <li>
                    Utilized reusable functions and advanced techniques to clean
                    and optimize code.
                  </li>
                  <li>
                    Integrated Polars, an alternative to Pandas written in Rust,
                    for significant speed improvements.
                  </li>
                </ul>
              </ul>

              <li>
                <strong className="text-declaration">
                  Expanding to Consumer-Facing Dashboard:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Initially designed for internal use, the dashboard needed to
                  be modified for Vercado customers. This required changing
                  authentication, setting up a new PostgreSQL database, and
                  ensuring secure, private access for different user types.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>
                </li>
                <ul>
                  <li>
                    Modified authentication system and created a PostgreSQL
                    database.
                  </li>
                  <li>
                    <span className="text-common">
                      Implemented private routes using Tanstack Router to ensure
                      Bonanza users see only the Bonanza dashboard and Vercado
                      users see their own dashboard.
                    </span>
                  </li>
                  <li>
                    Developed a backend Express server to connect to each user’s
                    PostgreSQL database and provide data to the frontend
                    dashboard.
                  </li>
                  <li>
                    Deployed the new server on AWS to ensure scalability and
                    reliability.
                  </li>
                </ul>
              </ul>
            </ol>
          </Section>
          <Section title="Development Process">
            <ol>
              <li>
                <strong className="text-declaration">
                  Backend Development
                </strong>
              </li>
              <ul>
                <li>
                  Queried Bonanza’s database and processed data using Python and
                  Pandas.
                </li>
                <li>
                  Set up an Express server for Vercado users, connected to
                  PostgreSQL databases, and deployed it on AWS.
                </li>
              </ul>
              <li>
                <strong className="text-declaration">
                  Frontend Development
                </strong>
              </li>
              <ul>
                <li>Built the frontend with React and Typescript.</li>
                <li>
                  <span className="text-common">
                    Developed 13 different dashboards for Bonanza and 2 for
                    Vercado.
                  </span>
                </li>
                <li>
                  Implemented private routing and user-specific data access.
                </li>
              </ul>
            </ol>
          </Section>
          <Section title="Outcome">
            <ul>
              <li>
                The optimized dashboard now provides faster data retrieval and
                processing, enhancing the user experience and reducing resource
                usage on the database.
              </li>
              <li>
                <span className="text-common">
                  Successfully expanded functionality to serve both internal
                  staff and external customers, ensuring secure and efficient
                  data access.
                </span>
              </li>
            </ul>
          </Section>
        </div>
      </Container>
      <Carousel
        className="w-full h-auto [&>div>button]:!bg-purple "
        // autoFocus={true}
        infiniteLoop={true}
        autoPlay={true}
        dynamicHeight={true}
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
        showArrows={true}
        showIndicators={false}
        interval={5000}
      >
        {renderImages()}
      </Carousel>
    </Row>
  );
};

export default AdminDashboard;
