import { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { getTheme, themes } from '../Themes/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children, initialTheme, allowVisitorSwitching: propAllowSwitching }) {
  const { props } = usePage();
  
  // Get active theme from initialTheme, localStorage, or Inertia props
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && themes[savedTheme]) {
        return savedTheme;
      }
    }
    return initialTheme || props?.theme?.active_theme || props?.activeTheme || 'cyber-brutalism';
  };

  const [themeName, setThemeName] = useState(getInitialTheme);
  const allowVisitorSwitching = propAllowSwitching !== undefined
    ? propAllowSwitching
    : (props?.theme?.allow_visitor_switching ?? props?.allowVisitorSwitching ?? true);

  const setTheme = (name) => {
    if (!themes[name]) return;
    setThemeName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', name);
    }
  };


  useEffect(() => {
    const theme = getTheme(themeName);
    const root = document.documentElement;

    // Apply colors
    Object.keys(theme.colors).forEach((key) => {
      root.style.setProperty(`--${key}`, theme.colors[key]);
    });

    // Apply layout vars
    root.style.setProperty('--radius', theme.radius);
    root.style.setProperty('--border-width', theme.borderWidth);
    root.style.setProperty('--shadow', theme.shadows);

    // Apply fonts
    root.style.setProperty('--font-heading', theme.typography.heading);
    root.style.setProperty('--font-body', theme.typography.body);
    root.style.setProperty('--font-mono', theme.typography.mono);

    root.setAttribute('data-theme', themeName);

    // Load fonts dynamically
    loadFonts(theme.typography);
  }, [themeName]);

  const loadFonts = (typography) => {
    if (typeof document === 'undefined') return;
    
    // Extract font names from quotes
    const extractFont = (fontString) => fontString.replace(/['"]/g, '');
    
    const headingFont = extractFont(typography.heading);
    const bodyFont = extractFont(typography.body);
    const monoFont = extractFont(typography.mono);
    
    const fontString = [headingFont, bodyFont, monoFont]
      .filter((v, i, a) => a.indexOf(v) === i) // unique
      .map(font => font.replace(/ /g, '+') + ':wght@300;400;500;600;700;800;900')
      .join('&family=');

    const url = `https://fonts.googleapis.com/css2?family=${fontString}&display=swap`;
    
    let link = document.getElementById('theme-fonts');
    if (!link) {
      link = document.createElement('link');
      link.id = 'theme-fonts';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  };

  const themeObj = getTheme(themeName);
  const isReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const animations = {
    ...themeObj.animations,
    glitch: isReducedMotion ? false : themeObj.animations.glitch,
    scanlines: isReducedMotion ? false : themeObj.animations.scanlines,
    noise: isReducedMotion ? false : themeObj.animations.noise,
  };

  return (
    <ThemeContext.Provider value={{
      theme: { ...themeObj, id: themeName, animations },
      themeName,
      setTheme,
      animations,
      allowVisitorSwitching,
      THEMES: themes,
      themes,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
