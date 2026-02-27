/**
 * LAYER 1 — CORE TOKENS
 * Primitive, immutable values. Never reference these directly in components.
 * Use semantic tokens instead.
 */

// ─── COLOR SCALE ──────────────────────────────────────────────────────────────
export const neutral = {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    850: '#131c2e',
    900: '#0f172a',
    925: '#090d1a',
    950: '#06060f',
} as const;

export const color = {
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'green-400': '#4ade80',
    'green-500': '#10b981',
    'green-600': '#059669',
    'amber-400': '#fbbf24',
    'amber-500': '#f59e0b',
    'amber-600': '#d97706',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'sky-400': '#38bdf8',
    'sky-500': '#0ea5e9',
    'indigo-500': '#6366f1',
    'violet-500': '#8b5cf6',
    'violet-400': '#a78bfa',
    'cyan-400': '#22d3ee',
    'cyan-500': '#06b6d4',
    'purple-400': '#c084fc',
    'purple-500': '#a855f7',
} as const;

// ─── SPACING SCALE (8pt grid) ─────────────────────────────────────────────────
export const space = {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '40px',
    8: '48px',
    9: '64px',
    10: '80px',
} as const;

// ─── TYPOGRAPHY SCALE ─────────────────────────────────────────────────────────
export const text = {
    xs: '0.6875rem',  // 11px
    sm: '0.75rem',    // 12px
    base: '0.8125rem',  // 13px
    md: '0.875rem',   // 14px
    lg: '1rem',       // 16px
    xl: '1.125rem',   // 18px
    '2xl': '1.25rem',    // 20px
    '3xl': '1.5rem',     // 24px
    '4xl': '1.875rem',   // 30px
    '5xl': '2.25rem',    // 36px
} as const;

// ─── RADIUS SCALE ─────────────────────────────────────────────────────────────
export const radius = {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
} as const;

// ─── SHADOW SCALE ─────────────────────────────────────────────────────────────
export const shadow = {
    0: 'none',
    1: '0 1px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
    2: '0 4px 16px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
} as const;

// ─── TYPE EXPORTS ─────────────────────────────────────────────────────────────
export type NeutralScale = typeof neutral;
export type ColorScale = typeof color;
export type SpaceScale = typeof space;
export type TextScale = typeof text;
export type RadiusScale = typeof radius;
export type ShadowScale = typeof shadow;
