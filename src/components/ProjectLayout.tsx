import BackToHome from '~/components/BackToHome';
import { type ProjectLayoutProps } from '~/lib/types';

export default function ProjectLayout({ children, githubLink }: ProjectLayoutProps) {
  return (
    <div className="max-w-screen relative text-white">
      <BackToHome githubLink={githubLink} />
      <div className="mt-16">{children}</div>
    </div>
  );
}