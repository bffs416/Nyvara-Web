export default function Home() {
  return (
    <>
      <style>{`
        :root {
            --bg: #030508;
            --accent-yellow: #ffcc00;
            --accent-cyan: #00f3ff;
            --grid-color: rgba(0, 243, 255, 0.07);
            --card-bg: rgba(10, 15, 25, 0.7);
            --border-color: rgba(255, 255, 255, 0.1);
            --text-main: #ffffff;
            --text-dim: rgba(255, 255, 255, 0.6);
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
        }

        .cyber-grid {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(var(--grid-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: -1;
            mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
        }

        .glow-sphere {
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(0, 243, 255, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            top: 20%;
            right: 10%;
            z-index: -1;
            filter: blur(40px);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 20px;
            text-align: center;
        }

        .badge {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: var(--accent-cyan);
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 20px;
            display: inline-block;
            border: 1px solid var(--accent-cyan);
            padding: 4px 12px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
        }

        h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            letter-spacing: -2px;
            margin-bottom: 24px;
            line-height: 1.1;
        }

        .subtitle {
            font-size: 1.1rem;
            color: var(--text-dim);
            max-width: 600px;
            margin: 0 auto 40px;
            line-height: 1.6;
        }

        .btn-group {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 80px;
        }

        .btn {
            padding: 16px 32px;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn-primary {
            background-color: var(--accent-yellow);
            color: #000;
            clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255, 204, 0, 0.3);
        }

        .btn-secondary {
            background: transparent;
            color: var(--text-main);
            border: 1px solid var(--border-color);
            position: relative;
        }

        .btn-secondary:hover {
            border-color: var(--accent-cyan);
            background: rgba(0, 243, 255, 0.05);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-bottom: 100px;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 40px;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            transition: 0.4s;
        }

        .stat-card:hover {
            border-color: var(--accent-cyan);
            transform: translateY(-5px);
        }

        .stat-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
            transform: translateX(-100%);
            transition: 0.6s;
        }

        .stat-card:hover::before {
            transform: translateX(100%);
        }

        .stat-value {
            font-size: 3rem;
            font-weight: 900;
            color: var(--accent-yellow);
            margin-bottom: 8px;
            display: block;
        }

        .stat-label {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--text-dim);
        }

        .marquee-container {
            background: var(--accent-yellow);
            color: #000;
            padding: 20px 0;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            transform: rotate(-1deg) scale(1.05);
            margin-top: 50px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            position: relative;
            z-index: 10;
        }

        .marquee-content {
            display: flex;
            animation: scroll 20s linear infinite;
        }

        .marquee-item {
            font-size: 1.2rem;
            font-weight: 900;
            padding: 0 40px;
            display: flex;
            align-items: center;
            text-transform: uppercase;
        }

        .marquee-item span {
            margin: 0 15px;
            opacity: 0.4;
        }

        .white-section {
            background-color: #ffffff;
            color: #030508;
            padding: 120px 20px;
            position: relative;
            z-index: 5;
            margin-top: -10px;
        }

        .white-section-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
            text-align: left;
        }

        .white-section h2 {
            font-size: 3rem;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 20px;
            color: #000;
        }

        .white-section p {
            font-size: 1.1rem;
            color: #555;
            line-height: 1.6;
        }

        .feature-list {
            list-style: none;
        }

        .feature-item {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .feature-item span {
            color: var(--accent-yellow);
            background: #000;
            padding: 2px 8px;
            font-size: 0.7rem;
            border-radius: 3px;
        }

        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .corner-decor {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 2px solid var(--accent-cyan);
        }

        .tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .br { bottom: -2px; right: -2px; border-left: none; border-top: none; }

        @media (max-width: 768px) {
            .white-section-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
        }
      `}</style>
      <main>
        <div className="cyber-grid"></div>
        <div className="glow-sphere"></div>

        <div className="container">
          <span className="badge">Estrategia Digital 2024</span>
          <h1>Redescubriendo tu <br /><span style={{ color: 'var(--accent-cyan)' }}>Esencia Digital</span></h1>
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
    </>
  );
}
