'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { COMPLIANCE_PLANS } from '../data';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '24px 28px' };

function PricingContent() {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Compliance-First Pricing
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Compliance is not a feature.<br />
                        <span style={{ color: accent }}>It is the architecture.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 20px' }}>
                        Defense-grade security. Immutable audit trails. Multi-framework compliance scoring.
                    </p>
                    <div style={{ display: 'inline-flex', background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 8, padding: 4, gap: 4 }}>
                        {(['monthly', 'annual'] as const).map(b => (
                            <button key={b} onClick={() => setBilling(b)} style={{
                                padding: '6px 18px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, transition: 'all 0.15s',
                                background: billing === b ? accent : 'transparent',
                                color: billing === b ? '#fff' : 'var(--text-muted)', border: 'none',
                            }}>
                                {b === 'monthly' ? 'Monthly' : 'Annual'}
                                {b === 'annual' && <span style={{ marginLeft: 4, fontSize: '0.5rem', background: '#22c55e20', color: '#22c55e', padding: '1px 5px', borderRadius: 3 }}>Save 20%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
                    {COMPLIANCE_PLANS.map((plan, i) => {
                        const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
                        const isMiddle = i === 1;
                        const planColor = i === 0 ? '#94a3b8' : i === 1 ? accent : '#f59e0b';
                        return (
                            <div key={plan.name} style={{
                                ...card, transition: 'all 0.2s', cursor: 'default', position: 'relative',
                                borderColor: isMiddle ? accent : 'var(--border-subtle)',
                                background: isMiddle ? `linear-gradient(135deg, var(--bg-card) 0%, ${accent}06 100%)` : 'var(--bg-card)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.background = isMiddle ? `linear-gradient(135deg, var(--bg-card-hover) 0%, ${accent}15 100%)` : 'var(--bg-card-hover)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.background = isMiddle ? `linear-gradient(135deg, var(--bg-card) 0%, ${accent}06 100%)` : 'var(--bg-card)'; }}>
                                {isMiddle && (
                                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', background: accent, borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        RECOMMENDED
                                    </div>
                                )}
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: planColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{plan.name}</div>
                                    {price ? (
                                        <div style={{ marginBottom: 4 }}>
                                            <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>${price.toLocaleString()}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>/mo</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Custom</div>
                                    )}
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</div>
                                </div>
                                <button style={{
                                    width: '100%', padding: '10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                                    background: isMiddle ? accent : 'transparent',
                                    color: isMiddle ? '#fff' : planColor,
                                    border: `2px solid ${planColor}`, transition: 'all 0.15s',
                                }}>
                                    {price ? 'Start Security Audit' : 'Contact Security Team'}
                                </button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', opacity: f.included ? 1 : 0.3 }}>
                                            <span style={{ fontSize: '0.625rem', color: f.included ? '#22c55e' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>{f.included ? '✓' : '✕'}</span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Security Footer */}
                <div style={{ ...card, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Security Certifications</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                        {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'HIPAA Ready', 'AES-256 Encryption', 'Zero-Knowledge Architecture'].map(f => (
                            <span key={f} style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ color: accent }}>🔒</span> {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pricing10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <PricingContent />
        </CrmLayout>
    );
}
