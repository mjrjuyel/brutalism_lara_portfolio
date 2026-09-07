import React from 'react';
import { cn } from '@/Utils/cn';
import { motion } from 'motion/react';
import TechnicalLabel from './TechnicalLabel';

export default function ScrollIndicator({ className }) {
  return (
    <div className={cn('flex flex-col items-center gap-2 opacity-70', className)}>
      <TechnicalLabel prefix="" className="text-[10px] transform -rotate-90 origin-bottom mb-8">
        SCROLL
      </TechnicalLabel>
      <div className="h-16 w-[1px] bg-foreground/20 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          animate={{ y: ['-100%', '200%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
