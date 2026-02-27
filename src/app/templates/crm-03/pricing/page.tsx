'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const TIERS = [
    {
        id: 'analyst',
        label: 'ANALYST',
        price: '$2,400/mo',
        annual: '$24,000/yr',
        arr: '$500M',
        desc: 'Core revenue intelligence for analytical teams.',
        features: [
            'Revenue Instrument Ledger',
            'ARR Waterfall + Scenario Analysis',
            'Cohort NRR Heatmap',
            'Standard Risk Rating View',
            'Bloomberg API Integration',
            '10 Users',
        ],
        cta: 'Start Analyst Trial',
        highlight: false,
    },
    {
        id: 'director',
        label: 'DIRECTOR',
        price: '$7,200/mo',
        annual: '$72,000/yr',
        arr: '$1B',
        desc: 'Full exposure book management for revenue leaders.',
        features: [
            'Everything in Analyst',
            'Exposure Staging + Risk Simulation',
            'Credit Sensitivity Tornado Analysis',
            'Authorized Rep Intelligence Map',
            'Earnings Report Generation (unlimited)',
            '50 Users + White-Label Reports',
        ],
        cta: 'Schedule Demo',
        highlight: true,
    },
    {
        id: 'institutional',
        label: 'INSTITUTIONAL',
        price: 'Custom',
        annual: 'Enterprise contract',
        arr: 'Unlimited',
        desc: 'Full platform for $2B+ revenue organizations.',
        features: [
            'Everything in Director',
            'Multi-entity Portfolio Management',
            'Board-Level Attribution Reports',
            'FX Exposure & Hedging Module',
            'Dedicated Risk Analyst Support',
            'Unlimited Users + Data Room Access',
        ],
        cta: 'Request Term Sheet',
        highlight: false,
    },
];

export default function Crm03PricingPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>INSTITUTIONAL ACCESS &nbsp;◆&nbsp; REVENUE TERMINAL TIERS</span>
                </div>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.15em', marginBottom: 16 }}>PROTOCOL_ZERO :: SUBSCRIPTION_TIERS</p>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 12 }}>
                            Institutional Term Sheet
                        </h1>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                            Revenue intelligence priced for teams managing $100M to $2B+ ARR.
                        </p>
                        {/* Billing toggle */}
                        <div style={{ display: 'inline-flex', border: `1px solid ${am('25')}` }}>
                            {(['monthly', 'annual'] as const).map(b => (
                                <button key={b} onClick={() => setBilling(b)}
                                    style={{ padding: '7px 20px', background: billing === b ? am('18') : 'transparent', color: billing === b ? accent : am('35'), fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                    {b}{b === 'annual' ? ' (2 MO FREE)' : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tiers */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${am('20')}` }}>
                        {TIERS.map((tier, i) => (
                            <motion.div key={tier.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                style={{ padding: '28px 24px', borderRight: i < 2 ? `1px solid ${am('15')}` : 'none', background: tier.highlight ? am('08') : 'transparent', position: 'relative' }}>
                                {tier.highlight && (
                                    <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                                )}
                                <div style={{ marginBottom: 20 }}>
                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: tier.highlight ? accent : am('40'), letterSpacing: '0.15em' }}>{tier.label}</span>
                                    {tier.highlight && <span style={{ marginLeft: 8, fontSize: '0.4rem', background: am('20'), border: `1px solid ${am('40')}`, color: 'var(--text-accent)', padding: '1px 5px', letterSpacing: '0.1em' }}>RECOMMENDED</span>}
                                </div>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-accent)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }}>{billing === 'annual' && tier.annual !== 'Enterprise contract' ? tier.annual.split('/')[0] + '/yr' : tier.price}</p>
                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', marginBottom: 4 }}>Up to {tier.arr} managed ARR</p>
                                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>{tier.desc}</p>
                                <button style={{ width: '100%', padding: '11px', background: tier.highlight ? accent : 'transparent', border: `1px solid ${am('35')}`, color: tier.highlight ? '#010409' : accent, fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'monospace', marginBottom: 24, transition: 'all 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = tier.highlight ? '#e8a000' : am('14'); }}
                                    onMouseLeave={e => { e.currentTarget.style.background = tier.highlight ? accent : 'transparent'; }}>
                                    {tier.cta.toUpperCase()}
                                </button>
                                {tier.features.map(f => (
                                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                                        <span style={{ color: '#10b981', fontSize: '0.5625rem', flexShrink: 0, marginTop: 2 }}>◆</span>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.06em', marginTop: 20 }}>
                        All tiers include 99.97% uptime SLA, AES-256 encryption, SOX/GDPR compliance, and dedicated onboarding.
                    </p>
                </div>
            </div>
        </CrmLayout>
    );
}
