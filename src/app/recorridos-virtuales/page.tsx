'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Monitor, Info, Send, Play, Image as ImageIcon, Glasses } from 'lucide-react';
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

const RecorridosVirtualesPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  const serviceItems = [
    {
      icon: <Video size={32} />,
      title: 'Fotografía y Video con Dron',
      description: 'Capturamos ángulos espectaculares e inmersivos desde el aire para destacar la magnitud de tus proyectos.',
      details: {
        analogy: 'Muestra tu proyecto como un halcón. Una vista panorámica que le da a tus clientes la verdadera dimensión y escala del lugar, algo imposible a nivel del suelo.',
        whatIs: 'Grabación de video en alta resolución (4K) y fotografía aérea usando drones profesionales. Ideal para bienes raíces, construcciones, turismo y eventos al aire libre.',
        howWeHelp: 'Proveemos pilotos experimentados que capturan las tomas más dinámicas. Editamos el material para resaltar los mejores ángulos, dándole un aspecto cinematográfico a tu marca.'
      }
    },
    {
      icon: <Camera size={32} />,
      title: 'Fotografía y Cámaras 360°',
      description: 'Permitimos que tus clientes exploren espacios detalladamente, mirando en todas direcciones como si estuvieran allí.',
      details: {
        analogy: 'Es como teletransportar a tus clientes al interior de tu espacio físico. Pueden mirar arriba, abajo y alrededor, tomando el control de lo que quieren ver.',
        whatIs: 'Captura de imágenes esféricas interactivas utilizando tecnología de cámaras 360 grados. El usuario interactúa deslizando su pantalla para ver todos los ángulos del entorno.',
        howWeHelp: 'Capturamos espacios físicos y los convertimos en experiencias inmersivas de alta calidad. Perfecto para inmobiliarias, hoteles, restaurantes, showrooms y museos.'
      }
    },
    {
      icon: <Glasses size={32} />,
      title: 'Recorridos Virtuales Interactivos',
      description: 'Creamos visitas virtuales fluidas conectando imágenes 360° para una navegación realista paso a paso.',
      details: {
        analogy: 'Es el equivalente digital de dar un tour guiado a puertas abiertas, disponible 24 horas al día, 7 días a la semana, a clientes en cualquier parte del mundo.',
        whatIs: 'Desarrollo de un recorrido virtual navegable tipo "Google Street View" pero de tu propiedad o negocio, a menudo enriquecido con puntos de información, videos y enlaces.',
        howWeHelp: 'Integramos las fotos 360° en una plataforma interactiva fluida. Agregamos etiquetas descriptivas y puntos de venta dentro del recorrido, transformando la visita virtual en una potente herramienta comercial.'
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
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white font-headline">Recorridos Virtuales y Medios Aéreos</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Teletransporta a tus clientes a tus espacios con experiencias inmersivas en 360° y tomas cinematográficas con dron.
              </p>
            </motion.section>

            {/* Services Grid */}
            <motion.section
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
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
                          Ver más detalles <Info className="ml-2" size={16} />
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
                              Solicitar Cotización <Send className="ml-2" />
                           </a>
                         </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.section>

            {/* Portfolio Section */}
            <motion.section
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 font-headline text-white">Nuestra Galería de Trabajos</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Da un vistazo a nuestros levantamientos con dron y la calidad inmersiva de nuestras producciones en 360°.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video Placeholder */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <Play className="text-white w-12 h-12 z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold">Toma Aérea con Dron</span>
                </div>
                {/* Image Placeholder 1 */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <ImageIcon className="text-muted-foreground w-12 h-12 opacity-50" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold bg-black/50 px-2 py-1 rounded">Foto Esférica 360°</span>
                </div>
                {/* Image Placeholder 2 */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <Glasses className="text-muted-foreground w-12 h-12 opacity-50" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold bg-black/50 px-2 py-1 rounded">Tour Virtual de Interiores</span>
                </div>
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              className="text-center bg-card p-12 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-headline">¿Listo para destacar tu espacio?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ofrece a tus clientes una experiencia inmersiva única que generará confianza y más ventas.
              </p>
              <Button size="lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Agendar una Toma <Send className="ml-2" />
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

export default RecorridosVirtualesPage;
