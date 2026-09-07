import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import SectionHeading from '../Decorative/SectionHeading';
import CornerBrackets from '../Decorative/CornerBrackets';
import TechnicalLabel from '../Decorative/TechnicalLabel';
import SocialLinks from './SocialLinks';
import GlitchText from '../Decorative/GlitchText';
import { MapPin, Mail, Clock } from 'lucide-react';

export default function Contact({ profile, socialLinks }) {
  const [submitted, setSubmitted] = useState(false);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('portfolio.contact'), {
      preserveScroll: true,
      onSuccess: () => {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      },
    });
  };

  return (
    <section id="contact" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Establish Link" 
          number="09" 
        />
        
        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          <div>
            <CornerBrackets className="p-8 bg-card h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-primary/20 flex items-center justify-center rounded-full mb-6 text-primary border border-primary">
                    <Mail size={32} />
                  </div>
                  <GlitchText active as="h3" className="text-2xl font-black uppercase text-primary mb-2">
                    MESSAGE TRANSMITTED
                  </GlitchText>
                  <p className="font-mono text-foreground/70">Awaiting response from entity.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-6">
                  <TechnicalLabel>COMMUNICATION_PROTOCOL</TechnicalLabel>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-xs uppercase text-foreground/70">IDENTIFIER [NAME]</label>
                      <input 
                        id="name" type="text" 
                        className="bg-background border border-border p-3 font-mono text-sm focus:border-primary focus:outline-none transition-colors" 
                        value={data.name} onChange={e => setData('name', e.target.value)} required 
                      />
                      {errors.name && <span className="font-mono text-xs text-destructive">{errors.name}</span>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-xs uppercase text-foreground/70">RETURN_ADDRESS [EMAIL]</label>
                      <input 
                        id="email" type="email" 
                        className="bg-background border border-border p-3 font-mono text-sm focus:border-primary focus:outline-none transition-colors" 
                        value={data.email} onChange={e => setData('email', e.target.value)} required 
                      />
                      {errors.email && <span className="font-mono text-xs text-destructive">{errors.email}</span>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="font-mono text-xs uppercase text-foreground/70">TRANSMISSION_SUBJECT</label>
                    <input 
                      id="subject" type="text" 
                      className="bg-background border border-border p-3 font-mono text-sm focus:border-primary focus:outline-none transition-colors" 
                      value={data.subject} onChange={e => setData('subject', e.target.value)} required 
                    />
                    {errors.subject && <span className="font-mono text-xs text-destructive">{errors.subject}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-mono text-xs uppercase text-foreground/70">PAYLOAD [MESSAGE]</label>
                    <textarea 
                      id="message" rows={6} 
                      className="bg-background border border-border p-3 font-mono text-sm focus:border-primary focus:outline-none transition-colors resize-none" 
                      value={data.message} onChange={e => setData('message', e.target.value)} required 
                    />
                    {errors.message && <span className="font-mono text-xs text-destructive">{errors.message}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={processing}
                    className="mt-4 bg-primary text-primary-foreground font-mono font-bold uppercase py-4 px-8 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processing ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                  </button>
                </form>
              )}
            </CornerBrackets>
          </div>
          
          <div className="flex flex-col gap-12 justify-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted border border-border text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <TechnicalLabel className="block mb-1">DIRECT_LINK</TechnicalLabel>
                  <a href={`mailto:${profile?.email}`} className="text-xl font-bold uppercase hover:text-primary transition-colors">
                    {profile?.email || 'contact@example.com'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted border border-border text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <TechnicalLabel className="block mb-1">COORDINATES</TechnicalLabel>
                  <div className="text-xl font-bold uppercase">
                    {profile?.location || 'EARTH_BASE'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted border border-border text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <TechnicalLabel className="block mb-1">AVAILABILITY</TechnicalLabel>
                  <div className="text-xl font-bold uppercase">
                    {profile?.availability || 'AVAILABLE FOR NEW PROJECTS'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border">
              <TechnicalLabel className="block mb-6">EXTERNAL_NODES</TechnicalLabel>
              <SocialLinks links={socialLinks} size="lg" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
