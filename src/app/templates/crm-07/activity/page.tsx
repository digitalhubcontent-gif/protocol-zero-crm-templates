'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SentimentChart } from '@/components/charts/SentimentChart';
import { INTERACTION_FREQUENCY, INTENT_SCATTER, SENTIMENT_TREND } from '../data';

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

const ACTIVITY_FEED = [
    { time: '3m ago', account: 'Acme Corp', event: 'Intent spike detected (+34%) — 3 new committee members', type: 'spike', sentiment: 0.42, color: accent },
    { time: '18m ago', account: 'Pied Piper', event: 'Meeting completed — Sentiment improved to +0.55', type: 'meeting', sentiment: 0.55, color: '#10b981' },
    { time: '1h ago', account: 'Umbrella Ltd', event: 'New contact identified — Drew Chen (IT Director) engaged', type: 'contact', sentiment: 0.28, color: '#06b6d4' },
    { time: '2h ago', account: 'Globex Inc', event: 'Behavioral drift alert — Sentiment moved -0.22 since Monday', type: 'risk', sentiment: -0.22, color: '#ef4444' },
    { time: '3h ago', account: 'Initech', event: 'Executive sponsor finally engaged — Email opened 4×', type: 'engagement', sentiment: 0.12, color: '#f59e0b' },
    { time: '5h ago', account: 'Sterling Cooper', event: '⚠ Critical risk: 7-day silence — Confidence < 35%', type: 'risk', sentiment: -0.45, color: '#ef4444' },
    { time: '6h ago', account: 'Vandelay Ind', event: 'Demo scheduled — 4 attendees confirmed', type: 'meeting', sentiment: 0.24, color: '#10b981' },
    { time: '8h ago', account: 'Soylent Systems', event: 'ICP score re-calculated: 71 → 48 (strategy mismatch)', type: 'update', sentiment: 0.05, color: '#6b7280' },
];

function ActivityContent() {
    const [view, setView] = useState<'feed' | 'correlation'>('feed');

    const maxInteraction = Math.max(...INTERACTION_FREQUENCY.map(w => w.all));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Behavioral Signal Activity Stream
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                            Intent spikes · Sentiment shifts · Engagement correlation
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['feed', 'correlation'] as const).map(v => (
                            <button key={v} onClick={() => setView(v)} style={{
                                padding: '6px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: view === v ? accent : 'transparent',
                                color: view === v ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${view === v ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{v === 'feed' ? 'Signal Feed' : 'Correlation View'}</button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Interaction frequency chart */}
                    <div style={card}>
                        <div style={lbl}>Engagement Volume vs Quality (8 weeks)</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
                            {INTERACTION_FREQUENCY.map(w => (
                                <div key={w.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
                                    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                                        <div style={{ width: '100%', background: `${accent}30`, borderRadius: '2px 2px 0 0', height: `${w.all / maxInteraction * 100}%`, position: 'absolute', bottom: 0 }} />
                                        <div style={{ width: '60%', background: accent, borderRadius: '2px 2px 0 0', height: `${w.quality / maxInteraction * 100}%`, position: 'absolute', bottom: 0 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                            {INTERACTION_FREQUENCY.map(w => (
                                <span key={w.week} style={{ fontSize: '0.45rem', color: 'var(--text-muted)', flex: 1, textAlign: 'center' }}>{w.week}</span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                            {[['All Interactions', `${accent}30`], ['Quality Signals', accent]].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 10, height: 8, borderRadius: 1, background: c }} />
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sentiment trend */}
                    <div style={card}>
                        <div style={lbl}>Emotional Sentiment — Recent 30 Days</div>
                        <SentimentChart
                            data={SENTIMENT_TREND.slice(60, 90)}
                            accent={accent}
                            positiveColor="#10b981"
                            negativeColor="#ef4444"
                            height={145}
                        />
                    </div>
                </div>

                {/* Intent-Interaction Correlation scatter */}
                <div style={{ ...card, marginBottom: 20 }}>
                    <div style={lbl}>Interaction Frequency vs Intent Score Correlation</div>
                    <svg width={800} height={220} style={{ width: '100%', height: 'auto' }}>
                        {/* Grid */}
                        {[0, 25, 50, 75, 100].map(v => {
                            const y = 10 + (1 - v / 100) * 180;
                            return (
                                <g key={v}>
                                    <line x1={30} y1={y} x2={790} y2={y} stroke="var(--border-subtle)" strokeWidth={0.6} />
                                    <text x={25} y={y + 3} textAnchor="end" fontSize={6.5} fill="var(--text-muted)" fontFamily="monospace">{v}%</text>
                                </g>
                            );
                        })}
                        {/* Trend line */}
                        <line x1={40} y1={170} x2={780} y2={30} stroke={`${accent}40`} strokeWidth={1.5} strokeDasharray="5 3" />
                        {/* Dots */}
                        {INTENT_SCATTER.map((d, i) => {
                            const x = 40 + (d.interactions / 30) * 730;
                            const y = 10 + (1 - d.intentDelta / 60) * 180;
                            const r = 3 + d.arr * 0.8;
                            return (
                                <circle key={i} cx={x} cy={y} r={r}
                                    fill={`${accent}45`} stroke={accent} strokeWidth={1.2}
                                    style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                                    onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('fill', accent); }}
                                    onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('fill', `${accent}45`); }}>
                                    <title>Interactions: {d.interactions} · Intent Δ: +{d.intentDelta}% · ARR: ${d.arr.toFixed(1)}M</title>
                                </circle>
                            );
                        })}
                        <text x={40} y={215} fontSize={8} fill="var(--text-muted)" fontFamily="Inter">← Fewer interactions</text>
                        <text x={700} y={215} fontSize={8} fill="var(--text-muted)" fontFamily="Inter">More interactions →</text>
                    </svg>
                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginTop: 6 }}>
                        Pearson correlation: <span style={{ color: accent, fontWeight: 700 }}>r = 0.71</span> — strong positive relationship between interaction frequency and intent Δ
                    </div>
                </div>

                {/* Live activity feed */}
                <div style={card}>
                    <div style={lbl}>Live Behavioral Signal Feed</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {ACTIVITY_FEED.map((a, i) => (
                            <div key={i}
                                style={{
                                    padding: '12px 16px', borderLeft: `3px solid ${a.color}`,
                                    borderBottom: i < ACTIVITY_FEED.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                    background: a.type === 'risk' ? `${a.color}06` : 'transparent',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    cursor: 'pointer', transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${a.color}10`}
                                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = a.type === 'risk' ? `${a.color}06` : 'transparent'}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                                        <span style={{ fontSize: '0.625rem', fontWeight: 700, color: a.color }}>{a.account}</span>
                                        <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{a.time}</span>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{a.event}</div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: a.sentiment > 0.2 ? '#10b981' : a.sentiment < -0.2 ? '#ef4444' : '#6b7280' }}>
                                        {a.sentiment > 0 ? '+' : ''}{a.sentiment.toFixed(2)}
                                    </div>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>sentiment</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Activity07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <ActivityContent />
        </CrmLayout>
    );
}
