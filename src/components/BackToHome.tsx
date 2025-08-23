import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { type BackToHomeProps } from '~/lib/types';

const BackToHome = ({ section, githubLink }: BackToHomeProps) => {
  return (
    <div className="flex justify-between items-center w-full fixed top-0 left-0 px-6 py-4 bg-black/90 backdrop-blur-sm z-50 border-b border-green-500/20">
      <Button variant="terminalGhost" asChild>
        <Link href="/#projects" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          <span className="text-cyan-400">$</span> cd ../
        </Link>
      </Button>
      {githubLink && (
        <Button variant="terminalGhost" asChild>
          <Link href={githubLink} className="flex items-center gap-2">
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default BackToHome;
