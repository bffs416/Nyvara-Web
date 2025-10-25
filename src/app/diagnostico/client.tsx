
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SurveyForm from '@/components/sections/survey-form';
import GeneralSurveyForm from '@/components/sections/general-survey-form';
import { handleSurveySubmission, summarizeSurveyDataForDownload, handleGeneralSurveySubmission, summarizeGeneralSurveyDataForDownload } from '@/app/client-actions';
import type { SurveyFormData, GeneralSurveyFormData } from '@/lib/types';
import { Loader2, ServerCrash, Download, Send, CheckCircle, HeartPulse, Building, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const SuccessMessage = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-card border border-border/50 p-8 rounded-lg shadow-2xl text-center space-y-6"
    >
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h2 className="text-3xl font-bold font-headline text-primary">¡Diagnóstico Enviado! Gracias por tu tiempo.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
            Has dado un paso fundamental. He recibido tus respuestas y, gracias a los minutos que has invertido, ahora puedo dedicar todo mi esfuerzo y conocimiento en analizar tu visión para construir juntos el camino hacia tu objetivo.
            <br/><br/>
            <strong className="text-foreground">Revisaré personalmente cada detalle y me pondré en contacto contigo muy pronto.</strong>
        </p>
        <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
                <Link href="/">
                    Volver al Inicio
                </Link>
            </Button>
        </div>
    </motion.div>
);

const GeneralSuccessMessage = () => {
    const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent("Hola, he completado el Análisis de Necesidades (ADN) y me gustaría recibir mi diagnóstico inicial personalizado.")}`;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-card border border-border/50 p-8 rounded-lg shadow-2xl text-center space-y-6"
        >
            <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline text-primary">Gracias por la inversión de tu tiempo y honestidad.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                La información compartida es ahora la materia prima para nuestro análisis. El siguiente paso es contactarnos directamente para recibir tu diagnóstico inicial personalizado y discutir tus oportunidades de crecimiento.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                 <Button asChild size="lg">
                   <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Contactar por WhatsApp <Send className="ml-2" />
                   </a>
                 </Button>
            </div>
        </motion.div>
    );
};


const SectorSelection = ({ onSelect }: { onSelect: (sector: 'health' | 'general') => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="bg-card p-8 rounded-lg shadow-xl text-center"
  >
    <h2 className="text-2xl font-bold font-headline text-primary mb-4">Paso 1: Elige tu sector</h2>
    <p className="text-muted-foreground mb-8">Para ofrecerte el diagnóstico más preciso, por favor, selecciona el área que mejor describe tu negocio.</p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <motion.div whileHover={{ y: -5 }} className="w-full">
        <Button onClick={() => onSelect('health')} size="lg" className="w-full h-auto py-6 flex flex-col items-center justify-center hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]" variant="outline">
          <HeartPulse className="mb-2 h-8 w-8" />
          <span className="font-bold text-lg">Sector Salud</span>
          <span className="font-normal text-sm text-muted-foreground">(Medicina Estética)</span>
        </Button>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="w-full">
        <Button onClick={() => onSelect('general')} size="lg" className="w-full h-auto py-6 flex flex-col items-center justify-center hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]" variant="outline">
          <Building className="mb-2 h-8 w-8" />
          <span className="font-bold text-lg">Otro Sector</span>
          <span className="font-normal text-sm text-muted-foreground">(Empresas y Profesionales)</span>
        </Button>
      </motion.div>
    </div>
  </motion.div>
);

const WelcomeDialog = ({ open, onContinue, sector }: { open: boolean; onContinue: () => void; sector: 'health' | 'general' | null }) => {
    const isHealth = sector === 'health';
    const title = isHealth ? "Un Momento de Reflexión Antes de Empezar" : "Análisis de Necesidades Estratégicas (ADN)";
    const description = isHealth ? (
        <>
            Estás a punto de dar un paso vital. Las respuestas que proporciones aquí son la base para construir una estrategia que realmente impulse tu negocio.
            <br/><br/>
            <strong className="text-foreground">Te invitamos a tomarte 5-10 minutos, sin distracciones.</strong> Responde de manera profunda y honesta. Conectar con tu lado profesional y personal es clave para alinear tu marca con tus gustos, tu identidad y tus verdaderos objetivos.
            <br/><br/>
            Esta es tu oportunidad para ayudarnos a ayudarte al máximo.
        </>
    ) : (
        <>
            Este Análisis de Necesidades (ADN) de 5-10 minutos no es una simple encuesta; es el primer paso hacia la redefinición de su estrategia de crecimiento.
            <br/><br/>
            <strong className="text-foreground">Sea honesto, pues su reflexión es la base de nuestro diagnóstico.</strong>
        </>
    );


    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center mb-4">
                        <Lightbulb className="h-12 w-12 text-primary" />
                    </div>
                    <AlertDialogTitle className="text-center text-2xl font-headline text-primary">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base text-muted-foreground pt-2">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogAction onClick={onContinue}>Entendido, ¡empecemos!</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export default function DiagnosticoClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState<'sector' | 'form' | 'summary' | 'sent' | 'general_sent'>('sector');
  const [surveyData, setSurveyData] = useState<SurveyFormData | GeneralSurveyFormData | null>(null);
  const [summaryText, setSummaryText] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<'health' | 'general' | null>(null);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sector = searchParams.get('sector');
    if ((sector === 'health' || sector === 'general')) {
      setSelectedSector(sector);
      setFormStep('form');
    } else {
      setFormStep('sector');
      setSelectedSector(null);
    }
  }, [searchParams]);

  
  const handleSectorSelect = (sector: 'health' | 'general') => {
    router.push(`/diagnostico?sector=${sector}`, { scroll: false });
    setSelectedSector(sector);
    setShowWelcomeDialog(true);
  };

  const handleStartForm = () => {
    setShowWelcomeDialog(false);
    setFormStep('form');
  };
  
  const handleFormSubmit = async (data: SurveyFormData | GeneralSurveyFormData) => {
    setIsLoading(true);
    setError(null);

    setSurveyData(data);
    
    let result;
    if (selectedSector === 'health') {
        result = await summarizeSurveyDataForDownload(data as SurveyFormData);
    } else {
        result = await summarizeGeneralSurveyDataForDownload(data as GeneralSurveyFormData);
    }

    if (result.summary) {
        setSummaryText(result.summary);
        setFormStep('summary');
    } else {
        setError(result.error || 'No se pudo generar el resumen.');
    }
    setIsLoading(false);
  };

  const handleDownloadSummary = () => {
    let fileName = 'resumen-diagnostico.txt';
    if(surveyData && 'q1_name' in surveyData && surveyData.q1_name) {
        fileName = `resumen-diagnostico-${surveyData.q1_name.replace(/ /g, '_')}.txt`;
    } else if (surveyData && 'name' in surveyData && surveyData.name) {
        fileName = `resumen-diagnostico-${surveyData.name.replace(/ /g, '_')}.txt`;
    }

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendToSupabase = async () => {
    if (!surveyData) return;
    setIsLoading(true);
    setError(null);
    
    let result;
    if (selectedSector === 'health') {
        result = await handleSurveySubmission(surveyData as SurveyFormData);
        if (result.success) {
            setFormStep('sent');
        } else {
            setError(result.error || 'No se pudieron guardar los datos.');
        }
    } else {
        result = await handleGeneralSurveySubmission(surveyData as GeneralSurveyFormData);
        if (result.success) {
            setFormStep('general_sent');
        } else {
            setError(result.error || 'No se pudieron guardar los datos.');
        }
    }

    setIsLoading(false);
  };
  
  const resetFlow = () => {
    setIsLoading(false);
    setError(null);
    setSurveyData(null);
    setSummaryText('');
    setSelectedSector(null);
    setFormStep('sector');
    router.push(`/diagnostico`, { scroll: false });
  }

  const getTitle = () => {
      if (formStep === 'sent' || formStep === 'general_sent') return "Gracias por tu confianza.";
      if (formStep === 'sector') return "Comencemos por conocer tu negocio.";
      if (selectedSector === 'general') return "Este Análisis de Necesidades (ADN) es el primer paso para redefinir su estrategia.";
      return "Completa este formulario para descubrir el potencial oculto de tu marca.";
  }

  return (
    <div className="bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-background.mp4" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-background/80"></div>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Diagnóstico Estratégico</h1>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
            {getTitle()}
          </p>
        </motion.section>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">Procesando...</h2>
            <p className="text-muted-foreground mt-2">Estamos trabajando en tu solicitud. Esto puede tardar un momento.</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
            <ServerCrash className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-2xl font-semibold text-destructive">¡Oops! Algo salió mal.</h2>
            <p className="text-destructive/80 mt-2">{error}</p>
              <Button onClick={resetFlow} className="mt-4 bg-destructive text-destructive-foreground px-4 py-2 rounded">Intentar de Nuevo</Button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {formStep === 'sector' && <SectorSelection onSelect={handleSectorSelect} />}
            
            {formStep === 'form' && selectedSector === 'health' && <SurveyForm onSubmit={handleFormSubmit as (data: SurveyFormData) => void} />}
            {formStep === 'form' && selectedSector === 'general' && <GeneralSurveyForm onSubmit={handleFormSubmit as (data: GeneralSurveyFormData) => void} />}

            {formStep === 'summary' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-card p-8 rounded-lg shadow-xl text-center"
              >
                <h2 className="text-2xl font-bold font-headline text-primary mb-4">Paso Final: Revisa y Guarda tu Resumen</h2>
                <p className="text-muted-foreground mb-6">Hemos generado un resumen de tus respuestas. Descárgalo para tus archivos y luego envíalo para que nuestro equipo lo revise.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleDownloadSummary} size="lg" className="hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]">
                    <Download className="mr-2" />
                    Descargar Resumen
                  </Button>
                  <Button onClick={handleSendToSupabase} size="lg" variant="default" className="hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]">
                    <Send className="mr-2" />
                    Enviar Diagnóstico
                  </Button>
                </div>
                <Button variant="link" onClick={resetFlow} className="mt-4 text-muted-foreground">Volver al inicio</Button>
              </motion.div>
            )}

            {formStep === 'sent' && <SuccessMessage />}
            {formStep === 'general_sent' && <GeneralSuccessMessage />}
          </>
        )}
      </div>
      <WelcomeDialog open={showWelcomeDialog} onContinue={handleStartForm} sector={selectedSector} />
    </div>
  );
}
