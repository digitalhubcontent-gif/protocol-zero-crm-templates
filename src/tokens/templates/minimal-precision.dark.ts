/**
 * CRM-04 — Minimal Precision
 * DARK MODE template override
 * Identity: Very dark near-black, white accent, still ultra-minimal.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#f5f5f5'; // white/light gray as "accent"

export const minimalPrecisionDark: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#0a0a0a',
    'bg-secondary': '#111111',
    'bg-surface': '#161616',
    'bg-elevated': '#1e1e1e',
    'bg-overlay': 'rgba(0,0,0,0.8)',
    'bg-critical': 'rgba(239,68,68,0.1)',
    'bg-success': 'rgba(16,185,129,0.08)',
    'bg-warning': 'rgba(234,179,8,0.08)',

    'text-primary': '#f5f5f5',
    'text-secondary': '#a0a0a0',
    'text-muted': '#5a5a5a',
    'text-inverse': '#0a0a0a',
    'text-critical': '#f87171',
    'text-success': '#10b981',
    'text-warning': '#eab308',

    'border-default': 'rgba(255,255,255,0.08)',
    'border-subtle': 'rgba(255,255,255,0.05)',
    'border-strong': 'rgba(255,255,255,0.2)',
    'border-critical': 'rgba(239,68,68,0.3)',

    'accent-primary': accent,
    'accent-muted': 'rgba(255,255,255,0.06)',
    'accent-border': 'rgba(255,255,255,0.15)',

    'status-success': '#10b981',
    'status-warning': '#eab308',
    'status-critical': '#ef4444',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': 'rgba(255,255,255,0.06)',
        '--crm-accent-border': 'rgba(255,255,255,0.15)',
        '--crm-sidebar-bg': '#111111',
        '--crm-sidebar-border': 'rgba(255,255,255,0.08)',
        '--bg-primary': '#0a0a0a',
        '--bg-secondary': '#111111',
        '--bg-card': '#161616',
        '--bg-elevated': '#1e1e1e',
        '--bg-overlay': 'rgba(0,0,0,0.8)',
        '--bg-critical': 'rgba(239,68,68,0.1)',
        '--text-primary': '#f5f5f5',
        '--text-secondary': '#a0a0a0',
        '--text-muted': '#5a5a5a',
        '--text-inverse': '#0a0a0a',
        '--text-critical': '#f87171',
        '--border-card': 'rgba(255,255,255,0.08)',
        '--border-subtle': 'rgba(255,255,255,0.05)',
        '--border-strong': 'rgba(255,255,255,0.2)',
        '--border-critical': 'rgba(239,68,68,0.3)',
        '--status-success': '#10b981',
        '--status-warning': '#eab308',
        '--status-danger': '#ef4444',
        '--status-info': '#3b82f6',
        '--border': 'rgba(255,255,255,0.08)',
        '--status-success-bg': 'rgba(16,185,129,0.12)',
        '--status-success-text': '#10b981',
        '--status-success-border': 'rgba(16,185,129,0.25)',
        '--status-warning-bg': 'rgba(234,179,8,0.12)',
        '--status-warning-text': '#eab308',
        '--status-warning-border': 'rgba(234,179,8,0.25)',
        '--status-danger-bg': 'rgba(239,68,68,0.12)',
        '--status-danger-text': '#f87171',
        '--status-danger-border': 'rgba(239,68,68,0.25)',
        '--status-info-bg': 'rgba(59,130,246,0.12)',
        '--status-info-text': '#3b82f6',
        '--status-info-border': 'rgba(59,130,246,0.25)',
        '--chart-grid': 'rgba(255,255,255,0.05)',
        '--chart-axis': 'rgba(255,255,255,0.1)',
        '--chart-label': '#5a5a5a',
        '--chart-legend': '#a0a0a0',
        '--chart-tooltip-bg': '#1e1e1e',
        '--chart-tooltip-text': '#f5f5f5',
        '--chart-positive': '#10b981',
        '--chart-negative': '#ef4444',
        '--chart-neutral': '#5a5a5a',
        '--chart-accent-1': '#f5f5f5',
        '--chart-accent-2': '#a0a0a0',
        '--chart-accent-3': '#5a5a5a',
    },
};
