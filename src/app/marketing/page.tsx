'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Mail, Send, Info, Video, Image as ImageIcon, Monitor, Play } from 'lucide-react';
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

const MarketingPage = () => {

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  const serviceItems = [
    { 
      icon: <Video size={32} />, 
      title: 'Videos Personalizados Profesionales', 
      description: 'Producimos contenido audiovisual de alta calidad diseñado para cautivar a tu audiencia y transmitir tu mensaje de forma impactante.',
      details: {
        analogy: 'Un video es el equivalente digital de un comercial en horario estelar. Atrapa los sentidos y cuenta la historia de tu marca de una manera que el texto y las imágenes estáticas no pueden lograr.',
        whatIs: 'Creación de videos a medida, desde la conceptualización y el guion, hasta la grabación y la postproducción profesional. Esto incluye videos corporativos, promocionales y para redes sociales.',
        howWeHelp: 'Nos encargamos de todo el proceso creativo y técnico. Entregamos piezas audiovisuales optimizadas para diferentes plataformas que generan interacción, construyen confianza y aumentan tus tasas de conversión.'
      }
    },
    { 
      icon: <ImageIcon size={32} />, 
      title: 'Imágenes y Fotografía Profesional', 
      description: 'Capturamos la esencia de tu marca con fotografía e imágenes de primer nivel que elevan tu identidad visual.',
      details: {
        analogy: 'Las imágenes de tu marca son como la decoración de tu tienda. Si se ve premium, los clientes perciben tus productos como premium. Una imagen vale más que mil palabras para establecer tu autoridad.',
        whatIs: 'Servicios de fotografía comercial, de producto y diseño de imágenes gráficas para usar en tu web, campañas de publicidad y presentaciones corporativas.',
        howWeHelp: 'Producimos un banco de imágenes exclusivo y de alta resolución que refleja la calidad de tu trabajo, asegurando que cada aspecto visual de tu marca se vea impecable y altamente profesional.'
      }
    },
    { 
      icon: <Monitor size={32} />, 
      title: 'Páginas Web y Landing Pages', 
      description: 'Diseñamos y desarrollamos sitios web atractivos, rápidos y optimizados para convertir visitantes en clientes.',
      details: {
        analogy: 'Tu página web es tu vendedor estrella que trabaja 24/7 sin descanso. Debe ser acogedor, rápido para responder y muy persuasivo.',
        whatIs: 'Diseño y desarrollo de páginas web responsivas (adaptables a móviles) y landing pages orientadas a objetivos específicos como captación de leads o ventas.',
        howWeHelp: 'Creamos experiencias digitales que no solo se ven increíbles, sino que están estructuradas estratégicamente para guiar al usuario hacia la acción, utilizando las últimas tecnologías para garantizar velocidad y seguridad.'
      }
    },
    { 
      icon: <BarChart size={32} />, 
      title: 'Posicionamiento SEO y SEM', 
      description: 'Maximizamos tu visibilidad y atraemos clientes cualificados optimizando tu ranking en Google y gestionando anuncios de pago.',
      details: {
        analogy: 'Imagina que internet es una gran biblioteca. El SEO es organizar tu libro en la estantería correcta con un título claro para que lo encuentren al buscar. El SEM es pagar para poner tu libro en un expositor en la entrada principal, asegurando que todos lo vean.',
        whatIs: 'Técnicamente, el SEO (Search Engine Optimization) y SEM (Search Engine Marketing) buscan posicionar tu negocio en la cima de los motores de búsqueda. El SEO mejora tu visibilidad de manera orgánica (gratuita) a largo plazo, mientras que el SEM utiliza anuncios de pago para una visibilidad inmediata y dirigida.',
        howWeHelp: 'En Nyvara, fusionamos ambas disciplinas. Analizamos tu web y a tu competencia, encontramos las palabras clave que tus clientes usan y optimizamos tu sitio. En paralelo, diseñamos campañas de anuncios eficientes que maximizan tu retorno de inversión (ROI), atrayendo un flujo constante de tráfico de alta calidad listo para convertirse en clientes.'
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
            <motion.section 
              className="text-center mb-20"
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white font-headline">Marketing Digital que Genera Resultados</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Impulsamos tu marca con estrategias digitales diseñadas para atraer, convertir y fidelizar clientes.
              </p>
            </motion.section>

            <motion.section 
              className="grid md:grid-cols-2 gap-10 mb-20"
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
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
                              Solicitar Asesoría de Marketing <Send className="ml-2" />
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
                <h2 className="text-4xl font-bold mb-4 font-headline text-white">Nuestro Trabajo</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explora algunos de nuestros proyectos más recientes. Calidad visual y resultados comprobados.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video Placeholder */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <Play className="text-white w-12 h-12 z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold">Video Promocional</span>
                </div>
                {/* Image Placeholder 1 */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <ImageIcon className="text-muted-foreground w-12 h-12 opacity-50" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold bg-black/50 px-2 py-1 rounded">Fotografía de Producto</span>
                </div>
                {/* Image Placeholder 2 */}
                <div className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50 cursor-pointer flex items-center justify-center">
                  <Monitor className="text-muted-foreground w-12 h-12 opacity-50" />
                  <span className="absolute bottom-4 left-4 z-20 text-white font-semibold bg-black/50 px-2 py-1 rounded">Diseño Web UX/UI</span>
                </div>
              </div>
            </motion.section>

            <motion.section 
              className="text-center bg-card p-12 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-headline">¿Listo para aumentar tu visibilidad y ventas?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo diseñará una estrategia de marketing a la medida de tus objetivos. ¡Contáctanos hoy!
              </p>
              <Button size="lg" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Hablemos de tu Estrategia <Send className="ml-2" />
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

export default MarketingPage;
