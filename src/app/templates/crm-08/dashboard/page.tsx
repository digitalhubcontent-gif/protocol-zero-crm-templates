'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { DecayCurveChart } from '@/components/charts/DecayCurveChart';
import {
    INTENT_SURGE_TIMELINE, ICP_DISTRIBUTION, PLG_FUNNEL,
    SIGNAL_TABLE, SIGNAL_DECAY, CHANNEL_DONUT, PLG_TIMELINE
} from '../data';

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

const icpColor = (tier: string) =>
    tier === 'high' ? '#22c55e' : tier === 'medium' ? accent : '#6b7280';

function DashboardContent() {
    const [dismissed, setDismissed] = useState(false);

    const kpis = [
        { label: 'Signal Intelligence Score', value: '88', unit: '/100', sub: 'Real-time composite', color: accent, delta: 'up' },
        { label: 'High-ICP Accounts', value: '214', unit: '', sub: 'In active signal window', color: '#22c55e', delta: 'up' },
        { label: 'Intent Surges (24h)', value: '7', unit: '', sub: '+3 vs yesterday', color: surge, delta: 'up' },
    ];

    const secondary = [
        { label: 'Avg ICP Fit Score', value: '76%' },
        { label: 'PLG Activated', value: '3.2K' },
        { label: 'Trial→SQL Rate', value: '11.2%' },
        { label: 'Decay Alerts (7d)', value: '23' },
        { label: 'Signal Coverage', value: '4.8M/day' },
    ];

    const maxSignal = Math.max(...INTENT_SURGE_TIMELINE.map(d => d.signals));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Surge alert */}
            {!dismissed && (
                <div style={{ background: `${surge}15`, borderBottom: `1px solid ${surge}35`, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        <span style={{ color: surge, fontWeight: 800, marginRight: 8 }}>⚡ SURGE DETECTED:</span>
                        Stark Industries — Web intent spike +38% · Trial activated 6h ago · ICP Fit: High
                    </span>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button style={{ fontSize: '0.75rem', color: accent, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Engage Now →</button>
                        <button onClick={() => setDismissed(true)} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                    </div>
                </div>
            )}

            {/* Signal status bar */}
            <div style={{
                background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)',
                padding: '8px 32px', fontFamily: 'monospace', fontSize: '0.6875rem',
                display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-muted)',
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', display: 'inline-block' }} />
                    <span style={{ color: accent, fontWeight: 700 }}>SIGNAL ENGINE LIVE</span>
                </span>
                <span>4,821 signals/hour</span>
                <span>214 high-ICP accounts tracked</span>
                <span style={{ color: surge }}>7 surges in 24h</span>
                <span>Model confidence: 94%</span>
            </div>

            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal Intelligence Command Center</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>ICP fit · Intent surges · PLG activation · Signal decay</p>
                    </div>
                    {/* Radar pulse */}
                    <div style={{ textAlign: 'center' }}>
                        <svg width={60} height={60} viewBox="0 0 60 60">
                            <circle cx={30} cy={30} r={4} fill={accent} />
                            <circle cx={30} cy={30} r={10} fill="none" stroke={accent} strokeWidth={1} opacity={0.3} />
                            <circle cx={30} cy={30} r={18} fill="none" stroke={accent} strokeWidth={0.75} opacity={0.15} />
                            <circle cx={30} cy={30} r={26} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.07} />
                            <line x1={30} y1={30} x2={30} y2={4} stroke={`${accent}90`} strokeWidth={1.5}
                                transform="rotate(45 30 30)" />
                        </svg>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: -4 }}>live scan</div>
                    </div>
                </div>

                {/* Hero KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 12 }}>
                    {kpis.map(k => (
                        <div key={k.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${k.color}50`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{k.label}</div>
                            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: k.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                                {k.value}<span style={{ fontSize: '1rem', opacity: 0.6, marginLeft: 2 }}>{k.unit}</span>
                            </div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ color: k.delta === 'up' ? '#22c55e' : '#ef4444' }}>{k.delta === 'up' ? '↑' : '↓'}</span>
                                {k.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 20 }}>
                    {secondary.map(s => (
                        <div key={s.label} style={{ ...card, padding: '12px 14px', cursor: 'default', transition: 'all 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}35`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; }}>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Charts row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Intent surge sparkline */}
                    <div style={card}>
                        <div style={lbl}>Intent Signal Volume (60 days) — Surge Events Marked</div>
                        <svg width={400} height={150} style={{ width: '100%', height: 'auto' }}>
                            {/* Y grid */}
                            {[0, 0.25, 0.5, 0.75, 1].map(v => {
                                const y = 10 + (1 - v) * 120;
                                const val = Math.round(v * maxSignal);
                                return (
                                    <g key={v}>
                                        <line x1={35} y1={y} x2={395} y2={y} stroke="var(--border-subtle)" strokeWidth={0.5} />
                                        <text x={30} y={y + 3} textAnchor="end" fontSize={6} fill="var(--text-muted)" fontFamily="monospace">{val}</text>
                                    </g>
                                );
                            })}
                            {/* Confidence band */}
                            <polygon
                                points={INTENT_SURGE_TIMELINE.map((d, i) => {
                                    const x = 40 + (i / (INTENT_SURGE_TIMELINE.length - 1)) * 345;
                                    return `${x},${10 + (1 - d.upper / (maxSignal * 1.15)) * 120}`;
                                }).join(' ') + ' ' +
                                    INTENT_SURGE_TIMELINE.slice().reverse().map((d, i, arr) => {
                                        const idx = arr.length - 1 - i;
                                        const x = 40 + (idx / (INTENT_SURGE_TIMELINE.length - 1)) * 345;
                                        return `${x},${10 + (1 - d.lower / (maxSignal * 1.15)) * 120}`;
                                    }).join(' ')}
                                fill={`${accent}10`}
                            />
                            {/* Main line */}
                            <polyline
                                points={INTENT_SURGE_TIMELINE.map((d, i) => {
                                    const x = 40 + (i / (INTENT_SURGE_TIMELINE.length - 1)) * 345;
                                    const y = 10 + (1 - d.signals / (maxSignal * 1.15)) * 120;
                                    return `${x},${y}`;
                                }).join(' ')}
                                fill="none" stroke={accent} strokeWidth={1.5}
                            />
                            {/* Surge markers */}
                            {INTENT_SURGE_TIMELINE.map((d, i) => {
                                if (!d.surge) return null;
                                const x = 40 + (i / (INTENT_SURGE_TIMELINE.length - 1)) * 345;
                                const y = 10 + (1 - d.signals / (maxSignal * 1.15)) * 120;
                                return (
                                    <g key={i}>
                                        <circle cx={x} cy={y} r={5} fill={surge} opacity={0.9}>
                                            <title>{d.surge}</title>
                                        </circle>
                                        <text x={x} y={y - 8} textAnchor="middle" fontSize={6} fill={surge} fontFamily="Inter, sans-serif">{d.surge}</text>
                                    </g>
                                );
                            })}
                        </svg>
                        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                            {[['Signal Volume', accent], ['Surge Event', surge]].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: l.includes('Surge') ? '50%' : 1, background: c }} />
                                    <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PLG funnel */}
                    <div style={card}>
                        <div style={lbl}>PLG Activation Funnel</div>
                        <FunnelChart stages={PLG_FUNNEL} accent={accent} />
                    </div>
                </div>

                {/* Charts row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* ICP distribution */}
                    <div style={card}>
                        <div style={lbl}>ICP Fit Distribution</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
                            {ICP_DISTRIBUTION.map(b => {
                                const maxC = Math.max(...ICP_DISTRIBUTION.map(d => d.count));
                                return (
                                    <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{b.count}</span>
                                        <div style={{ width: '100%', background: b.color, borderRadius: '3px 3px 0 0', height: `${b.count / maxC * 100}%`, minHeight: 4, transition: 'all 0.2s', cursor: 'pointer' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.8'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }} />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                            {ICP_DISTRIBUTION.map(b => (
                                <span key={b.label} style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', flex: 1, textAlign: 'center' }}>{b.label}</span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                            <div><span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Avg ICP Score</span><br /><span style={{ fontWeight: 700, color: accent, fontSize: '1rem' }}>76%</span></div>
                            <div><span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>High-fit pipeline</span><br /><span style={{ fontWeight: 700, color: '#22c55e', fontSize: '1rem' }}>$18.4M</span></div>
                        </div>
                    </div>

                    {/* Signal decay */}
                    <div style={card}>
                        <div style={lbl}>Signal Decay Curves — Act Before Signals Expire</div>
                        <DecayCurveChart
                            series={SIGNAL_DECAY.map(s => ({
                                label: s.label,
                                color: s.color,
                                dashed: s.dashed,
                                data: s.data.map(d => ({ day: d.day, value: d.value })),
                                halfLifeDay: s.halfLifeDay,
                            }))}
                            thresholdValue={20}
                            thresholdLabel="Stale Zone"
                            height={170}
                        />
                    </div>
                </div>

                {/* Signal Table + PLG Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Signal Intelligence Table — Live Accounts</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        {['Account', 'ICP Fit', 'Intent', 'Usage', 'Signal Type', 'Confidence', 'Rep'].map(h => (
                                            <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {SIGNAL_TABLE.map(row => (
                                        <tr key={row.account}
                                            style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'background 0.15s' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                            <td style={{ padding: '9px 10px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{row.account}</td>
                                            <td style={{ padding: '9px 10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <div style={{ width: 28, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                                        <div style={{ width: `${row.icpFit}%`, height: '100%', background: row.icpFit >= 80 ? '#22c55e' : row.icpFit >= 60 ? accent : '#6b7280', borderRadius: 2 }} />
                                                    </div>
                                                    <span style={{ fontWeight: 700, color: row.icpFit >= 80 ? '#22c55e' : row.icpFit >= 60 ? accent : '#6b7280', fontSize: '0.625rem' }}>{row.icpFit}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '9px 10px', fontWeight: 700, color: row.intent >= 80 ? '#22c55e' : row.intent >= 60 ? accent : '#6b7280' }}>{row.intent}</td>
                                            <td style={{ padding: '9px 10px' }}>
                                                <span style={{
                                                    padding: '2px 7px', borderRadius: 3, fontSize: '0.45rem', fontWeight: 700, textTransform: 'uppercase',
                                                    background: row.usageLevel === 'High' ? '#22c55e20' : row.usageLevel === 'Medium' ? `${accent}20` : row.usageLevel === 'Low' ? '#f59e0b20' : '#6b728020',
                                                    color: row.usageLevel === 'High' ? '#22c55e' : row.usageLevel === 'Medium' ? accent : row.usageLevel === 'Low' ? '#f59e0b' : '#6b7280',
                                                }}>{row.usageLevel}</span>
                                            </td>
                                            <td style={{ padding: '9px 10px', color: 'var(--text-secondary)', fontSize: '0.5625rem' }}>{row.signalType}</td>
                                            <td style={{ padding: '9px 10px' }}>
                                                <span style={{ background: `${accent}18`, color: accent, padding: '2px 7px', borderRadius: 10, fontSize: '0.5625rem', fontWeight: 700 }}>{row.confidence}%</span>
                                            </td>
                                            <td style={{ padding: '9px 10px', fontFamily: 'monospace', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{row.rep}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* PLG event timeline */}
                    <div style={card}>
                        <div style={lbl}>PLG Signal Timeline</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {PLG_TIMELINE.map((e, i) => (
                                <div key={i} style={{
                                    padding: '10px 0', borderBottom: i < PLG_TIMELINE.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                    display: 'flex', gap: 10, alignItems: 'flex-start',
                                    cursor: 'pointer', transition: 'background 0.15s',
                                }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${e.color}18`, border: `1.5px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                        <span style={{ fontSize: '0.6875rem' }}>
                                            {e.type === 'signup' ? '🚀' : e.type === 'feature' ? '✨' : e.type === 'expand' ? '👥' : e.type === 'demo' ? '📹' : e.type === 'milestone' ? '🏆' : '📡'}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: e.color, marginBottom: 2 }}>{e.account}</div>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e.event}</div>
                                        <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', marginTop: 3 }}>{e.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
