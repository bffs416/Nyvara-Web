
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { siteConfig } from '@/lib/config';

const Footer = () => {
  const { toast } = useToast()

  const handleSocialClick = (platform: string, url: string) => {
    toast({
      title: `Redirigiendo a nuestro ${platform}`,
      description: "Gracias por conectar con nosotros.",
    });
    window.open(url, '_blank');
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
    return (
      <Link href={href} className="text-[#64748b] hover:text-[#4f46e5] transition-colors duration-300 text-sm font-medium">
        {children}
      </Link>
    );
  };


  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12 font-jakarta overflow-hidden relative">
      <div className="depth-blob w-[400px] h-[400px] bg-[#4f46e5]/5 top-[-200px] right-[-100px]" />
      <div className="container mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="relative h-12 w-40 mb-8">
              <Image
                src={siteConfig.logos.header}
                alt="Nyvara Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed font-medium">
              Tu socio estratégico para el crecimiento. Integramos marketing, eventos y tecnología para convertir tus objetivos en resultados medibles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b] mb-8">Servicios</h3>
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
            <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b] mb-8">Compañía</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <NavLink href={link.href}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b] mb-8">Síguenos</h3>
            <div className="flex space-x-4">
              <button onClick={() => handleSocialClick('Instagram', 'https://instagram.com')} className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-[#1e293b] hover:bg-[#4f46e5] hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </button>
              <button onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com')} className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-[#1e293b] hover:bg-[#4f46e5] hover:text-white transition-all duration-300">
                <Linkedin size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-black/5 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-[#94a3b8] text-xs font-bold">
              © {currentYear} NYVARA STRATEGIC GROUP. TODOS LOS DERECHOS RESERVADOS.
            </p>

            <div className="flex space-x-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-[#94a3b8] hover:text-[#1e293b] transition-colors duration-300 cursor-pointer text-[10px] font-black uppercase tracking-widest">Política de Privacidad</button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white border-black/5">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e293b] font-black">Política de Privacidad</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-96 pr-6">
                    <div className="text-sm text-[#64748b] space-y-4 font-medium">
                      <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p>En Nyvara ("nosotros", "nuestro"), respetamos tu privacidad y estamos comprometidos a proteger tus datos personales...</p>

                      <h3 className="font-bold text-primary">1. Información importante y quiénes somos</h3>
                      <p>Esta política de privacidad tiene como objetivo darte información sobre cómo Nyvara recopila y procesa tus datos personales a través del uso de este sitio web, incluidos los datos que puedas proporcionar a través de este sitio web cuando te registras en nuestro boletín, compras un producto o servicio o participas en una encuesta.</p>

                      <h3 className="font-bold text-primary">2. Los datos que recopilamos sobre ti</h3>
                      <p>Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera: <strong>Datos de Identidad</strong>, <strong>Datos de Contacto</strong>, <strong>Datos Técnicos</strong>, <strong>Datos de Uso</strong> y <strong>Datos de Marketing y Comunicaciones</strong>.</p>

                      <h3 className="font-bold text-primary">3. Cómo se recopilan tus datos personales</h3>
                      <p>Utilizamos diferentes métodos para recopilar datos de y sobre ti, incluso a través de: interacciones directas, tecnologías o interacciones automatizadas y terceros o fuentes disponibles públicamente.</p>

                      <h3 className="font-bold text-primary">4. Cómo utilizamos tus datos personales</h3>
                      <p>Solo utilizaremos tus datos personales cuando la ley nos lo permita. Generalmente, utilizaremos tus datos personales en las siguientes circunstancias: para ejecutar el contrato que estamos a punto de celebrar o hemos celebrado contigo, cuando sea necesario para nuestros intereses legítimos, y cuando necesitemos cumplir con una obligación legal o regulatoria.</p>

                      <h3 className="font-bold text-primary">5. Seguridad de los datos</h3>
                      <p>Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan, usen o accedan de forma no autorizada, se alteren o se divulguen accidentalmente.</p>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer text-xs">Términos de Servicio</button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-primary font-headline">Términos y Condiciones de Servicio</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-96 pr-6">
                    <div className="text-sm text-muted-foreground space-y-4">
                      <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p>Por favor, lee estos términos de servicio ("Términos", "Términos de Servicio") cuidadosamente antes de usar el sitio web [Tu URL] (el "Servicio") operado por Nyvara ("nosotros", "nuestro").</p>

                      <h3 className="font-bold text-primary">1. Condiciones de Uso</h3>
                      <p>Al acceder y utilizar este Servicio, aceptas y estás de acuerdo con estar sujeto a los términos y disposiciones de este acuerdo. Además, al utilizar estos servicios particulares, estarás sujeto a cualquier guía o regla correspondiente que se haya publicado para dichos servicios.</p>

                      <h3 className="font-bold text-primary">2. Cuentas</h3>
                      <p>Cuando creas una cuenta con nosotros, debes proporcionarnos información precisa, completa y actual en todo momento. El incumplimiento de esto constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de tu cuenta en nuestro Servicio.</p>

                      <h3 className="font-bold text-primary">3. Propiedad Intelectual</h3>
                      <p>El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de Nyvara y sus licenciantes. El Servicio está protegido por derechos de autor, marcas registradas y otras leyes tanto de Colombia como de países extranjeros.</p>

                      <h3 className="font-bold text-primary">4. Terminación</h3>
                      <p>Podemos terminar o suspender tu acceso a nuestro Servicio de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumples los Términos.</p>

                      <h3 className="font-bold text-primary">5. Limitación de Responsabilidad</h3>
                      <p>En ningún caso Nyvara, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre otros, la pérdida de ganancias, datos, uso, buena voluntad u otras pérdidas intangibles, que resulten de tu acceso o uso o la imposibilidad de acceder o usar el Servicio.</p>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
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
