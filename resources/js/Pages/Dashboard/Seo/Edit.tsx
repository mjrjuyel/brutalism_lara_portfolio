import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { Search, Save } from 'lucide-react';

export default function Edit({ seo }) {
  const { data, setData, post, processing, errors } = useForm({
    site_title: seo?.site_title || 'Developer Portfolio // 2030',
    meta_description: seo?.meta_description || '',
    keywords: seo?.keywords || '',
    canonical_url: seo?.canonical_url || '',
    robots: seo?.robots || 'index, follow',
    og_image_type: seo?.og_image_type || 'upload',
    og_image_path: seo?.og_image_path || '',
    og_image: null,
    favicon: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/seo', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title="Search Optimization & OpenGraph Metadata">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Search size={20} className="text-primary" />
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              // Meta Tags & Indexing Configuration
            </h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Default Site Title"
              value={data.site_title}
              onChange={(e) => setData('site_title', e.target.value)}
              error={errors.site_title}
              placeholder="Full Stack Creative Technologist Portfolio"
            />

            <Textarea
              label="Meta Description"
              rows={3}
              value={data.meta_description}
              onChange={(e) => setData('meta_description', e.target.value)}
              error={errors.meta_description}
              placeholder="High-converting summary displayed on Google search results (150-160 chars recommended)..."
            />

            <Input
              label="Keywords (Comma separated)"
              value={data.keywords}
              onChange={(e) => setData('keywords', e.target.value)}
              error={errors.keywords}
              placeholder="Laravel, React, Inertia, Full Stack Developer, Systems Architect"
            />

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Canonical URL"
                type="url"
                value={data.canonical_url}
                onChange={(e) => setData('canonical_url', e.target.value)}
                error={errors.canonical_url}
                placeholder="https://portfolio.dev"
              />

              <Select
                label="Robots Directives"
                value={data.robots}
                onChange={(e) => setData('robots', e.target.value)}
                error={errors.robots}
                options={[
                  { value: 'index, follow', label: 'index, follow (Standard Public Indexing)' },
                  { value: 'noindex, nofollow', label: 'noindex, nofollow (Private / Staging)' },
                  { value: 'index, nofollow', label: 'index, nofollow' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Social Sharing & Favicon */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // OpenGraph Social Share Card & Favicon
          </h3>

          <div className="grid sm:grid-cols-2 gap-8">
            <ImageInput
              label="OpenGraph Social Banner (1200x630)"
              value={data.og_image_path}
              type={data.og_image_type}
              onChange={(path, type) => {
                setData((prev) => ({ ...prev, og_image_path: path, og_image_type: type }));
              }}
              onFileChange={(file) => {
                setData((prev) => ({ ...prev, og_image: file, og_image_type: 'upload' }));
              }}
              error={errors.og_image || errors.og_image_path}
            />

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-mono">
                Browser Favicon (.ico / .png)
              </label>
              <div className="p-6 border-2 border-dashed border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors bg-zinc-950/50">
                <input
                  type="file"
                  accept="image/x-icon,image/png"
                  onChange={(e) => setData('favicon', e.target.files[0])}
                  className="w-full text-xs font-mono text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                />
                {seo?.favicon_path && (
                  <p className="mt-3 text-xs font-mono text-emerald-400">
                    Active favicon installed.
                  </p>
                )}
                {errors.favicon && (
                  <p className="mt-2 text-xs font-mono text-red-400">{errors.favicon}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Saving...' : 'Deploy SEO Parameters'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
