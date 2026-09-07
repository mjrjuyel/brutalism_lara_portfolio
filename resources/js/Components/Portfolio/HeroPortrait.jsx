import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CornerBrackets from '../Decorative/CornerBrackets';
import { removeImageBackground } from '@/Utils/imageProcessor';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';

export default function HeroPortrait({ profile, hero }) {
  const originalSrc = hero?.hero_image_url 
    || (hero?.hero_image_type === 'url' ? hero?.hero_image_path : '')
    || profile?.profile_image_url 
    || profile?.avatar_url 
    || '';
  const [displaySrc, setDisplaySrc] = useState(originalSrc);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('cutout'); // 'cutout' | 'hologram'

  useEffect(() => {
    if (!originalSrc) return;

    let isMounted = true;
    setIsProcessing(true);

    removeImageBackground(originalSrc, { threshold: 30, feather: 12 })
      .then((processedUrl) => {
        if (isMounted) {
          setDisplaySrc(processedUrl);
          setIsProcessing(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setDisplaySrc(originalSrc);
          setIsProcessing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [originalSrc]);

  if (!originalSrc) return null;

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* 1. Outer Brutalist Framing */}
      <CornerBrackets 
        size={36} 
        thickness={3} 
        className="p-3 sm:p-5 lg:p-6"
      >
        {/* Main Stage Canvas Frame */}
        <div className="relative w-72 h-[420px] sm:w-84 sm:h-[480px] lg:w-[410px] lg:h-[530px] overflow-hidden border border-border/80 bg-card/60 backdrop-blur-md shadow-[var(--shadow)]">
          
          {/* =========================================
              LAYER A: BEAUTIFUL CYBERPUNK BACKGROUND
             ========================================= */}
          
          {/* 1. Pulsing Ambient Core Aura / Lens Glow */}
          <div 
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse"
            style={{
              background: 'radial-gradient(circle, var(--primary) 0%, var(--accent) 45%, transparent 75%)'
            }}
          />

          {/* 2. Holographic Cyber Rotating HUD Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Dashed Orbit Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border border-dashed border-primary/25 flex items-center justify-center"
            >
              {/* Cardinal Coordinate Markers */}
              <div className="absolute -top-2 px-1.5 bg-background font-mono text-[8px] text-primary/70">000°</div>
              <div className="absolute -bottom-2 px-1.5 bg-background font-mono text-[8px] text-primary/70">180°</div>
              <div className="absolute -left-2 px-1.5 bg-background font-mono text-[8px] text-primary/70">270°</div>
              <div className="absolute -right-2 px-1.5 bg-background font-mono text-[8px] text-primary/70">090°</div>
            </motion.div>

            {/* Inner Segmented Counter-Rotating Geometric Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-primary/20"
              style={{
                boxShadow: '0 0 25px rgba(var(--color-primary-rgb, 0 255 65), 0.15)',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-r-2 border-primary" />
            </motion.div>
          </div>

          {/* 3. Tech Background Grid Pattern & Horizon Matrix */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
                                linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />

          {/* 4. Illuminated Horizon Stage Pedestal */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent border-b-2 border-primary pointer-events-none z-10" />


          {/* =========================================
              LAYER B: ISOLATED CUTOUT PORTRAIT
             ========================================= */}
          <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <img
                src={displaySrc}
                alt={profile.name || 'Hero portrait'}
                className="max-h-[92%] w-auto max-w-[96%] object-contain object-bottom select-none transition-all duration-300"
                style={{
                  filter: mode === 'hologram' 
                    ? 'drop-shadow(0 0 25px var(--primary)) contrast(120%) brightness(110%)'
                    : 'drop-shadow(0 0 20px rgba(var(--color-primary-rgb, 0 255 65), 0.35))',
                  maskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
                  mixBlendMode: mode === 'hologram' ? 'screen' : 'normal',
                }}
              />

              {/* Holographic Scanline Overlay on Subject */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-primary) 3px, var(--color-primary) 4px)',
                  backgroundSize: '100% 6px',
                }}
              />
            </motion.div>
          </div>

          {/* Processing Scanner Beam */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ y: [0, 480, 0] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_var(--primary)] z-30 pointer-events-none"
              >
                <div className="absolute right-2 -top-5 font-mono text-[9px] text-primary uppercase font-bold tracking-wider">
                  SCANNING_SUBJECT...
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* =========================================
              LAYER C: FLOATING TELEMETRY HUD LABELS
             ========================================= */}
          
          {/* Top Left: Identification Chip */}
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 bg-background/85 border border-primary/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase">
              {profile?.name ? profile.name.split(' ')[0] : 'OPERATOR'} // ON-LINE
            </span>
          </div>

          {/* Top Right: System Status */}
          <div className="absolute top-3 right-3 z-30 px-2 py-1 bg-background/85 border border-border/80 font-mono text-[9px] text-muted-foreground uppercase tracking-wider backdrop-blur-md">
            CORE_V2.5
          </div>

          {/* Bottom Left: Location Coordinate Tag */}
          <div className="absolute bottom-3 left-3 z-30 px-2 py-1 bg-background/90 border border-border/80 font-mono text-[9px] text-foreground/80 tracking-widest uppercase backdrop-blur-md">
            {profile?.location || 'DHAKA // BANGLADESH'}
          </div>

          {/* Bottom Right: Interactive Vibe Switcher */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 bg-background/90 border border-border/80 p-0.5 backdrop-blur-md pointer-events-auto">
            <button
              type="button"
              onClick={() => setMode('cutout')}
              className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                mode === 'cutout'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Clean Subject Cutout"
            >
              CUTOUT
            </button>
            <button
              type="button"
              onClick={() => setMode('hologram')}
              className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'hologram'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Holographic Vibe"
            >
              <Sparkles size={10} />
              HOLO
            </button>
          </div>

        </div>
      </CornerBrackets>
    </div>
  );
}
