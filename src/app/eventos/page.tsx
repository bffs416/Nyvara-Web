'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Presentation, Rocket, Users, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const EventosCorporativos = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const serviceItems = [
    {
      icon: <Palette size={32} />,
      title: 'Diseño y Fabricación de Stands',
      description: 'Creación, producción y montaje de stands personalizados que atraen la atención y comunican la esencia de la marca.',
      details: {
        analogy: 'Imagina que tu stand es la embajada de tu marca en una feria. Nosotros la diseñamos y construimos para que sea el edificio más impresionante y visitado, un espacio donde cada detalle cuenta tu historia y atrae a tus futuros clientes.',
        whatIs: 'Es la conceptualización y materialización de un espacio que representa la identidad de tu marca en ferias y exposiciones. Abarcamos el proceso 360°: desde el diseño creativo y la renderización 3D hasta la producción, el montaje y el desmontaje.',
        howWeHelp: 'Fusionamos creatividad y estrategia. Nuestro equipo conceptualiza un espacio que no solo es visualmente atractivo, sino que está optimizado para el flujo de visitantes y la generación de leads. Nos encargamos de la producción y el montaje, asegurando que tu inversión se traduzca en un retorno tangible de visibilidad y negocio.'
      }
    },
    {
      icon: <Presentation size={32} />,
      title: 'Congresos y Conferencias',
      description: 'Gestión integral de eventos a gran escala, incluyendo tecnología, registro de asistentes y coordinación de ponentes.',
      details: {
        analogy: 'Organizar un congreso es como dirigir una sinfonía. Nosotros somos el director de orquesta, asegurando que cada músico (ponente, proveedor, tecnología) toque su parte a la perfección para crear una melodía memorable.',
        whatIs: 'Es la orquestación completa de eventos a gran escala. Nos hacemos cargo de cada detalle: la planificación estratégica, la selección y gestión de la plataforma tecnológica (presencial, virtual o híbrida), la logística de ponentes y el sistema de registro de asistentes.',
        howWeHelp: 'Absorbemos toda la carga operativa para que tu equipo se concentre en lo más importante: el contenido y los asistentes. Gestionamos presupuestos, negociamos con proveedores y garantizamos una ejecución técnica impecable. El resultado es un evento fluido y profesional que posiciona a tu organización como un líder en su sector.'
      }
    },
    {
      icon: <Rocket size={32} />,
      title: 'Lanzamientos de Productos y Activaciones de Marca',
      description: 'Creamos eventos estratégicos y campañas de marketing digital para maximizar el impacto y la visibilidad de tu marca.',
      details: {
        analogy: 'Un lanzamiento es como el despegue de un cohete. Nosotros construimos la plataforma de lanzamiento (el evento) y encendemos los motores (la campaña digital) para asegurar que tu producto capte la atención del mundo entero.',
        whatIs: 'Es el diseño de un momento culminante para tu marca. Se trata de crear una experiencia estratégica, sea un evento físico o una campaña multicanal, diseñada para introducir un nuevo producto o revitalizar la percepción de la marca, generando un impacto medible en la audiencia.',
        howWeHelp: 'Creamos un concepto de evento que genera intriga y expectación. Lo integramos con una campaña de marketing digital 360° que calienta el ambiente antes del evento, maximiza el alcance durante el lanzamiento y mantiene la conversación viva después. No solo creamos un evento, creamos una noticia.'
      }
    },
    {
      icon: <Users size={32} />,
      title: 'Team-Building y Eventos de Integración',
      description: 'Diseñamos actividades y experiencias que fortalecen la cohesión del equipo y mejoran la comunicación interna.',
      details: {
        analogy: 'Un equipo es como un grupo de escaladores. Nosotros diseñamos la expedición (la actividad) y les damos las herramientas para que aprendan a confiar el uno en el otro, se comuniquen mejor y lleguen juntos a la cima.',
        whatIs: 'Es el diseño de experiencias corporativas con un propósito definido: fortalecer la cultura de la empresa. No son solo actividades recreativas, sino jornadas estratégicamente diseñadas para mejorar la comunicación, fomentar la colaboración y potenciar el liderazgo.',
        howWeHelp: 'Vamos más allá de la simple diversión. Diagnosticamos las necesidades de tu equipo y diseñamos una jornada a medida. Facilitamos cada dinámica para asegurar que los aprendizajes se anclen y se trasladen al día a día, resultando en equipos más cohesionados, motivados y productivos.'
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
        <Dialog onOpenChange={() => setSelectedService(null)}>
          <div className="container mx-auto px-6">
            {/* Header Section */}
            <motion.section
              className="text-center mb-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Eventos Corporativos</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Creamos experiencias memorables que conectan marcas con personas.
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
                <DialogTrigger asChild key={index} onClick={() => setSelectedService(item)}>
                  <motion.div
                    className="bg-card p-8 rounded-xl cursor-pointer border border-border/50 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-primary">{item.icon}</div>
                      <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center text-sm text-primary font-semibold">
                        Ver más <Info className="ml-2" size={16} />
                    </div>
                  </motion.div>
                </DialogTrigger>
              ))}
            </motion.section>

            {/* Call to Action */}
            <motion.section
              className="text-center bg-card p-12 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 font-headline">¿Planeando un evento?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Déjanos encargarnos de los detalles para que tú puedas enfocarte en tus invitados. ¡Contáctanos y hagamos que tu próximo evento sea un éxito rotundo!
              </p>
              <Button size="lg" asChild>
                  <Link href="/#contact">
                    Solicitar Asesoría <ArrowRight className="ml-2" />
                  </Link>
              </Button>
            </motion.section>

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
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default EventosCorporativos;
