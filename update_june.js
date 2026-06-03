const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'cronogramas.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const hansBiomed = data.clients.find(c => c.nit === "901329423");

if (!hansBiomed) {
  console.error("HansBiomed client not found.");
  process.exit(1);
}

// Remove any existing June events if they exist
const beforeCount = hansBiomed.projects.length;
hansBiomed.projects = hansBiomed.projects.filter(p => !p.id.startsWith("hb_jun_"));
const removedCount = beforeCount - hansBiomed.projects.length;
if (removedCount > 0) console.log(`Removed ${removedCount} old June events.`);

const newEvents = [
  { fecha: "2026-06-04", pieza: "1.Post", linea: "Hansbiomed", objetivo: "¿Quién es HansBiomed Colombia? Conoce nuestras soluciones para medicina estética, regeneración cutánea y restauración capilar.", cta: "Contáctanos para más información." },
  { fecha: "2026-06-05", pieza: "1.Historia", linea: "MINT", objetivo: "MINT Tip (Nariz)", cta: "Aprende esta técnica en nuestras capacitaciones." },
  { fecha: "2026-06-09", pieza: "1.Carrusel", linea: "MINT + Klárdie", objetivo: "Rejuvenecimiento Integral", cta: "Escríbenos al DM si quieres saber qué clínicas en Colombia realizan este protocolo combinado." },
  { fecha: "2026-06-10", pieza: "2.Historia", linea: "Hansbiomed", objetivo: "Tecnología Coreana", cta: "Conoce la tecnología y respaldo científico detrás de nuestras soluciones." },
  { fecha: "2026-06-11", pieza: "1.Pieza publicitaria", linea: "MINT", objetivo: "Hilos MINT (Lifting sin Cirugía)", cta: "¿Quieres resultados como estos? Envíanos un DM para ayudarte a encontrar a tu médico MINT más cercano en Colombia." },
  { fecha: "2026-06-12", pieza: "8.Pieza publicitaria", linea: "Fusicare", objetivo: "Recuperación postprocedimiento", cta: "Conoce cómo complementar los cuidados posteriores a tus procedimientos." },
  { fecha: "2026-06-13", pieza: "2.Pieza publicitaria", linea: "MINT", objetivo: "MINT Fix (Fijación Fuerte)", cta: "Escríbanos para recibir asesoría sobre qué pacientes son candidatos ideales para MINT Fix y adquiera el producto." },
  { fecha: "2026-06-17", pieza: "3.Historia", linea: "LION", objetivo: "Sistema LION (Versatilidad)", cta: "Conoce los especialistas que usan LION" },
  { fecha: "2026-06-18", pieza: "1.Reel", linea: "Klárdie", objetivo: "Klárdie R+ (Manchas y Luminosidad)", cta: "Solicite asesoría comercial hoy mismo y sume Klárdie R+ a su portafolio de servicios." },
  { fecha: "2026-06-18", pieza: "9.Pieza publicitaria", linea: "Fusicare", objetivo: "Hidratación y barrera cutánea", cta: "Descubre los beneficios de una piel protegida e hidratada." },
  { fecha: "2026-06-19", pieza: "3.Pieza publicitaria", linea: "LION", objetivo: "Sistema LION (Cero Cicatrices)", cta: "Actualice la técnica en su clínica capilar. Contáctenos al DM para conocer cómo hacer la transición al Sistema LION™ y capacitar a su equipo médico." },
  { fecha: "2026-06-20", pieza: "4.Historia", linea: "Hansbiomed", objetivo: "Academia Hanschool / D2D", cta: "Conoce nuestros programas de capacitación y entrenamiento médico." },
  { fecha: "2026-06-21", pieza: "5.Historia", linea: "Hansbiomed", objetivo: "Día del Padre", cta: "Feliz día del Padre" },
  { fecha: "2026-06-22", pieza: "4.Pieza publicitaria", linea: "MINT", objetivo: "MINT PDO: El secreto de la duración (Moldeado vs. Cortado)", cta: "¿Eres médico estético? Conoce nuestros productos y eleva el nivel de tus procedimientos." },
  { fecha: "2026-06-24", pieza: "5.Pieza publicitaria", linea: "MINT", objetivo: "MINT PDO: Calibres personalizados (La física del peso facial)", cta: "Cada rostro es único y tu tratamiento también debería serlo. Solicita una valoración con un médico certificado HansBiomed." },
  { fecha: "2026-06-24", pieza: "2.Reel", linea: "LION", objetivo: "LION (Trasplante Capilar)", cta: "Especialistas maximicen la tasa de supervivencia folicular en sus procedimientos con nuestros Implantador LION." },
  { fecha: "2026-06-25", pieza: "6.Historia", linea: "MINT", objetivo: "Hilos MINT (Seguridad y Anclaje)", cta: "Realiza tu pedido de MINT PDO hoy. Escríbenos." },
  { fecha: "2026-06-26", pieza: "6.Pieza publicitaria", linea: "Klárdie", objetivo: "Klárdie D+ (Recuperación de Firmeza)", cta: "Envíenos un DM para recibir la ficha técnica de Klárdie D+ y sumarlo a los protocolos de su clínica." },
  { fecha: "2026-06-27", pieza: "7.Historia", linea: "LION", objetivo: "Sistema LION (Esterilidad)", cta: "Solicita tecnología LION" },
  { fecha: "2026-06-27", pieza: "8.Historia", linea: "Hansbiomed", objetivo: "HansBiomed Colombia (INVIMA)", cta: "Conoce nuestras líneas de producto." },
  { fecha: "2026-06-28", pieza: "7.Pieza publicitaria", linea: "Klárdie", objetivo: "Klárdie R+ (Tratamiento de Manchas)", cta: "Envíenos un DM para recibir la ficha técnica de Klárdie R+ y sumarlo a los protocolos de su clínica." },
  { fecha: "2026-06-29", pieza: "10.Pieza publicitaria", linea: "Fusicare", objetivo: "Cuidado complementario", cta: "Contáctanos para recibir más información." },
];

const now = new Date().toISOString();

newEvents.forEach((event, index) => {
  const typeMatch = event.pieza.match(/\d+\.(.*)/);
  const contentType = typeMatch ? typeMatch[1].trim().toLowerCase() : "post";

  const project = {
    id: `hb_jun_v1_${Date.now()}_${index}`,
    title: `${event.pieza.toUpperCase()}: ${event.linea.toUpperCase()}`,
    description: event.objetivo,
    reason: `Línea: ${event.linea}. Objetivo: ${event.objetivo}`,
    dueDate: event.fecha,
    createdAt: now,
    status: "pending",
    kpis: {
      contentType: contentType,
      platform: "Instagram",
      periodMonth: "2026-06",
      notes: `CTA: ${event.cta}`
    },
    imageUrl: "/cronograma/default.png"
  };

  hansBiomed.projects.push(project);
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Added ${newEvents.length} June events. Total projects: ${hansBiomed.projects.length}`);
