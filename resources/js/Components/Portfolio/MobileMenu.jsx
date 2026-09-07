import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function MobileMenu({ open, onClose, siteSettings, allowThemeSwitching }) {
  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col justify-center px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-foreground p-2">
            <X size={32} />
          </button>
          
          <nav className="flex flex-col gap-8 items-start">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
          
          {allowThemeSwitching && (
            <div className="mt-12">
              <ThemeSwitcher />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
