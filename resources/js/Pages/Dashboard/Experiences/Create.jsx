import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    company: '',
    position: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    company_url: '',
    logo_type: 'upload',
    logo_path: '',
    logo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/experiences', {
      forceFormData: true,
    });
  };

  return (
    <DashboardLayout title="Register Career Position">
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
              label="Company / Studio / DAO Name"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
              error={errors.company}
              required
              placeholder="e.g. OpenAI, Neuralink, Vercel"
            />

            <Input
              label="Job Title / Role"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              error={errors.position}
              required
              placeholder="e.g. Staff Platform Engineer"
            />

            <Input
              label="Location"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              error={errors.location}
              placeholder="San Francisco, CA / Remote"
            />

            <Input
              label="Company URL"
              type="url"
              value={data.company_url}
              onChange={(e) => setData('company_url', e.target.value)}
              error={errors.company_url}
              placeholder="https://company.com"
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
            label="Key Responsibilities & Impact"
            rows={4}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            error={errors.description}
            placeholder="Engineered distributed real-time pipeline handling 200M events/day. Decreased latency by 45%..."
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
              {processing ? 'Registering...' : 'Save Position'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
