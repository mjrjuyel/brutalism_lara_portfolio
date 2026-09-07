import React from 'react';
import { cn } from '@/Utils/cn';
import { useTheme } from '@/Contexts/ThemeContext';
import { motion } from 'motion/react';

export default function ScanLines({ className, speed = '8s' }) {
  const { theme } = useTheme();

  if (!theme?.animations?.scanlines) return null;

  return (
    <div className={cn('pointer-events-none fixed inset-0 z-50 overflow-hidden', className)}>
      <motion.div
        className="h-1 w-full bg-primary/20 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{
          repeat: Infinity,
          duration: parseFloat(speed),
          ease: "linear"
        }}
      />
    </div>
  );
}
