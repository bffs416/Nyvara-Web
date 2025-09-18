
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import QuoteGenerator from '@/components/sections/quote-generator';

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg min-h-[500px]">
    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
    <h2 className="text-2xl font-semibold text-foreground">Cargando Herramienta...</h2>
  </div>
);

const CotizadorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Generador de Cotizaciones</h1>
                <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                    Herramienta interna para crear y gestionar cotizaciones de forma sistemática.
                </p>
            </div>
            <Suspense fallback={<LoadingFallback />}>
                <div className="max-w-7xl mx-auto">
                  <QuoteGenerator />
                </div>
            </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CotizadorPage;
