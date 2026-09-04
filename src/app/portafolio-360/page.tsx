'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Estructura de datos temporal para el portafolio
const tours = [
  {
    id: "1",
    title: "Recorrido Virtual Lourdes",
    category: "Espacios Arquitectónicos",
    description: "Exploración interactiva en 360° diseñada para mostrar cada detalle del espacio con total inmersión.",
    iframeUrl: "http://192.168.2.16:8100/lourdes/index.html",
    thumbnail: "/lourdes-thumbnail.png"
  },
  {
    id: "2",
    title: "Apartamento Calle 80",
    category: "Arquitectura Residencial",
    description: "Recorrido virtual inmersivo para la comercialización de este exclusivo proyecto inmobiliario.",
    iframeUrl: "http://192.168.2.16:8100/Apt_80/index.html",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
  }
];

export default function Portafolio360Page() {
  const [activeTour, setActiveTour] = useState<string | null>(null);

  const selectedTour = tours.find(t => t.id === activeTour);

  return (
    <div className="flex flex-col min-h-screen relative bg-black overflow-hidden">
      <div className="glow-sphere" />
      <div className="glow-sphere-2" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Header />
      
      <main className="flex-1 relative z-10 py-24">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
               <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
            </Link>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Portafolio <span className="text-yellow-400">Inmersivo</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl">Experimenta nuestros Gemelos Digitales. Infraestructura hiperrealista interactiva que acorta ciclos de venta B2B.</p>
          </div>

          {/* Grid de Proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <motion.div
                key={tour.id}
                whileHover={{ y: -10 }}
                className={`group relative ${tour.iframeUrl ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                onClick={() => tour.iframeUrl && setActiveTour(tour.id)}
              >
                <div className="relative h-72 w-full overflow-hidden border-2 border-white/10 rounded-2xl">
                  <Image 
                    src={tour.thumbnail}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 block">{tour.category}</span>
                    <h3 className="text-2xl font-bold text-white font-headline leading-tight">{tour.title}</h3>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white text-black font-bold uppercase tracking-widest px-6 py-3 rounded-full flex items-center shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="mr-2 h-5 w-5" /> Entrar al Recorrido
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL FULLSCREEN PARA EL RECORRIDO VIRTUAL */}
      {activeTour && selectedTour && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
            {/* Top Bar del Modal */}
            <div className="h-16 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 absolute top-0 w-full">
                <div className="text-white font-headline font-bold text-lg">{selectedTour.title}</div>
                <button 
                    onClick={() => setActiveTour(null)}
                    className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors flex items-center"
                >
                    <span className="mr-2 text-sm font-bold uppercase tracking-widest hidden sm:block">Cerrar Experiencia</span>
                    <X size={24} />
                </button>
            </div>

            {/* Iframe del Recorrido */}
            <div className="flex-1 w-full h-full relative pt-16">
                <iframe 
                    src={selectedTour.iframeUrl} 
                    className="w-full h-full border-none"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
