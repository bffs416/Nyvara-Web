"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema } from "@/lib/schema";
import type { SurveyFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
    Q1_ROLE_OPTIONS, Q2_SERVICES_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q7_OPTIONS, 
    Q8_OPTIONS, Q9_OPTIONS, Q10_CHALLENGES_OPTIONS, Q11_OPTIONS, Q13_COLORS_OPTIONS
} from "@/lib/constants";
import { PlusCircle, Trash2 } from "lucide-react";
import { SAMPLE_SURVEY_DATA } from "@/lib/sample-data";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 15;

interface SurveyFormProps {
  onSubmit: (data: SurveyFormData) => void;
}

const getFieldNamesForStep = (step: number): (keyof SurveyFormData)[] => {
    const stepFields: Record<number, (keyof SurveyFormData)[]> = {
        0: ["q1_name", "q1_location", "q1_country", "q1_phone", "q1_experience", "q1_role"],
        1: ["q2_services", "q2_unique"],
        2: ["q3_persona"],
        3: ["q4_perception"],
        4: ["q5_emotions"],
        5: ["q6_why"],
        6: ["q7_differentiation", "q7_why"],
        7: ["q8_value"],
        8: ["q9_presence"],
        9: ["q10_rating", "q10_challenges"],
        10: ["q11_training", "q12_details"],
        11: ["q13_colors", "q14_hobby"],
        12: ["q15_final"],
        13: ["competitors"],
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

const BrutalistRadio = ({ name, value, label, register, isChecked }: any) => (
    <label className={`option-card ${isChecked ? 'selected' : ''}`}>
        <input type="radio" value={value} {...register(name)} />
        <div className="radio-visual"></div>
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

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      q1_name: "", q1_location: "", q1_country: "", q1_phone: "", q1_experience: undefined, q1_role: [], q1_role_other: "",
      q2_services: [], q2_unique: "", q2_other: "",
      q3_persona: "",
      q4_perception: [], q4_other: "", 
      q5_emotions: [], q5_other: "",
      q6_why: "",
      q7_differentiation: [], q7_why: "", q7_other: "",
      q8_value: [], q8_other: "",
      q9_presence: [], q9_other: "",
      q10_rating: 5, q10_challenges: [], q10_other: "",
      q11_training: undefined, q12_details: "",
      q13_colors: [], q13_other: "", q14_hobby: "", q15_final: "",
      competitors: [{ name: "" }],
    },
  });
  
  const { register, control, watch, trigger, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "competitors" });
  const watchedName = watch("q1_name");

  useEffect(() => {
    if (watchedName === "0520") {
      form.reset(SAMPLE_SURVEY_DATA);
      toast({
        title: "¡Formulario Autocompletado!",
        description: "Se han cargado los datos de muestra.",
      });
    } else if (watchedName === "cotizar") {
        router.push('/cotizador');
    }
  }, [watchedName, form, toast, router]);


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
  
  const watchedRole = watch("q1_role") || [];
  const watchedServices = watch("q2_services") || [];
  const watchedPerception = watch("q4_perception") || [];
  const watchedEmotions = watch("q5_emotions") || [];
  const watchedDifferentiation = watch("q7_differentiation") || [];
  const watchedValue = watch("q8_value") || [];
  const watchedPresence = watch("q9_presence") || [];
  const watchedChallenges = watch("q10_challenges") || [];
  const watchedTraining = watch("q11_training");
  const watchedColors = watch("q13_colors") || [];
  const watchedRating = watch("q10_rating") || 5;

  const renderStep = () => {
      switch(currentStep) {
        case 0:
            return <>
                <div className="section-header"><h2>Sección 1: Información Básica</h2></div>
                <BrutalistInput name="q1_name" label="Nombre del profesional o la clínica" register={register} error={errors.q1_name} />
                <BrutalistInput name="q1_location" label="Ubicación de la clínica o consultorio" register={register} error={errors.q1_location} />
                <BrutalistInput name="q1_country" label="País" register={register} error={errors.q1_country} placeholder="Escribe tu país" />
                <BrutalistInput name="q1_phone" label="Número de contacto" type="tel" register={register} error={errors.q1_phone} />
                <BrutalistInput name="q1_experience" label="Años de experiencia en medicina estética" type="number" register={register} error={errors.q1_experience} onChange={(e:any) => form.setValue('q1_experience', e.target.value === '' ? undefined : +e.target.value)} />
                <div className="selection-title">¿Cuál es tu cargo o rol principal?</div>
                <div className="grid">{Q1_ROLE_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q1_role" value={item} label={item} register={register} isChecked={watchedRole.includes(item)} />)}</div>
                {watchedRole?.includes("Otra especialidad") && <BrutalistInput name="q1_role_other" label="Por favor, especifica tu otra especialidad" placeholder="Ej: Especialista en Medicina Regenerativa" register={register} error={errors.q1_role_other} />}
            </>
        case 1:
            return <>
                <div className="section-header"><h2>Sección 1: Oferta de Servicios</h2></div>
                <div className="selection-title">Tratamientos y servicios principales (Selecciona los que apliquen)</div>
                <div className="grid">{Q2_SERVICES_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q2_services" value={item} label={item} register={register} isChecked={watchedServices.includes(item)} />)}</div>
                {watchedServices?.includes("Otro") && <BrutalistInput name="q2_other" label="Por favor, especifica otro servicio" placeholder="Ej: Terapia de quelación" register={register} error={errors.q2_other} />}
                <BrutalistTextarea name="q2_unique" label="¿Existen servicios o especialidades únicas que los diferencien?" placeholder="Ej: Nuestra técnica 'Renacer Lift'..." register={register} error={errors.q2_unique} />
            </>
        case 2:
            return <>
                <div className="section-header"><h2>Sección 2: Identidad y Valores</h2></div>
                <BrutalistTextarea name="q3_persona" label="Si tu marca personal fuera una persona, ¿quién sería y por qué?" placeholder="Ej: Sería un arquitecto de la belleza..." register={register} error={errors.q3_persona} />
            </>
        case 3:
            return <>
                <div className="section-header"><h2>Sección 2: Percepción de Marca</h2></div>
                <div className="selection-title">¿Qué imagen deseas que los pacientes tengan de ti? (Selecciona hasta 3)</div>
                <div className="grid">{Q4_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q4_perception" value={item} label={item} register={register} disabled={watchedPerception.length >= 3 && !watchedPerception.includes(item)} isChecked={watchedPerception.includes(item)} />)}</div>
                {errors.q4_perception && <p className="text-red-500 text-xs mt-1">{errors.q4_perception.message}</p>}
                {watchedPerception?.includes("Otro") && <BrutalistTextarea name="q4_other" label="Por favor, especifica tu percepción" placeholder="Ej: Pionero en técnicas..." register={register} error={errors.q4_other} />}
            </>
        case 4:
            return <>
                <div className="section-header"><h2>Sección 2: Emociones a Evocar</h2></div>
                <div className="selection-title">¿Qué emociones quieres evocar en tus pacientes? (Selecciona hasta 3)</div>
                <div className="grid">{Q5_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q5_emotions" value={item} label={item} register={register} disabled={watchedEmotions.length >= 3 && !watchedEmotions.includes(item)} isChecked={watchedEmotions.includes(item)} />)}</div>
                 {errors.q5_emotions && <p className="text-red-500 text-xs mt-1">{errors.q5_emotions.message}</p>}
                {watchedEmotions?.includes("Otro") && <BrutalistTextarea name="q5_other" label="Por favor, especifica qué emociones" placeholder="Ej: Serenidad, vitalidad, etc." register={register} error={errors.q5_other} />}
            </>
        case 5:
            return <>
                <div className="section-header"><h2>Sección 2: Tu Propósito</h2></div>
                <BrutalistTextarea name="q6_why" label="En 1-2 frases, describe el impacto que buscas generar en tus pacientes." placeholder="Ej: Quiero que mis pacientes se sientan la mejor versión..." register={register} error={errors.q6_why} />
            </>
        case 6:
            return <>
                <div className="section-header"><h2>Sección 3: Diferenciación</h2></div>
                <div className="selection-title">¿Cómo te diferencias de la competencia? (Selecciona hasta 3)</div>
                <div className="grid">{Q7_OPTIONS.map(item => <BrutalistCheckbox key={item.value} name="q7_differentiation" value={item.label} label={item.label} register={register} disabled={watchedDifferentiation.length >= 3 && !watchedDifferentiation.includes(item.label)} isChecked={watchedDifferentiation.includes(item.label)} />)}</div>
                {errors.q7_differentiation && <p className="text-red-500 text-xs mt-1">{errors.q7_differentiation.message}</p>}
                <BrutalistTextarea name="q7_why" label="Describe brevemente el elemento que seleccionaste." placeholder="¿Qué lo hace especial y único?" register={register} error={errors.q7_why} />
                {watchedDifferentiation?.includes("Otro") && <BrutalistTextarea name="q7_other" label="Por favor, especifica tu diferenciación" placeholder="Ej: Ofrezco consultas de seguimiento gratuitas por 6 meses." register={register} error={errors.q7_other} />}
            </>
        case 7:
            return <>
                <div className="section-header"><h2>Sección 3: Propuesta de Valor</h2></div>
                <div className="selection-title">¿Cuál es tu principal valor añadido para tus clientes? (Selecciona hasta 3)</div>
                <div className="grid">{Q8_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q8_value" value={item} label={item} register={register} disabled={watchedValue.length >= 3 && !watchedValue.includes(item)} isChecked={watchedValue.includes(item)} />)}</div>
                {errors.q8_value && <p className="text-red-500 text-xs mt-1">{errors.q8_value.message}</p>}
                {watchedValue?.includes("Otro") && <BrutalistTextarea name="q8_other" label="Por favor, especifica tu valor añadido" placeholder="Ej: Diagnóstico facial con IA..." register={register} error={errors.q8_other} />}
            </>
        case 8:
            return <>
                <div className="section-header"><h2>Sección 4: Presencia Online</h2></div>
                <div className="selection-title">¿Qué canales de comunicación y redes sociales utilizas?</div>
                <div className="grid grid-cols-2 md:grid-cols-3">{Q9_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q9_presence" value={item} label={item} register={register} isChecked={watchedPresence.includes(item)} />)}</div>
                {watchedPresence?.includes("Otros") && <BrutalistTextarea name="q9_other" label="Por favor, especifica otros canales" placeholder="Ej: Publicaciones en revistas, podcasts, etc." register={register} error={errors.q9_other} />}
            </>
        case 9:
            return <>
                <div className="section-header"><h2>Sección 4: Marketing Digital</h2></div>
                <BrutalistSlider name="q10_rating" label="¿Cómo calificarías tu presencia digital actual?" min={1} max={10} value={watchedRating} onChange={(val: number) => form.setValue('q10_rating', val, { shouldValidate: true })} />
                <div className="selection-title">¿Cuáles son tus mayores desafíos? (Selecciona hasta 3)</div>
                <div className="grid">{Q10_CHALLENGES_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q10_challenges" value={item} label={item} register={register} disabled={watchedChallenges.length >= 3 && !watchedChallenges.includes(item)} isChecked={watchedChallenges.includes(item)} />)}</div>
                {errors.q10_challenges && <p className="text-red-500 text-xs mt-1">{errors.q10_challenges.message}</p>}
                {watchedChallenges?.includes("Otro") && <BrutalistTextarea name="q10_other" label="Por favor, especifica otro desafío" placeholder="Ej: Mantenerse actualizado..." register={register} error={errors.q10_other} />}
            </>
        case 10:
            return <>
                <div className="section-header"><h2>Sección 5: Visión a Futuro</h2></div>
                <div className="selection-title">¿Te interesa capacitar a otros profesionales?</div>
                <div className="grid grid-cols-1">{Q11_OPTIONS.map(item => <BrutalistRadio key={item.value} name="q11_training" value={item.label} label={item.label} register={register} isChecked={watchedTraining === item.label} />)}</div>
                {(watchedTraining === "Sí" || watchedTraining === "No lo había pensado, pero me gustaría saber más") && <BrutalistTextarea name="q12_details" label="¿En qué temas específicos te gustaría capacitar?" placeholder="Ej: Mi técnica de 'Lifting Facial no invasivo'..." register={register} error={errors.q12_details} />}
            </>
        case 11:
            return <>
                <div className="section-header"><h2>Sección 5: Preferencias Personales</h2></div>
                <div className="selection-title">Si tu marca tuviera una paleta de colores, ¿cuáles incluiría?</div>
                <div className="grid grid-cols-2 md:grid-cols-3">{Q13_COLORS_OPTIONS.map(item => <BrutalistCheckbox key={item} name="q13_colors" value={item} label={item} register={register} isChecked={watchedColors.includes(item)} />)}</div>
                {watchedColors?.includes("Otro") && <BrutalistInput name="q13_other" label="Por favor, especifica otro color" placeholder="Ej: Turquesa, Coral, etc." register={register} error={errors.q13_other} />}
                <BrutalistTextarea name="q14_hobby" label="¿Qué te gusta hacer en tu tiempo libre? (Opcional)" placeholder="¿Algún hobby o interés que te apasione?" register={register} error={errors.q14_hobby} />
            </>
        case 12:
            return <>
                <div className="section-header"><h2>Reflexión Final</h2></div>
                <BrutalistTextarea name="q15_final" label="¿Cómo visualizas tu negocio en 2 años? ¿Cuál es la necesidad más urgente que tienes hoy o qué esperas lograr con nuestra ayuda?" placeholder="Ej: En 2 años, veo mi clínica como un referente..." register={register} error={errors.q15_final} rows={5}/>
            </>
        case 13:
            return <>
                <div className="section-header"><h2>Análisis de Competencia (Opcional)</h2></div>
                <label>Nombra algunos competidores clave para enriquecer el análisis.</label>
                {fields.map((field, index) => (
                    <div className="form-group flex items-center gap-2" key={field.id}>
                        <input className="w-full" placeholder={`Nombre del competidor ${index + 1}`} {...register(`competitors.${index}.name`)} />
                        <button type="button" className="btn !p-3" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-5 w-5" /></button>
                    </div>
                ))}
                <button type="button" className="btn btn-prev" onClick={() => append({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" />Añadir Competidor</button>
            </>
        case 14:
            return <>
                <div className="section-header"><h2>¡Casi listo!</h2></div>
                <p className="text-center text-lg my-12">Has completado todas las preguntas. Haz clic en el botón de abajo para generar el resumen de tu diagnóstico. Podrás revisarlo antes de enviarlo.</p>
            </>
        default:
          return null;
      }
  }

  return (
    <div className="brut-container">
        <header className="brut-header">
            <h1 className="brut-h1">Diagnóstico</h1>
            <span className="brut-subtitle">Descubre el potencial de tu clínica</span>
        </header>

        <div className="progress-container">
            <div className="progress-fill" style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}></div>
            <div className="step-indicator">{`${Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}% COMPLETADO`}</div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStep()}

            <div className="actions">
                <button type="button" onClick={handlePrev} disabled={currentStep === 0} className="btn btn-prev">Anterior</button>
                <div className="page-counter">PASO {String(currentStep + 1).padStart(2, '0')} DE {String(TOTAL_STEPS).padStart(2, '0')}</div>
                
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
