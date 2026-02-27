/**
 * CRM-01 — Monolithic Enterprise
 * LIGHT MODE template override
 */
import type { SemanticTokens } from '../semantic';

const accent = '#0ea5e9';

export const monolithicEnterpriseLight: Omit<SemanticTokens, 'chart'> & {
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
    'text-muted': '#64748b',
    'text-inverse': '#ffffff',
    'text-critical': '#dc2626',
    'text-success': '#059669',
    'text-warning': '#d97706',

    'border-default': '#e2e8f0',
    'border-subtle': 'rgba(0,0,0,0.12)',
    'border-strong': '#cbd5e1',
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
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f8fafc',
        '--bg-overlay': 'rgba(0,0,0,0.5)',
        '--bg-critical': 'rgba(239,68,68,0.08)',
        '--text-primary': '#0f172a',
        '--text-secondary': '#334155',
        '--text-muted': '#64748b',
        '--text-inverse': '#ffffff',
        '--text-critical': '#dc2626',
        '--border-card': '#e2e8f0',
        '--border-subtle': 'rgba(0,0,0,0.12)',
        '--border-strong': '#cbd5e1',
        '--border-critical': 'rgba(239,68,68,0.25)',
        '--status-success': '#059669',
        '--status-warning': '#d97706',
        '--status-danger': '#dc2626',
        '--chart-grid': 'rgba(0,0,0,0.12)',
        '--chart-axis': '#e2e8f0',
        '--chart-label': '#64748b',
        '--chart-legend': '#475569',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#0f172a',
        '--chart-positive': '#059669',
        '--chart-negative': '#dc2626',
        '--chart-neutral': '#64748b',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#8b5cf6',
        '--chart-accent-3': '#d97706',
    },
};
