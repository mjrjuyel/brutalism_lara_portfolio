import React from 'react';
import { cn } from '@/Utils/cn';
import TechnicalLabel from './TechnicalLabel';

export default function SectionHeading({ title, subtitle, number, className, align = 'left' }) {
  return (
    <div className={cn('mb-12 flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start', className)}>
      {number && (
        <TechnicalLabel className="mb-4 text-primary">
          {number}
        </TechnicalLabel>
      )}
      <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-foreground/70 font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
