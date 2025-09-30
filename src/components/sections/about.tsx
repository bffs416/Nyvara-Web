'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Brain, Trophy, Telescope } from 'lucide-react';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: <Handshake size={32} />,
    title: "Somos Socios, no Proveedores",
    description: "Nos integramos como una extensión de tu equipo. Tu éxito es nuestro éxito, y cada proyecto lo abordamos con una mentalidad de partnership."
  },
  {
    icon: <Brain size={32} />,
    title: "Estrategia Antes de la Ejecución",
    description: "No empezamos a construir sin un plano detallado. Cada acción está guiada por una estrategia clara y objetivos medibles para maximizar el retorno."
  },
  {
    icon: <Trophy size={32} />,
    title: "Enfocados en Resultados, no solo en Entregables",
    description: "Nuestra meta no es solo entregar un proyecto, sino generar un impacto real y tangible en tu negocio. Nos obsesionan tus resultados y métricas de éxito."
  },
  {
    icon: <Telescope size={32} />,
    title: "Innovación Constante como Estándar",
    description: "El mercado evoluciona a una velocidad increíble, y nosotros también. Te ofrecemos soluciones que no solo funcionan hoy, sino que te preparan para el mañana."
  }
];

const About = () => {
  return (
    <section id="nosotros" className="py-20 relative bg-background text-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              La fragmentación es el mayor enemigo del crecimiento.
            </h2>
            <div className="text-muted-foreground space-y-6 leading-relaxed">
                <p>En el mercado actual, las empresas se ven forzadas a contratar múltiples agencias y proveedores que no se comunican entre sí. El marketing, la tecnología y los eventos terminan trabajando en silos, sin una visión estratégica unificada, diluyendo el impacto y el presupuesto.</p>
                <p className="text-foreground font-semibold">Nosotros rompemos ese paradigma.</p>
                <p>Nyvara nació para ser la solución integral que tu negocio necesita. Unificamos la creatividad del marketing de vanguardia, el poder de la tecnología a la medida y la emoción de los eventos de alto impacto bajo un mismo techo y una sola estrategia.</p>
                <p>Somos tu socio estratégico, tu cerebro centralizado, diseñado para eliminar la fricción, alinear objetivos y liberar el verdadero potencial de tu marca.</p>
                <p className="text-primary font-bold">Una visión. Un equipo. Un crecimiento sin límites.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card p-6 text-center h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] hover:scale-105">
                    <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
