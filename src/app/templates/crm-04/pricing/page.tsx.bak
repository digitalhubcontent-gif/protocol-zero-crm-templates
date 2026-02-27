'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TIERS = [
    {
        id: 'associate',
        label: 'Associate',
        price: '$890',
        period: '/mo',
        desc: 'For boutique partnership teams managing up to 20 strategic accounts.',
        features: [
            'Strategic Opportunity Register (up to 25)',
            'Quadrant Chart & Sector Analysis',
            'NRR Cohort Retention Tracking',
            'Principal Contact Register',
            '3 Report Templates',
            '5 Users',
        ],
        cta: 'Start Free Trial',
        highlight: false,
    },
    {
        id: 'principal',
        label: 'Principal',
        price: '$2,400',
        period: '/mo',
        desc: 'For partnership directors managing full-cycle strategic revenue programs.',
        features: [
            'Everything in Associate',
            'Unlimited Opportunities & Contacts',
            'Decision Trigger Automation Engine',
            'Interaction History & Timeline',
            'All 8 Report Templates',
            '25 Users',
        ],
        cta: 'Start Trial',
        highlight: true,
    },
    {
        id: 'director',
        label: 'Director',
        price: 'Custom',
        period: '',
        desc: 'For enterprise partnership organizations requiring full platform access.',
        features: [
            'Everything in Principal',
            'Multi-org Portfolio Management',
            'Custom Integration Development',
            'Dedicated Partner Success Manager',
            'Quarterly Business Reviews',
            'Unlimited Users & Orgs',
        ],
        cta: 'Contact Sales',
        highlight: false,
    },
];

export default function Crm04PricingPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pricing" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Pricing &nbsp;/&nbsp; Access Tiers</span>
                </div>

                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Transparent Pricing</p>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: 12, lineHeight: 1.1 }}>
                            Precision Tools.<br />Clear Pricing.
                        </h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
                            No hidden fees. Cancel any time. All tiers include full onboarding.
                        </p>
                        {/* Billing toggle */}
                        <div style={{ display: 'inline-flex', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            {(['monthly', 'annual'] as const).map(b => (
                                <button key={b} onClick={() => setBilling(b)}
                                    style={{ padding: '7px 20px', background: billing === b ? 'var(--text-primary)' : 'transparent', color: billing === b ? 'var(--bg-primary)' : 'var(--text-secondary)', border: 'none', fontSize: '0.5625rem', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                    {b}{b === 'annual' ? ' · save 20%' : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tier grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)' }}>
                        {TIERS.map((tier, i) => (
                            <motion.div key={tier.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                style={{ padding: '32px 28px', borderRight: i < 2 ? '1px solid var(--border)' : 'none', background: tier.highlight ? 'var(--text-primary)' : 'var(--bg-primary)', position: 'relative' }}>
                                <p style={{ fontSize: '0.5rem', fontWeight: 700, color: tier.highlight ? 'var(--bg-secondary)' : 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>{tier.label}</p>
                                <div style={{ marginBottom: 16 }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: tier.highlight ? 'var(--bg-primary)' : 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                                        {billing === 'annual' && tier.price !== 'Custom' ? '$' + Math.round(Number(tier.price.replace('$', '').replace('/mo', '')) * 0.8) : tier.price}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: tier.highlight ? 'var(--bg-card)' : 'var(--text-muted)', marginLeft: 3 }}>{tier.period}</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: tier.highlight ? 'var(--bg-card)' : 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>{tier.desc}</p>
                                <button style={{ width: '100%', padding: '11px', background: tier.highlight ? 'var(--bg-primary)' : 'var(--text-primary)', border: 'none', color: tier.highlight ? 'var(--text-primary)' : 'var(--bg-primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 28, transition: 'all 0.15s, transform 0.1s' }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}>
                                    {tier.cta}
                                </button>
                                <div style={{ borderTop: `1px solid ${tier.highlight ? 'var(--bg-card)' : 'var(--border)'}`, paddingTop: 20 }}>
                                    {tier.features.map(f => (
                                        <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 9 }}>
                                            <span style={{ color: tier.highlight ? 'var(--bg-card)' : 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1 }}>→</span>
                                            <span style={{ fontSize: '0.6875rem', color: tier.highlight ? 'var(--bg-secondary)' : 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '0.5625rem', color: 'var(--text-muted)', marginTop: 24 }}>
                        All plans include SOC 2 Type II compliance, 99.9% uptime SLA, and GDPR-compliant data handling.
                    </p>
                </div>
            </div>
        </CrmLayout>
    );
}
