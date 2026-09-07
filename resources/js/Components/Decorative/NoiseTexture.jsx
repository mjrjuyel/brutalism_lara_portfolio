import React from 'react';
import { cn } from '@/Utils/cn';
import { useTheme } from '@/Contexts/ThemeContext';

export default function NoiseTexture({ className, opacity = 0.02 }) {
  const { theme } = useTheme();

  if (!theme?.animations?.noise) return null;

  return (
    <div className={cn('pointer-events-none fixed inset-0 z-0 h-full w-full mix-blend-overlay', className)} style={{ opacity }}>
      <svg className="h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
