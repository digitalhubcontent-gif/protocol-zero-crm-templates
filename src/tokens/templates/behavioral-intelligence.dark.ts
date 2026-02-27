/**
 * CRM-07 — Behavioral Intelligence
 * DARK MODE: Deep neutral-dark, violet neural accent, dual sentiment colors.
 */

const accent = '#8b5cf6';   // Violet — neural/AI intelligence
const warn = '#f59e0b';
const danger = '#ef4444';
const success = '#10b981';
const sentimentPos = '#10b981';
const sentimentNeg = '#ef4444';

export const behavioralIntelligenceDark: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}12`,
        '--crm-accent-border': `${accent}28`,
        '--crm-accent-hover': '#a78bfa',

        '--bg-primary': '#0f0f13',
        '--bg-secondary': '#141419',
        '--bg-card': '#1a1a22',
        '--bg-elevated': '#201f2c',
        '--bg-overlay': 'rgba(4,3,12,0.92)',
        '--bg-critical': `${danger}12`,
        '--bg-success': `${success}10`,
        '--bg-warning': `${warn}10`,

        '--text-primary': '#ede9fe',
        '--text-secondary': '#a78bfa',
        '--text-muted': '#6b5fa5',
        '--text-inverse': '#0f0f13',
        '--text-critical': '#fca5a5',
        '--text-success': '#6ee7b7',
        '--text-warning': '#fcd34d',

        '--border-card': 'rgba(139,92,246,0.15)',
        '--border-subtle': 'rgba(139,92,246,0.08)',
        '--border-strong': `${accent}35`,
        '--border-critical': `${danger}35`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#141419',
        '--crm-sidebar-border': 'rgba(139,92,246,0.18)',

        '--chart-grid': 'rgba(139,92,246,0.07)',
        '--chart-axis': 'rgba(139,92,246,0.12)',
        '--chart-label': '#6b5fa5',
        '--chart-legend': '#a78bfa',
        '--chart-tooltip-bg': '#201f2c',
        '--chart-tooltip-text': '#ede9fe',
        '--chart-positive': sentimentPos,
        '--chart-negative': sentimentNeg,
        '--chart-neutral': '#6b7280',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#06b6d4',
        '--chart-accent-3': sentimentPos,
        '--chart-accent-4': sentimentNeg,

        '--sentiment-positive': sentimentPos,
        '--sentiment-negative': sentimentNeg,
        '--sentiment-neutral': '#6b7280',
        '--neural-pulse': `${accent}40`,
        '--ai-panel-bg': '#201f2c',
        '--ai-panel-border': `${accent}22`,

        '--ai-high': '#10b981',
        '--ai-medium': accent,
        '--ai-low': '#ef4444',
    },
};
