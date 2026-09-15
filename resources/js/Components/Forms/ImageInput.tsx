import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/Utils/cn';
import { 
  UploadCloud, Link as LinkIcon, X, Eye, 
  ExternalLink, Check, AlertCircle, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { removeImageBackground } from '@/Utils/imageProcessor';

export default function ImageInput({
  value,
  type = 'upload',
  onChange,
  onFileChange,
  label,
  error,
  allowUrl = true,
  allowUpload = true,
  preview = true,
  className
}) {
  const [activeTab, setActiveTab] = useState(() => {
    if (type === 'url' || (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')))) {
      return 'url';
    }
    return 'upload';
  });

  const [dragActive, setDragActive] = useState(false);
  const [localPreview, setLocalPreview] = useState(typeof value === 'string' ? value : null);
  const [urlInput, setUrlInput] = useState(typeof value === 'string' ? value : '');
  const [imageError, setImageError] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  // Sync with value prop
  useEffect(() => {
    if (value && typeof value === 'string') {
      setLocalPreview(value);
      setUrlInput(value);
      setImageError(false);
    } else if (!value) {
      setLocalPreview(null);
      setUrlInput('');
      setFileName('');
      setImageError(false);
    }
  }, [value]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'url') {
      if (onChange) onChange(urlInput || '', 'url');
      if (urlInput) {
        setLocalPreview(urlInput);
        setImageError(false);
      }
    } else {
      if (onChange) onChange(localPreview || '', 'upload');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFileName(file.name);
    setImageError(false);
    if (onFileChange) onFileChange(file);
    if (onChange) onChange(file.name, 'upload');
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrlInput(newUrl);
    setImageError(false);
    if (onChange) onChange(newUrl, 'url');
    setLocalPreview(newUrl.trim() ? newUrl.trim() : null);
  };

  const clearImage = () => {
    if (onChange) onChange(null, activeTab);
    if (onFileChange) onFileChange(null);
    setLocalPreview(null);
    setUrlInput('');
    setFileName('');
    setImageError(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const handleAutoRemoveBg = async () => {
    if (!localPreview || isRemovingBg) return;
    setIsRemovingBg(true);
    try {
      const cutout = await removeImageBackground(localPreview, { threshold: 30, feather: 10 });
      if (cutout && cutout.startsWith('data:image/png')) {
        setLocalPreview(cutout);
        const res = await fetch(cutout);
        const blob = await res.blob();
        const cleanName = (fileName ? fileName.replace(/\.[^.]+$/, '') : 'cutout') + '-transparent.png';
        const file = new File([blob], cleanName, { type: 'image/png' });
        setFileName(file.name);
        if (onFileChange) onFileChange(file);
        if (onChange) onChange(cutout, 'upload');
      }
    } catch (e) {
      console.warn('Background removal error:', e);
    } finally {
      setIsRemovingBg(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-zinc-200 mb-1.5 font-mono">
          {label}
        </label>
      )}
      
      {/* Mode Selector (Upload vs URL) */}
      {(allowUrl && allowUpload) && (
        <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 p-1 mb-3">
          <button
            type="button"
            onClick={() => handleTabSwitch('upload')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer",
              activeTab === 'upload' 
                ? "bg-zinc-800 text-white shadow font-bold border border-zinc-700" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            )}
          >
            <UploadCloud className="h-3.5 w-3.5 text-emerald-400" />
            <span>Upload File</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleTabSwitch('url')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer",
              activeTab === 'url' 
                ? "bg-zinc-800 text-white shadow font-bold border border-zinc-700" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            )}
          >
            <LinkIcon className="h-3.5 w-3.5 text-cyan-400" />
            <span>Image URL</span>
          </button>
        </div>
      )}

      {/* Upload Dropzone */}
      {activeTab === 'upload' && allowUpload && (
        <div 
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all duration-200 cursor-pointer group",
            dragActive 
              ? "border-emerald-500 bg-emerald-500/10" 
              : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-900",
            error && "border-red-500/50 bg-red-500/5"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="h-6 w-6 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-sm text-zinc-200 font-medium font-mono text-center">
            {fileName ? (
              <span className="text-emerald-400 flex items-center gap-1.5 justify-center">
                <Check className="h-4 w-4" /> {fileName}
              </span>
            ) : (
              'Drag & drop image or click to browse'
            )}
          </p>
          <p className="text-xs text-zinc-500 mt-1 font-mono">PNG, JPG, WEBP, SVG or GIF (Max 5MB)</p>
        </div>
      )}

      {/* URL Input */}
      {activeTab === 'url' && allowUrl && (
        <div className="space-y-2">
          <Input 
            placeholder="https://images.unsplash.com/photo-example.jpg"
            value={urlInput}
            onChange={handleUrlChange}
            error={error}
          />
          <p className="text-xs text-zinc-500 font-mono">
            Paste any direct image URL (Unsplash, Imgur, Cloudinary, etc.)
          </p>
        </div>
      )}

      {/* Live Preview & Quick View Toolbar */}
      {preview && localPreview && (
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/90 overflow-hidden p-3 shadow-md">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              IMAGE PREVIEW
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAutoRemoveBg}
                disabled={isRemovingBg}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono transition-colors cursor-pointer disabled:opacity-50"
                title="Automatically isolate subject and remove background"
              >
                <Sparkles className={`h-3.5 w-3.5 ${isRemovingBg ? 'animate-spin' : ''}`} />
                <span>{isRemovingBg ? 'Removing...' : 'Remove BG'}</span>
              </button>

              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
                title="Open Quick View Modal"
              >
                <Eye className="h-3.5 w-3.5 text-cyan-400" />
                <span>Quick View</span>
              </button>

              {typeof localPreview === 'string' && localPreview.startsWith('http') && (
                <a
                  href={localPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
                  title="Open source URL"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                </a>
              )}

              <button
                type="button"
                onClick={clearImage}
                className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div 
            className="relative rounded-md overflow-hidden bg-black/40 border border-zinc-800 flex items-center justify-center min-h-[160px] max-h-56 cursor-pointer group"
            onClick={() => !imageError && setQuickViewOpen(true)}
          >
            {imageError ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-zinc-400 font-mono text-xs">
                <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                <span className="text-zinc-300 font-bold mb-1">Image Preview Unavailable</span>
                <span className="text-zinc-500 max-w-xs truncate">{localPreview}</span>
              </div>
            ) : (
              <>
                <img 
                  src={localPreview} 
                  alt="Preview" 
                  className="object-contain max-h-56 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 text-white text-xs font-mono shadow-lg border border-zinc-700">
                    <Eye className="h-4 w-4 text-cyan-400" /> Click for Quick View
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {error && activeTab === 'upload' && <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>}

      {/* Quick View Full Lightbox Modal */}
      <AnimatePresence>
        {quickViewOpen && localPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setQuickViewOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Quick View // Imagery Inspection
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {typeof localPreview === 'string' && localPreview.startsWith('http') && (
                    <a
                      href={localPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Source URL
                    </a>
                  )}
                  <button 
                    type="button"
                    onClick={() => setQuickViewOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="p-6 flex items-center justify-center bg-black/60 overflow-auto max-h-[70vh]">
                <img 
                  src={localPreview} 
                  alt="Full preview" 
                  className="max-h-[65vh] max-w-full object-contain rounded shadow-lg border border-zinc-800/80"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="truncate max-w-md">{fileName || localPreview}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setQuickViewOpen(false)}
                >
                  Close (Esc)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
