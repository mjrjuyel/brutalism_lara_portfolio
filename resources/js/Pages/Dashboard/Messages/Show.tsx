import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Button from '@/Components/UI/Button';
import { ArrowLeft, Trash2, Mail, Calendar, User } from 'lucide-react';

export default function Show({ message }) {
  const handleDelete = () => {
    if (confirm('Delete this message?')) {
      router.delete(`/dashboard/messages/${message.id}`);
    }
  };

  return (
    <DashboardLayout title={`Transmission: ${message.name}`}>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Transmission Log
          </Link>

          <Button variant="destructive" size="sm" onClick={handleDelete} className="flex items-center gap-1.5">
            <Trash2 size={14} /> Delete
          </Button>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Header info */}
          <div className="border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              Status // Read & Decrypted
            </span>
            <h2 className="text-2xl font-black text-white font-mono uppercase tracking-tight mt-3">
              {message.subject || 'Inquiry Regarding Digital Collaboration'}
            </h2>

            <div className="flex flex-wrap gap-4 mt-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-zinc-500" />
                <span className="text-white font-bold">{message.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-zinc-500" />
                <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                  {message.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-zinc-500" />
                <span>{new Date(message.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-6 font-mono text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
            {message.message}
          </div>

          {/* Direct reply button */}
          <div className="flex justify-end pt-4">
            <a
              href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || 'Inquiry')}`}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase rounded hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Mail size={14} /> Send Direct Transmission (Reply)
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
