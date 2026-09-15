import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import { motion } from 'motion/react';

export default function Education({ educations }) {
  if (!educations || educations.length === 0) return null;

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeading 
          title="Academic Records" 
          number="06" 
        />
        
        <div className="grid gap-8 mt-16">
          {educations.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:border-primary/50 transition-colors"
            >
              <div className="flex-shrink-0 font-mono text-sm text-primary md:w-32 pt-1">
                {edu.dates}
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase">{edu.degree}</h3>
                <div className="font-mono text-foreground/80 mt-1 mb-4">{edu.institution}</div>
                {edu.description && (
                  <p className="font-mono text-sm text-foreground/60">{edu.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
