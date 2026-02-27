'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { AI_DEALS, BEHAVIORAL_HEATMAP, CONFIDENCE_TREND, AI_ACTIVITY } from '../data';

const accent = '#a78bfa';

const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#f85149', label: 'Cold' },
    { min: 40, max: 70, color: '#d29922', label: 'Warm' },
    { min: 70, max: 100, color: '#a78bfa', label: 'Hot' },
];

const momentumColor = (m: string) =>
    m === 'accelerating' ? '#3fb950' : m === 'holding' ? '#d29922' : '#f85149';

const momentumIcon = (m: string) =>
    m === 'accelerating' ? '↑' : m === 'holding' ? '→' : '↓';

function DashboardContent() {
    const [period, setPeriod] = useState<'24h' | '7d' | '30d'>('7d');

    const totalPipeline = AI_DEALS.reduce((s, d) => s + d.value, 0);
    const avgConfidence = Math.round(AI_DEALS.reduce((s, d) => s + d.confidence, 0) / AI_DEALS.length);
    const highConfidence = AI_DEALS.filter(d => d.confidence >= 75).length;
    const atRisk = AI_DEALS.filter(d => d.confidence < 60).length;

    const kpis = [
        { label: 'AI Pipeline Coverage', value: `$${(totalPipeline / 1_000_000).toFixed(1)}M`, sub: '8 active signals', delta: 'up' },
        { label: 'Avg Confidence Score', value: `${avgConfidence}%`, sub: `${highConfidence} deals ≥ 75%`, delta: 'up' },
        { label: 'Deals At Risk', value: String(atRisk), sub: 'Confidence < 60%', delta: 'down' },
        { label: 'Model Accuracy', value: '91.4%', sub: 'Last 12 weeks', delta: 'neutral' },
        { label: 'Signals Fired (7d)', value: '284', sub: '+18% vs prior', delta: 'up' },
        { label: 'Intent Surges', value: '7', sub: 'Last 24h', delta: 'up' },
    ];

    // Confidence trend area data
    const predictedSeries = {
        label: 'Predicted',
        color: accent,
        data: CONFIDENCE_TREND.map(d => ({ x: d.week, value: d.predicted })),
    };
    const actualSeries = {
        label: 'Actual',
        color: '#3fb950',
        dashed: false,
        data: CONFIDENCE_TREND.map(d => ({ x: d.week, value: d.actual })),
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Top neural pulse bar */}
            <div style={{
                background: `linear-gradient(90deg, ${accent}18, transparent 60%)`,
                borderBottom: `1px solid ${accent}25`,
                padding: '8px 32px',
                display: 'flex', alignItems: 'center', gap: 20,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite', boxShadow: `0 0 8px ${accent}` }} />
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Engine Active</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                    {['7 intent surges detected', '3 champion engagements', '2 confidence drops flagged'].map(s => (
                        <span key={s} style={{ fontSize: '0.625rem', color: 'var(--text-secondary)' }}>● {s}</span>
                    ))}
                </div>
            </div>

            <div style={{ padding: '24px 32px', maxWidth: 1440, margin: '0 auto' }}>
                {/* KPIs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Neural Signal Command</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI confidence engine · Behavioral signals · Predictive intelligence</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['24h', '7d', '30d'] as const).map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '5px 12px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: period === p ? accent : 'transparent',
                                color: period === p ? 'white' : 'var(--text-secondary)',
                                border: `1px solid ${period === p ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{p}</button>
                        ))}
                    </div>
                </div>

                {/* KPI grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 24 }}>
                    {kpis.map((k, i) => (
                        <div key={k.label} style={{
                            background: i < 2 ? `${accent}08` : 'var(--bg-card)',
                            border: `1px solid ${i < 2 ? `${accent}30` : 'var(--border-card)'}`,
                            borderRadius: 8, padding: '12px 14px',
                            cursor: 'default', transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}50`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = i < 2 ? `${accent}30` : 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{k.label}</div>
                            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
                            <div style={{ fontSize: '0.5rem', color: k.delta === 'up' ? accent : k.delta === 'down' ? '#f85149' : 'var(--text-muted)', marginTop: 4 }}>{k.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Main asymmetric layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr 320px', gap: 16 }}>
                    {/* Color-coded deal sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {AI_DEALS.sort((a, b) => b.confidence - a.confidence).map(d => (
                            <div key={d.id} title={`${d.account}: ${d.confidence}%`} style={{
                                height: 52, borderRadius: 5,
                                background: `rgba(${d.confidence > 75 ? '167,139,250' : d.confidence > 55 ? '210,153,34' : '248,81,73'},${0.15 + (d.confidence / 100) * 0.3})`,
                                borderLeft: `3px solid rgba(${d.confidence > 75 ? '167,139,250' : d.confidence > 55 ? '210,153,34' : '248,81,73'},0.8)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'default', transition: 'transform 0.15s',
                                fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-primary)',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                                {d.confidence}%
                            </div>
                        ))}
                    </div>

                    {/* Center panel: Deal table + trend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Deal intelligence table */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Deal Intelligence</span>
                                <span style={{ fontSize: '0.5625rem', color: accent }}>Ranked by confidence</span>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        {['Account', 'Stage', 'Value', 'Confidence', 'Momentum', 'Signals', 'Risks'].map(h => (
                                            <th key={h} style={{ padding: '7px 12px', fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {AI_DEALS.sort((a, b) => b.confidence - a.confidence).map(d => {
                                        const confColor = d.confidence >= 75 ? accent : d.confidence >= 55 ? '#d29922' : '#f85149';
                                        return (
                                            <tr key={d.id} style={{ cursor: 'pointer', transition: 'background 0.1s', borderBottom: '1px solid var(--border-subtle)' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                                <td style={{ padding: '8px 12px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{d.account}</td>
                                                <td style={{ padding: '8px 12px', fontSize: '0.625rem', color: 'var(--text-secondary)' }}>{d.stage}</td>
                                                <td style={{ padding: '8px 12px', fontSize: '0.625rem', fontWeight: 600, color: accent }}>
                                                    ${(d.value / 1000).toFixed(0)}K
                                                </td>
                                                <td style={{ padding: '8px 12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                        <div style={{ width: 40, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                                            <div style={{ width: `${d.confidence}%`, height: '100%', background: confColor, borderRadius: 2 }} />
                                                        </div>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: confColor }}>{d.confidence}%</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '8px 12px', fontSize: '0.625rem', fontWeight: 700, color: momentumColor(d.momentum) }}>
                                                    {momentumIcon(d.momentum)} {d.momentum}
                                                </td>
                                                <td style={{ padding: '8px 12px' }}>
                                                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                                        {d.signals.slice(0, 2).map(s => (
                                                            <span key={s} style={{ fontSize: '0.4375rem', background: `${accent}15`, color: accent, padding: '1px 4px', borderRadius: 2, fontWeight: 600 }}>{s}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '8px 12px' }}>
                                                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                                        {d.risks.slice(0, 2).map(r => (
                                                            <span key={r} style={{ fontSize: '0.4375rem', background: '#f8514915', color: '#f85149', padding: '1px 4px', borderRadius: 2, fontWeight: 600 }}>{r}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Confidence trend chart */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '14px 16px' }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                                Confidence Trend — Predicted vs Actual (12w)
                            </div>
                            <AreaChart series={[predictedSeries, actualSeries]} height={150} />
                        </div>
                    </div>

                    {/* Right panel: Gauge + Behavioral heatmap + Activity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}25`, borderRadius: 8, padding: '14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, alignSelf: 'flex-start' }}>Intent Score Engine</div>
                            <GaugeChart value={avgConfidence} zones={GAUGE_ZONES} subLabel="Avg Confidence" size={160} accent={accent} />
                        </div>

                        {/* Behavioral heatmap mini */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '12px 14px' }}>
                            <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Buyer Signal Heatmap (5d)</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '2px 4px', fontSize: '0.4375rem', color: 'var(--text-muted)', textAlign: 'left' }}>Signal</th>
                                        {BEHAVIORAL_HEATMAP.cols.map(c => (
                                            <th key={c} style={{ padding: '2px 3px', fontSize: '0.4375rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {BEHAVIORAL_HEATMAP.rows.map((row, ri) => (
                                        <tr key={row}>
                                            <td style={{ padding: '2px 4px', fontSize: '0.5rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.split(' ')[0]}</td>
                                            {BEHAVIORAL_HEATMAP.values[ri].map((val, ci) => (
                                                <td key={ci} style={{ padding: '2px' }}>
                                                    <div style={{ height: 20, background: `rgba(167,139,250,${val * 0.9})`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '0.375rem', color: val > 0.5 ? 'var(--bg-primary)' : 'var(--text-muted)', fontWeight: 700 }}>
                                                            {Math.round(val * 100)}
                                                        </span>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* AI Activity snippet */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '12px 14px' }}>
                            <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>AI Signal Feed</div>
                            {AI_ACTIVITY.slice(0, 4).map(a => {
                                const delta = a.confDelta;
                                const dColor = delta > 0 ? '#3fb950' : '#f85149';
                                return (
                                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                                        <div>
                                            <div style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.type}</div>
                                            <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)' }}>{a.account} · {a.date}</div>
                                        </div>
                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: dColor }}>
                                            {delta > 0 ? '+' : ''}{delta}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
