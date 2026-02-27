'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#8b5cf6';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '24px',
};

const PLANS = [
    {
        name: 'Signal',
        price: { monthly: 89, annual: 71 },
        desc: 'Intent signals + basic behavioral scoring for growing teams.',
        color: '#06b6d4',
        features: [
            { label: 'Intent score tracking (50 accounts)', included: true },
            { label: 'Sentiment trend analysis', included: true },
            { label: '3rd-party intent data (Bombora lite)', included: true },
            { label: 'Behavioral heatmap', included: false },
            { label: 'SHAP model explanations', included: false },
            { label: 'Buying committee graph', included: false },
            { label: 'Predictive revenue projection', included: false },
            { label: 'Custom playbooks', included: false },
        ],
        highlight: false,
    },
    {
        name: 'Intelligence',
        price: { monthly: 249, annual: 199 },
        desc: 'Full behavioral intelligence stack. AI-powered revenue confidence.',
        color: accent,
        features: [
            { label: 'Intent score tracking (unlimited)', included: true },
            { label: 'Sentiment trend analysis', included: true },
            { label: '3rd-party intent data (full Bombora)', included: true },
            { label: 'Behavioral heatmap (30+ accounts)', included: true },
            { label: 'SHAP model explanations', included: true },
            { label: 'Buying committee graph', included: true },
            { label: 'Predictive revenue projection', included: true },
            { label: 'Custom playbooks (10)', included: false },
        ],
        highlight: true,
    },
    {
        name: 'Axiom',
        price: { monthly: null, annual: null },
        desc: 'Enterprise behavioral intelligence. Custom model training on your data.',
        color: '#f59e0b',
        features: [
            { label: 'All Intelligence features', included: true },
            { label: 'Custom ML model training', included: true },
            { label: 'Enterprise SSO + SCIM', included: true },
            { label: 'Dedicated AI engineer', included: true },
            { label: 'Custom playbooks (unlimited)', included: true },
            { label: 'Private cloud deployment', included: true },
            { label: 'SLA: 99.99% uptime', included: true },
            { label: 'Custom integrations', included: true },
        ],
        highlight: false,
    },
];

const ADD_ONS = [
    { name: 'Gong Sentiment Bridge', price: '$49/mo', desc: 'Live call transcript → behavioral scoring' },
    { name: 'Executive Radar', price: '$79/mo', desc: 'C-Suite engagement tracking + intent alerts' },
    { name: 'Competitive Intel Layer', price: '$59/mo', desc: 'Emotion flags when competitors are mentioned' },
    { name: 'Custom Model Tuning', price: '$299/mo', desc: 'Your win/loss history as training data' },
];

function PricingContent() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Behavioral Intelligence Pricing
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Price the psychology.<br />
                        <span style={{ color: accent }}>Not just the pipeline.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Stop guessing. Behavioral intelligence turns buyer emotion into revenue certainty.
                    </p>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: 4, gap: 4 }}>
                        {(['monthly', 'annual'] as const).map(b => (
                            <button key={b} onClick={() => setBilling(b)} style={{
                                padding: '6px 18px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, transition: 'all 0.15s',
                                background: billing === b ? accent : 'transparent',
                                color: billing === b ? '#fff' : 'var(--text-secondary)',
                                border: 'none',
                            }}>
                                {b === 'monthly' ? 'Monthly' : 'Annual'}{b === 'annual' && <span style={{ marginLeft: 4, fontSize: '0.5rem', background: '#10b98120', color: '#10b981', padding: '1px 5px', borderRadius: 3 }}>Save 20%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plans */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
                    {PLANS.map(plan => {
                        const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
                        const isHovered = hoveredPlan === plan.name;
                        return (
                            <div key={plan.name}
                                onMouseEnter={() => setHoveredPlan(plan.name)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                style={{
                                    ...card,
                                    borderColor: plan.highlight ? plan.color : isHovered ? `${plan.color}50` : 'var(--border-card)',
                                    background: plan.highlight ? `linear-gradient(135deg, var(--bg-card) 0%, ${plan.color}10 100%)` : 'var(--bg-card)',
                                    transform: isHovered ? 'translateY(-4px)' : 'none',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    cursor: 'default',
                                }}>
                                {plan.highlight && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: plan.color, borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
                                        MOST POPULAR
                                    </div>
                                )}
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: plan.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{plan.name}</div>
                                    {price ? (
                                        <div style={{ marginBottom: 4 }}>
                                            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>${price}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>/seat/mo</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Custom</div>
                                    )}
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{plan.desc}</div>
                                </div>
                                <button style={{
                                    width: '100%', padding: '10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                                    background: plan.highlight ? plan.color : 'transparent',
                                    color: plan.highlight ? '#fff' : plan.color,
                                    border: `2px solid ${plan.color}`,
                                    transition: 'all 0.15s',
                                }}>
                                    {price ? 'Start free trial' : 'Contact Sales'}
                                </button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', opacity: f.included ? 1 : 0.35 }}>
                                            <span style={{ fontSize: '0.625rem', color: f.included ? '#10b981' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>
                                                {f.included ? '✓' : '✕'}
                                            </span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add-ons */}
                <div style={card}>
                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Premium Add-ons</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                        {ADD_ONS.map(a => (
                            <div key={a.name}
                                style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: 6, border: '1px solid var(--border-subtle)', cursor: 'default', transition: 'all 0.15s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; }}>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{a.name}</div>
                                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.5 }}>{a.desc}</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accent }}>{a.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
