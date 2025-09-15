import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <div className="container flex flex-col items-center justify-center text-center py-24 md:py-32 lg:py-48">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
        
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary">
          Creando Excelencia Digital y Corporativa
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-foreground/80">
          Nyvara Group ofrece soluciones de software a medida, orquesta eventos corporativos inolvidables y proporciona formación experta para elevar tu negocio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#services">Explorar Servicios</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Ponte en Contacto</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
