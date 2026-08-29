'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Brain, Trophy, Telescope, PlayCircle, Volume2, VolumeX } from 'lucide-react';

const values = [
  {
    icon: <Handshake size={28} />,
    title: "Somos Socios, no Proveedores",
    description: "Nos integramos en tu equipo. Tu éxito es el nuestro. Abordamos cada proyecto como socios estratégicos."
  },
  {
    icon: <Brain size={28} />,
    title: "Estrategia Antes de la Ejecución",
    description: "Nunca construimos sin un plano. Cada acción sigue una estrategia clara con objetivos medibles para maximizar tu retorno."
  },
  {
    icon: <Trophy size={28} />,
    title: "Enfocados en Resultados",
    description: "Nuestra meta es generar un impacto real en tu negocio. Nos enfocamos en resultados y métricas de éxito, no solo en entregables."
  },
  {
    icon: <Telescope size={28} />,
    title: "Innovación Constante",
    description: "El mercado evoluciona y nosotros también. Te ofrecemos soluciones que funcionan hoy y te preparan para el mañana."
  }
];

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
     if (videoRef.current) {
        if (isPlaying) {
           videoRef.current.pause();
        } else {
           videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
     }
  };

  const toggleMute = (e: React.MouseEvent) => {
     e.stopPropagation();
     if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
     }
  };

  return (
    <section id="nosotros" className="py-24 bg-transparent relative overflow-hidden">
       <div className="container mx-auto px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
             <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-black tracking-tight">Nuestra Filosofía</h2>
          </motion.div>

          {/* Cuadrícula BENTO BOX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
             
             {/* BLOQUE 1: Video Corporativo (8 Columnas) */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="lg:col-span-8 bg-black rounded-[40px] overflow-hidden relative group aspect-video shadow-2xl cursor-pointer"
               onClick={togglePlay}
             >
                 <video
                   ref={videoRef}
                   src="/Nyvara%20inf.mp4" /* Cambia este archivo por el video horizontal de 1920x1080 */
                   className="w-full h-full object-cover transition-transform duration-700"
                   playsInline
                   muted={isMuted}
                   onEnded={() => setIsPlaying(false)}
                 />
                 
                 {/* Capa y Botón de Play (Se oculta al reproducir) */}
                 {!isPlaying && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                       <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle size={64} className="text-white" strokeWidth={1.5} />
                       </div>
                       <span className="text-white mt-6 font-bold tracking-widest uppercase text-sm drop-shadow-md">Conoce más de la empresa</span>
                    </div>
                 )}

                 {/* Controles del Video (Aparecen al reproducir) */}
                 {isPlaying && (
                    <button 
                       onClick={toggleMute} 
                       className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-full text-white hover:bg-white hover:text-black transition-colors shadow-lg z-20"
                    >
                       {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                 )}
             </motion.div>

             {/* BLOQUE 2: Manifiesto Principal (4 Columnas) */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="lg:col-span-4 bg-white rounded-[40px] p-10 flex flex-col justify-center shadow-xl border border-gray-100"
             >
                <h3 className="text-3xl lg:text-4xl font-extrabold font-headline leading-[1.1] text-black mb-6 tracking-tight">
                   La fragmentación es el mayor enemigo del crecimiento.
                </h3>
                <div className="text-gray-500 space-y-5 text-[15px] leading-relaxed">
                   <p>Las empresas a menudo contratan agencias que no se comunican entre sí. Marketing, tecnología y eventos operan en silos, diluyendo el impacto y el presupuesto.</p>
                   <p className="font-bold text-black text-xl">Nosotros rompemos ese paradigma.</p>
                   <p>Nyvara es la solución integral que tu negocio necesita. Unificamos marketing, tecnología y eventos bajo una sola estrategia.</p>
                   <p className="font-bold text-black italic text-lg opacity-80 pt-4 border-t border-gray-100">Una visión. Un equipo.<br/>Un crecimiento sin límites.</p>
                </div>
             </motion.div>

             {/* BLOQUES 3, 4, 5, 6: Los 4 Valores (3 Columnas cada uno) */}
             {values.map((value, index) => (
                <motion.div 
                   key={index} 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                   viewport={{ once: true }}
                   className="md:col-span-1 lg:col-span-3 bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center"
                >
                   <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                      {value.icon}
                   </div>
                   <h4 className="text-xl font-bold text-black mb-4 leading-tight tracking-tight">{value.title}</h4>
                   <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
             ))}

          </div>
       </div>
    </section>
  );
}
