import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import Marquee from '../Decorative/Marquee';
import { Star } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <SectionHeading 
          title="Client Feedback" 
          number="08" 
        />
      </div>
      
      <Marquee speed="45s" pauseOnHover={true}>
        <div className="flex gap-6 px-4">
          {testimonials.map((test, i) => {
            const avatar = test.avatar_url || (test.avatar_type === 'url' ? test.avatar_path : (test.avatar_path ? `/storage/${test.avatar_path}` : null));
            return (
              <div 
                key={test.id || i} 
                className="w-[360px] md:w-[420px] whitespace-normal border border-border bg-card p-6 md:p-8 flex flex-col justify-between relative shrink-0 select-text"
              >
                <div className="absolute top-4 right-4 text-primary/20 font-serif text-5xl select-none pointer-events-none">
                  &ldquo;
                </div>
                
                <div className="flex mb-4 text-primary">
                  {[...Array(Number(test.rating) || 5)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" className="mr-1" />
                  ))}
                </div>
                
                <p className="font-mono text-sm text-foreground/80 mb-6 leading-relaxed whitespace-normal break-words flex-grow">
                  &ldquo;{test.content}&rdquo;
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
                  <div className="w-10 h-10 bg-muted border border-border flex-shrink-0 flex items-center justify-center font-mono font-bold text-xs uppercase text-foreground/70 overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt={test.name} className="w-full h-full object-cover grayscale" />
                    ) : (
                      <span>{test.name ? test.name.charAt(0) : '?'}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-tight truncate text-foreground">{test.name}</h4>
                    <div className="font-mono text-xs text-foreground/50 truncate">
                      {test.position} {test.company && `@ ${test.company}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Marquee>
    </section>
  );
}

