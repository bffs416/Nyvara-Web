'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleServiceRecommendation } from '@/app/actions';
import { ServiceRecommendationOutput } from '@/ai/flows/service-recommendation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  needs: z.string().min(50, { message: "Por favor, describe tus necesidades en al menos 50 caracteres." }),
});

const defaultNeeds = "Somos una empresa B2B con 5 años en el mercado de la consultoría de gestión. Queremos modernizar nuestra imagen, generar más leads cualificados y posicionarnos como líderes de opinión en nuestro sector. Nuestro objetivo es aumentar las ventas en un 30% en los próximos 12 meses. Necesitamos una estrategia de marketing digital integral, renovar nuestro sitio web para que sea más profesional y organizar un evento virtual para conectar con potenciales clientes de alto valor.";

export default function ServiceRecommendation() {
  const [recommendation, setRecommendation] = useState<ServiceRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();

  const isDiagnosticoPage = pathname === '/diagnostico';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    
    try {
      const result = await handleServiceRecommendation(values);
      if (result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        toast({
            title: "Error",
            description: result.error || "No se pudo generar una recomendación. Por favor, inténtalo de nuevo.",
            variant: "destructive",
        });
      }
    } catch (e) {
      toast({
            title: "Error",
            description: "Ocurrió un error inesperado. Por favor, inténtalo más tarde.",
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }

  const handleNeedsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.includes("0520")) {
      form.setValue("needs", defaultNeeds);
    } else {
      form.setValue("needs", value);
    }
  };

  const recommendationComponent = (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Wand2 className="text-primary" />
          Recomendador de Servicios
        </CardTitle>
        <CardDescription>
          Cuéntanos tus necesidades y te sugeriremos un camino a seguir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tus Necesidades y Objetivos</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: 'Somos una startup que busca construir un MVP para una nueva aplicación de redes sociales. También necesitamos organizar un evento de lanzamiento en 3 meses...'"
                      className="min-h-[120px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNeedsChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : 'Obtener Recomendación'}
            </Button>
          </form>
        </Form>

        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 border-t border-border pt-8 space-y-6"
          >
             <div className="text-center">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2 text-primary font-headline">
                  <Sparkles className="h-6 w-6" />
                  {recommendation.title}
              </h3>
              <p className="mt-2 text-foreground/80">{recommendation.summary}</p>
             </div>
             <div className="space-y-4">
               {recommendation.recommendedServices.map((service, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                 >
                   <Card className="bg-card/50">
                     <CardHeader>
                       <CardTitle className="text-lg text-primary">{service.serviceName}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-muted-foreground mb-4">{service.justification}</p>
                       <h4 className="font-semibold text-foreground mb-2">Acciones Sugeridas:</h4>
                       <ul className="space-y-2">
                         {service.suggestedActions.map((action, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <CheckCircle className="h-4 w-4 mt-1 text-primary/70 shrink-0"/>
                             <span className="text-foreground/90 text-sm">{action}</span>
                           </li>
                         ))}
                       </ul>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
             </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );

  if (isDiagnosticoPage) {
    return recommendationComponent;
  }

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-primary font-semibold">ASISTENTE CON IA</div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Encuentra tu Solución Perfecta</h2>
            <p className="text-foreground/80 text-lg">
              ¿No estás seguro por dónde empezar? Describe tus objetivos y desafíos comerciales, y nuestra herramienta con IA te recomendará los mejores servicios de Nyvara para ayudarte a tener éxito. Es rápido, fácil y personalizado para ti.
            </p>
          </div>
          {recommendationComponent}
        </div>
      </div>
    </section>
  );
}
