import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import CornerBrackets from '@/Components/Decorative/CornerBrackets';
import TechnicalLabel from '@/Components/Decorative/TechnicalLabel';
import GlitchText from '@/Components/Decorative/GlitchText';
import { MailCheck, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="System Access // Email Verification" />

      <div className="relative">
        <CornerBrackets 
          className="bg-card/95 border border-border p-6 sm:p-8 backdrop-blur-md shadow-[var(--shadow)]" 
          size={24} 
          thickness={2}
        >
          {/* Header */}
          <div className="mb-6 border-b border-border/80 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TechnicalLabel prefix="//">SEC_VERIFY // 04</TechnicalLabel>
              <span className="font-mono text-[10px] text-primary tracking-widest border border-primary/40 px-2 py-0.5 uppercase bg-primary/5">
                VERIFICATION_PENDING
              </span>
            </div>

            <GlitchText active as="h1" className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              VERIFY TRANSMISSION
            </GlitchText>

            <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed">
              ENROLLMENT COMPLETE. PLEASE CONFIRM YOUR ADDRESS BY CLICKING THE VERIFICATION LINK SENT TO YOUR INBOX.
            </p>
          </div>

          {/* Verification link sent alert */}
          {status === 'verification-link-sent' && (
            <div className="mb-6 flex items-center gap-2 border border-primary/50 bg-primary/10 p-3 font-mono text-xs text-primary">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>NEW VERIFICATION TRANSMISSION HAS BEEN DISPATCHED TO YOUR ADDRESS.</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <button
              type="submit"
              disabled={processing}
              className="group relative flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow)] transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {processing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>DISPATCHING...</span>
                </>
              ) : (
                <>
                  <MailCheck size={16} />
                  <span>RESEND VERIFICATION LINK</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <div className="pt-2 text-center border-t border-border/80">
              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-destructive hover:underline uppercase cursor-pointer"
              >
                <LogOut size={14} />
                <span>TERMINATE CURRENT SESSION</span>
              </Link>
            </div>
          </form>
        </CornerBrackets>
      </div>
    </GuestLayout>
  );
}
