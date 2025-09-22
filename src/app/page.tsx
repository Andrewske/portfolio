import type { NextPage } from 'next';
import Link from 'next/link';
import TechStackVisualization from '~/components/TechStackVisualization';
import TypingAnimation from '~/components/TypingAnimation';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { Progress } from '~/components/ui/progress';
import { skillsData } from '~/lib/skills';

const Home: NextPage = () => {

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)`,
            backgroundSize: '100% 4px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="space-y-8">
            {/* Terminal-style header */}
            <div className="border border-green-500/20 rounded-lg p-8 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-500 text-sm">portfolio.js</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">developer</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-white">{'{'}</span>
                </div>
                
                <div className="pl-8 space-y-2">
                  <div>
                    <span className="text-blue-300">name</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-yellow-300">&quot;Kevin Andrews&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  
                  <div>
                    <span className="text-blue-300">role</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-yellow-300">&quot;Senior Data Analyst & Full-Stack Engineer&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  
                  <div>
                    <span className="text-blue-300">mission</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-yellow-300">&quot;<TypingAnimation text="Building AI systems that enhance productivity for developers and everyday users" />&quot;</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-white">{'}'}</span>
                  <span className="text-white">;</span>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="flex gap-6 mt-8 pt-6 border-t border-gray-800">
                <Button variant="terminalGhost" asChild>
                  <a href="https://github.com/Andrewske" className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span> github
                  </a>
                </Button>
                <Button variant="terminalGhost" asChild>
                  <a href="https://linkedin.com/in/andrewskevin92" className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span> linkedin
                  </a>
                </Button>
                <Button variant="terminalGhost" asChild>
                  <a href="#contact-section" className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span> contact
                  </a>
                </Button>
              </div>
            </div>

            {/* Featured Project Preview */}
            <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
                    <span className="text-gray-500">{'//'}</span> Featured Project
                  </h2>
                  <Badge variant="statusProduction">PRODUCTION</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">Knowledge Graph MCP Server</h3>
                <p className="text-gray-400">Production AI system processing documents into semantic knowledge graphs</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-yellow-400">530</div>
                    <div className="text-xs text-gray-500">Embeddings/Doc</div>
                  </div>
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-green-400">$0.00002</div>
                    <div className="text-xs text-gray-500">Cost per Document</div>
                  </div>
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-blue-400">85s</div>
                    <div className="text-xs text-gray-500">Processing Time</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="terminal" asChild>
                    <a href="#knowledge-graph">
                      View Details →
                    </a>
                  </Button>
                  <Button variant="terminalOutline" asChild>
                    <a href="https://github.com/Andrewske/kg-memory-mcp">
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="text-green-400">$</span> ls projects/
            </h2>
            <p className="text-gray-500">Production systems built to solve real problems</p>
          </div>

          <div className="grid gap-6">
            {/* Project 1: Admin Dashboard */}
            <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
              <div className="flex">
                <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        <span className="text-purple-400">class</span>{' '}
                        <span className="text-yellow-300">AnalyticsPlatform</span>:
                      </h3>
                      <p className="text-gray-400">Full-stack analytics platform processing 160M+ order records</p>
                    </div>
                    <Badge variant="statusLive">LIVE</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">160M+</div>
                      <div className="text-xs text-gray-500">Records</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">50%</div>
                      <div className="text-xs text-gray-500">Query Speedup</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">13</div>
                      <div className="text-xs text-gray-500">Internal Views</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">5min</div>
                      <div className="text-xs text-gray-500">Query Time</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">React</Badge>
                    <Badge variant="techTypeScript">TypeScript</Badge>
                    <Badge variant="techPython">Polars</Badge>
                    <Badge variant="techDatabase">MySQL 5.7</Badge>
                    <Badge variant="techCloud">AWS</Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="terminalGhost" size="sm" asChild>
                      <Link href="/admin-dashboard">
                        View Project →
                      </Link>
                    </Button>
                    <Button variant="terminalGhost" size="sm" asChild>
                      <a href="https://github.com">
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Masakali */}
            <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
              <div className="flex">
                <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        <span className="text-purple-400">class</span>{' '}
                        <span className="text-yellow-300">MasakaliBookingPlatform</span>:
                      </h3>
                      <p className="text-gray-400">Production booking platform with real-time inventory sync</p>
                    </div>
                    <Badge variant="statusProduction">PRODUCTION</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">$30k+</div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">0</div>
                      <div className="text-xs text-gray-500">Double Bookings</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">Instant</div>
                      <div className="text-xs text-gray-500">Sync Updates</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">5</div>
                      <div className="text-xs text-gray-500">Listings</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">Next.js</Badge>
                    <Badge variant="techPython">Xendit</Badge>
                    <Badge variant="techDatabase">PostgreSQL</Badge>
                    <Badge variant="techTypeScript">Redux</Badge>
                    <Badge variant="techCloud">Smoobu API</Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="terminalGhost" size="sm" asChild>
                      <Link href="/masakali">
                        View Project →
                      </Link>
                    </Button>
                    <Button variant="terminalGhost" size="sm" asChild>
                      <a href="https://github.com/Andrewske/masakali-t3">
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Zoho-Twilio */}
            <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
              <div className="flex">
                <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        <span className="text-purple-400">class</span>{' '}
                        <span className="text-yellow-300">ZohoTwilioIntegration</span>:
                      </h3>
                      <p className="text-gray-400">Production SMS system enabling 12 studios to engage 9,000+ leads</p>
                    </div>
                    <Badge variant="statusProduction">PRODUCTION</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">43k+</div>
                      <div className="text-xs text-gray-500">Total Messages</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">9k+</div>
                      <div className="text-xs text-gray-500">Leads Engaged</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">12</div>
                      <div className="text-xs text-gray-500">Active Studios</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">4wks</div>
                      <div className="text-xs text-gray-500">Ship Time</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">Next.js</Badge>
                    <Badge variant="techCloud">Twilio API</Badge>
                    <Badge variant="techCloud">Zoho API</Badge>
                    <Badge variant="techTypeScript">Prisma</Badge>
                    <Badge variant="techDatabase">PostgreSQL</Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="terminalGhost" size="sm" asChild>
                      <Link href="/zoho-twilio">
                        View Project →
                      </Link>
                    </Button>
                    <Button variant="terminalGhost" size="sm" asChild>
                      <a href="https://github.com/Andrewske/zoho_twilio_integration_t3">
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4: AI Product Title Optimizer */}
            <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
              <div className="flex">
                <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        <span className="text-purple-400">class</span>{' '}
                        <span className="text-yellow-300">AIProductOptimizer</span>:
                      </h3>
                      <p className="text-gray-400">Batch processing system using GPT-4o-mini for e-commerce optimization</p>
                    </div>
                    <Badge variant="statusProduction">PRODUCTION</Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">4.5k</div>
                      <div className="text-xs text-gray-500">Listings/30min</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">$0.00003</div>
                      <div className="text-xs text-gray-500">Cost/Item</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">Linear</div>
                      <div className="text-xs text-gray-500">Scaling</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">30min</div>
                      <div className="text-xs text-gray-500">Batch Time</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techPython">Python</Badge>
                    <Badge variant="techCloud">OpenAI API</Badge>
                    <Badge variant="techTypeScript">Batch Processing</Badge>
                    <Badge variant="techDatabase">PostgreSQL</Badge>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="terminalGhost" size="sm" disabled>
                      Internal Tool
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 5: Multi-Agent Personal Management System */}
            <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all group">
              <div className="flex">
                <div className="w-12 bg-gray-900 flex flex-col items-center py-4 text-gray-600 text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        <span className="text-purple-400">class</span>{' '}
                        <span className="text-yellow-300">PersonalManagementSystem</span>:
                      </h3>
                      <p className="text-gray-400">Custom AI agent ecosystem for multi-project workflows</p>
                    </div>
                    <Badge variant="statusLive">ACTIVE</Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">Career</div>
                      <div className="text-xs text-gray-500">Coaching Agent</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">Tech</div>
                      <div className="text-xs text-gray-500">Docs Agent</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">Project</div>
                      <div className="text-xs text-gray-500">Management</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">MCP</div>
                      <div className="text-xs text-gray-500">Architecture</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">Claude Code</Badge>
                    <Badge variant="techPython">Prompt Engineering</Badge>
                    <Badge variant="techDatabase">Knowledge Management</Badge>
                    <Badge variant="techTypeScript">MCP Protocol</Badge>
                  </div>

                  <div className="text-sm text-gray-500">
                    Domain-specific agents with advanced specialization techniques
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="text-green-400">$</span> cat skills.json
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {skillsData.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className={`${category.color} font-bold flex items-center gap-2`}>
                  <span className="text-gray-500">{'//'}</span> {category.title}
                </h3>
                <div className="space-y-3 text-sm">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <span>{skill.name}</span>
                      <Progress value={skill.experience} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Tech Stack Visualization */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <TechStackVisualization />
        </div>
      </section>

      <Separator className="my-0" />

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="text-green-400">$</span> whoami --verbose
            </h2>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div className="pl-4 border-l-2 border-gray-800">
              <p>
                Full-stack engineer with 5+ years building production systems. Senior Data Analyst at
                Bonanza.com, architecting scalable solutions processing 160M+ records and optimizing
                query performance from 10min → 5min using advanced SQL and Polars techniques.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-gray-800">
              <p>
                Specialized in AI integration and cost optimization - built batch processing systems at
                $0.00003/operation and knowledge graph processors at $0.00002/document. Passionate about
                creating AI systems that enhance productivity for both developers and everyday users.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-gray-800">
              <p>
                Track record of rapid prototyping and production deployment: shipped SMS platform for
                12 studios in 4 weeks, processing 43K+ messages. Currently focused on building the next
                generation of AI-assisted developer tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Contact Section */}
      <section id="contact-section" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="text-green-400">$</span> contact --init
          </h2>
          
          <p className="text-gray-400 mb-8">
            Let&apos;s build something amazing together
          </p>
          
          <div className="flex justify-center gap-6">
            <Button variant="terminal" size="lg" asChild>
              <a href="mailto:andrewskevin92@gmail.com">
                Send Email
              </a>
            </Button>
            <Button variant="terminalOutline" size="lg" asChild>
              <a href="https://github.com/Andrewske">
                GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;