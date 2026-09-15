import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import { motion } from 'motion/react';
import StatusIndicator from '../Decorative/StatusIndicator';
import TechnicalLabel from '../Decorative/TechnicalLabel';

export default function ExperienceTimeline({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Career Log" 
          number="05" 
        />
        
        <div className="relative mt-16 max-w-4xl mx-auto pl-8 md:pl-0">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2"></div>
          
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-start mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full mt-1.5 z-10">
                {exp.current && <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></span>}
              </div>
              
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} mb-4 md:mb-0`}>
                <TechnicalLabel prefix="">{exp.date_range}</TechnicalLabel>
                <h3 className="text-2xl font-black uppercase tracking-tight mt-2">{exp.position}</h3>
                <div className="flex items-center gap-3 mt-1 mb-4">
                  <span className="font-mono text-primary font-bold">{exp.company}</span>
                  {exp.current && <StatusIndicator status="busy" showLabel={false} />}
                </div>
                
                <p className="font-mono text-sm text-foreground/70 mb-4">
                  {exp.description}
                </p>
                
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, j) => (
                      <span key={tech?.id || j} className="px-2 py-1 bg-muted border border-border text-[10px] font-mono uppercase">
                        {typeof tech === 'string' ? tech : tech?.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
