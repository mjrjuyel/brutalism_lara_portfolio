import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    position: '',
    company: '',
    content: '',
    avatar_type: 'upload',
    avatar_path: '',
    avatar: null,
    rating: 5,
    is_featured: false,
    is_active: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/testimonials', {
      forceFormData: true,
    });
  };

  return (
    <DashboardLayout title="Add Testimonial">
      <div className="max-w-2xl">
        <Link
          href="/dashboard/testimonials"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Endorsements
        </Link>

        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Author Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              required
              placeholder="e.g. Elena Rostova"
            />

            <Input
              label="Author Role"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              error={errors.position}
              placeholder="e.g. VP of Engineering"
            />

            <Input
              label="Company / Enterprise"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
              error={errors.company}
              placeholder="e.g. HyperScale Cloud"
            />

            <Select
              label="Rating Score"
              value={data.rating}
              onChange={(e) => setData('rating', parseInt(e.target.value))}
              error={errors.rating}
              options={[
                { value: 5, label: '5 Stars (Exceptional)' },
                { value: 4, label: '4 Stars (Great)' },
                { value: 3, label: '3 Stars (Good)' },
              ]}
            />
          </div>

          <Textarea
            label="Endorsement Statement"
            rows={4}
            value={data.content}
            onChange={(e) => setData('content', e.target.value)}
            error={errors.content}
            required
            placeholder="Feedback regarding code quality, velocity, problem solving, or architectural impact..."
          />

          <ImageInput
            label="Author Photo / Avatar"
            value={data.avatar_path}
            type={data.avatar_type}
            onChange={(path, type) => {
              setData((prev) => ({ ...prev, avatar_path: path, avatar_type: type }));
            }}
            onFileChange={(file) => {
              setData((prev) => ({ ...prev, avatar: file, avatar_type: 'upload' }));
            }}
            error={errors.avatar || errors.avatar_path}
          />

          <div className="pt-4 space-y-4 border-t border-zinc-800">
            <Switch
              label="Featured Testimonial"
              description="Displays prominently on public landing page"
              checked={data.is_featured}
              onChange={(val) => setData('is_featured', val)}
            />

            <Switch
              label="Active Status"
              description="Visible on public website"
              checked={data.is_active}
              onChange={(val) => setData('is_active', val)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Registering...' : 'Save Testimonial'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
