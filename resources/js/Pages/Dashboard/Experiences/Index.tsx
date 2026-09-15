import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SortableList from '@/Components/Forms/SortableList';
import { Plus, Edit2, Trash2, Briefcase, ExternalLink } from 'lucide-react';

export default function Index({ items = [] }) {
  const [list, setList] = useState(items);

  const handleReorder = (newItems) => {
    setList(newItems);
    router.post('/dashboard/experiences/reorder', {
      ids: newItems.map((item) => item.id),
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Permanently remove this career timeline entry?')) {
      router.delete(`/dashboard/experiences/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <DashboardLayout title="Career Trajectory & Experience">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Career Timeline Registry
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Drag items to order chronology on the public futuristic timeline.
          </p>
        </div>

        <Link
          href="/dashboard/experiences/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Add Position
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
          <Briefcase className="mx-auto text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Experience Logged</h3>
          <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
            Log your engineering leadership, staff positions, contractor roles, and ventures.
          </p>
          <Link
            href="/dashboard/experiences/create"
            className="px-4 py-2 bg-zinc-800 text-white font-mono text-xs uppercase rounded hover:bg-zinc-700"
          >
            Add First Position
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
                  {item.logo_url || item.logo_path ? (
                    <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img src={item.logo_url || item.logo_path} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 shrink-0">
                      <Briefcase size={18} />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{item.position}</span>
                      <span className="text-xs font-mono text-primary font-medium">@ {item.company}</span>
                      {item.is_current ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          CURRENT
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs font-mono text-zinc-400">
                      <span>{item.start_date ? item.start_date.substring(0, 7) : ''} — {item.is_current ? 'Present' : (item.end_date ? item.end_date.substring(0, 7) : '')}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.company_url && (
                    <a
                      href={item.company_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-zinc-500 hover:text-zinc-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <Link
                    href={`/dashboard/experiences/${item.id}/edit`}
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
