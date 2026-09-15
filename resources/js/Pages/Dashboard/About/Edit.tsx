import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Textarea from '@/Components/UI/Textarea';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import RichTextEditor from '@/Components/Forms/RichTextEditor';
import { Save, Info } from 'lucide-react';

export default function Edit({ about }) {
  const { data, setData, post, processing, errors } = useForm({
    content: about?.content || '',
    philosophy: about?.philosophy || '',
    profile_image_type: about?.profile_image_type || 'upload',
    profile_image_path: about?.profile_image_path || '',
    profile_image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/about', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title="About Section & Narrative">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Narrative & Philosophy */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Info className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              // Philosophy & Mission Statement
            </h3>
          </div>

          <div className="space-y-6">
            <Textarea
              label="Core Philosophy / Manifesto Quote"
              rows={3}
              value={data.philosophy}
              onChange={(e) => setData('philosophy', e.target.value)}
              error={errors.philosophy}
              placeholder="e.g. Code is not just syntax; it is architectural expression of future human-machine symbiosis."
            />

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2 font-mono">
                Comprehensive Bio & Technical Background (Rich Text)
              </label>
              <RichTextEditor
                value={data.content}
                onChange={(content) => setData('content', content)}
                placeholder="Share your technical background, journey, engineering ethos, and what drives you..."
                error={errors.content}
              />
            </div>
          </div>
        </div>

        {/* Section Imagery */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight pb-4 border-b border-zinc-800">
            // About Section Visual Artifact
          </h3>

          <div className="max-w-xl">
            <ImageInput
              label="Secondary Portrait or Architectural Visual"
              value={data.profile_image_path}
              type={data.profile_image_type}
              onChange={(path, type) => {
                setData((prev) => ({
                  ...prev,
                  profile_image_path: path,
                  profile_image_type: type,
                }));
              }}
              onFileChange={(file) => {
                setData((prev) => ({
                  ...prev,
                  profile_image: file,
                  profile_image_type: 'upload',
                }));
              }}
              error={errors.profile_image || errors.profile_image_path}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Transmitting Data...' : 'Save About Settings'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
