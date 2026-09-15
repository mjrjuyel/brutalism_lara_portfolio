import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import Hero from '@/Components/Portfolio/Hero';
import About from '@/Components/Portfolio/About';
import Skills from '@/Components/Portfolio/Skills';
import Projects from '@/Components/Portfolio/Projects';
import ExperienceTimeline from '@/Components/Portfolio/ExperienceTimeline';
import Education from '@/Components/Portfolio/Education';
import Services from '@/Components/Portfolio/Services';
import Testimonials from '@/Components/Portfolio/Testimonials';
import Contact from '@/Components/Portfolio/Contact';

export default function Index({
  profile,
  hero,
  about,
  statistics,
  skillCategories,
  projects,
  experiences,
  educations,
  services,
  testimonials,
  socialLinks,
  seo,
  siteSettings,
  theme,
  isPreview = false,
}) {
  return (
    <PortfolioLayout
      seo={seo}
      siteSettings={siteSettings}
      activeTheme={theme?.active_theme}
      allowVisitorSwitching={theme?.allow_visitor_switching ?? true}
    >
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-primary text-primary-foreground font-mono text-xs py-1.5 px-4 text-center font-bold tracking-widest uppercase shadow-md flex items-center justify-between">
          <span>// PREVIEW MODE ACTIVE — LIVE DATABASE DRAFT</span>
          <a
            href="/dashboard"
            className="underline hover:opacity-80 transition-opacity"
          >
            Return to Dashboard →
          </a>
        </div>
      )}

      {/* Hero Section */}
      <Hero hero={hero} profile={profile} socialLinks={socialLinks} />

      {/* Featured & All Projects */}
      {projects && projects.length > 0 && (
        <Projects projects={projects} />
      )}

      {/* About & Philosophy & Stats */}
      <About about={about} profile={profile} statistics={statistics} />

      {/* Skills Matrix */}
      {skillCategories && skillCategories.length > 0 && (
        <Skills skillCategories={skillCategories} />
      )}

      {/* Experience Timeline */}
      {experiences && experiences.length > 0 && (
        <ExperienceTimeline experiences={experiences} />
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <Education educations={educations} />
      )}

      {/* Services */}
      {services && services.length > 0 && (
        <Services services={services} />
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <Testimonials testimonials={testimonials} />
      )}

      {/* Futuristic Contact */}
      <Contact profile={profile} socialLinks={socialLinks} />
    </PortfolioLayout>
  );
}
