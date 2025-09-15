'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SurveyForm from '@/components/sections/survey-form';

const DiagnosticoPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };

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
             <motion.section
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Diagnóstico Estratégico</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                Completa este formulario para descubrir el potencial oculto de tu marca.
              </p>
            </motion.section>
            <SurveyForm />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoPage;
