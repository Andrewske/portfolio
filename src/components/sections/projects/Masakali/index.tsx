'use client';

import Image from 'next/image';

import MasakaliImage from '~/../public/images/Masakali/masakali_villas_main_image.png';
import Row from '~/components/Row';
import { PropsWithChildren } from 'react';
import Container from '~/components/Container';

const Section = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-keyword">{title}</h3>
      {children}
    </div>
  );
};

const MasakaliRetreat = () => {
  return (
    <Row id="admin-dashboard">
      <Container>
        <div className="flex flex-col gap-8">
          <h2 className="text-center font-bold text-comment">
            Masakali Retreat Website
          </h2>
          <Section title="Project Overview">
            <p>
              <span className="text-common">
                The Masakali Retreat website is designed for a retreat center in
                Bali, aimed at attracting visitors and managing bookings.
              </span>{' '}
              The project began in June 2020 and was my first major project
              intended for production use. It involved building a website from a
              design provided by a designer, integrating various APIs for
              booking and payment, and ensuring a seamless user experience for
              visitors.
            </p>
          </Section>
          <Section title="Development Timeline">
            <ul>
              <li>
                <strong className="text-declaration">Start Date:</strong> June
                2020
              </li>
              <li>
                <strong className="text-declaration">
                  Rebuild Start Date:
                </strong>{' '}
                May 2023
              </li>
            </ul>
          </Section>
          <Section title="Key Features">
            <ul>
              <li className="text-common">
                Dynamic booking system integrated with Smoobu API for real-time
                pricing and availability.
              </li>
              <li className="text-common">
                Currency conversion for displaying prices in multiple
                currencies.
              </li>
              <li className="text-common">
                Secure checkout process using Stripe API (later switched to
                Xendit).
              </li>
              <li>Google Login authentication with Passport.js.</li>
              <li>Email functionality using SendGrid API.</li>
              <li>State management using Redux and react-query.</li>
            </ul>
          </Section>
          <Section title="Technologies Used">
            <ul>
              <li>
                <strong className="text-declaration">Initial Build:</strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Frontend:</strong> React,
                  Redux, React-Query
                </li>
                <li>
                  <strong className="text-declaration">Backend:</strong>{' '}
                  Node.js, Express
                </li>
                <li>
                  <strong className="text-declaration">Database:</strong>{' '}
                  MongoDB
                </li>
                <li>
                  <strong className="text-declaration">Authentication:</strong>{' '}
                  Passport.js with Google Login
                </li>
                <li>
                  <strong className="text-declaration">Email:</strong> SendGrid
                  API
                </li>
                <li>
                  <strong className="text-declaration">Payments:</strong> Stripe
                  API
                </li>
                <li>
                  <strong className="text-declaration">APIs:</strong> Smoobu
                  API, Currency API
                </li>
              </ul>
              <li>
                <strong className="text-declaration">Rebuild:</strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Frontend:</strong>{' '}
                  Next.js, Tailwind CSS
                </li>
                <li>
                  <strong className="text-declaration">Backend:</strong>{' '}
                  Serverless routes with Next.js
                </li>
                <li>
                  <strong className="text-declaration">Database:</strong>{' '}
                  Prisma, PostgreSQL
                </li>
                <li>
                  <strong className="text-declaration">Language:</strong>{' '}
                  Typescript
                </li>
                <li>
                  <strong className="text-declaration">Payments:</strong> Xendit
                  API
                </li>
              </ul>
            </ul>
          </Section>
          <Section title="Challenges and Solutions">
            <ol className="ml-8 list-decimal">
              <li>
                <strong className="text-declaration">
                  Initial Integration with Smoobu API:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Synchronizing real-time pricing and reservations with booking
                  sites.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  <span className="text-common">
                    Integrated the Smoobu API to ensure the website reflected
                    up-to-date prices and availability. Implemented webhooks to
                    automatically update the database with rate and reservation
                    changes.
                  </span>
                </li>
              </ul>

              <li>
                <strong className="text-declaration">
                  Checkout Process Management:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Complex state management and integration with Stripe for
                  secure payments.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  Developed custom hooks like useConversionRate,
                  useCurrencyFormat, and useVillaPricing to manage state and
                  reusable functions. Created a smooth checkout process that
                  sent booking information to Smoobu.
                </li>
              </ul>
              <li>
                <strong className="text-declaration">
                  Rebuilding for Efficiency:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Improving code efficiency and transitioning to a more modern
                  tech stack.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  <span className="text-common">
                    Rewrote the site using Next.js, Tailwind CSS, Prisma,
                    PostgreSQL, and Typescript. This improved performance, code
                    cleanliness, and introduced full type safety.
                  </span>
                </li>
              </ul>
              <li>
                <strong className="text-declaration">
                  Switching Payment Processors:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Transitioning from Stripe to Xendit due to legal and
                  accounting issues.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  Overcame the limitations of Xendit’s less developed API by
                  developing custom solutions to handle payment processing,
                  ensuring secure and reliable transactions.
                </li>
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
                <li>Built Node.js Express server and integrated MongoDB.</li>
                <li>Implemented authentication with Passport.js.</li>
                <li>Set up email functionality using SendGrid and email-js.</li>
                <li>
                  Integrated Smoobu API for booking management and Currency API
                  for currency conversion.
                </li>
                <li>
                  Migrated backend to serverless routes with Next.js and
                  switched to Prisma and PostgreSQL during the rebuild.
                </li>
              </ul>
              <li>
                <strong className="text-declaration">
                  Frontend Development
                </strong>
              </li>
              <ul>
                <li>
                  Developed the initial frontend with React and later rebuilt
                  with Next.js for improved performance.
                </li>
                <li>
                  Implemented state management with Redux and react-query.
                </li>
                <li>
                  Styled the application using SASS and Tailwind CSS during the
                  rebuild.
                </li>
                <li>
                  Created reusable components and custom hooks for managing
                  pricing and currency conversion.
                </li>
              </ul>
              <li>
                <strong className="text-declaration">Deployment:</strong>
              </li>
              <ul>
                <li>
                  Deployed the initial site on Heroku and the rebuilt site using
                  serverless architecture with Next.js and Vercel.
                </li>
                <li>
                  Ensured continuous integration and deployment for ongoing
                  updates and maintenance.
                </li>
              </ul>
            </ol>
          </Section>
          <Section title="Outcome">
            <ul>
              <li className="text-common">
                Successfully launched a fully functional website that attracts
                visitors and manages bookings seamlessly.
              </li>
              <li className="text-common">
                Enhanced user experience with real-time booking and currency
                conversion features.
              </li>
              <li>
                Improved performance and code quality with the rebuild using
                modern technologies.
              </li>
            </ul>
          </Section>
          <Section title="Performance">
            <ul>
              <li className="text-common">
                Lighthouse performance score improved from 90 to 98.
              </li>
              <li className="text-common">
                First Contentful Paint (FCP) reduced from 0.7 seconds to 0.4
                seconds.
              </li>
              <li className="text-common">
                Largest Contentful Paint (LCP) reduced from 1.9 seconds to 1
                second.
              </li>
              <li className="text-common">
                Speed Index reduced from 1.3 seconds to 0.8 seconds.
              </li>
            </ul>
          </Section>
        </div>
      </Container>
      <Image
        src={MasakaliImage}
        alt="Masakali villas page"
        className="w-full h-auto"
      />
    </Row>
  );
};

export default MasakaliRetreat;
