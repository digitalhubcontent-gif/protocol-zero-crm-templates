/**
 * CRM-08 — Signal Intelligence
 * LIGHT MODE: Pure white base, darker cyan for legibility, amber surge alerts.
 * Optimized contrast: all text dark on white surfaces.
 */

const accent = '#0891b2';   // Darker cyan for light mode legibility
const surge = '#d97706';    // Amber — intent surge (darkened for contrast)
const danger = '#dc2626';
const success = '#16a34a';
const warn = '#d97706';

export const signalIntelligenceLight: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}0e`,
        '--crm-accent-border': `${accent}22`,
        '--crm-accent-hover': '#0e7490',

        '--bg-primary': '#f0fdff',
        '--bg-secondary': '#e0f7fa',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#e0f7fa',
        '--bg-overlay': 'rgba(0,0,0,0.65)',
        '--bg-critical': '#fef2f2',
        '--bg-success': '#f0fdf4',
        '--bg-warning': '#fffbeb',

        '--text-primary': '#083344',
        '--text-secondary': '#064d61', // Darkened from #0e7490
        '--text-muted': '#1f5b6b', // Darkened from #3d8090
        '--text-inverse': '#ffffff',
        '--text-critical': '#991b1b',
        '--text-success': '#14532d',
        '--text-warning': '#78350f',

        '--border-card': 'rgba(6,182,212,0.22)',
        '--border-subtle': 'rgba(6,182,212,0.10)',
        '--border-strong': `${accent}28`,
        '--border-critical': `${danger}30`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#ffffff',
        '--crm-sidebar-border': 'rgba(6,182,212,0.18)',

        '--chart-grid': 'rgba(0,0,0,0.04)',
        '--chart-axis': 'rgba(0,0,0,0.07)',
        '--chart-label': '#1f5b6b', // Darkened from #3d8090
        '--chart-legend': '#064d61', // Darkened from #0e7490
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#083344',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#6b7280',
        '--chart-accent-1': accent,
        '--chart-accent-2': surge,
        '--chart-accent-3': success,
        '--chart-accent-4': '#7c3aed',

        '--icp-high': '#16a34a',
        '--icp-medium': accent,
        '--icp-low': '#6b7280',
        '--surge-color': surge,
        '--signal-pulse': `${accent}25`,
        '--plg-active': success,

        '--ai-high': success,
        '--ai-medium': accent,
        '--ai-low': danger,
    },
};
