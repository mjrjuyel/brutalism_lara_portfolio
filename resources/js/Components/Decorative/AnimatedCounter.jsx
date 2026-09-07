import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/Utils/cn';
import { useInView, useMotionValue, useSpring } from 'motion/react';

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration
  });

  useEffect(() => {
    if (isInView) {
      const num = typeof value === 'number' ? value : (parseInt(value, 10) || 0);
      motionValue.set(num);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className={cn('font-mono font-bold tracking-tight', className)}>
      {prefix}{displayValue}{suffix}
    </div>
  );
}
