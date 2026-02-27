'use client';

import React from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { ComplianceMatrix } from '@/components/charts/ComplianceMatrix';
import { AreaChart } from '@/components/charts/AreaChart';
import { COMPLIANCE_HISTORY, FRAMEWORK_HEATMAP, FRAMEWORK_RISK } from '../data';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 8, padding: '20px 24px' };
const lbl: React.CSSProperties = { fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 };

function AnalyticsContent() {
    const heatStatusColor = (s: string) => s === 'compliant' ? '#10b981' : s === 'warning' ? '#f59e0b' : '#ef4444';
    const heatStatusBg = (s: string) => s === 'compliant' ? '#10b98120' : s === 'warning' ? '#f59e0b20' : '#ef444420';

    // Build ComplianceMatrix controls from heatmap data
    const matrixControls = FRAMEWORK_HEATMAP.controls.map((control, i) => ({
        id: `ctrl-${i}`,
        category: i < 3 ? 'Security Controls' : 'Data Governance',
        name: control,
        statuses: FRAMEWORK_HEATMAP.frameworks.map((fw, j) => ({
            regulation: fw,
            status: FRAMEWORK_HEATMAP.values[i][j],
        })),
    }));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Compliance Intelligence</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Compliance scoring · Framework coverage · Control analysis · Risk exposure</p>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
                    {[
                        { label: 'Aggregate Compliance Score', value: '94/100', color: accent },
                        { label: 'Controls Passing', value: '565/746', color: '#22c55e' },
                        { label: 'Frameworks With Violations', value: '2/5', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, transition: 'all 0.2s', cursor: 'default' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}35`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(16,185,129,0.08)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Compliance Score Trend + Framework Coverage */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Compliance Score Trend (12 Months)</div>
                        <AreaChart
                            series={[{ label: 'Score', color: accent, data: COMPLIANCE_HISTORY }]}
                            height={200}
                        />
                        <div style={{ marginTop: 8, padding: '6px 12px', background: `${accent}08`, borderRadius: 4, fontSize: '0.625rem', color: accent }}>
                            Target: 95% · Current: 94% · Trend: ↗ Improving
                        </div>
                    </div>

                    <div style={card}>
                        <div style={lbl}>Control Status by Framework</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '4px 6px', fontSize: '0.45rem', color: 'var(--text-muted)', textAlign: 'left', fontWeight: 700 }}>Control</th>
                                        {FRAMEWORK_HEATMAP.frameworks.map(fw => (
                                            <th key={fw} style={{ padding: '4px', fontSize: '0.4rem', color: accent, textAlign: 'center', fontWeight: 700, minWidth: 48 }}>{fw}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {FRAMEWORK_HEATMAP.controls.map((ctrl, ri) => (
                                        <tr key={ctrl}>
                                            <td style={{ padding: '3px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{ctrl}</td>
                                            {FRAMEWORK_HEATMAP.frameworks.map((_, ci) => {
                                                const val = FRAMEWORK_HEATMAP.values[ri][ci];
                                                return (
                                                    <td key={ci} style={{ padding: '2px' }}>
                                                        <div style={{
                                                            height: 22, borderRadius: 3,
                                                            background: heatStatusBg(val),
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        }}>
                                                            <span style={{ fontSize: '0.4375rem', fontWeight: 700, color: heatStatusColor(val) }}>
                                                                {val === 'compliant' ? '✓' : val === 'warning' ? '⚠' : '✕'}
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
                    </div>
                </div>

                {/* Framework Risk Exposure Table */}
                <div style={card}>
                    <div style={lbl}>Framework Risk Exposure — Revenue Impact</div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-primary)' }}>
                                    {['Framework', 'Total Controls', 'Passing', 'Failing', 'Pass Rate', 'Revenue Covered'].map(h => (
                                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {FRAMEWORK_RISK.map(fw => {
                                    const passRate = Math.round((fw.passing / fw.controls) * 100);
                                    const rateColor = passRate >= 95 ? accent : passRate >= 85 ? '#f59e0b' : '#ef4444';
                                    return (
                                        <tr key={fw.framework} style={{ borderTop: '1px solid var(--border-subtle)', transition: 'background 0.15s', cursor: 'pointer' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-card)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{fw.framework}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{fw.controls}</td>
                                            <td style={{ padding: '10px 12px', color: accent, fontWeight: 600 }}>{fw.passing}</td>
                                            <td style={{ padding: '10px 12px', color: fw.failing > 10 ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>{fw.failing}</td>
                                            <td style={{ padding: '10px 12px' }}>
                                                <span style={{ padding: '2px 8px', borderRadius: 3, fontSize: '0.5rem', fontWeight: 700, background: `${rateColor}18`, color: rateColor }}>{passRate}%</span>
                                            </td>
                                            <td style={{ padding: '10px 12px', color: accent, fontWeight: 700 }}>{fw.revenue}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Analytics10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <AnalyticsContent />
        </CrmLayout>
    );
}
