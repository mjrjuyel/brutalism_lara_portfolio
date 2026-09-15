import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SortableList from '@/Components/Forms/SortableList';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';
import { Plus, Edit2, Trash2, Zap, Layers } from 'lucide-react';

export default function Index({ skills = [] }) {
  const [skillList, setSkillList] = useState(skills);

  const handleReorder = (newItems) => {
    setSkillList(newItems);
    router.post('/dashboard/skills/reorder', {
      ids: newItems.map((item) => item.id),
    }, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you wish to delete this skill telemetry record?')) {
      router.delete(`/dashboard/skills/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <DashboardLayout title="Technical Capabilities & Skills">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Skill Registry
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Drag items by handle to adjust render hierarchy on public HUD.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/skill-categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase rounded hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <Layers size={16} /> Categories
          </Link>
          <Link
            href="/dashboard/skills/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} /> Add Skill
          </Link>
        </div>
      </div>

      {skillList.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
          <Zap className="mx-auto text-zinc-600 mb-3" size={36} />
          <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Skills Registered</h3>
          <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
            Populate your technical arsenal with languages, frameworks, databases, and DevOps capabilities.
          </p>
          <Link
            href="/dashboard/skills/create"
            className="px-4 py-2 bg-zinc-800 text-white font-mono text-xs uppercase rounded hover:bg-zinc-700"
          >
            Create Initial Skill
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          <SortableList
            items={skillList}
            onReorder={handleReorder}
            renderItem={(skill) => (
              <div className="flex items-center justify-between py-2 px-3">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{skill.name}</span>
                      {skill.is_featured ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          FEATURED
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs font-mono text-zinc-400">
                      <span>Category: {skill.category?.name || 'Unassigned'}</span>
                      <span>•</span>
                      <span>Experience: {skill.experience_years ? `${skill.experience_years} yrs` : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right font-mono text-xs hidden sm:block">
                    <span className="text-primary font-bold">{skill.percentage}%</span>
                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/skills/${skill.id}/edit`}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
