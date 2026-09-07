import React from 'react';
import { cn } from '@/Utils/cn';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function SkillMeter({ name, percentage, icon, years, featured, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          {featured && <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
          <span className="font-mono font-medium text-foreground uppercase">{name}</span>
        </div>
        <div className="font-mono text-xs text-foreground/50">
          {years && <span className="mr-3">{years} YRS</span>}
          <span>{percentage}%</span>
        </div>
      </div>
      <div className="h-2 w-full bg-muted overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}
