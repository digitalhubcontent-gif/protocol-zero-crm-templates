'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#58a6ff';

const TIERS = [
    {
        id: 'core',
        name: 'Flow Core',
        priceMonthly: 49,
        priceAnnual: 39,
        tagline: 'For individual SDRs building pipeline momentum.',
        highlight: false,
        features: ['6-gate Kanban board', 'SLA alerts', 'CRM sync', '3 automation rules', '5 integrations', 'Basic reports', 'Email support'],
        cta: 'Start Free Trial',
    },
    {
        id: 'velocity',
        name: 'Team Velocity',
        priceMonthly: 129,
        priceAnnual: 99,
        tagline: 'Built for AE teams running at full pipeline capacity.',
        highlight: true,
        features: ['Everything in Core', 'KanbanBoard with WIP limits', 'Flow Owner analytics', 'CFD + Funnel charts', 'Unlimited automations', '20 integrations', 'Priority support', 'Stage bottleneck alerts'],
        cta: 'Get Team Velocity',
    },
    {
        id: 'enterprise',
        name: 'Enterprise Orchestration',
        priceMonthly: 349,
        priceAnnual: 279,
        tagline: 'For RevOps teams managing cross-team pipeline operations.',
        highlight: false,
        features: ['Everything in Velocity', 'Multi-team boards', 'Custom stage gates', 'Advanced SLA engine', 'API access', 'Dedicated CSM', 'Custom integrations', 'Revenue attribution'],
        cta: 'Contact Sales',
    },
];

function PricingContent() {
    const [annual, setAnnual] = useState(false);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '48px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ fontSize: '0.625rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontWeight: 700 }}>Execution Suite Pricing</div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                        Pipeline Command
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 28px' }}>
                        Kanban-native pipeline management with SLA enforcement, WIP limits, and flow analytics.
                    </p>
                    {/* Toggle */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '6px 14px' }}>
                        <span style={{ fontSize: '0.75rem', color: !annual ? accent : 'var(--text-secondary)', fontWeight: !annual ? 700 : 400 }}>Monthly</span>
                        <button onClick={() => setAnnual(v => !v)} style={{
                            width: 44, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                            background: annual ? accent : 'var(--border-card)', position: 'relative', transition: 'background 0.2s',
                        }}>
                            <div style={{ position: 'absolute', top: 3, left: annual ? 'calc(100% - 19px)' : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                        </button>
                        <span style={{ fontSize: '0.75rem', color: annual ? accent : 'var(--text-secondary)', fontWeight: annual ? 700 : 400 }}>Annual</span>
                        {annual && <span style={{ fontSize: '0.5625rem', color: '#3fb950', fontWeight: 700, background: '#3fb95018', padding: '2px 6px', borderRadius: 3 }}>20% off</span>}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {TIERS.map(tier => {
                        const price = annual ? tier.priceAnnual : tier.priceMonthly;
                        return (
                            <div key={tier.id} style={{
                                background: tier.highlight ? `${accent}08` : 'var(--bg-card)',
                                border: `${tier.highlight ? 2 : 1}px solid ${tier.highlight ? accent : 'var(--border-card)'}`,
                                borderRadius: 10, padding: '28px 24px',
                                position: 'relative', transition: 'all 0.2s',
                                transform: tier.highlight ? 'scale(1.02)' : 'none',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => { if (!tier.highlight) { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; } }}
                                onMouseLeave={e => { if (!tier.highlight) { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; } }}>
                                {tier.highlight && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: accent, color: 'var(--bg-primary)', fontSize: '0.5625rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Most Popular
                                    </div>
                                )}
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{tier.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                                        <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>${price}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/mo/user</span>
                                    </div>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{tier.tagline}</p>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {tier.features.map(f => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ color: accent, fontSize: '0.75rem', fontWeight: 700 }}>✓</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button style={{
                                    width: '100%', padding: '11px 0',
                                    background: tier.highlight ? accent : `${accent}10`,
                                    color: tier.highlight ? 'var(--bg-primary)' : accent,
                                    border: tier.highlight ? 'none' : `1px solid ${accent}30`,
                                    borderRadius: 7, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800,
                                    transition: 'all 0.15s',
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                                    {tier.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Unique metric */}
                <div style={{ marginTop: 40, padding: '20px 24px', background: 'var(--bg-card)', border: `1px solid ${accent}20`, borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Cost per Stage Conversion</div>
                    <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: accent }}>$8.40</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>Flow Core</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: accent }}>$4.20</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>Team Velocity</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: accent }}>$2.18</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>Enterprise Orchestration</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
