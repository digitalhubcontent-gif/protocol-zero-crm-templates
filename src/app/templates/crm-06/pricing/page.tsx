'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#a78bfa';

const TIERS = [
    {
        name: 'Insight',
        monthly: 79,
        annual: 63,
        tag: '',
        highlighted: false,
        features: [
            '3 AI models',
            'Intent scoring (100 contacts)',
            'Behavioral heatmap (7d)',
            'Signal attribution',
            'Standard reports',
            'HubSpot/Salesforce sync',
        ],
        cta: 'Start Trial',
        ctaStyle: 'outline',
    },
    {
        name: 'Intelligence',
        monthly: 149,
        annual: 119,
        tag: 'Most Popular',
        highlighted: true,
        features: [
            'Unlimited AI models',
            'Intent scoring (unlimited)',
            'Behavioral heatmap (30d)',
            'Signal attribution (all sources)',
            'Neural reports suite',
            'Confidence trend analytics',
            'Custom trigger engine',
            'All integrations',
        ],
        cta: 'Get Intelligence',
        ctaStyle: 'solid',
    },
    {
        name: 'Neural Enterprise',
        monthly: 299,
        annual: 239,
        tag: '',
        highlighted: false,
        features: [
            'Everything in Intelligence',
            'Multi-model ensemble scoring',
            'Custom model training',
            'Priority signal queue',
            'Dedicated success manager',
            'Custom SLA integration',
            'Private AI deployment',
            'SOC 2 / HIPAA compliant',
        ],
        cta: 'Contact Sales',
        ctaStyle: 'outline',
    },
];

function PricingContent() {
    const [annual, setAnnual] = useState(true);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '48px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: '0 0 10px' }}>AI-Native Intelligence Plans</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Confidence scoring, behavioral analytics, and signal attribution for every stage of your pipeline.
                    </p>
                    {/* Toggle */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '6px 12px' }}>
                        <span style={{ fontSize: '0.75rem', color: annual ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: 600 }}>Monthly</span>
                        <button onClick={() => setAnnual(!annual)} style={{
                            width: 40, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: annual ? accent : 'var(--border-card)', position: 'relative', transition: 'background 0.2s',
                        }}>
                            <div style={{ position: 'absolute', top: 2, left: annual ? 'calc(100% - 18px)' : 2, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                        </button>
                        <span style={{ fontSize: '0.75rem', color: annual ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: 600 }}>Annual</span>
                        {annual && <span style={{ fontSize: '0.5rem', background: '#3fb95020', color: '#3fb950', padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>Save 20%</span>}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'start' }}>
                    {TIERS.map(tier => (
                        <div key={tier.name} style={{
                            background: tier.highlighted ? `${accent}06` : 'var(--bg-card)',
                            border: `${tier.highlighted ? 2 : 1}px solid ${tier.highlighted ? accent : 'var(--border-card)'}`,
                            borderRadius: 10, padding: '24px 22px',
                            position: 'relative',
                            transform: tier.highlighted ? 'scale(1.02)' : 'none',
                            boxShadow: tier.highlighted ? `0 0 32px ${accent}20` : 'none',
                        }}>
                            {tier.tag && (
                                <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: accent, color: 'white', fontSize: '0.5625rem', fontWeight: 800, padding: '3px 12px', borderRadius: 10, letterSpacing: '0.05em' }}>
                                    {tier.tag}
                                </div>
                            )}
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{tier.name}</div>
                            <div style={{ marginBottom: 20 }}>
                                <span style={{ fontSize: '2.25rem', fontWeight: 800, color: tier.highlighted ? accent : 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                                    ${annual ? tier.annual : tier.monthly}
                                </span>
                                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>/seat/mo</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                                {tier.features.map(f => (
                                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                        <span style={{ color: accent, fontSize: '0.75rem', lineHeight: 1.4, flexShrink: 0 }}>✓</span>
                                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <button style={{
                                width: '100%', padding: '10px 0',
                                background: tier.ctaStyle === 'solid' ? accent : 'transparent',
                                color: tier.ctaStyle === 'solid' ? 'white' : accent,
                                border: `1px solid ${accent}`,
                                borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                                transition: 'all 0.15s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* AI ROI metric */}
                <div style={{ marginTop: 40, background: 'var(--bg-card)', border: `1px solid ${accent}20`, borderRadius: 8, padding: '20px 24px' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>AI Confidence ROI</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {[
                            { label: 'Win rate lift', insight: '+22%', intelligence: '+31%', enterprise: '+41%' },
                            { label: 'Pipeline accuracy', insight: '78%', intelligence: '88%', enterprise: '94%' },
                            { label: 'Forecast precision', insight: '±18%', intelligence: '±9%', enterprise: '±4%' },
                        ].map(row => (
                            <div key={row.label} style={{ background: 'var(--bg-secondary)', borderRadius: 6, padding: '12px 14px' }}>
                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginBottom: 8 }}>{row.label}</div>
                                {[
                                    { tier: 'Insight', v: row.insight },
                                    { tier: 'Intelligence', v: row.intelligence },
                                    { tier: 'Enterprise', v: row.enterprise },
                                ].map(t => (
                                    <div key={t.tier} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>{t.tier}</span>
                                        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: accent }}>{t.v}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
