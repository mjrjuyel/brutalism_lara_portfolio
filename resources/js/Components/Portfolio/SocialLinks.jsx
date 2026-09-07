import React from 'react';
import { cn } from '@/Utils/cn';
import { Github, Linkedin, Twitter, Dribbble, Instagram, Globe } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
  instagram: Instagram,
  website: Globe,
};

export default function SocialLinks({ links, className, size = 'md', variant = 'default' }) {
  if (!links || links.length === 0) return null;

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const variantClasses = {
    default: 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground',
    outline: 'border border-border bg-transparent text-foreground hover:border-primary hover:text-primary',
  };

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {links.map((link, i) => {
        const Icon = iconMap[link.platform?.toLowerCase()] || Globe;
        return (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className={cn(
              'transition-all duration-300 flex items-center justify-center',
              sizeClasses[size],
              variantClasses[variant]
            )}
          >
            <Icon size={iconSizes[size]} />
          </a>
        );
      })}
    </div>
  );
}
