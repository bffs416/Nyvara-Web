'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';

export default function Home() {
  useEffect(() => {
    // This effect runs when the component mounts on the client.
    // It checks if the URL has a hash and scrolls to the corresponding element.
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // We need to use querySelector with the hash.
        // The hash includes '#', so we don't need to add it.
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // We use a small timeout to ensure the DOM is fully painted before scrolling,
    // especially after a page navigation.
    const timer = setTimeout(handleHashScroll, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
