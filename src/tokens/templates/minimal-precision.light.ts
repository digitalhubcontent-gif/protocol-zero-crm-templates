/**
 * CRM-04 — Minimal Precision
 * LIGHT MODE template override (light-first by design intent)
 * Identity: Pure white, black accent, maximum whitespace, Swiss editorial.
 */
import type { SemanticTokens } from '../semantic';

const accent = '#0a0a0a'; // black is the accent

export const minimalPrecisionLight: Omit<SemanticTokens, 'chart'> & {
    cssVars: Record<string, string>;
} = {
    'bg-primary': '#ffffff',
    'bg-secondary': '#f8f8f8',
    'bg-surface': '#ffffff',
    'bg-elevated': '#f2f2f2',
    'bg-overlay': 'rgba(0,0,0,0.4)',
    'bg-critical': 'rgba(220,38,38,0.06)',
    'bg-success': 'rgba(5,150,105,0.06)',
    'bg-warning': 'rgba(180,83,9,0.06)',

    'text-primary': '#050505',
    'text-secondary': '#2e2e2e',
    'text-muted': '#5c5c5c',
    'text-inverse': '#ffffff',
    'text-critical': '#dc2626',
    'text-success': '#059669',
    'text-warning': '#b45309',

    'border-default': 'rgba(0,0,0,0.12)',
    'border-subtle': 'rgba(0,0,0,0.08)',
    'border-strong': 'rgba(0,0,0,0.35)',
    'border-critical': 'rgba(220,38,38,0.2)',

    'accent-primary': accent,
    'accent-muted': 'rgba(0,0,0,0.06)',
    'accent-border': 'rgba(0,0,0,0.15)',

    'status-success': '#059669',
    'status-warning': '#b45309',
    'status-critical': '#dc2626',

    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': 'rgba(0,0,0,0.06)',
        '--crm-accent-border': 'rgba(0,0,0,0.15)',
        '--crm-sidebar-bg': '#f8f8f8',
        '--crm-sidebar-border': 'rgba(0,0,0,0.08)',
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f8f8f8',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f2f2f2',
        '--bg-overlay': 'rgba(0,0,0,0.4)',
        '--bg-critical': 'rgba(220,38,38,0.06)',
        '--text-primary': '#050505',
        '--text-secondary': '#2e2e2e',
        '--text-muted': '#5c5c5c',
        '--text-inverse': '#ffffff',
        '--text-critical': '#dc2626',
        '--border-card': 'rgba(0,0,0,0.12)',
        '--border-subtle': 'rgba(0,0,0,0.08)',
        '--border-strong': 'rgba(0,0,0,0.35)',
        '--border-critical': 'rgba(220,38,38,0.2)',
        '--status-success': '#059669',
        '--status-warning': '#b45309',
        '--status-danger': '#dc2626',
        '--status-info': '#1d4ed8',
        '--border': 'rgba(0,0,0,0.12)',
        '--status-success-bg': 'rgba(5,150,105,0.06)',
        '--status-success-text': '#059669',
        '--status-success-border': 'rgba(5,150,105,0.15)',
        '--status-warning-bg': 'rgba(180,83,9,0.06)',
        '--status-warning-text': '#b45309',
        '--status-warning-border': 'rgba(180,83,9,0.15)',
        '--status-danger-bg': 'rgba(220,38,38,0.06)',
        '--status-danger-text': '#dc2626',
        '--status-danger-border': 'rgba(220,38,38,0.15)',
        '--status-info-bg': 'rgba(29,78,216,0.06)',
        '--status-info-text': '#1d4ed8',
        '--status-info-border': 'rgba(29,78,216,0.15)',
        '--chart-grid': 'rgba(0,0,0,0.08)',
        '--chart-axis': 'rgba(0,0,0,0.15)',
        '--chart-label': '#5c5c5c',
        '--chart-legend': '#2e2e2e',
        '--chart-tooltip-bg': '#050505',
        '--chart-tooltip-text': '#ffffff',
        '--chart-positive': '#059669',
        '--chart-negative': '#dc2626',
        '--chart-neutral': '#8a8a8a',
        '--chart-accent-1': '#0a0a0a',
        '--chart-accent-2': '#3a3a3a',
        '--chart-accent-3': '#6a6a6a',
    },
};
