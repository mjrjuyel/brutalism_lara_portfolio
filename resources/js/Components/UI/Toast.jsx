import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/Utils/cn';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const { props } = usePage();

  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Watch Inertia flash messages
  useEffect(() => {
    if (props.flash?.success) addToast(props.flash.success, 'success');
    if (props.flash?.error) addToast(props.flash.error, 'error');
    if (props.flash?.info) addToast(props.flash.info, 'info');
  }, [props.flash]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const styles = {
    success: {
      border: 'border-emerald-500/50',
      bg: 'bg-zinc-900/95',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
      tag: 'SUCCESS // 200',
      tagColor: 'text-emerald-400'
    },
    error: {
      border: 'border-red-500/50',
      bg: 'bg-zinc-900/95',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
      icon: <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />,
      tag: 'ERROR // ALERT',
      tagColor: 'text-red-400'
    },
    info: {
      border: 'border-cyan-500/50',
      bg: 'bg-zinc-900/95',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      icon: <Info className="h-5 w-5 text-cyan-400 shrink-0" />,
      tag: 'INFO // TRANSMISSION',
      tagColor: 'text-cyan-400'
    }
  };

  const currentStyle = styles[toast.type] || styles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
      layout
      className={cn(
        "pointer-events-auto relative flex items-start gap-3.5 overflow-hidden rounded-lg border p-4 backdrop-blur-md shadow-2xl transition-all font-mono",
        currentStyle.border,
        currentStyle.bg,
        currentStyle.glow
      )}
    >
      <div className="pt-0.5">{currentStyle.icon}</div>
      <div className="flex-1 pr-6">
        <div className={cn("text-[10px] font-bold tracking-widest uppercase mb-1", currentStyle.tagColor)}>
          {currentStyle.tag}
        </div>
        <p className="text-xs text-zinc-200 font-medium leading-relaxed">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-2.5 top-2.5 rounded p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
