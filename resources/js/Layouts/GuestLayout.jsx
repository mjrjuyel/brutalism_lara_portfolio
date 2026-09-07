import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import ThemeSwitcher from '@/Components/Portfolio/ThemeSwitcher';
import NoiseTexture from '@/Components/Decorative/NoiseTexture';
import ScanLines from '@/Components/Decorative/ScanLines';
import GridBackground from '@/Components/Decorative/GridBackground';
import StatusIndicator from '@/Components/Decorative/StatusIndicator';
import MJRLogo from '@/Components/MJRLogo';
import { ArrowLeft, Terminal, ShieldCheck } from 'lucide-react';

export default function GuestLayout({ children }) {
  const { props } = usePage();
  const activeTheme = props?.activeTheme || 'cyber-brutalism';
  const siteSettings = props?.siteSettings;

  return (
    <ThemeProvider initialTheme={activeTheme}>
      <Head>
        <link rel="icon" type="image/svg+xml" href={siteSettings?.favicon_url || '/favicon.svg'} />
      </Head>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative flex flex-col justify-between overflow-x-hidden">
        {/* Ambient Decorative System Layers */}
        <NoiseTexture opacity={0.03} />
        <ScanLines />
        <GridBackground opacity={0.04} />

        {/* Futuristic Top Bar */}
        <header className="relative z-20 border-b border-border/80 bg-background/80 backdrop-blur-md px-4 py-3 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            {/* Logo / Brand */}
            <Link href="/" className="group flex items-center gap-3">
              {siteSettings?.logo_url ? (
                <img src={siteSettings.logo_url} alt="Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              ) : (
                <MJRLogo className="w-8 h-8 text-primary shrink-0 transition-transform group-hover:scale-110" />
              )}
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {siteSettings?.logo_text || 'MJR JUYEL'}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline-block">
                  AUTHENTICATION GATEWAY
                </span>
              </div>
            </Link>

            {/* Controls & Nav */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden md:flex items-center">
                <StatusIndicator status="available" showLabel={true} />
              </div>

              <div className="flex items-center gap-2 border-l border-border/60 pl-3 sm:pl-5">
                <span className="hidden font-mono text-xs uppercase text-muted-foreground lg:inline-block">
                  THEME:
                </span>
                <ThemeSwitcher />
              </div>

              <Link
                href="/"
                className="flex items-center gap-1.5 border border-border/70 bg-card/60 px-3 py-1.5 font-mono text-xs uppercase text-foreground transition-all hover:border-primary hover:text-primary backdrop-blur-sm"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">RETURN TO</span> SITE
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>

        {/* Futuristic Footer Terminal Bar */}
        <footer className="relative z-20 border-t border-border/80 bg-background/80 backdrop-blur-md px-4 py-3 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" />
              <span>NODE_2030 // SECURE PROTOCOL</span>
              <span className="text-border">|</span>
              <span className="text-foreground/70">ALL SESSIONS MONITORED</span>
            </div>
            <div className="uppercase tracking-wider">
              AUTHORIZED PERSONNEL ONLY // {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
