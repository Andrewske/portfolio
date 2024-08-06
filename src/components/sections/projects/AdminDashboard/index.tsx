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

const AdminDashboard = () => {
  return (
    <Row id="admin-dashboard">
      <Container>
        <div className="flex flex-col gap-4">
          <h2 className="text-center font-bold text-comment">
            Bonanza Admin & Vercado Customer Dashboard
          </h2>
          <h3 className="text-keyword">Project Overview</h3>
          <p className="indent-0">
            The Bonanza Admin Dashboard is a comprehensive tool designed for the
            Bonanza team, featuring various dashboards with charts and tables to
            provide up-to-date data for decision-making. It has been expanded to
            include a consumer-facing dashboard for Vercado, enabling users to
            view stats on their sales and inventory.
          </p>
          <h3 className="text-keyword">Development Timeline</h3>
          <ul className="ml-8 list-disc">
            <li>
              <strong className="text-declaration">Start Date:</strong>{' '}
              September 2023
            </li>
          </ul>
          <h3 className="text-keyword">Key Features</h3>
          <ul className="ml-8 list-disc">
            <li>Multiple dashboards for the Bonanza team</li>
            <li>Consumer-facing dashboard for Vercado (in progress)</li>
            <li>Real-time data visualization and user experience design</li>
          </ul>
          <h3 className="text-keyword">Technologies Used</h3>
          <ul className="ml-8 list-disc">
            <li>
              <strong className="text-declaration">Backend:</strong> Python,
              MySQL, PostgreSQL, Pandas, Polars, AWS
            </li>
            <li>
              <strong className="text-declaration">Frontend:</strong>React,
              Typescript, Tailwind CSS, Tanstack Router, Tanstack Query
            </li>
          </ul>
          <h3 className="text-keyword">Challenges and Solutions</h3>
          <ol className="ml-8 list-decimal">
            <li>
              <strong className="text-declaration">Data Query Speed:</strong>
            </li>
            <ul className="ml-8 list-disc">
              <li>
                <strong className="text-declaration">Challenge:</strong> Slow
                data queries from a large dataset dating back to 2008 using
                MySQL 5.6 without advanced features.
              </li>
              <li>
                <strong className="text-declaration">Solution:</strong>
              </li>
              <ul className="ml-8 list-disc">
                <li>
                  Optimized queries and data processing to reduce execution time
                  from over 10 minutes to less than 5 minutes.
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
            <ul className="ml-8 list-disc">
              <li>
                <strong className="text-declaration">Challenge:</strong>{' '}
                Initially designed for internal use, the dashboard needed to be
                modified for Vercado customers. This required changing
                authentication, setting up a new PostgreSQL database, and
                ensuring secure, private access for different user types.
              </li>
              <li>
                <strong className="text-declaration">Solution:</strong>
              </li>
              <ul className="ml-8 list-disc">
                <li>
                  Modified authentication system and created a PostgreSQL
                  database.
                </li>
                <li>
                  Implemented private routes using Tanstack Router to ensure
                  Bonanza users see only the Bonanza dashboard and Vercado users
                  see their own dashboard.
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
          <h3 className="text-keyword">Development Process</h3>
          <ol className="ml-8 list-decimal">
            <li>
              <strong className="text-declaration">Backend Development</strong>
            </li>
            <ul className="ml-8 list-disc">
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
              <strong className="text-declaration">Frontend Development</strong>
            </li>
            <ul className="ml-8 list-disc">
              <li>Built the frontend with React and Typescript.</li>
              <li>
                Developed 13 different dashboards for Bonanza and 2 for Vercado.
              </li>
              <li>
                Implemented private routing and user-specific data access.
              </li>
            </ul>
          </ol>
          <h3 className="text-keyword">Outcome</h3>
          <ul className="ml-8 list-disc">
            <li>
              The optimized dashboard now provides faster data retrieval and
              processing, enhancing the user experience and reducing resource
              usage on the database.
            </li>
            <li>
              Successfully expanded functionality to serve both internal staff
              and external customers, ensuring secure and efficient data access.
            </li>
          </ul>
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
            interval={10000}
          >
            {renderImages()}
          </Carousel>
        </div>
      </Container>
    </Row>
  );
};

export default AdminDashboard;
