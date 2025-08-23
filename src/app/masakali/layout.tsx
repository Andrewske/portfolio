import ProjectLayout from '~/components/ProjectLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectLayout githubLink="https://github.com/Andrewske/masakali-t3">
      {children}
    </ProjectLayout>
  );
}
