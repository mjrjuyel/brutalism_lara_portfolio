import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SortableList from '@/Components/Forms/SortableList';
import { Plus, Edit2, Trash2, MessageSquare, Star } from 'lucide-react';

export default function Index({ items = [] }) {
  const [list, setList] = useState(items);

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/testimonials/reorder', {
      ids: newItems.map((item) => item.id),
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Permanently remove this testimonial?')) {
      router.delete(`/dashboard/testimonials/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <DashboardLayout title="Endorsements & Testimonials">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Client Endorsements
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Drag to order testimonials on public marquee and cards.
          </p>
        </div>

        <Link
          href="/dashboard/testimonials/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Add Testimonial
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
          <MessageSquare className="mx-auto text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Testimonials Logged</h3>
          <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
            Add recommendations from CTOs, product leads, co-founders, and engineering directors.
          </p>
          <Link
            href="/dashboard/testimonials/create"
            className="px-4 py-2 bg-zinc-800 text-white font-mono text-xs uppercase rounded hover:bg-zinc-700"
          >
            Add First Testimonial
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
                  {item.avatar_url || item.avatar_path ? (
                    <img
                      src={item.avatar_url || item.avatar_path}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{item.name}</span>
                      <span className="text-xs font-mono text-zinc-400">
                        {item.position} @ {item.company}
                      </span>
                      {item.rating && (
                        <span className="text-xs font-mono text-amber-400 flex items-center gap-0.5">
                          ★ {item.rating}/5
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-zinc-300 mt-1 line-clamp-1 italic">
                      "{item.content}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/testimonials/${item.id}/edit`}
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
