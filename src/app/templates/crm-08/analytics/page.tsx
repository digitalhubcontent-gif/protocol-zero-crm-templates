'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { DecayCurveChart } from '@/components/charts/DecayCurveChart';
import { AreaChart } from '@/components/charts/AreaChart';
import {
    ATTRIBUTION_WATERFALL, ACTIVATION_COHORT, SIGNAL_DECAY,
    CAMPAIGN_ATTRIBUTION, CAMPAIGN_INTERACTION, CHANNEL_DONUT
} from '../data';

const accent = '#06b6d4';

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

function AnalyticsContent() {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

    const emailSeries = {
        label: 'Email', color: accent,
        data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.email })),
    };
    const webSeries = {
        label: 'Web', color: '#22c55e', dashed: false,
        data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.web })),
    };
    const trialSeries = {
        label: 'Trial', color: '#f59e0b', dashed: true,
        data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.trial })),
    };

    const heroMetrics = [
        { label: 'Signal Attribution Rate', value: '72%', sub: 'vs 55% prior period', color: accent },
        { label: 'Trial Activation Rate', value: '67.3%', sub: 'High-ICP accounts', color: '#22c55e' },
        { label: 'Signal-to-Demo Conversion', value: '18.4%', sub: 'All qualified signals', color: '#f59e0b' },
    ];

    const maxAttr = Math.max(...ATTRIBUTION_WATERFALL.map(a => a.value));
    const maxCampaign = Math.max(...CAMPAIGN_ATTRIBUTION.values.flat());
    const totalDonut = CHANNEL_DONUT.reduce((s, c) => s + c.value, 0);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal Intelligence Analytics Lab</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Attribution · Activation cohorts · Decay analysis · Channel mix</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['7d', '30d', '90d'] as const).map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '6px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: period === p ? accent : 'transparent',
                                color: period === p ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${period === p ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{p}</button>
                        ))}
                    </div>
                </div>

                {/* Hero KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
                    {heroMetrics.map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}45`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Attribution + Channel donut */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Revenue attribution waterfall */}
                    <div style={card}>
                        <div style={lbl}>Revenue Attribution by Signal Source ($M ARR)</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
                            {ATTRIBUTION_WATERFALL.map(a => (
                                <div key={a.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>${a.value}M</span>
                                    <div
                                        title={`${a.label}: $${a.value}M`}
                                        style={{
                                            width: '100%', borderRadius: '3px 3px 0 0', background: a.color,
                                            height: `${a.value / maxAttr * 100}%`, minHeight: 4,
                                            transition: 'all 0.25s', cursor: 'pointer',
                                        }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.8'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {ATTRIBUTION_WATERFALL.map(a => (
                                <span key={a.label} style={{ fontSize: '0.4rem', color: 'var(--text-muted)', textAlign: 'center', flex: 1 }}>{a.label}</span>
                            ))}
                        </div>
                    </div>

                    {/* Channel donut */}
                    <div style={card}>
                        <div style={lbl}>Signal Source Attribution Mix</div>
                        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                            {/* SVG donut */}
                            <svg width={130} height={130} viewBox="0 0 130 130" style={{ flexShrink: 0 }}>
                                {(() => {
                                    let offset = 0;
                                    const r = 48, cx = 65, cy = 65;
                                    const circ = 2 * Math.PI * r;
                                    return CHANNEL_DONUT.map(seg => {
                                        const pct = seg.value / totalDonut;
                                        const dash = pct * circ;
                                        const gap = circ - dash;
                                        const rotate = offset * 360 - 90;
                                        offset += pct;
                                        return (
                                            <circle key={seg.label}
                                                cx={cx} cy={cy} r={r}
                                                fill="none"
                                                stroke={seg.color}
                                                strokeWidth={16}
                                                strokeDasharray={`${dash} ${gap}`}
                                                strokeDashoffset={0}
                                                transform={`rotate(${rotate} ${cx} ${cy})`}
                                                style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                                                onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('stroke-width', '20'); }}
                                                onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('stroke-width', '16'); }}>
                                                <title>{seg.label}: {seg.value}%</title>
                                            </circle>
                                        );
                                    });
                                })()}
                                <text x={65} y={61} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--text-primary)" fontFamily="Inter, sans-serif">72%</text>
                                <text x={65} y={75} textAnchor="middle" fontSize={8} fill="var(--text-muted)" fontFamily="Inter, sans-serif">attributed</text>
                            </svg>
                            <div style={{ flex: 1 }}>
                                {CHANNEL_DONUT.map(seg => (
                                    <div key={seg.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: 2, background: seg.color }} />
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{seg.label}</span>
                                        </div>
                                        <span style={{ fontWeight: 700, color: seg.color, fontSize: '0.6875rem' }}>{seg.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Activation cohort + decay curves */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Activation cohort */}
                    <div style={card}>
                        <div style={lbl}>PLG Activation Cohort — Day-Level Retention</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 2 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '3px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Cohort</th>
                                        {ACTIVATION_COHORT.cols.map(c => (
                                            <th key={c} style={{ padding: '3px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ACTIVATION_COHORT.rows.map((row, ri) => (
                                        <tr key={row}>
                                            <td style={{ padding: '2px 6px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                            {ACTIVATION_COHORT.cols.map((_, ci) => {
                                                const val = ACTIVATION_COHORT.values[ri][ci];
                                                if (val === null) return <td key={ci} style={{ padding: '2px 2px' }}><div style={{ height: 22, borderRadius: 2, background: 'var(--border-subtle)', opacity: 0.3 }} /></td>;
                                                const hex = Math.round(val * 2.2).toString(16).padStart(2, '0');
                                                return (
                                                    <td key={ci} style={{ padding: '2px 2px' }}>
                                                        <div style={{ height: 22, borderRadius: 2, background: `${accent}${hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span style={{ fontSize: '0.45rem', fontWeight: 700, color: val > 65 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{val}%</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Signal decay analysis */}
                    <div style={card}>
                        <div style={lbl}>Signal Decay — Know When to Act</div>
                        <DecayCurveChart
                            series={SIGNAL_DECAY.map(s => ({
                                label: s.label,
                                color: s.color,
                                dashed: s.dashed,
                                data: s.data.map(d => ({ day: d.day, value: d.value })),
                                halfLifeDay: s.halfLifeDay,
                            }))}
                            thresholdValue={20}
                            thresholdLabel="Stale threshold"
                            height={200}
                        />
                        <div style={{ marginTop: 10, fontSize: '0.5625rem', color: 'var(--text-muted)' }}>
                            Signals below 20% are considered stale — act within half-life window for max conversion.
                        </div>
                    </div>
                </div>

                {/* Row 3: Campaign interaction + attribution heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Campaign Interaction Volume (30d)</div>
                        <AreaChart series={[emailSeries, webSeries, trialSeries]} height={170} />
                    </div>
                    <div style={card}>
                        <div style={lbl}>Campaign Attribution Funnel Heatmap</div>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left', width: 100 }}>Campaign</th>
                                    {CAMPAIGN_ATTRIBUTION.cols.map(c => (
                                        <th key={c} style={{ padding: '4px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center', minWidth: 55 }}>{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {CAMPAIGN_ATTRIBUTION.rows.map((row, ri) => (
                                    <tr key={row}>
                                        <td style={{ padding: '2px 4px', fontSize: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                        {CAMPAIGN_ATTRIBUTION.cols.map((_, ci) => {
                                            const val = CAMPAIGN_ATTRIBUTION.values[ri][ci];
                                            const hex = Math.round((val / maxCampaign) * 220).toString(16).padStart(2, '0');
                                            return (
                                                <td key={ci} style={{ padding: '2px 3px' }}>
                                                    <div style={{ height: 26, borderRadius: 3, background: `${accent}${hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '0.45rem', fontWeight: 700, color: val / maxCampaign > 0.6 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{val}</span>
                                                    </div>
                                                </td>
                                            );
                                        })}
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

export default function Analytics08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <AnalyticsContent />
        </CrmLayout>
    );
}
