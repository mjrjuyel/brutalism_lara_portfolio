import { useRef, useState, useEffect } from 'react';

export default function useMagneticButton() {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.2; // Adjust multiplier for stronger/weaker effect
    const y = (clientY - (top + height / 2)) * 0.2;

    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setTransform({ x: 0, y: 0 });
  };

  const style = !prefersReducedMotion ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: 'transform 0.1s ease-out'
  } : {};

  return { ref, handleMouseMove, handleMouseLeave, transform: style };
}
