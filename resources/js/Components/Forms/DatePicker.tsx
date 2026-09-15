import React from 'react';
import Input from '../UI/Input';
import { cn } from '@/Utils/cn';

export default function DatePicker({ value, onChange, label, error, className, ...props }) {
  return (
    <Input
      type="date"
      label={label}
      value={value || ''}
      onChange={onChange}
      error={error}
      className={cn("appearance-none", className)}
      {...props}
    />
  );
}
