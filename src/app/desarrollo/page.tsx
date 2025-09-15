'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Braces, Globe, Database, Smartphone, Info, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { siteConfig } from '@/lib/config';

const DesarrolloSoftware = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  const serviceItems = [
    {
      icon: <Braces size={32} />,
      title: 'Desarrollo de Software a Medida',
      description: 'Creamos programas y sistemas informáticos diseñados exclusivamente para resolver los desafíos únicos de tu operación.',
      details: {
        analogy: 'Un software a medida es como un traje de sastrería. En lugar de una solución genérica que no es perfecta para nadie, te confeccionamos una herramienta que se adapta a cada proceso de tu empresa, dándote una ventaja única.',
        whatIs: 'Es el diseño y construcción de software creado desde cero para un cliente. A diferencia del software pre-empaquetado, cada función se alinea con tus flujos de trabajo, reglas de negocio y objetivos particulares (ej. software contable, gestión de inventarios).',
        howWeHelp: 'Analizamos a fondo tus operaciones, diseñamos y construimos una solución robusta y escalable que automatiza tareas, elimina cuellos de botella y te da control total sobre tu información, optimizando tu eficiencia y rentabilidad.'
      }
    },
    {
      icon: <Globe size={32} />,
      title: 'Desarrollo de Soluciones Web',
      description: 'Diseñamos y construimos plataformas web potentes, desde sitios corporativos y tiendas online hasta aplicaciones web complejas.',
      details: {
        analogy: 'Tu sitio web es tu principal escaparate al mundo digital. Nosotros lo diseñamos para que cada pasillo sea intuitivo, cada producto brille y el proceso de pago sea tan simple que tus clientes compren con una sonrisa.',
        whatIs: 'Abarca la creación de cualquier solución accesible a través de un navegador: desde páginas web institucionales, hasta plataformas de e-commerce con pasarelas de pago o aplicaciones web interactivas (Web Apps) con funcionalidades complejas.',
        howWeHelp: 'Fusionamos diseño UX/UI de vanguardia con tecnología de punta. Creamos plataformas rápidas, seguras y optimizadas para móviles que no solo se ven increíbles, sino que están diseñadas para convertir visitantes en clientes.'
      }
    },
    {
      icon: <Database size={32} />,
      title: 'Diseño de Bases de Datos',
      description: 'Estructuramos el activo más valioso de tu empresa, tus datos, para que sean accesibles, seguros y potentes.',
      details: {
        analogy: 'Una base de datos es la biblioteca central de tu negocio. Si los libros (datos) están desordenados, encontrar información es una pesadilla. Nosotros diseñamos las estanterías lógicas y el sistema de catalogación para que encuentres cualquier dato en segundos.',
        whatIs: 'Es la arquitectura fundamental sobre la que se apoya cualquier software. Implica diseñar el modelo lógico y físico de la base de datos (SQL o NoSQL), definir las relaciones y establecer las reglas para garantizar la integridad y seguridad de la información.',
        howWeHelp: 'Diseñamos bases de datos optimizadas para el rendimiento y la escalabilidad. Aseguramos que tus aplicaciones respondan rápidamente, que tus datos estén protegidos y que la estructura pueda crecer junto con tu negocio.'
      }
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Desarrollo de Aplicaciones Móviles',
      description: 'Creamos aplicaciones nativas e híbridas para iOS y Android que llevan tu negocio al bolsillo de tus clientes.',
      details: {
        analogy: 'Una app es un canal directo y permanente con tu cliente. Es como darle una llave de acceso VIP a tu negocio, permitiéndole interactuar y comprar contigo en cualquier momento y lugar, creando una relación mucho más cercana.',
        whatIs: 'Es el desarrollo de aplicaciones para smartphones y tablets (iOS y Android). Pueden ser nativas (usando Swift/Kotlin para máximo rendimiento) o híbridas (usando tecnologías como React Native para optimizar costes y tiempos).',
        howWeHelp: 'Te acompañamos en todo el ciclo: desde la estrategia y el diseño de una experiencia de usuario (UX) intuitiva, hasta el desarrollo, las pruebas y el lanzamiento en las App Stores. Creamos apps que aportan un valor real a tus usuarios.'
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-background text-foreground pt-32 pb-20"
        >
          <div className="container mx-auto px-6">
            {/* Header Section */}
            <motion.section
              className="text-center mb-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Desarrollo de Software</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Construimos las herramientas digitales que tu negocio necesita para crecer.
              </p>
            </motion.section>

            {/* Services Grid */}
            <motion.section
              className="grid md:grid-cols-2 gap-10 mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {serviceItems.map((item, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <motion.div
                      className="bg-card p-8 rounded-xl cursor-pointer border border-border/50 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] h-full flex flex-col"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-primary">{item.icon}</div>
                        <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
                      <div className="flex items-center text-sm text-primary font-semibold mt-auto">
                          Ver más <Info className="ml-2" size={16} />
                      </div>
                    </motion.div>
                  </DialogTrigger>
                   <DialogContent className="bg-background border-border text-foreground max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold text-primary font-headline mb-4">{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="text-muted-foreground space-y-6">
                        <div className="italic mb-4 text-base">{item.details.analogy}</div>
                        <div>
                          <h4 className="font-bold text-lg text-primary mb-2">¿Qué es exactamente?</h4>
                          <p className="text-foreground/90">{item.details.whatIs}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-primary mb-2">¿Cómo te apoyamos en Nyvara?</h4>
                          <p className="text-foreground/90">{item.details.howWeHelp}</p>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                       <DialogClose asChild>
                         <Button asChild className="w-full">
                           <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                              Solicitar Asesoría <Send className="ml-2" />
                           </a>
                         </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.section>

            {/* Call to Action */}
            <motion.section
              className="text-center bg-card p-12 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-headline">¿Tienes una idea en mente?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos está listo para convertir tu visión en una solución de software funcional y de alto impacto. ¡Hablemos de tu proyecto!
              </p>
              <Button size="lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Solicitar Asesoría <Send className="ml-2" />
                </a>
              </Button>
            </motion.section>

          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DesarrolloSoftware;
