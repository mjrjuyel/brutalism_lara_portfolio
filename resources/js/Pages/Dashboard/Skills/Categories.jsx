import React, { useState } from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';
import SortableList from '@/Components/Forms/SortableList';
import { ArrowLeft, Plus, Trash2, Edit2, Layers, X } from 'lucide-react';

export default function Categories({ categories = [] }) {
  const [list, setList] = useState(categories);
  const [editingId, setEditingId] = useState(null);

  const createForm = useForm({
    name: '',
    slug: '',
  });

  const editForm = useForm({
    name: '',
    slug: '',
  });

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    createForm.setData({ name, slug });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createForm.post('/dashboard/skill-categories', {
      onSuccess: () => createForm.reset(),
    });
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    editForm.setData({
      name: cat.name,
      slug: cat.slug,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editForm.put(`/dashboard/skill-categories/${editingId}`, {
      onSuccess: () => setEditingId(null),
    });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this category? Associated skills will also be removed.')) {
      router.delete(`/dashboard/skill-categories/${id}`);
    }
  };

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/skill-categories/reorder', {
      ids: newItems.map((item) => item.id),
    });
  };

  return (
    <DashboardLayout title="Skill Category Classifications">
      <div className="max-w-5xl">
        <Link
          href="/dashboard/skills"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={14} /> Back to Skill Registry
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight mb-2">
                // Category Architecture
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                Drag to reorder category hierarchy on the public skills matrix.
              </p>

              {list.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 font-mono text-xs">
                  No skill categories created yet.
                </div>
              ) : (
                <SortableList
                  items={list}
                  onReorder={handleReorder}
                  renderItem={(cat) => (
                    <div className="flex items-center justify-between py-2 px-3">
                      <div className="flex items-center gap-3">
                        <Layers size={16} className="text-primary" />
                        <div>
                          <span className="font-mono text-sm font-bold text-white">{cat.name}</span>
                          <span className="font-mono text-xs text-zinc-500 ml-2">({cat.skills_count || 0} skills)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(cat)}
                          className="p-1.5 text-zinc-400 hover:text-white"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id)}
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
                  <span className="text-xs font-mono text-primary font-bold uppercase">Edit Category #{editingId}</span>
                  <button type="button" onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Category Name"
                    value={editForm.data.name}
                    onChange={(e) => editForm.setData('name', e.target.value)}
                    error={editForm.errors.name}
                    required
                  />
                  <Input
                    label="Slug"
                    value={editForm.data.slug}
                    onChange={(e) => editForm.setData('slug', e.target.value)}
                    error={editForm.errors.slug}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={editForm.processing}>
                    Update Category
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleCreate} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight flex items-center gap-2 mb-4">
                <Plus size={16} className="text-primary" />
                Define Category
              </h3>

              <Input
                label="Category Name"
                value={createForm.data.name}
                onChange={handleNameChange}
                error={createForm.errors.name}
                required
                placeholder="e.g. Frontend Architecture"
              />

              <Input
                label="Slug Identifier"
                value={createForm.data.slug}
                onChange={(e) => createForm.setData('slug', e.target.value)}
                error={createForm.errors.slug}
                required
                placeholder="frontend-architecture"
              />

              <div className="pt-2">
                <Button type="submit" disabled={createForm.processing} className="w-full">
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
