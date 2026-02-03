'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Hero from '@/components/sections/hero';
import Marquee from '@/components/sections/marquee';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
