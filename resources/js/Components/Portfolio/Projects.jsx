import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import ProjectCard from './ProjectCard';

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Executed Projects" 
          number="04" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, i) => (
            <ProjectCard 
              key={i} 
              project={project} 
              index={i + 1} 
              featured={project.featured}
              className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
