import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import GlitchText from '@/Components/Decorative/GlitchText';
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="System Access // Password Recovery" />

      <div className="relative">
        <CornerBrackets 
          className="bg-card/95 border border-border p-6 sm:p-8 backdrop-blur-md shadow-[var(--shadow)]" 
          size={24} 
          thickness={2}
        >
          {/* Header */}
          <div className="mb-6 border-b border-border/80 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TechnicalLabel prefix="//">SEC_RECOVERY // 01</TechnicalLabel>
              <span className="font-mono text-[10px] text-primary tracking-widest border border-primary/40 px-2 py-0.5 uppercase bg-primary/5">
                KEY_RESTORATION
              </span>
            </div>

            <GlitchText active as="h1" className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              KEY RECOVERY
            </GlitchText>

            <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed">
              ENTER YOUR REGISTERED IDENTIFIER TO RECEIVE AN ENCRYPTED ACCESS RESET LINK.
            </p>
          </div>

          {/* Status message */}
          {status && (
            <div className="mb-6 flex items-center gap-2 border border-primary/50 bg-primary/10 p-3 font-mono text-xs text-primary">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="email" 
                  className="font-mono text-xs uppercase tracking-wider text-foreground/90 font-bold"
                >
                  TRANSMISSION_ADDRESS [EMAIL]
                </label>
                <span className="font-mono text-[10px] text-muted-foreground">REQ_FIELD</span>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  autoComplete="username"
                  autoFocus
                  required
                  placeholder="name@example.com"
                  onChange={(e) => setData('email', e.target.value)}
                  className={`w-full bg-background/90 border ${
                    errors.email 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-border focus:border-primary'
                  } pl-10 pr-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 ${
                    errors.email ? 'focus:ring-destructive' : 'focus:ring-primary'
                  } transition-colors`}
                />
              </div>

              {errors.email && (
                <div className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-destructive">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="group relative flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow)] transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {processing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>TRANSMITTING LINK...</span>
                </>
              ) : (
                <>
                  <span>TRANSMIT RESET LINK</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <div className="pt-2 text-center border-t border-border/80">
              <Link 
                href={route('login')} 
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary uppercase transition-colors"
              >
                <ArrowLeft size={14} />
                <span>RETURN TO ACCESS TERMINAL</span>
              </Link>
            </div>
          </form>
        </CornerBrackets>
      </div>
    </GuestLayout>
  );
}
