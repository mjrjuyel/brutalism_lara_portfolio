import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ThemeProvider } from '@/Contexts/ThemeContext';
import ThemeSwitcher from '@/Components/Portfolio/ThemeSwitcher';
import NoiseTexture from '@/Components/Decorative/NoiseTexture';
import ScanLines from '@/Components/Decorative/ScanLines';
import GridBackground from '@/Components/Decorative/GridBackground';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import GlitchText from '@/Components/Decorative/GlitchText';
import MJRLogo from '@/Components/MJRLogo';
import { 
  ArrowLeft, 
  ArrowRight, 
  Terminal, 
  AlertTriangle, 
  Home, 
  RotateCcw, 
  Compass, 
  Radio, 
  ShieldAlert,
  Layers,
  Cpu
} from 'lucide-react';

export default function Error({ status = 404 }) {
  const { props } = usePage();
  const activeTheme = props?.activeTheme || 'cyber-brutalism';
  const siteSettings = props?.siteSettings;

  const [currentPath, setCurrentPath] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [terminalCopied, setTerminalCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname || '/unknown');
      setTimestamp(new Date().toISOString());
    }
  }, []);

  const errorConfigs = {
    404: {
      code: '404',
      hexCode: '0x404_VOID',
      badge: 'SECTOR_NOT_FOUND',
      title: 'COORDINATE UNRESOLVED',
      subtitle: 'THE REQUESTED SECTOR OR PROTOCOL DOES NOT EXIST IN THIS CLUSTER.',
      diagnostic: 'Target URI returned NULL pointer from routing mesh.',
      actionHint: 'Reroute packet flow back to verified primary index node.',
    },
    403: {
      code: '403',
      hexCode: '0x403_DENIED',
      badge: 'ACCESS_RESTRICTED',
      title: 'SECURITY PERMISSION REJECTED',
      subtitle: 'CLEARANCE LEVEL INSUFFICIENT FOR THIS RESTRICTED SYSTEM SECTOR.',
      diagnostic: 'Firewall intercepted unauthorized biometric/token handshake.',
      actionHint: 'Authenticate via designated gateway or return to perimeter.',
    },
    500: {
      code: '500',
      hexCode: '0x500_FAILURE',
      badge: 'INTERNAL_SERVER_ERROR',
      title: 'CORE SUBSYSTEM FAULT',
      subtitle: 'AN UNEXPECTED ANOMALY CRASHED THE SYSTEM EXECUTION THREAD.',
      diagnostic: 'Process crashed with unhandled kernel exception.',
      actionHint: 'Reinitialize system sequence or report diagnostic telemetry.',
    },
    503: {
      code: '503',
      hexCode: '0x503_OVERLOAD',
      badge: 'SERVICE_UNAVAILABLE',
      title: 'GRID UNDER MAINTENANCE',
      subtitle: 'ALL CHANNELS TEMPORARILY OFFLINE FOR RECONFIGURATION.',
      diagnostic: 'Core cluster nodes undergoing scheduled maintenance cycle.',
      actionHint: 'Stand by for automatic reconnection signal.',
    },
  };

  const config = errorConfigs[status] || errorConfigs[404];

  const copyDiagnostic = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const text = `[ANOMALY REPORT]\nCODE: ${config.code}\nHEX: ${config.hexCode}\nPATH: ${currentPath}\nTIME: ${timestamp}\nSTATUS: ${config.badge}`;
      navigator.clipboard.writeText(text);
      setTerminalCopied(true);
      setTimeout(() => setTerminalCopied(false), 2000);
    }
  };

  return (
    <ThemeProvider initialTheme={activeTheme}>
      <Head>
        <title>{`${config.code} // ${config.badge} — ${siteSettings?.site_title || 'MJR JUYEL'}`}</title>
        <link rel="icon" type="image/svg+xml" href={siteSettings?.favicon_url || '/favicon.svg'} />
      </Head>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative flex flex-col justify-between overflow-x-hidden">
        {/* Ambient Decorative System Layers */}
        <NoiseTexture opacity={0.03} />
        <ScanLines />
        <GridBackground opacity={0.04} />

        {/* Futuristic Top Navigation Bar */}
        <header className="relative z-20 border-b border-border/80 bg-background/80 backdrop-blur-md px-4 py-3 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            {/* Logo / Brand */}
            <Link href="/" className="group flex items-center gap-3">
              {siteSettings?.logo_url ? (
                <img 
                  src={siteSettings.logo_url} 
                  alt="Logo" 
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              ) : (
                <MJRLogo className="w-8 h-8 text-primary shrink-0 transition-transform group-hover:scale-110" />
              )}
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {siteSettings?.logo_text || 'MJR JUYEL'}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-destructive hidden sm:inline-block">
                  ANOMALY DETECTED // SECTOR {config.code}
                </span>
              </div>
            </Link>

            {/* Controls & Nav */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Anomaly Badge */}
              <div className="hidden md:flex items-center gap-2 border border-destructive/50 bg-destructive/10 px-2.5 py-1 font-mono text-[11px] text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive animate-ping" />
                <span>FAULT: {config.hexCode}</span>
              </div>

              {/* Theme Switcher */}
              <div className="flex items-center gap-2 border-l border-border/60 pl-3 sm:pl-5">
                <span className="hidden font-mono text-xs uppercase text-muted-foreground lg:inline-block">
                  THEME:
                </span>
                <ThemeSwitcher />
              </div>

              {/* Quick Return */}
              <Link
                href="/"
                className="flex items-center gap-1.5 border border-border/70 bg-card/60 px-3 py-1.5 font-mono text-xs uppercase text-foreground transition-all hover:border-primary hover:text-primary backdrop-blur-sm"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">RETURN TO</span> ROOT
              </Link>
            </div>
          </div>
        </header>

        {/* Main Error Terminal Display */}
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-16 sm:px-6">
          <div className="w-full max-w-3xl">
            <CornerBrackets 
              className="bg-card/95 border border-border p-6 sm:p-10 backdrop-blur-md shadow-[var(--shadow)] relative overflow-hidden" 
              size={28} 
              thickness={2}
            >
              {/* Top Panel Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <TechnicalLabel prefix="//">SYSTEM_HALT // EXCEPTION</TechnicalLabel>
                  <span className="font-mono text-[10px] text-muted-foreground">ID: #{config.hexCode}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-destructive border border-destructive/40 px-2 py-0.5 uppercase bg-destructive/5">
                  <ShieldAlert size={12} />
                  <span>INTEGRITY_CHECK: FAILED</span>
                </div>
              </div>

              {/* Big Brutalist Error Header */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-foreground select-none leading-none">
                    {config.code}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-bold text-destructive uppercase tracking-widest">
                      // {config.badge}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground uppercase hidden sm:inline">
                      STATUS_DESCRIPTOR: 0x{config.code}_UNMAPPED
                    </span>
                  </div>
                </div>

                <GlitchText active as="h1" className="font-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
                  {config.title}
                </GlitchText>

                <p className="font-mono text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {config.subtitle}
                </p>
              </div>

              {/* System Diagnostics Terminal Window */}
              <div className="mb-8 border border-border bg-background/90 p-4 sm:p-5 font-mono text-xs shadow-inner relative group">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-primary" />
                    <span className="font-bold text-foreground">TERMINAL // DIAGNOSTIC_TELEMETRY</span>
                  </div>
                  <button 
                    onClick={copyDiagnostic}
                    className="hover:text-primary transition-colors cursor-pointer text-[10px] uppercase border border-border/60 px-1.5 py-0.5"
                    title="Copy crash dump to clipboard"
                  >
                    {terminalCopied ? '✓ COPIED' : 'COPY LOG'}
                  </button>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary select-none">&gt;</span>
                    <span><strong className="text-foreground">TARGET_COORDINATE:</strong> {currentPath || '/404'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary select-none">&gt;</span>
                    <span><strong className="text-foreground">SIGNAL_ANALYSIS:</strong> {config.diagnostic}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary select-none">&gt;</span>
                    <span><strong className="text-foreground">RECOVERY_DIRECTIVE:</strong> {config.actionHint}</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary select-none">&gt;</span>
                    <span><strong className="text-foreground">TIMESTAMP:</strong> {timestamp || 'SYNCING...'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary pt-1 font-bold">
                    <span className="select-none">&gt;</span>
                    <span>AWAITING OPERATOR INPUT</span>
                    <span className="inline-block w-2 h-3.5 bg-primary animate-pulse ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <Link
                  href="/"
                  className="group relative flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow)] transition-all hover:bg-primary/90 active:scale-[0.99] cursor-pointer"
                >
                  <Home size={16} />
                  <span>INITIALIZE RECOVERY [HOME]</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.history.length > 1) {
                      window.history.back();
                    } else {
                      window.location.href = '/';
                    }
                  }}
                  className="flex items-center justify-center gap-2 border border-border bg-secondary/80 hover:bg-secondary px-5 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground transition-all active:scale-[0.99] cursor-pointer"
                >
                  <RotateCcw size={16} />
                  <span>STEP BACK TO PREVIOUS NODE</span>
                </button>
              </div>

              {/* Quick Sector Coordinates Grid */}
              <div className="border-t border-border/80 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                    // ACCESSIBLE SECTORS IN GRID
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">STATUS: ONLINE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href="/#work"
                    className="group flex items-center justify-between border border-border/70 bg-card/60 p-2.5 font-mono text-xs text-foreground/80 hover:text-primary hover:border-primary transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>[01] WORK ARCHIVE</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </a>

                  <a
                    href="/#skills"
                    className="group flex items-center justify-between border border-border/70 bg-card/60 p-2.5 font-mono text-xs text-foreground/80 hover:text-primary hover:border-primary transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Cpu size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>[02] SKILLS MATRIX</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </a>

                  <a
                    href="/#contact"
                    className="group flex items-center justify-between border border-border/70 bg-card/60 p-2.5 font-mono text-xs text-foreground/80 hover:text-primary hover:border-primary transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Radio size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>[03] TRANSMIT COMM</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </a>
                </div>
              </div>
            </CornerBrackets>
          </div>
        </main>

        {/* Futuristic Terminal Footer Bar */}
        <footer className="relative z-20 border-t border-border/80 bg-background/80 backdrop-blur-md px-4 py-3 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-destructive" />
              <span>SYS_MONITOR // ANOMALY CONFINED</span>
              <span className="text-border">|</span>
              <span className="text-foreground/70">ALL UNRESOLVED ROUTES MONITORED</span>
            </div>
            <div className="uppercase tracking-wider">
              {siteSettings?.footer_text || `NODE_2030 // ${siteSettings?.logo_text || 'MJR JUYEL'} // ALL RIGHTS RESERVED`}
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
