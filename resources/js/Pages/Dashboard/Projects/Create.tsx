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

export default function Create({ technologies = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    thumbnail_type: 'upload',
    thumbnail_path: '',
    thumbnail: null,
    live_url: '',
    github_url: '',
    category: 'Full Stack Web Platform',
    year: '2026',
    client: '',
    is_featured: false,
    status: 'published',
    technologies: [],
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setData((prev) => ({ ...prev, title, slug }));
  };

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
    post('/dashboard/projects', {
      forceFormData: true,
    });
  };

  return (
    <DashboardLayout title="Create Project Specification">
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
                onChange={handleTitleChange}
                error={errors.title}
                required
                placeholder="e.g. Autonomous Trading Terminal"
              />

              <Input
                label="URL Slug Identifier"
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)}
                error={errors.slug}
                required
                placeholder="e.g. autonomous-trading-terminal"
              />
            </div>

            <Textarea
              label="Brief Overview / Short Description (1-2 sentences)"
              rows={3}
              value={data.short_description}
              onChange={(e) => setData('short_description', e.target.value)}
              error={errors.short_description}
              placeholder="High-level architectural summary displayed on public cards..."
            />

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2 font-mono">
                Comprehensive Case Study (Rich Text)
              </label>
              <RichTextEditor
                value={data.description}
                onChange={(val) => setData('description', val)}
                placeholder="Technical architecture, problem statement, solutions, benchmarks, and retrospective..."
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
                placeholder="https://app.example.com"
              />

              <Input
                label="Source Repository (GitHub / GitLab)"
                type="url"
                value={data.github_url}
                onChange={(e) => setData('github_url', e.target.value)}
                error={errors.github_url}
                placeholder="https://github.com/user/project"
              />

              <Input
                label="Category Tag"
                value={data.category}
                onChange={(e) => setData('category', e.target.value)}
                error={errors.category}
                placeholder="e.g. AI Systems / Web3 / SaaS"
              />

              <Input
                label="Project Year / Release Timeline"
                value={data.year}
                onChange={(e) => setData('year', e.target.value)}
                error={errors.year}
                placeholder="2026"
              />

              <Input
                label="Client / Organization (Optional)"
                value={data.client}
                onChange={(e) => setData('client', e.target.value)}
                error={errors.client}
                placeholder="e.g. NeuralLabs Research"
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
              {processing ? 'Registering Project...' : 'Publish Project'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
