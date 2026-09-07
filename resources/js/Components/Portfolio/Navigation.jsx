import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/Utils/cn';
import ThemeSwitcher from './ThemeSwitcher';
import MJRLogo from '@/Components/MJRLogo';
import { Menu } from 'lucide-react';

export default function Navigation({ siteSettings, socialLinks, allowThemeSwitching, onOpenMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
      scrolled ? 'bg-background/90 backdrop-blur-md border-border py-4 shadow-lg' : 'bg-transparent py-6'
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {siteSettings?.logo_url ? (
            <img 
              src={siteSettings.logo_url} 
              alt={siteSettings.logo_text || 'MJR Logo'} 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          ) : (
            <MJRLogo className="w-8 h-8 text-primary shrink-0 transition-transform group-hover:scale-110" />
          )}
          <span className="font-heading font-black text-lg tracking-wider text-foreground group-hover:text-primary transition-colors">
            {siteSettings?.logo_text || 'MJR JUYEL'}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-mono text-sm tracking-widest text-foreground/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {allowThemeSwitching && <ThemeSwitcher />}
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
