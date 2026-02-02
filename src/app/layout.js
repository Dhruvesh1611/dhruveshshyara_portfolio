import { Fira_Code, Anton, Passions_Conflict, Playfair_Display } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400', '600'],
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
});

const passionsConflict = Passions_Conflict({
  variable: '--font-passions-conflict',
  subsets: ['latin'],
  weight: '400',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
});

export const metadata = {
  metadataBase: new URL('https://dhruveshshyara.com'),
  title: {
    default: 'Dhruvesh Shyara | Full Stack Developer Portfolio',
    template: '%s | Dhruvesh Shyara',
  },
  description:
    'Dhruvesh Shyara - Full Stack Developer specializing in MERN stack, React, Next.js, and modern web development. Explore my portfolio featuring premium web applications, e-commerce platforms, and innovative projects.',
  keywords: [
    // Personal name variations
    'Dhruvesh Shyara',
    'Dhruvesh',
    'Dhruvesh Shyara portfolio',
    'Dhruvesh developer',
    // Professional titles
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Next.js Developer',
    'JavaScript Developer',
    'Web Developer',
    // Competitive keywords
    'best portfolio',
    'best developer portfolio',
    'portfolio website',
    'web developer portfolio',
    'full stack portfolio',
    'modern portfolio',
    'creative portfolio',
    'professional portfolio',
    // Technical skills
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'MERN Stack',
    // Project types
    'e-commerce development',
    'web application development',
    'UI/UX design',
    'responsive web design',
    'frontend development',
    'backend development',
  ],
  authors: [{ name: 'Dhruvesh Shyara' }],
  creator: 'Dhruvesh Shyara',
  publisher: 'Dhruvesh Shyara',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dhruveshshyara.com',
    siteName: 'Dhruvesh Shyara Portfolio',
    title: 'Dhruvesh Shyara | Full Stack Developer Portfolio',
    description:
      "Hi! I'm Dhruvesh Shyara, a Full Stack Developer specializing in MERN stack. Explore my portfolio featuring premium web applications, e-commerce platforms, and innovative projects built with React, Next.js, and modern technologies.",
    images: [
      {
        url: '/png/dhruvesh-home-avatar2.png',
        width: 1200,
        height: 630,
        alt: 'Dhruvesh Shyara - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dhruveshshyara',
    creator: '@dhruveshshyara',
    title: 'Dhruvesh Shyara | Full Stack Developer Portfolio',
    description:
      "Hi! I'm Dhruvesh Shyara, a Full Stack Developer specializing in MERN stack. Explore my portfolio featuring premium web applications and innovative projects.",
    images: ['/png/dhruvesh-home-avatar2.png'],
  },
  alternates: {
    canonical: 'https://dhruveshshyara.com',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code from Google Search Console
  },
};

import PageTransition from '@/components/PageTransition';
import StructuredData from '@/components/StructuredData';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`body ${firaCode.variable} ${anton.variable} ${passionsConflict.variable} ${playfairDisplay.variable}`}>
        <Preloader />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
