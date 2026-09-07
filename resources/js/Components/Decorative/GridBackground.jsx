import React from 'react';
import { cn } from '@/Utils/cn';

export default function GridBackground({ className, opacity = 0.03 }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      style={{ opacity }}
    >
      <div className="h-full w-full" style={{
        backgroundImage: `linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
                          linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
    </div>
  );
}
