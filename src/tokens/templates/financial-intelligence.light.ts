/**
 * CRM-03 — Financial Intelligence
 * LIGHT MODE template override
 * Identity: Cream/white bg, amber accent, still terminal-inspired.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#d97706'; // darker amber for light bg contrast

export const financialIntelligenceLight: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#fafaf5',
    'bg-secondary': '#f4f4ec',
    'bg-surface': '#ffffff',
    'bg-elevated': '#f4f4ec',
    'bg-overlay': 'rgba(0,0,0,0.5)',
    'bg-critical': 'rgba(239,68,68,0.08)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': `${accent}10`,

    'text-primary': '#1a1a0a',
    'text-secondary': '#3f3f2a',
    'text-muted': '#5c5c44',
    'text-inverse': '#ffffff',
    'text-critical': '#dc2626',
    'text-success': '#059669',
    'text-warning': accent,

    'border-default': 'rgba(0,0,0,0.08)',
    'border-subtle': 'rgba(0,0,0,0.12)',
    'border-strong': `${accent}35`,
    'border-critical': 'rgba(239,68,68,0.25)',

    'accent-primary': accent,
    'accent-muted': `${accent}10`,
    'accent-border': `${accent}30`,

    'status-success': '#059669',
    'status-warning': accent,
    'status-critical': '#dc2626',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-rgb': '180, 83, 9', // rgb for #b45309 (the light mode accent)
        '--crm-accent-muted': `${accent}10`,
        '--crm-accent-border': `${accent}30`,
        '--crm-sidebar-bg': '#f4f4ec',
        '--crm-sidebar-border': 'rgba(0,0,0,0.08)',
        '--bg-primary': '#fafaf5',
        '--bg-secondary': '#f4f4ec',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f4f4ec',
        '--bg-overlay': 'rgba(0,0,0,0.5)',
        '--bg-critical': 'rgba(239,68,68,0.08)',
        '--text-primary': '#1a1a0a',
        '--text-secondary': '#3f3f2a',
        '--text-muted': '#5c5c44',
        '--text-inverse': '#ffffff',
        '--text-critical': '#dc2626',
        '--text-accent': '#b45309',
        '--border-card': 'rgba(0,0,0,0.08)',
        '--border-subtle': 'rgba(0,0,0,0.12)',
        '--border-strong': `${accent}35`,
        '--border-critical': 'rgba(239,68,68,0.25)',
        '--status-success': '#059669',
        '--status-warning': accent,
        '--status-danger': '#dc2626',
        '--chart-grid': 'rgba(0,0,0,0.10)',
        '--chart-axis': 'rgba(0,0,0,0.15)',
        '--chart-label': '#5c5c44',
        '--chart-legend': '#3f3f2a',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#1a1a0a',
        '--chart-positive': '#059669',
        '--chart-negative': '#dc2626',
        '--chart-neutral': '#5c5c44',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#dc2626',
        '--chart-accent-3': '#059669',
    },
};
