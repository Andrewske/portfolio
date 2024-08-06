import Link from 'next/link';

const TextLink = ({
  children,
  href,
  target = '_self',
  hover = true,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  hover?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`cursor-pointer transition-all ease-in-out duration-300 transform hover:text-comment ${
        hover ? 'hover:scale-105 ' : ''
      }`}
      target={target}
    >
      {children}
    </Link>
  );
};

export default TextLink;
