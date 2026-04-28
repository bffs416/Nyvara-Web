const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\57300\\Downloads\\repositorios\\Nyvara-Web\\src\\lib\\cronogramas.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newEvents = [
  {
    "fecha": "2026-04-30",
    "pieza": "1.Historia",
    "marca": "Promociones",
    "objetivo": "Generar expectativa sobre las promociones del mes",
    "publico": "Médicos",
    "cta": "Activa recordatorio y prepárate + Comenta MAMÁ si quieres enterarte primero."
  },
  {
    "fecha": "2026-05-01",
    "pieza": "2.Historia",
    "marca": "Promo Fine D+",
    "objetivo": "Promocionar descuentos mes mamá",
    "publico": "Médicos",
    "cta": "Escríbenos antes de que se agote"
  },
  {
    "fecha": "2026-05-02",
    "pieza": "3.Historia",
    "marca": "Promo mono D+",
    "objetivo": "Promocionar descuentos mes mamá",
    "publico": "Médicos",
    "cta": "Escríbenos antes de que se agote"
  },
  {
    "fecha": "2026-05-03",
    "pieza": "4.Historia",
    "marca": "Promo R+ D+",
    "objetivo": "Promocionar descuentos mes mamá",
    "publico": "Médicos",
    "cta": "Escríbenos antes de que se agote"
  },
  {
    "fecha": "2026-05-04",
    "pieza": "5.Historia",
    "marca": "Promo Fusicare",
    "objetivo": "Promocionar descuentos mes mamá",
    "publico": "Médicos + Pacientes",
    "cta": "Escríbenos antes de que se agote"
  },
  {
    "fecha": "2026-05-05",
    "pieza": "6.Historia",
    "marca": "Promo mono (D+ o R+)",
    "objetivo": "Promocionar descuentos mes mamá",
    "publico": "Médicos",
    "cta": "Escríbenos antes de que se agote"
  },
  {
    "fecha": "2026-05-07",
    "pieza": "7.Pieza publicitaria",
    "marca": "Fusicare",
    "objetivo": "Kit completo para regalo de mamá",
    "publico": "Médicos + Pacientes",
    "cta": "Responde \"Regalo\" y te enviamos info de la promo del mes"
  },
  {
    "fecha": "2026-05-10",
    "pieza": "7.Historia",
    "marca": "Hansbiomed",
    "objetivo": "Feliz día de la madre",
    "publico": "Médicos + Pacientes + Equipo",
    "cta": "-"
  },
  {
    "fecha": "2026-05-12",
    "pieza": "8.Historia",
    "marca": "Hansbiomed - Colaboración",
    "objetivo": "Fidelización clientes VIP Hans Corea (con planeación de tomas)",
    "publico": "Médicos",
    "cta": "¿Te gustaría estar en nuestra próxima visita a Corea? | Claro que sí | El otro no me lo pierdo"
  },
  {
    "fecha": "2026-05-13",
    "pieza": "1.Carrusel",
    "marca": "Mint",
    "objetivo": "Biomecánica Avanzada (Bidireccional vs. Multidireccional)",
    "publico": "Médicos",
    "cta": "Comenta la palabra ANCLAJE y te enviaremos por DM nuestra promoción de este mes"
  },
  {
    "fecha": "2026-05-18",
    "pieza": "1.Reel",
    "marca": "Mint - Colaboración",
    "objetivo": "El Protocolo Definitivo para Levantamiento de Cejas (Foxy Eyes)",
    "publico": "Médicos",
    "cta": "Comenten la palabra DUAL y les envío por mensaje directo el esquema de vectores exacto de esta técnica"
  },
  {
    "fecha": "2026-05-21",
    "pieza": "8.Pieza publicitaria",
    "marca": "Mint - Colaboración",
    "objetivo": "El Error del Plano",
    "publico": "Médicos",
    "cta": "Comentan PLANO y recibe asesoría"
  },
  {
    "fecha": "2026-05-27",
    "pieza": "2.Reel",
    "marca": "Hansbiomed - Colaboración",
    "objetivo": "Fidelización clientes Hans Corea (con planeación de tomas)",
    "publico": "Médicos",
    "cta": ""
  },
  {
    "fecha": "2026-05-25",
    "pieza": "9.Pieza publicitaria",
    "marca": "Mint - Colaboración",
    "objetivo": "El Error de Selección de paciente",
    "publico": "Médicos",
    "cta": "Comenta \"Paciente\" para unirte a nuestras capacitaciones"
  },
  {
    "fecha": "Por definir",
    "pieza": "1.Pieza publicitaria",
    "marca": "Evento Cali",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "Por definir",
    "pieza": "2.Pieza publicitaria",
    "marca": "Evento Bogotá",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "Por definir",
    "pieza": "3.Pieza publicitaria",
    "marca": "Evento Medellín",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "Por definir",
    "pieza": "4.Pieza publicitaria",
    "marca": "Evento Cartagena",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "Por definir",
    "pieza": "5.Pieza publicitaria",
    "marca": "Evento Pereira",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "Por definir",
    "pieza": "6.Pieza publicitaria",
    "marca": "Evento Ibagué",
    "objetivo": "Promocionar evento",
    "publico": "Médicos",
    "cta": "Más información contactar a la ejecutiva"
  },
  {
    "fecha": "2026-05-15",
    "pieza": "10.Pieza publicitaria",
    "marca": "Lion",
    "objetivo": "Promocionar HT0,64mm",
    "publico": "Médicos + Pacientes",
    "cta": "Revisa nuestro perfil y conoce nuestras líneas"
  }
];

const hansBiomed = data.clients.find(c => c.nit === "901329423");

if (hansBiomed) {
  newEvents.forEach((event, index) => {
    const typeMatch = event.pieza.match(/\d+\.(.*)/);
    const contentType = typeMatch ? typeMatch[1].toLowerCase() : "post";
    
    // Clean up fecha if "Por definir"
    const dueDate = event.fecha === "Por definir" ? "2026-05-31" : event.fecha;
    
    const project = {
      id: `hb_may_${Date.now()}_${index}`,
      title: `${event.pieza.toUpperCase()}: ${event.marca.toUpperCase()}`,
      description: event.objetivo,
      reason: `Público: ${event.publico}. Objetivo: ${event.objetivo}`,
      dueDate: dueDate,
      createdAt: new Date().toISOString(),
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
  console.log("Updated HansBiomed with 20 new projects for May.");
} else {
  console.error("HansBiomed client not found.");
}
