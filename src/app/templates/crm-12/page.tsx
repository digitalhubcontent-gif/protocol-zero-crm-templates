'use client';

import React from 'react';
import Link from 'next/link';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { OPS_STATUS, HERO_METRICS, SECONDARY_METRICS, SCENARIOS } from './data';

const accent = '#f97316';
const bg = 'var(--bg-primary)';

function Hero() {
    const utilColor = OPS_STATUS.capacityPct >= 70 && OPS_STATUS.capacityPct <= 95 ? '#22c55e' : OPS_STATUS.capacityPct > 95 ? '#ef4444' : '#f59e0b';

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            {/* Ops Status Bar */}
            <div style={{ background: 'var(--bg-card)', borderBottom: `1px solid var(--border-subtle)`, padding: '8px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 16, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6875rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: utilColor, display: 'inline-block' }} />
                        <strong style={{ color: utilColor }}>ENGINE STATUS: {OPS_STATUS.engineStatus}</strong>
                    </span>
                    <span style={{ width: 1, height: 14, background: 'var(--border-subtle)', display: 'inline-block' }} />
                    <span><strong style={{ color: 'var(--text-secondary)' }}>{OPS_STATUS.capacityPct}%</strong> Capacity</span>
                    <span><strong style={{ color: 'var(--text-secondary)' }}>{OPS_STATUS.revenuePerRep}</strong> Revenue/Rep</span>
                    <span><strong style={{ color: 'var(--text-secondary)' }}>{OPS_STATUS.activeProducers}</strong> Active Producers</span>
                    <span>CAC Payback: <strong style={{ color: 'var(--text-secondary)' }}>{OPS_STATUS.cacPayback}</strong></span>
                </div>
            </div>

            {/* Hero */}
            <div style={{ padding: '80px 32px 48px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20, background: `${accent}12`, border: `1px solid ${accent}20`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
                    Revenue Operations Command
                </div>

                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Capacity-First<br />
                    <span style={{ color: accent }}>Revenue Engine.</span>
                </h1>

                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7 }}>
                    Built for RevOps leaders. Headcount efficiency, territory coverage, ramp modeling — every metric that powers your revenue machine.
                </p>

                <Link href="/templates/crm-12/dashboard" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 28px', borderRadius: 8,
                    background: accent, color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
                }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.transform = 'translateY(-2px)'; t.style.boxShadow = `0 8px 24px ${accent}40`; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.transform = 'none'; t.style.boxShadow = 'none'; }}>
                    Open Operations Command →
                </Link>
            </div>

            {/* Hero Metrics */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                    {HERO_METRICS.map(m => (
                        <div key={m.label} style={{
                            padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10,
                            textAlign: 'center', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)', cursor: 'default',
                        }}
                            onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = `${accent}30`; t.style.transform = 'translateY(-4px)'; t.style.boxShadow = `0 12px 28px rgba(0,0,0,0.3)`; t.style.background = 'var(--bg-card-hover)'; }}
                            onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'var(--border-subtle)'; t.style.transform = 'none'; t.style.boxShadow = 'none'; t.style.background = 'var(--bg-card)'; }}>
                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{m.icon}</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: accent, letterSpacing: '-0.04em', lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                            <div style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 8 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scenario Preview */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 60px' }}>
                <div style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Scenario Modeling — Quick Preview</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {SCENARIOS.map((s, i) => (
                        <div key={s.name} style={{
                            padding: '16px 20px', background: 'var(--bg-card)', border: `1px solid ${i === 1 ? `${accent}` : 'var(--border-subtle)'}`, borderRadius: 8,
                            transition: 'all 0.25s cubic-bezier(.4,0,.2,1)', cursor: 'pointer',
                        }}
                            onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = `${accent}40`; t.style.transform = 'translateY(-2px)'; t.style.background = 'var(--bg-card-hover)'; }}
                            onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = i === 1 ? `${accent}` : 'var(--border-subtle)'; t.style.transform = 'none'; t.style.background = 'var(--bg-card)'; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{s.name}</span>
                                {i === 1 && <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: '0.4375rem', fontWeight: 700, background: `${accent}18`, color: accent }}>CURRENT</span>}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: '0.5625rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Headcount: <strong style={{ color: 'var(--text-muted)' }}>{s.headcount}</strong></span>
                                <span style={{ color: 'var(--text-muted)' }}>Projected: <strong style={{ color: accent }}>{s.projectedArr}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CRM12LandingPage() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="" accentColor={accent}>
            <Hero />
        </CrmLayout>
    );
}
