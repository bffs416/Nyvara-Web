'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Calendar, Code, ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    id: "marketing",
    icon: <Megaphone size={24} />,
    title: "Marketing que Convierte",
    description: "Atraemos a tu cliente ideal, convertimos su interés en acción y lo fidelizamos a través de estrategias de datos. Construimos audiencias, no solo seguidores.",
    features: ["Estrategia de Marca", "Publicidad Inteligente", "Posicionamiento SEO", "Contenido"],
    secondaryFeatures: ["Estrategias de Marketing", "Campañas B2B", "Analítica Web"],
    link: "/marketing",
    video: "/Nyvara%203.mp4" // Reemplaza esto con el video de marketing
  },
  {
    id: "eventos",
    icon: <Calendar size={24} />,
    title: "Eventos que Impactan",
    description: "Transformamos cada evento en una poderosa herramienta de negocio. Diseñamos experiencias memorables que fortalecen tu marca y crean conexiones de valor.",
    features: ["Stands y Ferias", "Congresos", "Lanzamientos", "Team Building"],
    secondaryFeatures: ["Producción Audiovisual", "Gestión de Invitados", "Escenografía"],
    link: "/eventos",
    video: "/Nyvara%203.mp4" // Reemplaza esto con el video de eventos
  },
  {
    id: "tecnologia",
    icon: <Code size={24} />,
    title: "Tecnología que Impulsa",
    description: "Creamos el motor tecnológico que tu negocio necesita para escalar, desde aplicaciones web hasta soluciones de software a la medida.",
    features: ["Software a Medida", "Aplicaciones Web", "Bases de Datos", "Apps Móviles"],
    secondaryFeatures: ["Páginas Webs", "E-commerce", "Sistemas ERP"],
    link: "/desarrollo",
    video: "/Nyvara%203.mp4" // Reemplaza esto con el video de tecnologia
  },
  {
    id: "recorridos",
    icon: <Camera size={24} />,
    title: "Recorridos Inmersivos",
    description: "Lleva tus espacios al mundo digital con recorridos virtuales 360° y tomas aéreas espectaculares.",
    features: ["Tomas Aéreas", "Fotografía 360°", "Tours Virtuales", "Inmersión"],
    secondaryFeatures: ["Anatomía 3D Personalizada", "Renders Arquitectónicos", "Realidad Aumentada"],
    link: "/recorridos-virtuales",
    video: "/Nyvara%203.mp4" // Reemplaza esto con el video de recorridos
  }
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    if (expanded === index) {
      setExpanded(null); // Contraer si ya está abierto
    } else {
      setExpanded(index); // Expandir
      setActive(index); // Cambiar el video al seleccionado
    }
  };

  return (
    <section id="servicios" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
         {/* Título de la Sección */}
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-16"
         >
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Nuestras Soluciones</h2>
            <h3 className="font-headline text-4xl md:text-5xl font-extrabold text-black mb-6">
              Diseñamos Experiencias. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Construimos Resultados.</span>
            </h3>
         </motion.div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
            
            {/* Columna Izquierda: Navegación de Servicios (Botones estilo Acordeón) */}
            <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
               {services.map((service, index) => (
                 <div
                   key={service.id}
                   onClick={() => handleToggle(index)}
                   className={`relative p-5 lg:p-6 rounded-[32px] cursor-pointer transition-all duration-500 overflow-hidden group border ${
                     active === index
                       ? 'bg-black text-white shadow-xl scale-100 lg:scale-105 z-10 border-black'
                       : 'bg-white text-black hover:bg-gray-50 border-gray-100'
                   }`}
                 >
                    {/* Contenido Superior (Icono y Título) */}
                    <div className="flex items-center gap-4 relative z-10">
                       <div className={`p-3 rounded-2xl transition-colors duration-300 ${active === index ? 'bg-white/20 text-white' : 'bg-gray-100 text-black group-hover:bg-gray-200'}`}>
                         {service.icon}
                       </div>
                       <h3 className={`text-xl font-bold font-headline transition-colors duration-300 ${active === index ? 'text-white' : 'text-black'}`}>
                         {service.title}
                       </h3>
                    </div>

                    {/* Contenido Expandible (Descripción y Botón) */}
                    <AnimatePresence>
                       {expanded === index && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.4, ease: "easeInOut" }}
                           className="relative z-10"
                         >
                            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                              {service.description}
                            </p>
                            
                            <Link href={service.link}>
                               <Button 
                                 variant="outline" 
                                 className="mt-6 w-full rounded-full bg-white text-black hover:bg-gray-200 border-none group/btn font-semibold"
                               >
                                 Explorar Servicio
                                 <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                               </Button>
                            </Link>
                         </motion.div>
                       )}
                    </AnimatePresence>
                    
                    {/* Efecto de Brillo de Fondo en activo */}
                    {active === index && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    )}
                 </div>
               ))}
            </div>

            {/* Columna Derecha: Showcase de Video Gigante (Arriba en móvil, Derecha en PC) */}
            <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden bg-black border border-gray-200 shadow-2xl min-h-[500px] md:min-h-[600px] flex flex-col justify-between order-1 lg:order-2">
               
               {/* Contenedor de Videos (Área central restringida para que no toque las etiquetas) */}
               <div className="absolute inset-x-0 top-32 bottom-32 md:top-24 md:bottom-24 z-0">
                 {services.map((service, index) => (
                   <video
                     key={`video-${service.id}`}
                     autoPlay
                     loop
                     muted
                     playsInline
                     className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                   >
                     <source src={service.video} type="video/mp4" />
                   </video>
                 ))}
               </div>
               
               {/* Gradientes Oscuros para que las etiquetas resalten */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/0 to-transparent z-20 pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-transparent z-20 pointer-events-none"></div>
               
               {/* Etiquetas (Áreas Clave) flotando sobre el video (Transición Suave) */}
               <AnimatePresence mode="wait">
                 <motion.div
                   key={`tags-${active}`}
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="absolute top-0 left-0 w-full p-4 md:p-6 z-30 flex flex-col items-center"
                 >
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3 opacity-80 text-center">Áreas Clave de Acción:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {services[active].features.map((feature, idx) => (
                         <span key={idx} className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                           {feature}
                         </span>
                      ))}
                    </div>
                 </motion.div>
               </AnimatePresence>
               
               {/* Etiquetas Secundarias flotando en la parte inferior */}
               <AnimatePresence mode="wait">
                 <motion.div
                   key={`tags-bottom-${active}`}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   transition={{ duration: 0.3 }}
                   className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-30 flex flex-col items-center"
                 >
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3 opacity-80 text-center">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {services[active].secondaryFeatures.map((feature, idx) => (
                         <span key={idx} className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                           {feature}
                         </span>
                      ))}
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>
            
         </div>
      </div>
    </section>
  )
}
