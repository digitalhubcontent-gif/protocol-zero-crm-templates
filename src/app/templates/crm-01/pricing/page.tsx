import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing — Monolithic Enterprise CRM',
    description: 'Enterprise revenue intelligence platform pricing.',
};

const tiers = [
    {
        name: 'Growth',
        price: '$129',
        period: '/seat/mo',
        desc: 'For growing sales teams building structured revenue processes at scale.',
        highlight: false,
        cta: 'Start Free Trial',
        features: [
            'Up to 25 users',
            '10,000 contacts',
            'Pipeline analytics',
            'AI deal scoring',
            'Email & calendar sync',
            'Activity logging',
            'Standard reports',
            'Slack / Teams alerts',
        ],
    },
    {
        name: 'Enterprise',
        price: '$299',
        period: '/seat/mo',
        desc: 'For enterprise teams that need predictive AI, automation, and deep multi-team analytics.',
        highlight: true,
        cta: 'Start Free Trial',
        features: [
            'Unlimited users',
            'Unlimited contacts',
            'Predictive forecasting',
            'Behavioral analytics',
            'Workflow automation',
            'Cohort retention reports',
            'Team performance analytics',
            'API access',
            'Priority support',
        ],
    },
    {
        name: 'Sovereign',
        price: 'Custom',
        period: '',
        desc: 'For global organizations with complex compliance, infrastructure, and governance requirements.',
        highlight: false,
        cta: 'Contact Sales',
        features: [
            'Everything in Enterprise',
            'Custom AI model training',
            'SSO / SAML / SCIM',
            'Custom SLA (99.99%)',
            'Dedicated CSM',
            'On-premise deployment',
            'Advanced compliance',
            'Board reporting suite',
        ],
    },
];

const check = (accent: string) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function Crm01Pricing() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <div style={{ padding: '48px 32px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 52 }}>
                    <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, background: `${accent}15`, padding: '5px 14px', borderRadius: 4, marginBottom: 16 }}>Pricing</span>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 12 }}>Built for enterprise revenue teams</h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>No seat limits on intelligence. Pricing scales with your team size, not your ambitions.</p>
                </div>

                {/* Pricing Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 980, margin: '0 auto' }}>
                    {tiers.map(t => (
                        <div key={t.name} style={{ background: t.highlight ? 'var(--bg-card)' : 'var(--bg-card)', border: `1px solid ${t.highlight ? accent : 'var(--border-card)'}`, borderRadius: 12, padding: '28px 28px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: t.highlight ? `0 0 0 1px ${accent}30, 0 8px 32px rgba(0,0,0,0.2)` : 'none' }}>
                            {t.highlight && (
                                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: accent, color: '#fff', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                    Most popular
                                </div>
                            )}
                            <div style={{ marginBottom: 24 }}>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>{t.name}</p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                                    <span style={{ fontSize: t.price === 'Custom' ? '1.75rem' : '2.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t.price}</span>
                                    {t.period && <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.period}</span>}
                                </div>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{t.desc}</p>
                            </div>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                                {t.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {check(accent)}
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button style={{ width: '100%', padding: '12px 0', background: t.highlight ? accent : 'transparent', border: `1px solid ${t.highlight ? accent : 'var(--border-card)'}`, borderRadius: 7, fontSize: '0.9375rem', fontWeight: 600, color: t.highlight ? '#fff' : 'var(--text-primary)', cursor: 'pointer', transition: 'opacity 0.15s' }}>
                                {t.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <p style={{ textAlign: 'center', marginTop: 28, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>All plans include a 14-day free trial. No credit card required.</p>
            </div>
        </CrmLayout>
    );
}
