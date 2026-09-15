import React from 'react';
import { cn } from '@/Utils/cn';
import { motion, useReducedMotion } from 'motion/react';

export default function AnimatedText({ text, className, as: Component = 'span', delay = 0, duration = 0.05, wordByWord = false }) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion || !text) {
    return <Component className={className}>{text}</Component>;
  }

  const items = wordByWord ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    }
  };

  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.span key={index} variants={child} className={wordByWord ? 'mr-1' : ''}>
          {item === ' ' && !wordByWord ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
