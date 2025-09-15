'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from "lucide-react";
import NyvaraLogo from "../icons/nyvara-logo";

const CallToAction = () => {
  return (
    <motion.p
      className='text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Convirtamos tus ideas en realidad.
    </motion.p>
  );
};

export default function Hero() {

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12">
      {/* Background animations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 flex justify-center">
            <NyvaraLogo className="max-w-[250px] md:max-w-[280px] rounded-xl" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-primary font-semibold mb-4 font-headline"
          >
            Más que proveedores, tus socios estratégicos.
          </motion.p>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Llevamos tu Negocio
            <span className="text-primary block">al Siguiente Nivel</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Integramos <span className="text-foreground font-semibold">Marketing de vanguardia</span>, 
            <span className="text-foreground font-semibold"> Eventos de alto impacto</span> y 
            <span className="text-foreground font-semibold"> Tecnología a la medida</span> para convertir tus objetivos en realidad.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleGetStarted} size="lg" className="font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
              Comenzar Proyecto
              <ArrowRight size={20} />
            </Button>
            <Button onClick={scrollToServices} variant="outline" size="lg" className="font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
              <Sparkles size={20} />
              Nuestros Servicios
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/50 border border-border/30 rounded-lg p-6 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
              <div className="text-3xl font-bold text-primary font-headline">100+</div>
              <div className="text-muted-foreground">Proyectos Exitosos</div>
            </div>
            <div className="bg-card/50 border border-border/30 rounded-lg p-6 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
              <div className="text-3xl font-bold text-primary font-headline">5+</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="bg-card/50 border border-border/30 rounded-lg p-6 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
              <div className="text-3xl font-bold text-primary font-headline">98%</div>
              <div className="text-muted-foreground">Clientes Satisfechos</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
