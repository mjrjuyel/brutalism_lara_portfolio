import React, { useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Button from '@/Components/UI/Button';
import { UploadCloud, Trash2, Copy, Image as ImageIcon, Check } from 'lucide-react';
import { useState } from 'react';

export default function Index({ media }) {
  const mediaList = media?.data || media || [];
  const fileInputRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);

  const { data, setData, post, processing } = useForm({
    file: null,
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    router.post('/dashboard/media', formData, {
      forceFormData: true,
      onSuccess: () => {
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
    });
  };

  const handleCopyUrl = (item) => {
    const fullUrl = item.url || `/storage/${item.path}`;
    navigator.clipboard.writeText(window.location.origin + fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    if (confirm('Permanently purge this asset from storage disk?')) {
      router.delete(`/dashboard/media/${id}`);
    }
  };

  return (
    <DashboardLayout title="Asset & Media Repository">
      <div className="max-w-6xl space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
              // Media Telemetry Storage
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Upload images, SVG diagrams, and architecture blueprints to copy public CDN endpoints.
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleUpload}
              className="hidden"
              accept="image/*,.pdf"
            />
            <Button
              type="button"
              disabled={processing}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <UploadCloud size={16} />
              {processing ? 'Transmitting Asset...' : 'Upload File to Storage'}
            </Button>
          </div>
        </div>

        {mediaList.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-16 text-center">
            <ImageIcon className="mx-auto text-zinc-600 mb-3" size={40} />
            <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">Repository Empty</h3>
            <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
              Upload visuals and graphics here to generate reusable endpoints for projects, profile assets, or article embeds.
            </p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
            >
              Upload Initial Asset
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((item) => {
              const fileUrl = item.url || `/storage/${item.path}`;
              const isImage = item.mime_type?.startsWith('image/');
              return (
                <div
                  key={item.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden group flex flex-col justify-between"
                >
                  <div className="aspect-square bg-zinc-950/80 relative flex items-center justify-center overflow-hidden p-2">
                    {isImage ? (
                      <img
                        src={fileUrl}
                        alt={item.original_filename}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="font-mono text-xs uppercase text-zinc-500 block mb-1">FILE</span>
                        <span className="font-mono text-[10px] text-zinc-400 break-all">
                          {item.original_filename}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item)}
                        className="p-2 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700 transition-colors"
                        title="Copy URL"
                      >
                        {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-zinc-800 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/40">
                    <p className="font-mono text-[11px] text-zinc-300 truncate" title={item.original_filename}>
                      {item.original_filename}
                    </p>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {(item.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
