
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/#services' },
  { name: 'Diagnostico', href: '/diagnostico' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Testimonios', href: '/#testimonials' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    if (href.startsWith('/#')) {
        if (pathname === '/') {
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(href);
        }
    } else if (href === '/diagnostico' && pathname.startsWith('/diagnostico')) {
        // If we are already on a /diagnostico page (with or without params),
        // force a reload to reset the component's state.
        window.location.href = '/diagnostico';
    } else {
        router.push(href);
    }
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-transparent'
      }`}
    >
      <nav className="container flex h-20 items-center">
        <div className="mr-auto flex">
           <Link href="/" className="mr-6 flex items-center space-x-2 cursor-pointer">
            <motion.div whileHover={{ scale: 1.05 }} className="relative h-10 w-48">
                <Image
                  src={siteConfig.logos.header}
                  alt="Nyvara Logo"
                  fill
                  className="object-contain"
                  priority
                />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button key={item.name} onClick={() => handleNavClick(item.href)} className="transition-colors hover:text-primary">
                {item.name}
              </button>
            ))}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button onClick={() => handleNavClick('/#contact')} className="hidden md:inline-flex">
              Contacto
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 h-screen md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40"
          >
            <div className="container flex flex-col space-y-4 p-4 mt-4">
              {navItems.map((item) => (
                  <button key={item.name} onClick={() => handleNavClick(item.href)} className="text-foreground text-lg hover:text-primary transition-colors duration-300 text-left py-2">
                    {item.name}
                  </button>
              ))}
              <Button onClick={() => handleNavClick('/#contact')} className="w-full mt-4">
                Contacto
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
