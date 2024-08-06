import { PropsWithChildren } from 'react';

const Row = ({
  children,
  id,
  className,
}: PropsWithChildren & { id: string; className?: string }) => {
  return (
    <section
      className={`w-full mt-4 rounded-lg p-2 md:p-8 flex flex-wrap flex-col gap-8 items-center justify-center font-jetbrains ${className}`}
      id={id}
    >
      {children}
    </section>
  );
};

export default Row;
