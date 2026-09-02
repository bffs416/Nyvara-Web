
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "../ui/animated-counter";
import { siteConfig } from "@/lib/config";

export default function Hero() {

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const title1 = "Hacemos que tus ideas no solo brillen,";
  const title2 = "sino que se desarrollen.";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12">
      {/* Background Video */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover bg-black"
        >
          <source src="/Hero%20Riendo.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <div className="mx-auto">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.0, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-4 flex justify-center floating-animation"
          >
            <div className="relative w-[70%] h-auto aspect-[4/1]">
              <Image
                src={siteConfig.logos.hero}
                alt="Nyvara Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/90 font-semibold mb-4 font-headline"
          >
            Más que proveedores, tus socios en crecimiento estratégico.
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.02 } }
            }}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white"
          >
            {title1.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
            {" "}
            <span className="text-white/80">
              {title2.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Fusionamos estrategia, creatividad y tecnología para revelar el verdadero potencial de tu negocio y comunicarlo de forma impactante.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="font-bold px-8 py-4 text-lg bg-white text-black hover:bg-white/90">
              <Link href="/diagnostico">
                Inicia tu Diagnóstico Estratégico
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button onClick={scrollToServices} variant="outline" size="lg" className="font-semibold px-8 py-4 text-lg border-black/50 text-black hover:bg-blue-900 hover:text-white hover:border-blue-900">
              <Sparkles size={20} />
              Explora Nuestros Servicios
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-black/90 border border-white/10 rounded-3xl p-6 hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white font-headline">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <div className="text-white/70">Proyectos Exitosos</div>
            </div>
            <div className="bg-black/90 border border-white/10 rounded-3xl p-6 hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white font-headline">
                 <AnimatedCounter value={5} suffix="+" />
              </div>
              <div className="text-white/70">Años de Experiencia</div>
            </div>
            <div className="bg-black/90 border border-white/10 rounded-3xl p-6 hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white font-headline">
                 <AnimatedCounter value={98} suffix="%" />
              </div>
              <div className="text-white/70">Clientes Satisfechos</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
