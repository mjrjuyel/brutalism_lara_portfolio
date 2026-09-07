import React from 'react';
import { cn } from '@/Utils/cn';
import SocialLinks from './SocialLinks';
import TechnicalLabel from '../Decorative/TechnicalLabel';
import { ArrowUp } from 'lucide-react';

import MJRLogo from '@/Components/MJRLogo';

export default function Footer({ siteSettings, socialLinks, profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-border bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {siteSettings?.logo_url ? (
                <img src={siteSettings.logo_url} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <MJRLogo className="w-8 h-8 text-primary shrink-0" />
              )}
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                {siteSettings?.logo_text || 'MJR JUYEL'}
              </h2>
            </div>
            <p className="font-mono text-sm text-foreground/60 max-w-md">
              {siteSettings?.footer_text || 'Creating functional digital experiences with modern web technologies.'}
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            <TechnicalLabel>CONNECT</TechnicalLabel>
            <SocialLinks links={socialLinks} size="md" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50 font-mono text-xs text-foreground/50">
          <div>
            &copy; {currentYear} {profile?.name || 'Entity'}. ALL_RIGHTS_RESERVED.
          </div>
          
          <div className="flex gap-4">
            <span>SYS_VERSION: 1.0.0</span>
            <span className="hidden md:inline">|</span>
            <span>BUILT_WITH: LARAVEL + REACT + INERTIA</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 p-4 bg-muted border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex flex-col items-center gap-2 group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        <span className="font-mono text-[10px] uppercase">TOP</span>
      </button>
    </footer>
  );
}
