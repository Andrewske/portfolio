'use client';
import Image from 'next/image';
import Link from 'next/link';

import ZohoTwilioImage from '~/../public/images/ZohoTwilio/zoho_twilio_screenshot.png';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { PropsWithChildren } from 'react';

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

const ZohoTwilio = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="border border-green-500/20 rounded-lg p-8 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">zoho-twilio-integration.js</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-purple-400">class</span>{' '}
              <span className="text-yellow-300">ZohoTwilioIntegration</span>{' '}
              <span className="text-white">{'{'}</span>
            </div>
            
            <div className="pl-8 space-y-2">
              <div>
                <span className="text-blue-300">description</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;Automated SMS workflow system for dance studio CRM&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">status</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;PRODUCTION&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">messaging</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;5k+ messages/month&quot;</span>
              </div>
            </div>
            
            <div>
              <span className="text-white">{'}'}</span>
              <span className="text-white">;</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
            <Badge variant="statusProduction">PRODUCTION</Badge>
            <div className="flex gap-4">
              <Button variant="terminal" asChild>
                <Link href="https://fredastaire.com">
                  Client Website →
                </Link>
              </Button>
              <Button variant="terminalOutline" asChild>
                <Link href="https://github.com/Andrewske/zoho_twilio_integration_t3">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Operational Metrics */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> System Metrics
            </h2>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-cyan-400">5k+</div>
                <div className="text-xs text-gray-500">Messages/Month</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-yellow-400">95%</div>
                <div className="text-xs text-gray-500">Automation Rate</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-green-400">2</div>
                <div className="text-xs text-gray-500">API Systems</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-xs text-gray-500">Availability</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-green-400">$</span> cat tech-stack.json
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="techReact">Next.js</Badge>
            <Badge variant="techTypeScript">TypeScript</Badge>
            <Badge variant="techDatabase">PostgreSQL</Badge>
            <Badge variant="techCloud">Prisma</Badge>
            <Badge variant="techCloud">Twilio API</Badge>
            <Badge variant="techCloud">Zoho API</Badge>
            <Badge variant="techCloud">Vercel</Badge>
            <Badge variant="techCloud">Webhooks</Badge>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content */}
          <div className="space-y-8">
            <Section title="Project Overview">
              <p>
                Custom SMS automation system integrating <span className="text-cyan-400">Twilio</span> with 
                <span className="text-yellow-400"> Zoho CRM</span> for Fred Astaire Dance Studio. 
                Features chat-like interface within CRM, automated welcome sequences, and comprehensive 
                webhook management for seamless two-way communication with customers.
              </p>
            </Section>

            <Section title="Development Timeline">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-400">Project Start:</span>
                  <span className="text-yellow-300">November 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Completion:</span>
                  <span className="text-yellow-300">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Status:</span>
                  <span className="text-green-400">Ongoing Maintenance</span>
                </div>
              </div>
            </Section>

            <Section title="Key Features">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Chat-like SMS interface directly within <span className="text-cyan-400">Zoho CRM</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Automated welcome messages and follow-up sequences</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Webhook handling for calls with <span className="text-purple-400">TwiML</span> responses</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Integration with <span className="text-yellow-400">Zoho Analytics</span> for reporting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Secure token-based API access with user authentication</span>
                </div>
              </div>
            </Section>

            <Section title="Technical Architecture">
              <div className="space-y-4">
                <div className="border border-blue-500/30 rounded p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">Integration Layer</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">CRM:</span> Zoho Extension API
                    </div>
                    <div>
                      <span className="text-purple-400">SMS:</span> Twilio Messaging API
                    </div>
                    <div>
                      <span className="text-purple-400">Analytics:</span> Zoho Analytics API
                    </div>
                    <div>
                      <span className="text-purple-400">Voice:</span> TwiML Voice Webhooks
                    </div>
                  </div>
                </div>
                
                <div className="border border-green-500/30 rounded p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Application Stack</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Frontend:</span> React + TypeScript
                    </div>
                    <div>
                      <span className="text-purple-400">Backend:</span> Next.js Serverless
                    </div>
                    <div>
                      <span className="text-purple-400">Database:</span> PostgreSQL + Prisma
                    </div>
                    <div>
                      <span className="text-purple-400">Hosting:</span> Vercel
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Technical Challenges">
              <div className="space-y-6">
                <div className="border-l-2 border-yellow-500/50 pl-4 space-y-2">
                  <h4 className="text-yellow-400 font-semibold">Zoho Extension Integration</h4>
                  <p className="text-sm text-gray-400">Challenge: Embedding dynamic application within Zoho&apos;s Extension Creator limitations</p>
                  <p className="text-sm">Migrated from static Vite build to <span className="text-cyan-400">Next.js serverless</span> approach for dynamic capabilities</p>
                </div>
                
                <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
                  <h4 className="text-blue-400 font-semibold">Database Migration</h4>
                  <p className="text-sm text-gray-400">Challenge: Initial MySQL limitations required more robust solution</p>
                  <p className="text-sm">Migrated to <span className="text-green-400">PostgreSQL</span> with Vercel integration for improved scalability</p>
                </div>
                
                <div className="border-l-2 border-purple-500/50 pl-4 space-y-2">
                  <h4 className="text-purple-400 font-semibold">Security & Access Control</h4>
                  <p className="text-sm text-gray-400">Challenge: Ensuring secure access to sensitive contact data and messages</p>
                  <p className="text-sm">Implemented <span className="text-yellow-400">token-based authentication</span> requiring Zoho user access tokens for API calls</p>
                </div>
              </div>
            </Section>

            <Section title="Client Testimonial">
              <div className="border border-green-500/20 rounded-lg p-6 bg-gray-900/30">
                <blockquote className="space-y-4 italic text-gray-300">
                  <p>
                    &quot;Kevin built an app that seamlessly integrated our systems, enabling automated workflows, 
                    assigning users to appropriate leads, and providing us with the flexibility to communicate 
                    with leads directly within the CRM.&quot;
                  </p>
                  <p>
                    &quot;Thanks to Kevin&apos;s expertise, we now have a powerful tool that enhances our lead management 
                    process, making communication more efficient and effective.&quot;
                  </p>
                </blockquote>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">PG</span>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold">Philip Gutierrez</div>
                      <div className="text-gray-500 text-sm">Owner, 12 Fred Astaire Dance Studios</div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="System Performance">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Monthly Message Volume</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">5,000+</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Automation Success Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>System Availability</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">24/7</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Lead Response Time</span>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">&lt;1 minute</span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
          
          {/* Project Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <Image
                src={ZohoTwilioImage}
                alt="Zoho-Twilio SMS integration interface showing chat functionality within CRM"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZohoTwilio;