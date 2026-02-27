import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Features — AI Command Center CRM',
    description: 'Complete AI capabilities of the AI Command Center CRM platform.',
};

const featureGroups = [
    {
        key: 'AI_CORE',
        category: 'Core AI Engine',
        features: [
            { name: 'Signal Fusion Network', desc: 'Aggregates and classifies 40+ behavioral signals from email, web, call, billing, and product telemetry into a unified intent vector per account.' },
            { name: 'Deal Score Engine v4.1', desc: 'LSTM-trained model predicts close probability, deal health, and ACV at close with 96.1% accuracy — updating every signal event.' },
            { name: 'Buyer Archetype Classifier', desc: 'Identifies contact archetypes (Champion, Economic Buyer, Blocker, Coach) from behavioral and communication patterns using NLP and engagement graphs.' },
            { name: 'Forecast Model (Ensemble)', desc: 'Multi-model ensemble combining historical patterns, current signal volume, and rep behavior for 90-day ARR forecasting with confidence intervals.' },
        ],
    },
    {
        key: 'AUTONOMOUS_OPS',
        category: 'Autonomous Operations',
        features: [
            { name: 'Champion Risk Protocol', desc: 'Detects champion departure signals (communication pattern shifts, org changes, engagement drops) and escalates to VP within 15 minutes autonomously.' },
            { name: 'Expansion Trigger Engine', desc: 'Monitors product usage, NRR trajectory, and engagement patterns. Automatically creates expansion pipeline when account meets configurable thresholds.' },
            { name: 'Intent Surge Responder', desc: 'Detects 3x baseline web intent spikes, composes AI-personalized outreach, and queues for rep review — cutting response time from hours to minutes.' },
            { name: 'Stale Deal Rescue', desc: 'Proactively monitors deal aging and last activity timestamps. Dispatches AI-composed re-engagement sequences and creates rep tasks before opportunities die.' },
        ],
    },
    {
        key: 'INTELLIGENCE_LAYER',
        category: 'Intelligence & Insights',
        features: [
            { name: 'Win/Loss Attribution (Shapley)', desc: 'Shapley value decomposition applied to every closed deal — quantifying the exact contribution of each touchpoint, signal, and rep behavior to the outcome.' },
            { name: 'Competitive Intelligence Alerts', desc: 'Detects competitor evaluation signals from web behavior, review sites, and conversation transcripts. Surfaces to rep with recommended differentiation narrative.' },
            { name: 'Pipeline Health Index', desc: 'Composite score across 12 pipeline dimensions: coverage, velocity, engagement quality, forecast alignment, and stage conversion health.' },
            { name: 'Cohort Revenue Intelligence', desc: 'NRR and expansion tracking by close cohort, ACV band, and segment — enabling data-driven CS resource allocation and expansion sequencing.' },
        ],
    },
];

export default function Crm02Features() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="features" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '40px 32px' }}>

                <div style={{ maxWidth: 700, marginBottom: 48 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>MODULE::CAPABILITY_REGISTRY</span>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 12 }}>AI Capabilities</h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>Every module in the AI Command Center is purpose-built for fully autonomous or AI-assisted revenue operations — no manual triage required.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                    {featureGroups.map(group => (
                        <div key={group.key}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', color: 'var(--text-accent)', background: `${accent}08`, padding: '3px 8px', borderRadius: 3 }}>{group.key}</span>
                                <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group.category}</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {group.features.map((f, fi) => (
                                    <div key={fi} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 8, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}30, transparent)` }} />
                                        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{f.name}</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
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
