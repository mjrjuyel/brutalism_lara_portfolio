import React from 'react';
import { cn } from '@/Utils/cn';

export default function TechnicalLabel({ children, className, prefix = '//' }) {
  return (
    <span className={cn('font-mono text-xs tracking-widest text-foreground/50 uppercase', className)}>
      {prefix} {children}
    </span>
  );
}
