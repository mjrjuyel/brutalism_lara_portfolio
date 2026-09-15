import React, { useState, useEffect } from 'react';
import { 
  X, Copy, Check, Share2, ExternalLink, QrCode, 
  Send, Globe, MessageSquare, Twitter, Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/Components/UI/Button';

export default function ShareModal({ open, onClose, siteSettings, user }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.dev';
  const siteTitle = siteSettings?.site_title || siteSettings?.logo_text || user?.name || 'Developer Portfolio';
  const shareText = `Explore my professional portfolio & system architecture: ${siteUrl}`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteTitle,
          text: `Check out ${siteTitle}'s portfolio`,
          url: siteUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }
  };

  const shareNetworks = [
    {
      name: 'X / Twitter',
      icon: Twitter,
      color: 'hover:border-sky-500 hover:text-sky-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:border-blue-600 hover:text-blue-400',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'hover:border-emerald-500 hover:text-emerald-400',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'hover:border-cyan-400 hover:text-cyan-300',
      url: `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(siteTitle)}`,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-primary">
                  <Share2 size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono tracking-tight uppercase flex items-center gap-2">
                    Share Portfolio
                    <span className="text-[10px] bg-emerald-950/80 border border-emerald-800 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-medium">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">Broadcast and transmit portfolio endpoint</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* URL Copy Bar */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-mono font-medium text-zinc-400 uppercase flex items-center justify-between">
                <span>// Public Deployment URL</span>
                {copied && (
                  <span className="text-primary font-bold flex items-center gap-1 text-[11px] animate-pulse">
                    <Check size={12} /> Copied to clipboard!
                  </span>
                )}
              </label>

              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-lg">
                <div className="flex items-center gap-2 px-2 text-zinc-400 flex-1 min-w-0">
                  <Globe size={15} className="text-primary shrink-0" />
                  <span className="font-mono text-xs text-zinc-200 truncate select-all">
                    {siteUrl}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    copied 
                      ? 'bg-primary text-black' 
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="space-y-2.5 mb-5">
              <span className="text-xs font-mono font-medium text-zinc-400 uppercase block">
                // Transmit Across Networks
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shareNetworks.map((net) => (
                  <a
                    key={net.name}
                    href={net.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-xs transition-all ${net.color} hover:bg-zinc-800/60`}
                  >
                    <net.icon size={18} />
                    <span className="text-[11px] font-bold">{net.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* QR Code toggle section */}
            <div className="mb-5 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowQr(!showQr)}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <QrCode size={16} className="text-primary" />
                  <span>{showQr ? 'Hide QR Code' : 'Scan With Phone (QR Code)'}</span>
                </button>

                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                  >
                    <Share2 size={13} />
                    Native Share
                  </button>
                )}
              </div>

              {showQr && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex flex-col items-center justify-center p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg"
                >
                  {/* Google Chart API QR Generator for Instant Clean QR display */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(siteUrl)}&bgcolor=18181b&color=00ff41&margin=8`}
                    alt="Portfolio QR Code"
                    className="w-40 h-40 rounded-md border border-zinc-700 bg-zinc-900"
                  />
                  <span className="font-mono text-[10px] text-zinc-400 mt-2 uppercase tracking-wider">
                    Scan to open portfolio on mobile
                  </span>
                </motion.div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                Open Live Site
              </a>

              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
