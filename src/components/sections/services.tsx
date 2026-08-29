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

  return (
    <section id="services" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
         {/* Título de la Sección */}
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center md:text-left"
         >
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 tracking-tight">
              Diseñamos Experiencias.<br/>Construimos Resultados.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              Explora nuestras 4 áreas principales de especialización interactuando con el menú.
            </p>
         </motion.div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
            
            {/* Columna Izquierda: Menú Interactivo */}
            <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
              {services.map((service, index) => {
                 const isActive = index === active;
                 return (
                   <div 
                     key={service.id}
                     onClick={() => setActive(index)}
                     onMouseEnter={() => setActive(index)}
                     className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border-2 ${
                       isActive 
                         ? 'bg-black text-white border-black shadow-2xl scale-[1.02] z-10' 
                         : 'bg-white text-black border-transparent hover:border-gray-200 hover:bg-gray-50'
                     }`}
                   >
                      <div className="flex items-center gap-4 mb-2">
                         <div className={`p-3 rounded-2xl transition-colors duration-300 ${isActive ? 'bg-white text-black' : 'bg-gray-100 text-black'}`}>
                           {service.icon}
                         </div>
                         <h3 className="text-xl font-bold font-headline">{service.title}</h3>
                      </div>
                      
                      {/* Contenido expansible cuando está activo */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-gray-300 mt-4 mb-6 leading-relaxed">
                              {service.description}
                            </p>
                            <Button asChild variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black rounded-full font-bold">
                              <Link href={service.link}>
                                Descubrir más sobre esta área <ArrowRight size={16} className="ml-2" />
                              </Link>
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                 )
              })}
            </div>

            {/* Columna Derecha: Showcase de Video Gigante */}
            <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden bg-black border border-gray-200 shadow-2xl aspect-video lg:aspect-auto lg:min-h-[600px]">
               
               {/* Contenedor de Videos (Renderiza todos para que no se reinicien) */}
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
