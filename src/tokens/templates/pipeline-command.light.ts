/**
 * CRM-05 — Pipeline Command
 * LIGHT MODE token override
 * Identity: GitHub light — clean white canvas, deep blue accent.
 */

const accent = '#0969da';
const warn = '#bf8700';
const danger = '#cf222e';
const success = '#1a7f37';

export const pipelineCommandLight: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}10`,
        '--crm-accent-border': `${accent}25`,
        '--crm-accent-hover': '#0550ae',

        '--bg-primary': '#f6f8fa',
        '--bg-secondary': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-elevated': '#f6f8fa',
        '--bg-overlay': 'rgba(0,0,0,0.7)',
        '--bg-critical': '#ffebe9',
        '--bg-success': '#dafbe1',
        '--bg-warning': '#fff8c5',

        '--text-primary': '#1f2328',
        '--text-secondary': '#424a53', // Darkened from #57606a
        '--text-muted': '#656d76', // Darkened from #8c959f
        '--text-inverse': '#ffffff',
        '--text-critical': '#82071e',
        '--text-success': '#116329',
        '--text-warning': '#7d4e00',

        '--border-card': 'rgba(208,215,222,0.8)',
        '--border-subtle': 'rgba(208,215,222,0.5)',
        '--border-strong': `${accent}30`,
        '--border-critical': `${danger}35`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        /* SLA */
        '--sla-ok': success,
        '--sla-warn': warn,
        '--sla-breach': danger,

        '--crm-sidebar-bg': '#ffffff',
        '--crm-sidebar-border': 'rgba(208,215,222,0.8)',

        '--chart-grid': 'rgba(0,0,0,0.05)',
        '--chart-axis': 'rgba(0,0,0,0.08)',
        '--chart-label': '#656d76',
        '--chart-legend': '#424a53',
        '--chart-tooltip-bg': '#ffffff',
        '--chart-tooltip-text': '#1f2328',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#656d76',
        '--chart-accent-1': accent,
        '--chart-accent-2': danger,
        '--chart-accent-3': success,
        '--chart-accent-4': warn,

        '--stage-prospect': '#0969da',
        '--stage-qualify': '#0550ae',
        '--stage-discovery': '#218bff',
        '--stage-demo': '#bf8700',
        '--stage-proposal': '#1a7f37',
        '--stage-negotiate': '#2da44e',
    },
};
