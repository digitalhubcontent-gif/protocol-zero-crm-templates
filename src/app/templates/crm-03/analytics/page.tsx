'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { TORNADO_DATA, COHORT_DATA, SCENARIOS } from '../data';
import { TornadoChart } from '@/components/charts/TornadoChart';
import { AreaChart } from '@/components/charts/AreaChart';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;
type Scenario = 'base' | 'conservative' | 'aggressive';

const MATURITY_DATA = Array.from({ length: 24 }, (_, i) => ({
    x: `M${i + 1}`,
    contracted: 482 + i * 3.4,
    projected: 490 + i * 4.2 + Math.sin(i * 0.4) * 8,
}));

function CohortGridDisplay({ data }: { data: typeof COHORT_DATA }) {
    const cols = ['Q0', 'Q+1', 'Q+2', 'Q+3', 'Q+4', 'Q+5', 'Q+6', 'Q+7'];
    const getColor = (val: number | null) => {
        if (val === null) return 'rgba(255,255,255,0.03)';
        if (val >= 120) return '#059669';
        if (val >= 100) return `${accent}80`;
        if (val >= 80) return '#f97316';
        return '#ef4444';
    };
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.6875rem', fontFamily: 'monospace' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '6px 12px', textAlign: 'left', fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', fontWeight: 400 }}>COHORT</th>
                        {cols.map(c => <th key={c} style={{ padding: '6px 10px', fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', fontWeight: 400 }}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.cohort}>
                            <td style={{ padding: '4px 12px', color: 'var(--text-muted)', fontSize: '0.5625rem' }}>{row.cohort}</td>
                            {([row.q0, row.q1, row.q2, row.q3, row.q4, row.q5, row.q6, row.q7] as (number | null)[]).map((v, ci) => (
                                <td key={ci} style={{ padding: '1px', textAlign: 'center' }}>
                                    <div style={{ padding: '5px 8px', background: getColor(v), borderRadius: 2 }}>
                                        <span style={{ fontSize: '0.5625rem', color: v !== null && v < 90 ? '#fff' : v !== null && v >= 120 ? '#fff' : 'rgba(0,0,0,0.7)', fontWeight: 600 }}>
                                            {v !== null ? `${v}%` : '—'}
                                        </span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function Crm03AnalyticsPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [scenario, setScenario] = useState<Scenario>('base');
    const sc = SCENARIOS[scenario];

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>REVENUE INTELLIGENCE TERMINAL &nbsp;◆&nbsp; SCENARIO ANALYSIS</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['base', 'conservative', 'aggressive'] as Scenario[]).map(s => (
                            <button key={s} onClick={() => setScenario(s)}
                                style={{ padding: '4px 10px', border: `1px solid ${scenario === s ? accent : am('20')}`, background: scenario === s ? am('18') : 'transparent', color: scenario === s ? accent : am('30'), fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                [{s === 'base' ? 'BASE CASE' : s === 'conservative' ? 'CONSERVATIVE ▼15%' : 'AGGRESSIVE ▲20%'}]
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    {/* Hero metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
                        {[
                            { key: 'FORECAST_SENSITIVITY_SCORE', val: '6.4 / 10' },
                            { key: 'REVENUE_STABILITY_RATIO', val: sc.nrr === '118%' ? '0.84' : sc.nrr === '104%' ? '0.71' : '0.94' },
                            { key: 'EBITDA_CONTRIBUTION', val: '31.2%' },
                        ].map(m => (
                            <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px 20px' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 6 }}>{m.key}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-accent)' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts 2×2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        {/* Tornado */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>PROJECTED EARNINGS SENSITIVITY — TORNADO ANALYSIS</p>
                            <TornadoChart items={TORNADO_DATA} accent={accent} height={240} />
                        </div>

                        {/* Cohort retention heatmap */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                            <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>NRR RETENTION COHORT ANALYSIS</p>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                                {[{ color: '#059669', label: '≥120%' }, { color: 'var(--text-accent)', label: '100%' }, { color: '#f97316', label: '80%' }, { color: '#ef4444', label: '<80%' }].map(l => (
                                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{ width: 8, height: 8, background: l.color, borderRadius: 1, marginTop: 2 }} />
                                        <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{l.label}</span>
                                    </div>
                                ))}
                            </div>
                            <CohortGridDisplay data={COHORT_DATA} />
                        </div>
                    </div>

                    {/* Revenue maturity area chart */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px', marginBottom: 16 }}>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>REVENUE MATURITY &amp; RECOGNITION CURVE — NEXT 24 MONTHS</p>
                        <AreaChart
                            series={[
                                { label: 'Contracted ARR', color: 'var(--text-accent)', data: MATURITY_DATA.map(d => ({ x: d.x, value: d.contracted })), fillOpacity: 0.2 },
                                { label: 'Projected Earnings', color: '#10b981', data: MATURITY_DATA.map(d => ({ x: d.x, value: d.projected })), dashed: true, fillOpacity: 0.08 },
                            ]}
                            height={180}
                        />
                    </div>

                    {/* Renewal probability distribution */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '16px' }}>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 12 }}>RENEWAL PROBABILITY DISTRIBUTION</p>
                        <svg width="100%" height={140} viewBox="0 0 580 140" preserveAspectRatio="none">
                            {[['0–10%', 2], ['10–20%', 4], ['20–30%', 6], ['30–40%', 8], ['40–50%', 12], ['50–60%', 9], ['60–70%', 11], ['70–80%', 16], ['80–90%', 20], ['90–100%', 12]].map(([label, count], i) => {
                                const x = 24 + i * 54;
                                const barH = (Number(count) / 25) * 90;
                                return (
                                    <g key={i}>
                                        <rect x={x} y={100 - barH} width={40} height={barH} fill={am('50')} rx={1} />
                                        <text x={x + 20} y={118} textAnchor="middle" fontSize={7} fill="var(--text-muted)" fontFamily="monospace">{label}</text>
                                        <text x={x + 20} y={97 - barH} textAnchor="middle" fontSize={7.5} fill={accent} fontFamily="monospace">{count}</text>
                                    </g>
                                );
                            })}
                            {/* Mean line at 76% = idx 7 */}
                            <line x1={24 + 7.6 * 54} y1={5} x2={24 + 7.6 * 54} y2={105} stroke={accent} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />
                            <text x={24 + 7.6 * 54 + 5} y={18} fontSize={8} fill={accent} fontFamily="monospace">mean 76%</text>
                        </svg>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
