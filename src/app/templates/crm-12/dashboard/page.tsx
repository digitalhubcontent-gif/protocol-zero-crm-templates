'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { OPS_STATUS, HERO_METRICS, SECONDARY_METRICS, CAPACITY_MATRIX, ARR_PER_PRODUCER_TREND, HEADCOUNT_SCATTER, CAC_PAYBACK, SCENARIOS } from '../data';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '20px 24px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };
const lbl: React.CSSProperties = { fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 };

function DashboardContent() {
    const [scenario, setScenario] = useState<'current' | 'planned'>('current');
    const [sliderOpen, setSliderOpen] = useState(false);
    const utilColor = (v: number) => v < 70 ? '#f59e0b' : v <= 95 ? '#22c55e' : '#ef4444';
    const effColor = (v: number) => v < 60 ? '#ef4444' : v < 80 ? '#f59e0b' : '#22c55e';
    const maxSc = Math.max(...HEADCOUNT_SCATTER.map(t => t.headcount));
    const maxArr = Math.max(...HEADCOUNT_SCATTER.map(t => t.arr));

    return (
        <div style={{ background: bg, minHeight: '100vh', position: 'relative' }}>
            {/* Ops Status Bar */}
            <div style={{ background: 'var(--bg-card)', borderBottom: `1px solid ${accent}12`, padding: '6px 0' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.625rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                        <strong style={{ color: '#22c55e' }}>ENGINE: {OPS_STATUS.engineStatus}</strong>
                    </span>
                    {SECONDARY_METRICS.map(m => (
                        <span key={m.label}>{m.label}: <strong style={{ color: 'var(--text-secondary)' }}>{m.value}</strong></span>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px 32px', maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 20 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>Operations Command</h1>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Capacity · Efficiency · Territory · Ramp · Scenario</p>
                        </div>
                        {/* Scenario Toggle */}
                        <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 3, gap: 3 }}>
                            {(['current', 'planned'] as const).map(s => (
                                <button key={s} onClick={() => setScenario(s)} style={{
                                    padding: '5px 14px', borderRadius: 4, cursor: 'pointer', fontSize: '0.625rem', fontWeight: 700,
                                    background: scenario === s ? accent : 'transparent',
                                    color: scenario === s ? '#fff' : '#9ca3af', border: 'none', textTransform: 'uppercase', letterSpacing: '0.05em',
                                    transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { if (scenario !== s) (e.currentTarget as HTMLButtonElement).style.background = `${accent}15`; }}
                                    onMouseLeave={e => { if (scenario !== s) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                    {s === 'current' ? 'Current State' : 'Planned State'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hero Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
                        {HERO_METRICS.map(m => (
                            <div key={m.label} style={card}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}30`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)'; }}>
                                <div style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: accent, letterSpacing: '-0.04em', fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Gauge + Headcount Scatter */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                        <div style={card}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={lbl}>Capacity Utilization</div>
                            <GaugeChart value={82} max={120} accent={accent} size={240} label="29 producers / 35 capacity" />
                        </div>
                        <div style={card}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={lbl}>Headcount Efficiency Map — By Team</div>
                            <svg width="100%" height="auto" style={{ maxHeight: 200 }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                                {/* Trend line */}
                                <line x1={40} y1={170} x2={280} y2={20} stroke="rgba(249,115,22,0.15)" strokeWidth={1} strokeDasharray="4 3" />
                                {HEADCOUNT_SCATTER.map((t, i) => {
                                    const cx = 40 + (t.headcount / maxSc) * 240;
                                    const cy = 190 - (t.arr / maxArr) * 170;
                                    return (
                                        <g key={t.team}>
                                            <circle cx={cx} cy={cy} r={t.dealSize / 20} fill={accent} opacity={0.5}
                                                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                                                onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('opacity', '0.9'); (e.target as SVGCircleElement).setAttribute('r', String(t.dealSize / 16)); }}
                                                onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('opacity', '0.5'); (e.target as SVGCircleElement).setAttribute('r', String(t.dealSize / 20)); }}>
                                                <title>{t.team}: {t.headcount} HC, ${t.arr}M ARR</title>
                                            </circle>
                                            <text x={cx} y={cy - t.dealSize / 18 - 4} textAnchor="middle" fontSize={6} fill="var(--text-muted)">{t.team}</text>
                                        </g>
                                    );
                                })}
                                <text x={160} y={198} textAnchor="middle" fontSize={7} fill="var(--text-secondary)">Headcount →</text>
                            </svg>
                        </div>
                    </div>

                    {/* ARR Trend + CAC */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                        <div style={card}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={lbl}>ARR per Producer — 8Q Trend</div>
                            <svg width="100%" height="auto" style={{ maxHeight: 140 }} viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet">
                                {/* Band */}
                                <rect x={30} y={30} width={260} height={60} fill={`${accent}08`} rx={2} />
                                {/* Line */}
                                <polyline
                                    points={ARR_PER_PRODUCER_TREND.map((d, i) => `${30 + i * (260 / 7)},${130 - (d.value - 1.2) * 140}`).join(' ')}
                                    stroke={accent} strokeWidth={2} fill="none" />
                                {ARR_PER_PRODUCER_TREND.map((d, i) => (
                                    <circle key={i} cx={30 + i * (260 / 7)} cy={130 - (d.value - 1.2) * 140} r={3} fill={accent}
                                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('r', '5'); }}
                                        onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('r', '3'); }}>
                                        <title>{d.quarter}: ${d.value}M</title>
                                    </circle>
                                ))}
                                <text x={8} y={60} fontSize={6} fill={`${accent}60`}>Optimal</text>
                            </svg>
                        </div>
                        <div style={card}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={lbl}>CAC Payback Curve</div>
                            <svg width="100%" height="auto" style={{ maxHeight: 140 }} viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet">
                                <line x1={30} y1={60} x2={280} y2={60} stroke="var(--chart-grid)" strokeWidth={1} />
                                <polyline
                                    points={CAC_PAYBACK.filter((_, i) => i % 2 === 0).map((d, i) => `${30 + i * (250 / 11)},${130 - (d.revenue / 86000) * 100}`).join(' ')}
                                    stroke="#22c55e" strokeWidth={2} fill="none" />
                                <line x1={30} y1={130 - (42000 / 86000) * 100} x2={280} y2={130 - (42000 / 86000) * 100} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
                                {/* Crossover annotation */}
                                <circle cx={30 + 4 * (250 / 11)} cy={130 - (42000 / 86000) * 100} r={5} fill={accent} stroke="#fff" strokeWidth={1.5} />
                                <text x={30 + 4 * (250 / 11)} y={130 - (42000 / 86000) * 100 - 10} textAnchor="middle" fontSize={7} fill={accent} fontWeight={700}>Payback: 9.4mo</text>
                                <text x={282} y={130 - (42000 / 86000) * 100 + 3} fontSize={6} fill="#ef4444">CAC</text>
                                <text x={282} y={24} fontSize={6} fill="#22c55e">Rev</text>
                            </svg>
                        </div>
                    </div>

                    {/* Revenue Capacity Matrix */}
                    <div style={card}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                        <div style={lbl}>Revenue Capacity Matrix</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-elevated)' }}>
                                        {['Team', 'HC', 'ARR', 'Utilization', 'Coverage', 'EFF', 'Ramp'].map(h => (
                                            <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {CAPACITY_MATRIX.map(row => (
                                        <tr key={row.team} style={{ borderTop: '1px solid var(--border-subtle)', transition: 'background 0.15s', cursor: 'pointer' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-card-hover)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                            <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{row.team}</td>
                                            <td style={{ padding: '8px 10px', color: 'var(--text-muted)' }}>{row.headcount}</td>
                                            <td style={{ padding: '8px 10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.arr}</td>
                                            <td style={{ padding: '8px 10px' }}>
                                                <span style={{ padding: '2px 8px', borderRadius: 3, fontSize: '0.5625rem', fontWeight: 700, background: `${utilColor(row.utilization)}15`, color: utilColor(row.utilization) }}>
                                                    {row.utilization}%
                                                </span>
                                            </td>
                                            <td style={{ padding: '8px 10px' }}>
                                                <span style={{ color: row.pipelineCov < 2.5 ? '#f59e0b' : '#9ca3af', fontWeight: 600 }}>
                                                    {row.pipelineCov}x
                                                </span>
                                            </td>
                                            <td style={{ padding: '8px 10px' }}>
                                                <span style={{ padding: '2px 6px', borderRadius: 3, fontSize: '0.5rem', fontWeight: 700, background: `${effColor(row.efficiency)}15`, color: effColor(row.efficiency) }}>
                                                    EFF: {row.efficiency}
                                                </span>
                                            </td>
                                            <td style={{ padding: '8px 10px' }}>
                                                <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.45rem', fontWeight: 700, background: row.ramp === 'Ramped' ? '#22c55e15' : row.ramp === 'Ramping' ? '#f59e0b15' : 'var(--border-subtle)', color: row.ramp === 'Ramped' ? '#22c55e' : row.ramp === 'Ramping' ? '#f59e0b' : 'var(--text-muted)' }}>
                                                    {row.ramp}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Capacity Planning Sidebar */}
                {sliderOpen && (
                    <div style={{ width: 280, flexShrink: 0, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 20 }}>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Capacity Planner</div>
                        {[
                            { label: 'Headcount', value: 35, min: 20, max: 60 },
                            { label: 'Territory Count', value: 8, min: 4, max: 16 },
                            { label: 'Quota Target', value: 1800, min: 1000, max: 3000 },
                        ].map(s => (
                            <div key={s.label} style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{s.label}</span>
                                    <span style={{ fontSize: '0.5625rem', color: accent, fontWeight: 700 }}>{s.value}{s.label === 'Quota Target' ? 'K' : ''}</span>
                                </div>
                                <input type="range" min={s.min} max={s.max} defaultValue={s.value} style={{ width: '100%', accentColor: accent }} />
                            </div>
                        ))}
                        <button style={{ width: '100%', padding: '8px', borderRadius: 4, background: accent, color: 'var(--text-primary)', fontSize: '0.6875rem', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
                            APPLY TO SCENARIO
                        </button>
                    </div>
                )}
            </div>

            {/* Toggle Capacity Panel Button */}
            <button onClick={() => setSliderOpen(!sliderOpen)} style={{
                position: 'fixed', right: 20, bottom: 20, width: 44, height: 44, borderRadius: '50%',
                background: accent, color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', boxShadow: `0 4px 16px ${accent}40`, zIndex: 50,
            }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                title={sliderOpen ? 'Close Capacity Planner' : 'Open Capacity Planner'}>
                {sliderOpen ? '✕' : '⚡'}
            </button>
        </div>
    );
}

export default function Dashboard12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
