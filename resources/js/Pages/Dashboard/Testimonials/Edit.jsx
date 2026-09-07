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

export default function Edit({ item }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: item.name || '',
    position: item.position || '',
    company: item.company || '',
    content: item.content || '',
    avatar_type: item.avatar_type || 'upload',
    avatar_path: item.avatar_path || '',
    avatar: null,
    rating: item.rating || 5,
    is_featured: Boolean(item.is_featured),
    is_active: Boolean(item.is_active),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/dashboard/testimonials/${item.id}`, {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title={`Edit Testimonial: ${item.name}`}>
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
            />

            <Input
              label="Author Role"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              error={errors.position}
            />

            <Input
              label="Company / Enterprise"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
              error={errors.company}
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
              {processing ? 'Saving...' : 'Update Testimonial'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
