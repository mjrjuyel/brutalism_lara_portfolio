import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/Utils/cn';

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
  ghost: 'hover:bg-muted text-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-8 text-lg',
};

const Button = forwardRef(
  ({ className, variant = 'default', size = 'md', asChild = false, disabled, children, type = 'button', ...props }, ref) => {
    const Comp = asChild ? motion.div : motion.button;
    
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 select-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;
