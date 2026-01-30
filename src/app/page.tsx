
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
            <span className="badge">Estrategia Digital 2024</span>
            <h1>Redescubriendo tu <br/><span style={{ color: 'var(--accent-cyan)' }}>Esencia Digital</span></h1>
            <p className="subtitle">Elevamos tu negocio mediante soluciones estratégicas de alto impacto. Diseño minimalista, rendimiento futurista.</p>

            <div className="btn-group">
                <button className="btn btn-primary">
                    Inicia tu Diagnóstico 
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="btn btn-secondary">
                    Explora Servicios
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
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

        <Services />
        <About />
        <Testimonials />
        <Contact />

      </main>
      <Footer />
    </>
  );
}
