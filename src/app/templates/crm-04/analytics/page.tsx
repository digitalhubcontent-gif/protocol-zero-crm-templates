'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { COHORT_RETENTION_04, SECTOR_DISTRIBUTION } from '../data';
import { AreaChart } from '@/components/charts/AreaChart';

const TREND_DATA = Array.from({ length: 12 }, (_, i) => ({
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    arr: 3400 + i * 420 + Math.round(Math.random() * 180),
    pipeline: 5200 + i * 310 + Math.round(Math.random() * 240),
}));

export default function Crm04AnalyticsPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [period, setPeriod] = useState<'12M' | '6M' | '3M'>('12M');
    const sliced = period === '12M' ? TREND_DATA : period === '6M' ? TREND_DATA.slice(6) : TREND_DATA.slice(9);

    const cohortColors = (v: number) => {
        if (v >= 120) return { bg: 'var(--text-primary)', text: 'var(--bg-primary)' };
        if (v >= 100) return { bg: 'var(--text-secondary)', text: 'var(--bg-primary)' };
        if (v >= 80) return { bg: 'var(--border)', text: 'var(--text-primary)' };
        return { bg: 'var(--bg-secondary)', text: 'var(--text-muted)' };
    };

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Analytics &nbsp;/&nbsp; Revenue Trends</span>
                </div>

                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* Period control */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <div>
                            <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Revenue Trends</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARR growth and pipeline trajectory over time.</p>
                        </div>
                        <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)' }}>
                            {(['3M', '6M', '12M'] as const).map(p => (
                                <button key={p} onClick={() => setPeriod(p)}
                                    style={{ padding: '5px 14px', background: period === p ? 'var(--text-primary)' : 'transparent', color: period === p ? 'var(--bg-primary)' : 'var(--text-secondary)', border: 'none', fontSize: '0.5625rem', letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ARR trend chart */}
                    <div style={{ border: '1px solid var(--border)', padding: '20px', marginBottom: 24 }}>
                        <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>ARR vs Pipeline Trajectory</p>
                        <AreaChart
                            series={[
                                { label: 'ARR ($K)', color: 'var(--text-primary)', data: sliced.map(d => ({ x: d.x, value: d.arr })), fillOpacity: 0.1 },
                                { label: 'Pipeline ($K)', color: 'var(--text-muted)', data: sliced.map(d => ({ x: d.x, value: d.pipeline })), dashed: true, fillOpacity: 0.04 },
                            ]}
                            height={200}
                            monochromeMode
                        />
                    </div>

                    {/* 2-col: Sector table + Cohort heatmap */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        {/* Sector breakdown */}
                        <div style={{ border: '1px solid var(--border)' }}>
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sector Distribution</p>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                        {['Sector', 'ARR ($K)', 'Pipeline', 'Partners', 'Growth'].map(h => (
                                            <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {SECTOR_DISTRIBUTION.map(s => (
                                        <tr key={s.sector} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s', cursor: 'pointer' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '10px 16px', fontWeight: 500, fontSize: '0.75rem' }}>{s.sector}</td>
                                            <td style={{ padding: '10px 16px', fontSize: '0.75rem', fontWeight: 600 }}>{(s.arr / 1000).toFixed(1)}M</td>
                                            <td style={{ padding: '10px 16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>${(s.pipeline / 1000).toFixed(1)}M</td>
                                            <td style={{ padding: '10px 16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.partners}</td>
                                            <td style={{ padding: '10px 16px', fontSize: '0.75rem' }}>
                                                <span style={{ color: s.yoyGrowth > 0 ? 'var(--status-success-text, #16a34a)' : 'var(--status-danger-text, #dc2626)' }}>{s.yoyGrowth > 0 ? '+' : ''}{s.yoyGrowth}%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cohort heatmap */}
                        <div style={{ border: '1px solid var(--border)', padding: '20px' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>NRR Cohort Retention</p>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ borderCollapse: 'collapse', fontSize: '0.7rem', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 50, textAlign: 'left', fontSize: '0.5rem', color: 'var(--text-muted)', padding: '4px 8px', fontWeight: 400 }}>Cohort</th>
                                            {['Q0', 'Q+1', 'Q+2', 'Q+3', 'Q+4', 'Q+5'].map(c => (
                                                <th key={c} style={{ width: 40, textAlign: 'center', fontSize: '0.5rem', color: 'var(--text-muted)', padding: '4px 6px', fontWeight: 400 }}>{c}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {COHORT_RETENTION_04.map(r => (
                                            <tr key={r.cohort}>
                                                <td style={{ padding: '2px 8px', fontSize: '0.55rem', color: 'var(--text-secondary)' }}>{r.cohort}</td>
                                                {([r.q0, r.q1, r.q2, r.q3, r.q4, r.q5] as (number | null)[]).map((v, i) => {
                                                    const c = v !== null ? cohortColors(v) : { bg: 'transparent', text: 'var(--text-muted)' };
                                                    return (
                                                        <td key={i} style={{ padding: '2px 3px', textAlign: 'center' }}>
                                                            <div style={{ background: c.bg, color: c.text, padding: '4px 0', borderRadius: 2, fontSize: '0.55rem', fontWeight: 500 }}>
                                                                {v !== null ? `${v}%` : '—'}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                                {[{ bg: 'var(--text-primary)', text: '≥120%' }, { bg: 'var(--text-secondary)', text: '100%' }, { bg: 'var(--border)', text: '80%' }, { bg: 'var(--bg-secondary)', text: '<80%' }].map(l => (
                                    <div key={l.text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 10, height: 10, background: l.bg, borderRadius: 2, border: '1px solid var(--border)' }} />
                                        <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{l.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
