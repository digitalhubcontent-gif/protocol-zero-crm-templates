'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#3b82f6';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '24px 28px' };

const PLANS = [
    {
        name: 'Corporate Core',
        price: { monthly: 999, annual: 799 },
        desc: 'Revenue governance for single-division enterprises up to $100M ARR.',
        color: 'var(--text-muted)',
        features: [
            { label: 'Up to $100M ARR managed', included: true },
            { label: '1 division', included: true },
            { label: 'Revenue Bridge Waterfall', included: true },
            { label: 'Forecast Accuracy Tracking', included: true },
            { label: 'Governance Audit Trail', included: true },
            { label: 'Board Mode PDF exports', included: false },
            { label: 'Multi-approval workflows', included: false },
            { label: 'Dedicated CSM', included: false },
        ],
        highlight: false,
    },
    {
        name: 'Global Enterprise',
        price: { monthly: 3500, annual: 2800 },
        desc: 'Multi-division revenue governance with full board reporting module.',
        color: accent,
        features: [
            { label: 'Up to $1B ARR managed', included: true },
            { label: 'Unlimited divisions', included: true },
            { label: 'Regional Performance Maps', included: true },
            { label: 'Board Mode PDF exports', included: true },
            { label: 'Multi-approval workflows', included: true },
            { label: 'Risk Tier Distribution', included: true },
            { label: 'Governance Audit Trail', included: true },
            { label: 'Dedicated CSM', included: false },
        ],
        highlight: true,
    },
    {
        name: 'Sovereign Executive',
        price: { monthly: null, annual: null },
        desc: 'Unlimited ARR governance. Full board reporting module. White-glove support.',
        color: '#f59e0b',
        features: [
            { label: 'Unlimited ARR managed', included: true },
            { label: 'All Global Enterprise features', included: true },
            { label: 'Board reporting module', included: true },
            { label: 'Custom executive dashboards', included: true },
            { label: 'Executive relationship mapping', included: true },
            { label: 'Dedicated CSM', included: true },
            { label: 'On-premise deployment option', included: true },
            { label: 'Custom SLA & uptime guarantee', included: true },
        ],
        highlight: false,
    },
];

function PricingContent() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Enterprise Governance Suite
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-secondary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Revenue governance is<br />
                        <span style={{ color: accent }}>not optional at scale.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Board-grade visibility. Forecast confidence. Multi-division portfolio management.
                    </p>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: 4, gap: 4 }}>
                        {(['monthly', 'annual'] as const).map(b => (
                            <button key={b} onClick={() => setBilling(b)} style={{
                                padding: '6px 18px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, transition: 'all 0.15s',
                                background: billing === b ? accent : 'transparent',
                                color: billing === b ? '#fff' : '#94a3b8', border: 'none',
                            }}>
                                {b === 'monthly' ? 'Monthly' : 'Annual'}
                                {b === 'annual' && <span style={{ marginLeft: 4, fontSize: '0.5rem', background: '#22c55e20', color: '#22c55e', padding: '1px 5px', borderRadius: 3 }}>Save 20%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
                    {PLANS.map(plan => {
                        const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
                        return (
                            <div key={plan.name} style={{
                                ...card, transition: 'all 0.2s', cursor: 'default', position: 'relative',
                                borderColor: plan.highlight ? plan.color : 'var(--border-subtle)',
                                background: plan.highlight ? `linear-gradient(135deg, var(--bg-card) 0%, ${plan.color}08 100%)` : 'var(--bg-card)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.background = plan.highlight ? `linear-gradient(135deg, var(--bg-card-hover) 0%, ${plan.color}15 100%)` : 'var(--bg-card-hover)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.background = plan.highlight ? `linear-gradient(135deg, var(--bg-card) 0%, ${plan.color}08 100%)` : 'var(--bg-card)'; }}>
                                {plan.highlight && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: plan.color, borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        RECOMMENDED
                                    </div>
                                )}
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: plan.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{plan.name}</div>
                                    {price ? (
                                        <div style={{ marginBottom: 4 }}>
                                            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '-0.04em' }}>${price.toLocaleString()}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>/mo</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: 4 }}>Custom</div>
                                    )}
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</div>
                                </div>
                                <button style={{
                                    width: '100%', padding: '10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                                    background: plan.highlight ? plan.color : 'transparent',
                                    color: plan.highlight ? '#fff' : plan.color,
                                    border: `2px solid ${plan.color}`, transition: 'all 0.15s',
                                }}
                                    onMouseEnter={e => { if (!plan.highlight) { (e.currentTarget as HTMLButtonElement).style.background = `${plan.color}15`; } else { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; } }}
                                    onMouseLeave={e => { if (!plan.highlight) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; } else { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; } }}>
                                    {price ? 'Start Free Trial' : 'Contact Sales'}
                                </button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', opacity: f.included ? 1 : 0.3 }}>
                                            <span style={{ fontSize: '0.625rem', color: f.included ? '#22c55e' : '#64748b', flexShrink: 0, marginTop: 1 }}>{f.included ? '✓' : '✕'}</span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enterprise Footer */}
                <div style={{ ...card, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Included at All Tiers</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                        {['Governance Audit Trail', 'SOC 2 Compliant', 'SSO / SAML', '99.9% Uptime SLA', 'Data Encryption at Rest'].map(f => (
                            <span key={f} style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ color: '#22c55e' }}>✓</span> {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-09');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
