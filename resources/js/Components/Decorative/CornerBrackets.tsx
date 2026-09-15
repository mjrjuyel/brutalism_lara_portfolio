import React from 'react';
import { cn } from '@/Utils/cn';

export default function CornerBrackets({ children, className, size = 20, thickness = 2 }) {
  return (
    <div className={cn('relative p-4', className)}>
      {/* Top Left */}
      <div 
        className="absolute left-0 top-0 border-primary" 
        style={{ width: size, height: size, borderTopWidth: thickness, borderLeftWidth: thickness }} 
      />
      {/* Top Right */}
      <div 
        className="absolute right-0 top-0 border-primary" 
        style={{ width: size, height: size, borderTopWidth: thickness, borderRightWidth: thickness }} 
      />
      {/* Bottom Left */}
      <div 
        className="absolute bottom-0 left-0 border-primary" 
        style={{ width: size, height: size, borderBottomWidth: thickness, borderLeftWidth: thickness }} 
      />
      {/* Bottom Right */}
      <div 
        className="absolute bottom-0 right-0 border-primary" 
        style={{ width: size, height: size, borderBottomWidth: thickness, borderRightWidth: thickness }} 
      />
      {children}
    </div>
  );
}
