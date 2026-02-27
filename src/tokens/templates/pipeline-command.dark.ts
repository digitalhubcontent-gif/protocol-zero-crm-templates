/**
 * CRM-05 — Pipeline Command
 * DARK MODE token override
 * Identity: GitHub-dark inspired, deep navy/slate, blue accent (#58a6ff), Agile Kanban aesthetic.
 */

const accent = '#58a6ff';
const warn = '#d29922';
const danger = '#f85149';
const success = '#3fb950';

export const pipelineCommandDark: { cssVars: Record<string, string> } = {
    cssVars: {
        '--crm-accent': accent,
        '--crm-accent-muted': `${accent}18`,
        '--crm-accent-border': `${accent}30`,
        '--crm-accent-hover': '#79b8ff',

        '--bg-primary': '#0d1117',
        '--bg-secondary': '#161b22',
        '--bg-card': '#1c2128',
        '--bg-elevated': '#22272e',
        '--bg-overlay': 'rgba(1,4,9,0.85)',
        '--bg-critical': `${danger}15`,
        '--bg-success': `${success}12`,
        '--bg-warning': `${warn}12`,

        '--text-primary': '#e6edf3',
        '--text-secondary': '#8b949e',
        '--text-muted': '#484f58',
        '--text-inverse': '#0d1117',
        '--text-critical': '#ff7b72',
        '--text-success': '#56d364',
        '--text-warning': '#e3b341',

        '--border-card': 'rgba(48,54,61,0.8)',
        '--border-subtle': 'rgba(48,54,61,0.4)',
        '--border-strong': `${accent}35`,
        '--border-critical': `${danger}40`,

        '--status-success': success,
        '--status-warning': warn,
        '--status-danger': danger,

        /* SLA status colors */
        '--sla-ok': success,
        '--sla-warn': warn,
        '--sla-breach': danger,

        /* Sidebar */
        '--crm-sidebar-bg': '#161b22',
        '--crm-sidebar-border': 'rgba(48,54,61,0.8)',

        /* Charts */
        '--chart-grid': 'rgba(255,255,255,0.04)',
        '--chart-axis': 'rgba(255,255,255,0.06)',
        '--chart-label': '#484f58',
        '--chart-legend': '#8b949e',
        '--chart-tooltip-bg': '#22272e',
        '--chart-tooltip-text': '#e6edf3',
        '--chart-positive': success,
        '--chart-negative': danger,
        '--chart-neutral': '#484f58',
        '--chart-accent-1': accent,
        '--chart-accent-2': danger,
        '--chart-accent-3': success,
        '--chart-accent-4': warn,

        /* Kanban stage colors */
        '--stage-prospect': '#58a6ff',
        '--stage-qualify': '#79c0ff',
        '--stage-discovery': '#a5d6ff',
        '--stage-demo': '#d29922',
        '--stage-proposal': '#3fb950',
        '--stage-negotiate': '#56d364',
    },
};
