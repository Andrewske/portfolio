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
  title: {
    default: 'Kevin Andrews - AI Systems Engineer & Full-Stack Developer',
    template: '%s | Kevin Andrews Portfolio'
  },
  description: 'Software engineer specializing in AI systems, data analytics, and full-stack development. Built production systems processing 160M+ records with expertise in Next.js, Python, and machine learning.',
  keywords: ['AI Engineer', 'Full-Stack Developer', 'Data Analytics', 'Next.js', 'Python', 'Machine Learning', 'Kevin Andrews'],
  authors: [{ name: 'Kevin Andrews' }],
  creator: 'Kevin Andrews',
  metadataBase: new URL('https://kevinandrews.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kevinandrews.dev',
    title: 'Kevin Andrews - AI Systems Engineer',
    description: 'Software engineer specializing in AI systems and full-stack development',
    siteName: 'Kevin Andrews Portfolio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kevin Andrews",
  "jobTitle": "Senior Data Analyst & Full-Stack Engineer",
  "description": "Software engineer focused on building production AI systems, with expertise in data analytics and full-stack development",
  "url": "https://kevinandrews.dev",
  "sameAs": [
    "https://github.com/Andrewske",
    "https://linkedin.com/in/andrewskevin92"
  ],
  "knowsAbout": [
    "AI Systems",
    "Full-Stack Development",
    "Data Analytics",
    "Next.js",
    "Python",
    "Machine Learning",
    "PostgreSQL"
  ]
} as const;

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
      <body className="max-w-screen relative ">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {children}
      </body>
    </html>
  );
}
