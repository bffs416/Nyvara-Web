
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSurveySchema } from "@/lib/schema";
import type { GeneralSurveyFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { INTERESTED_SERVICES_OPTIONS, GENERAL_CHALLENGES_OPTIONS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_GENERAL_SURVEY_DATA } from "@/lib/sample-data";
import { Progress } from "@/components/ui/progress";
import { Slider } from "../ui/slider";

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

  const watchedName = form.watch("name");
  const watchedRating = form.watch("marketing_rating");
  const watchedChallenges = form.watch("challenges");

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
    const isStepValid = await form.trigger(fieldsToValidate);
    
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

  return (
    <>
      <div className="w-full bg-secondary rounded-full h-2.5 mb-8 shadow-inner">
        <Progress value={(currentStep / (TOTAL_STEPS - 1)) * 100} className="h-2.5" />
      </div>
      <Card className="shadow-2xl relative min-h-[500px]">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 0: Datos Fundamentales */}
              <div className={currentStep === 0 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-6">Pilar 1: Sus Datos Fundamentales</h2>
                <div className="space-y-6">
                  <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="company" control={form.control} render={({ field }) => <FormItem><FormLabel>Nombre de la Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="role" control={form.control} render={({ field }) => <FormItem><FormLabel>Tu Cargo o Rol</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="phone" control={form.control} render={({ field }) => <FormItem><FormLabel>Número de Teléfono</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="email" control={form.control} render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
                </div>
              </div>

              {/* Step 1: Claridad de Marca */}
              <div className={currentStep === 1 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 2: Claridad de Marca y Conexión Emocional</h2>
                  <div className="space-y-6">
                    <FormField name="target_audience" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Quién es su cliente o público ideal? (Descríbalo con detalle)</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="business_description" control={form.control} render={({ field }) => <FormItem><FormLabel>Describe brevemente tu negocio y el propósito que lo impulsa</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                  </div>
              </div>

              {/* Step 2: Ventaja Competitiva */}
              <div className={currentStep === 2 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 3: Su Ventaja Competitiva Irrefutable</h2>
                  <div className="space-y-6">
                    <FormField name="main_services" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuáles son sus productos o servicios principales?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="value_proposition" control={form.control} render={({ field }) => <FormItem><FormLabel>Si tuviera que resumir su Propuesta de Valor en una sola frase, ¿cuál sería?</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: 'Ayudamos a las empresas a ahorrar tiempo automatizando sus finanzas con un software intuitivo'." {...field} /></FormControl><FormMessage /></FormItem>} />
                  </div>
              </div>

              {/* Step 3: Eficacia Digital */}
              <div className={currentStep === 3 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 4: Diagnóstico de Eficacia Digital</h2>
                  <div className="space-y-6">
                    <FormField name="marketing_rating" control={form.control} render={({ field }) => <FormItem>
                      <FormLabel>En una escala de 1 a 10, ¿qué tan eficaz considera su marketing digital actual para generar negocio? (1 es ineficaz, 10 es líder del sector)</FormLabel>
                      <div className="flex items-center space-x-4"><span className="text-sm">1</span><FormControl><Slider min={1} max={10} step={1} defaultValue={[field.value ?? 5]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl><span className="text-sm">10</span></div>
                      <div className="text-center mt-4 text-xl font-bold text-primary">{watchedRating}</div>
                      <FormMessage />
                    </FormItem>} />
                  </div>
              </div>

               {/* Step 4: Desafíos */}
              <div className={currentStep === 4 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 4: Desafíos y Oportunidades</h2>
                  <div className="space-y-6">
                    <FormField name="challenges" control={form.control} render={() => (
                        <FormItem>
                            <FormLabel>¿Cuáles son los mayores desafíos o frustraciones que enfrenta actualmente? (Seleccione hasta 3)</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{GENERAL_CHALLENGES_OPTIONS.map((item) => (<FormField key={item} control={form.control} name="challenges" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                    <FormControl><Checkbox checked={field.value?.includes(item)} disabled={(field.value?.length ?? 0) >= 3 && !field.value?.includes(item)} onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        if (checked) { if (current.length < 3) field.onChange([...current, item]); }
                                        else { field.onChange(current.filter(value => value !== item)); }
                                    }} /></FormControl>
                                    <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                                </FormItem>
                            )} />))}</div>
                            <FormMessage />
                        </FormItem>
                    )} />
                    {(watchedChallenges && watchedChallenges.length > 0) &&
                        <FormField name="challenges_cost" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuál es el costo real (en tiempo, dinero u oportunidades perdidas) de no resolver su principal desafío en los próximos 6 meses?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                    }
                  </div>
              </div>

              {/* Step 5: Visión y Recursos */}
              <div className={currentStep === 5 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 5: Visión, Metas y Recursos</h2>
                  <div className="space-y-6">
                    <FormField name="goals" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuáles son los principales objetivos de negocio que quiere alcanzar en los próximos 6-12 meses?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="growth_expectation" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuál es el % de crecimiento que espera alcanzar en los próximos 12 meses?</FormLabel><FormControl><Input type="number" placeholder="Ej: 25" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl><FormMessage /></FormItem>} />
                    <FormField name="avg_customer_value" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuál es el valor promedio (Lifetime Value) de un cliente para su negocio? (Opcional)</FormLabel><FormControl><Input type="number" placeholder="Ej: 5000000" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl><FormMessage /></FormItem>} />
                  </div>
              </div>

              {/* Step 6: Competencia */}
              <div className={currentStep === 6 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Pilar 6: Análisis del Entorno Competitivo</h2>
                  <div className="space-y-6">
                    <FormField name="competitors" control={form.control} render={({ field }) => <FormItem><FormLabel>Al analizar a sus competidores, ¿siente que ellos han logrado el 'Product-Market Fit' que usted está buscando? Nómbrelos y describa brevemente qué hacen bien.</FormLabel><FormControl><Textarea rows={4} placeholder="Ej: Competidor A: Tienen una marca muy fuerte en redes sociales. Competidor B: Su producto es más fácil de usar." {...field} /></FormControl><FormMessage /></FormItem>} />
                  </div>
              </div>
              
              {/* Step 7: Intereses y Cierre */}
              <div className={currentStep === 7 ? 'block' : 'hidden'}>
                  <h2 className="font-headline text-3xl text-primary mb-6">Paso Final: Áreas de Interés</h2>
                  <div className="space-y-6">
                    <FormField name="interested_services" control={form.control} render={() => (
                        <FormItem>
                            <FormLabel>Para finalizar, ¿en qué áreas de servicio de Nyvara está más interesado/a?</FormLabel>
                            <div className="grid grid-cols-1 gap-4">{INTERESTED_SERVICES_OPTIONS.map((item) => (<FormField key={item} control={form.control} name="interested_services" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => { return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((value) => value !== item))}}/></FormControl><FormLabel className="font-normal cursor-pointer">{item}</FormLabel></FormItem>)}/>))}</div>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="additional_info" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Hay algo más que considere importante que sepamos para este diagnóstico?</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>} />
                  </div>
              </div>


              <div className="mt-8 pt-6 border-t-2 border-secondary flex justify-between items-center">
                 <div>
                    <Button type="button" onClick={handlePrev} disabled={currentStep === 0} variant="secondary">Anterior</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Paso {currentStep + 1} de {TOTAL_STEPS}
                </div>
                
                {currentStep < TOTAL_STEPS - 1 ? (
                  <Button type="button" onClick={handleNext}>Siguiente</Button>
                ) : (
                  <Button type="submit">Generar Resumen de Diagnóstico</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
