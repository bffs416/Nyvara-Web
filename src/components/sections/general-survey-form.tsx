"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSurveySchema } from "@/lib/schema";
import type { GeneralSurveyFormData } from "@/lib/types";
import { INTERESTED_SERVICES_OPTIONS, GENERAL_CHALLENGES_OPTIONS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_GENERAL_SURVEY_DATA } from "@/lib/sample-data";

interface GeneralSurveyFormProps {
  onSubmit: (data: GeneralSurveyFormData) => void;
}

const TOTAL_STEPS = 8;

const getFieldNamesForStep = (step: number): (keyof GeneralSurveyFormData)[] => {
    const stepFields: Record<number, (keyof GeneralSurveyFormData)[]> = {
        0: ["name", "company", "role", "phone", "email"],
        1: ["target_audience", "business_description"],
        2: ["main_services", "value_proposition"],
        3: ["marketing_rating"],
        4: ["challenges", "challenges_cost"],
        5: ["goals", "growth_expectation", "avg_customer_value"],
        6: ["competitors"],
        7: ["interested_services", "additional_info"],
    };
    return stepFields[step] || [];
}

const BrutalistInput = ({ name, label, placeholder, type = 'text', register, error, ...props }: any) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input id={name} type={type} placeholder={placeholder} {...register(name)} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

const BrutalistTextarea = ({ name, label, placeholder, register, error, ...props }: any) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea id={name} placeholder={placeholder} {...register(name)} {...props}></textarea>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

const BrutalistCheckbox = ({ name, value, label, register, disabled, isChecked }: any) => (
    <label className={`option-card ${isChecked ? 'selected' : ''}`}>
        <input type="checkbox" value={value} {...register(name)} disabled={disabled} />
        <div className="checkbox-visual"></div>
        {label}
    </label>
);

const BrutalistSlider = ({ name, label, min, max, value, onChange }: any) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="slider-container">
                <div className="slider-track">
                     <div 
                        className="slider-thumb" 
                        style={{ left: `${percentage}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-2 opacity-0 absolute top-0 left-0 cursor-pointer"
                />
            </div>
             <div className="slider-rating">{value}</div>
        </div>
    );
};

export default function GeneralSurveyForm({ onSubmit }: GeneralSurveyFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm<GeneralSurveyFormData>({
    resolver: zodResolver(generalSurveySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      role: "",
      phone: "",
      email: "",
      business_description: "",
      main_services: "",
      target_audience: "",
      goals: "",
      challenges: [],
      challenges_cost: "",
      value_proposition: "",
      marketing_rating: 5,
      growth_expectation: undefined,
      avg_customer_value: undefined,
      interested_services: [],
      additional_info: "",
      competitors: ""
    },
  });

  const { register, control, watch, trigger, formState: { errors } } = form;
  const watchedName = watch("name");
  const watchedRating = watch("marketing_rating");
  const watchedChallenges = watch("challenges");

  useEffect(() => {
    if (watchedName === "0520") {
      form.reset(SAMPLE_GENERAL_SURVEY_DATA);
      toast({
        title: "¡Formulario Autocompletado!",
        description: "Se han cargado los datos de muestra para la encuesta general.",
      });
    }
  }, [watchedName, form, toast]);

  const handleNext = async () => {
    const fieldsToValidate = getFieldNamesForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < TOTAL_STEPS - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const renderStep = () => {
      switch (currentStep) {
        case 0:
          return (
            <>
              <div className="section-header"><h2>Pilar 1: Sus Datos Fundamentales</h2></div>
              <BrutalistInput name="name" label="Nombre Completo" register={register} error={errors.name} />
              <BrutalistInput name="company" label="Nombre de la Empresa" register={register} error={errors.company} />
              <BrutalistInput name="role" label="Tu Cargo o Rol" register={register} error={errors.role} />
              <BrutalistInput name="phone" label="Número de Teléfono" type="tel" register={register} error={errors.phone} />
              <BrutalistInput name="email" label="Email" type="email" register={register} error={errors.email} />
            </>
          );
        case 1:
          return (
            <>
              <div className="section-header"><h2>Pilar 2: Claridad de Marca y Conexión Emocional</h2></div>
              <BrutalistTextarea name="target_audience" label="¿Quién es su cliente o público ideal? (Descríbalo con detalle)" register={register} error={errors.target_audience} />
              <BrutalistTextarea name="business_description" label="Describe brevemente tu negocio y el propósito que lo impulsa" register={register} error={errors.business_description} />
            </>
          );
        case 2:
            return (
                <>
                    <div className="section-header"><h2>Pilar 3: Su Ventaja Competitiva</h2></div>
                    <BrutalistTextarea name="main_services" label="¿Cuáles son sus productos o servicios principales?" register={register} error={errors.main_services} />
                    <BrutalistTextarea name="value_proposition" label="Si tuviera que resumir su Propuesta de Valor en una sola frase, ¿cuál sería?" placeholder="Ej: 'Ayudamos a las empresas a ahorrar tiempo automatizando sus finanzas con un software intuitivo'." register={register} error={errors.value_proposition} />
                </>
            )
        case 3:
            return (
                <>
                    <div className="section-header"><h2>Pilar 4: Diagnóstico de Eficacia Digital</h2></div>
                    <BrutalistSlider 
                        name="marketing_rating" 
                        label="En una escala de 1 a 10, ¿qué tan eficaz considera su marketing digital actual? (1 es ineficaz, 10 es líder del sector)" 
                        min={1} 
                        max={10} 
                        value={watchedRating} 
                        onChange={(val: number) => form.setValue('marketing_rating', val, { shouldValidate: true })} 
                    />
                </>
            )
        case 4:
            const challengesValue = watch('challenges') || [];
            return (
                <>
                    <div className="section-header"><h2>Pilar 4: Desafíos y Oportunidades</h2></div>
                    <label>¿Cuáles son los mayores desafíos o frustraciones que enfrenta actualmente? (Seleccione hasta 3)</label>
                    <div className="grid">
                        {GENERAL_CHALLENGES_OPTIONS.map(item => (
                            <BrutalistCheckbox 
                                key={item} 
                                name="challenges" 
                                value={item} 
                                label={item} 
                                register={register} 
                                disabled={challengesValue.length >= 3 && !challengesValue.includes(item)}
                                isChecked={challengesValue.includes(item)}
                            />
                        ))}
                    </div>
                    {errors.challenges && <p className="text-red-500 text-xs mt-1">{errors.challenges.message}</p>}
                    {(watchedChallenges && watchedChallenges.length > 0) &&
                        <BrutalistTextarea name="challenges_cost" label="¿Cuál es el costo real (en tiempo, dinero u oportunidades perdidas) de no resolver su principal desafío en los próximos 6 meses?" register={register} error={errors.challenges_cost} />
                    }
                </>
            )
        case 5:
             return (
                <>
                    <div className="section-header"><h2>Pilar 5: Visión, Metas y Recursos</h2></div>
                    <BrutalistTextarea name="goals" label="¿Cuáles son los principales objetivos de negocio que quiere alcanzar en los próximos 6-12 meses?" register={register} error={errors.goals} />
                    <BrutalistInput name="growth_expectation" label="¿Cuál es el % de crecimiento que espera alcanzar en los próximos 12 meses?" type="number" register={register} error={errors.growth_expectation} placeholder="Ej: 25" onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue('growth_expectation', e.target.value === '' ? undefined : +e.target.value)} />
                    <BrutalistInput name="avg_customer_value" label="¿Cuál es el valor promedio (Lifetime Value) de un cliente para su negocio? (Opcional)" type="number" register={register} error={errors.avg_customer_value} placeholder="Ej: 5000000" onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue('avg_customer_value', e.target.value === '' ? undefined : +e.target.value)} />
                </>
             )
        case 6:
            return (
                <>
                    <div className="section-header"><h2>Pilar 6: Análisis del Entorno Competitivo</h2></div>
                    <BrutalistTextarea name="competitors" label="Al analizar a sus competidores, ¿siente que ellos han logrado el 'Product-Market Fit' que usted está buscando? Nómbrelos y describa brevemente qué hacen bien." placeholder="Ej: Competidor A: Tienen una marca muy fuerte en redes sociales. Competidor B: Su producto es más fácil de usar." register={register} error={errors.competitors} />
                </>
            )
        case 7:
            const interestedServicesValue = watch('interested_services') || [];
            return (
                 <>
                    <div className="section-header"><h2>Paso Final: Áreas de Interés</h2></div>
                     <label>Para finalizar, ¿en qué áreas de servicio de Nyvara está más interesado/a?</label>
                    <div className="grid">
                        {INTERESTED_SERVICES_OPTIONS.map(item => (
                             <BrutalistCheckbox 
                                key={item} 
                                name="interested_services" 
                                value={item} 
                                label={item} 
                                register={register} 
                                isChecked={interestedServicesValue.includes(item)}
                            />
                        ))}
                    </div>
                     {errors.interested_services && <p className="text-red-500 text-xs mt-1">{errors.interested_services.message}</p>}

                    <BrutalistTextarea name="additional_info" label="¿Hay algo más que considere importante que sepamos para este diagnóstico?" register={register} error={errors.additional_info} />
                 </>
            )
          default:
            return null;
      }
  }


  return (
    <div className="brut-container">
        <header className="brut-header">
            <h1 className="brut-h1">ADN</h1>
            <span className="brut-subtitle">Análisis de Necesidades Estratégicas</span>
        </header>
         <div className="progress-container">
            <div className="progress-fill" style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}></div>
            <div className="step-indicator">{`${Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}% COMPLETADO`}</div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStep()}

            <div className="actions">
                <button type="button" onClick={handlePrev} disabled={currentStep === 0} className="btn btn-prev">Anterior</button>
                <div className="page-counter">PASO {String(currentStep + 1).padStart(2, '0')} de {String(TOTAL_STEPS).padStart(2, '0')}</div>
                 {currentStep < TOTAL_STEPS - 1 ? (
                  <button type="button" onClick={handleNext} className="btn btn-next">Siguiente →</button>
                ) : (
                  <button type="submit" className="btn btn-next">Generar Resumen</button>
                )}
            </div>
        </form>
    </div>
  );
}
