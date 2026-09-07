import React from 'react';
import { cn } from '@/Utils/cn';

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      {icon && (
        <div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}
