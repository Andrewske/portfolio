'use client';

import Image from 'next/image';
import Link from 'next/link';

import MasakaliImage from '~/../public/images/Masakali/masakali_villas_main_image.png';
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

const MasakaliRetreat = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="border border-green-500/20 rounded-lg p-8 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">masakali-payment-system.ts</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-purple-400">class</span>{' '}
              <span className="text-yellow-300">MasakaliPaymentSystem</span>{' '}
              <span className="text-white">{'{'}</span>
            </div>
            
            <div className="pl-8 space-y-2">
              <div>
                <span className="text-blue-300">description</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;Full-stack payment processing for Bali retreat center&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">status</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;PRODUCTION&quot;</span>
                <span className="text-white">,</span>
              </div>
              
              <div>
                <span className="text-blue-300">revenue</span>
                <span className="text-white">:</span>{' '}
                <span className="text-yellow-300">&quot;$50,000+ processed&quot;</span>
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
                <Link href="https://masakali.com">
                  View Live Site →
                </Link>
              </Button>
              <Button variant="terminalOutline" asChild>
                <Link href="https://github.com/Andrewske/masakali-t3">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
              <span className="text-gray-500">{'//'}</span> System Performance
            </h2>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-green-400">$50k+</div>
                <div className="text-xs text-gray-500">Revenue Processed</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-cyan-400">98</div>
                <div className="text-xs text-gray-500">Lighthouse Score</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-yellow-400">0.4s</div>
                <div className="text-xs text-gray-500">First Paint</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
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
            <Badge variant="techCloud">Stripe API</Badge>
            <Badge variant="techCloud">Xendit API</Badge>
            <Badge variant="techCloud">Smoobu API</Badge>
            <Badge variant="techCloud">Vercel</Badge>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content */}
          <div className="space-y-8">
            <Section title="Project Overview">
              <p>
                A comprehensive booking and payment platform for Masakali Retreat, a luxury wellness center in Bali. 
                This full-stack application handles <span className="text-green-400">real-time reservations</span>, 
                <span className="text-yellow-400"> multi-currency payments</span>, and seamless integration with 
                existing booking platforms. Built to handle high-volume traffic and process significant revenue.
              </p>
            </Section>

            <Section title="Development Timeline">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-400">Initial Build:</span>
                  <span className="text-yellow-300">June 2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Rebuild:</span>
                  <span className="text-yellow-300">May 2023</span>
                </div>
              </div>
            </Section>

            <Section title="Key Features">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Dynamic booking system with real-time pricing via <span className="text-cyan-400">Smoobu API</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Multi-currency support with live conversion rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Secure payment processing (<span className="text-yellow-400">Stripe</span> → <span className="text-yellow-400">Xendit</span>)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>OAuth authentication with <span className="text-purple-400">Passport.js</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Automated email workflows via <span className="text-blue-400">SendGrid</span></span>
                </div>
              </div>
            </Section>

            <Section title="Architecture Evolution">
              <div className="space-y-4">
                <div className="border border-gray-800 rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Initial Build (2020)</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Frontend:</span> React, Redux
                    </div>
                    <div>
                      <span className="text-purple-400">Backend:</span> Node.js, Express
                    </div>
                    <div>
                      <span className="text-purple-400">Database:</span> MongoDB
                    </div>
                    <div>
                      <span className="text-purple-400">Hosting:</span> Heroku
                    </div>
                  </div>
                </div>
                
                <div className="border border-green-500/30 rounded p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Modern Stack (2023)</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Framework:</span> Next.js 14
                    </div>
                    <div>
                      <span className="text-purple-400">Language:</span> TypeScript
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
                  <h4 className="text-yellow-400 font-semibold">Real-time Booking Synchronization</h4>
                  <p className="text-sm text-gray-400">Challenge: Syncing pricing and availability across multiple booking platforms</p>
                  <p className="text-sm">Implemented webhook-based system with <span className="text-cyan-400">Smoobu API</span> for instant updates and conflict resolution</p>
                </div>
                
                <div className="border-l-2 border-blue-500/50 pl-4 space-y-2">
                  <h4 className="text-blue-400 font-semibold">Payment Gateway Migration</h4>
                  <p className="text-sm text-gray-400">Challenge: Switching from Stripe to Xendit for Indonesian market compliance</p>
                  <p className="text-sm">Built abstraction layer supporting multiple payment providers with failover mechanisms</p>
                </div>
                
                <div className="border-l-2 border-green-500/50 pl-4 space-y-2">
                  <h4 className="text-green-400 font-semibold">Currency Conversion System</h4>
                  <p className="text-sm text-gray-400">Challenge: Real-time multi-currency pricing with accurate rates</p>
                  <p className="text-sm">Implemented caching strategy with <span className="text-purple-400">custom hooks</span> for optimal performance</p>
                </div>
              </div>
            </Section>

            <Section title="Performance Optimization">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Lighthouse Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">90</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">98</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>First Contentful Paint</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">0.7s</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">0.4s</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Largest Contentful Paint</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">1.9s</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">1.0s</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded">
                  <span>Speed Index</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">1.3s</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400">0.8s</span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
          
          {/* Project Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <Image
                src={MasakaliImage}
                alt="Masakali villas booking system interface"
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

export default MasakaliRetreat;