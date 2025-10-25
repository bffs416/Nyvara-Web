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
        <section className="bg-primary py-8 -mt-12 md:-mt-16 lg:-mt-20 relative z-20">
          <div className="space-y-4">
              <div className="-rotate-2">
                  <Marquee>
                      <MarqueeText>Redescubriendo tu Esencia</MarqueeText>
                      <MarqueeText>Potenciando tu Marca</MarqueeText>
                      <MarqueeText>Estrategia</MarqueeText>
                      <MarqueeText>Creatividad</MarqueeText>
                      <MarqueeText>Tecnología</MarqueeText>
                  </Marquee>
              </div>
              <div className="rotate-2">
                  <Marquee reverse>
                      <MarqueeText>Soluciones Integrales</MarqueeText>
                      <MarqueeText>Resultados Medibles</MarqueeText>
                      <MarqueeText>Marketing</MarqueeText>
                      <MarqueeText>Eventos</MarqueeText>
                      <MarqueeText>Desarrollo</MarqueeText>
                  </Marquee>
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
