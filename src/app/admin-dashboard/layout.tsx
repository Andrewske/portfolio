import BackToHome from '~/components/BackToHome';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen relative">
      <BackToHome />
      <div className="mt-16">{children}</div>
    </div>
  );
}
