import Link from "next/link";
import NyvaraLogo from "@/components/icons/nyvara-logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Servicios", href: "#services" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "Eventos", href: "#events" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Contacto", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <NyvaraLogo className="h-6 w-auto text-primary" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="hidden lg:inline-flex">
            <Link href="#ai-tool">
              Obtén una recomendación
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
