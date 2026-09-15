import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/Utils/cn';
import Input from '../UI/Input';

export default function IconPicker({ value, onChange, label, error, className }) {
  const IconComponent = useMemo(() => {
    if (!value) return null;
    // Format to PascalCase just in case
    const formattedName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return LucideIcons[formattedName] || LucideIcons[value] || null;
  }, [value]);

  return (
    <div className={cn("w-full relative", className)}>
      <Input
        label={label}
        error={error}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Github, Twitter, Code..."
        className={IconComponent ? "pl-10" : ""}
      />
      {IconComponent && (
        <div className="absolute left-3 top-8 text-muted-foreground flex items-center justify-center">
          <IconComponent className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
