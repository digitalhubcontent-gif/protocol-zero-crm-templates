/**
 * CRM-01 — Monolithic Enterprise
 * DARK MODE template override
 * Maps semantic tokens → core values for this template identity.
 */
import type { SemanticTokens } from '../semantic';

// Accent: Sky blue #0ea5e9
const accent = '#0ea5e9';

export const monolithicEnterpriseDark: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#0a0f1a',
    'bg-secondary': '#111827',
    'bg-surface': '#151f2e',
    'bg-elevated': '#1a2435',
    'bg-overlay': 'rgba(0,0,0,0.7)',
    'bg-critical': 'rgba(239,68,68,0.12)',
    'bg-success': 'rgba(16,185,129,0.1)',
    'bg-warning': 'rgba(245,158,11,0.1)',

    'text-primary': '#f1f5f9',
    'text-secondary': '#94a3b8',
    'text-muted': '#64748b',
    'text-inverse': '#0a0f1a',
    'text-critical': '#f87171',
    'text-success': '#10b981',
    'text-warning': '#f59e0b',

    'border-default': '#1e293b',
    'border-subtle': 'rgba(255,255,255,0.06)',
    'border-strong': '#334155',
    'border-critical': 'rgba(239,68,68,0.35)',

    'accent-primary': accent,
    'accent-muted': `${accent}1a`,
    'accent-border': `${accent}30`,

    'status-success': '#10b981',
    'status-warning': '#f59e0b',
    'status-critical': '#ef4444',

    // Extra CSS vars specific to this template
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}1a`,
        '--crm-accent-border': `${accent}30`,
        '--crm-sidebar-bg': '#0d1424',
        '--crm-sidebar-border': '#1a2435',
        '--bg-primary': '#0a0f1a',
        '--bg-secondary': '#111827',
        '--bg-card': '#151f2e',
        '--bg-elevated': '#1a2435',
        '--bg-overlay': 'rgba(0,0,0,0.7)',
        '--bg-critical': 'rgba(239,68,68,0.12)',
        '--text-primary': '#f1f5f9',
        '--text-secondary': '#94a3b8',
        '--text-muted': '#64748b',
        '--text-inverse': '#0a0f1a',
        '--text-critical': '#f87171',
        '--border-card': '#1e293b',
        '--border-subtle': 'rgba(255,255,255,0.06)',
        '--border-strong': '#334155',
        '--border-critical': 'rgba(239,68,68,0.35)',
        '--status-success': '#10b981',
        '--status-warning': '#f59e0b',
        '--status-danger': '#ef4444',
        // Chart
        '--chart-grid': 'rgba(255,255,255,0.06)',
        '--chart-axis': '#334155',
        '--chart-label': '#64748b',
        '--chart-legend': '#94a3b8',
        '--chart-tooltip-bg': '#1a2435',
        '--chart-tooltip-text': '#f1f5f9',
        '--chart-positive': '#10b981',
        '--chart-negative': '#ef4444',
        '--chart-neutral': '#64748b',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#8b5cf6',
        '--chart-accent-3': '#f59e0b',
    },
};
