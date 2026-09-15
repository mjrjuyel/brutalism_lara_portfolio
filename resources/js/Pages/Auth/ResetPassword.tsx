import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import GlitchText from '@/Components/Decorative/GlitchText';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function ResetPassword({ token, email }) {
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="System Access // Reset Key" />

      <div className="relative">
        <CornerBrackets 
          className="bg-card/95 border border-border p-6 sm:p-8 backdrop-blur-md shadow-[var(--shadow)]" 
          size={24} 
          thickness={2}
        >
          {/* Header */}
          <div className="mb-6 border-b border-border/80 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TechnicalLabel prefix="//">SEC_RECOVERY // 02</TechnicalLabel>
              <span className="font-mono text-[10px] text-primary tracking-widest border border-primary/40 px-2 py-0.5 uppercase bg-primary/5">
                KEY_OVERWRITE
              </span>
            </div>

            <GlitchText active as="h1" className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              OVERWRITE KEY
            </GlitchText>

            <p className="font-mono text-xs text-muted-foreground mt-1">
              ESTABLISH NEW CREDENTIAL SIGNATURE FOR IDENTIFIER
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
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
                  required
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

            {/* New Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="font-mono text-xs uppercase tracking-wider text-foreground/90 font-bold"
                >
                  NEW_ACCESS_KEY [PASSWORD]
                </label>
                <span className="font-mono text-[10px] text-muted-foreground">REQ_FIELD</span>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={data.password}
                  autoComplete="new-password"
                  autoFocus
                  required
                  placeholder="••••••••••••"
                  onChange={(e) => setData('password', e.target.value)}
                  className={`w-full bg-background/90 border ${
                    errors.password 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-border focus:border-primary'
                  } pl-10 pr-10 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 ${
                    errors.password ? 'focus:ring-destructive' : 'focus:ring-primary'
                  } transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <div className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-destructive">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password_confirmation" 
                  className="font-mono text-xs uppercase tracking-wider text-foreground/90 font-bold"
                >
                  CONFIRM_NEW_KEY [VERIFY]
                </label>
                <span className="font-mono text-[10px] text-muted-foreground">REQ_FIELD</span>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock size={16} />
                </div>
                <input
                  id="password_confirmation"
                  type={showPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={data.password_confirmation}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••••••"
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className={`w-full bg-background/90 border ${
                    errors.password_confirmation 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-border focus:border-primary'
                  } pl-10 pr-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 ${
                    errors.password_confirmation ? 'focus:ring-destructive' : 'focus:ring-primary'
                  } transition-colors`}
                />
              </div>

              {errors.password_confirmation && (
                <div className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-destructive">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errors.password_confirmation}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={processing}
                className="group relative flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow)] transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    <span>UPDATING KEY SIGNATURE...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM KEY OVERWRITE</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-center border-t border-border/80">
              <Link 
                href={route('login')} 
                className="font-mono text-xs text-muted-foreground hover:text-primary uppercase transition-colors"
              >
                ← RETURN TO ACCESS TERMINAL
              </Link>
            </div>
          </form>
        </CornerBrackets>
      </div>
    </GuestLayout>
  );
}
