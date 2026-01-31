'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Brain, Trophy, Telescope } from 'lucide-react';
import { Card } from '@/components/ui/card';

const values = [
  {
    icon: <Handshake size={32} />,
    title: "Somos Socios, no Proveedores",
    description: "Nos integramos en tu equipo. Tu éxito es el nuestro. Abordamos cada proyecto como socios estratégicos."
  },
  {
    icon: <Brain size={32} />,
    title: "Estrategia Antes de la Ejecución",
    description: "Nunca construimos sin un plano. Cada acción sigue una estrategia clara con objetivos medibles para maximizar tu retorno."
  },
  {
    icon: <Trophy size={32} />,
    title: "Enfocados en Resultados",
    description: "Nuestra meta es generar un impacto real en tu negocio. Nos enfocamos en resultados y métricas de éxito, no solo en entregables."
  },
  {
    icon: <Telescope size={32} />,
    title: "Innovación Constante",
    description: "El mercado evoluciona y nosotros también. Te ofrecemos soluciones que funcionan hoy y te preparan para el mañana."
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
                <p>Las empresas a menudo contratan agencias que no se comunican entre sí. Marketing, tecnología y eventos operan en silos, diluyendo el impacto y el presupuesto.</p>
                <p className="text-foreground font-semibold">Nosotros rompemos ese paradigma.</p>
                <p>Nyvara es la solución integral que tu negocio necesita. Unificamos marketing, tecnología y eventos bajo una sola estrategia.</p>
                <p>Somos tu socio estratégico centralizado, diseñado para alinear objetivos y liberar el potencial de tu marca.</p>
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
