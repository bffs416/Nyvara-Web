
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <span className="badge">Estrategia Digital 2024</span>
          <h1>Redescubriendo tu <br /><span style={{ color: 'hsl(var(--accent))' }}>Esencia Digital</span></h1>
          <p className="subtitle">Elevamos tu negocio mediante soluciones estratégicas de alto impacto. Diseño minimalista, rendimiento futurista.</p>

          <div className="btn-group">
            <button className="btn btn-primary">
              Inicia tu Diagnóstico
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button className="btn btn-secondary">
              Explora Servicios
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
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

        <section className="white-section">
          <div className="white-section-content">
            <div>
              <h2>Transformación <br />Sin Límites.</h2>
              <p>Nuestra metodología combina el análisis de datos con la creatividad disruptiva. Creamos puentes entre tu visión y la realidad del mercado actual, garantizando un crecimiento sostenible y una identidad visual inconfundible.</p>
            </div>
            <div className="feature-list">
              <div className="feature-item">Optimización de Conversión <span>NEW</span></div>
              <div className="feature-item">Desarrollo Web Next-Gen <span>PREMIUM</span></div>
              <div className="feature-item">Arquitectura de Datos <span>HOT</span></div>
              <div className="feature-item">Consultoría de Marca <span>TOP</span></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
