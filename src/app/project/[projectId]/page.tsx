import { notFound } from 'next/navigation';
import { projects } from '~/lib/projects';
import ProjectDetailTemplate from '~/components/ProjectDetailTemplate';

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Kevin Andrews Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailTemplate project={project} />;
}