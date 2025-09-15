import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code, Calendar, Presentation } from "lucide-react";

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Software Development",
    description: "Custom software, web, and mobile applications tailored to your business needs, delivering performance and scalability.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Corporate Events",
    description: "End-to-end event management for memorable and impactful corporate gatherings, from planning to execution.",
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: "Professional Training",
    description: "Specialized training programs designed to upskill your team and drive professional growth within your organization.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Our Core Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Three pillars of excellence to drive your business forward.
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
