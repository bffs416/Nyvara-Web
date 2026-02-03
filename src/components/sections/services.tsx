'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: <Megaphone size={32} className="text-black" />,
    title: "Marketing que Convierte",
    description: "Atraemos a tu cliente ideal, convertimos su interés en acción y lo fidelizamos a través de estrategias de datos. Construimos audiencias, no solo seguidores.",
    features: ["Estrategia de Marca", "Publicidad Inteligente (Ads)", "Posicionamiento SEO", "Contenido que Enamora"],
    link: "/marketing",
  },
  {
    icon: <Calendar size={32} className="text-black" />,
    title: "Eventos que Impactan",
    description: "Transformamos cada evento en una poderosa herramienta de negocio. Diseñamos experiencias memorables que fortalecen tu marca y crean conexiones de valor.",
    features: ["Stands y Ferias", "Congresos y Conferencias", "Lanzamientos de Producto", "Team Building Estratégico"],
    link: "/eventos",
  },
  {
    icon: <Code size={32} className="text-black" />,
    title: "Tecnología que Impulsa",
    description: "Creamos el motor tecnológico que tu negocio necesita para escalar, desde aplicaciones web hasta soluciones de software a la medida.",
    features: ["Software a Medida", "Aplicaciones Web", "Optimización de Bases de Datos", "Apps Móviles (iOS/Android)"],
    link: "/desarrollo",
  }
];

export default function Services() {

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-br from-[#EBF1FF] via-[#F5F7FF] to-[#EBF1FF] relative overflow-hidden">
      {/* Decorative Yellow Glow */}
      <div className="absolute top-1/2 -right-20 md:-right-32 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-6 tracking-tight">
            Nuestros Servicios: Soluciones 360° para tu Crecimiento
          </h2>
          <p className="text-lg md:text-xl text-[#5a5a75] max-w-3xl mx-auto leading-relaxed">
            Somos el socio estratégico que integra marketing, eventos y tecnología bajo una misma visión: el éxito de tu negocio.
          </p>
        </motion.div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-white border-none rounded-[32px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 h-full flex flex-col hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-10 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 font-headline text-[#1a1a2e]">{service.title}</h3>
                  <p className="text-[#646480] mb-8 flex-grow leading-relaxed">{service.description}</p>

                  <div className="mb-8 p-6 bg-slate-50/80 rounded-2xl">
                    <h4 className="text-[#1a1a2e] text-xs font-bold uppercase tracking-wider mb-4 opacity-80">Áreas Clave:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-[#5a5a75] flex items-center text-sm font-medium">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 shadow-[0_0_8px_rgba(255,214,0,0.6)]"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full mt-auto bg-white hover:bg-slate-50 text-[#1a1a2e] border border-slate-100 h-auto py-5 px-6 rounded-full justify-between group shadow-sm hover:shadow-md transition-all duration-300" variant="ghost">
                    <Link href={service.link}>
                      <span className="font-bold text-sm">Descubrir más sobre {service.title.split(' ')[0]}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </Button>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
