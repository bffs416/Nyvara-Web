'use client';

import React, { useState, useEffect } from 'react';
import SurveyForm from '@/components/sections/survey-form';
import GeneralSurveyForm from '@/components/sections/general-survey-form';
import { handleSurveySubmission, summarizeSurveyDataForDownload, handleGeneralSurveySubmission, summarizeGeneralSurveyDataForDownload } from '@/app/client-actions';
import type { SurveyFormData, GeneralSurveyFormData } from '@/lib/types';
import { Loader2, ServerCrash, Download, Send, CheckCircle, HeartPulse, Building, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { useRouter, useSearchParams } from 'next/navigation';

const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
    <div className="brut-container">
        <div className="text-center">
            <h1 className="brut-h1 !text-2xl !sm:text-4xl">¡Diagnóstico Enviado!</h1>
            <p className="brut-subtitle">Gracias por tu tiempo.</p>
        </div>
        <p className="text-center my-8">
            Has dado un paso fundamental. He recibido tus respuestas y, gracias a los minutos que has invertido, ahora puedo dedicar todo mi esfuerzo y conocimiento en analizar tu visión para construir juntos el camino hacia tu objetivo.
            <br/><br/>
            <strong className="font-bold">Revisaré personalmente cada detalle y me pondré en contacto contigo muy pronto.</strong>
        </p>
        <div className="actions">
            <button onClick={onReset} className="btn btn-next w-full">Volver al Inicio</button>
        </div>
    </div>
);

const GeneralSuccessMessage = () => {
    const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent("Hola, he completado el Análisis de Necesidades (ADN) y me gustaría recibir mi diagnóstico inicial personalizado.")}`;
    return (
        <div className="brut-container">
            <div className="text-center">
                <h1 className="brut-h1 !text-2xl !sm:text-4xl">¡Análisis Completado!</h1>
                 <p className="brut-subtitle">Gracias por tu honestidad.</p>
            </div>
            <p className="text-center my-8">
                La información compartida es ahora la materia prima para nuestro análisis. El siguiente paso es contactarnos directamente para recibir tu diagnóstico inicial personalizado y discutir tus oportunidades de crecimiento.
            </p>
            <div className="actions">
                 <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-next w-full text-center">
                    Contactar por WhatsApp
                 </a>
            </div>
        </div>
    );
};


const SectorSelection = ({ onSelect }: { onSelect: (sector: 'health' | 'general') => void }) => (
  <div className="brut-container">
     <div className="brut-header">
        <h1 className="brut-h1 !text-4xl sm:!text-5xl">Paso 1</h1>
        <span className="brut-subtitle">Elige tu sector</span>
    </div>
    <p className="text-center mb-8">Para ofrecerte el diagnóstico más preciso, por favor, selecciona el área que mejor describe tu negocio.</p>
    <div className="grid">
      <div onClick={() => onSelect('health')} className="option-card !flex-col !items-center !text-center !gap-2 !p-8">
          <HeartPulse className="h-10 w-10 mb-2" />
          <span className="font-bold text-lg">Sector Salud</span>
          <span className="font-normal text-sm text-muted-foreground">(Medicina Estética)</span>
      </div>
      <div onClick={() => onSelect('general')} className="option-card !flex-col !items-center !text-center !gap-2 !p-8">
          <Building className="mb-2 h-10 w-10" />
          <span className="font-bold text-lg">Otro Sector</span>
          <span className="font-normal text-sm text-muted-foreground">(Empresas y Profesionales)</span>
      </div>
    </div>
  </div>
);


export default function DiagnosticoClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState<'sector' | 'form' | 'summary' | 'sent' | 'general_sent'>('sector');
  const [surveyData, setSurveyData] = useState<SurveyFormData | GeneralSurveyFormData | null>(null);
  const [summaryText, setSummaryText] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<'health' | 'general' | null>(null);
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="brut-container text-center">
            <Loader2 className="h-16 w-16 animate-spin text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Procesando...</h2>
        </div>
      )
    }

    if (error) {
      return (
        <div className="brut-container text-center">
            <ServerCrash className="h-16 w-16 text-brut-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold">¡Oops! Algo salió mal.</h2>
            <p className="mt-4 mb-6">{error}</p>
            <button onClick={resetFlow} className="btn btn-next">Intentar de Nuevo</button>
        </div>
      );
    }
    
    switch (formStep) {
        case 'sector':
            return <SectorSelection onSelect={handleSectorSelect} />;
        case 'form':
            if (selectedSector === 'health') return <SurveyForm onSubmit={handleFormSubmit as (data: SurveyFormData) => void} />;
            if (selectedSector === 'general') return <GeneralSurveyForm onSubmit={handleFormSubmit as (data: GeneralSurveyFormData) => void} />;
            return null;
        case 'summary':
            return (
              <div className="brut-container text-center">
                  <div className="brut-header">
                     <h1 className="brut-h1 !text-4xl">Paso Final</h1>
                     <span className="brut-subtitle">Revisa y Guarda tu Resumen</span>
                  </div>
                  <p className="mb-8">Hemos generado un resumen de tus respuestas. Descárgalo para tus archivos y luego envíalo para que nuestro equipo lo revise.</p>
                  <div className="actions flex-col gap-4 sm:flex-row">
                      <button onClick={handleDownloadSummary} className="btn btn-prev">
                          <Download className="mr-2" />
                          Descargar
                      </button>
                      <button onClick={handleSendToSupabase} className="btn btn-next">
                          <Send className="mr-2" />
                          Enviar Diagnóstico
                      </button>
                  </div>
                  <button onClick={resetFlow} className="mt-8 text-sm underline">Volver al inicio</button>
              </div>
            );
        case 'sent':
            return <SuccessMessage onReset={resetFlow} />;
        case 'general_sent':
            return <GeneralSuccessMessage />;
        default:
            return null;
    }
  }

  return (
    <div className="z-10 relative">
        {renderContent()}
    </div>
  );
}
