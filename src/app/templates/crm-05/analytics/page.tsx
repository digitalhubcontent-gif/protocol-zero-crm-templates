'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { FUNNEL_STAGES, STAGE_VELOCITY, RADAR_DATA } from '../data';

const accent = '#58a6ff';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const lbl: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 14,
};

function AnalyticsContent() {
    const [period, setPeriod] = useState<'30d' | '90d' | '6mo'>('30d');

    // Stage dwell bar chart inline
    const maxDwell = Math.max(...STAGE_VELOCITY.map(s => Math.max(s.avgDwell, s.slaDays)));

    // Conversion heatmap data (source × stage)
    const heatSources = ['Inbound', 'Cold Out', 'Referral', 'Partner', 'Event'];
    const heatStages = ['Qualify', 'Discovery', 'Demo', 'Proposal', 'Won'];
    const heatValues = [
        [0.72, 0.64, 0.52, 0.44, 0.38],
        [0.51, 0.43, 0.31, 0.22, 0.14],
        [0.84, 0.78, 0.71, 0.66, 0.61],
        [0.77, 0.69, 0.58, 0.52, 0.48],
        [0.68, 0.54, 0.42, 0.34, 0.29],
    ];

    // Throughput area data
    const throughputData = {
        label: 'Daily Throughput',
        color: accent,
        data: Array.from({ length: 28 }, (_, i) => ({ x: `D${i + 1}`, value: 8 + Math.sin(i * 0.4) * 3 + ((i * 7919) % 7) / 3 })),
    };
    const targetData = {
        label: 'Target',
        color: '#d29922',
        dashed: true,
        data: Array.from({ length: 28 }, (_, i) => ({ x: `D${i + 1}`, value: 12 })),
    };

    const heroMetrics = [
        { label: 'Flow Efficiency Index', value: '74%', sub: '+6pts vs last period' },
        { label: 'Stage Conversion Rate', value: '61%', sub: 'Gate-to-gate average' },
        { label: 'Biggest Drop-Off', value: 'Demo', sub: '→ Proposal: 37% loss' },
    ];

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Flow Intelligence Lab</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Stage efficiency · Drop-off analysis · Conversion attribution</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['30d', '90d', '6mo'] as const).map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '5px 12px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: period === p ? accent : 'transparent',
                                color: period === p ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                border: `1px solid ${period === p ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{p}</button>
                        ))}
                    </div>
                </div>

                {/* Hero metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                    {heroMetrics.map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Funnel + Stage Dwell */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Conversion Funnel (6-Stage Drop-Off)</div>
                        <FunnelChart stages={FUNNEL_STAGES} accent={accent} height={260} />
                    </div>
                    <div style={card}>
                        <div style={lbl}>Stage Dwell vs SLA Threshold</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {STAGE_VELOCITY.map(s => {
                                const slaColor = s.status === 'breach' ? '#f85149' : s.status === 'warning' ? '#d29922' : '#3fb950';
                                return (
                                    <div key={s.gate}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{s.gate}</span>
                                            <span style={{ fontSize: '0.6875rem', color: slaColor, fontWeight: 700 }}>
                                                {s.avgDwell}d <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {s.slaDays}d SLA</span>
                                            </span>
                                        </div>
                                        <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                            {/* SLA threshold line */}
                                            <div style={{ position: 'absolute', left: `${(s.slaDays / maxDwell) * 100}%`, top: 0, bottom: 0, width: 1.5, background: 'var(--border-strong)', zIndex: 2 }} />
                                            <div style={{ width: `${(s.avgDwell / maxDwell) * 100}%`, height: '100%', background: slaColor, borderRadius: 4, transition: 'width 0.3s' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 10px', background: 'var(--bg-secondary)', borderRadius: 5 }}>
                            <div style={{ width: 1.5, height: 14, background: 'var(--border-strong)' }} />
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>White line = SLA threshold</span>
                        </div>
                    </div>
                </div>

                {/* Row 2: Conversion heatmap + Throughput trend */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Conversion by Signal Source × Stage</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Source</th>
                                    {heatStages.map(s => (
                                        <th key={s} style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{s}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {heatSources.map((src, ri) => (
                                    <tr key={src}>
                                        <td style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{src}</td>
                                        {heatValues[ri].map((val, ci) => {
                                            const bg = `rgba(88,166,255,${val * 0.85})`;
                                            return (
                                                <td key={ci} style={{ padding: '3px 4px', textAlign: 'center' }}>
                                                    <div style={{ width: '100%', height: 32, background: bg, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: val > 0.5 ? 'rgba(0,0,0,0.7)' : 'var(--text-primary)' }}>
                                                            {Math.round(val * 100)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={card}>
                        <div style={lbl}>Daily Throughput vs Target (28d)</div>
                        <AreaChart series={[throughputData, targetData]} height={200} />
                        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 10, height: 2, background: accent }} />
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>Actual</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 10, height: 2, background: '#d29922', borderTop: '2px dashed #d29922' }} />
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>Target (12/day)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Analytics05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <AnalyticsContent />
        </CrmLayout>
    );
}
