/**
 * CRM-02 — AI Command Center
 * DARK MODE template override
 * Identity: Near-black, neon violet-purple accent, terminal aesthetic.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#a855f7';

export const aiCommandCenterDark: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#06060f',
    'bg-secondary': '#0c0c1a',
    'bg-surface': '#0f0f20',
    'bg-elevated': '#141425',
    'bg-overlay': 'rgba(0,0,0,0.85)',
    'bg-critical': 'rgba(239,68,68,0.1)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': 'rgba(245,158,11,0.08)',

    'text-primary': 'rgba(255,255,255,0.9)',
    'text-secondary': 'rgba(255,255,255,0.5)',
    'text-muted': 'rgba(255,255,255,0.28)',
    'text-inverse': '#06060f',
    'text-critical': '#f87171',
    'text-success': '#10b981',
    'text-warning': '#f59e0b',

    'border-default': `${accent}18`,
    'border-subtle': `${accent}0d`,
    'border-strong': `${accent}35`,
    'border-critical': 'rgba(239,68,68,0.3)',

    'accent-primary': accent,
    'accent-muted': `${accent}1a`,
    'accent-border': `${accent}30`,

    'status-success': '#10b981',
    'status-warning': '#f59e0b',
    'status-critical': '#ef4444',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}1a`,
        '--crm-accent-border': `${accent}30`,
        '--crm-sidebar-bg': '#08081a',
        '--crm-sidebar-border': `${accent}15`,
        '--bg-primary': '#06060f',
        '--bg-secondary': '#0c0c1a',
        '--bg-card': '#0f0f20',
        '--bg-elevated': '#141425',
        '--bg-overlay': 'rgba(0,0,0,0.85)',
        '--bg-critical': 'rgba(239,68,68,0.1)',
        '--text-primary': 'rgba(255,255,255,0.9)',
        '--text-secondary': 'rgba(255,255,255,0.5)',
        '--text-muted': 'rgba(255,255,255,0.28)',
        '--text-inverse': '#06060f',
        '--text-critical': '#f87171',
        '--text-accent': '#22d3ee',
        '--border-card': `${accent}18`,
        '--border-subtle': `${accent}0d`,
        '--border-strong': `${accent}35`,
        '--border-critical': 'rgba(239,68,68,0.3)',
        '--status-success': '#10b981',
        '--status-warning': '#f59e0b',
        '--status-danger': '#ef4444',
        // Chart
        '--chart-grid': `${accent}10`,
        '--chart-axis': `${accent}20`,
        '--chart-label': 'rgba(255,255,255,0.25)',
        '--chart-legend': 'rgba(255,255,255,0.4)',
        '--chart-tooltip-bg': '#141425',
        '--chart-tooltip-text': 'rgba(255,255,255,0.9)',
        '--chart-positive': '#10b981',
        '--chart-negative': '#ef4444',
        '--chart-neutral': 'rgba(255,255,255,0.25)',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#06b6d4',
        '--chart-accent-3': '#f59e0b',
    },
};
