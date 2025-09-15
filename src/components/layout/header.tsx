'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NyvaraLogo from '@/components/icons/nyvara-logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/#services' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Testimonios', href: '/#testimonials' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
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
            <motion.div whileHover={{ scale: 1.05 }}>
                <NyvaraLogo className="h-8 w-40" />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="transition-colors hover:text-primary">
                {item.name}
              </Link>
            ))}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button onClick={handleContactClick} className="hidden md:inline-flex">
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
                  <Link key={item.name} href={item.href} onClick={closeMobileMenu} className="text-foreground text-lg hover:text-primary transition-colors duration-300 text-left py-2">
                    {item.name}
                  </Link>
              ))}
              <Button onClick={handleContactClick} className="w-full mt-4">
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
