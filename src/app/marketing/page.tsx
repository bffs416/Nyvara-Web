'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, Mail, CheckCircle, ArrowRight, Info } from 'lucide-react';
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

const MarketingPage = () => {

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const serviceItems = [
    { 
      icon: <BarChart size={32} />, 
      title: 'SEO y SEM', 
      description: 'Optimizamos tu ranking en motores de búsqueda y gestionamos campañas de pago para maximizar tu visibilidad.',
      details: {
        analogy: 'Imagina que internet es una gran biblioteca. El SEO es organizar tu libro en la estantería correcta con un título claro para que lo encuentren al buscar. El SEM es pagar para poner tu libro en un expositor en la entrada principal, asegurando que todos lo vean.',
        whatIs: 'Técnicamente, el SEO (Search Engine Optimization) y SEM (Search Engine Marketing) buscan posicionar tu negocio en la cima de los motores de búsqueda. El SEO mejora tu visibilidad de manera orgánica (gratuita) a largo plazo, mientras que el SEM utiliza anuncios de pago para una visibilidad inmediata y dirigida.',
        howWeHelp: 'En Nyvara, fusionamos ambas disciplinas. Analizamos tu web y a tu competencia, encontramos las palabras clave que tus clientes usan y optimizamos tu sitio. En paralelo, diseñamos campañas de anuncios eficientes que maximizan tu retorno de inversión (ROI), atrayendo un flujo constante de tráfico de alta calidad listo para convertirse en clientes.'
      }
    },
    { 
      icon: <Users size={32} />, 
      title: 'Gestión de Redes Sociales', 
      description: 'Creamos y gestionamos contenido atractivo que construye y fideliza a tu comunidad online.',
      details: {
        analogy: 'Piensa en tus redes sociales como el club social exclusivo de tu marca. Nosotros somos los anfitriones: ponemos buena música (contenido), iniciamos conversaciones interesantes y hacemos que cada miembro se sienta parte de algo especial, convirtiendo tu marca en el alma de la fiesta.',
        whatIs: 'Se trata del arte de construir y nutrir una comunidad activa en plataformas como Instagram, Facebook o LinkedIn. Va más allá de publicar: es definir la voz de tu marca, interactuar con la audiencia, gestionar tu reputación y convertir seguidores en embajadores.',
        howWeHelp: 'Nos sumergimos en el ADN de tu marca para crear una estrategia de contenido auténtica. Desarrollamos calendarios editoriales, diseñamos piezas visuales impactantes y gestionamos la conversación diaria. Analizamos las métricas no solo para ver "likes", sino para entender el comportamiento del usuario y optimizar la estrategia hacia tus verdaderos objetivos: reconocimiento, leads o ventas.'
      }
    },
    { 
      icon: <Mail size={32} />, 
      title: 'Email Marketing', 
      description: 'Diseñamos campañas de email personalizadas que nutren a tus leads y convierten clientes.',
      details: {
        analogy: 'Es como tener una conversación privada y relevante con tus contactos más interesados. En lugar de gritar tu mensaje en una plaza pública, les susurras al oído noticias, historias y ofertas que sabes que les encantarán, fortaleciendo la confianza y la lealtad.',
        whatIs: 'Es una de las herramientas más directas y rentables para comunicarte con tu base de clientes. A través de correos estratégicos, puedes nutrir a los prospectos (leads), informar sobre novedades, recuperar carritos abandonados y fidelizar a quienes ya te compraron.',
        howWeHelp: 'Vamos más allá del simple envío. Diseñamos secuencias de automatización (workflows) que funcionan como un vendedor personal 24/7. Segmentamos tu audiencia para enviar mensajes ultra-relevantes, con textos persuasivos (copywriting) y diseños que invitan a la acción, optimizando cada correo para garantizar altas tasas de apertura y conversión.'
      }
    },
    { 
      icon: <CheckCircle size={32} />, 
      title: 'Marketing de Contenidos', 
      description: 'Producimos artículos, videos e infografías que posicionan tu marca como líder en la industria.',
      details: {
        analogy: 'En lugar de poner un anuncio que grita "¡Compra mis herramientas!", abres un taller gratuito donde enseñas a la gente a solucionar sus problemas. Les aportas valor real, demuestras tu maestría y, cuando necesiten a un experto de confianza, serás el primero en su mente.',
        whatIs: 'Es una estrategia enfocada en atraer y retener a una audiencia específica mediante la creación de contenido valioso y relevante. En lugar de interrumpir, atraes. Respondes a las preguntas de tus clientes potenciales antes de que las hagan, construyendo confianza y autoridad.',
        howWeHelp: 'Nos convertimos en los arquitectos de la narrativa de tu marca. Investigamos los dolores y las pasiones de tu audiencia y los convertimos en artículos de blog, guías, videos o podcasts que les encantará consumir. No solo creamos el contenido, sino que diseñamos una estrategia de distribución inteligente para que posicione tu marca como la referencia indiscutible en tu sector.'
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
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Marketing Digital</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Impulsamos tu marca al siguiente nivel con estrategias digitales medibles y efectivas.
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
                        <div>
                          <div className="italic mb-4 text-base">{item.details.analogy}</div>
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
                            <Link href="/#contact">
                              Solicitar más información
                            </Link>
                          </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.section>

            <motion.section 
              className="text-center bg-card p-12 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-headline">¿Listo para crecer?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos está preparado para diseñar una estrategia a la medida de tus objetivos. ¡Contáctanos hoy!
              </p>
              <Button size="lg" asChild>
                <Link href="/#contact">
                  Solicitar Asesoría <ArrowRight className="ml-2" />
                </Link>
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
