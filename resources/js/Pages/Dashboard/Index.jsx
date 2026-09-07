import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { 
  Folder, Zap, Mail, Eye, Plus, ArrowUpRight, 
  Sparkles, Palette, Settings2, User 
} from 'lucide-react';

export default function Index({ stats }) {
  const statCards = [
    { label: 'Total Projects', value: stats.total_projects, icon: Folder, href: '/dashboard/projects', color: 'text-blue-400' },
    { label: 'Technical Skills', value: stats.total_skills, icon: Zap, href: '/dashboard/skills', color: 'text-amber-400' },
    { label: 'Unread Transmissions', value: stats.unread_messages, icon: Mail, href: '/dashboard/messages', color: 'text-rose-400', alert: stats.unread_messages > 0 },
    { label: 'Featured Showcases', value: stats.total_views, icon: Eye, href: '/dashboard/projects', color: 'text-emerald-400' },
  ];

  const quickActions = [
    { label: 'Create Project', href: '/dashboard/projects/create', icon: Plus },
    { label: 'Add New Skill', href: '/dashboard/skills/create', icon: Plus },
    { label: 'Customize Theme', href: '/dashboard/theme', icon: Palette },
    { label: 'Tune Hero Section', href: '/dashboard/hero', icon: Sparkles },
    { label: 'Update Profile', href: '/dashboard/profile', icon: User },
    { label: 'System Settings', href: '/dashboard/settings', icon: Settings2 },
  ];

  return (
    <DashboardLayout title="Mission Control">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-800 rounded-xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
            System Online // 2030 Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2 tracking-tight">
            Developer Portfolio CMS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono">
            Full dynamic control over public portfolio architecture, multi-theme engine, project telemetry, and communication streams.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/dashboard/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black font-mono font-bold text-xs uppercase px-4 py-2.5 rounded hover:bg-zinc-200 transition-colors"
            >
              <span>Live Preview Window</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-800 text-white border border-zinc-700 font-mono text-xs uppercase px-4 py-2.5 rounded hover:bg-zinc-700 transition-colors"
            >
              <span>Public Endpoint</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider">{card.label}</span>
              <div className={`p-2 rounded-lg bg-zinc-800/80 ${card.color}`}>
                <card.icon size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">{card.value}</span>
              {card.alert && (
                <span className="text-xs font-mono text-rose-400 uppercase tracking-widest bg-rose-500/10 px-1.5 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Launchpad & Section Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
          <h3 className="font-mono text-sm uppercase tracking-wider text-zinc-300 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Quick Deployment Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-start p-4 rounded-lg bg-zinc-800/40 border border-zinc-800/80 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left group"
              >
                <action.icon size={18} className="text-zinc-400 group-hover:text-white mb-2 transition-colors" />
                <span className="text-xs font-mono text-zinc-200 group-hover:text-white font-medium">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-zinc-300 font-bold mb-3 flex items-center gap-2">
              <Palette size={16} className="text-primary" />
              Theme Architecture
            </h3>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-4">
              5 built-in futuristic design systems: Cyber Brutalism, Mono Brutal, Digital Terminal, Acid Future, and Minimal Future. Fully data-token driven.
            </p>
          </div>
          <Link
            href="/dashboard/theme"
            className="w-full text-center py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors"
          >
            Manage Active Theme →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
