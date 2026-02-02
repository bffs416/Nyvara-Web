'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleDiagnosticoClick = () => {
    router.push('/diagnostico');
  };

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mb-4 flex justify-center floating-animation"
          >
            <div className="relative w-[70%] h-auto aspect-[4/1]">
              <Image
                src={siteConfig.logos.hero}
                alt="Nyvara Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          <span className="badge">Estrategia Digital 2026</span>
          <h1>
            Redescubriendo tu <br />
            <span style={{ color: 'var(--accent)' }}>Esencia Digital</span>
          </h1>
          <p className="subtitle">
            Soluciones estratégicas de alto impacto para tu negocio. Rendimiento futurista, diseño minimalista.
          </p>

          <div className="btn-group">
            <button className="btn btn-primary" onClick={handleDiagnosticoClick}>
              Inicia tu Diagnóstico
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="corner-decor tl"></div>
              <div className="corner-decor br"></div>
              <span className="stat-value">100+</span>
              <span className="stat-label">Proyectos Exitosos</span>
            </div>
            <div className="stat-card">
              <div className="corner-decor tl"></div>
              <div className="corner-decor br"></div>
              <span className="stat-value">5+</span>
              <span className="stat-label">Años de Experiencia</span>
            </div>
            <div className="stat-card">
              <div className="corner-decor tl"></div>
              <div className="corner-decor br"></div>
              <span className="stat-value">98%</span>
              <span className="stat-label">Clientes Satisfechos</span>
            </div>
          </div>
        </div>
        
        <div className="marquee-container">
            <div className="marquee-content">
                <div className="marquee-item">Potenciando tu Marca <span>✦</span> Soluciones Integrales <span>✦</span> Resultados Medibles <span>✦</span> Marketing Estratégico</div>
                <div className="marquee-item">Potenciando tu Marca <span>✦</span> Soluciones Integrales <span>✦</span> Resultados Medibles <span>✦</span> Marketing Estratégico</div>
                <div className="marquee-item">Potenciando tu Marca <span>✦</span> Soluciones Integrales <span>✦</span> Resultados Medibles <span>✦</span> Marketing Estratégico</div>
            </div>
        </div>

        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
