import React, { forwardRef } from 'react';
import { cn } from '@/Utils/cn';

const Textarea = forwardRef(({ label, error, className, rows = 4, id, ...props }, ref) => {
  const textareaId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-zinc-700/80 bg-zinc-900/90 px-3 py-2 text-sm font-mono text-zinc-100 font-medium ring-offset-background placeholder:text-zinc-500 placeholder:italic placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors selection:bg-emerald-500 selection:text-black selection:font-bold",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
