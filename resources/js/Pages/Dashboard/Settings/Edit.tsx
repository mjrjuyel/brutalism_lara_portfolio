import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import MJRLogo from '@/Components/MJRLogo';
import { Settings2, Save, Sparkles, Globe } from 'lucide-react';

export default function Edit({ settings }) {
  const { data, setData, post, processing, errors } = useForm({
    logo_type: settings?.logo_type || 'text',
    logo_path: settings?.logo_path || '',
    logo_text: settings?.logo_text || 'PORTFOLIO // 2030',
    logo: null,
    favicon_type: settings?.favicon_type || 'default',
    favicon_path: settings?.favicon_path || '',
    favicon: null,
    footer_text: settings?.footer_text || 'ENGINEERED WITH LARAVEL, REACT, INERTIA, AND TAILWIND CSS. ALL SYSTEMS OPERATIONAL.',
    maintenance_mode: Boolean(settings?.maintenance_mode),
    analytics_id: settings?.analytics_id || '',
    custom_css: settings?.custom_css || '',
    custom_js: settings?.custom_js || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/settings', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title="System Architecture & Settings">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Brand & Identity */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-8">
          {/* Main Brand & Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
              <Settings2 size={20} className="text-primary" />
              <div>
                <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                  // Header Brand & Logo Telemetry
                </h3>
                <p className="text-xs font-mono text-zinc-400">Manage main visual brand mark displayed in landing & dashboard headers</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Select
                label="Logo Format"
                value={data.logo_type}
                onChange={(e) => setData('logo_type', e.target.value)}
                error={errors.logo_type}
                options={[
                  { value: 'text', label: 'Monospace Text + Vector MJR Logo' },
                  { value: 'upload', label: 'Custom Graphic Upload' },
                  { value: 'url', label: 'External Graphic URL' },
                ]}
              />

              <Input
                label="Branded Text Representation"
                value={data.logo_text}
                onChange={(e) => setData('logo_text', e.target.value)}
                error={errors.logo_text}
                placeholder="e.g. PORTFOLIO // 2030"
              />
            </div>

            {data.logo_type === 'text' && (
              <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-lg flex items-center gap-4">
                <MJRLogo className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-white uppercase block">
                    Default Vector Mark: MJR Hexagonal Cyber Logo
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">
                    Displays vector cyber-brutalist monogram accompanied by text: &ldquo;{data.logo_text || 'MJR JUYEL'}&rdquo;
                  </span>
                </div>
              </div>
            )}

            {data.logo_type !== 'text' && (
              <div className="max-w-md">
                <ImageInput
                  label="Header Brand Mark Graphic"
                  value={data.logo_path}
                  type={data.logo_type}
                  onChange={(path, type) => {
                    setData((prev) => ({ ...prev, logo_path: path, logo_type: type }));
                  }}
                  onFileChange={(file) => {
                    setData((prev) => ({ ...prev, logo: file, logo_type: 'upload' }));
                  }}
                  error={errors.logo || errors.logo_path}
                />
              </div>
            )}
          </div>

          {/* Favicon & Browser Tab Identity */}
          <div className="space-y-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
              <Globe size={20} className="text-primary" />
              <div>
                <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                  // Browser Tab Icon (Favicon)
                </h3>
                <p className="text-xs font-mono text-zinc-400">Configures the favicon icon loaded in browser tabs and bookmark bars</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Select
                label="Favicon Source"
                value={data.favicon_type}
                onChange={(e) => setData('favicon_type', e.target.value)}
                error={errors.favicon_type}
                options={[
                  { value: 'default', label: 'Default Cybernetic MJR Logo (/favicon.svg)' },
                  { value: 'upload', label: 'Custom Favicon Upload (.svg, .png, .ico)' },
                  { value: 'url', label: 'External Favicon URL' },
                ]}
              />

              <div className="flex items-center">
                {data.favicon_type === 'default' ? (
                  <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg w-full">
                    <img src="/favicon.svg" alt="Default MJR Favicon" className="w-9 h-9 rounded" />
                    <div>
                      <span className="font-mono text-xs font-bold text-white block uppercase">Active: MJR SVG Favicon</span>
                      <span className="font-mono text-[10px] text-emerald-400">High-DPI Vector Crisp Resolution</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-zinc-400">
                    Custom favicon will override browser default tab icon dynamically.
                  </div>
                )}
              </div>
            </div>

            {data.favicon_type !== 'default' && (
              <div className="max-w-md">
                <ImageInput
                  label="Custom Favicon Asset"
                  value={data.favicon_path}
                  type={data.favicon_type}
                  onChange={(path, type) => {
                    setData((prev) => ({ ...prev, favicon_path: path, favicon_type: type }));
                  }}
                  onFileChange={(file) => {
                    setData((prev) => ({ ...prev, favicon: file, favicon_type: 'upload' }));
                  }}
                  error={errors.favicon || errors.favicon_path}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer & Analytics */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // Footer & Operational Metrics
          </h3>

          <div className="space-y-4">
            <Textarea
              label="Footer Transmission Note / Colophon"
              rows={3}
              value={data.footer_text}
              onChange={(e) => setData('footer_text', e.target.value)}
              error={errors.footer_text}
            />

            <Input
              label="Google Analytics / Telemetry Measurement ID"
              value={data.analytics_id}
              onChange={(e) => setData('analytics_id', e.target.value)}
              error={errors.analytics_id}
              placeholder="e.g. G-XXXXXXXXXX"
            />

            <div className="pt-2">
              <Switch
                label="Maintenance Mode"
                description="Temporarily display maintenance screen to public visitors"
                checked={data.maintenance_mode}
                onChange={(val) => setData('maintenance_mode', val)}
              />
            </div>
          </div>
        </div>

        {/* Custom Code Injections */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // Custom CSS / Script Injections
          </h3>

          <div className="space-y-4">
            <Textarea
              label="Custom CSS Overrides"
              rows={4}
              value={data.custom_css}
              onChange={(e) => setData('custom_css', e.target.value)}
              error={errors.custom_css}
              placeholder="/* Add global CSS overrides here */"
              className="font-mono text-xs"
            />

            <Textarea
              label="Custom JavaScript Injections"
              rows={4}
              value={data.custom_js}
              onChange={(e) => setData('custom_js', e.target.value)}
              error={errors.custom_js}
              placeholder="// Global tracking, audio, or canvas effects"
              className="font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Saving...' : 'Deploy Global Settings'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
