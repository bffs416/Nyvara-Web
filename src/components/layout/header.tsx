'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NyvaraLogo from '@/components/icons/nyvara-logo';

const navItems = [
  { name: 'Servicios', href: '#services' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Testimonios', href: '#testimonials' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
      <button
        onClick={() => handleNavClick(href)}
        className="transition-colors hover:text-primary"
      >
        {children}
      </button>
  );

  const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
     <button
        onClick={() => handleNavClick(href)}
        className="text-foreground hover:text-primary transition-colors duration-300 text-left py-2"
      >
        {children}
      </button>
  );

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
                <NyvaraLogo className="h-8 w-auto text-primary" />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
                <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
            ))}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex"
            >
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
            className="absolute top-full left-0 right-0 md:hidden mt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40"
          >
            <div className="container flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                  <MobileNavLink key={item.name} href={item.href}>{item.name}</MobileNavLink>
              ))}
              <Button
                onClick={() => handleNavClick('#contact')}
                className="w-full"
              >
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
