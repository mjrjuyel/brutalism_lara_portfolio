import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import GlitchText from '@/Components/Decorative/GlitchText';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

export default function Login({ status, canResetPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="System Access // Log In" />

      <div className="relative">
        <CornerBrackets 
          className="bg-card/95 border border-border p-6 sm:p-8 backdrop-blur-md shadow-[var(--shadow)]" 
          size={24} 
          thickness={2}
        >
          {/* Header */}
          <div className="mb-6 border-b border-border/80 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TechnicalLabel prefix="//">SEC_AUTH // 01</TechnicalLabel>
              <span className="font-mono text-[10px] text-primary tracking-widest border border-primary/40 px-2 py-0.5 uppercase bg-primary/5">
                GATEWAY: READY
              </span>
            </div>

            <GlitchText active as="h1" className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              SYSTEM ACCESS
            </GlitchText>

            <p className="font-mono text-xs text-muted-foreground mt-1">
              TRANSMIT CREDENTIALS TO ACCESS CONTROL TERMINAL
            </p>
          </div>

          {/* Flash Status Message */}
          {status && (
            <div className="mb-6 flex items-center gap-2 border border-primary/50 bg-primary/10 p-3 font-mono text-xs text-primary">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="email" 
                  className="font-mono text-xs uppercase tracking-wider text-foreground/90 font-bold"
                >
                  IDENTIFIER [EMAIL]
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="font-mono text-xs uppercase tracking-wider text-foreground/90 font-bold"
                >
                  ACCESS_KEY [PASSWORD]
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
                  autoComplete="current-password"
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="h-4 w-4 rounded-none border border-border bg-background text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[var(--primary)]"
                />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  PERSIST_SESSION
                </span>
              </label>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline uppercase"
                >
                  FORGOT_KEY?
                </Link>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="group relative flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow)] transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {processing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>INITIALIZE SESSION</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Register Route Link */}
            <div className="pt-2 text-center border-t border-border/80">
              <span className="font-mono text-xs text-muted-foreground">UNREGISTERED NODE? </span>
              <Link 
                href={route('register')} 
                className="font-mono text-xs font-bold text-primary uppercase hover:underline transition-colors"
              >
                REQUEST ENROLLMENT →
              </Link>
            </div>
          </form>
        </CornerBrackets>
      </div>
    </GuestLayout>
  );
}
