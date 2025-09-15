'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { handleContactSubmission } from '@/app/actions';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, Phone, MapPin, Send } from 'lucide-react';
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
            description: "Gracias por contactarnos. Nos pondremos en contacto contigo en breve.",
        });
        form.reset();
    } else {
        toast({
            title: "Error",
            description: result.error || "Algo salió mal. Por favor, inténtalo de nuevo.",
            variant: "destructive",
        });
    }
  }

  const contactInfo = [
    { icon: <Mail size={24} />, title: "Email", info: siteConfig.contact.email, link: `mailto:${siteConfig.contact.email}` },
    { icon: <Phone size={24} />, title: "Teléfono", info: `+${siteConfig.contact.phone}`, link: `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}` },
    { icon: <MapPin size={24} />, title: "Ubicación", info: "Bogota, Colombia", link: null }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para <span className="text-primary">Comenzar?</span></h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">Contáctanos hoy y descubre cómo podemos transformar tu visión en realidad</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-8" id="info-de-contacto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Información de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                    <Card className="p-4 flex items-center space-x-4 bg-card border-border/50 hover:border-primary/50 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] hover:scale-105 transition-transform duration-300">
                      <div className="text-primary">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-muted-foreground">
                          {item.link ? <a href={item.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{item.info}</a> : <span>{item.info}</span>}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            <Card className="p-6 bg-card border-border/50">
              <h4 className="text-xl font-bold text-foreground mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div>Experiencia comprobada</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div>Equipo multidisciplinario</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div>Soluciones a medida</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-primary rounded-full mr-3"></div>Soporte continuo</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <Card className="p-8 bg-card border-border/50 hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)]">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Envíanos un Mensaje</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa (Opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de tu empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio de Interés</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="eventos">Eventos Corporativos</SelectItem>
                          <SelectItem value="desarrollo">Desarrollo de Software</SelectItem>
                          <SelectItem value="todos">Todos los servicios</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos sobre tu proyecto..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full font-bold py-4" disabled={isLoading}>
                  {isLoading ? (<><Loader2 size={20} className="animate-spin" /> Enviando...</>) : (<><Send size={20} /> Enviar Mensaje</>)}
                </Button>
              </form>
            </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
