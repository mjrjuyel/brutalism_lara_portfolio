import React, { useState } from 'react';
import { cn } from '@/Utils/cn';
import { AnimatePresence, motion } from 'motion/react';

export default function Tooltip({ children, content, position = 'top', className }) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrows = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-card border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-card border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-card border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-card border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 rounded-md bg-card border border-border px-2 py-1 text-xs text-card-foreground shadow-sm whitespace-nowrap",
              positions[position],
              className
            )}
          >
            {content}
            <div 
              className={cn(
                "absolute border-4",
                arrows[position]
              )} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
