import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Home',
  description:
    'Dhruvesh Shyara - Full Stack Developer Portfolio. Explore premium web applications, e-commerce platforms, and innovative projects built with React, Next.js, MERN stack, and modern technologies.',
  keywords: [
    'Dhruvesh Shyara',
    'Dhruvesh',
    'best portfolio',
    'portfolio website',
    'full stack developer portfolio',
    'MERN stack developer',
    'React developer',
    'Next.js developer',
  ],
  openGraph: {
    title: 'Dhruvesh Shyara | Full Stack Developer Portfolio',
    description:
      'Explore the portfolio of Dhruvesh Shyara featuring premium web applications and innovative projects.',
    url: 'https://dhruveshshyara.com',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
