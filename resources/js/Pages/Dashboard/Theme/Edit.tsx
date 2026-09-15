import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Switch from '@/Components/UI/Switch';
import Button from '@/Components/UI/Button';
import { Palette, Check, Save } from 'lucide-react';
import { themes } from '@/Themes/themes';

export default function Edit({ theme }) {
  const { data, setData, post, processing } = useForm({
    active_theme: theme?.active_theme || 'cyber-brutalism',
    allow_visitor_switching: theme?.allow_visitor_switching ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/dashboard/theme');
  };

  const themeOptions = [
    {
      id: 'cyber-brutalism',
      name: 'Cyber Brutalism',
      description: 'Black/white foundation, neon terminal accents, hard borders, scanlines, and glitch effects.',
      bg: '#000000',
      fg: '#ffffff',
      accent: '#00ff41',
      border: '#333333',
    },
    {
      id: 'mono-brutal',
      name: 'Mono Brutal',
      description: 'Newspaper & editorial feeling, high contrast black & white, thick borders, box drop-shadows.',
      bg: '#ffffff',
      fg: '#000000',
      accent: '#000000',
      border: '#000000',
    },
    {
      id: 'digital-terminal',
      name: 'Digital Terminal',
      description: 'Developer IDE aesthetic, dark graphite background with cyan/blue accents and monospace code typography.',
      bg: '#0a0e14',
      fg: '#b3b1ad',
      accent: '#39bae6',
      border: '#1a1f29',
    },
    {
      id: 'acid-future',
      name: 'Acid Future',
      description: 'Off-white brutalism, vibrant fluorescent neon yellow and orange accents, experimental editorial layouts.',
      bg: '#f0ede6',
      fg: '#1a1a1a',
      accent: '#c8ff00',
      border: '#1a1a1a',
    },
    {
      id: 'minimal-future',
      name: 'Minimal Future',
      description: 'Subtle dark UI, rounded geometric contours, understated glow, clean Apple-grade futuristic simplicity.',
      bg: '#09090b',
      fg: '#fafafa',
      accent: '#fafafa',
      border: '#27272a',
    },
  ];

  return (
    <DashboardLayout title="Theme Architecture & Engine">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Palette size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                // Visual Theme Presets
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Config-driven design token engines. Changes apply instantly across public layout.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {themeOptions.map((t) => {
              const selected = data.active_theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setData('active_theme', t.id)}
                  className={`p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    selected
                      ? 'bg-zinc-800 border-white ring-1 ring-white'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-white uppercase">{t.name}</span>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">
                      {t.description}
                    </p>
                  </div>

                  {/* Visual swatch bar */}
                  <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Tokens:</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: t.bg }} title="Background" />
                      <div className="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: t.fg }} title="Foreground" />
                      <div className="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: t.accent }} title="Accent" />
                      <div className="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: t.border }} title="Border" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <Switch
              label="Allow Public Visitors to Switch Themes"
              description="Displays a theme selector button in public navigation bar so visitors can experience all 5 presets"
              checked={data.allow_visitor_switching}
              onChange={(val) => setData('allow_visitor_switching', val)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={processing} className="px-8 py-3 flex items-center gap-2">
            <Save size={16} />
            {processing ? 'Applying Theme Engine...' : 'Deploy Theme'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
