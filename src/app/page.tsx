import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'
import FeaturedPost from '~/components/FeaturedPost'
import { EarlierWorkList } from '~/components/home/earlier-work-list'
import { FeaturedCaseStudy } from '~/components/home/featured-case-study'
import { Hero } from '~/components/home/hero'
import { SectionHeading } from '~/components/home/section-heading'
import ProjectCard from '~/components/ProjectCard'
import TechStackVisualization from '~/components/TechStackVisualization'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import {
  findProject,
  homepageSections,
  pickProjects,
  toEarlierWorkEntry,
} from '~/lib/homepage-sections'
import { toProjectCardData } from '~/lib/project-card-data'
import { projects } from '~/lib/projects'
import { sectionIds } from '~/lib/site-config'
import { posts } from '~/lib/writing'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}

// Server component: the project dataset stays on the server; sections get only what they render.
const featuredProject = findProject(projects, homepageSections.featured)
const sideProjectCards = pickProjects(projects, homepageSections.sideProjects).map(
  toProjectCardData,
)
const earlierWork = pickProjects(projects, homepageSections.earlierWork).map(toEarlierWorkEntry)

interface PageSectionProps {
  id: string
  command: string
  description: string
  children: ReactNode
}

const PageSection = ({ id, command, description, children }: PageSectionProps): JSX.Element => (
  <section id={id} aria-labelledby={`${id}-heading`} className="py-12 sm:py-16 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">
      <SectionHeading id={`${id}-heading`} command={command} description={description} />
      {children}
    </div>
  </section>
)

const ContactSection = (): JSX.Element => (
  <section id={sectionIds.contact} className="py-12 sm:py-20 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto text-center">
      <div className="flex justify-center sm:justify-start mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">
          <span className="text-green-400">$</span> contact --init
        </h2>
      </div>
      <p className="text-gray-400 mb-8">Let&apos;s build something amazing together</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
        <Button variant="terminal" size="lg" asChild>
          <a href="mailto:andrewskevin92@gmail.com">Send Email</a>
        </Button>
        <Button variant="terminalOutline" size="lg" asChild>
          <a href="https://github.com/Andrewske" target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
        </Button>
      </div>
    </div>
  </section>
)

const WorkSections = (): JSX.Element => (
  <>
    <PageSection
      id={sectionIds.projects}
      command="cat work/current.md"
      description="What I build day to day"
    >
      {featuredProject && <FeaturedCaseStudy project={featuredProject} />}
    </PageSection>
    <PageSection id={sectionIds.writing} command="ls writing/" description="Notes on how I work">
      <div className="grid gap-6">
        {posts.map(post => (
          <FeaturedPost key={post.slug} post={post} />
        ))}
      </div>
    </PageSection>
    <Separator className="my-0" />
    <PageSection
      id={sectionIds.sideProjects}
      command="ls side-projects/"
      description="Experiments and tools I build for myself"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {sideProjectCards.map(project => (
          <ProjectCard key={project.id} project={project} showStats={false} />
        ))}
      </div>
    </PageSection>
    <PageSection
      id={sectionIds.earlierWork}
      command="ls -l archive/"
      description="Older projects, kept for reference"
    >
      <EarlierWorkList entries={earlierWork} />
    </PageSection>
  </>
)

const Home = (): JSX.Element => (
  <div className="min-h-screen bg-black text-gray-200 font-mono">
    <a
      href={`#${sectionIds.main}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:border focus:border-green-500 focus:bg-black focus:px-4 focus:py-2 focus:text-green-400"
    >
      Skip to main content
    </a>
    <main id={sectionIds.main} tabIndex={-1} className="focus:outline-none">
      <h1 className="sr-only">Kevin Andrews, Software Engineer and AI Developer</h1>
      <Hero />
      <WorkSections />
      <Separator className="my-0" />
      <section id={sectionIds.stack} className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <TechStackVisualization />
        </div>
      </section>
      <Separator className="my-0" />
      <Separator className="my-0" />
      <ContactSection />
    </main>
  </div>
)

export default Home
