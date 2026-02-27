'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { INTENT_SURGE_TIMELINE, PLG_TIMELINE } from '../data';

const accent = '#06b6d4';
const surge = '#f59e0b';

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

const LIVE_SIGNALS = [
    { time: '2m ago', account: 'Stark Industries', event: 'Trial expanded: 3 new seats added — product-led growth', type: 'plg', score: 92, color: '#22c55e' },
    { time: '11m ago', account: 'LexCorp', event: 'G2 category page viewed 3× in 24h — high-intent research signal', type: 'intent', score: 78, color: accent },
    { time: '34m ago', account: 'Oscorp', event: '⚡ Surge: Bombora topic score +34 in "Revenue Intelligence" category', type: 'surge', score: 86, color: surge },
    { time: '1h ago', account: 'Wayne Enterprises', event: 'Primary contact: no signal for 12 days — decay alert', type: 'decay', score: 31, color: '#ef4444' },
    { time: '2h ago', account: 'Acme Corp', event: 'Demo completed — 5 attendees, pricing questions raised', type: 'demo', score: 88, color: '#8b5cf6' },
    { time: '3h ago', account: 'Weyland-Yutani', event: 'New ICP-fit contact via LinkedIn: CISO engaged with case study', type: 'contact', score: 57, color: '#06b6d4' },
    { time: '5h ago', account: 'Umbrella Corp', event: 'Competitor mention detected — deal risk elevated', type: 'risk', score: 29, color: '#ef4444' },
];

const EVENT_ICONS: Record<string, string> = {
    plg: '🚀', intent: '📡', surge: '⚡', decay: '📉', demo: '📹', contact: '👥', risk: '⚠️',
};

function ActivityContent() {
    const [view, setView] = useState<'live' | 'timeline'>('live');

    const recent = INTENT_SURGE_TIMELINE.slice(-14);
    const maxSig = Math.max(...recent.map(d => d.signals));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Signal Activity Stream
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                            Live signals · PLG events · Surge alerts · Decay watchdog
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['live', 'timeline'] as const).map(v => (
                            <button key={v} onClick={() => setView(v)} style={{
                                padding: '6px 16px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: view === v ? accent : 'transparent',
                                color: view === v ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${view === v ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{v === 'live' ? '📡 Live Feed' : '📊 Timeline'}</button>
                        ))}
                    </div>
                </div>

                {/* Summary stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Signals (24h)', value: '4,821', color: accent },
                        { label: 'New Surges', value: '7', color: surge },
                        { label: 'PLG Events', value: '34', color: '#22c55e' },
                        { label: 'Decay Alerts', value: '12', color: '#ef4444' },
                    ].map(s => (
                        <div key={s.label} style={{ ...card, cursor: 'default' }}>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{s.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {view === 'live' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                        <div style={card}>
                            <div style={lbl}>Live Signal Intelligence Feed</div>
                            {LIVE_SIGNALS.map((s, i) => (
                                <div key={i}
                                    style={{
                                        padding: '12px 14px',
                                        borderLeft: `3px solid ${s.color}`,
                                        borderBottom: i < LIVE_SIGNALS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        background: s.type === 'surge' ? `${s.color}06` : s.type === 'risk' ? `${s.color}06` : 'transparent',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        cursor: 'pointer', transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${s.color}10`}
                                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = s.type === 'surge' || s.type === 'risk' ? `${s.color}06` : 'transparent'}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                                            <span style={{ fontSize: '0.875rem' }}>{EVENT_ICONS[s.type]}</span>
                                            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: s.color }}>{s.account}</span>
                                            <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{s.time}</span>
                                        </div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.event}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: s.score >= 70 ? '#22c55e' : s.score >= 50 ? accent : '#ef4444' }}>{s.score}</div>
                                        <div style={{ fontSize: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>signal strength</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* PLG timeline */}
                        <div style={card}>
                            <div style={lbl}>PLG Activity Timeline</div>
                            {PLG_TIMELINE.map((e, i) => (
                                <div key={i} style={{ padding: '10px 0', borderBottom: i < PLG_TIMELINE.length - 1 ? '1px solid var(--border-subtle)' : 'none', display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', transition: 'background 0.15s' }}>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${e.color}20`, border: `1.5px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.625rem' }}>
                                        {EVENT_ICONS[e.type] || '📌'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: e.color, marginBottom: 1 }}>{e.account}</div>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e.event}</div>
                                        <div style={{ fontSize: '0.4rem', color: 'var(--text-muted)', marginTop: 2 }}>{e.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={card}>
                        <div style={lbl}>Signal Volume Timeline — Last 14 Days</div>
                        <svg width={900} height={220} style={{ width: '100%', height: 'auto' }}>
                            {[0, 0.25, 0.5, 0.75, 1].map(v => {
                                const y = 10 + (1 - v) * 180;
                                return (
                                    <g key={v}>
                                        <line x1={50} y1={y} x2={890} y2={y} stroke="var(--border-subtle)" strokeWidth={0.6} />
                                        <text x={45} y={y + 3} textAnchor="end" fontSize={7} fill="var(--text-muted)" fontFamily="monospace">{Math.round(v * maxSig)}</text>
                                    </g>
                                );
                            })}
                            <polygon
                                points={[
                                    ...recent.map((d, i) => { const x = 55 + (i / (recent.length - 1)) * 830; const y = 10 + (1 - d.signals / maxSig) * 180; return `${x},${y}`; }),
                                    `${55 + 830},${190}`, `55,${190}`,
                                ].join(' ')}
                                fill={`${accent}12`}
                            />
                            <polyline
                                points={recent.map((d, i) => { const x = 55 + (i / (recent.length - 1)) * 830; const y = 10 + (1 - d.signals / maxSig) * 180; return `${x},${y}`; }).join(' ')}
                                fill="none" stroke={accent} strokeWidth={2}
                            />
                            {recent.map((d, i) => {
                                const x = 55 + (i / (recent.length - 1)) * 830;
                                const y = 10 + (1 - d.signals / maxSig) * 180;
                                return d.surge ? (
                                    <g key={i}>
                                        <circle cx={x} cy={y} r={6} fill={surge} opacity={0.9}><title>{d.surge}</title></circle>
                                        <text x={x} y={y - 10} textAnchor="middle" fontSize={7} fill={surge}>{d.surge}</text>
                                    </g>
                                ) : (
                                    <circle key={i} cx={x} cy={y} r={3} fill={accent} />
                                );
                            })}
                            {recent.map((d, i) => {
                                const x = 55 + (i / (recent.length - 1)) * 830;
                                return <text key={i} x={x} y={210} textAnchor="middle" fontSize={7} fill="var(--text-muted)" fontFamily="monospace">D{i + 1}</text>;
                            })}
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Activity08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <ActivityContent />
        </CrmLayout>
    );
}
