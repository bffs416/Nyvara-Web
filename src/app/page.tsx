import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import ServiceRecommendation from '@/components/sections/service-recommendation';
import Contact from '@/components/sections/contact';
import HeroImage from '@/components/sections/hero-image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <HeroImage />
        <Services />
        <About />
        <Testimonials />
        <ServiceRecommendation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
