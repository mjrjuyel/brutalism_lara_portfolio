import React from 'react';
import SectionHeading from '../Decorative/SectionHeading';
import ServiceCard from './ServiceCard';

export default function Services({ services }) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-24 relative bg-muted/5">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Offered Services" 
          number="07" 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
