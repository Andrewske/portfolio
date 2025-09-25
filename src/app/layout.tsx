import type { Metadata } from 'next';
import './globals.css';
import '~/styles/icomoon.css';

import { JetBrains_Mono, Roboto_Mono } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Kevin Andrews Portfolio',
  description:
    "Discover Kevin's portfolio showcasing expertise in web development and data analysis. Explore dynamic projects, innovative solutions, and a commitment to solving complex problems with advanced technologies like React, Python, SQL, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${roboto.variable}`}
    >
      <body className="max-w-screen relative ">{children}</body>
    </html>
  );
}
