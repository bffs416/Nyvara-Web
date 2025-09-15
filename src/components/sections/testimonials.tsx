
'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const testimonials = [
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!,
    name: "Juana Pérez",
    title: "CEO, Tech Innovators",
    quote: "El equipo de desarrollo de Nyvara Group es de primera. Entregaron nuestro proyecto a tiempo y superaron nuestras expectativas. Su profesionalismo y habilidad son inigualables.",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')!,
    name: "Juan García",
    title: "Director de Marketing, EventPros",
    quote: "El evento corporativo que organizaron para nosotros fue impecable. Cada detalle se manejó con cuidado, permitiéndonos centrarnos en nuestros invitados. ¡Muy recomendable!",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!,
    name: "Emily Blanco",
    title: "Gerente de RRHH, Future Corp",
    quote: "Las sesiones de formación fueron increíblemente reveladoras y atractivas. La productividad de nuestro equipo ha mejorado notablemente desde entonces. Una fantástica inversión en nuestra gente.",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Lo que dicen nuestros clientes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Historias de éxito de empresas a las que hemos ayudado a prosperar.
          </p>
        </motion.div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full bg-card border-border/50 p-6 flex flex-col hover:shadow-[0_0_20px_4px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
                    <CardContent className="p-0 flex flex-col items-start text-left h-full">
                      <p className="text-foreground/90 italic flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center mt-6 pt-6 border-t border-border w-full">
                        <Avatar className="h-12 w-12">
                           <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                           <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
