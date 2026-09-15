import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import RichTextEditor from '@/Components/Forms/RichTextEditor';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ project, technologies = [] }) {
  const currentTechIds = project.technologies ? project.technologies.map((t) => t.id) : [];

  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    title: project.title || '',
    slug: project.slug || '',
    short_description: project.short_description || '',
    description: project.description || '',
    thumbnail_type: project.thumbnail_type || 'upload',
    thumbnail_path: project.thumbnail_path || '',
    thumbnail: null,
    live_url: project.live_url || '',
    github_url: project.github_url || '',
    category: project.category || '',
    year: project.year || '',
    client: project.client || '',
    is_featured: Boolean(project.is_featured),
    status: project.status || 'published',
    technologies: currentTechIds,
  });

  const handleTechToggle = (techId) => {
    setData((prev) => {
      const exists = prev.technologies.includes(techId);
      return {
        ...prev,
        technologies: exists
          ? prev.technologies.filter((id) => id !== techId)
          : [...prev.technologies, techId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/dashboard/projects/${project.id}`, {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title={`Edit Project: ${project.title}`}>
      <div className="max-w-4xl">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Database
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Metadata */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
              // Core Project Specifications
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Project Title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                error={errors.title}
                required
              />

              <Input
                label="URL Slug Identifier"
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)}
                error={errors.slug}
                required
              />
            </div>

            <Textarea
              label="Brief Overview / Short Description"
              rows={3}
              value={data.short_description}
              onChange={(e) => setData('short_description', e.target.value)}
              error={errors.short_description}
            />

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2 font-mono">
                Comprehensive Case Study (Rich Text)
              </label>
              <RichTextEditor
                value={data.description}
                onChange={(val) => setData('description', val)}
                error={errors.description}
              />
            </div>
          </div>

          {/* Media Telemetry */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
              // Project Primary Visual Asset
            </h3>

            <ImageInput
              label="Thumbnail / Hero Image"
              value={data.thumbnail_path}
              type={data.thumbnail_type}
              onChange={(path, type) => {
                setData((prev) => ({
                  ...prev,
                  thumbnail_path: path,
                  thumbnail_type: type,
                }));
              }}
              onFileChange={(file) => {
                setData((prev) => ({
                  ...prev,
                  thumbnail: file,
                  thumbnail_type: 'upload',
                }));
              }}
              error={errors.thumbnail || errors.thumbnail_path}
            />
          </div>

          {/* Deployment Links & Metadata */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
              // Telemetry Endpoints & Meta
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Live Production URL"
                type="url"
                value={data.live_url}
                onChange={(e) => setData('live_url', e.target.value)}
                error={errors.live_url}
              />

              <Input
                label="Source Repository"
                type="url"
                value={data.github_url}
                onChange={(e) => setData('github_url', e.target.value)}
                error={errors.github_url}
              />

              <Input
                label="Category Tag"
                value={data.category}
                onChange={(e) => setData('category', e.target.value)}
                error={errors.category}
              />

              <Input
                label="Timeline Year"
                value={data.year}
                onChange={(e) => setData('year', e.target.value)}
                error={errors.year}
              />

              <Input
                label="Client / Organization"
                value={data.client}
                onChange={(e) => setData('client', e.target.value)}
                error={errors.client}
              />

              <Select
                label="Publication Status"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                error={errors.status}
                options={[
                  { value: 'published', label: 'Published (Publicly Visible)' },
                  { value: 'draft', label: 'Draft (Internal Review Only)' },
                  { value: 'archived', label: 'Archived (Legacy)' },
                ]}
              />
            </div>

            {/* Technologies Selector */}
            {technologies.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <label className="block text-sm font-medium text-zinc-300 mb-3 font-mono">
                  Associated Technical Stack
                </label>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => {
                    const selected = data.technologies.includes(tech.id);
                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => handleTechToggle(tech.id)}
                        className={`px-3 py-1.5 rounded font-mono text-xs border transition-all ${
                          selected
                            ? 'bg-primary text-primary-foreground border-primary font-bold'
                            : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                        }`}
                      >
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-800">
              <Switch
                label="Featured Showcase Status"
                description="Renders in prominent hero display with expanded imagery and layout"
                checked={data.is_featured}
                onChange={(val) => setData('is_featured', val)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Saving...' : 'Update Project'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
