import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ item }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    company: item.company || '',
    position: item.position || '',
    location: item.location || '',
    start_date: item.start_date ? item.start_date.substring(0, 10) : '',
    end_date: item.end_date ? item.end_date.substring(0, 10) : '',
    is_current: Boolean(item.is_current),
    description: item.description || '',
    company_url: item.company_url || '',
    logo_type: item.logo_type || 'upload',
    logo_path: item.logo_path || '',
    logo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/dashboard/experiences/${item.id}`, {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title={`Edit Experience: ${item.company}`}>
      <div className="max-w-3xl">
        <Link
          href="/dashboard/experiences"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Registry
        </Link>

        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
              error={errors.company}
              required
            />

            <Input
              label="Role / Position"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              error={errors.position}
              required
            />

            <Input
              label="Location"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              error={errors.location}
            />

            <Input
              label="Company URL"
              type="url"
              value={data.company_url}
              onChange={(e) => setData('company_url', e.target.value)}
              error={errors.company_url}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Start Date"
              type="date"
              value={data.start_date}
              onChange={(e) => setData('start_date', e.target.value)}
              error={errors.start_date}
              required
            />

            {!data.is_current && (
              <Input
                label="End Date"
                type="date"
                value={data.end_date}
                onChange={(e) => setData('end_date', e.target.value)}
                error={errors.end_date}
              />
            )}
          </div>

          <Switch
            label="Current Position"
            description="I am actively working in this capacity"
            checked={data.is_current}
            onChange={(val) => setData('is_current', val)}
          />

          <Textarea
            label="Description & Achievements"
            rows={4}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            error={errors.description}
          />

          <ImageInput
            label="Company Brand / Logo"
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

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Saving...' : 'Update Position'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
