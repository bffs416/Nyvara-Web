import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import EventsGallery from '@/components/sections/events-gallery';
import Testimonials from '@/components/sections/testimonials';
import ServiceRecommendation from '@/components/sections/service-recommendation';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <EventsGallery />
        <Testimonials />
        <ServiceRecommendation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
