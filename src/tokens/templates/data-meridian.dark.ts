/**
 * CRM-11 — Data Meridian
 * DARK MODE template override
 */
import type { SemanticTokens } from '../semantic';

const accent = '#e5e7eb';

export const dataMeridianDark: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#050508',
    'bg-secondary': '#0a0a12',
    'bg-surface': '#0f0f1a',
    'bg-elevated': '#14141e',
    'bg-overlay': 'rgba(0,0,0,0.7)',
    'bg-critical': 'rgba(239,68,68,0.12)',
    'bg-success': 'rgba(16,185,129,0.1)',
    'bg-warning': 'rgba(245,158,11,0.1)',

    'text-primary': '#f1f5f9',
    'text-secondary': '#94a3b8',
    'text-muted': '#64748b',
    'text-inverse': '#050508',
    'text-critical': '#f87171',
    'text-success': '#10b981',
    'text-warning': '#f59e0b',

    'border-default': '#1e293b',
    'border-subtle': 'rgba(255,255,255,0.06)',
    'border-strong': '#334155',
    'border-critical': 'rgba(239,68,68,0.35)',

    'accent-primary': accent,
    'accent-muted': 'rgba(229,231,235,0.1)',
    'accent-border': 'rgba(229,231,235,0.2)',

    'status-success': '#10b981',
    'status-warning': '#f59e0b',
    'status-critical': '#ef4444',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': 'rgba(229,231,235,0.1)',
        '--crm-accent-border': 'rgba(229,231,235,0.2)',
        '--crm-sidebar-bg': '#0a0a12',
        '--crm-sidebar-border': '#1e293b',
        '--bg-primary': '#050508',
        '--bg-secondary': '#0a0a12',
        '--bg-card': 'rgba(13,13,22,0.85)',
        '--bg-card-hover': 'rgba(20,20,35,0.95)',
        '--bg-elevated': '#14141e',
        '--bg-overlay': 'rgba(0,0,0,0.7)',
        '--bg-critical': 'rgba(239,68,68,0.12)',
        '--text-primary': '#f1f5f9',
        '--text-secondary': '#94a3b8',
        '--text-muted': '#64748b',
        '--text-inverse': '#050508',
        '--text-critical': '#f87171',
        '--border-card': 'rgba(255,255,255,0.07)',
        '--border-subtle': 'rgba(255,255,255,0.04)',
        '--border-strong': '#334155',
        '--border-critical': 'rgba(239,68,68,0.35)',
        '--status-success': '#10b981',
        '--status-warning': '#f59e0b',
        '--status-danger': '#ef4444',
        '--chart-grid': 'rgba(255,255,255,0.06)',
        '--chart-axis': '#334155',
        '--chart-label': '#64748b',
        '--chart-legend': '#94a3b8',
        '--chart-tooltip-bg': '#14141e',
        '--chart-tooltip-text': '#f1f5f9',
        '--chart-positive': '#10b981',
        '--chart-negative': '#ef4444',
        '--chart-neutral': '#64748b',
        '--chart-accent-1': '#3b82f6',
        '--chart-accent-2': '#8b5cf6',
        '--chart-accent-3': '#f59e0b',
    },
};
