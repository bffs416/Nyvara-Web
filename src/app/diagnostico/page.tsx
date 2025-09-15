import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import DiagnosticoClient from './client';
import { Loader2 } from 'lucide-react';

const DiagnosticoPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

  const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg min-h-[500px]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-semibold text-foreground">Cargando Diagnóstico...</h2>
      <p className="text-muted-foreground mt-2">Preparando todo para ti.</p>
    </div>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-background text-foreground pt-32 pb-20"
        >
          <div className="container mx-auto px-6">
            <Suspense fallback={<LoadingFallback />}>
              <DiagnosticoClient />
            </Suspense>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoPage;
