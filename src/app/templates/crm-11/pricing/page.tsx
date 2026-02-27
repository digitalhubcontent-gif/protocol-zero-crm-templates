'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { COMPARISON_PLANS } from '../data';

const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '24px 28px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

function PricingContent() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)', fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Comparative Intelligence Pricing
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        The only CRM built for<br />
                        <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A vs B. Always.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Every metric, chart, and insight — always in context of another segment.
                    </p>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 4, gap: 4 }}>
                        {(['monthly', 'annual'] as const).map(b => (
                            <button key={b} onClick={() => setBilling(b)} style={{
                                padding: '6px 18px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, transition: 'all 0.2s',
                                background: billing === b ? 'var(--bg-card-hover)' : 'transparent',
                                color: billing === b ? '#f9fafb' : 'var(--text-muted)', border: 'none',
                            }}
                                onMouseEnter={e => { if (billing !== b) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; }}
                                onMouseLeave={e => { if (billing !== b) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                {b === 'monthly' ? 'Monthly' : 'Annual'}
                                {b === 'annual' && <span style={{ marginLeft: 4, fontSize: '0.5rem', background: '#22c55e20', color: '#22c55e', padding: '1px 5px', borderRadius: 3 }}>Save 20%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
                    {COMPARISON_PLANS.map((plan, i) => {
                        const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
                        const isMiddle = i === 1;
                        return (
                            <div key={plan.name} style={{
                                ...card, cursor: 'default', position: 'relative',
                                borderColor: isMiddle ? 'var(--border-strong)' : 'var(--border-subtle)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                                {isMiddle && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        RECOMMENDED
                                    </div>
                                )}
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{plan.name}</div>
                                    {price ? (
                                        <div style={{ marginBottom: 4 }}>
                                            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>${price}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>/mo</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Custom</div>
                                    )}
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</div>
                                </div>
                                <button style={{
                                    width: '100%', padding: '10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                                    background: isMiddle ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)' : 'transparent',
                                    color: isMiddle ? '#fff' : 'var(--text-primary)',
                                    border: `2px solid ${isMiddle ? 'transparent' : 'var(--border-strong)'}`, transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
                                    {price ? 'Start Comparing' : 'Contact Sales'}
                                </button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', opacity: f.included ? 1 : 0.3 }}>
                                            <span style={{ fontSize: '0.625rem', color: f.included ? '#22c55e' : '#4b5563', flexShrink: 0, marginTop: 1 }}>{f.included ? '✓' : '✕'}</span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Pricing11Page() {
    const template = getTemplateBySlug('crm-11');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-11');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor="var(--crm-accent)">
            <PricingContent />
        </CrmLayout>
    );
}
