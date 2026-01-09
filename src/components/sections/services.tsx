'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: <Megaphone size={36} className="text-primary-foreground" />,
    title: "Marketing que Convierte",
    description: "Atraemos a tu cliente ideal, convertimos su interés en acción y lo fidelizamos a través de estrategias de datos. Construimos audiencias, no solo seguidores.",
    features: ["Estrategia de Marca", "Publicidad Inteligente (Ads)", "Posicionamiento SEO", "Contenido que Enamora"],
    link: "/marketing",
  },
  {
    icon: <Calendar size={36} className="text-primary-foreground" />,
    title: "Eventos que Impactan",
    description: "Transformamos cada evento en una poderosa herramienta de negocio. Diseñamos experiencias memorables que fortalecen tu marca y crean conexiones de valor.",
    features: ["Stands y Ferias", "Congresos y Conferencias", "Lanzamientos de Producto", "Team Building Estratégico"],
    link: "/eventos",
  },
  {
    icon: <Code size={36} className="text-primary-foreground" />,
    title: "Tecnología que Impulsa",
    description: "Creamos el motor tecnológico que tu negocio necesita para escalar, desde aplicaciones web hasta soluciones de software a la medida.",
    features: ["Software a Medida", "Aplicaciones Web", "Optimización de Bases de Datos", "Apps Móviles (iOS/Android)"],
    link: "/desarrollo",
  }
];

export default function Services() {
  return (
    <section id="services" className="relative pt-4 pb-24 overflow-hidden bg-[linear-gradient(135deg,#f8faff_0%,#e0e7ff_100%)] font-jakarta">
      {/* Background Depth Elements */}
      <div className="depth-blob w-[400px] h-[400px] bg-[#cbd5e1] -top-[100px] -left-[100px]" />
      <div className="depth-blob w-[300px] h-[300px] bg-[#fbbf24] -bottom-[50px] -right-[50px] [animation-delay:-5s]" />

      <div className="container relative z-10 mx-auto px-4">
        <header className="text-center mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1e293b] to-[#475569]"
          >
            Nuestros Servicios: Soluciones 360° para tu Crecimiento
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-[#64748b] leading-relaxed"
          >
            Somos el socio estratégico que integra marketing, eventos y tecnología bajo una misma visión: el éxito de tu negocio.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card relative h-full rounded-[32px] p-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:bg-white/60 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col">
                <div className="w-16 h-16 bg-[#facc15] rounded-[18px] flex items-center justify-center mb-7 shadow-[0_10px_20px_rgba(250,204,21,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#1e293b]">
                  {service.title}
                </h3>

                <p className="text-[#64748b] text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#1e293b] mb-4 block">
                  Áreas Clave:
                </span>

                <ul className="mb-8 space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-sm font-semibold text-[#1e293b] flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#facc15] rounded-full mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="inline-flex items-center justify-between px-6 py-3.5 rounded-2xl bg-white border border-black/5 text-[#1e293b] font-bold text-sm transition-all duration-300 hover:bg-[#1e293b] hover:text-white group/btn"
                >
                  Descubrir más sobre {service.title.split(' ')[0]}
                  <ArrowRight className="w-4.5 h-4.5 ml-2.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
