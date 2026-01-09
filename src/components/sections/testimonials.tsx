'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!.imageUrl,
    name: "Ana Gómez",
    title: "Directora de Comunicaciones, Grupo Alpha",
    quote: "Nyvara transformó completamente nuestras conferencias anuales. Su capacidad para integrar tecnología en tiempo real y diseño de vanguardia superó nuestras expectativas.",
    alt: "Retrato de Ana Gómez, Directora de Comunicaciones",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-8')!.imageUrl,
    name: "Miguel Hernández",
    title: "Dueño, Restaurante Gourmet",
    quote: "La aplicación móvil que desarrollaron para nosotros ha mejorado enormemente la experiencia de nuestros clientes y ha incrementado los pedidos a domicilio en un 40%.",
    alt: "Retrato de Miguel Hernández, Dueño de Restaurante Gourmet",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-4')!.imageUrl,
    name: "Felipe Franco",
    title: "Director de ventas & Producto, HANSBIOMED",
    quote: "La implementación de la plataforma de gestión de Nyvara ha optimizado nuestros procesos internos, permitiéndonos enfocarnos más en la innovación y el cuidado del paciente. Un socio estratégico invaluable.",
    alt: "Retrato del Dr. Kim Min-joon, CEO de HANSBIOMED",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-[linear-gradient(135deg,#e0e7ff_0%,#f8faff_100%)] font-jakarta">
      {/* Background Depth Elements */}
      {/* These classes (depth-blob, glass-card) are assumed to be defined in your global CSS (e.g., globals.css) */}
      {/* Example CSS for depth-blob:
      .depth-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        animation: blob-move 15s infinite alternate ease-in-out;
        z-index: 0;
      }
      @keyframes blob-move {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 40px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
      }
      */}
      <div className="depth-blob w-[500px] h-[500px] bg-[#4f46e5]/5 top-[-100px] left-[-100px]" />
      <div className="depth-blob w-[400px] h-[400px] bg-[#fbbf24]/5 bottom-[-50px] right-[-100px] [animation-delay:-5s]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-[#1e293b]">
            Historias de Éxito de <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]">Nuestros Clientes</span>
          </h2>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto leading-relaxed">
            La confianza de nuestros clientes es el motor que impulsa nuestra búsqueda constante por la excelencia.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card rounded-[40px] p-10 md:p-16 text-center shadow-2xl"
            >
              {/* Example CSS for glass-card:
              .glass-card {
                background: rgba(255, 255, 255, 0.6);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
              }
              */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#facc15] to-[#4f46e5] rounded-full blur-md opacity-30 animate-pulse" />
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover relative z-10 border-2 border-white/50"
                  />
                </div>

                <div className="mb-8">
                  <Quote className="w-12 h-12 text-[#facc15] opacity-40 mx-auto mb-4" />
                  <p className="text-xl md:text-3xl font-bold text-[#1e293b] italic leading-tight">
                    "{testimonials[activeIndex].quote}"
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-black text-[#1e293b] mb-1">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-[#4f46e5] font-black uppercase tracking-widest text-xs">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 transition-all duration-500 rounded-full ${activeIndex === index ? "w-10 bg-[#4f46e5]" : "w-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
