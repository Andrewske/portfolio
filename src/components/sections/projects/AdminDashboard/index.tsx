'use client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Link from 'next/link';

import AdminDashboardImage1 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_summary_page.png';
import AdminDashboardImage2 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_activated_page.png';
import AdminDashboardImage3 from '~/../public/images/AdminDashboard/bonanza_admin_dashboard_memberships_page.png';
import AdminDashboardImage4 from '~/../public/images/AdminDashboard/vercado_admin_dashboard_backorders_page.png';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { CodeBlock } from '~/components/ui/CodeBlock';
import { PropsWithChildren } from 'react';
import { projects, ProficiencyLevel } from '~/lib/projects';

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
    <div className="space-y-4">
      <h3 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> {title}
      </h3>
      <div className="text-gray-300 space-y-3">{children}</div>
    </div>
  );
};

const getProficiencyVariant = (proficiency: ProficiencyLevel) => {
  switch (proficiency) {
    case 'Expert':
      return 'proficiencyExpert';
    case 'Proficient':
      return 'proficiencyProficient';
    case 'Familiar':
      return 'proficiencyFamiliar';
  }
};

const AdminDashboard = () => {
  const projectData = projects.find(p => p.id === 'analytics-platform');

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="border border-green-500/20 rounded-lg p-8 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">admin-dashboard-system.py</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-purple-400">class</span>{' '}
              <span className="text-yellow-300">AdminDashboardSystem</span>{' '}
              <span className="text-white">{'{'}</span>
            </div>
            
            <div className="pl-8 space-y-2">
              <div>
                <span className="text-blue-300">description</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;Internal tools platform serving entire operations team&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">status</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;LIVE&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">activeUsers</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;50+ daily users&quot;</span>
              </div>
            </div>
            
            <div>
              <span className="text-white">{'}'}</span>
              <span className="text-white">;</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
            <Badge variant="statusLive">LIVE</Badge>
            <div className="flex gap-4">
              <Button variant="terminal" asChild>
                <Link href="https://admin.bonanza.com">
                  View Dashboard →
                </Link>
              </Button>
              <Button variant="terminalOutline" disabled>
                Private Repository
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> System Impact
            </h2>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-cyan-400">50+</div>
                <div className="text-xs text-gray-500">Active Users</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-yellow-400">10k+</div>
                <div className="text-xs text-gray-500">Requests/Day</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-purple-400">-4hrs</div>
                <div className="text-xs text-gray-500">Time Saved/Week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Technologies */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-green-400 text-lg font-bold flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> Skills & Proficiency
            </h2>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {projectData?.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={getProficiencyVariant(skill.proficiency)}>
                      {skill.name}
                    </Badge>
                    <span className="text-sm text-gray-500">{skill.proficiency}</span>
                    <span className="text-xs text-gray-600">({skill.category})</span>
                  </div>
                  <p className="text-sm text-gray-400 pl-3">
                    {skill.usage}
                  </p>
                </div>
              )) || (
                <div className="col-span-2 text-gray-500">No skills data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content */}
          <div className="space-y-8">
            <Section title="Project Overview">
              <p>
                Comprehensive internal tools platform designed for the Bonanza operations team, featuring 
                <span className="text-green-400"> 13+ specialized dashboards</span> with real-time data visualization 
                and analytics. Expanded to include consumer-facing dashboards for Vercado customers, serving 
                both internal staff and external users with secure, role-based access control.
              </p>
            </Section>

            <Section title="Development Timeline">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-400">Project Start:</span>
                  <span className="text-yellow-300">September 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Current Status:</span>
                  <span className="text-green-400">Production</span>
                </div>
              </div>
            </Section>

            <Section title="Key Features">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>13 specialized dashboards for Bonanza team operations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Consumer-facing dashboards for <span className="text-cyan-400">Vercado</span> customers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Real-time data visualization and interactive charts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Role-based authentication with <span className="text-purple-400">private routing</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>High-performance data processing with <span className="text-yellow-400">Polars</span></span>
                </div>
              </div>
            </Section>

            <Section title="Architecture & Technology">
              <div className="space-y-4">
                <div className="border border-blue-500/30 rounded p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">Frontend Stack</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Framework:</span> React + TypeScript
                    </div>
                    <div>
                      <span className="text-purple-400">Styling:</span> Tailwind CSS
                    </div>
                    <div>
                      <span className="text-purple-400">Routing:</span> Tanstack Router
                    </div>
                    <div>
                      <span className="text-purple-400">Data:</span> Tanstack Query
                    </div>
                  </div>
                </div>
                
                <div className="border border-yellow-500/30 rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Backend & Data</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Language:</span> Python
                    </div>
                    <div>
                      <span className="text-purple-400">Databases:</span> MySQL 5.6, PostgreSQL
                    </div>
                    <div>
                      <span className="text-purple-400">Processing:</span> Pandas, Polars
                    </div>
                    <div>
                      <span className="text-purple-400">Infrastructure:</span> AWS
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Technical Challenges">
              <div className="space-y-6">
                <div className="border-l-2 border-red-500/50 pl-4 space-y-2">
                  <h4 className="text-red-400 font-semibold">Legacy Database Performance</h4>
                  <p className="text-sm text-gray-400">Challenge: MySQL 5.6 with 15+ years of data causing 10+ minute query times</p>
                  <p className="text-sm">Optimized queries and integrated <span className="text-yellow-400">Polars</span> (Rust-based) for 50% performance improvement</p>
                </div>
                
                <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
                  <h4 className="text-blue-400 font-semibold">Multi-Tenant Architecture</h4>
                  <p className="text-sm text-gray-400">Challenge: Serving both internal Bonanza users and external Vercado customers</p>
                  <p className="text-sm">Implemented secure <span className="text-purple-400">private routing</span> with Tanstack Router and role-based access control</p>
                </div>
                
                <div className="border-l-2 border-green-500/50 pl-4 space-y-2">
                  <h4 className="text-green-400 font-semibold">Data Migration Strategy</h4>
                  <p className="text-sm text-gray-400">Challenge: Migrating from legacy MySQL to modern PostgreSQL infrastructure</p>
                  <p className="text-sm">Built dual-database Express server on <span className="text-cyan-400">AWS</span> with seamless data access layer</p>
                </div>
              </div>
            </Section>

            <Section title="Performance Optimization">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Query Execution Time</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">10+ min</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">&lt;5 min</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Data Processing Speed</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">Pandas</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">Polars (+50%)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>System Uptime</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">99.9%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Weekly Time Savings</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">4+ hours</span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
          
          {/* Dashboard Images Carousel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <Carousel
                className="w-full h-auto"
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
            </div>
          </div>
        </div>

        {/* Code Examples Section */}
        {projectData?.codeExamples && projectData.codeExamples.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> Key Implementation Examples
            </h2>
            <div className="space-y-8">
              {projectData.codeExamples.map((example, index) => (
                <CodeBlock
                  key={index}
                  code={example.code}
                  language={example.language}
                  title={example.title}
                  impactContext={example.impactContext}
                  technicalExplanation={example.technicalExplanation}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;