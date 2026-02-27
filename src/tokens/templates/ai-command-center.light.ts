/**
 * CRM-02 — AI Command Center
 * LIGHT MODE template override
 * Identity: Pure white, violet accent, clean terminal references.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#a855f7';

export const aiCommandCenterLight: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#fafafa',
    'bg-secondary': '#f4f4f8',
    'bg-surface': '#ffffff',
    'bg-elevated': '#f4f4f8',
    'bg-overlay': 'rgba(0,0,0,0.5)',
    'bg-critical': 'rgba(239,68,68,0.08)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': 'rgba(245,158,11,0.08)',

    'text-primary': '#0f0f20',
    'text-secondary': '#33334b',
    'text-muted': '#5c5c77',
    'text-inverse': '#ffffff',
    'text-critical': '#dc2626',
    'text-success': '#059669',
    'text-warning': '#d97706',

    'border-default': `${accent}20`,
    'border-subtle': 'rgba(0,0,0,0.12)',
    'border-strong': `${accent}35`,
    'border-critical': 'rgba(239,68,68,0.2)',

    'accent-primary': accent,
    'accent-muted': `${accent}10`,
    'accent-border': `${accent}25`,

    'status-success': '#059669',
    'status-warning': '#d97706',
    'status-critical': '#dc2626',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}10`,
        '--crm-accent-border': `${accent}25`,
        '--crm-sidebar-bg': '#f4f4f8',
        '--crm-sidebar-border': `${accent}15`,
        '--bg-primary': '#fafafa',
        '--bg-secondary': '#f4f4f8',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f4f4f8',
        '--bg-overlay': 'rgba(0,0,0,0.5)',
        '--bg-critical': 'rgba(239,68,68,0.08)',
        '--text-primary': '#0f0f20',
        '--text-secondary': '#33334b',
        '--text-muted': '#5c5c77',
        '--text-inverse': '#ffffff',
        '--text-critical': '#dc2626',
        '--text-accent': '#0891b2',
        '--border-card': `${accent}20`,
        '--border-subtle': 'rgba(0,0,0,0.12)',
        '--border-strong': `${accent}35`,
        '--border-critical': 'rgba(239,68,68,0.2)',
        '--status-success': '#059669',
        '--status-warning': '#d97706',
        '--status-danger': '#dc2626',
        '--chart-grid': 'rgba(0,0,0,0.12)',
        '--chart-axis': `${accent}20`,
        '--chart-label': '#5c5c77',
        '--chart-legend': '#33334b',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#0f0f20',
        '--chart-positive': '#059669',
        '--chart-negative': '#dc2626',
        '--chart-neutral': '#5c5c77',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#06b6d4',
        '--chart-accent-3': '#d97706',
    },
};
