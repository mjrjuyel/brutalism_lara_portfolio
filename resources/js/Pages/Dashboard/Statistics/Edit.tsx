import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Input from '@/Components/UI/Input';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import SortableList from '@/Components/Forms/SortableList';
import { Plus, Trash2, Edit2, BarChart3, Save, X } from 'lucide-react';

export default function Edit({ statistics = [] }) {
  const [list, setList] = useState(statistics);
  const [editingId, setEditingId] = useState(null);

  // New stat form
  const createForm = useForm({
    label: '',
    value: '05+',
    suffix: '+',
    numeric_value: 5,
    icon: '',
    is_active: true,
  });

  // Edit stat form
  const editForm = useForm({
    label: '',
    value: '',
    suffix: '',
    numeric_value: 0,
    icon: '',
    is_active: true,
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createForm.post('/dashboard/statistics', {
      onSuccess: () => {
        createForm.reset();
      },
    });
  };

  const startEdit = (stat) => {
    setEditingId(stat.id);
    editForm.setData({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || '',
      numeric_value: stat.numeric_value || 0,
      icon: stat.icon || '',
      is_active: Boolean(stat.is_active),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editForm.put(`/dashboard/statistics/${editingId}`, {
      onSuccess: () => setEditingId(null),
    });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this telemetry statistic counter?')) {
      router.delete(`/dashboard/statistics/${id}`);
    }
  };

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/statistics/reorder', {
      ids: newItems.map((item) => item.id),
    });
  };

  return (
    <DashboardLayout title="Telemetry Metrics & Counters">
      <div className="grid lg:grid-cols-12 gap-8 max-w-6xl">
        {/* Left: Current Stats / Reorder */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight mb-2">
              // Live Portfolio Counter Array
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">
              Drag to reorder counters as they appear on the public About section.
            </p>

            {list.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 font-mono text-xs">
                No active counters registered.
              </div>
            ) : (
              <SortableList
                items={list}
                onReorder={handleReorder}
                renderItem={(stat) => (
                  <div className="flex items-center justify-between py-2 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-primary">
                        {stat.numeric_value}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white">{stat.value}</span>
                          <span className="font-mono text-xs text-zinc-300">{stat.label}</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500">
                          Animates up to: {stat.numeric_value} {stat.suffix}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(stat)}
                        className="p-1.5 text-zinc-400 hover:text-white"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(stat.id)}
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

          {/* Edit Inline Box if editing */}
          {editingId && (
            <form onSubmit={handleUpdate} className="bg-zinc-900 border border-primary/40 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono text-primary font-bold uppercase">Editing Metric #{editingId}</span>
                <button type="button" onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Display Value (e.g. 05+)"
                  value={editForm.data.value}
                  onChange={(e) => editForm.setData('value', e.target.value)}
                  error={editForm.errors.value}
                  required
                />
                <Input
                  label="Counter Target Number"
                  type="number"
                  value={editForm.data.numeric_value}
                  onChange={(e) => editForm.setData('numeric_value', parseInt(e.target.value) || 0)}
                  error={editForm.errors.numeric_value}
                  required
                />
                <Input
                  label="Metric Label"
                  value={editForm.data.label}
                  onChange={(e) => editForm.setData('label', e.target.value)}
                  error={editForm.errors.label}
                  required
                />
                <Input
                  label="Suffix (+, %, k)"
                  value={editForm.data.suffix}
                  onChange={(e) => editForm.setData('suffix', e.target.value)}
                  error={editForm.errors.suffix}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={editForm.processing}>
                  Update Metric
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Add New Metric */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCreate} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight flex items-center gap-2 mb-4">
              <Plus size={16} className="text-primary" />
              Register New Counter
            </h3>

            <Input
              label="Metric Label (e.g. Years Experience)"
              value={createForm.data.label}
              onChange={(e) => createForm.setData('label', e.target.value)}
              error={createForm.errors.label}
              required
              placeholder="Years Experience"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Display String"
                value={createForm.data.value}
                onChange={(e) => createForm.setData('value', e.target.value)}
                error={createForm.errors.value}
                required
                placeholder="05+"
              />

              <Input
                label="Numeric Target"
                type="number"
                value={createForm.data.numeric_value}
                onChange={(e) => createForm.setData('numeric_value', parseInt(e.target.value) || 0)}
                error={createForm.errors.numeric_value}
                required
                placeholder="5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Suffix (e.g. +)"
                value={createForm.data.suffix}
                onChange={(e) => createForm.setData('suffix', e.target.value)}
                error={createForm.errors.suffix}
                placeholder="+"
              />

              <Input
                label="Icon (Optional)"
                value={createForm.data.icon}
                onChange={(e) => createForm.setData('icon', e.target.value)}
                error={createForm.errors.icon}
                placeholder="code"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={createForm.processing} className="w-full">
                Add Counter Metric
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
