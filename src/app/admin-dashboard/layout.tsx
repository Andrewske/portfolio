import ProjectLayout from '~/components/ProjectLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectLayout>
      {children}
    </ProjectLayout>
  );
}
