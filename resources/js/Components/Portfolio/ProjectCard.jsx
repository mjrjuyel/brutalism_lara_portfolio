import React from 'react';
import { cn } from '@/Utils/cn';
import { motion } from 'motion/react';
import TechnicalLabel from '../Decorative/TechnicalLabel';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project, index, featured, className }) {
  const num = String(index).padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('group relative flex flex-col border border-border bg-card overflow-hidden hover:border-primary transition-colors duration-300', className)}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-muted-foreground">NO_IMAGE_DATA</div>
        )}
        <div className="absolute top-4 left-4 bg-background/90 px-2 py-1 border border-border font-mono text-xs">
          PROJ.{num}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <TechnicalLabel prefix="">{project.category || 'SOFTWARE'}</TechnicalLabel>
          <span className="font-mono text-xs text-foreground/50">{project.year}</span>
        </div>
        
        <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-foreground/70 font-mono text-sm mb-6 flex-grow">
          {project.description}
        </p>
        
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={tech?.id || i} className="px-2 py-1 bg-muted font-mono text-[10px] uppercase text-foreground/80">
                {typeof tech === 'string' ? tech : tech?.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-muted font-mono text-[10px] uppercase text-foreground/80">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs hover:text-primary transition-colors">
              <ExternalLink size={14} /> LIVE_PREVIEW
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs hover:text-primary transition-colors">
              <Github size={14} /> REPOSITORY
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
