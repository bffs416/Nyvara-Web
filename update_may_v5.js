const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'cronogramas.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const hansBiomed = data.clients.find(c => c.nit === "901329423");

if (!hansBiomed) {
  console.error("HansBiomed client not found.");
  process.exit(1);
}

// Remove all existing May events (ids starting with hb_may_)
const beforeCount = hansBiomed.projects.length;
hansBiomed.projects = hansBiomed.projects.filter(p => !p.id.startsWith("hb_may_"));
const removedCount = beforeCount - hansBiomed.projects.length;
console.log(`Removed ${removedCount} old May events.`);

// New May events from the updated calendar
const newEvents = [
  {
    fecha: "2026-04-30", pieza: "1.Historia",
    linea: "Expectativa de promociones", objetivo: "Expectativa de promociones",
    publico: "Médicos", cta: "Comenta MAMÁ y se el primero en conocer la promoción"
  },
  {
    fecha: "2026-05-02", pieza: "2.Historia",
    linea: "Expectativa de promociones", objetivo: "Expectativa de promociones",
    publico: "Médicos", cta: "Comenta MAMÁ y se el primero en conocer la promoción"
  },
  {
    fecha: "2026-05-04", pieza: "3.Historia",
    linea: "Promo Fine D+", objetivo: "Promo Fine D+",
    publico: "Médicos", cta: "consulta con tu ejecutivo hansbiomed - Escríbenos antes de que se agote"
  },
  {
    fecha: "2026-05-05", pieza: "4.Historia",
    linea: "Promo mono D+", objetivo: "Promo mono D+",
    publico: "Médicos", cta: "consulta con tu ejecutivo hansbiomed - Escríbenos antes de que se agote"
  },
  {
    fecha: "2026-05-06", pieza: "1.Pieza publicitaria",
    linea: "Evento Cali", objetivo: "Evento Cali",
    publico: "Médicos", cta: "Mas información contactar a la ejecutiva"
  },
  {
    fecha: "2026-05-06", pieza: "5.Historia",
    linea: "Promo R+ D+", objetivo: "Promo R+ D+",
    publico: "Médicos", cta: "consulta con tu ejecutivo hansbiomed - Escríbenos antes de que se agote"
  },
  {
    fecha: "2026-05-07", pieza: "6.Historia",
    linea: "Promo Fusicare", objetivo: "Promo Fusicare",
    publico: "Médicos + Pacientes", cta: "consulta con tu ejecutivo hansbiomed - Escríbenos antes de que se agote"
  },
  {
    fecha: "2026-05-07", pieza: "7.Pieza publicitaria",
    linea: "Fusicare promo cliente final", objetivo: "kit fusi completo para regalo de mama",
    publico: "Médicos + Pacientes", cta: "Responde \"Regalo\" y te enviamos info de la promo del mes"
  },
  {
    fecha: "2026-05-08", pieza: "3.Pieza publicitaria",
    linea: "Evento Medellin", objetivo: "Evento Medellin",
    publico: "Médicos", cta: "Mas información contactar a la ejecutiva"
  },
  {
    fecha: "2026-05-08", pieza: "7.Historia",
    linea: "Promo mono (D+ o R+)", objetivo: "Promo mono (D+ o R+)",
    publico: "Médicos", cta: "consulta con tu ejecutivo hansbiomed - Escríbenos antes de que se agote"
  },
  {
    fecha: "2026-05-10", pieza: "8.Historia",
    linea: "Dia de la madre", objetivo: "Feliz dia de la madre",
    publico: "Médicos + Pacientes + Equipo", cta: "-"
  },
  {
    fecha: "2026-05-11", pieza: "2.Pieza publicitaria",
    linea: "Evento Bogotá", objetivo: "Evento Bogotá",
    publico: "Médicos", cta: "Mas información contactar a la ejecutiva"
  },
  {
    fecha: "2026-05-13", pieza: "4.Pieza publicitaria",
    linea: "Evento Barranquilla", objetivo: "Evento Barranquilla",
    publico: "Médicos", cta: "Mas información contactar a la ejecutiva"
  },
  {
    fecha: "2026-05-14", pieza: "5.Pieza publicitaria",
    linea: "Facebook - Migrar usuarios", objetivo: "Migrar usuarios a un único perfil de Hans facebook",
    publico: "seguidores", cta: "seguirnos en Hans Colombia"
  },
  {
    fecha: "2026-05-15", pieza: "1.Reel",
    linea: "Mint", objetivo: "Linea mint (informacion de cada referencia de hilos)",
    publico: "Médicos", cta: "Comenten la palabra Mint si deseas conocer mas"
  },
  {
    fecha: "2026-05-16", pieza: "9.Historia",
    linea: "Corea", objetivo: "Fidelizacion clientes VIP Hans corea (con planeacion de tomas)",
    publico: "Médicos", cta: "¿Te gustaría estar en nuestra próxima visita a Corea? | | Claro que si | | El otro no me lo pierdo"
  },
  {
    fecha: "2026-05-19", pieza: "10.Pieza publicitaria",
    linea: "Lion", objetivo: "lion HT0,64mm para cejas",
    publico: "Médicos + Pacientes", cta: "Revisa nuestro perfil y conoce nuestras lineas"
  },
  {
    fecha: "2026-05-19", pieza: "6.Pieza publicitaria (eventos de la semana)",
    linea: "Evento medellin, cali, bogota y barranquilla", objetivo: "Promocionar los eventos",
    publico: "Médicos", cta: "Mas información contactar"
  },
  {
    fecha: "2026-05-20", pieza: "1.Carrusel",
    linea: "Mint", objetivo: "Biomecánica Avanzada (Bidireccional vs. Multidireccional)",
    publico: "Médicos", cta: "Comenta la palabra ANCLAJE y te enviaremos por DM nuestra promoción del este mes"
  },
  {
    fecha: "2026-05-21", pieza: "8.Pieza publicitaria",
    linea: "KLARDIE", objetivo: "Beneficios R+",
    publico: "Médicos", cta: "Comentan Klárdie y recibe asesoria"
  },
  {
    fecha: "2026-05-25", pieza: "9.Pieza publicitaria",
    linea: "KLARDIE", objetivo: "Beneficios D+",
    publico: "Médicos", cta: "Comentan Klárdie y recibe asesoria"
  },
  {
    fecha: "2026-05-27", pieza: "2.Reel",
    linea: "Fidelización clientes Hans Corea", objetivo: "Fidelización clientes Hans corea (con planeacion de tomas)",
    publico: "Médicos", cta: "Comenta la palabra COREA y recibe información de como lograrlo"
  }
];

const now = new Date().toISOString();

newEvents.forEach((event, index) => {
  const typeMatch = event.pieza.match(/\d+\.(.*)/);
  const contentType = typeMatch ? typeMatch[1].trim().toLowerCase() : "post";

  const project = {
    id: `hb_may_v5_${Date.now()}_${index}`,
    title: `${event.pieza.toUpperCase()}: ${event.linea.toUpperCase()}`,
    description: event.objetivo,
    reason: `Publico: ${event.publico}. Objetivo: ${event.objetivo}`,
    dueDate: event.fecha,
    createdAt: now,
    status: "pending",
    kpis: {
      contentType: contentType,
      platform: "Instagram",
      periodMonth: "2026-05",
      notes: `CTA: ${event.cta}`
    },
    imageUrl: "/cronograma/default.png"
  };

  hansBiomed.projects.push(project);
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Added ${newEvents.length} updated May events. Total projects: ${hansBiomed.projects.length}`);
