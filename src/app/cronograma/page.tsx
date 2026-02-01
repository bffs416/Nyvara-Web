'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { clients } from '@/lib/cronogramas';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Lock, ArrowRight } from 'lucide-react';

const CronogramaAccessPage = () => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const client = clients.find(c => c.nit === accessCode);

    if (client) {
      localStorage.setItem(`cronograma_access_${client.nit}`, 'true');
      
      toast({
        title: 'Acceso Concedido',
        description: `Bienvenido/a, ${client.clientName}. Redirigiendo a tu cronograma...`,
      });
      router.push(`/cronograma/${client.nit}`);
    } else {
      setError('NIT de cliente inválido. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'El NIT introducido no es correcto.',
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
              Portal de Clientes
            </h1>
            <p className="text-muted-foreground mb-8">
              Introduce el NIT de tu empresa para acceder al cronograma de proyectos en tiempo real.
            </p>
            <form onSubmit={handleAccess} className="space-y-6">
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Tu NIT sin puntos ni guiones"
                className="text-center text-lg h-12"
                aria-label="NIT de la empresa"
              />
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verificando...' : 'Acceder al Cronograma'}
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

export default CronogramaAccessPage;
