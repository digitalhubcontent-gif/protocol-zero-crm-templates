/**
 * CRM-11 — Data Meridian
 * LIGHT MODE template override
 */
import type { SemanticTokens } from '../semantic';

const accent = '#374151';

export const dataMeridianLight: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#f8fafc',
    'bg-secondary': '#f1f5f9',
    'bg-surface': '#ffffff',
    'bg-elevated': '#f8fafc',
    'bg-overlay': 'rgba(0,0,0,0.5)',
    'bg-critical': 'rgba(239,68,68,0.08)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': 'rgba(245,158,11,0.08)',

    'text-primary': '#0f172a',
    'text-secondary': '#334155',
    'text-muted': '#475569',
    'text-inverse': '#ffffff',
    'text-critical': '#dc2626',
    'text-success': '#059669',
    'text-warning': '#d97706',

    'border-default': '#e2e8f0',
    'border-subtle': 'rgba(0,0,0,0.12)',
    'border-strong': '#94a3b8',
    'border-critical': 'rgba(239,68,68,0.25)',

    'accent-primary': accent,
    'accent-muted': `${accent}12`,
    'accent-border': `${accent}30`,

    'status-success': '#059669',
    'status-warning': '#d97706',
    'status-critical': '#dc2626',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}12`,
        '--crm-accent-border': `${accent}30`,
        '--crm-sidebar-bg': '#f1f5f9',
        '--crm-sidebar-border': '#e2e8f0',
        '--bg-primary': '#f8fafc',
        '--bg-secondary': '#f1f5f9',
        '--bg-card': 'rgba(255,255,255,0.9)',
        '--bg-card-hover': 'rgba(255,255,255,1)',
        '--bg-elevated': '#f8fafc',
        '--bg-overlay': 'rgba(0,0,0,0.5)',
        '--bg-critical': 'rgba(239,68,68,0.08)',
        '--text-primary': '#0f172a',
        '--text-secondary': '#334155',
        '--text-muted': '#475569',
        '--text-inverse': '#ffffff',
        '--text-critical': '#dc2626',
        '--border-card': 'rgba(0,0,0,0.15)',
        '--border-subtle': 'rgba(0,0,0,0.12)',
        '--border-strong': '#94a3b8',
        '--border-critical': 'rgba(239,68,68,0.25)',
        '--status-success': '#059669',
        '--status-warning': '#d97706',
        '--status-danger': '#dc2626',
        '--chart-grid': 'rgba(0,0,0,0.1)',
        '--chart-axis': '#e2e8f0',
        '--chart-label': '#475569',
        '--chart-legend': '#334155',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#0f172a',
        '--chart-positive': '#059669',
        '--chart-negative': '#dc2626',
        '--chart-neutral': '#94a3b8',
        '--chart-accent-1': '#3b82f6',
        '--chart-accent-2': '#8b5cf6',
        '--chart-accent-3': '#d97706',
    },
};
