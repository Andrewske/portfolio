import { PropsWithChildren } from 'react';

const Container = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={`flex gap-4 items-center w-full max-w-[1400px] dark:bg-gray-900 bg-gray-800 shadow-custom rounded-lg p-4 md:p-8 whitespace-pre-line ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
