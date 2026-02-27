/**
 * CRM-08 — Signal Intelligence
 * DARK MODE: Deep navy, cyan signal accent, amber surge alerts.
 */

const accent = '#06b6d4';   // Cyan — signal detection
const accentSecondary = '#22d3ee';
const surge = '#f59e0b';    // Amber — intent surge
const danger = '#ef4444';
const success = '#22c55e';
const warn = '#f59e0b';

export const signalIntelligenceDark: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}10`,
        '--crm-accent-border': `${accent}28`,
        '--crm-accent-hover': accentSecondary,

        '--bg-primary': '#030712',
        '--bg-secondary': '#0a1120',
        '--bg-card': '#0d1526',
        '--bg-elevated': '#111d33',
        '--bg-overlay': 'rgba(2,5,15,0.94)',
        '--bg-critical': `${danger}12`,
        '--bg-success': `${success}10`,
        '--bg-warning': `${surge}10`,

        '--text-primary': '#e0f2fe',
        '--text-secondary': '#22d3ee',
        '--text-muted': '#476582',
        '--text-inverse': '#030712',
        '--text-critical': '#fca5a5',
        '--text-success': '#86efac',
        '--text-warning': '#fcd34d',

        '--border-card': 'rgba(6,182,212,0.14)',
        '--border-subtle': 'rgba(6,182,212,0.07)',
        '--border-strong': `${accent}38`,
        '--border-critical': `${danger}35`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#0a1120',
        '--crm-sidebar-border': 'rgba(6,182,212,0.16)',

        '--chart-grid': 'rgba(6,182,212,0.06)',
        '--chart-axis': 'rgba(6,182,212,0.11)',
        '--chart-label': '#476582',
        '--chart-legend': '#22d3ee',
        '--chart-tooltip-bg': '#111d33',
        '--chart-tooltip-text': '#e0f2fe',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#6b7280',
        '--chart-accent-1': accent,
        '--chart-accent-2': surge,
        '--chart-accent-3': success,
        '--chart-accent-4': '#a78bfa',

        '--icp-high': '#22c55e',
        '--icp-medium': accent,
        '--icp-low': '#6b7280',
        '--surge-color': surge,
        '--signal-pulse': `${accent}40`,
        '--plg-active': success,

        '--ai-high': success,
        '--ai-medium': accent,
        '--ai-low': danger,
    },
};
