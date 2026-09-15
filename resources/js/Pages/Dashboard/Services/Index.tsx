import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SortableList from '@/Components/Forms/SortableList';
import { Plus, Edit2, Trash2, Settings, Star } from 'lucide-react';

export default function Index({ items = [] }) {
  const [list, setList] = useState(items);

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/services/reorder', {
      ids: newItems.map((item) => item.id),
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this service capability?')) {
      router.delete(`/dashboard/services/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <DashboardLayout title="Engineering Services & Offerings">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Client Capabilities & Services
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Contract offerings, architectural consulting, full stack development, and design services.
          </p>
        </div>

        <Link
          href="/dashboard/services/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Add Service
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
          <Settings className="mx-auto text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Services Defined</h3>
          <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
            Define the solutions you provide for organizations, founders, and enterprises.
          </p>
          <Link
            href="/dashboard/services/create"
            className="px-4 py-2 bg-zinc-800 text-white font-mono text-xs uppercase rounded hover:bg-zinc-700"
          >
            Create First Service
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          <SortableList
            items={list}
            onReorder={handleReorder}
            renderItem={(item) => (
              <div className="flex items-center justify-between py-2 px-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0">
                    <Settings size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{item.title}</span>
                      {item.is_featured ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <Star size={10} /> FEATURED
                        </span>
                      ) : null}
                      {item.price_label && (
                        <span className="text-xs font-mono text-primary font-bold">
                          {item.price_label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/services/${item.id}/edit`}
                    className="p-1.5 text-zinc-400 hover:text-white"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
