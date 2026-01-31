
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { galleries } from '@/lib/galleries';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GalleryPage = () => {
  const router = useRouter();
  const params = useParams();
  const galleryId = params.galleryId as string;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const gallery = galleries.find(g => g.id === galleryId);

  useEffect(() => {
    if (galleryId) {
      const hasAccess = localStorage.getItem(`gallery_access_${galleryId}`) === 'true';
      if (hasAccess) {
        setIsAuthorized(true);
      } else {
        // If no access, redirect to the access page after a short delay
        setTimeout(() => {
          router.push('/gallery');
        }, 2000);
      }
      setIsLoading(false);
    }
  }, [galleryId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verificando acceso...</p>
      </div>
    );
  }

  if (!isAuthorized || !gallery) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center p-6">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive">Acceso Denegado</h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          No tienes permiso para ver esta galería o no existe. Serás redirigido a la página de acceso.
        </p>
         <Button variant="link" onClick={() => router.push('/gallery')} className="mt-4">
            Ir a la página de acceso
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 md:py-24">
        <div className="container mx-auto px-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <ImageIcon className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 font-headline">Portafolio Fotográfico</h1>
            <p className="text-2xl md:text-3xl text-primary font-semibold">
              {gallery.name}
            </p>
             <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {gallery.description}
            </p>
          </motion.section>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, staggerChildren: 0.1 }}
          >
            {gallery.images.map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
                variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                }}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true, amount: 0.5 }}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Imagen ${index + 1} de ${gallery.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {img.alt || `Imagen ${index + 1}`}
                    </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
