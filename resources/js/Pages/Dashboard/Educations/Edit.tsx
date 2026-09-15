import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ item }) {
  const { data, setData, put, processing, errors } = useForm({
    institution: item.institution || '',
    degree: item.degree || '',
    field: item.field || '',
    start_date: item.start_date ? item.start_date.substring(0, 10) : '',
    end_date: item.end_date ? item.end_date.substring(0, 10) : '',
    description: item.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/dashboard/educations/${item.id}`);
  };

  return (
    <DashboardLayout title={`Edit Education: ${item.institution}`}>
      <div className="max-w-2xl">
        <Link
          href="/dashboard/educations"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Education
        </Link>

        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <Input
            label="Institution / University Name"
            value={data.institution}
            onChange={(e) => setData('institution', e.target.value)}
            error={errors.institution}
            required
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Degree"
              value={data.degree}
              onChange={(e) => setData('degree', e.target.value)}
              error={errors.degree}
              required
            />

            <Input
              label="Field of Study"
              value={data.field}
              onChange={(e) => setData('field', e.target.value)}
              error={errors.field}
              required
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

            <Input
              label="End Date"
              type="date"
              value={data.end_date}
              onChange={(e) => setData('end_date', e.target.value)}
              error={errors.end_date}
            />
          </div>

          <Textarea
            label="Honors, Thesis, or Coursework"
            rows={3}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            error={errors.description}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
              <Save size={16} />
              {processing ? 'Saving...' : 'Update Education'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
