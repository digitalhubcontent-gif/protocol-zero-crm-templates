'use client';

import React, { useState, useEffect } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_METRICS, SAMPLE_PIPELINE } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target]);
    return <>{prefix}{count.toLocaleString()}{suffix}</>;
}

const heroStats = [
    { label: 'Annual Recurring Revenue', value: 62.8, prefix: '$', suffix: 'M', delta: '+24% YoY' },
    { label: 'AI Win Rate', value: 47, suffix: '%', delta: '+9.1pp vs baseline' },
    { label: 'Pipeline Deals', value: 149, suffix: '', delta: 'Across 5 stages' },
    { label: 'Forecast Accuracy', value: 94, suffix: '%', delta: '90-day horizon' },
];

const features = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        title: 'Predictive Deal Scoring',
        desc: 'LSTM-trained models assess 40+ behavioral signals and update deal health every time new data arrives.',
        href: '/templates/crm-01/analytics',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        title: 'Pipeline Intelligence',
        desc: 'Multi-team kanban with real-time stage metrics, deal aging alerts, and conversion benchmarks.',
        href: '/templates/crm-01/pipeline',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
            </svg>
        ),
        title: 'Autonomous Automation',
        desc: 'Revenue workflows that trigger on deal events — escalations, approvals, Slack alerts, task creation.',
        href: '/templates/crm-01/automation',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Buyer Intelligence',
        desc: 'Contact engagement scoring, archetype classification, and real-time intent signal tracking.',
        href: '/templates/crm-01/contact',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        title: 'Revenue Reporting',
        desc: 'Win/loss attribution, cohort retention analysis, forecast variance, and executive-ready dashboards.',
        href: '/templates/crm-01/reports',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
        ),
        title: 'Activity Intelligence',
        desc: 'Auto-logged calls, emails, and meetings with AI-generated summaries and recommended next steps.',
        href: '/templates/crm-01/activity',
    },
];

const clients = ['Salesforce', 'Snowflake', 'Stripe', 'CashbackPro', 'Databricks', 'NetSuite', 'Slack', 'Outreach'];

export default function Crm01Page() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    const [activeSection, setActiveSection] = useState<string | null>(null);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="overview" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

                {/* ── HERO ─────────────────────────────────────────────────────── */}
                <section style={{ padding: '72px 48px 64px', maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 64, alignItems: 'center' }}>

                        {/* Left — Copy */}
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${accent}12`, border: `1px solid ${accent}25`, borderRadius: 20, padding: '5px 14px 5px 10px', marginBottom: 28 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, letterSpacing: '0.04em' }}>Enterprise CRM · v4.1 AI</span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}
                            >
                                Enterprise Revenue<br />
                                <span style={{ color: accent }}>Intelligence</span> Platform
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                                style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}
                            >
                                Data-dense architecture for organizations running complex, multi-team revenue operations at $50M+ ARR. Maximum intelligence, minimum navigation overhead.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}
                            >
                                <Link
                                    href="/templates/crm-01/dashboard"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: accent, color: '#fff', borderRadius: 7, fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', boxShadow: `0 4px 16px ${accent}40`, transition: 'transform 0.15s, box-shadow 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}50`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 16px ${accent}40`; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                    Open Dashboard
                                </Link>
                                <Link
                                    href="/templates/crm-01/pricing"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-card)', borderRadius: 7, fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = `${accent}08`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = 'transparent'; }}
                                >
                                    View Pricing
                                </Link>
                                <Link
                                    href="/templates/crm-01/features"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'transparent', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500, transition: 'color 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = ''; }}
                                >
                                    All Features →
                                </Link>
                            </motion.div>

                            {/* Trust row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Integrates with</span>
                                {clients.slice(0, 5).map(c => (
                                    <span key={c} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '3px 10px', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>{c}</span>
                                ))}
                            </div>
                        </div>

                        {/* Right — Pipeline Sidebar Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}
                        >
                            {/* Header */}
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Pipeline Overview</span>
                                <Link href="/templates/crm-01/pipeline" style={{ fontSize: '0.75rem', color: accent, textDecoration: 'none', fontWeight: 500 }}>View Pipeline →</Link>
                            </div>
                            {/* Metrics row */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
                                {SAMPLE_METRICS.slice(0, 4).map((m, i) => (
                                    <div key={m.label} style={{ padding: '14px 20px', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none', borderRight: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 4 }}>{m.label}</p>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>{m.value}</span>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: m.trend === 'up' ? '#10b981' : '#ef4444' }}>{m.change}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Pipeline stages */}
                            <div style={{ padding: '16px 20px' }}>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Stage Breakdown</p>
                                {SAMPLE_PIPELINE.map(stage => (
                                    <div key={stage.name} style={{ marginBottom: 10 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{stage.name}</span>
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                <span style={{ fontSize: '0.75rem', color: accent, fontWeight: 600 }}>{stage.value}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stage.count}</span>
                                            </div>
                                        </div>
                                        <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2, overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stage.percentage}%` }}
                                                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                style={{ height: '100%', background: accent, borderRadius: 2, opacity: 0.75 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>
                                <Link href="/templates/crm-01/dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '9px', background: accent, color: '#fff', borderRadius: 6, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    Launch Dashboard
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── STATS STRIP ───────────────────────────────────────────────── */}
                <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {heroStats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                style={{ padding: '28px 32px', borderRight: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}
                            >
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>{s.label}</p>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6, fontVariantNumeric: 'tabular-nums' }}>
                                    <AnimatedNumber target={Math.round(s.value)} prefix={s.prefix ?? ''} suffix={s.suffix} />
                                </p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.delta}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── FEATURE GRID ──────────────────────────────────────────────── */}
                <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <p style={{ fontSize: '0.75rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Platform Capabilities</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', maxWidth: 480, lineHeight: 1.2 }}>
                                Every tool your revenue team needs — in one system
                            </h2>
                            <Link href="/templates/crm-01/features" style={{ fontSize: '0.875rem', color: accent, textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                View all features →
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                            >
                                <Link
                                    href={f.href}
                                    style={{ display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '24px', textDecoration: 'none', transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s', cursor: 'pointer' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.15)`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                >
                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, marginBottom: 16 }}>
                                        {f.icon}
                                    </div>
                                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</p>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
                                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: accent, fontWeight: 500 }}>
                                        Explore
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── PRICING CTA ───────────────────────────────────────────────── */}
                <section style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                                Ready to see the full platform?
                            </h2>
                            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 480 }}>
                                Explore every internal page — live data, real AI intelligence, and zero dummy content.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                            <Link
                                href="/templates/crm-01/pricing"
                                style={{ padding: '11px 22px', background: accent, color: '#fff', borderRadius: 7, fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: `0 4px 16px ${accent}40`, transition: 'transform 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = ''}
                            >
                                View Pricing
                            </Link>
                            <Link
                                href="/templates/crm-01/dashboard"
                                style={{ padding: '11px 22px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-card)', borderRadius: 7, fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'border-color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = `${accent}50`}
                                onMouseLeave={e => e.currentTarget.style.borderColor = ''}
                            >
                                Open Dashboard
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </CrmLayout>
    );
}
