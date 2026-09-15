import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create({ categories = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    skill_category_id: categories[0]?.id || '',
    name: '',
    icon: '',
    percentage: 85,
    experience_years: 3,
    is_featured: false,
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/skills');
  };

  return (
    <DashboardLayout title="Register Technical Skill">
      <div className="max-w-2xl">
        <Link
          href="/dashboard/skills"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Registry
        </Link>

        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <Input
              label="Skill Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              required
              placeholder="e.g. React.js, Rust, Docker, Kubernetes"
            />

            <Select
              label="Skill Category"
              value={data.skill_category_id}
              onChange={(e) => setData('skill_category_id', e.target.value)}
              error={errors.skill_category_id}
              required
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Proficiency Percentage (0-100)"
                type="number"
                min="0"
                max="100"
                value={data.percentage}
                onChange={(e) => setData('percentage', parseInt(e.target.value) || 0)}
                error={errors.percentage}
                required
              />

              <Input
                label="Experience in Years"
                type="number"
                min="0"
                max="50"
                value={data.experience_years}
                onChange={(e) => setData('experience_years', parseInt(e.target.value) || 0)}
                error={errors.experience_years}
              />
            </div>

            <Input
              label="Lucide Icon Tag / Identifier (Optional)"
              value={data.icon}
              onChange={(e) => setData('icon', e.target.value)}
              error={errors.icon}
              placeholder="e.g. code, cpu, database, terminal"
            />

            <div className="pt-4 space-y-4 border-t border-zinc-800">
              <Switch
                label="Mark as Featured Skill"
                description="Highlight prominently with glowing accent borders in skills matrix"
                checked={data.is_featured}
                onChange={(val) => setData('is_featured', val)}
              />

              <Switch
                label="Active Status"
                description="Visible on the public portfolio"
                checked={data.is_active}
                onChange={(val) => setData('is_active', val)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Saving...' : 'Register Skill'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
