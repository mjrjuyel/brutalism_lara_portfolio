import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SortableList from '@/Components/Forms/SortableList';
import Button from '@/Components/UI/Button';
import { Plus, Edit2, Trash2, Folder, ExternalLink, Star } from 'lucide-react';

export default function Index({ projects = [] }) {
  const [projectList, setProjectList] = useState(projects);

  const handleReorder = (newItems) => {
    setProjectList(newItems);
    router.post('/dashboard/projects/reorder', {
      ids: newItems.map((item) => item.id),
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Permanently decommission and delete this project and associated telemetry?')) {
      router.delete(`/dashboard/projects/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <DashboardLayout title="Projects & Engineering Showcases">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Project Database
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Drag to sort project display order. Featured projects receive hero-scale presentation.
          </p>
        </div>

        <Link
          href="/dashboard/projects/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      {projectList.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
          <Folder className="mx-auto text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Projects Registered</h3>
          <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
            Begin showcasing your applications, open-source libraries, client platforms, and experiments.
          </p>
          <Link
            href="/dashboard/projects/create"
            className="px-4 py-2 bg-zinc-800 text-white font-mono text-xs uppercase rounded hover:bg-zinc-700"
          >
            Create First Project
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          <SortableList
            items={projectList}
            onReorder={handleReorder}
            renderItem={(project) => {
              const thumb = project.thumbnail_url || project.thumbnail_path;
              return (
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center gap-4">
                    {thumb ? (
                      <div className="w-16 h-12 rounded bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-500 shrink-0">
                        NO_IMG
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">{project.title}</span>
                        {project.is_featured ? (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                            <Star size={10} /> FEATURED
                          </span>
                        ) : null}
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          project.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400 mt-1 line-clamp-1">
                        {project.short_description || 'No description entered.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link
                      href={`/dashboard/projects/${project.id}/edit`}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
