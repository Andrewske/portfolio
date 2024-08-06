import { PropsWithChildren } from 'react';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex  items-center w-full max-w-[1400px] bg-gray-900 shadow-custom rounded-lg p-8 whitespace-pre-line">
      {children}
    </div>
  );
};

export default Container;
