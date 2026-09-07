import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import CornerBrackets from '../Decorative/CornerBrackets';
import AnimatedCounter from '../Decorative/AnimatedCounter';

export default function About({ about, profile, statistics }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="About Entity" 
          number="02" 
          subtitle="System specifications and philosophy." 
        />
        
        <div className="grid md:grid-cols-12 gap-12 mt-16">
          <div className="md:col-span-5">
            <CornerBrackets className="p-4 inline-block">
              <div className="w-full aspect-square bg-muted relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {(profile?.profile_image_url || about?.profile_image_url || profile?.avatar_url) ? (
                  <img src={profile?.profile_image_url || about?.profile_image_url || profile?.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-muted-foreground">IMAGE_NOT_FOUND</div>
                )}
              </div>
            </CornerBrackets>
          </div>
          
          <div className="md:col-span-7 flex flex-col gap-8 justify-center">
            {about?.content && (
              <div 
                className="prose prose-invert max-w-none font-mono text-foreground/80"
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            )}
            
            {about?.philosophy && (
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-4">
                <p className="text-xl font-medium italic text-foreground/90">"{about.philosophy}"</p>
              </blockquote>
            )}
            
            {statistics && statistics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8 border-t border-border pt-8">
                {statistics.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      className="text-4xl lg:text-5xl font-black text-primary" 
                    />
                    <span className="font-mono text-sm uppercase text-foreground/60 mt-2">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
