/**
 * LAYER 4 — COMPONENT TOKENS
 * Maps semantic tokens to UI element roles.
 * Reference only semantic CSS variables here.
 */

// CSS variable names used by each UI component role
export const componentTokens = {
    card: {
        bg: 'var(--bg-card)',
        border: 'var(--border-card)',
        shadow: '0 1px 4px rgba(0,0,0,0.08)',
        padding: '24px',
        radius: '10px',
    },
    button: {
        primaryBg: 'var(--crm-accent)',
        primaryText: '#fff',
        secondaryBg: 'rgba(255,255,255,0.05)',
        secondaryBorder: 'var(--border-card)',
        dangerBg: 'var(--bg-critical)',
        radius: '6px',
        paddingX: '18px',
        paddingY: '9px',
    },
    table: {
        rowBg: 'transparent',
        rowHover: 'var(--bg-elevated)',
        border: 'var(--border-subtle)',
        headerBg: 'var(--bg-secondary)',
        headerText: 'var(--text-muted)',
        cellText: 'var(--text-primary)',
    },
    metric: {
        bg: 'var(--bg-elevated)',
        labelText: 'var(--text-muted)',
        valueText: 'var(--text-primary)',
        deltaPositive: 'var(--status-success)',
        deltaNegative: 'var(--status-danger)',
        accent: 'var(--crm-accent)',
        radius: '8px',
        padding: '16px 20px',
    },
    badge: {
        successBg: 'rgba(16,185,129,0.12)',
        successText: '#10b981',
        warningBg: 'rgba(245,158,11,0.12)',
        warningText: '#f59e0b',
        dangerBg: 'rgba(239,68,68,0.12)',
        dangerText: '#ef4444',
        neutralBg: 'rgba(100,116,139,0.12)',
        neutralText: 'var(--text-muted)',
        accentBg: 'var(--crm-accent-muted)',
        accentText: 'var(--crm-accent)',
        radius: '4px',
        padding: '3px 8px',
        fontSize: '0.6875rem',
        fontWeight: '600',
    },
    sidebar: {
        bg: 'var(--crm-sidebar-bg)',
        border: 'var(--crm-sidebar-border)',
        width: '280px',
    },
    nav: {
        bg: 'var(--bg-primary)',
        border: 'var(--border-subtle)',
        activeColor: 'var(--crm-accent)',
        inactiveText: 'var(--text-muted)',
    },
} as const;

export type ComponentTokenKey = keyof typeof componentTokens;
