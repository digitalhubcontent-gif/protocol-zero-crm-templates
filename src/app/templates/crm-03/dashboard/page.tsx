'use client';

import React, { useState, useEffect } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CANDLE_DATA, ARR_WATERFALL, SECTOR_TREEMAP, INSTRUMENT_LEDGER, SCENARIOS } from '../data';
import { CandlestickChart } from '@/components/charts/CandlestickChart';
import { TreemapChart } from '@/components/charts/TreemapChart';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

function LiveClock() {
    const [time, setTime] = useState('--:--:--');
    useEffect(() => {
        const update = () => setTime(new Date().toUTCString().slice(17, 25));
        update(); const id = setInterval(update, 1000); return () => clearInterval(id);
    }, []);
    return <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>{time} UTC</span>;
}

type Scenario = 'base' | 'conservative' | 'aggressive';

const ratingColor = (r: string) => {
    if (['AAA', 'AA', 'A'].includes(r)) return '#10b981';
    if (['BBB'].includes(r)) return '#f59e0b';
    if (['BB', 'B'].includes(r)) return '#f97316';
    return '#ef4444';
};

const riskBorder = (r: string) => {
    if (['CCC', 'C', 'D'].includes(r)) return `3px solid #ef4444`;
    if (['BB', 'B'].includes(r)) return `3px solid #f97316`;
    return 'none';
};

export default function Crm03DashboardPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [scenario, setScenario] = useState<Scenario>('base');
    const [timeWindow, setTimeWindow] = useState(12);
    const sc = SCENARIOS[scenario];
    const candleSlice = CANDLE_DATA.slice(CANDLE_DATA.length - timeWindow);

    const metrics = [
        { key: 'FORECAST_VARIANCE', val: sc.forecastVariance, change: scenario === 'base' ? '▲' : scenario === 'conservative' ? '▼' : '▲▲' },
        { key: 'CONTRACTED_ARR', val: sc.contractedARR, change: '' },
        { key: 'REVENUE_AT_RISK', val: sc.revenueAtRisk, change: '' },
        { key: 'DEFERRED_EXPOSURE', val: sc.deferredExposure, change: '' },
        { key: 'NET_REVENUE_RETENTION', val: sc.nrr, change: '' },
        { key: 'AVG_CONTRACT_TERM', val: sc.avgContractTerm, change: '' },
        { key: 'LIQUIDITY_HORIZON', val: sc.liquidityHorizon, change: '' },
        { key: 'VOLATILITY_INDEX', val: sc.volatilityIndex, change: '' },
    ];

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>

                {/* Terminal Header */}
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>REVENUE TRADING FLOOR &nbsp;◆&nbsp; Q2 2026 &nbsp;◆&nbsp; <LiveClock /> &nbsp;◆&nbsp; ▲ USD LIVE</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {(['base', 'conservative', 'aggressive'] as Scenario[]).map(s => (
                            <button key={s} onClick={() => setScenario(s)}
                                style={{ padding: '4px 10px', border: `1px solid ${scenario === s ? accent : am('20')}`, background: scenario === s ? am('18') : 'transparent', color: scenario === s ? accent : 'var(--text-muted)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                {s === 'base' ? '[BASE]' : s === 'conservative' ? '[CONSERVATIVE ▼15%]' : '[AGGRESSIVE ▲20%]'}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>

                    {/* Metrics Grid 4×2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                        {metrics.slice(0, 8).map(m => (
                            <motion.div key={m.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px 16px', cursor: 'default' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 6 }}>{m.key}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-accent)', letterSpacing: '-0.02em', lineHeight: 1 }}>{m.val}</p>
                                {m.change && <p style={{ fontSize: '0.5625rem', color: scenario === 'conservative' ? '#ef4444' : '#10b981', marginTop: 4 }}>{m.change}</p>}
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts 2×2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>

                        {/* Chart 1: Candlestick + timeline slider */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>WEEKLY PROJECTED EARNINGS VARIANCE</p>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {[4, 8, 12].map(w => (
                                        <button key={w} onClick={() => setTimeWindow(w)}
                                            style={{ padding: '2px 8px', border: `1px solid ${timeWindow === w ? accent : am('20')}`, background: timeWindow === w ? am('15') : 'transparent', color: timeWindow === w ? accent : 'var(--text-muted)', fontSize: '0.5rem', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                            {w}W
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <CandlestickChart candles={candleSlice} accent={accent} height={180} />
                        </div>

                        {/* Chart 2: ARR Waterfall */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>ARR WATERFALL BRIDGE</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {ARR_WATERFALL.map((seg, i) => (
                                    <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', width: 140, flexShrink: 0 }}>{seg.label}</span>
                                        <div style={{ flex: 1, height: 20, background: 'var(--bg-secondary)', position: 'relative', borderRadius: 1 }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.abs(seg.value) / 5}%` }} transition={{ duration: 0.6, delay: i * 0.1 }}
                                                style={{ height: '100%', background: seg.type === 'positive' ? '#10b981' : seg.type === 'negative' ? '#ef4444' : accent, opacity: 0.8, borderRadius: 1 }} />
                                        </div>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: seg.type === 'positive' ? '#10b981' : seg.type === 'negative' ? '#ef4444' : accent, width: 60, textAlign: 'right' }}>
                                            {seg.value > 0 && seg.type === 'positive' ? '+' : ''}{seg.value < 0 ? '' : ''}${Math.abs(seg.value)}M
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart 3: Sector Treemap */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>REVENUE EXPOSURE BY SECTOR &amp; RISK TIER</p>
                            <TreemapChart nodes={SECTOR_TREEMAP} accent={accent} height={200} />
                        </div>

                        {/* Chart 4: Contract Term Distribution */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>CONTRACT DURATION DISTRIBUTION</p>
                            <svg width="100%" height={200} viewBox="0 0 500 200" preserveAspectRatio="none">
                                {[['6mo', 8], ['12mo', 34], ['24mo', 28], ['36mo', 44], ['60mo', 22]].map(([label, count], i) => {
                                    const x = 50 + i * 88;
                                    const barH = (Number(count) / 50) * 140;
                                    return (
                                        <g key={i}>
                                            <rect x={x} y={170 - barH} width={56} height={barH} fill={am('50')} rx={1} />
                                            <text x={x + 28} y={190} textAnchor="middle" fontSize={9} fill="var(--text-muted)" fontFamily="monospace">{label}</text>
                                            <text x={x + 28} y={170 - barH - 4} textAnchor="middle" fontSize={9} fill={accent} fontFamily="monospace">{count}</text>
                                        </g>
                                    );
                                })}
                                {/* Average line at 28.4mo = ~index 3 */}
                                <line x1={50 + 2 * 88 + 28} y1={10} x2={50 + 2 * 88 + 28} y2={175} stroke={accent} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6} />
                                <text x={50 + 2 * 88 + 34} y={22} fontSize={8} fill={accent} fontFamily="monospace">avg 28.4mo</text>
                            </svg>
                        </div>
                    </div>

                    {/* Revenue Instrument Ledger */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}` }}>
                        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${am('0a')}`, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>REVENUE INSTRUMENT LEDGER ◆ SORTED BY EXPOSURE SCORE</span>
                            <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{INSTRUMENT_LEDGER.length} INSTRUMENTS</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: `1px solid ${am('10')}` }}>
                                        {['CLIENT ID', 'COUNTERPARTY', 'ARR ($M)', 'TERM (MO)', 'RISK RATING', 'REMAINING (MO)', 'RENEWAL PROB %', 'EXPOSURE SCORE'].map(h => (
                                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {INSTRUMENT_LEDGER.sort((a, b) => b.exposureScore - a.exposureScore).map((row, i) => (
                                        <tr key={row.id} style={{ borderBottom: `1px solid ${am('06')}`, borderLeft: riskBorder(row.rating), transition: 'background 0.1s', cursor: 'pointer' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = am('06'); }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-accent)', fontSize: '0.5625rem' }}>{row.id}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>{row.counterparty}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-accent)', fontWeight: 700 }}>{row.arr.toFixed(1)}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.term}</td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <span style={{ color: ratingColor(row.rating), fontWeight: 700 }}>{row.rating}</span>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: row.remaining < 6 ? '#ef4444' : 'var(--text-muted)' }}>{row.remaining}</td>
                                            <td style={{ padding: '10px 12px', background: row.renewalProb < 60 ? `${accent}10` : 'transparent' }}>
                                                <span style={{ color: row.renewalProb < 60 ? accent : '#10b981', fontWeight: row.renewalProb < 60 ? 700 : 400 }}>{row.renewalProb}%</span>
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <span style={{ color: row.exposureScore > 70 ? accent : 'var(--text-secondary)', fontWeight: row.exposureScore > 70 ? 700 : 400 }}>{row.exposureScore}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
