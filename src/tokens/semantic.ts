/**
 * LAYER 2 — SEMANTIC TOKENS
 * Purpose-driven token definitions. All components must consume only these.
 * No component may reference core tokens (neutral, color, space) directly.
 *
 * These are expressed as CSS custom property names that the ThemeProvider
 * injects with template-specific values.
 */

import type { ChartTokens } from './charts';

// ─── SEMANTIC TOKEN INTERFACE ─────────────────────────────────────────────────
export interface SemanticTokens {
    // Backgrounds
    'bg-primary': string;
    'bg-secondary': string;
    'bg-surface': string;
    'bg-elevated': string;
    'bg-overlay': string;
    'bg-critical': string;
    'bg-success': string;
    'bg-warning': string;

    // Text
    'text-primary': string;
    'text-secondary': string;
    'text-muted': string;
    'text-inverse': string;
    'text-critical': string;
    'text-success': string;
    'text-warning': string;

    // Borders
    'border-default': string;
    'border-subtle': string;
    'border-strong': string;
    'border-critical': string;

    // Template accent (the distinctive per-CRM color)
    'accent-primary': string;
    'accent-muted': string;   // accent at ~15% opacity, for backgrounds
    'accent-border': string;   // accent at ~25% opacity, for borders

    // Status
    'status-success': string;
    'status-warning': string;
    'status-critical': string;

    // Chart tokens (map to ChartTokens)
    chart: ChartTokens;
}

// ─── CSS VARIABLE MAPPING ─────────────────────────────────────────────────────
/** All flat (non-chart) semantic tokens → CSS variable name */
export const semanticCssVars = {
    'bg-primary': '--bg-primary',
    'bg-secondary': '--bg-secondary',
    'bg-surface': '--bg-card',
    'bg-elevated': '--bg-elevated',
    'bg-overlay': '--bg-overlay',
    'bg-critical': '--bg-critical',
    'bg-success': '--bg-success',
    'bg-warning': '--bg-warning',

    'text-primary': '--text-primary',
    'text-secondary': '--text-secondary',
    'text-muted': '--text-muted',
    'text-inverse': '--text-inverse',
    'text-critical': '--text-critical',
    'text-success': '--status-success',
    'text-warning': '--status-warning',

    'border-default': '--border-card',
    'border-subtle': '--border-subtle',
    'border-strong': '--border-strong',
    'border-critical': '--border-critical',

    'accent-primary': '--crm-accent',
    'accent-muted': '--crm-accent-muted',
    'accent-border': '--crm-accent-border',

    'status-success': '--status-success',
    'status-warning': '--status-warning',
    'status-critical': '--status-danger',
} as const;

export type SemanticCssVarKey = keyof typeof semanticCssVars;
