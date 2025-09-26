'use client';

import type { NextPage } from 'next';
import { useState, useId } from 'react';
import TechStackVisualization from '~/components/TechStackVisualization';
import TypingAnimation from '~/components/TypingAnimation';
import ProjectFilter from '~/components/ProjectFilter';
import ProjectCard from '~/components/ProjectCard';
import AIEngineringHighlights from '~/components/AIEngineringHighlights';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { projects } from '~/lib/projects';
import type { SkillCategory } from '~/lib/projects';

const Home: NextPage = () => {
  const [filteredCategories, setFilteredCategories] = useState<SkillCategory[]>([]);
  const projectsSectionId = useId();
  const contactSectionId = useId();

  const displayedProjects = filteredCategories.length === 0
    ? projects
    : projects.filter(project =>
        project.skills.some(skill =>
          filteredCategories.includes(skill.category)
        )
      );

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
                  <a href={`#${contactSectionId}`} className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span> contact
                  </a>
                </Button>
              </div>
            </div>

            {/* AI Engineering Highlights */}
            <AIEngineringHighlights />
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Projects Section */}
      <section id={projectsSectionId} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="text-green-400">$</span> ls projects/
            </h2>
            <p className="text-gray-500">Production systems built to solve real problems</p>
          </div>

          <ProjectFilter onFilterChange={setFilteredCategories} />

          <div className="grid gap-6">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
      <section id={contactSectionId} className="py-20 px-6">
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