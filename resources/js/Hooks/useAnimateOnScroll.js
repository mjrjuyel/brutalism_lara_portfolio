import { useState, useEffect, useRef } from 'react';

export default function useAnimateOnScroll(options = {}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, isInView];
}
