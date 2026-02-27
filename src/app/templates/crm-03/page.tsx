'use client';

import React, { useState, useEffect } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SCENARIOS, SECTOR_TREEMAP, ARR_WATERFALL, CANDLE_DATA, INSTRUMENT_LEDGER, CURRENCY_PAIRS } from './data';
import { CandlestickChart } from '@/components/charts/CandlestickChart';
import { TreemapChart } from '@/components/charts/TreemapChart';

type Scenario = 'base' | 'conservative' | 'aggressive';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

function LiveClock() {
    const [time, setTime] = useState('--:--:-- UTC');
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toUTCString().slice(17, 25) + ' UTC');
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span>{time}</span>;
}

function CurrencyTicker() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 5000);
        return () => clearInterval(id);
    }, []);
    const jitter = (base: string) => {
        const n = parseFloat(base) + (Math.random() - 0.5) * 0.0008;
        return n.toFixed(base.includes('.') ? base.split('.')[1].length : 2);
    };
    return (
        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '8px 0' }}>
            {CURRENCY_PAIRS.map(cp => (
                <div key={cp.pair} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{cp.pair}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 700 }}>{jitter(cp.rate)}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: cp.dir === 'up' ? '#10b981' : '#ef4444' }}>
                        {cp.dir === 'up' ? '▲' : '▼'} {cp.change.slice(1)}
                    </span>
                </div>
            ))}
        </div>
    );
}

const navPages = [
    { key: 'dashboard', label: 'Dashboard', href: '/templates/crm-03/dashboard' },
    { key: 'analytics', label: 'Intelligence Terminal', href: '/templates/crm-03/analytics' },
    { key: 'pipeline', label: 'Exposure Staging', href: '/templates/crm-03/pipeline' },
    { key: 'contact', label: 'Counterparties', href: '/templates/crm-03/contact' },
    { key: 'activity', label: 'Engagement Events', href: '/templates/crm-03/activity' },
    { key: 'reports', label: 'Earnings Reports', href: '/templates/crm-03/reports' },
    { key: 'automation', label: 'Risk Rules Engine', href: '/templates/crm-03/automation' },
    { key: 'integrations', label: 'Data Infrastructure', href: '/templates/crm-03/integrations' },
    { key: 'pricing', label: 'Institutional Access', href: '/templates/crm-03/pricing' },
    { key: 'features', label: 'Platform Features', href: '/templates/crm-03/features' },
];

export default function Crm03Page() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="overview" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>

                {/* ── TERMINAL HEADER ────────────────────────────────────────── */}
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', fontWeight: 700 }}>
                        PROTOCOL_ZERO REVENUE TERMINAL &nbsp;◆&nbsp; Q2 2026 &nbsp;◆&nbsp; <LiveClock /> &nbsp;◆&nbsp; ▲ USD LIVE
                    </span>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>VOLATILITY: 0.27 [MODERATE]</span>
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                            style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', alignSelf: 'center' }} />
                    </div>
                </div>

                {/* ── CURRENCY TICKER ────────────────────────────────────────── */}
                <div style={{ background: 'var(--bg-elevated)', borderBottom: `1px solid ${am('0a')}`, padding: '0 40px' }}>
                    <CurrencyTicker />
                </div>

                {/* ── HERO ───────────────────────────────────────────────────── */}
                <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px 48px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>
                    <div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: am('10'), border: `1px solid ${am('25')}`, padding: '4px 12px', marginBottom: 24 }}>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>CRM-03 :: FINANCIAL INTELLIGENCE TERMINAL</span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 20 }}>
                            Revenue<br /><span style={{ color: 'var(--text-accent)' }}>Intelligence</span><br />Terminal
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                            style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
                            Bloomberg-grade analytics and revenue attribution. Built for finance-led revenue teams managing exposure books, risk ratings, and multi-scenario earnings projections.
                        </motion.p>

                        <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
                            <Link href="/templates/crm-03/dashboard"
                                style={{ padding: '11px 22px', background: accent, color: '#010409', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: `0 4px 20px ${am('40')}` }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${am('50')}`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 20px ${am('40')}`; }}>
                                OPEN TERMINAL
                            </Link>
                            <Link href="/templates/crm-03/pricing"
                                style={{ padding: '11px 22px', background: 'transparent', border: `1px solid ${am('30')}`, color: 'var(--text-accent)', fontSize: '0.8125rem', letterSpacing: '0.06em', textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = am('60'); e.currentTarget.style.background = am('08'); }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = am('30'); e.currentTarget.style.background = 'transparent'; }}>
                                INSTITUTIONAL RATES →
                            </Link>
                        </div>

                        {/* Key metrics strip */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${am('15')}` }}>
                            {[
                                { label: 'CONTRACTED_ARR', value: '$482M' },
                                { label: 'REVENUE_AT_RISK', value: '$31.4M' },
                                { label: 'FORECAST_NRR', value: '118%' },
                                { label: 'VOLATILITY_IDX', value: '0.27' },
                            ].map((m, i) => (
                                <div key={m.label} style={{ padding: '16px', borderRight: i < 3 ? `1px solid ${am('12')}` : 'none' }}>
                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 6 }}>{m.label}</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-accent)' }}>{m.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Candlestick preview */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                        style={{ background: 'var(--bg-card)', border: `1px solid ${am('15')}` }}>
                        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${am('0a')}`, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>WEEKLY_EARNINGS_VARIANCE :: LIVE</span>
                            <Link href="/templates/crm-03/dashboard" style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.08em' }}
                                onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)' as string}>
                                FULL VIEW →
                            </Link>
                        </div>
                        <div style={{ padding: '12px 8px' }}>
                            <CandlestickChart candles={CANDLE_DATA.slice(0, 8)} accent={accent} height={160} />
                        </div>
                        <div style={{ padding: '10px 16px', borderTop: `1px solid ${am('0a')}`, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>◼ POSITIVE VARIANCE &nbsp;&nbsp; ◼ NEGATIVE VARIANCE</span>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)' }}>W8: +2.2M ▲</span>
                        </div>
                        <div style={{ padding: '10px 16px', borderTop: `1px solid ${am('0a')}` }}>
                            <Link href="/templates/crm-03/dashboard" style={{ display: 'block', padding: '8px', textAlign: 'center', background: am('12'), color: 'var(--text-accent)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textDecoration: 'none', transition: 'background 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.background = am('20')} onMouseLeave={e => e.currentTarget.style.background = am('12')}>
                                LAUNCH TERMINAL →
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* ── MODULE INDEX ────────────────────────────────────────────── */}
                <section style={{ borderTop: `1px solid ${am('12')}`, padding: '48px 40px', maxWidth: 1280, margin: '0 auto' }}>
                    <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 24 }}>MODULE_INDEX :: 10 TERMINALS AVAILABLE</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                        {navPages.map((page, i) => (
                            <Link key={page.key} href={page.href}
                                style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', background: 'var(--bg-card)', border: `1px solid ${am('12')}`, textDecoration: 'none', position: 'relative', overflow: 'hidden', transition: 'border-color 0.15s, background 0.15s', cursor: 'pointer' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = am('35'); e.currentTarget.style.background = am('0a'); }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = am('12'); e.currentTarget.style.background = 'var(--bg-card)'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>MOD-{String(i + 1).padStart(2, '0')}</span>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{page.label}</span>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.08em', marginTop: 4 }}>ACCESS →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ── SECTOR TREEMAP ──────────────────────────────────────────── */}
                <section style={{ borderTop: `1px solid ${am('08')}`, padding: '48px 40px', maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>REVENUE_EXPOSURE :: SECTOR_TREEMAP</p>
                        <Link href="/templates/crm-03/dashboard" style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', textDecoration: 'none', letterSpacing: '0.08em' }}
                            onMouseEnter={e => e.currentTarget.style.color = accent} onMouseLeave={e => e.currentTarget.style.color = am('40')}>
                            FULL TERMINAL →
                        </Link>
                    </div>
                    <div style={{ border: `1px solid ${am('12')}`, padding: 8 }}>
                        <TreemapChart nodes={SECTOR_TREEMAP} accent={accent} height={200} />
                    </div>
                    <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: 8 }}>
                        Color intensity = Risk Score (1–10). Brighter red = higher attrition risk.
                    </p>
                </section>

                {/* ── PRICING CTA ─────────────────────────────────────────────── */}
                <section style={{ borderTop: `1px solid ${am('12')}`, background: 'var(--bg-secondary)' }}>
                    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
                        <div>
                            <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>TERMINAL_ACCESS :: INSTITUTIONAL_RATES</p>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>Request Institutional Term Sheet</h2>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 440 }}>Three access tiers. Revenue managed up to $2B ARR. Priced from $2,400/mo.</p>
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                            <Link href="/templates/crm-03/pricing"
                                style={{ padding: '11px 22px', background: accent, color: '#010409', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.06em', textDecoration: 'none', transition: 'transform 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                                VIEW TERM SHEET
                            </Link>
                            <Link href="/templates/crm-03/features"
                                style={{ padding: '11px 22px', background: 'transparent', border: `1px solid ${am('30')}`, color: 'var(--text-accent)', fontSize: '0.8125rem', letterSpacing: '0.06em', textDecoration: 'none', transition: 'border-color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = am('60')}
                                onMouseLeave={e => e.currentTarget.style.borderColor = am('30')}>
                                PLATFORM FEATURES
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </CrmLayout>
    );
}
