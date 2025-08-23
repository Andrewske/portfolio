import BackToHome from '~/components/BackToHome';
import { type ProjectLayoutProps } from '~/lib/types';

export default function ProjectLayout({ children, githubLink }: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      <BackToHome githubLink={githubLink} />
      <div className="pt-20">{children}</div>
    </div>
  );
}