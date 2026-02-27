import type { CrmTemplate } from './types';

export const CRM_TEMPLATES: CrmTemplate[] = [
    {
        id: 'crm-01',
        name: 'Monolithic Enterprise',
        slug: 'crm-01',
        tagline: 'Dense data architecture for large-scale enterprise CRM operations.',
        category: 'Enterprise',
        description:
            'A sidebar-dominant, data-heavy layout built for organizations managing complex multi-team sales pipelines. Optimized for information density and rapid access.',
        accentColor: '#0ea5e9',
        heroStyle: 'sidebar-split',
        order: 1,
    },
    {
        id: 'crm-02',
        name: 'AI Command Center',
        slug: 'crm-02',
        tagline: 'Unified AI intelligence hub for automated revenue operations.',
        category: 'AI-Focused',
        description:
            'Full-bleed dark interface with neon accent lines and single-focus section flow. Built around AI-first decision making and automated pipeline management.',
        accentColor: '#22d3ee',
        heroStyle: 'full-bleed-dark',
        order: 2,
    },
    {
        id: 'crm-03',
        name: 'Financial Intelligence',
        slug: 'crm-03',
        tagline: 'Bloomberg-grade analytics and revenue attribution for revenue teams.',
        category: 'Analytics-Heavy',
        description:
            'Data-table first design with tight grid spacing, inspired by financial terminal aesthetics. Built for teams that live inside spreadsheets and need CRM to match.',
        accentColor: '#f59e0b',
        heroStyle: 'terminal-grid',
        order: 3,
    },
    {
        id: 'crm-04',
        name: 'Minimal Precision',
        slug: 'crm-04',
        tagline: 'Swiss-grid editorial design for modern enterprise sales teams.',
        category: 'Enterprise',
        description:
            'White-space dominant, editorial-first layout using the Swiss grid system. Maximum signal-to-noise ratio. Every element earns its position.',
        accentColor: '#6366f1',
        heroStyle: 'editorial-clean',
        order: 4,
    },
    {
        id: 'crm-05',
        name: 'Pipeline Command',
        slug: 'crm-05',
        tagline: 'Kanban-native CRM built around deal flow velocity.',
        category: 'Sales-Heavy',
        description:
            'Horizontal pipeline boards as the primary UI paradigm. Built for SDR and AE teams who manage deals through visual stage progression.',
        accentColor: '#10b981',
        heroStyle: 'kanban-hero',
        order: 5,
    },
    {
        id: 'crm-06',
        name: 'Neural Analytics',
        slug: 'crm-06',
        tagline: 'Asymmetric AI-native interface for behavioral intelligence.',
        category: 'AI-Focused',
        description:
            'Asymmetric section composition with oversized data visualization panels. Built for teams where AI-driven behavioral analytics are the primary lens.',
        accentColor: '#a78bfa',
        heroStyle: 'asymmetric-dash',
        order: 6,
    },
    {
        id: 'crm-07',
        name: 'Sovereign Enterprise',
        slug: 'crm-07',
        tagline: 'Structured authority for Fortune 500 CRM deployments.',
        category: 'Enterprise',
        description:
            'Classic enterprise design language reinterpreted through a modern lens. Strict column structure, conservative typography, and no visual noise.',
        accentColor: '#475569',
        heroStyle: 'column-authority',
        order: 7,
    },
    {
        id: 'crm-08',
        name: 'Velocity Sales',
        slug: 'crm-08',
        tagline: 'Bold, fast, relentless. Peak performance for high-velocity sales.',
        category: 'Sales-Heavy',
        description:
            'Oversized typography and speed-focused metrics. Every layout decision reinforces urgency and momentum. Built for teams measured in hourly metrics.',
        accentColor: '#ef4444',
        heroStyle: 'bold-oversized',
        order: 8,
    },
    {
        id: 'crm-09',
        name: 'Sovereign Enterprise',
        slug: 'crm-09',
        tagline: 'Board-grade revenue governance for enterprise leadership.',
        category: 'Enterprise',
        description:
            'Structured grid with strong typography and muted enterprise palette. Built for CROs, CEOs, and board members demanding forecast accuracy, risk escalation, and presentation-ready revenue intelligence.',
        accentColor: '#3b82f6',
        heroStyle: 'enterprise-governance',
        order: 9,
    },
    {
        id: 'crm-10',
        name: 'Apex Protocol',
        slug: 'crm-10',
        tagline: 'Defense-grade compliance and revenue security platform.',
        category: 'Enterprise',
        description:
            'Dark structured, secure aesthetic with compliance indicators and immutable logs. Built for Chief Compliance Officers and Revenue Security Leads demanding audit-ready compliance integrity.',
        accentColor: '#10b981',
        heroStyle: 'compliance-dark',
        order: 10,
    },
    {
        id: 'crm-11',
        name: 'Data Meridian',
        slug: 'crm-11',
        tagline: 'Always-on comparative intelligence across every revenue dimension.',
        category: 'Analytics-Heavy',
        description:
            'Purpose-built dual-pane layout where every metric, chart, and table shows Segment A vs Segment B. Delta-only accent coloring with neutral base — the variance IS the insight.',
        accentColor: '#e5e7eb',
        heroStyle: 'dual-pane-comparative',
        order: 11,
    },
    {
        id: 'crm-12',
        name: 'Obsidian Operations',
        slug: 'crm-12',
        tagline: 'Capacity-first revenue operations with scenario modeling.',
        category: 'Enterprise',
        description:
            'Dark operational command center with bold numerics and orange urgency accent. Built for RevOps leaders tracking headcount efficiency, capacity utilization, and territory coverage.',
        accentColor: '#f97316',
        heroStyle: 'ops-command',
        order: 12,
    },
];

export function getTemplateBySlug(slug: string): CrmTemplate | undefined {
    return CRM_TEMPLATES.find((t) => t.slug === slug);
}

export function getAdjacentTemplates(slug: string): {
    prev: CrmTemplate | null;
    next: CrmTemplate | null;
} {
    const index = CRM_TEMPLATES.findIndex((t) => t.slug === slug);
    return {
        prev: index > 0 ? CRM_TEMPLATES[index - 1] : null,
        next: index < CRM_TEMPLATES.length - 1 ? CRM_TEMPLATES[index + 1] : null,
    };
}

export const TEMPLATE_CATEGORIES = [
    'All',
    'Enterprise',
    'AI-Focused',
    'Sales-Heavy',
    'Analytics-Heavy',
] as const;
