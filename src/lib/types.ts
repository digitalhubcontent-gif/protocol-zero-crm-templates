export type TemplateCategory = 'Enterprise' | 'AI-Focused' | 'Sales-Heavy' | 'Analytics-Heavy';

export type HeroStyle =
    | 'sidebar-split'
    | 'full-bleed-dark'
    | 'terminal-grid'
    | 'editorial-clean'
    | 'kanban-hero'
    | 'asymmetric-dash'
    | 'column-authority'
    | 'bold-oversized'
    | 'split-screen'
    | 'ultra-dark-minimal'
    | 'editorial-metrics'
    | 'structured-defense'
    | 'enterprise-governance'
    | 'compliance-dark'
    | 'dual-pane-comparative'
    | 'ops-command';

export interface CrmTemplate {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    category: TemplateCategory;
    description: string;
    accentColor: string;
    heroStyle: HeroStyle;
    order: number;
}

export interface NavItem {
    label: string;
    href: string;
}

export interface MetricData {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

export interface PipelineStage {
    name: string;
    count: number;
    value: string;
    percentage: number;
}

export interface ContactRecord {
    id: string;
    name: string;
    company: string;
    role: string;
    status: 'Active' | 'Lead' | 'Prospect' | 'Churned';
    value: string;
    lastContact: string;
}

export interface ActivityLog {
    id: string;
    type: 'call' | 'email' | 'meeting' | 'note' | 'deal';
    description: string;
    timestamp: string;
    user: string;
}

export interface PricingTier {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
    cta: string;
}

export type Theme = 'dark' | 'light';

export interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}
