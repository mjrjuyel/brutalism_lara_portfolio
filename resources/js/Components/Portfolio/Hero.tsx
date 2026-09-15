import React from 'react';
import { motion } from 'motion/react';
import GridBackground from '../Decorative/GridBackground';
import TechnicalLabel from '../Decorative/TechnicalLabel';
import StatusIndicator from '../Decorative/StatusIndicator';
import ScrollIndicator from '../Decorative/ScrollIndicator';
import SocialLinks from './SocialLinks';
import HeroPortrait from './HeroPortrait';

export default function Hero({ hero, profile, socialLinks }) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6 order-2 md:order-1"
        >
          <div className="flex items-center gap-3">
            <TechnicalLabel prefix="//">SYSTEM_INITIALIZED</TechnicalLabel>
            <span className="font-mono text-[10px] text-primary px-1.5 py-0.5 border border-primary/40 bg-primary/5 uppercase">
              NODE_2030
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92]">
            {hero?.headline || 'BUILDING THE FUTURE'}
          </h1>
          
          <div className="font-mono text-base sm:text-lg text-foreground/80 max-w-xl">
            {profile?.title && (
              <p className="text-primary font-bold mb-2 tracking-wide">
                {profile.title}
              </p>
            )}
            <p className="leading-relaxed">
              {hero?.introduction || 'Creative technologist crafting resilient full stack systems and high-fidelity brutalist interfaces.'}
            </p>
          </div>
          
          {hero?.show_availability && (
            <StatusIndicator status={profile?.availability || 'available'} className="mt-2" />
          )}
          
          <div className="flex flex-wrap gap-4 mt-6">
            <a 
              href={hero?.cta_secondary_url || '#contact'} 
              className="px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase hover:bg-primary/90 transition-all active:scale-[0.98] shadow-[var(--shadow)]"
            >
              {hero?.cta_secondary_text || 'Initiate Contact'}
            </a>
            <a 
              href={hero?.cta_primary_url || '#work'} 
              className="px-8 py-4 border border-border bg-card/40 text-foreground font-mono font-bold uppercase hover:border-primary hover:text-primary transition-all active:scale-[0.98] backdrop-blur-sm"
            >
              {hero?.cta_primary_text || 'View Database'}
            </a>
          </div>
          
          {socialLinks && <SocialLinks links={socialLinks} className="mt-6" />}
        </motion.div>
        
        {/* Right: The High-End Hero Portrait Stage */}
        {(hero?.hero_image_url || hero?.hero_image_path || profile?.profile_image_url || profile?.avatar_url) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center md:justify-end w-full order-1 md:order-2"
          >
            <HeroPortrait profile={profile} hero={hero} />
          </motion.div>
        )}
      </div>

      {hero?.show_scroll_indicator && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
          <ScrollIndicator />
        </div>
      )}
    </section>
  );
}
