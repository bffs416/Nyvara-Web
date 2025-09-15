'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Code, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const services = [
    {
      icon: <Megaphone size={36} className="text-primary-foreground" />,
      title: "Marketing que Convierte",
      description: "Atraemos a tu cliente ideal, convertimos su interés en acción y lo fidelizamos a través de estrategias de datos. Construimos audiencias, no solo seguidores.",
      features: ["Estrategia de Marca", "Publicidad Inteligente (Ads)", "Posicionamiento SEO", "Contenido que Enamora"],
      link: "#",
      details: {
        analogy: 'Imagina que tu marca es una estrella de rock. Nosotros somos el mánager que organiza la gira mundial: preparamos el escenario (estrategia), llenamos estadios (campañas), nos aseguramos de que los fans canten cada canción (contenido) y vendemos todos los discos (conversión).',
        whatIs: 'Es el arte y la ciencia de conectar tu marca con las personas correctas, en el momento preciso y con el mensaje adecuado. No se trata de hacer ruido, sino de construir relaciones rentables a largo plazo, utilizando datos para optimizar cada acción y maximizar el retorno de tu inversión.',
        howWeHelp: 'Nos sumergimos en tu negocio para entender tus objetivos y tu cliente ideal. Diseñamos una estrategia 360° que combina branding, publicidad de pago (PPC), posicionamiento orgánico (SEO) y marketing de contenidos. Ejecutamos, medimos y optimizamos constantemente para transformar tu presupuesto de marketing en un motor de crecimiento predecible.',
      }
    },
    {
      icon: <Calendar size={36} className="text-primary-foreground" />,
      title: "Eventos que Impactan",
      description: "Transformamos cada evento en una poderosa herramienta de negocio. Diseñamos experiencias memorables que fortalecen tu marca y crean conexiones de valor.",
      features: ["Stands y Ferias", "Congresos y Conferencias", "Lanzamientos de Producto", "Team Building Estratégico"],
      link: "/eventos",
      details: {
        analogy: 'Piensa en tu evento como una superproducción de Hollywood. Nosotros somos el director, productor y guionista. Nos encargamos de que la locación, el catering, la tecnología y el entretenimiento se unan para crear una experiencia que deje a tu audiencia pidiendo una secuela.',
        whatIs: 'Es la creación de momentos y experiencias en vivo (físicas, virtuales o híbridas) que conectan emocionalmente a tu marca con su público. Desde un congreso masivo hasta un lanzamiento exclusivo, cada evento es una oportunidad para comunicar tu mensaje de una forma tangible e inolvidable.',
        howWeHelp: 'Orquestamos cada detalle. Nuestra gestión 360° cubre desde la conceptualización creativa y la planificación logística hasta la producción técnica y la ejecución el día del evento. Creamos stands que son imanes de personas, congresos que son referentes del sector y lanzamientos que se convierten en noticia. Tu único trabajo es disfrutarlo.',
      }
    },
    {
      icon: <Code size={36} className="text-primary-foreground" />,
      title: "Tecnología que Impulsa",
      description: "Creamos el motor tecnológico que tu negocio necesita para escalar, desde aplicaciones web hasta soluciones de software a la medida.",
      features: ["Software a Medida", "Soluciones Web", "Diseño de Bases de Datos", "Aplicaciones Móviles"],
      link: "#",
      details: {
        analogy: 'Tu negocio es un coche de carreras de Fórmula 1. Nosotros somos el equipo de ingenieros que diseña y construye el motor. Creamos una pieza de ingeniería a medida, perfectamente ajustada a tu chasis (modelo de negocio), para que puedas superar a la competencia en cada curva.',
        whatIs: 'Es el diseño y construcción de herramientas digitales que resuelven problemas específicos de tu negocio. No adaptamos tu empresa a un software genérico; creamos software que se adapta a tu empresa, automatizando procesos, mejorando la eficiencia y abriendo nuevas oportunidades de mercado.',
        howWeHelp: 'Convertimos tus necesidades en código funcional y robusto. Nuestro proceso ágil involucra un profundo análisis de tus requerimientos para desarrollar soluciones web, aplicaciones móviles o sistemas internos que son escalables, seguros y fáciles de usar. No solo entregamos un producto, entregamos una ventaja competitiva duradera.',
      }
    }
  ];

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <Dialog onOpenChange={() => setSelectedService(null)}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">
              Soluciones 360° para tu Crecimiento
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Somos el socio estratégico que integra marketing, eventos y tecnología bajo una misma visión: la tuya.
            </p>
          </motion.div>

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
                <Card className="bg-background/50 border-border/50 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]">
                  <CardContent className="p-8 h-full flex flex-col">
                      <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mb-6">
                          {service.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 font-headline text-primary">{service.title}</h3>
                      <p className="text-foreground/80 mb-6 flex-grow">{service.description}</p>
                      
                      <div className="mb-6">
                          <h4 className="text-primary font-semibold mb-3">Áreas Clave:</h4>
                          <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                              <li key={idx} className="text-foreground/80 flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                              {feature}
                              </li>
                          ))}
                          </ul>
                      </div>
                      
                      {service.link === '/eventos' ? (
                        <Button asChild className="w-full mt-auto" variant="outline">
                          <Link href={service.link}>
                            Ver más
                            <ArrowRight size={16} />
                          </Link>
                        </Button>
                      ) : (
                        <DialogTrigger asChild>
                           <Button onClick={() => setSelectedService(service)} className="w-full mt-auto" variant="outline">
                              Ver más
                              <Info className="ml-2" size={16} />
                          </Button>
                        </DialogTrigger>
                      )}

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        {selectedService && (
            <DialogContent className="bg-background border-border text-foreground max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-primary font-headline mb-4">{selectedService.title}</DialogTitle>
                <DialogDescription as="div" className="text-muted-foreground space-y-6">
                  <div>
                    <p className="italic mb-4 text-base">{selectedService.details.analogy}</p>
                    <h4 className="font-bold text-lg text-primary mb-2">¿Qué es exactamente?</h4>
                    <p className="text-foreground/90">{selectedService.details.whatIs}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-2">¿Cómo te apoyamos en Nyvara?</h4>
                    <p className="text-foreground/90">{selectedService.details.howWeHelp}</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/#contact">
                      Solicitar más información
                    </Link>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
      </Dialog>
    </section>
  );
}
