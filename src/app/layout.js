import { Fira_Code, Anton, Passions_Conflict, Playfair_Display, Inter, Outfit } from 'next/font/google';
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

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Dhruvesh Shyara | Portfolio',
  description:
    'Dhruvesh Shyara | Portfolio, Full Stack Developer (MERN), Projects, Experience, and Contact Information.',
  keywords:
    'dhruvesh shyara,dhruvesh portfolio,full stack developer,mern developer,react,express,nodejs,mongodb',
  author: 'Dhruvesh Shyara',
  openGraph: {
    title: 'Dhruvesh Shyara | Portfolio',
    description:
      "Hi! My name is Dhruvesh. I'm a Full Stack Developer (MERN). Visit and know about me & my projects/designs.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dhruveshshyara',
    title: 'Dhruvesh Shyara | Portfolio',
    description:
      "Hi! My name is Dhruvesh. I'm a Full Stack Developer. Visit and know about me & my projects/designs.",
  },
};

import PageTransition from '@/components/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`body ${firaCode.variable} ${anton.variable} ${passionsConflict.variable} ${playfairDisplay.variable} ${inter.variable} ${outfit.variable}`}>
        <Preloader />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
