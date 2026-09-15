import React from 'react';
import { cn } from '@/Utils/cn';

export default function StatusIndicator({ status = 'available', showLabel = true, className }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'busy':
        return { color: 'bg-yellow-500', label: 'CURRENTLY BUSY' };
      case 'unavailable':
        return { color: 'bg-red-500', label: 'UNAVAILABLE' };
      case 'available':
      default:
        return { color: 'bg-green-500', label: 'AVAILABLE FOR WORK' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative flex h-3 w-3">
        <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', config.color)}></span>
        <span className={cn('relative inline-flex rounded-full h-3 w-3', config.color)}></span>
      </div>
      {showLabel && (
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-foreground/80">
          {config.label}
        </span>
      )}
    </div>
  );
}
