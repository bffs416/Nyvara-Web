'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import NyvaraLogo from '@/components/icons/nyvara-logo';

const Footer = () => {
  const { toast } = useToast()

  const handleSocialClick = (platform: string, url: string) => {
    toast({
      title: `Redirigiendo a nuestro ${platform}`,
      description: "Gracias por conectar con nosotros.",
    });
    window.open(url, '_blank');
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { name: 'Marketing que Convierte', href: '/marketing' },
    { name: 'Eventos Corporativos', href: '/eventos' },
    { name: 'Tecnología que Impulsa', href: '/desarrollo' },
  ];

  const companyLinks = [
    { name: 'Sobre Nosotros', href: '/#nosotros' },
    { name: 'Servicios', href: '/#services' },
    { name: 'Contacto', href: '/#contact' },
  ];
  
  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    if (href.startsWith('/#')) {
        return (
            <Link href={href} className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm text-left w-full">
                {children}
            </Link>
        );
    }
    return (
        <Link href={href} className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm text-left w-full">
            {children}
        </Link>
    );
  };


  return (
    <footer className="bg-card border-t border-border/40 pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-lg font-semibold text-primary mb-5">Sobre Nyvara</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu socio estratégico para el crecimiento. Integramos marketing, eventos y tecnología para convertir tus objetivos en resultados medibles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-primary mb-5">Servicios</h3>
            <ul className="space-y-4">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <NavLink href={service.href}>
                    {service.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-primary mb-5">Navegación</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                 <li key={link.name}>
                   <NavLink href={link.href}>
                     {link.name}
                   </NavLink>
                 </li>
              ))}
              <li>
                <span className="text-muted-foreground/50 text-sm cursor-not-allowed">Blog (Próximamente)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <NyvaraLogo className="h-10 w-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border/40 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-muted-foreground text-xs text-center md:text-left order-1">
              © {currentYear} Nyvara Group. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6 order-3 md:order-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer text-xs">Política de Privacidad</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer text-xs">Términos de Servicio</Link>
            </div>

            <div className="flex justify-center space-x-6 order-2 md:order-3">
              <button onClick={() => handleSocialClick('Instagram', 'https://instagram.com')} className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={22} /></button>
              <button onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com')} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={22} /></button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
