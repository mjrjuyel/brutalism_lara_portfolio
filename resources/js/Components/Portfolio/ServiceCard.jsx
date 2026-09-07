import React from 'react';
import { cn } from '@/Utils/cn';
import { motion } from 'motion/react';
import TechnicalLabel from '../Decorative/TechnicalLabel';
import CornerBrackets from '../Decorative/CornerBrackets';
import { Code, Layout, Server, Database, Smartphone, Zap } from 'lucide-react';

const iconMap = {
  code: Code,
  layout: Layout,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  zap: Zap
};

export default function ServiceCard({ service, index }) {
  const num = String(index).padStart(2, '0');
  const Icon = iconMap[service.icon?.toLowerCase()] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative bg-card border p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(var(--color-primary-rgb),0.3)]",
        service.featured ? "border-primary" : "border-border hover:border-primary/50"
      )}
    >
      {service.featured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground font-mono text-[10px] font-bold px-3 py-1 uppercase">
          RECOMMENDED
        </div>
      )}
      
      <TechnicalLabel className="mb-8">SVC.{num}</TechnicalLabel>
      
      <div className="mb-6 text-primary">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
      
      <p className="font-mono text-sm text-foreground/70 flex-grow mb-6">
        {service.description}
      </p>
      
      {service.price && (
        <div className="pt-4 border-t border-border font-mono font-bold text-lg mt-auto">
          {service.price}
        </div>
      )}
    </motion.div>
  );
}
