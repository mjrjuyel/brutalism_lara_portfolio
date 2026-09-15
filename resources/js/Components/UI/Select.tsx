import React, { forwardRef } from 'react';
import { cn } from '@/Utils/cn';

const Select = forwardRef(({ label, error, options = [], className, id, ...props }, ref) => {
  const selectId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
