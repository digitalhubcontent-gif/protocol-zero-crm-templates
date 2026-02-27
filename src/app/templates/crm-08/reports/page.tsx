'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { CHANNEL_DONUT, PLG_FUNNEL, ACTIVATION_COHORT, CAMPAIGN_INTERACTION } from '../data';

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

const EXEC_TABLE = [
    { metric: 'Signal-to-Opportunity Rate', plg: '18.4%', outbound: '12.1%', inbound: '21.7%', delta: '+52%' },
    { metric: 'ICP Match Rate (Activated)', plg: '78%', outbound: '55%', inbound: '71%', delta: '+42%' },
    { metric: 'Avg Days to Demo', plg: '8.2d', outbound: '21.4d', inbound: '11.3d', delta: '-62%' },
    { metric: 'Win Rate (High ICP)', plg: '43%', outbound: '27%', inbound: '36%', delta: '+59%' },
    { metric: 'Avg ARR per Deal', plg: '$68K', outbound: '$44K', inbound: '$54K', delta: '+55%' },
];

function ReportsContent() {
    const [tab, setTab] = useState<'executive' | 'funnel' | 'cohort'>('executive');

    const emailSeries = { label: 'Email', color: accent, data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.email })) };
    const webSeries = { label: 'Web', color: '#22c55e', data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.web })) };
    const trialSeries = { label: 'Trial', color: '#f59e0b', dashed: true, data: CAMPAIGN_INTERACTION.map(d => ({ x: d.day, value: d.trial })) };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal Intelligence Reports</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>PLG vs outbound vs inbound · Attribution · Cohort activation</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {([['executive', 'Executive Summary'], ['funnel', 'Funnel Analysis'], ['cohort', 'Cohort Report']] as const).map(([k, l]) => (
                            <button key={k} onClick={() => setTab(k)} style={{
                                padding: '6px 12px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                background: tab === k ? accent : 'transparent',
                                color: tab === k ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${tab === k ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{l}</button>
                        ))}
                    </div>
                </div>

                {tab === 'executive' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                            {[
                                { label: 'Total ARR Influenced', value: '$24.7M', color: accent },
                                { label: 'PLG-Sourced Revenue', value: '$9.8M', color: '#22c55e' },
                                { label: 'Signal Accuracy', value: '94%', color: '#f59e0b' },
                                { label: 'Cost per Signal', value: '$0.04', color: '#8b5cf6' },
                            ].map(m => (
                                <div key={m.label} style={{ ...card, cursor: 'default' }}>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ ...card, marginBottom: 20 }}>
                            <div style={lbl}>PLG vs. Outbound vs. Inbound — Key Metrics</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        {['Metric', 'PLG-Led', 'Outbound', 'Inbound', 'PLG vs Outbound Δ'].map(h => (
                                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {EXEC_TABLE.map(row => (
                                        <tr key={row.metric}
                                            style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'default', transition: 'background 0.15s' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.metric}</td>
                                            <td style={{ padding: '10px 12px', color: '#22c55e', fontWeight: 700 }}>{row.plg}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.outbound}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.inbound}</td>
                                            <td style={{ padding: '10px 12px', fontWeight: 700, color: row.delta.startsWith('+') ? '#22c55e' : '#ef4444' }}>{row.delta}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={card}>
                            <div style={lbl}>Campaign Interaction Trends</div>
                            <AreaChart series={[emailSeries, webSeries, trialSeries]} height={180} />
                        </div>
                    </>
                )}

                {tab === 'funnel' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div style={card}>
                            <div style={lbl}>PLG Activation Funnel</div>
                            <FunnelChart stages={PLG_FUNNEL} accent={accent} />
                        </div>
                        <div style={card}>
                            <div style={lbl}>Signal Attribution Mix</div>
                            {CHANNEL_DONUT.map(seg => {
                                const total = CHANNEL_DONUT.reduce((s, c) => s + c.value, 0);
                                return (
                                    <div key={seg.label} style={{ marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{seg.label}</span>
                                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: seg.color }}>{seg.value}%</span>
                                        </div>
                                        <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4 }}>
                                            <div style={{ width: `${seg.value / total * 100}%`, height: '100%', background: seg.color, borderRadius: 4 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {tab === 'cohort' && (
                    <div style={card}>
                        <div style={lbl}>PLG Activation Cohort Retention Grid</div>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left', width: 70 }}>Cohort</th>
                                    {ACTIVATION_COHORT.cols.map(c => (
                                        <th key={c} style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center', minWidth: 55 }}>{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ACTIVATION_COHORT.rows.map((row, ri) => (
                                    <tr key={row}>
                                        <td style={{ padding: '3px 8px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                        {ACTIVATION_COHORT.cols.map((_, ci) => {
                                            const val = ACTIVATION_COHORT.values[ri][ci];
                                            if (val === null) return <td key={ci}><div style={{ height: 30, borderRadius: 3, background: 'var(--border-subtle)', opacity: 0.3, margin: 2 }} /></td>;
                                            const hex = Math.round(val * 2.2).toString(16).padStart(2, '0');
                                            return (
                                                <td key={ci}>
                                                    <div style={{ height: 30, borderRadius: 3, background: `${accent}${hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: val > 65 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{val}%</span>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Reports08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
