/**
 * CRM-06 — Neural Analytics
 * DARK MODE token override
 * Identity: Deep violet-tinted dark, asymmetric AI interface, purple accent (#a78bfa).
 */

const accent = '#a78bfa';
const warn = '#f59e0b';
const danger = '#ef4444';
const success = '#10b981';

export const neuralAnalyticsDark: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}14`,
        '--crm-accent-border': `${accent}28`,
        '--crm-accent-hover': '#c4b5fd',

        '--bg-primary': '#08070d',
        '--bg-secondary': '#100f1a',
        '--bg-card': '#161424',
        '--bg-elevated': '#1e1b2e',
        '--bg-overlay': 'rgba(4,3,9,0.9)',
        '--bg-critical': `${danger}12`,
        '--bg-success': `${success}10`,
        '--bg-warning': `${warn}10`,

        '--text-primary': '#ede9fe',
        '--text-secondary': '#a78bfa',
        '--text-muted': '#6b5fa5',
        '--text-inverse': '#08070d',
        '--text-critical': '#fca5a5',
        '--text-success': '#6ee7b7',
        '--text-warning': '#fcd34d',

        '--border-card': 'rgba(97,71,218,0.2)',
        '--border-subtle': 'rgba(97,71,218,0.1)',
        '--border-strong': `${accent}35`,
        '--border-critical': `${danger}35`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#100f1a',
        '--crm-sidebar-border': 'rgba(97,71,218,0.2)',

        '--chart-grid': 'rgba(167,139,250,0.06)',
        '--chart-axis': 'rgba(167,139,250,0.10)',
        '--chart-label': '#6b5fa5',
        '--chart-legend': '#a78bfa',
        '--chart-tooltip-bg': '#1e1b2e',
        '--chart-tooltip-text': '#ede9fe',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#6b5fa5',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#f472b6',
        '--chart-accent-3': '#34d399',
        '--chart-accent-4': '#60a5fa',

        /* AI confidence zones */
        '--ai-high': '#10b981',
        '--ai-medium': accent,
        '--ai-low': '#ef4444',
        '--ai-panel-bg': '#1e1b2e',
        '--ai-panel-border': `${accent}20`,
    },
};
