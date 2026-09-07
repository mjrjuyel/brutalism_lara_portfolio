import { useState, useEffect } from 'react';

export default function useCountUp({ end, duration = 2000, start = 0, startCounting = true }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!startCounting) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime = null;
    let animationFrame;

    const easeOutQuart = (t) => 1 - --t * t * t * t;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentVal = Math.floor(easeOutQuart(percentage) * (end - start) + start);
      setCount(currentVal);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, startCounting]);

  return count;
}
