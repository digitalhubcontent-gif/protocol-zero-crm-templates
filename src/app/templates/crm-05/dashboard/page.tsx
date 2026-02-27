'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { KanbanBoard } from '@/components/charts/KanbanBoard';
import { CumulativeFlowChart } from '@/components/charts/CumulativeFlowChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import {
    KANBAN_COLUMNS, CFD_DATA, CFD_STAGE_ORDER, CFD_COLORS,
    ACTIVE_DEALS, FLOW_OWNERS,
} from '../data';

const accent = '#58a6ff';

const kpiCardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '16px 20px',
    transition: 'all 0.2s ease',
    cursor: 'default',
};

const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#f85149', label: 'Critical' },
    { min: 40, max: 70, color: '#d29922', label: 'Moderate' },
    { min: 70, max: 100, color: '#3fb950', label: 'Optimal' },
];

function DashboardContent() {
    const [period, setPeriod] = useState<'Today' | 'Week' | '30d'>('Week');
    const [blockerOpen, setBlockerOpen] = useState(true);
    const [dismissed, setDismissed] = useState(false);

    const breach = ACTIVE_DEALS.filter(d => d.sla === 'breach').length;
    const warn = ACTIVE_DEALS.filter(d => d.sla === 'warning').length;

    const kpis = [
        { label: 'Pipeline Velocity', value: '$2.4M', sub: '+12% vs last week', delta: true },
        { label: 'Daily Conversions', value: '14', sub: 'Vs target: 12', delta: true },
        { label: 'Stalled Ratio', value: '18%', sub: '4 critical gates', delta: false },
        { label: 'Flow Efficiency', value: '74%', sub: 'Across 6 gates', delta: null },
        { label: 'Avg Dwell (All)', value: '6.8d', sub: 'SLA: varies by gate', delta: null },
        { label: 'SLA Compliance', value: '87%', sub: '4 SLA breaches', delta: null },
        { label: 'New Signals', value: '38', sub: 'This week', delta: true },
        { label: 'Transition Rate', value: '61%', sub: 'Gate → Gate', delta: true },
    ];

    const stalledDeals = ACTIVE_DEALS.filter(d => d.sla !== 'ok').slice(0, 5);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Bottleneck ribbon */}
            {!dismissed && (
                <div style={{
                    background: `#d29922${breach > 0 ? '22' : '18'}`,
                    borderBottom: `1px solid ${breach > 0 ? '#f85149' : '#d29922'}40`,
                    padding: '8px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: breach > 0 ? '#f85149' : '#d29922' }}>
                        {breach > 0 ? '⚠ BOTTLENECK' : '● ADVISORY'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {breach} SLA breaches active · {warn} approaching threshold · Demo gate avg dwell is 8.2d vs 5d SLA
                    </span>
                    <button onClick={() => setDismissed(true)} style={{
                        marginLeft: 'auto', background: 'transparent', border: 'none',
                        color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem',
                        padding: '0 4px',
                    }}>×</button>
                </div>
            )}

            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header + filter bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Flow Control Board</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Pipeline velocity · SLA compliance · Stage throughput</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {(['Today', 'Week', '30d'] as const).map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '5px 14px',
                                background: period === p ? accent : 'transparent',
                                color: period === p ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                border: `1px solid ${period === p ? accent : 'var(--border-card)'}`,
                                borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                transition: 'all 0.15s ease',
                            }}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
                    {kpis.map(k => (
                        <div key={k.label} style={kpiCardStyle}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{k.label}</div>
                            <div style={{ fontSize: '1.625rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
                            <div style={{ fontSize: '0.625rem', color: k.delta === true ? accent : k.delta === false ? '#f85149' : 'var(--text-muted)', marginTop: 5 }}>{k.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Main content grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 28 }}>
                    {/* CFD chart */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '18px 20px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Cumulative Flow — Last 30 Days
                        </div>
                        <CumulativeFlowChart
                            data={CFD_DATA}
                            stageOrder={CFD_STAGE_ORDER}
                            stageColors={CFD_COLORS}
                            accent={accent}
                            height={220}
                        />
                    </div>

                    {/* Flow efficiency gauge */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '18px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>
                            Flow Efficiency Index
                        </div>
                        <GaugeChart value={74} zones={GAUGE_ZONES} subLabel="Across 6 phase gates" size={200} accent={accent} />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            {GAUGE_ZONES.map(z => (
                                <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 2, background: z.color }} />
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{z.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active Deal Table + Blockers */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, marginBottom: 28 }}>
                    {/* Deal table */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Deals</span>
                            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Sorted by SLA risk</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Deal ID', 'Account', 'Phase', 'Dwell', 'Owner', 'Last Exec', 'Health', 'SLA'].map(h => (
                                        <th key={h} style={{ padding: '8px 12px', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ACTIVE_DEALS.map((d, i) => {
                                    const slaColor = d.sla === 'breach' ? '#f85149' : d.sla === 'warning' ? '#d29922' : '#3fb950';
                                    return (
                                        <tr key={d.id}
                                            style={{
                                                borderLeft: d.sla === 'breach' ? '3px solid #f85149' : d.sla === 'warning' ? '3px solid #d29922' : '3px solid transparent',
                                                background: d.sla === 'breach' ? 'var(--bg-critical)' : 'transparent',
                                                cursor: 'pointer',
                                                transition: 'background 0.1s',
                                            }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = d.sla === 'breach' ? 'var(--bg-critical)' : 'transparent'; }}>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: accent, fontFamily: 'monospace' }}>{d.id}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{d.account}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{d.phase}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', fontWeight: 600, color: slaColor }}>{d.dwell}d</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{d.owner}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{d.lastExec}</td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <div style={{ width: 60, height: 4, background: 'var(--border-subtle)', borderRadius: 2, overflow: 'hidden' }}>
                                                    <div style={{ width: `${d.health}%`, height: '100%', background: d.health > 70 ? '#3fb950' : d.health > 50 ? '#d29922' : '#f85149', borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 2, display: 'block' }}>{d.health}%</span>
                                            </td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: slaColor, background: `${slaColor}15`, padding: '2px 6px', borderRadius: 3 }}>
                                                    {d.sla.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Clear blockers panel */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}20`, borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clear Blockers</span>
                            <span style={{ fontSize: '0.625rem', background: '#f8514920', color: '#f85149', padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>
                                {stalledDeals.length} urgent
                            </span>
                        </div>
                        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {stalledDeals.map(d => (
                                <div key={d.id} style={{ background: 'var(--bg-secondary)', borderRadius: 6, padding: '10px 12px', border: '1px solid var(--border-subtle)' }}>
                                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{d.account}</div>
                                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginBottom: 8 }}>{d.phase} · {d.dwell}d · {d.owner}</div>
                                    <button style={{
                                        width: '100%', padding: '5px 0',
                                        background: `${accent}15`, color: accent,
                                        border: `1px solid ${accent}30`, borderRadius: 4,
                                        cursor: 'pointer', fontSize: '0.5625rem', fontWeight: 600,
                                        transition: 'all 0.15s',
                                    }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}25`; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}15`; }}>
                                        Take Action →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Flow owners */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '16px 20px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>Flow Owner Performance</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {FLOW_OWNERS.map(o => (
                            <div key={o.initials} style={{ background: 'var(--bg-secondary)', borderRadius: 6, padding: '12px 14px', border: '1px solid var(--border-subtle)', transition: 'all 0.2s', cursor: 'default' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}35`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${accent}20`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, color: accent }}>
                                        {o.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{o.name}</div>
                                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{o.deals} deals</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    {[
                                        { label: 'Efficiency', val: o.efficiency, max: 100 },
                                        { label: 'SLA Compliance', val: o.slaCompliance, max: 100 },
                                    ].map(row => (
                                        <div key={row.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{row.label}</span>
                                                <span style={{ fontSize: '0.5rem', color: accent, fontWeight: 600 }}>{row.val}%</span>
                                            </div>
                                            <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2, overflow: 'hidden' }}>
                                                <div style={{ width: `${row.val}%`, height: '100%', background: row.val >= 80 ? '#3fb950' : row.val >= 60 ? '#d29922' : '#f85149', borderRadius: 2 }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
