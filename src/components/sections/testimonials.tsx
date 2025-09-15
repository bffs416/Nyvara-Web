import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!,
    name: "Jane Doe",
    title: "CEO, Tech Innovators",
    quote: "Nyvara Group's development team is top-notch. They delivered our project on time and exceeded our expectations. Their professionalism and skill are unmatched.",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')!,
    name: "John Smith",
    title: "Marketing Director, EventPros",
    quote: "The corporate event they organized for us was flawless. Every detail was handled with care, allowing us to focus on our guests. Highly recommended!",
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')!,
    name: "Emily White",
    title: "HR Manager, Future Corp",
    quote: "The training sessions were incredibly insightful and engaging. Our team's productivity has noticeably improved since. A fantastic investment in our people.",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Success stories from businesses we've helped thrive.
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full bg-card border-border/50 p-6 flex flex-col">
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
