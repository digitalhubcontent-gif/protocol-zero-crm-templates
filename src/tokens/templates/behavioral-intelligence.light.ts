/**
 * CRM-07 — Behavioral Intelligence
 * LIGHT MODE: Crisp white canvas, violet accents, green/red sentiment indicators.
 * All text/surface colors optimized for contrast against white backgrounds.
 */

const accent = '#7c3aed';   // Darker violet for light mode legibility
const warn = '#b45309';
const danger = '#dc2626';
const success = '#059669';
const sentimentPos = '#059669';
const sentimentNeg = '#dc2626';

export const behavioralIntelligenceLight: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}0e`,
        '--crm-accent-border': `${accent}22`,
        '--crm-accent-hover': '#6d28d9',

        '--bg-primary': '#faf9ff',
        '--bg-secondary': '#f3f0ff',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f3f0ff',
        '--bg-overlay': 'rgba(0,0,0,0.65)',
        '--bg-critical': '#fef2f2',
        '--bg-success': '#f0fdf4',
        '--bg-warning': '#fffbeb',

        '--text-primary': '#1e1b4b',
        '--text-secondary': '#3f3185', // Darkened from #4c3d99
        '--text-muted': '#625194', // Darkened from #7c6aaf
        '--text-inverse': '#ffffff',
        '--text-critical': '#991b1b',
        '--text-success': '#065f46',
        '--text-warning': '#78350f',

        '--border-card': 'rgba(139,92,246,0.25)', // Increased from 0.20
        '--border-subtle': 'rgba(139,92,246,0.15)', // Increased from 0.10
        '--border-strong': `${accent}28`,
        '--border-critical': `${danger}30`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        '--crm-sidebar-bg': '#ffffff',
        '--crm-sidebar-border': 'rgba(139,92,246,0.18)',

        '--chart-grid': 'rgba(0,0,0,0.06)', // Increased from 0.04
        '--chart-axis': 'rgba(0,0,0,0.12)', // Increased from 0.07
        '--chart-label': '#625194', // Darkened from #7c6aaf
        '--chart-legend': '#3f3185', // Darkened from #4c3d99
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#1e1b4b',
        '--chart-positive': sentimentPos,
        '--chart-negative': sentimentNeg,
        '--chart-neutral': '#6b7280',
        '--chart-accent-1': accent,
        '--chart-accent-2': '#0891b2',
        '--chart-accent-3': sentimentPos,
        '--chart-accent-4': sentimentNeg,

        '--sentiment-positive': sentimentPos,
        '--sentiment-negative': sentimentNeg,
        '--sentiment-neutral': '#6b7280',
        '--neural-pulse': `${accent}25`,
        '--ai-panel-bg': '#f3f0ff',
        '--ai-panel-border': `${accent}20`,

        '--ai-high': '#059669',
        '--ai-medium': accent,
        '--ai-low': '#dc2626',
    },
};
