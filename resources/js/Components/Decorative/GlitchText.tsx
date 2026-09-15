import React from 'react';
import { cn } from '@/Utils/cn';
import { useTheme } from '@/Contexts/ThemeContext';

export default function GlitchText({ children, className, as: Component = 'span', active = false, onHover = true }) {
  const { theme } = useTheme();
  
  if (!theme?.animations?.glitch) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component 
      className={cn(
        'relative inline-block',
        onHover ? 'hover:animate-glitch group-hover:animate-glitch' : '',
        active ? 'animate-glitch' : '',
        className
      )}
      data-text={typeof children === 'string' ? children : ''}
    >
      <span className="relative z-10">{children}</span>
      <span className={cn(
        "absolute left-0 top-0 z-0 -translate-x-[2px] text-primary opacity-70 mix-blend-screen",
        (onHover || active) ? "hidden group-hover:block" : "hidden"
      )} aria-hidden="true">{children}</span>
      <span className={cn(
        "absolute left-0 top-0 z-0 translate-x-[2px] text-destructive opacity-70 mix-blend-screen",
        (onHover || active) ? "hidden group-hover:block" : "hidden"
      )} aria-hidden="true">{children}</span>
    </Component>
  );
}
