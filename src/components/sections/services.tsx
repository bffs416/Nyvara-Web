import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code, Calendar, Presentation } from "lucide-react";

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Desarrollo de Software",
    description: "Software a medida, aplicaciones web y móviles adaptadas a las necesidades de tu negocio, ofreciendo rendimiento y escalabilidad.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Eventos Corporativos",
    description: "Gestión integral de eventos para reuniones corporativas memorables e impactantes, desde la planificación hasta la ejecución.",
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: "Formación Profesional",
    description: "Programas de formación especializados diseñados para mejorar las habilidades de tu equipo e impulsar el crecimiento profesional en tu organización.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Nuestros Servicios Principales</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Tres pilares de excelencia para impulsar tu negocio.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-background/50 border-border/50 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent mb-4">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/80">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
