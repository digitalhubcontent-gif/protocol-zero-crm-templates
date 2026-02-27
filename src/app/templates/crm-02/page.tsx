'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_METRICS, SAMPLE_PIPELINE } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, prefix = '', suffix = '', decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target]);
    const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
    return <>{prefix}{display}{suffix}</>;
}

// ─── ANIMATED SIGNAL TICKER ───────────────────────────────────────────────────
const signals = [
    { id: 1, type: 'INTENT_SURGE', account: 'Cortex Systems', severity: 'CRITICAL', score: 94 },
    { id: 2, type: 'CHAMPION_RISK', account: 'Helios Capital', severity: 'HIGH', score: 81 },
    { id: 3, type: 'EXPANSION_TRIGGER', account: 'Novu Technologies', severity: 'INFO', score: 76 },
    { id: 4, type: 'DEAL_STALE', account: 'Axiom Financial', severity: 'HIGH', score: 68 },
    { id: 5, type: 'BUYING_SIGNAL', account: 'Meridian Health', severity: 'INFO', score: 91 },
];

const severityColor: Record<string, string> = {
    CRITICAL: '#ef4444',
    HIGH: '#f59e0b',
    INFO: '#10b981',
};

const aiModules = [
    { key: 'SIGNAL_ENGINE', label: 'Signal Fusion Engine', status: 'ACTIVE', latency: '12ms', href: '/templates/crm-02/analytics' },
    { key: 'DEAL_SCORE', label: 'Deal Score Model v4.1', status: 'ACTIVE', latency: '38ms', href: '/templates/crm-02/pipeline' },
    { key: 'BUYER_GRAPH', label: 'Buyer Graph Classifier', status: 'ACTIVE', latency: '24ms', href: '/templates/crm-02/contact' },
    { key: 'FORECAST_MODEL', label: 'Forecast Ensemble', status: 'ACTIVE', latency: '55ms', href: '/templates/crm-02/analytics' },
    { key: 'AUTONOMOUS_OPS', label: 'Autonomous Workflow Engine', status: 'ACTIVE', latency: '8ms', href: '/templates/crm-02/automation' },
    { key: 'ALERTING', label: 'Priority Alert Queue', status: 'ACTIVE', latency: '3ms', href: '/templates/crm-02/dashboard' },
];

const capabilities = [
    { title: 'Autonomous Deal Scoring', desc: 'AI models update win probability on every signal event. Zero manual scoring.', href: '/templates/crm-02/pipeline' },
    { title: 'Signal Fusion Network', desc: '40+ behavioral signals aggregated into unified intent vectors in real time.', href: '/templates/crm-02/analytics' },
    { title: 'Buyer Archetype Classifier', desc: 'NLP and engagement graph classification: Champion, Economic Buyer, Blocker.', href: '/templates/crm-02/contact' },
    { title: 'Champion Risk Protocol', desc: 'Detects departure signals and escalates autonomously within 15 minutes.', href: '/templates/crm-02/automation' },
    { title: 'Expansion Trigger Engine', desc: 'Monitors NRR trajectory and creates expansion pipeline automatically.', href: '/templates/crm-02/automation' },
    { title: 'Forecast Ensemble Model', desc: '90-day ARR forecasting with multi-model ensemble and confidence intervals.', href: '/templates/crm-02/analytics' },
];

export default function Crm02Page() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = '#a855f7';
    const secondaryAccent = '#06b6d4';

    const [activeSignal, setActiveSignal] = useState(0);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setActiveSignal(prev => (prev + 1) % signals.length);
            setTick(t => t + 1);
        }, 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="overview" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

                {/* ── TOP GLOW ─────────────────────────────────────────────────── */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 10%, ${accent}60 50%, transparent 90%)`, pointerEvents: 'none', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, background: `radial-gradient(ellipse, ${accent}12 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 2 }}>

                    {/* ── SYSTEM STATUS BAR ─────────────────────────────────────── */}
                    <div style={{ borderBottom: `1px solid ${accent}15`, padding: '10px 48px', display: 'flex', alignItems: 'center', gap: 32, background: 'var(--bg-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                                style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}
                            />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#10b981', letterSpacing: '0.08em' }}>SYSTEM NOMINAL</span>
                        </div>
                        {['AI Engine v4.1: ACTIVE', 'Signal Queue: LIVE', 'Models: Up-to-date', `Signals processed: ${(14420 + tick * 3).toLocaleString()}`].map(s => (
                            <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{s}</span>
                        ))}
                    </div>

                    {/* ── HERO ─────────────────────────────────────────────────────── */}
                    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 56px', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 64, alignItems: 'center' }}>

                        {/* Left — Copy */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${accent}10`, border: `1px solid ${accent}25`, borderRadius: 4, padding: '5px 14px', marginBottom: 32, fontFamily: 'var(--font-mono)' }}
                            >
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>MODULE::OVERVIEW</span>
                                <span style={{ width: 1, height: 10, background: `${accent}40` }} />
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>CRM-02 AI COMMAND CENTER</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                style={{ fontSize: 'clamp(2.75rem, 6vw, 4.25rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 28, color: 'var(--text-primary)' }}
                            >
                                AI<br />
                                <span style={{ color: 'var(--text-accent)', textShadow: `0 0 60px ${accent}50` }}>COMMAND</span><br />
                                CENTER
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}
                            >
                                Unified intelligence hub where every revenue signal is processed, scored, and actioned by autonomous AI systems. Zero manual triage. Zero guesswork.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}
                            >
                                <Link
                                    href="/templates/crm-02/dashboard"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: accent, color: '#fff', borderRadius: 6, fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', boxShadow: `0 0 30px ${accent}40`, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', transition: 'box-shadow 0.2s, transform 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${accent}60`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 30px ${accent}40`; e.currentTarget.style.transform = ''; }}
                                >
                                    OPEN COMMAND CENTER
                                </Link>
                                <Link
                                    href="/templates/crm-02/features"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', border: `1px solid ${accent}35`, color: 'var(--text-secondary)', borderRadius: 6, fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', transition: 'border-color 0.2s, color 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}70`; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}35`; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                >
                                    AI CAPABILITIES
                                </Link>
                                <Link
                                    href="/templates/crm-02/pricing"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--text-muted)', borderRadius: 6, fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', transition: 'color 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >
                                    PRICING →
                                </Link>
                            </motion.div>

                            {/* Metrics row */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0 40px' }}>
                                {[
                                    { label: 'FORECAST_ACCURACY', value: 96.1, suffix: '%' },
                                    { label: 'SIGNALS_PROCESSED', value: 14420, suffix: '' },
                                    { label: 'AI_WIN_RATE', value: 47, suffix: '%' },
                                ].map(m => (
                                    <div key={m.label}>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 4 }}>{m.label}</p>
                                        <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                                            <AnimatedNumber target={m.value} suffix={m.suffix} decimals={m.suffix === '%' && m.value < 100 ? 1 : 0} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Live Signal Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            style={{ background: 'var(--bg-card)', border: `1px solid ${accent}20`, borderRadius: 8, overflow: 'hidden' }}
                        >
                            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}15`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>SIGNAL_QUEUE::LIVE</span>
                                <Link href="/templates/crm-02/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = accent}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >VIEW FULL QUEUE →</Link>
                            </div>

                            <div>
                                {signals.map((sig, i) => (
                                    <motion.div
                                        key={sig.id}
                                        animate={{ background: i === activeSignal ? `${accent}08` : 'transparent' }}
                                        transition={{ duration: 0.3 }}
                                        style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}08`, cursor: 'pointer' }}
                                        onClick={() => window.location.href = '/templates/crm-02/dashboard'}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                            <div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: severityColor[sig.severity], letterSpacing: '0.08em', background: `${severityColor[sig.severity]}15`, padding: '1px 6px', borderRadius: 2 }}>{sig.severity}</span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginLeft: 8 }}>{sig.type}</span>
                                            </div>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-accent)', fontWeight: 700 }}>AI:{sig.score}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: i === activeSignal ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.3s' }}>{sig.account}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <Link href="/templates/crm-02/dashboard" style={{ display: 'block', padding: '12px 20px', background: `${accent}12`, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'background 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.background = `${accent}20`}
                                onMouseLeave={e => e.currentTarget.style.background = `${accent}12`}
                            >
                                ACCESS COMMAND CENTER →
                            </Link>
                        </motion.div>

                    </section>

                    {/* ── AI MODULE STATUS ──────────────────────────────────────── */}
                    <section style={{ borderTop: `1px solid ${accent}12`, borderBottom: `1px solid ${accent}12`, background: 'var(--bg-secondary)' }}>
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 48px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 20 }}>AI_ENGINE::MODULE_STATUS</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                {aiModules.map(mod => (
                                    <Link key={mod.key} href={mod.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 6, textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}35`; e.currentTarget.style.background = `${accent}08`; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}15`; e.currentTarget.style.background = 'var(--bg-card)'; }}
                                    >
                                        <motion.div
                                            animate={{ opacity: [1, 0.4, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: aiModules.indexOf(mod) * 0.3 }}
                                            style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', flexShrink: 0 }}
                                        />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.08em', marginBottom: 2 }}>{mod.key}</p>
                                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.label}</p>
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-muted)', flexShrink: 0 }}>{mod.latency}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── CAPABILITIES GRID ─────────────────────────────────────── */}
                    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px' }}>
                        <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>MODULE::CAPABILITY_REGISTRY</span>
                                <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', maxWidth: 480, lineHeight: 1.15 }}>
                                    Fully autonomous AI capabilities
                                </h2>
                            </div>
                            <Link href="/templates/crm-02/features" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-accent)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'opacity 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >VIEW ALL CAPABILITIES →</Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            {capabilities.map((c, i) => (
                                <motion.div
                                    key={c.title}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                                >
                                    <Link href={c.href} style={{ display: 'block', background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 8, padding: '24px', textDecoration: 'none', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}35`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}15`; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}15`; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                    >
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>AI_CAPABILITY</p>
                                        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{c.title}</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{c.desc}</p>
                                        <div style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>EXPLORE →</div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ── PRICING CTA ───────────────────────────────────────────── */}
                    <section style={{ borderTop: `1px solid ${accent}12`, background: 'var(--bg-secondary)' }}>
                        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
                            <div>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>MODULE::ACCESS</p>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                                    Activate the AI Engine
                                </h2>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 440 }}>
                                    Three intelligence tiers. Unlimited AI processing. Priced per seat.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                                <Link href="/templates/crm-02/pricing" style={{ padding: '12px 24px', background: accent, color: '#fff', borderRadius: 6, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', boxShadow: `0 0 24px ${accent}40`, transition: 'box-shadow 0.2s, transform 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${accent}60`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 24px ${accent}40`; e.currentTarget.style.transform = ''; }}
                                >VIEW PRICING</Link>
                                <Link href="/templates/crm-02/dashboard" style={{ padding: '12px 24px', background: 'transparent', border: `1px solid ${accent}30`, color: 'var(--text-secondary)', borderRadius: 6, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', transition: 'border-color 0.2s, color 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}30`; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                >OPEN DASHBOARD</Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </CrmLayout>
    );
}
