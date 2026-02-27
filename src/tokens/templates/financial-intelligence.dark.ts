/**
 * CRM-03 — Financial Intelligence
 * DARK MODE template override
 * Identity: Near-black, Bloomberg amber accent, monospace terminal.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#f59e0b'; // Bloomberg amber/gold

export const financialIntelligenceDark: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#010409',
    'bg-secondary': '#0a0e14',
    'bg-surface': '#0c1018',
    'bg-elevated': '#111820',
    'bg-overlay': 'rgba(0,0,0,0.88)',
    'bg-critical': 'rgba(239,68,68,0.1)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': `${accent}14`,

    'text-primary': '#e8e8d0',
    'text-secondary': '#9ca38a',
    'text-muted': '#5a6048',
    'text-inverse': '#010409',
    'text-critical': '#f87171',
    'text-success': '#10b981',
    'text-warning': accent,

    'border-default': 'rgba(255,255,255,0.05)',
    'border-subtle': 'rgba(255,255,255,0.03)',
    'border-strong': `${accent}25`,
    'border-critical': 'rgba(239,68,68,0.3)',

    'accent-primary': accent,
    'accent-muted': `${accent}14`,
    'accent-border': `${accent}28`,

    'status-success': '#10b981',
    'status-warning': accent,
    'status-critical': '#ef4444',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-rgb': '245, 158, 11', // rgb for #f59e0b (the dark mode accent)
        '--crm-accent-muted': `${accent}14`,
        '--crm-accent-border': `${accent}28`,
        '--crm-sidebar-bg': '#080c12',
        '--crm-sidebar-border': 'rgba(255,255,255,0.05)',
        '--bg-primary': '#010409',
        '--bg-secondary': '#0a0e14',
        '--bg-card': '#0c1018',
        '--bg-elevated': '#111820',
        '--bg-overlay': 'rgba(0,0,0,0.88)',
        '--bg-critical': 'rgba(239,68,68,0.1)',
        '--text-primary': '#e8e8d0',
        '--text-secondary': '#9ca38a',
        '--text-muted': '#5a6048',
        '--text-inverse': '#010409',
        '--text-critical': '#f87171',
        '--text-accent': accent,
        '--border-card': 'rgba(255,255,255,0.05)',
        '--border-subtle': 'rgba(255,255,255,0.03)',
        '--border-strong': `${accent}25`,
        '--border-critical': 'rgba(239,68,68,0.3)',
        '--status-success': '#10b981',
        '--status-warning': accent,
        '--status-danger': '#ef4444',
        '--chart-grid': 'rgba(255,255,255,0.04)',
        '--chart-axis': 'rgba(255,255,255,0.08)',
        '--chart-label': '#5a6048',
        '--chart-legend': '#9ca38a',
        '--chart-tooltip-bg': '#111820',
        '--chart-tooltip-text': '#e8e8d0',
        '--chart-positive': '#10b981',
        '--chart-negative': '#ef4444',
        '--chart-neutral': '#5a6048',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#ef4444',
        '--chart-accent-3': '#10b981',
    },
};
