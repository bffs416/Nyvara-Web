import { Github, Twitter, Linkedin } from "lucide-react";
import NyvaraLogo from "@/components/icons/nyvara-logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <NyvaraLogo className="h-6 w-auto text-primary" />
            <p className="text-sm text-muted-foreground max-w-sm text-center md:text-left">
              Tu socio en excelencia digital y eventos memorables.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nyvara Group. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
