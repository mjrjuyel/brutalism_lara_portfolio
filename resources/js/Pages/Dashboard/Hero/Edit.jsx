import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { Save, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function Edit({ hero }) {
  const { data, setData, post, processing, errors } = useForm({
    headline: hero?.headline || 'I BUILD DIGITAL EXPERIENCES FOR THE FUTURE.',
    subheadline: hero?.subheadline || '',
    introduction: hero?.introduction || '',
    cta_primary_text: hero?.cta_primary_text || 'View Work',
    cta_primary_url: hero?.cta_primary_url || '#work',
    cta_secondary_text: hero?.cta_secondary_text || 'Initiate Contact',
    cta_secondary_url: hero?.cta_secondary_url || '#contact',
    show_availability: hero?.show_availability ?? true,
    show_scroll_indicator: hero?.show_scroll_indicator ?? true,
    hero_image_type: hero?.hero_image_type || 'upload',
    hero_image_path: hero?.hero_image_path || '',
    hero_image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/hero', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title="Hero Section Configuration">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        
        {/* Hero Portrait Imagery Upload */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <ImageIcon className="text-primary" size={20} />
            <div>
              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                // Hero Section Visual Portrait
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Upload your picture or provide an image URL. Background is automatically removed and fitted with the holographic cyber stage on the live site.
              </p>
            </div>
          </div>

          <ImageInput
            label="Hero Portrait Image"
            type={data.hero_image_type}
            value={data.hero_image_path || (data.hero_image_type === 'upload' ? hero?.hero_image_url : '')}
            error={errors.hero_image || errors.hero_image_path}
            onChange={(val, type) => {
              setData((prev) => ({
                ...prev,
                hero_image_path: val,
                hero_image_type: type,
              }));
            }}
            onFileChange={(file) => {
              setData((prev) => ({
                ...prev,
                hero_image: file,
                hero_image_type: 'upload',
              }));
            }}
          />
        </div>

        {/* Narrative Statement */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Sparkles className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              // Primary Narrative Statement
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Oversized Headline Statement (Uppercase Recommended)"
              value={data.headline}
              onChange={(e) => setData('headline', e.target.value)}
              error={errors.headline}
              required
              placeholder="I BUILD DIGITAL EXPERIENCES FOR THE FUTURE."
            />

            <Input
              label="Secondary Headline / Tagline (Optional)"
              value={data.subheadline}
              onChange={(e) => setData('subheadline', e.target.value)}
              error={errors.subheadline}
              placeholder="Creative Developer & Systems Architect"
            />

            <Textarea
              label="Introductory Paragraph"
              rows={4}
              value={data.introduction}
              onChange={(e) => setData('introduction', e.target.value)}
              error={errors.introduction}
              placeholder="A high-impact summary of what you engineer, your core technical philosophy, and what problems you solve..."
            />
          </div>
        </div>

        {/* CTA Controls */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // Call To Action Telemetry
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 border border-zinc-800 rounded-lg bg-zinc-950/40">
              <span className="text-xs font-mono uppercase text-primary font-bold">Primary Action (Button 1)</span>
              <Input
                label="Button Text"
                value={data.cta_primary_text}
                onChange={(e) => setData('cta_primary_text', e.target.value)}
                error={errors.cta_primary_text}
              />
              <Input
                label="Target URL or Anchor (#work)"
                value={data.cta_primary_url}
                onChange={(e) => setData('cta_primary_url', e.target.value)}
                error={errors.cta_primary_url}
              />
            </div>

            <div className="space-y-4 p-4 border border-zinc-800 rounded-lg bg-zinc-950/40">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Secondary Action (Button 2)</span>
              <Input
                label="Button Text"
                value={data.cta_secondary_text}
                onChange={(e) => setData('cta_secondary_text', e.target.value)}
                error={errors.cta_secondary_text}
              />
              <Input
                label="Target URL or Anchor (#contact)"
                value={data.cta_secondary_url}
                onChange={(e) => setData('cta_secondary_url', e.target.value)}
                error={errors.cta_secondary_url}
              />
            </div>
          </div>
        </div>

        {/* Decorative Controls */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // HUD Toggles & Visuals
          </h3>

          <div className="space-y-6">
            <Switch
              label="Display Operational Availability Badge"
              description="Renders pulsing real-time availability indicator in Hero"
              checked={data.show_availability}
              onChange={(val) => setData('show_availability', val)}
            />

            <Switch
              label="Display Scroll Down Indicator"
              description="Animated monospace telemetry beacon prompting visitor to scroll"
              checked={data.show_scroll_indicator}
              onChange={(val) => setData('show_scroll_indicator', val)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Transmitting...' : 'Save Hero Specifications'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
