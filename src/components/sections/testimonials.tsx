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
    name: "Felipe Franco",
    title: "Director de ventas & producto, Hansbiomed Colombia",
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
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-br from-[#F5F7FF] via-[#EBF1FF] to-[#F5F7FF] relative overflow-hidden">
      {/* Decorative Yellow Glow */}
      <div className="absolute bottom-1/4 -right-20 md:-right-32 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#1a1a2e]">Lo que Dicen Nuestros Clientes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#5a5a75] text-lg">
            La confianza de nuestros socios es nuestro mayor activo. Descubre las historias de éxito de quienes han crecido con nosotros.
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
                  <Card className="h-full bg-white border-none rounded-[32px] p-8 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
                    <CardContent className="p-0 flex flex-col items-start text-left h-full">
                      <div className="mb-6 relative">
                        <span className="text-6xl text-primary/20 font-serif leading-none absolute -top-4 -left-2">"</span>
                        <p className="text-[#5a5a75] italic relative z-10 leading-relaxed"> {testimonial.quote}</p>
                      </div>
                      <div className="flex items-center pt-6 border-t border-slate-100 w-full mt-auto">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.alt} data-ai-hint={testimonial.image.imageHint} />
                          <AvatarFallback className="bg-primary/20 text-primary-foreground">{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-bold text-[#1a1a2e]">{testimonial.name}</p>
                          <p className="text-sm text-[#8888a0] uppercase tracking-wide font-medium">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex -left-12 bg-white text-[#1a1a2e] border-none shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors" />
          <CarouselNext className="hidden lg:flex -right-12 bg-white text-[#1a1a2e] border-none shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
