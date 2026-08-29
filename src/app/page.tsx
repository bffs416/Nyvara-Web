'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('@/components/sections/contact'), { ssr: false });
import Hero from '@/components/sections/hero';
import Marquee from '@/components/sections/marquee';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Global Background Glows (Visible under transparent sections) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#fafcff]">
        {/* Glow Top Left */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        {/* Glow Middle Right */}
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
        
        {/* Glow Bottom Center */}
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vw] max-w-[800px] max-h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <main className="overflow-hidden relative z-0">
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
