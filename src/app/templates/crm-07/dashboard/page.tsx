'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import {
    BUYER_MATRIX, SENTIMENT_TREND, COMMITTEE_RADAR, REVENUE_PROJECTION, BEHAVIORAL_HEATMAP
} from '../data';
import { SentimentChart } from '@/components/charts/SentimentChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { GaugeChart } from '@/components/charts/GaugeChart';

const accent = '#8b5cf6';
const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#ef4444', label: 'Low' },
    { min: 40, max: 70, color: '#f59e0b', label: 'Medium' },
    { min: 70, max: 100, color: '#8b5cf6', label: 'High' },
];

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const lbl: React.CSSProperties = {
    fontSize: '0.6875rem', fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
};

function DashboardContent() {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [projectionMode, setProjectionMode] = useState<'ai' | 'unweighted'>('ai');
    const [dismissed, setDismissed] = useState(false);

    const aiSeries = {
        label: 'AI Confidence-Weighted',
        color: accent,
        data: REVENUE_PROJECTION[0].map(d => ({ x: d.month, value: d.value })),
        fillOpacity: 0.25,
    };
    const rawSeries = {
        label: 'Unweighted Pipeline',
        color: '#06b6d4',
        dashed: true,
        data: REVENUE_PROJECTION[1].map(d => ({ x: d.month, value: d.value })),
        fillOpacity: 0.1,
    };

    const kpis = [
        { label: 'Behavioral Engagement Index', value: '78.4', unit: '/ 100', sub: 'vs 71.2 last month', delta: 'up' },
        { label: 'Confidence-Weighted Revenue', value: '$214M', unit: '', sub: 'AI-adjusted projection', delta: 'up' },
        { label: 'Intent Momentum Score', value: '+12%', unit: '', sub: 'Rising trend (4wk)', delta: 'up' },
    ];
    const secondary = [
        { label: 'Buyer Intent Intensity', value: '71.2', unit: '/100' },
        { label: 'DM Penetration', value: '58%', unit: '' },
        { label: 'Emotional Sentiment', value: '+0.34', unit: '' },
        { label: 'Committee Cohesion', value: '6.8', unit: '/10' },
        { label: 'Behavioral Acceleration', value: '+0.18', unit: '' },
    ];

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Intent spike banner */}
            {!dismissed && (
                <div style={{
                    background: `${accent}18`, borderBottom: `1px solid ${accent}35`,
                    padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700, marginRight: 8 }}>⚡ INTENT SPIKE:</span>
                        Acme Corp +34% — 3 new committee members engaged in the last 48h
                    </span>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button
                            style={{ fontSize: '0.75rem', color: accent, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                            onClick={() => { }}>
                            View Account →
                        </button>
                        <button
                            onClick={() => setDismissed(true)}
                            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Neural status bar */}
            <div style={{
                background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)',
                padding: '8px 32px', fontFamily: 'monospace', fontSize: '0.6875rem',
                display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-muted)',
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#10b981',
                        boxShadow: '0 0 6px #10b981', display: 'inline-block',
                        animation: 'pulse 2s infinite',
                    }} />
                    <span style={{ color: accent, fontWeight: 700 }}>NEURAL MODEL ACTIVE</span>
                </span>
                <span>91.2% accuracy</span>
                <span>4,821 signals/day</span>
                <span style={{ color: '#f59e0b' }}>Behavioral drift: 0.04</span>
                <span>Last update: 1h 22m ago</span>
            </div>

            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Behavioral Intelligence Overview
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                            Buyer psychology · Sentiment intelligence · Confidence-weighted outcomes
                        </p>
                    </div>
                    {/* Neural Pulse */}
                    <div style={{ textAlign: 'center', opacity: 0.8 }}>
                        <svg width={60} height={60} viewBox="0 0 60 60">
                            <circle cx={30} cy={30} r={6} fill={accent} opacity={0.9} />
                            <circle cx={30} cy={30} r={14} fill="none" stroke={accent} strokeWidth={1} opacity={0.25} />
                            <circle cx={30} cy={30} r={22} fill="none" stroke={accent} strokeWidth={0.75} opacity={0.12} />
                            <circle cx={30} cy={30} r={29} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.06} />
                        </svg>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: -4 }}>
                            847 signals/min
                        </div>
                    </div>
                </div>

                {/* Hero KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 14 }}>
                    {kpis.map(k => (
                        <div key={k.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = `${accent}50`;
                                el.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = 'var(--border-card)';
                                el.style.transform = 'none';
                            }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                                {k.label}
                            </div>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                {k.value}<span style={{ fontSize: '1rem', opacity: 0.6, marginLeft: 2 }}>{k.unit}</span>
                            </div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ color: k.delta === 'up' ? '#10b981' : '#ef4444' }}>{k.delta === 'up' ? '↑' : '↓'}</span>
                                {k.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 20 }}>
                    {secondary.map(s => (
                        <div key={s.label} style={{ ...card, padding: '12px 14px', cursor: 'default', transition: 'all 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}35`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}<span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 2 }}>{s.unit}</span></div>
                        </div>
                    ))}
                </div>

                {/* Charts row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Behavioral signal heatmap */}
                    <div style={card}>
                        <div style={lbl}>Buyer Intent Intensity — Account × Time (30d)</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {BEHAVIORAL_HEATMAP.slice(0, 8).map(row => (
                                <div key={row.account} style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', width: 80, flexShrink: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                        {row.account}
                                    </div>
                                    <div style={{ display: 'flex', gap: 1, flex: 1 }}>
                                        {row.days.map((v, i) => (
                                            <div key={i} title={`${row.account} Day ${i + 1}: ${v}`}
                                                style={{
                                                    flex: 1, height: 14, borderRadius: 1,
                                                    background: v >= 70
                                                        ? `rgba(139,92,246,${0.4 + v / 100 * 0.6})`
                                                        : v >= 40
                                                            ? `rgba(245,158,11,${0.2 + v / 100 * 0.5})`
                                                            : `rgba(100,100,120,${0.15 + v / 100 * 0.25})`,
                                                    cursor: 'crosshair',
                                                }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                            {[{ label: 'High Intent', c: '#8b5cf6' }, { label: 'Medium', c: '#f59e0b' }, { label: 'Low', c: '#6b7280' }].map(l => (
                                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 10, height: 8, borderRadius: 1, background: l.c }} />
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sentiment trend */}
                    <div style={card}>
                        <div style={lbl}>Pipeline Emotional Sentiment Trend (90d)</div>
                        <SentimentChart
                            data={SENTIMENT_TREND}
                            positiveColor="#10b981"
                            negativeColor="#ef4444"
                            accent={accent}
                            height={200}
                        />
                    </div>
                </div>

                {/* Charts row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Radar chart placeholder — buying committee */}
                    <div style={card}>
                        <div style={lbl}>Buying Committee Intelligence Profile</div>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                            {COMMITTEE_RADAR.deals.map(d => (
                                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{d.label}</span>
                                </div>
                            ))}
                        </div>
                        {/* SVG radar chart */}
                        <svg width={280} height={200} style={{ width: '100%', height: 'auto' }}>
                            {(() => {
                                const cx = 140, cy = 100, r = 80;
                                const axes = COMMITTEE_RADAR.axes;
                                const n = axes.length;
                                return (
                                    <>
                                        {[0.25, 0.5, 0.75, 1.0].map(ring => (
                                            <polygon key={ring}
                                                points={axes.map((_, i) => {
                                                    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
                                                    return `${cx + Math.cos(angle) * r * ring},${cy + Math.sin(angle) * r * ring}`;
                                                }).join(' ')}
                                                fill="none"
                                                stroke="rgba(139,92,246,0.12)"
                                                strokeWidth={1}
                                            />
                                        ))}
                                        {axes.map((ax, i) => {
                                            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
                                            const lx = cx + Math.cos(angle) * (r + 18);
                                            const ly = cy + Math.sin(angle) * (r + 18);
                                            return (
                                                <g key={ax}>
                                                    <line x1={cx} y1={cy} x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r}
                                                        stroke="rgba(139,92,246,0.15)" strokeWidth={1} />
                                                    <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                                                        fontSize={7.5} fill="rgba(167,139,250,0.6)" fontFamily="Inter, sans-serif">{ax}</text>
                                                </g>
                                            );
                                        })}
                                        {COMMITTEE_RADAR.deals.map(deal => (
                                            <polygon key={deal.label}
                                                points={deal.values.map((v, i) => {
                                                    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
                                                    return `${cx + Math.cos(angle) * r * v / 100},${cy + Math.sin(angle) * r * v / 100}`;
                                                }).join(' ')}
                                                fill={`${deal.color}20`}
                                                stroke={deal.color}
                                                strokeWidth={1.5}
                                            />
                                        ))}
                                    </>
                                );
                            })()}
                        </svg>
                    </div>

                    {/* Revenue projection area chart */}
                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={lbl}>Predictive Outcome Layer — Revenue Projection</div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {(['ai', 'unweighted'] as const).map(mode => (
                                    <button key={mode} onClick={() => setProjectionMode(mode)} style={{
                                        padding: '4px 10px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600,
                                        cursor: 'pointer',
                                        background: projectionMode === mode ? accent : 'transparent',
                                        color: projectionMode === mode ? '#fff' : 'var(--text-muted)',
                                        border: `1px solid ${projectionMode === mode ? accent : 'var(--border-card)'}`,
                                        transition: 'all 0.15s',
                                    }}>
                                        {mode === 'ai' ? 'AI Projection' : 'Unweighted'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <AreaChart
                            series={projectionMode === 'ai' ? [aiSeries] : [rawSeries, aiSeries]}
                            height={170}
                        />
                    </div>
                </div>

                {/* Buyer Intelligence Matrix */}
                <div style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div style={lbl}>Buyer Intelligence Matrix</div>
                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>Click any row to see prediction explanation →</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Account', 'Intent Index', 'Sentiment Avg', 'Behavioral Risk', 'Engagement', 'AI Action', 'Confidence'].map(h => (
                                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {BUYER_MATRIX.map(row => {
                                    const isExpanded = expandedRow === row.account;
                                    const sentColor = row.sentiment > 0.2 ? '#10b981' : row.sentiment < -0.2 ? '#ef4444' : '#6b7280';
                                    const intentColor = row.intent >= 70 ? '#10b981' : row.intent >= 40 ? '#f59e0b' : '#ef4444';
                                    return (
                                        <>
                                            <tr key={row.account}
                                                onClick={() => setExpandedRow(isExpanded ? null : row.account)}
                                                style={{
                                                    borderTop: '1px solid var(--border-subtle)',
                                                    cursor: 'pointer',
                                                    background: isExpanded ? `${accent}08` : 'transparent',
                                                    transition: 'background 0.15s',
                                                }}
                                                onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'; }}
                                                onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                                <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.account}</td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <div style={{ width: 28, height: 5, background: 'var(--border-subtle)', borderRadius: 3 }}>
                                                            <div style={{ width: `${row.intent}%`, height: '100%', background: intentColor, borderRadius: 3 }} />
                                                        </div>
                                                        <span style={{ color: intentColor, fontWeight: 700 }}>{row.intent}</span>
                                                        {row.intentDelta > 10 && (
                                                            <span style={{ fontSize: '0.5rem', background: '#10b98118', color: '#10b981', padding: '1px 4px', borderRadius: 3, fontWeight: 700 }}>↑{row.intentDelta}%</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px 12px', background: row.sentiment < -0.2 ? '#ef444412' : 'transparent' }}>
                                                    <span style={{ fontWeight: 700, color: sentColor }}>
                                                        {row.sentiment > 0 ? '+' : ''}{row.sentiment.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{ color: row.risk > 60 ? '#f59e0b' : row.risk > 40 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>{row.risk}%</span>
                                                </td>
                                                <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.engagement}/10</td>
                                                <td style={{ padding: '10px 12px', fontStyle: 'italic', color: accent }}>{row.action}</td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{ background: `${accent}18`, color: accent, padding: '2px 8px', borderRadius: 10, fontWeight: 700, fontSize: '0.625rem' }}>
                                                        {row.confidence}%
                                                    </span>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr key={`${row.account}-drawer`} style={{ background: `${accent}06`, borderTop: `1px solid ${accent}20` }}>
                                                    <td colSpan={7} style={{ padding: '14px 24px' }}>
                                                        <div style={{ fontSize: '0.625rem', color: accent, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                                                            Explain Prediction — Feature Contributions (SHAP)
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                            {[
                                                                { feature: 'Engagement Depth', value: 28, pos: true },
                                                                { feature: 'Sentiment Score', value: -15, pos: false },
                                                                { feature: 'Committee Size', value: 19, pos: true },
                                                            ].map(f => (
                                                                <div key={f.feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                                    <div style={{ width: 120, fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{f.feature}</div>
                                                                    <div style={{ flex: 1, height: 6, background: 'var(--border-subtle)', borderRadius: 3, position: 'relative' }}>
                                                                        <div style={{
                                                                            position: 'absolute',
                                                                            left: f.pos ? '50%' : `${50 - Math.abs(f.value) / 2}%`,
                                                                            width: `${Math.abs(f.value) / 2}%`,
                                                                            height: '100%',
                                                                            background: f.pos ? '#10b981' : '#ef4444',
                                                                            borderRadius: 3,
                                                                        }} />
                                                                    </div>
                                                                    <div style={{ width: 40, textAlign: 'right', fontWeight: 700, fontSize: '0.5625rem', color: f.pos ? '#10b981' : '#ef4444' }}>
                                                                        {f.pos ? '+' : ''}{f.value}%
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
