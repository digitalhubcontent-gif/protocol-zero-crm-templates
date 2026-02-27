'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { INSTRUMENT_LEDGER } from '../data';
import { StackedBarChart } from '@/components/charts/StackedBarChart';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const EXPOSURE_STACKED = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => ({
    label: m,
    segments: [
        { label: 'Investment Grade', value: 290 + i * 2.5, color: '#10b981' },
        { label: 'Sub-Investment', value: 130 - i * 1.2, color: 'var(--text-accent)' },
        { label: 'Distressed', value: 40 + i * 0.3, color: '#f97316' },
        { label: 'Default', value: 12, color: '#ef4444' },
    ],
}));

const TIER_SUMMARY = [
    { label: 'Investment Grade (AAA–BBB)', value: '$312M', pct: '64.7%', color: '#10b981' },
    { label: 'Sub-Investment Grade (BB–B)', value: '$128M', pct: '26.6%', color: 'var(--text-accent)' },
    { label: 'Distressed (CCC–C)', value: '$32M', pct: '6.6%', color: '#f97316' },
    { label: 'Default (D)', value: '$10M', pct: '2.1%', color: '#ef4444' },
];

export default function Crm03PipelinePage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [riskAdj, setRiskAdj] = useState(85);
    const [showSim, setShowSim] = useState(false);
    const adjustedPipeline = Math.round(380 * (riskAdj / 100));

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>REVENUE EXPOSURE STAGING &nbsp;◆&nbsp; RISK TIER ANALYSIS</span>
                </div>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>

                    {/* Risk tier summary strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${am('12')}`, marginBottom: 24 }}>
                        {TIER_SUMMARY.map((tier, i) => (
                            <div key={tier.label} style={{ padding: '16px 20px', borderRight: i < 3 ? `1px solid ${am('10')}` : 'none', borderLeft: `3px solid ${tier.color}` }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 6 }}>{tier.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: tier.color, marginBottom: 2 }}>{tier.value}</p>
                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{tier.pct} of total</p>
                            </div>
                        ))}
                    </div>

                    {/* Hero metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
                        {[
                            { key: 'WEIGHTED_EXPOSURE_VALUE', val: '$380M' },
                            { key: 'RISK_ADJUSTED_PIPELINE', val: `$${adjustedPipeline}M` },
                            { key: 'DEAL_DURATION_VARIANCE', val: '±8.2 months' },
                        ].map(m => (
                            <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px 16px' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 6 }}>{m.key}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-accent)' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Risk Adjustment Slider */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px 20px', marginBottom: 16 }}>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>RISK ADJUSTMENT SIMULATOR</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Probability Weight:</span>
                            <input type="range" min={50} max={100} value={riskAdj}
                                onChange={e => setRiskAdj(Number(e.target.value))}
                                style={{ flex: 1, accentColor: accent, cursor: 'pointer' }} />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 700, width: 36 }}>{riskAdj}%</span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>→ Adjusted: <strong style={{ color: 'var(--text-accent)' }}>${adjustedPipeline}M</strong></span>
                        </div>
                    </div>

                    {/* Stacked bar + Scatter 2 col */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>EXPOSURE BOOK COMPOSITION — 12 MONTHS</p>
                            <StackedBarChart bars={EXPOSURE_STACKED} height={220} />
                        </div>

                        {/* Settlement cycle */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>SETTLEMENT CYCLE ANALYSIS — AVG DAYS</p>
                            <svg width="100%" height={220} viewBox="0 0 420 220" preserveAspectRatio="xMidYMid meet">
                                {[['Prospect', 14], ['Discovery', 22], ['Term Sheet', 18], ['Due Diligence', 34], ['Legal', 28], ['Settlement', 12]].map(([label, days], i) => {
                                    const barW = (Number(days) / 40) * 280;
                                    const y = 16 + i * 33;
                                    return (
                                        <g key={i}>
                                            <text x={4} y={y + 13} fontSize={9} fill="var(--text-muted)" fontFamily="monospace">{label}</text>
                                            <rect x={110} y={y} width={barW} height={20} fill={am('55')} rx={1} />
                                            <text x={110 + barW + 4} y={y + 13} fontSize={9} fill={accent} fontFamily="monospace">{days}d</text>
                                            {/* Benchmark line at avg 21 days */}
                                            <line x1={110 + 21 / 40 * 280} y1={y} x2={110 + 21 / 40 * 280} y2={y + 20} stroke="#ef4444" strokeWidth={1} strokeDasharray="2 2" opacity={0.5} />
                                        </g>
                                    );
                                })}
                                <text x={110 + 21 / 40 * 280 + 2} y={212} fontSize={7} fill="#ef4444" fontFamily="monospace">industry avg</text>
                            </svg>
                        </div>
                    </div>

                    {/* Liquidity sim */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>LIQUIDITY IMPACT SIMULATION</p>
                            <button onClick={() => setShowSim(v => !v)}
                                style={{ padding: '4px 10px', border: `1px solid ${am('30')}`, background: 'transparent', color: 'var(--text-accent)', fontSize: '0.5rem', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.1em', transition: 'background 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.background = am('10')}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                {showSim ? '[CLOSE]' : '[RUN SIMULATION]'}
                            </button>
                        </div>
                        {showSim && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '12px', background: 'var(--bg-secondary)', border: `1px solid ${am('1A')}` }}>
                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginBottom: 8 }}>Scenario: 20% of BB-rated instruments churn</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                                    {[
                                        { key: 'BB_ARR_AFFECTED', val: '$25.6M' },
                                        { key: 'REVISED_SECURED_ARR', val: '$456.4M (–5.3%)' },
                                        { key: 'LIQUIDITY_HORIZON_IMPACT', val: '–2.1 months' },
                                    ].map(m => (
                                        <div key={m.key}>
                                            <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', marginBottom: 4 }}>{m.key}</p>
                                            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#ef4444' }}>{m.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
