import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Features — Monolithic Enterprise CRM',
    description: 'Full feature set of the Monolithic Enterprise CRM platform.',
};

const featureGroups = [
    {
        category: 'Revenue Intelligence',
        features: [
            { name: 'Predictive Deal Forecasting', desc: 'LSTM-powered models forecast close probability and ARR impact with 94% accuracy at 90-day horizon.' },
            { name: 'AI Deal Scoring', desc: '40+ behavioral signals processed hourly — email activity, meeting cadence, engagement velocity — surfaced as actionable health score.' },
            { name: 'Pipeline Coverage Analysis', desc: 'Real-time coverage ratios by stage, team, and quarter with trend deviation alerts.' },
            { name: 'Cohort Revenue Retention', desc: 'Net revenue retention tracked across close cohorts — 3, 6, and 12-month windows, by segment and ACV band.' },
        ],
    },
    {
        category: 'Pipeline Management',
        features: [
            { name: 'Multi-Team Pipeline Board', desc: 'Kanban-style pipeline view with per-rep and per-team filtering, deal age indicators, and stage health metrics.' },
            { name: 'Deal Age & Velocity Alerts', desc: 'Automatic flags for stale opportunities beyond configurable aging thresholds.' },
            { name: 'Large Deal Review Gates', desc: 'Mandatory VP approval workflows triggered on high-value opportunities entering late stages.' },
            { name: 'Stage Conversion Benchmarks', desc: 'Team conversion rates compared to industry benchmarks and historical company performance.' },
        ],
    },
    {
        category: 'Execution & Automation',
        features: [
            { name: 'No-Code Workflow Builder', desc: 'Drag-and-drop automation for multi-step revenue processes — alerts, approvals, task creation, and Slack notifications.' },
            { name: 'Smart Activity Capture', desc: 'Automatic logging of calls, emails, and meetings with AI-generated summaries and next-step recommendations.' },
            { name: 'Quota Attainment Tracking', desc: 'Individual and team quota dashboards updated in real time, with ramp-time-adjusted expectations for new hires.' },
            { name: 'Expansion Revenue Triggers', desc: 'Automated expansion opportunity creation when accounts hit configurable retention and engagement thresholds.' },
        ],
    },
];

export default function Crm01Features() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="features" accentColor={accent}>
            <div style={{ padding: '40px 32px' }}>

                {/* Header */}
                <div style={{ maxWidth: 640, marginBottom: 48 }}>
                    <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, background: `${accent}15`, padding: '5px 14px', borderRadius: 4, marginBottom: 16 }}>Platform Features</span>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 12 }}>Built for enterprise revenue scale</h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>Every feature is designed for organizations managing complex, multi-team revenue processes at $50M+ ARR scale.</p>
                </div>

                {/* Feature Groups */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {featureGroups.map((group, gi) => (
                        <div key={group.category}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{ width: 3, height: 20, background: accent, borderRadius: 2 }} />
                                <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group.category}</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                {group.features.map((f, fi) => (
                                    <div key={fi} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                                        <div style={{ width: 24, height: 2, background: accent, borderRadius: 2, marginBottom: 14 }} />
                                        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{f.name}</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Development Banner */}
                <div style={{ marginTop: 64, padding: '32px 40px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Need a custom CRM or SaaS platform?</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hire the creator of PROTOCOL_ZERO to build your custom software.</p>
                    </div>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D'm%20impressed%20with%20the%20quality%20of%20your%20work.%0A%0AI'm%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none' }}>
                        Contact Developer →
                    </a>
                </div>

            </div>
        </CrmLayout>
    );
}
