import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import SortableList from '@/Components/Forms/SortableList';
import { Plus, Trash2, Edit2, Share2, ExternalLink, X } from 'lucide-react';

const platforms = [
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
];

export default function Edit({ socialLinks = [] }) {
  const [list, setList] = useState(socialLinks);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setList(socialLinks);
  }, [socialLinks]);

  const createForm = useForm({
    platform: 'github',
    url: '',
    is_active: true,
  });

  const editForm = useForm({
    platform: 'github',
    url: '',
    is_active: true,
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createForm.post('/dashboard/social-links', {
      onSuccess: () => createForm.reset(),
    });
  };

  const startEdit = (link) => {
    setEditingId(link.id);
    editForm.setData({
      platform: link.platform,
      url: link.url,
      is_active: Boolean(link.is_active),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editForm.put(`/dashboard/social-links/${editingId}`, {
      onSuccess: () => setEditingId(null),
    });
  };

  const handleToggle = (link) => {
    setList((prev) =>
      prev.map((item) => (item.id === link.id ? { ...item, is_active: !item.is_active } : item))
    );
    router.patch(`/dashboard/social-links/${link.id}/toggle`, {}, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Remove this social platform link?')) {
      router.delete(`/dashboard/social-links/${id}`);
    }
  };

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/social-links/reorder', {
      ids: newItems.map((item) => item.id),
    });
  };

  return (
    <DashboardLayout title="Social Channels & Telemetry Links">
      <div className="grid lg:grid-cols-12 gap-8 max-w-6xl">
        {/* Left: Current links */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight mb-2">
              // Active Social Channel Network
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Toggle visibility or drag to arrange priority in Hero and Navigation.
            </p>

            {list.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 font-mono text-xs">
                No social channels connected.
              </div>
            ) : (
              <SortableList
                items={list}
                onReorder={handleReorder}
                renderItem={(link) => (
                  <div className="flex items-center justify-between py-2.5 px-3">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={Boolean(link.is_active)}
                        onChange={() => handleToggle(link)}
                        className="scale-90"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white uppercase">{link.platform}</span>
                          {!link.is_active && (
                            <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 bg-zinc-800 rounded">Inactive</span>
                          )}
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 line-clamp-1"
                        >
                          <span>{link.url}</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(link)}
                        className="p-1.5 text-zinc-400 hover:text-white"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(link.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              />
            )}
          </div>

          {editingId && (
            <form onSubmit={handleUpdate} className="bg-zinc-900 border border-primary/40 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono text-primary font-bold uppercase">Modify Link #{editingId}</span>
                <button type="button" onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <Select
                label="Platform"
                value={editForm.data.platform}
                onChange={(e) => editForm.setData('platform', e.target.value)}
                options={platforms}
                required
              />

              <Input
                label="Endpoint URL"
                type="url"
                value={editForm.data.url}
                onChange={(e) => editForm.setData('url', e.target.value)}
                error={editForm.errors.url}
                required
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={editForm.processing}>
                  Update Link
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Connect New Channel */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCreate} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight flex items-center gap-2 mb-4">
              <Plus size={16} className="text-primary" />
              Connect Platform
            </h3>

            <Select
              label="Select Channel"
              value={createForm.data.platform}
              onChange={(e) => createForm.setData('platform', e.target.value)}
              options={platforms}
              required
            />

            <Input
              label="Profile URL Endpoint"
              type="url"
              value={createForm.data.url}
              onChange={(e) => createForm.setData('url', e.target.value)}
              error={createForm.errors.url}
              required
              placeholder="https://github.com/username"
            />

            <div className="pt-2">
              <Button type="submit" disabled={createForm.processing} className="w-full">
                Connect Channel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
