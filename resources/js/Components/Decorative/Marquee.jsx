import React from 'react';
import { cn } from '@/Utils/cn';
import { motion, useReducedMotion } from 'motion/react';

export default function Marquee({ children, className, speed = '30s', direction = 'left', pauseOnHover = true }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn('overflow-hidden', className)}><div className="flex w-full">{children}</div></div>;
  }

  const animationVariant = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div className={cn('flex overflow-hidden w-full relative', className)}>
      <motion.div
        className={cn("flex min-w-full shrink-0 whitespace-nowrap", pauseOnHover ? "hover:[animation-play-state:paused]" : "")}
        animate={{ x: animationVariant }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: parseFloat(speed)
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
