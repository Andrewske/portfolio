import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { type BackToHomeProps } from '~/lib/types';

const BackToHome = ({ section, githubLink }: BackToHomeProps) => {
  return (
    <div className="flex justify-between items-center w-full fixed top-0 left-0 text-3xl px-4 md:px-8 py-2 md:py-4  bg-gray-800 dark:bg-black z-50 border-b border-1 border-comment">
      <Link
        href={`/#projects`}
        className="flex hover:text-comment"
      >
        <div className="h-9 flex flex-col justify-center items-center pr-4">
          <ArrowLeft size={24} />
        </div>
        <span className="hidden md:block">Home</span>
      </Link>
      {githubLink && (
        <Link
          href={githubLink}
          className="flex hover:text-comment"
        >
          <div className="h-9 flex flex-col justify-center items-center">
            <Github size={24} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default BackToHome;
