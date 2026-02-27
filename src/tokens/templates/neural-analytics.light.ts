/**
 * CRM-06 — Neural Analytics
 * LIGHT MODE token override
 * Identity: Cool white canvas, violet accents, clean AI aesthetic.
 */

const accent = '#7c3aed';
const warn = '#b45309';
const danger = '#dc2626';
const success = '#059669';

export const neuralAnalyticsLight: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}0e`,
        '--crm-accent-border': `${accent}22`,
        '--crm-accent-hover': '#6d28d9',

        '--bg-primary': '#faf9ff',
        '--bg-secondary': '#f3f0ff',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f3f0ff',
        '--bg-overlay': 'rgba(0,0,0,0.65)',
        '--bg-critical': '#fef2f2',
        '--bg-success': '#f0fdf4',
        '--bg-warning': '#fffbeb',

        '--text-primary': '#1e1b4b',
        '--text-secondary': '#3f3185', // Darkened from #4c3d99
        '--text-muted': '#625194', // Darkened from #7c6aaf
        '--text-inverse': '#ffffff',
        '--text-critical': '#991b1b',
        '--text-success': '#065f46',
        '--text-warning': '#78350f',

        '--border-card': 'rgba(167,139,250,0.25)',
        '--border-subtle': 'rgba(167,139,250,0.12)',
        '--border-strong': `${accent}28`,
        '--border-critical': `${danger}30`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#ffffff',
        '--crm-sidebar-border': 'rgba(167,139,250,0.2)',

        '--chart-grid': 'rgba(0,0,0,0.06)',
        '--chart-axis': 'rgba(0,0,0,0.12)',
        '--chart-label': '#625194',
        '--chart-legend': '#3f3185',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#1e1b4b',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#625194',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#db2777',
        '--chart-accent-3': '#059669',
        '--chart-accent-4': '#2563eb',

        '--ai-high': '#059669',
        '--ai-medium': accent,
        '--ai-low': '#dc2626',
        '--ai-panel-bg': '#f3f0ff',
        '--ai-panel-border': `${accent}20`,
    },
};
