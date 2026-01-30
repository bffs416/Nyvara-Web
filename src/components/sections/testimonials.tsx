'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const testimonials = [
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!,
    name: "Juana Pérez",
    title: "CEO, Tech Innovators",
    quote: "El equipo de desarrollo de Nyvara es de primera categoría. Entregaron nuestro software a tiempo, superando nuestras expectativas en funcionalidad y diseño. Su profesionalismo es inigualable.",
    alt: "Retrato de Juana Pérez, CEO de Tech Innovators",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')!,
    name: "Juan García",
    title: "Director de Marketing, EventPros",
    quote: "El evento corporativo que Nyvara organizó para nosotros fue impecable. Cada detalle, desde la logística hasta la experiencia del asistente, se manejó con una precisión increíble.",
    alt: "Retrato de Juan García, Director de Marketing en EventPros",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3')!,
    name: "Emily Blanco",
    title: "Gerente de RRHH, Future Corp",
    quote: "Las sesiones de formación que diseñaron fueron reveladoras y atractivas. La productividad y cohesión de nuestro equipo ha mejorado notablemente. Una inversión fantástica.",
    alt: "Retrato de Emily Blanco, Gerente de RRHH en Future Corp",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-4')!,
    name: "Carlos Rodríguez",
    title: "Fundador, Startup Creativa",
    quote: "La estrategia de marketing digital que Nyvara implementó duplicó nuestros leads cualificados en solo tres meses. Su enfoque basado en datos realmente funciona.",
    alt: "Retrato de Carlos Rodríguez, Fundador de Startup Creativa",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-5')!,
    name: "Sofía Martínez",
    title: "Gerente de Producto, eComm Store",
    quote: "El stand para nuestra feria más importante fue un éxito rotundo. El diseño fue innovador y atrajo a una cantidad increíble de visitantes a nuestro espacio.",
    alt: "Retrato de Sofía Martínez, Gerente de Producto en eComm Store",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-6')!,
    name: "Luis Fernández",
    title: "CTO, Fintech Solutions",
    quote: "Necesitábamos una arquitectura de base de datos escalable y segura. Nyvara nos entregó una solución robusta que soporta nuestro crecimiento exponencial.",
    alt: "Retrato de Luis Fernández, CTO de Fintech Solutions",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-7')!,
    name: "Ana Gómez",
    title: "Directora de Comunicaciones, ONG Global",
    quote: "Organizar nuestro congreso anual siempre fue un desafío logístico. Con Nyvara, todo fluyó sin problemas, desde el registro online hasta la transmisión en vivo.",
    alt: "Retrato de Ana Gómez, Directora de Comunicaciones",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-8')!,
    name: "Miguel Hernández",
    title: "Dueño, Restaurante Gourmet",
    quote: "La aplicación móvil que desarrollaron para nosotros ha mejorado enormemente la experiencia de nuestros clientes y ha incrementado los pedidos a domicilio en un 40%.",
    alt: "Retrato de Miguel Hernández, Dueño de Restaurante Gourmet",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-background">Historias de Éxito de Nuestros Clientes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-secondary">
            No solo lo decimos nosotros. Escucha a los líderes de negocio a los que hemos ayudado a crecer y prosperar con nuestras soluciones integradas.
          </p>
        </motion.div>
        <Carousel 
          opts={{ align: "start", loop: true }} 
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full bg-neutral-50 border-border/50 p-6 flex flex-col justify-between hover:shadow-[0_0_20px_4px_hsl(var(--secondary)/0.5)] transition-shadow duration-300">
                    <CardContent className="p-0 flex flex-col items-start text-left h-full">
                      <p className="text-secondary italic mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center pt-6 border-t border-border w-full">
                        <Avatar className="h-12 w-12">
                           <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.alt} data-ai-hint={testimonial.image.imageHint} />
                           <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-background">{testimonial.name}</p>
                          <p className="text-sm text-secondary">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
