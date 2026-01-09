'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Marquee from '@/components/ui/marquee';
import { Sparkles } from 'lucide-react';

const MarqueeText = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center text-4xl font-bold uppercase mx-4 text-primary-foreground">
    <Sparkles className="mr-4 text-primary-foreground" />
    {children}
  </span>
);

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
        <section className="relative z-20 pt-12 pb-0 -mt-10 md:-mt-14 overflow-visible">
          <div className="marquee-container">
            <div className="marquee-content-bold">
              {/* Set 1 */}
              <div className="marquee-item-bold">Potenciando tu Marca <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Estrategia <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Desarrollo <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Soluciones <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Resultados <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Esencia <span className="separator-spark">✦</span></div>
              {/* Set 2 */}
              <div className="marquee-item-bold">Potenciando tu Marca <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Estrategia <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Desarrollo <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Soluciones <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Resultados <span className="separator-spark">✦</span></div>
              <div className="marquee-item-bold">Esencia <span className="separator-spark">✦</span></div>
            </div>
          </div>
        </section>
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
