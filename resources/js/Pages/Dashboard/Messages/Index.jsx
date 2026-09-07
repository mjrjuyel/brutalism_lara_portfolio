import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Mail, MailOpen, Trash2, ArrowRight } from 'lucide-react';

export default function Index({ messages }) {
  const messageList = messages?.data || messages || [];

  const handleDelete = (id) => {
    if (confirm('Delete transmission record?')) {
      router.delete(`/dashboard/messages/${id}`);
    }
  };

  return (
    <DashboardLayout title="Incoming Transmissions">
      <div className="max-w-5xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold font-mono uppercase text-white tracking-tight">
            // Transmission Log
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Inquiries transmitted via the public futuristic contact portal.
          </p>
        </div>

        {messageList.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-12 text-center">
            <Mail className="mx-auto text-zinc-600 mb-3" size={36} />
            <h3 className="text-base font-mono text-zinc-300 font-bold uppercase">No Transmissions Recorded</h3>
            <p className="text-xs font-mono text-zinc-500 max-w-sm mx-auto mt-1">
              When recruiters or clients submit inquiries via your public contact form, they will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {messageList.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors hover:bg-zinc-800/40 ${
                  !msg.is_read ? 'bg-zinc-800/20' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`p-2 rounded-lg shrink-0 ${!msg.is_read ? 'bg-primary/10 text-primary' : 'bg-zinc-800 text-zinc-500'}`}>
                    {!msg.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                  </div>

                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm truncate ${!msg.is_read ? 'font-bold text-white' : 'text-zinc-300'}`}>
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 truncate hidden sm:inline">
                        &lt;{msg.email}&gt;
                      </span>
                      {!msg.is_read && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-zinc-400 mt-1 truncate">
                      {msg.subject ? `[${msg.subject}] ` : ''}{msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[11px] text-zinc-500 hidden md:block">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/dashboard/messages/${msg.id}`}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                    title="Read transmission"
                  >
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
