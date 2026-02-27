/**
 * MOTION TOKENS
 * Govern animation durations and easing across all templates.
 * Each template class may restrict which tokens it uses — enforced by convention.
 */

export const duration = {
    instant: 0,
    fast: 120,   // ms — Sovereign, Apex, Velocity
    normal: 200,   // ms — most templates
    slow: 320,   // ms — Neural, smooth transitions
    crawl: 480,   // ms — dramatic reveals
} as const;

export const ease = {
    // Standard UI motion
    standard: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
    // Enterprise — slightly slower, more deliberate
    enterprise: [0.4, 0.0, 0.4, 1.0] as [number, number, number, number],
    // Smooth reveal — deceleration
    smooth: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    // Snappy, overshoot minimal
    snap: [0.2, 0.0, 0.0, 1.0] as [number, number, number, number],
    // Enter from below (lift)
    lift: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
} as const;

// ─── PAGE TRANSITION PRESETS ──────────────────────────────────────────────────
export const pageTransitions = {
    // CRM-01 Monolithic Enterprise — clean, data-driven slide
    'monolithic-enterprise': {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: duration.normal / 1000, ease: ease.enterprise },
    },
    // CRM-02 AI Command Center — fast, system-booting feel
    'ai-command-center': {
        initial: { opacity: 0, filter: 'blur(4px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, filter: 'blur(2px)' },
        transition: { duration: duration.fast / 1000, ease: ease.standard },
    },
    // Default fallback
    default: {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: duration.normal / 1000, ease: ease.standard },
    },
} as const;

// Template name → motion profile mapping
export const templateMotionProfile: Record<string, keyof typeof pageTransitions> = {
    'crm-01': 'monolithic-enterprise',
    'crm-02': 'ai-command-center',
};

export function getPageTransition(templateSlug: string) {
    const profile = templateMotionProfile[templateSlug] ?? 'default';
    return pageTransitions[profile];
}

export type DurationScale = typeof duration;
export type EaseScale = typeof ease;
export type PageTransitionProfile = keyof typeof pageTransitions;
