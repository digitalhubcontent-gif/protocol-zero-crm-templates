'use client';

import React, { useState, useMemo } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { STAGE_INTENT_BUBBLES, COMMITTEE_DEPTH, BUYER_MATRIX } from '../data';

const accent = '#8b5cf6';

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

function PipelineContent() {
    const [intentFilter, setIntentFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
    const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Positive' | 'Neutral' | 'Negative'>('All');

    const filteredMatrix = useMemo(() => BUYER_MATRIX.filter(row => {
        if (intentFilter === 'High' && row.intent < 70) return false;
        if (intentFilter === 'Medium' && (row.intent < 40 || row.intent >= 70)) return false;
        if (intentFilter === 'Low' && row.intent >= 40) return false;
        if (sentimentFilter === 'Positive' && row.sentiment <= 0.2) return false;
        if (sentimentFilter === 'Neutral' && Math.abs(row.sentiment) > 0.2) return false;
        if (sentimentFilter === 'Negative' && row.sentiment >= -0.2) return false;
        return true;
    }), [intentFilter, sentimentFilter]);

    const phases = ['Awareness', 'Discovery', 'Evaluation', 'Decision', 'Closed'];
    const sentimentColor = (s: string) => s === 'positive' ? '#10b981' : s === 'negative' ? '#ef4444' : '#6b7280';
    const phasePct = (phase: string) => {
        const phaseIdx = phases.indexOf(phase);
        return (phaseIdx / (phases.length - 1)) * 100;
    };

    const metrics = [
        { label: 'High-Intent Deals (>70)', value: '38%', sub: 'Of total pipeline', color: accent },
        { label: 'Behavioral Risk Assets', value: '24', sub: 'Risk score >50%', color: '#f59e0b' },
        { label: 'Avg Confidence Weight', value: '61%', sub: 'Across all phases', color: '#10b981' },
    ];

    const maxCommittee = Math.max(...COMMITTEE_DEPTH.map(c => c.count));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Psychology-Weighted Opportunity Board
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        Intent signals · Behavioral phases · Risk distribution
                    </p>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
                    {metrics.map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}45`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Filter bar */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter:</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {(['All', 'High', 'Medium', 'Low'] as const).map(f => (
                            <button key={f} onClick={() => setIntentFilter(f)} style={{
                                padding: '4px 10px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer',
                                background: intentFilter === f ? accent : 'var(--bg-card)',
                                color: intentFilter === f ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${intentFilter === f ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{f} Intent</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {(['All', 'Positive', 'Neutral', 'Negative'] as const).map(f => (
                            <button key={f} onClick={() => setSentimentFilter(f)} style={{
                                padding: '4px 10px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer',
                                background: sentimentFilter === f ? '#06b6d4' : 'var(--bg-card)',
                                color: sentimentFilter === f ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${sentimentFilter === f ? '#06b6d4' : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{f} Sentiment</button>
                        ))}
                    </div>
                </div>

                {/* Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Stage × Intent bubble chart */}
                    <div style={card}>
                        <div style={lbl}>Behavioral Phase × Intent Concentration</div>
                        <svg width={400} height={200} style={{ width: '100%', height: 'auto' }}>
                            {phases.map((phase, pi) => {
                                const x = 40 + (pi / (phases.length - 1)) * 320;
                                return (
                                    <g key={phase}>
                                        <line x1={x} y1={10} x2={x} y2={175} stroke="var(--border-subtle)" strokeWidth={1} strokeDasharray="3 3" />
                                        <text x={x} y={190} textAnchor="middle" fontSize={7.5} fill="var(--text-muted)" fontFamily="Inter, sans-serif">{phase}</text>
                                    </g>
                                );
                            })}
                            {[0, 25, 50, 75, 100].map(v => {
                                const y = 10 + (1 - v / 100) * 165;
                                return (
                                    <g key={v}>
                                        <line x1={20} y1={y} x2={360} y2={y} stroke="var(--border-subtle)" strokeWidth={0.5} />
                                        <text x={16} y={y + 3} textAnchor="end" fontSize={7} fill="var(--text-muted)" fontFamily="monospace">{v}</text>
                                    </g>
                                );
                            })}
                            {STAGE_INTENT_BUBBLES.map((b, i) => {
                                const phaseIdx = phases.indexOf(b.phase);
                                if (phaseIdx === -1) return null;
                                const x = 40 + (phaseIdx / (phases.length - 1)) * 320 + (Math.sin(i * 1.8) * 14);
                                const y = 10 + (1 - b.intent / 100) * 165;
                                const r = 3 + b.arr * 1.2;
                                return (
                                    <circle key={i} cx={x} cy={y} r={r}
                                        fill={`${sentimentColor(b.sentiment)}60`}
                                        stroke={sentimentColor(b.sentiment)}
                                        strokeWidth={1.5}
                                        style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('fill', sentimentColor(b.sentiment)); }}
                                        onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('fill', `${sentimentColor(b.sentiment)}60`); }}>
                                        <title>{b.phase} · Intent {b.intent} · ${b.arr}M ARR · {b.sentiment}</title>
                                    </circle>
                                );
                            })}
                        </svg>
                        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                            {[['Positive', '#10b981'], ['Neutral', '#6b7280'], ['Negative', '#ef4444']].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Committee depth histogram */}
                    <div style={card}>
                        <div style={lbl}>Buying Committee Depth Distribution</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130, marginBottom: 8 }}>
                            {COMMITTEE_DEPTH.map(c => (
                                <div key={c.size} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{c.count}</span>
                                    <div
                                        title={`${c.size}: ${c.count} deals`}
                                        style={{
                                            width: '100%',
                                            background: c.size === '3 members' ? accent : `${accent}55`,
                                            borderRadius: '3px 3px 0 0',
                                            height: `${c.count / maxCommittee * 100}%`,
                                            minHeight: 4,
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.8'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {COMMITTEE_DEPTH.map(c => (
                                <span key={c.size} style={{ fontSize: '0.4rem', color: 'var(--text-muted)', flex: 1, textAlign: 'center' }}>{c.size.replace(' members', '').replace(' member', '')}</span>
                            ))}
                        </div>
                        <div style={{ marginTop: 8, fontSize: '0.5625rem', color: 'var(--text-muted)' }}>
                            Benchmark (won deals): <span style={{ color: accent, fontWeight: 700 }}>3–4 members avg</span>
                        </div>
                    </div>
                </div>

                {/* Deal list */}
                <div style={card}>
                    <div style={lbl}>Behavioral Asset Registry ({filteredMatrix.length} deals)</div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Account', 'Intent Index', 'Sentiment', 'Behavioral Risk', 'Engagement', 'AI Recommended Action', 'Confidence Weight'].map(h => (
                                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMatrix.map(row => {
                                    const sentColor = row.sentiment > 0.2 ? '#10b981' : row.sentiment < -0.2 ? '#ef4444' : '#6b7280';
                                    const intentColor = row.intent >= 70 ? '#10b981' : row.intent >= 40 ? '#f59e0b' : '#ef4444';
                                    return (
                                        <tr key={row.account}
                                            style={{ borderTop: '1px solid var(--border-subtle)', transition: 'background 0.15s', cursor: 'pointer' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.account}</td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 32, height: 5, background: 'var(--border-subtle)', borderRadius: 3 }}>
                                                        <div style={{ width: `${row.intent}%`, height: '100%', background: intentColor, borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ color: intentColor, fontWeight: 700 }}>{row.intent}</span>
                                                    {row.intentDelta > 10 && <span style={{ fontSize: '0.45rem', background: '#10b98115', color: '#10b981', padding: '1px 4px', borderRadius: 3 }}>↑{row.intentDelta}%</span>}
                                                </div>
                                            </td>
                                            <td style={{ padding: '10px 12px', background: row.sentiment < -0.2 ? '#ef444410' : 'transparent' }}>
                                                <span style={{ color: sentColor, fontWeight: 700 }}>{row.sentiment > 0 ? '+' : ''}{row.sentiment.toFixed(2)}</span>
                                            </td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <span style={{ color: row.risk > 50 ? '#ef4444' : row.risk > 30 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>{row.risk}%</span>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.engagement}/10</td>
                                            <td style={{ padding: '10px 12px', fontStyle: 'italic', color: accent }}>{row.action}</td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <span style={{ background: `${accent}18`, color: accent, padding: '2px 8px', borderRadius: 10, fontWeight: 700, fontSize: '0.625rem' }}>{row.confidence}%</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredMatrix.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                No behavioral assets match the selected filters
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pipeline07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <PipelineContent />
        </CrmLayout>
    );
}
