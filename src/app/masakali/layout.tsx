import BackToHome from '~/components/BackToHome';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen relative text-white">
      <BackToHome githubLink="https://github.com/Andrewske/masakali-t3" />
      <div className="mt-16">{children}</div>
    </div>
  );
}
