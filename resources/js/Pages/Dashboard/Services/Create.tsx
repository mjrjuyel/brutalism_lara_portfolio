import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    icon: 'cpu',
    price_label: 'From $5k',
    is_featured: false,
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/services');
  };

  return (
    <DashboardLayout title="Create Service Offering">
      <div className="max-w-2xl">
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Services
        </Link>

        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <Input
            label="Service Title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            error={errors.title}
            required
            placeholder="e.g. Distributed Systems Architecture & Consulting"
          />

          <Textarea
            label="Comprehensive Service Description"
            rows={4}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            error={errors.description}
            required
            placeholder="Detailed description of what you deliver, your methodology, tooling, and turnaround expectations..."
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Price Label / Engagement Scope"
              value={data.price_label}
              onChange={(e) => setData('price_label', e.target.value)}
              error={errors.price_label}
              placeholder="e.g. From $8,000 or Retainer"
            />

            <Input
              label="Lucide Icon Tag"
              value={data.icon}
              onChange={(e) => setData('icon', e.target.value)}
              error={errors.icon}
              placeholder="e.g. layout, terminal, cpu, shield"
            />
          </div>

          <div className="pt-4 space-y-4 border-t border-zinc-800">
            <Switch
              label="Featured Service"
              description="Displays with highlighted brutalist borders on public cards"
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

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Registering...' : 'Save Service'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
