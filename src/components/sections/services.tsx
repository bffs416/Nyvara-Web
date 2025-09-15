'use client';

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
      link: "#services"
    },
    {
      icon: <Calendar size={36} className="text-primary-foreground" />,
      title: "Eventos que Impactan",
      description: "Transformamos cada evento en una poderosa herramienta de negocio. Diseñamos experiencias memorables que fortalecen tu marca y crean conexiones de valor.",
      features: ["Stands y Ferias", "Congresos y Conferencias", "Lanzamientos de Producto", "Team Building Estratégico"],
      link: "/eventos"
    },
    {
      icon: <Code size={36} className="text-primary-foreground" />,
      title: "Tecnología que Impulsa",
      description: "Creamos el motor tecnológico que tu negocio necesita para escalar, desde aplicaciones web hasta soluciones de software a la medida.",
      features: ["Software a Medida", "Soluciones Web", "Diseño de Bases de Datos", "Aplicaciones Móviles"],
      link: "#services"
    }
  ];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
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
                    
                    <Button asChild className="w-full mt-auto" variant="outline">
                        <Link href={service.link}>
                            Saber Más
                            <ArrowRight size={16} />
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
