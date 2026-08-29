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
    name: "Dr. Jonathan Rincón",
    title: "Médico Estético, Experto en hilos tensores",
    quote: "Mi página web quedó espectacular, ahora aparezco en las primeras búsquedas gracias a su excelente posicionamiento.",
    alt: "Retrato del Dr. Jonathan Rincón",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')!,
    name: "Maria Paula",
    title: "CEO de Corazón de Selva",
    quote: "Mi video quedó muy cinemático, narra absolutamente todo lo que es mi Fundación de una forma hermosa.",
    alt: "Retrato de Maria Paula, CEO de Corazón de Selva",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3')!,
    name: "Dr. Juan Carlos Peña",
    title: "Otorrinolaringólogo",
    quote: "Feliz con todo el soporte que he tenido con Nyvara. Los videos, los recorridos y la reinvención total de mi marca han sido increíbles.",
    alt: "Retrato del Dr. Juan Carlos Peña",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-4')!,
    name: "Martha Galindo",
    title: "CEO de Balu",
    quote: "Trabajar con Nyvara fue muy chévere. Logramos en tiempo récord la grabación de nuestro video y el resultado fue perfecto.",
    alt: "Retrato de Martha Galindo, CEO de Balu",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-5')!,
    name: "Dra. Sara Sánchez",
    title: "Médico Estética, Profesional en capilar",
    quote: "La página web está muy linda, me encantan todos los detalles interactivos de los antes y después de mis pacientes.",
    alt: "Retrato de la Dra. Sara Sánchez",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-6')!,
    name: "Diego Valencia",
    title: "Director de Operaciones, Constructora",
    quote: "Las tomas aéreas con dron que Nyvara realizó para nuestro proyecto inmobiliario le dieron un toque de altísimo nivel a nuestras campañas.",
    alt: "Retrato de cliente satisfecho con tomas de Dron",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-7')!,
    name: "Camila Osorio",
    title: "Gerente Comercial, Inmobiliaria",
    quote: "Los recorridos virtuales interactivos transformaron nuestra manera de vender. Ahora los clientes caminan por las propiedades desde su celular con un realismo impresionante.",
    alt: "Retrato de cliente de recorridos virtuales",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-8')!,
    name: "Roberto Pineda",
    title: "Fundador, TechStore",
    quote: "El sistema de gestión de inventarios que nos desarrollaron automatizó por completo nuestro negocio de tecnología. Ahora tenemos control en tiempo real y sin errores.",
    alt: "Retrato de cliente de gestión de inventarios",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!, // Reuse a placeholder or create a new one if PlaceHolderImages has a 9th
    name: "Felipe Franco",
    title: "Director de ventas & producto, Hansbiomed Colombia",
    quote: "El evento corporativo que Nyvara organizó para nosotros fue impecable. Cada detalle, desde la logística hasta la experiencia del asistente, se manejó con una precisión increíble.",
    alt: "Retrato de Felipe Franco",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
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
