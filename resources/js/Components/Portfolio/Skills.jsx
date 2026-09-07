import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import SkillMeter from './SkillMeter';

export default function Skills({ skillCategories }) {
  if (!skillCategories || skillCategories.length === 0) return null;

  return (
    <section id="skills" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Technical Capabilities" 
          number="03" 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
          {skillCategories.map((category, i) => (
            <div key={i} className="flex flex-col gap-6">
              <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-primary border-b border-border pb-4">
                {category.name}
              </h3>
              <div className="flex flex-col gap-4">
                {category.skills?.map((skill, j) => (
                  <SkillMeter 
                    key={j}
                    name={skill.name}
                    percentage={skill.percentage}
                    years={skill.years}
                    featured={skill.featured}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
