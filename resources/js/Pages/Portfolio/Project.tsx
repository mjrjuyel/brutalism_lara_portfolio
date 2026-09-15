import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import Badge from '@/Components/UI/Badge';
import { ExternalLink, Github, ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export default function Project({ project, seo, siteSettings }) {
  const thumbUrl = project.thumbnail_url || project.thumbnail_path;

  return (
    <PortfolioLayout
      seo={{
        title: `${project.title} — Project Case Study`,
        description: project.short_description,
        og_image: thumbUrl,
      }}
      siteSettings={siteSettings}
    >
      <div className="container mx-auto px-6 py-20">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Return to Archive
        </Link>

        {/* Header */}
        <div className="max-w-4xl">
          <TechnicalLabel prefix="//">PROJECT_SPECIFICATION.{project.year || '2030'}</TechnicalLabel>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mt-4 mb-6 leading-tight">
            {project.title}
          </h1>

          {project.short_description && (
            <p className="font-mono text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              {project.short_description}
            </p>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 my-8 border-y border-border">
            {project.category && (
              <div>
                <span className="font-mono text-xs text-foreground/50 uppercase block mb-1">Category</span>
                <span className="font-mono font-bold text-sm text-foreground">{project.category}</span>
              </div>
            )}
            {project.year && (
              <div>
                <span className="font-mono text-xs text-foreground/50 uppercase block mb-1">Timeline</span>
                <span className="font-mono font-bold text-sm text-foreground">{project.year}</span>
              </div>
            )}
            {project.client && (
              <div>
                <span className="font-mono text-xs text-foreground/50 uppercase block mb-1">Client</span>
                <span className="font-mono font-bold text-sm text-foreground">{project.client}</span>
              </div>
            )}
            <div>
              <span className="font-mono text-xs text-foreground/50 uppercase block mb-1">Status</span>
              <span className="font-mono font-bold text-xs uppercase text-primary tracking-wider">
                ● {project.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <span>Deploy System Live</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card text-foreground font-mono font-bold text-xs uppercase tracking-wider hover:bg-muted transition-colors"
              >
                <span>Source Repository</span>
                <Github size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {thumbUrl && (
          <div className="my-12">
            <CornerBrackets size={32} thickness={3} className="p-2 sm:p-4">
              <div className="relative w-full aspect-video bg-muted overflow-hidden border border-border">
                <img
                  src={thumbUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CornerBrackets>
          </div>
        )}

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="my-12 max-w-4xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4">
              Engineered With
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-3 py-1.5 font-mono text-xs bg-muted border border-border text-foreground tracking-wider uppercase"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Long Description */}
        {project.description && (
          <div className="max-w-4xl my-16 border-t border-border pt-12">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 font-mono">
              // Architectural Deep Dive
            </h2>
            <div
              className="prose prose-lg prose-invert max-w-none font-mono text-foreground/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="my-16 border-t border-border pt-12">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 font-mono">
              // Visual Telemetry & Artifacts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.images.map((img) => (
                <div key={img.id} className="border border-border bg-card p-2">
                  <img
                    src={img.image_url || img.image_path}
                    alt={img.caption || 'Project visual'}
                    className="w-full aspect-video object-cover"
                  />
                  {img.caption && (
                    <p className="font-mono text-xs text-foreground/60 p-2 uppercase">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PortfolioLayout>
  );
}
