import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';
import { cn } from '@/Utils/cn';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { themes as fallbackThemes } from '@/Themes/themes';

export default function ThemeSwitcher({ className }) {
  const { theme, themeName, setTheme, THEMES = fallbackThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentThemeId = theme?.id || themeName;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeList = THEMES && typeof THEMES === 'object' ? Object.entries(THEMES) : Object.entries(fallbackThemes);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-border bg-background hover:border-primary transition-colors flex items-center justify-center cursor-pointer"
        aria-label="Switch theme"
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-52 bg-card border border-border shadow-2xl z-50 flex flex-col py-1"
          >
            <div className="p-3 border-b border-border bg-muted/50 font-mono text-xs uppercase text-foreground/70 font-bold">
              // SELECT_THEME
            </div>
            {themeList.map(([key, t]) => {
              const isSelected = currentThemeId === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors text-left font-mono text-xs uppercase cursor-pointer",
                    isSelected ? "text-primary font-bold bg-muted/50" : "text-foreground"
                  )}
                >
                  <div 
                    className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0" 
                    style={{ backgroundColor: t.colors.primary }} 
                  />
                  <span className="flex-grow truncate">{t.name}</span>
                  {isSelected && <Check size={14} className="text-primary flex-shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

