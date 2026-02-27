'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SIGNAL_TABLE, PIPELINE_BUYING_HEATMAP } from '../data';

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

const STAGE_DEALS = [
    { stage: 'Signal Detected', count: 82, arr: 18.4, color: '#6b7280', intentAvg: 45 },
    { stage: 'ICP Qualified', count: 51, arr: 13.2, color: '#06b6d4', intentAvg: 62 },
    { stage: 'PLG Activated', count: 33, arr: 9.8, color: '#8b5cf6', intentAvg: 74 },
    { stage: 'Demo Booked', count: 21, arr: 7.4, color: '#f59e0b', intentAvg: 82 },
    { stage: 'Proposal', count: 12, arr: 5.1, color: '#ef4444', intentAvg: 89 },
    { stage: 'Closing', count: 7, arr: 3.7, color: '#22c55e', intentAvg: 94 },
];

function PipelineContent() {
    const [signalFilter, setSignalFilter] = useState('all');
    const [icpFilter, setIcpFilter] = useState('all');

    const filtered = SIGNAL_TABLE.filter(d => {
        if (signalFilter !== 'all' && d.signalType !== signalFilter) return false;
        if (icpFilter === 'high' && d.icpFit < 80) return false;
        if (icpFilter === 'medium' && (d.icpFit < 55 || d.icpFit >= 80)) return false;
        if (icpFilter === 'low' && d.icpFit >= 55) return false;
        return true;
    });

    const maxArr = Math.max(...STAGE_DEALS.map(s => s.arr));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Signal-to-Revenue Pipeline
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        Stage funnel · Buying group coverage · ICP-weighted pipe
                    </p>
                </div>

                {/* Pipeline funnel chart */}
                <div style={{ ...card, marginBottom: 20 }}>
                    <div style={lbl}>Stage Funnel — Signal to Closed</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 140 }}>
                        {STAGE_DEALS.map(s => (
                            <div key={s.stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>${s.arr}M</span>
                                <div
                                    title={`${s.stage}: ${s.count} deals, $${s.arr}M ARR`}
                                    style={{
                                        width: '100%', borderRadius: '3px 3px 0 0',
                                        background: `linear-gradient(180deg, ${s.color}CC 0%, ${s.color} 100%)`,
                                        height: `${s.arr / maxArr * 100}%`, minHeight: 8,
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.filter = 'brightness(1.2)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.filter = 'none'; }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{s.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        {STAGE_DEALS.map(s => (
                            <span key={s.stage} style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', textAlign: 'center', flex: 1 }}>{s.stage}</span>
                        ))}
                    </div>
                    {/* Intent bars */}
                    <div style={{ marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 6 }}>AVG INTENT SCORE PER STAGE</div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {STAGE_DEALS.map(s => (
                                <div key={s.stage} style={{ flex: 1 }}>
                                    <div style={{ height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                        <div style={{ width: `${s.intentAvg}%`, height: '100%', background: s.color, borderRadius: 2 }} />
                                    </div>
                                    <div style={{ fontSize: '0.4rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 2 }}>{s.intentAvg}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Buying group heatmap */}
                <div style={{ ...card, marginBottom: 20 }}>
                    <div style={lbl}>Buying Group Engagement Heatmap</div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left', width: 100 }}>Account</th>
                                    {PIPELINE_BUYING_HEATMAP.roles.map((r: string) => (
                                        <th key={r} style={{ padding: '4px 8px', fontSize: '0.45rem', color: 'var(--text-muted)', textAlign: 'center', minWidth: 70, whiteSpace: 'nowrap' }}>{r}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {PIPELINE_BUYING_HEATMAP.accounts.map((acct: string, ai: number) => (
                                    <tr key={acct}>
                                        <td style={{ padding: '2px 8px', fontSize: '0.5625rem', color: 'var(--text-primary)', fontWeight: 600 }}>{acct}</td>
                                        {PIPELINE_BUYING_HEATMAP.roles.map((_: string, ri: number) => {
                                            const val = PIPELINE_BUYING_HEATMAP.engagement[ai][ri];
                                            const hexN = Math.min(255, Math.round(val * 2.55));
                                            const hex = hexN.toString(16).padStart(2, '0');
                                            return (
                                                <td key={ri} style={{ padding: '2px 3px' }}>
                                                    <div title={`${acct} × ${PIPELINE_BUYING_HEATMAP.roles[ri]}: ${val}%`}
                                                        style={{ height: 26, borderRadius: 3, background: `${accent}${hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}
                                                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.outline = `2px solid ${accent}`; }}
                                                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.outline = 'none'; }}>
                                                        <span style={{ fontSize: '0.45rem', fontWeight: 700, color: val > 65 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{val}</span>
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

                {/* Filtered deal table */}
                <div style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={lbl}>Live Deal Signal Table</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <select
                                value={icpFilter}
                                onChange={e => setIcpFilter(e.target.value)}
                                style={{ padding: '4px 10px', borderRadius: 5, fontSize: '0.6875rem', cursor: 'pointer', background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-card)' }}>
                                <option value="all">All ICP</option>
                                <option value="high">High ICP (80+)</option>
                                <option value="medium">Medium ICP</option>
                                <option value="low">Low ICP</option>
                            </select>
                            <select
                                value={signalFilter}
                                onChange={e => setSignalFilter(e.target.value)}
                                style={{ padding: '4px 10px', borderRadius: 5, fontSize: '0.6875rem', cursor: 'pointer', background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-card)' }}>
                                <option value="all">All Signals</option>
                                {[...new Set(SIGNAL_TABLE.map(d => d.signalType))].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                {['Account', 'ICP Fit', 'Intent', 'Signal Type', 'Usage Level', 'Confidence', 'Rep'].map(h => (
                                    <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>No deals match filters</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.account}
                                    style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                    <td style={{ padding: '9px 10px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.account}</td>
                                    <td style={{ padding: '9px 10px', fontWeight: 700, color: row.icpFit >= 80 ? '#22c55e' : row.icpFit >= 60 ? accent : '#6b7280' }}>{row.icpFit}</td>
                                    <td style={{ padding: '9px 10px', fontWeight: 700, color: row.intent >= 80 ? '#22c55e' : row.intent >= 60 ? accent : '#6b7280' }}>{row.intent}</td>
                                    <td style={{ padding: '9px 10px', color: 'var(--text-secondary)', fontSize: '0.5625rem' }}>{row.signalType}</td>
                                    <td style={{ padding: '9px 10px', color: 'var(--text-secondary)' }}>{row.usageLevel}</td>
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
        </div>
    );
}

export default function Pipeline08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <PipelineContent />
        </CrmLayout>
    );
}
