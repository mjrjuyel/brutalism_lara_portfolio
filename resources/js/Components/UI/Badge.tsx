import React from 'react';
import { cn } from '@/Utils/cn';

const badgeVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'text-foreground border border-border',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  success: 'bg-green-500/15 text-green-600 border border-green-500/20 dark:text-green-400',
};

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
