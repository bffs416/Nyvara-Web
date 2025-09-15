import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    image: PlaceHolderImages.find(img => img.id === 'portfolio-1')!,
    title: "Fintech Analytics Dashboard",
    description: "A comprehensive dashboard for financial data visualization and analysis, boosting client decision-making speed by 40%.",
    tags: ["React", "D3.js", "Node.js"]
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'portfolio-2')!,
    title: "HealthConnect Mobile App",
    description: "A patient-centric mobile app connecting users with healthcare providers, featuring secure messaging and appointment scheduling.",
    tags: ["React Native", "Firebase", "GraphQL"]
  },
  {
    image: PlaceHolderImages.find(img => img.id === 'portfolio-3')!,
    title: "LuxeStyle E-commerce",
    description: "An elegant e-commerce platform for a luxury fashion brand, leading to a 150% increase in online sales.",
    tags: ["Shopify", "Next.js", "Tailwind CSS"]
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Software Development Portfolio</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Innovative solutions that drive results.
          </p>
        </div>
        <Carousel opts={{ loop: true }} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="overflow-hidden bg-card border-border/50 h-full flex flex-col">
                    <CardContent className="p-0 flex flex-col flex-grow">
                      <Image
                        src={project.image.imageUrl}
                        alt={project.image.description}
                        data-ai-hint={project.image.imageHint}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-headline text-xl font-bold">{project.title}</h3>
                        <p className="mt-2 text-foreground/80 flex-grow">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-secondary-foreground">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
