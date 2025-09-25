
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { galleries } from '@/lib/galleries';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Lock, ArrowRight } from 'lucide-react';

const GalleryAccessPage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const gallery = galleries.find(g => g.accessCode === accessCode);

    if (gallery) {
      // Save access permission to localStorage
      localStorage.setItem(`gallery_access_${gallery.id}`, 'true');
      
      toast({
        title: 'Acceso Concedido',
        description: `Bienvenido/a, ${gallery.name}. Redirigiendo a tu galería...`,
      });
      router.push(`/gallery/${gallery.id}`);
    } else {
      setError('Código de acceso inválido. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'El código introducido no es correcto.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6 text-center max-w-lg"
        >
          <div className="bg-card p-8 md:p-12 rounded-xl border border-border/50 shadow-2xl">
            <Lock className="mx-auto h-12 w-12 text-primary mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-headline text-primary">
              Acceso a Galería Privada
            </h1>
            <p className="text-muted-foreground mb-8">
              Introduce el código de acceso que te hemos proporcionado para ver tu portafolio fotográfico.
            </p>
            <form onSubmit={handleAccess} className="space-y-6">
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Tu código de acceso"
                className="text-center text-lg h-12"
                aria-label="Código de acceso"
              />
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verificando...' : 'Acceder a la Galería'}
                {!isLoading && <ArrowRight className="ml-2" />}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryAccessPage;
