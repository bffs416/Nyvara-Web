'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { handleContactSubmission } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { siteConfig } from '@/lib/config';

const formSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    email: z.string().email({ message: "Por favor, introduce un email válido." }),
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export default function Contact() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await handleContactSubmission(values);
    setIsLoading(false);

    if (result.success) {
        toast({
            title: "¡Mensaje Enviado!",
            description: "Gracias por contactarnos. Nuestro equipo de estrategas se pondrá en contacto contigo en breve.",
        });
        form.reset();
    } else {
        toast({
            title: "Error de Envío",
            description: result.error || "Algo salió mal. Por favor, inténtalo de nuevo o contáctanos directamente por email.",
            variant: "destructive",
        });
    }
  }
  
  const contactInfo = [
    { 
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, 
      title: "Contacto Directo", 
      info: siteConfig.contact.email, 
      link: `mailto:${siteConfig.contact.email}` 
    },
    { 
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, 
      title: "Línea Ejecutiva", 
      info: `+${siteConfig.contact.phone}`, 
      link: `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}` 
    },
    { 
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, 
      title: "Sede Central", 
      info: "Bogotá, CO (Global Ops)", 
      link: null 
    }
  ];

  const pillars = [
    "Exigencia y Rigor Estratégico",
    "Transparencia en la Ejecución",
    "Innovación Basada en Datos",
    "Crecimiento Escalable Sostenible",
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Estrategia de <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:-z-10">Alto Impacto</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Conecta con expertos para llevar tu modelo de negocio al siguiente nivel mediante soluciones sobrias, eficientes y orientadas a resultados.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <aside className="lg:col-span-2 flex flex-col gap-5">
            {contactInfo.map((item) => (
              <a href={item.link || '#'} key={item.title} target={item.link ? '_blank' : '_self'} rel="noopener noreferrer" className="group block">
                <Card className="p-6 flex items-center gap-5 bg-card/70 border-border/50 backdrop-blur-sm transition-all duration-500 ease-out hover:bg-card hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-105">
                    <div className="w-14 h-14 bg-secondary text-secondary-foreground flex-shrink-0 flex items-center justify-center rounded-xl transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110">
                        {item.icon}
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.title}</h3>
                        <p className="font-semibold text-lg truncate">{item.info}</p>
                    </div>
                </Card>
              </a>
            ))}

            <Card className="p-6 bg-card/40 border-border/20 backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Nuestros Pilares</h3>
                <ul className="space-y-3">
                    {pillars.map(pillar => (
                      <li key={pillar} className="flex items-center gap-3 text-sm text-foreground/90 font-medium">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {pillar}
                      </li>
                    ))}
                </ul>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            <Card className="p-8 md:p-12 bg-card border-2 border-primary/20 shadow-2xl shadow-primary/10">
              <h2 className="text-3xl font-bold text-center mb-2">Solicitud de Consultoría</h2>
              <p className="text-center text-muted-foreground mb-8">Complete los campos para iniciar el proceso de diagnóstico.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Nombre y Apellido</FormLabel>
                                <FormControl>
                                <Input placeholder="Ej. Juan Pérez" {...field} className="h-14 text-base"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-wider">Email Corporativo</FormLabel>
                                <FormControl>
                                <Input type="email" placeholder="nombre@empresa.com" {...field} className="h-14 text-base"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider">Organización</FormLabel>
                            <FormControl>
                            <Input placeholder="Nombre de su compañía" {...field} className="h-14 text-base"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider">Área de Interés</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 text-base">
                                <SelectValue placeholder="Seleccione una opción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="marketing">Marketing Digital</SelectItem>
                              <SelectItem value="eventos">Organización de Eventos</SelectItem>
                              <SelectItem value="desarrollo">Desarrollo de Software</SelectItem>
                              <SelectItem value="todos">Solución Integral 360°</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider">Detalles del Proyecto</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describa brevemente sus objetivos..."
                              className="min-h-[120px] resize-none text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="w-full font-bold py-4 text-lg h-auto mt-4 group" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <>
                        <span>Agendar Primera Sesión</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </main>
        </div>
      </div>
    </section>
  );
}
