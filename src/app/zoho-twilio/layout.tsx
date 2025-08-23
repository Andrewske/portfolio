import ProjectLayout from '~/components/ProjectLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectLayout githubLink="https://github.com/Andrewske/zoho_twilio_integration_t3">
      {children}
    </ProjectLayout>
  );
}
