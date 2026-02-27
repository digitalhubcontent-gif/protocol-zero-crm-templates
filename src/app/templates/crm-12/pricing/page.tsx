'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { OPS_PLANS } from '../data';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: 8, padding: '24px 28px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

function PricingContent() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}12`, border: `1px solid ${accent}20`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        RevOps Engine Pricing
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Scale your <span style={{ color: accent }}>revenue engine.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Capacity-first pricing. Pay for the operational intelligence you need.
                    </p>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 8, padding: 4, gap: 4 }}>
                        {(['monthly', 'annual'] as const).map(b => (
                            <button key={b} onClick={() => setBilling(b)} style={{
                                padding: '6px 18px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, transition: 'all 0.2s',
                                background: billing === b ? accent : 'transparent',
                                color: billing === b ? '#fff' : '#9ca3af', border: 'none',
                            }}>
                                {b === 'monthly' ? 'Monthly' : 'Annual'}
                                {b === 'annual' && <span style={{ marginLeft: 4, fontSize: '0.5rem', background: '#22c55e20', color: '#22c55e', padding: '1px 5px', borderRadius: 3 }}>Save 20%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
                    {OPS_PLANS.map((plan, i) => {
                        const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
                        const isMiddle = i === 1;
                        return (
                            <div key={plan.name} style={{
                                ...card, cursor: 'default', position: 'relative',
                                borderColor: isMiddle ? `${accent}40` : 'rgba(249,115,22,0.08)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                                {isMiddle && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: accent, borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        RECOMMENDED
                                    </div>
                                )}
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{plan.name}</div>
                                    {price ? (
                                        <div style={{ marginBottom: 4 }}>
                                            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', fontFamily: "'Space Grotesk', sans-serif" }}>${price}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>/mo</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>Custom</div>
                                    )}
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</div>
                                </div>
                                <button style={{
                                    width: '100%', padding: '10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                                    background: isMiddle ? accent : 'transparent',
                                    color: isMiddle ? '#fff' : '#d1d5db',
                                    border: `2px solid ${isMiddle ? 'transparent' : `${accent}30`}`, transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
                                    {price ? 'Start Planning' : 'Contact RevOps'}
                                </button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', opacity: f.included ? 1 : 0.3 }}>
                                            <span style={{ fontSize: '0.625rem', color: f.included ? '#22c55e' : 'var(--text-secondary)', flexShrink: 0, marginTop: 1 }}>{f.included ? '✓' : '✕'}</span>
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

export default function Pricing12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
