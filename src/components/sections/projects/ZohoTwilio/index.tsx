'use client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

import ZohoTwilioImage from '~/../public/images/ZohoTwilio/zoho_twilio_screenshot.png';
import Container from '~/components/Container';
import Row from '~/components/Row';
import { PropsWithChildren } from 'react';

const Section = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-keyword">{title}</h3>
      {children}
    </div>
  );
};

const ZohoTwilio = () => {
  return (
    <Row id="zoho-twilio">
      <Container>
        <div className="flex flex-col gap-8">
          <h2 className="text-center font-bold text-comment">
            Twilio SMS & Zoho CRM Integration for Fred Astaire Dance Studio
          </h2>
          <Section title="Project Overview">
            <p>
              <span className="text-common">
                This integration project enables Fred Astaire Dance Studio to
                send and receive text messages within their Zoho CRM for each
                contact.
              </span>
              The application features a chat-like module within each Zoho
              Contact/Lead, allowing users to manage SMS communications
              seamlessly.
            </p>
          </Section>
          <Section title="Development Timeline">
            <ul>
              <li>
                <strong className="text-declaration">Start Date:</strong>{' '}
                November 2023
              </li>
              <li>
                <strong className="text-declaration">Completion Date:</strong>{' '}
                January 2024 (ongoing maintenance and feature additions)
              </li>
            </ul>
          </Section>
          <Section title="Key Features">
            <ul>
              <li className="text-common">
                Chat-like application within Zoho CRM for managing SMS
                communications.
              </li>
              <li className="text-common">
                Automatic welcome message for new leads and follow-up messages
                based on responses.
              </li>
              <li>
                Webhook to handle calls and send XML responses via Twilio&apos;s
                TwiML.
              </li>
              <li className="text-common">
                Integration with Zoho Analytics to incorporate Twilio stats.
              </li>
              <li>Database management for tracking messages and contacts.</li>
            </ul>
          </Section>
          <Section title="Technologies Used">
            <ul>
              <li>
                <strong className="text-declaration">Backend:</strong> Next.js,
                Prisma, Twilio API, Zoho API, Postgres
              </li>
              <li>
                <strong className="text-declaration">Frontend:</strong>React
                (Next.js framework), Jest
              </li>
              <li>
                <strong className="text-declaration">Hosting:</strong>Vercel
              </li>
            </ul>
          </Section>
          <Section title="Challenges and Solutions">
            <ol className="ml-8 list-decimal">
              <li>
                <strong className="text-declaration">
                  Integrating with Zoho Extension Creator:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Difficulty in inserting the application into Zoho through
                  their Extension creator, especially with a Vite application
                  due to static HTML packaging limitations.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  <span className="text-common">
                    Transitioned to a serverless approach using Next.js and
                    Vercel, which allowed for more dynamic capabilities and
                    seamless integration with Zoho.
                  </span>
                  Vercel, which allowed for more dynamic capabilities and
                  seamless integration with Zoho.
                </li>
              </ul>

              <li>
                <strong className="text-declaration">
                  Database Migration:
                </strong>
              </li>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Initially using MySQL, but faced limitations and needed a more
                  robust solution.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  <span className="text-common">
                    Migrated the database to Postgres to utilize Vercel Postgres
                    storage, improving scalability and performance.
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <strong className="text-declaration">Challenge:</strong>{' '}
                  Ensuring secure access to contact messages and information.
                </li>
                <li>
                  <strong className="text-declaration">Solution:</strong>{' '}
                  <span className="text-common">
                    Implemented API routes that require an access token from the
                    Zoho user to access messages and contact information.
                  </span>
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
                <li>
                  Integrated Twilio API and Zoho API for seamless communication.
                </li>
                <li>
                  Set up a Postgres database for storing contact information and
                  tracking messages.
                </li>
                <li>
                  Created webhooks to handle incoming messages and calls, and
                  send automated responses.
                </li>
                <li>
                  Integrated Twilio stats into Zoho Analytics for comprehensive
                  data analysis.
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
                  Developed a chat-like interface within Zoho CRM using React
                  (Next.js).
                </li>
                <li>
                  Implemented features for loading contact information and
                  message history.
                </li>
              </ul>
              <li>
                <strong className="text-declaration">Deployment</strong>
              </li>
              <ul>
                <li>
                  Deployed the application using Vercel for serverless hosting.
                </li>
                <li>
                  Configured webhooks and APIs to ensure reliable and real-time
                  communication.
                </li>
              </ul>
            </ol>
          </Section>
          <Section title="Outcome">
            <ul>
              <li>
                <span className="text-common">
                  Successfully enabled Fred Astaire Dance Studio to manage SMS
                  communications directly within Zoho CRM.
                </span>
              </li>
              <li>
                <span className="text-common">
                  Automated welcome and follow-up messages improved lead
                  engagement.
                </span>
              </li>
              <li>
                <span className="text-common">
                  Integration with Zoho Analytics provided enhanced data
                  insights.
                </span>
              </li>
              <li>
                Ongoing maintenance and feature additions continue to enhance
                the application’s functionality.
              </li>
            </ul>
          </Section>
          <Section title="User Feedback">
            <p className="italic text-common">
              &quot;The integration has significantly streamlined our
              communication process. The ability to manage text messages
              directly within Zoho CRM and having automated follow-ups has
              improved our engagement with leads and customers.&quot; - Fred
              Astaire Dance Studio
            </p>
          </Section>
        </div>
      </Container>
      <Image
        src={ZohoTwilioImage}
        alt="Zoho Twilio Screenshot"
        className="w-full h-auto"
      />
    </Row>
  );
};

export default ZohoTwilio;
