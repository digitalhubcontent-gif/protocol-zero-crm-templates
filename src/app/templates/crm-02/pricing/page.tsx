import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing — AI Command Center CRM',
    description: 'AI Revenue Intelligence platform pricing and access tiers.',
};

const tiers = [
    {
        key: 'TIER_CORE',
        name: 'Core Intelligence',
        price: '$199',
        period: '/seat/mo',
        desc: 'For revenue teams ready to replace manual guesswork with baseline AI deal scoring and forecasting.',
        highlight: false,
        cta: 'Activate Core',
        color: '#64748b',
        features: [
            'AI deal scoring (v3 model)',
            'Predictive forecasting',
            'Signal detection: email + web',
            'Priority alert queue',
            'Basic automation workflows',
            'Slack / Teams integration',
            'Standard API access',
        ],
    },
    {
        key: 'TIER_COMMAND',
        name: 'Command Center',
        price: '$399',
        period: '/seat/mo',
        desc: 'Full autonomous AI orchestration for high-velocity revenue teams that want zero manual triage.',
        highlight: true,
        cta: 'Activate Command',
        color: '#a855f7',
        features: [
            'AI deal scoring (v4.1 model)',
            'Multi-source signal fusion',
            'Buyer Graph: archetype classification',
            'Autonomous workflow engine',
            'AI hybrid action queue',
            'Expansion trigger automation',
            'Model performance dashboard',
            'Advanced API + webhooks',
        ],
    },
    {
        key: 'TIER_SOVEREIGN',
        name: 'Sovereign AI',
        price: 'Custom',
        period: '',
        desc: 'Custom AI model training on your proprietary data. Private cloud or on-premise deployment.',
        highlight: false,
        cta: 'Contact AI Sales',
        color: '#06b6d4',
        features: [
            'Custom-trained deal models',
            'Private model deployment',
            'Full signal graph API',
            'Proprietary feature engineering',
            'Dedicated AI ops support',
            'SLA 99.99%',
            'Enterprise SSO / SCIM',
        ],
    },
];

const check = (color: string) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function Crm02Pricing() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '48px 32px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 52 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-accent)', letterSpacing: '0.12em', display: 'block', marginBottom: 12 }}>MODULE::PRICING_MATRIX</span>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 14 }}>
                        Access the <span style={{ color: 'var(--text-accent)', textShadow: `0 0 30px ${accent}50` }}>AI Engine</span>
                    </h1>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
                        Three intelligence tiers. Zero seat limits on data processing. Priced per seat, powered by unlimited AI.
                    </p>
                </div>

                {/* Tier Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1000, margin: '0 auto' }}>
                    {tiers.map(t => (
                        <div key={t.key} style={{ background: t.highlight ? `${t.color}08` : 'var(--bg-card)', border: `1px solid ${t.highlight ? t.color + '40' : accent + '18'}`, borderRadius: 8, padding: '28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${t.color}50, transparent)` }} />

                            {t.highlight && (
                                <div style={{ position: 'absolute', top: 14, right: 14 }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.1em', color: t.color, background: `${t.color}15`, padding: '3px 8px', borderRadius: 3 }}>RECOMMENDED</span>
                                </div>
                            )}

                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: `${t.color}60`, letterSpacing: '0.12em', display: 'block', marginBottom: 10 }}>{t.key}</span>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: t.color, letterSpacing: '0.04em', marginBottom: 12, textTransform: 'uppercase' }}>{t.name}</p>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                                <span style={{ fontSize: t.price === 'Custom' ? '1.75rem' : '2.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t.price}</span>
                                {t.period && <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.period}</span>}
                            </div>

                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>{t.desc}</p>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28, flex: 1 }}>
                                {t.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                        {check(t.color)}
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button style={{ width: '100%', padding: '11px 0', background: t.highlight ? t.color : 'transparent', border: `1px solid ${t.color}50`, borderRadius: 6, fontSize: '0.875rem', fontWeight: 700, color: t.highlight ? '#fff' : t.color, cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', boxShadow: t.highlight ? `0 0 20px ${t.color}30` : 'none' }}>
                                {t.cta.toUpperCase()}
                            </button>
                        </div>
                    ))}
                </div>

                <p style={{ textAlign: 'center', marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                    14-DAY FREE TRIAL · NO CREDIT CARD · ALL PLANS INCLUDE AI ENGINE ACCESS
                </p>
            </div>
        </CrmLayout>
    );
}
