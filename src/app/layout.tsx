import type { Metadata } from 'next'
import './globals.css'
import '~/styles/icomoon.css'

import { IBM_Plex_Sans, JetBrains_Mono, Roboto_Mono } from 'next/font/google'
import { siteConfig } from '~/lib/site-config'
import { Analytics } from '@vercel/analytics/next'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'AI Engineer',
    'Full-Stack Developer',
    'Data Analytics',
    'Next.js',
    'Python',
    'Machine Learning',
    'Kevin Andrews',
  ],
  authors: [{ name: 'Kevin Andrews' }],
  creator: 'Kevin Andrews',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kevin Andrews',
  jobTitle: 'Senior Data Analyst & Full-Stack Engineer',
  description:
    'Software engineer focused on building production AI systems, with expertise in data analytics and full-stack development',
  url: siteConfig.url,
  sameAs: ['https://github.com/Andrewske', 'https://linkedin.com/in/andrewskevin92'],
  knowsAbout: [
    'AI Systems',
    'Full-Stack Development',
    'Data Analytics',
    'Next.js',
    'Python',
    'Machine Learning',
    'PostgreSQL',
  ],
} as const

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${roboto.variable} ${ibmPlex.variable}`}>
      <body className="max-w-screen relative ">
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
