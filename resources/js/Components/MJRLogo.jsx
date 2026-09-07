import React from 'react';

export default function MJRLogo({ className = 'w-8 h-8', size, ...props }) {
  const width = size || 36;
  const height = size || 36;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size ? `${size}px` : undefined, height: size ? `${size}px` : undefined }}
      {...props}
    >
      <defs>
        <linearGradient id="mjr-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary, #00ff41)" />
          <stop offset="100%" stopColor="var(--accent, #00d4ff)" />
        </linearGradient>
        <linearGradient id="mjr-grad-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary, #00ff41)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary, #00ff41)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Outer Cyber Hexagonal Frame */}
      <polygon
        points="50,5 92,27 92,73 50,95 8,73 8,27"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-40"
      />

      {/* Inner Accent Ring */}
      <polygon
        points="50,12 85,31 85,69 50,88 15,69 15,31"
        stroke="url(#mjr-grad-primary)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        className="opacity-75"
      />

      {/* Letter 'M' (Left Pillar & Chevron) */}
      <path
        d="M 24,70 L 24,32 L 38,48 L 48,35 L 48,60"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Letter 'J' (Central Base Curve) */}
      <path
        d="M 52,48 L 52,65 Q 52,74 42,74 L 35,74"
        stroke="url(#mjr-grad-primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Letter 'R' (Right Loop & Diagonal Kick) */}
      <path
        d="M 54,32 L 72,32 Q 80,32 80,43 Q 80,53 71,53 L 54,53 M 67,53 L 78,72"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Cyber Corner Reticle Accent Dots */}
      <circle cx="50" cy="5" r="2.5" fill="var(--primary, #00ff41)" />
      <circle cx="92" cy="27" r="2" fill="currentColor" />
      <circle cx="92" cy="73" r="2" fill="currentColor" />
      <circle cx="50" cy="95" r="2.5" fill="var(--accent, #00d4ff)" />
      <circle cx="8" cy="73" r="2" fill="currentColor" />
      <circle cx="8" cy="27" r="2" fill="currentColor" />
    </svg>
  );
}
