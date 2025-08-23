import type { NextPage } from 'next';
import Link from 'next/link';
import TechStackVisualization from '~/components/TechStackVisualization';
import TypingAnimation from '~/components/TypingAnimation';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { Progress } from '~/components/ui/progress';

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
                    <span className="text-yellow-300">&quot;Full-Stack Developer & AI Engineer&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  
                  <div>
                    <span className="text-blue-300">mission</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-yellow-300">&quot;<TypingAnimation text="Building production AI systems that solve real problems" />&quot;</span>
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
                  <a href="https://linkedin.com" className="flex items-center gap-2">
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
                <h3 className="text-2xl font-bold text-white">Knowledge Graph MCP System</h3>
                <p className="text-gray-400">AI memory system for persistent context</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-yellow-400">85s</div>
                    <div className="text-xs text-gray-500">Processing Time</div>
                  </div>
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-green-400">$0.00002</div>
                    <div className="text-xs text-gray-500">Cost per Operation</div>
                  </div>
                  <div className="text-center p-3 bg-black/30 rounded border border-gray-800">
                    <div className="text-2xl font-bold text-blue-400">100%</div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="terminal" asChild>
                    <a href="#knowledge-graph">
                      View Details →
                    </a>
                  </Button>
                  <Button variant="terminalOutline" asChild>
                    <a href="https://github.com">
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
                        <span className="text-yellow-300">AdminDashboard</span>:
                      </h3>
                      <p className="text-gray-400">Internal tools platform serving entire operations team</p>
                    </div>
                    <Badge variant="statusLive">LIVE</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">50+</div>
                      <div className="text-xs text-gray-500">Active Users</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">10k+</div>
                      <div className="text-xs text-gray-500">Requests/Day</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">99.9%</div>
                      <div className="text-xs text-gray-500">Uptime</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">-4hrs</div>
                      <div className="text-xs text-gray-500">Time Saved/Week</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">React</Badge>
                    <Badge variant="techPython">Python</Badge>
                    <Badge variant="techDatabase">PostgreSQL</Badge>
                    <Badge variant="techTypeScript">TypeScript</Badge>
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
                        <span className="text-yellow-300">MasakaliPaymentSystem</span>:
                      </h3>
                      <p className="text-gray-400">Full-stack payment processing with Stripe for Bali retreat center</p>
                    </div>
                    <Badge variant="statusProduction">PRODUCTION</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">$50k+</div>
                      <div className="text-xs text-gray-500">Processed</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">100%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">Live</div>
                      <div className="text-xs text-gray-500">Availability</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">3</div>
                      <div className="text-xs text-gray-500">API Integrations</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">Next.js</Badge>
                    <Badge variant="techPython">Stripe</Badge>
                    <Badge variant="techDatabase">PostgreSQL</Badge>
                    <Badge variant="techTypeScript">Prisma</Badge>
                    <Badge variant="techCloud">Xendit API</Badge>
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
                      <p className="text-gray-400">Automated SMS workflow system for dance studio CRM</p>
                    </div>
                    <Badge variant="statusProduction">PRODUCTION</Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-cyan-400">5k+</div>
                      <div className="text-xs text-gray-500">Messages/Month</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-yellow-400">95%</div>
                      <div className="text-xs text-gray-500">Automation Rate</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-green-400">2</div>
                      <div className="text-xs text-gray-500">API Systems</div>
                    </div>
                    <div className="text-center p-2 bg-gray-900/50 rounded">
                      <div className="text-lg font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-gray-500">Availability</div>
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

            {/* Project 4: Multi-Agent Note System (Coming Soon) */}
            <div className="border border-gray-800 rounded-lg overflow-hidden opacity-75">
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
                        <span className="text-yellow-300">MultiAgentNoteSystem</span>:
                      </h3>
                      <p className="text-gray-400">Next-generation AI workflow orchestration for knowledge management</p>
                    </div>
                    <Badge variant="statusDevelopment">IN DEVELOPMENT</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="techReact">LLMs</Badge>
                    <Badge variant="techPython">Agent Orchestration</Badge>
                    <Badge variant="techDatabase">Knowledge Graphs</Badge>
                    <Badge variant="techTypeScript">MCP Protocol</Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Architecture planning in progress...
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
            <div className="space-y-4">
              <h3 className="text-cyan-400 font-bold flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> AI/ML
              </h3>
              <div className="space-y-3 text-sm">
                <div className="space-y-1">
                  <span>LLMs & Prompt Engineering</span>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>MCP Protocol</span>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Knowledge Graphs</span>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Agent Orchestration</span>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-yellow-400 font-bold flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> Backend
              </h3>
              <div className="space-y-3 text-sm">
                <div className="space-y-1">
                  <span>Python & FastAPI</span>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Node.js & Express</span>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>PostgreSQL & MongoDB</span>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Prisma ORM</span>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-purple-400 font-bold flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> Frontend
              </h3>
              <div className="space-y-3 text-sm">
                <div className="space-y-1">
                  <span>React & Next.js</span>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>TypeScript</span>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Tailwind CSS</span>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Performance Optimization</span>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-blue-400 font-bold flex items-center gap-2">
                <span className="text-gray-500">{'//'}</span> DevOps
              </h3>
              <div className="space-y-3 text-sm">
                <div className="space-y-1">
                  <span>AWS & Cloud Services</span>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Docker & Containers</span>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>CI/CD Pipelines</span>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-1">
                  <span>Vercel Deployment</span>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
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
                Self-taught developer shipping production systems for 4+ years. I specialize in building 
                AI-powered tools and full-stack applications that solve real business problems.
              </p>
            </div>
            
            <div className="pl-4 border-l-2 border-gray-800">
              <p>
                My approach: Build tools when existing ones don&apos;t work. Every project starts with a 
                real problem that needs solving - whether it&apos;s automating workflows, processing payments, 
                or creating AI systems for better developer experiences.
              </p>
            </div>
            
            <div className="pl-4 border-l-2 border-gray-800">
              <p>
                Currently focused on human-centered AI design and building the next generation of 
                developer tools. Particularly interested in how AI can augment (not replace) human 
                creativity and productivity.
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
              <a href="mailto:kevin@example.com">
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