import React from 'react';
import { Head } from '@inertiajs/react';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import NoiseTexture from '../Components/Decorative/NoiseTexture';
import ScanLines from '../Components/Decorative/ScanLines';
import Navigation from '../Components/Portfolio/Navigation';
import Footer from '../Components/Portfolio/Footer';
import MobileMenu from '../Components/Portfolio/MobileMenu';
import { useState } from 'react';

export default function PortfolioLayout({ children, seo, siteSettings, activeTheme, allowVisitorSwitching = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider initialTheme={activeTheme}>
      <Head>
        <title>{seo?.title || siteSettings?.site_title || 'Portfolio'}</title>
        <link rel="icon" type="image/svg+xml" href={siteSettings?.favicon_url || '/favicon.svg'} />
        {seo?.description && <meta name="description" content={seo.description} />}
        {seo?.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo?.og_image && <meta property="og:image" content={seo.og_image} />}
      </Head>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <style dangerouslySetInnerHTML={{__html: `html { scroll-behavior: smooth; }`}} />
        
        <NoiseTexture />
        <ScanLines />
        
        <Navigation 
          siteSettings={siteSettings} 
          allowThemeSwitching={allowVisitorSwitching} 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        
        <MobileMenu 
          open={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          siteSettings={siteSettings}
          allowThemeSwitching={allowVisitorSwitching}
        />

        <main className="relative z-10 w-full pt-16">
          {children}
        </main>

        <Footer siteSettings={siteSettings} />
      </div>
    </ThemeProvider>
  );
}
