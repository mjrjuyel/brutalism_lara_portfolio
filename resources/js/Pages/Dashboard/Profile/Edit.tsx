import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Textarea from '@/Components/UI/Textarea';
import Select from '@/Components/UI/Select';
import Button from '@/Components/UI/Button';
import ImageInput from '@/Components/Forms/ImageInput';
import { Save } from 'lucide-react';

export default function Edit({ user }) {
  const { data, setData, post, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    username: user.username || '',
    title: user.title || '',
    bio: user.bio || '',
    location: user.location || '',
    phone: user.phone || '',
    website: user.website || '',
    availability: user.availability || 'available',
    years_of_experience: user.years_of_experience || 0,
    profile_image_type: user.profile_image_type || 'upload',
    profile_image_path: user.profile_image_path || '',
    profile_image: null,
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/profile', {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <DashboardLayout title="Developer Identity & Profile">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Basic Identity */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight mb-6 pb-4 border-b border-zinc-800">
            // Core Identity Specifications
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="System Username / Handle"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              error={errors.username}
              placeholder="e.g. cyber_architect"
            />
            <Input
              label="Professional Headline / Title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              error={errors.title}
              placeholder="e.g. Lead Creative Technologist & Systems Architect"
            />
          </div>
        </div>

        {/* Bio & Availability */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight mb-6 pb-4 border-b border-zinc-800">
            // Bio & Operational Status
          </h3>

          <div className="space-y-6">
            <Textarea
              label="Personal Biography / Statement"
              rows={5}
              value={data.bio}
              onChange={(e) => setData('bio', e.target.value)}
              error={errors.bio}
              placeholder="Detailed introduction to your philosophy, engineering mindset, and creative experience..."
            />

            <div className="grid sm:grid-cols-3 gap-6">
              <Select
                label="Current Availability"
                value={data.availability}
                onChange={(e) => setData('availability', e.target.value)}
                error={errors.availability}
                options={[
                  { value: 'available', label: 'Available for Work / Contract' },
                  { value: 'busy', label: 'Currently Occupied / Limited Capacity' },
                  { value: 'unavailable', label: 'Unavailable / Offline' },
                ]}
              />

              <Input
                label="Years of Experience"
                type="number"
                min="0"
                max="100"
                value={data.years_of_experience}
                onChange={(e) => setData('years_of_experience', parseInt(e.target.value) || 0)}
                error={errors.years_of_experience}
              />

              <Input
                label="Physical / Grid Location"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                error={errors.location}
                placeholder="e.g. Tokyo / Decentralized"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Direct Phone (Optional)"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                error={errors.phone}
                placeholder="+1 (555) 019-2831"
              />

              <Input
                label="Personal Website URL"
                type="url"
                value={data.website}
                onChange={(e) => setData('website', e.target.value)}
                error={errors.website}
                placeholder="https://future.dev"
              />
            </div>
          </div>
        </div>

        {/* Profile Imagery & Documents */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight mb-6 pb-4 border-b border-zinc-800">
            // Profile Media & Documents
          </h3>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <ImageInput
                label="Profile Avatar / Photograph"
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

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1 font-mono">
                Curriculum Vitae (PDF / DOCX)
              </label>
              <div className="p-6 border-2 border-dashed border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors bg-zinc-950/50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setData('resume', e.target.files[0])}
                  className="w-full text-xs font-mono text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                />
                {user.resume_path && (
                  <p className="mt-3 text-xs font-mono text-emerald-400">
                    Current document registered: {user.resume_path.split('/').pop()}
                  </p>
                )}
                {errors.resume && (
                  <p className="mt-2 text-xs font-mono text-red-400">{errors.resume}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Transmitting Data...' : 'Save Profile Specifications'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
