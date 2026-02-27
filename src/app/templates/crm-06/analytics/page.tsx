'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { AreaChart } from '@/components/charts/AreaChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { BEHAVIORAL_HEATMAP, SIGNAL_ATTRIBUTION, CONFIDENCE_TREND, AI_DEALS } from '../data';

const accent = '#a78bfa';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

function AnalyticsContent() {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

    const heroMetrics = [
        { label: 'Model Precision', value: '91.4%', sub: '12-week cohort' },
        { label: 'Signal Accuracy Rate', value: '88.7%', sub: 'vs closed deals' },
        { label: 'Avg Intent Delta/wk', value: '+4.2', sub: 'Active portfolio' },
    ];

    const funnelStages = [
        { label: 'Qualified', count: 48, pct: 100 },
        { label: 'Discovery', count: 38, pct: 79 },
        { label: 'Demo', count: 27, pct: 71 },
        { label: 'Proposal', count: 18, pct: 67 },
        { label: 'Negotiation', count: 11, pct: 61 },
        { label: 'Won', count: 8, pct: 73 },
    ];

    const predictedSeries = {
        label: 'Predicted', color: accent,
        data: CONFIDENCE_TREND.map(d => ({ x: d.week, value: d.predicted })),
    };
    const actualSeries = {
        label: 'Actual', color: '#3fb950',
        data: CONFIDENCE_TREND.map(d => ({ x: d.week, value: d.actual })),
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Behavioral Intelligence Lab</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Model accuracy · Signal attribution · Behavioral cohorts</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['7d', '30d', '90d'] as const).map(p => (
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

                {/* Hero metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                    {heroMetrics.map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Confidence model chart */}
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Confidence Model — Predicted vs Actual (12w)
                        </div>
                        <AreaChart series={[predictedSeries, actualSeries]} height={200} />
                        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                <div style={{ width: 10, height: 2, background: accent }} />
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>Predicted</span>
                            </div>
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                <div style={{ width: 10, height: 2, background: '#3fb950' }} />
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>Actual</span>
                            </div>
                        </div>
                    </div>

                    {/* Confidence distribution */}
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                            Portfolio Confidence Distribution
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {AI_DEALS.sort((a, b) => b.confidence - a.confidence).map(d => {
                                const color = d.confidence >= 75 ? accent : d.confidence >= 55 ? '#d29922' : '#f85149';
                                return (
                                    <div key={d.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{d.account}</span>
                                            <span style={{ fontSize: '0.625rem', color, fontWeight: 700 }}>{d.confidence}%</span>
                                        </div>
                                        <div style={{ height: 6, background: 'var(--border-subtle)', borderRadius: 3 }}>
                                            <div style={{ width: `${d.confidence}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.4s' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Signal attribution heatmap */}
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Signal Attribution by Source × Stage
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Source</th>
                                    {SIGNAL_ATTRIBUTION.cols.map(c => (
                                        <th key={c} style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {SIGNAL_ATTRIBUTION.rows.map((row, ri) => (
                                    <tr key={row}>
                                        <td style={{ padding: '4px 8px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                        {SIGNAL_ATTRIBUTION.values[ri].map((val, ci) => (
                                            <td key={ci} style={{ padding: '3px 4px' }}>
                                                <div style={{ height: 30, background: `rgba(167,139,250,${val * 0.9})`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: val > 0.5 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>
                                                        {Math.round(val * 100)}%
                                                    </span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Behavioral heatmap */}
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Buyer Behavioral Heatmap (5-Day)
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Signal</th>
                                    {BEHAVIORAL_HEATMAP.cols.map(c => (
                                        <th key={c} style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {BEHAVIORAL_HEATMAP.rows.map((row, ri) => (
                                    <tr key={row}>
                                        <td style={{ padding: '4px 8px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                        {BEHAVIORAL_HEATMAP.values[ri].map((val, ci) => (
                                            <td key={ci} style={{ padding: '3px 4px' }}>
                                                <div style={{ height: 30, background: `rgba(167,139,250,${val * 0.9})`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: val > 0.5 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>
                                                        {Math.round(val * 100)}%
                                                    </span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Analytics06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <AnalyticsContent />
        </CrmLayout>
    );
}
