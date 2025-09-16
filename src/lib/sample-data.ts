import { SurveyFormData, GeneralSurveyFormData } from "./types";

export const SAMPLE_SURVEY_DATA: SurveyFormData = {
  q1_name: "Clínica Estética Renacer",
  q1_location: "Calle Falsa 123, Bogotá",
  q1_country: "Colombia",
  q1_phone: "+573001234567",
  q1_experience: 10,
  q1_role: "Director Médico y Fundador",
  q2_services: "Ofrecemos rellenos con ácido hialurónico, toxina botulínica, y tratamientos láser para rejuvenecimiento facial. Nuestro enfoque es holístico.",
  q2_unique: "Nuestra técnica 'Renacer Lift' combina hilos tensores con bioestimuladores para un resultado natural sin cirugía.",
  q3_persona: "Sería un arquitecto de la belleza: preciso, artístico y enfocado en construir estructuras faciales armoniosas que perduren en el tiempo.",
  q4_perception: ["Enfoque en resultados naturales y armoniosos", "Seguridad, confianza y respaldo médico", "Cercanía, empatía y trato personalizado"],
  q4_other: "",
  q5_emotions: ["Confianza", "Felicidad", "Empoderamiento"],
  q5_other: "",
  q6_why: "Quiero que mis pacientes se sientan la mejor versión de sí mismos, restaurando su confianza y bienestar a través de resultados sutiles y elegantes.",
  q7_differentiation: ["Técnica especializada o patentada", "Experiencia del paciente y servicio al cliente"],
  q7_why: "Nuestra técnica es única y la experiencia que brindamos es de hotel 5 estrellas, desde la consulta inicial hasta el seguimiento post-tratamiento.",
  q7_other: "",
  q8_value: ["Resultados naturales y de alta calidad", "Seguridad y procedimientos mínimamente invasivos", "Planes de tratamiento personalizados"],
  q8_other: "",
  q9_presence: ["Instagram", "Página Web / Blog", "Email Marketing"],
  q9_other: "",
  q10_rating: 6,
  q10_challenges: ["Atraer nuevos pacientes", "Crear contenido de calidad de forma constante", "Diferenciarme de la competencia"],
  q10_other: "",
  q11_training: "Sí",
  q12_details: "Me gustaría enseñar mi técnica 'Renacer Lift' y mis protocolos de seguridad en el uso de bioestimuladores.",
  q13_colors: "Tonos tierra, dorados y blancos. Evocan naturalidad, lujo y un ambiente médico limpio y seguro.",
  q14_hobby: "Disfruto de la escultura y la fotografía, lo que me ayuda a tener un ojo entrenado para la proporción y la belleza en mi trabajo.",
  q15_final: "Creemos firmemente que la medicina estética es una mezcla de ciencia y arte.",
  competitors: [
    { name: "Clínica Piel Joven" },
    { name: "Dr. Estética Avanzada" },
  ],
};


export const SAMPLE_GENERAL_SURVEY_DATA: GeneralSurveyFormData = {
  name: "Tech Solutions Inc.",
  company: "Tech Solutions Inc.",
  role: "Gerente de Marketing",
  phone: "+15551234567",
  email: "marketing@techsolutions.com",
  business_description: "Somos una empresa B2B que ofrece soluciones de software como servicio (SaaS) para la gestión de proyectos y la colaboración en equipo.",
  main_services: "Nuestra plataforma principal 'ProjectFlow', un software de gestión de proyectos todo en uno. También ofrecemos consultoría para optimizar flujos de trabajo.",
  target_audience: "Pequeñas y medianas empresas (PYMES) en el sector tecnológico y agencias creativas que necesitan mejorar su eficiencia operativa.",
  goals: "Aumentar nuestra base de usuarios en un 30% en el próximo año, mejorar la tasa de retención de clientes y posicionarnos como líderes en el mercado de software de gestión.",
  challenges: "La competencia es alta y nos cuesta diferenciarnos. Generar leads de alta calidad de forma constante es nuestro mayor desafío actual.",
  interested_services: [
    "Marketing Digital (SEO, Redes Sociales, Publicidad)",
    "Desarrollo de Software a Medida o Soluciones Web",
    "Estrategia de Marca y Posicionamiento"
  ],
  additional_info: "Estamos explorando la posibilidad de organizar un evento de lanzamiento para una nueva funcionalidad importante de nuestro software y nos gustaría saber más sobre cómo podrían ayudarnos.",
};
