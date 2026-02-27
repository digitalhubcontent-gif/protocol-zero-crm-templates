'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { AreaChart } from '@/components/charts/AreaChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { REVENUE_PROJECTION, ENGAGEMENT_FUNNEL, SHAP_FEATURES, BEHAVIORAL_COHORT } from '../data';

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

const EXEC_INSIGHTS = [
    { category: 'Pipeline Coverage', ai: '4.2×', human: '3.1×', delta: '+35%', insight: 'AI-identified surges expanded coverage' },
    { category: 'Average Win Rate', ai: '38%', human: '29%', delta: '+31%', insight: 'Confidence weighting filters poor-fit deals' },
    { category: 'Sales Cycle Length', ai: '74 days', human: '91 days', delta: '-19%', insight: 'Sentiment actions reduced ghosting' },
    { category: 'Revenue per Rep', ai: '$2.1M', human: '$1.6M', delta: '+31%', insight: 'Prioritization eliminated wasted pursuit' },
    { category: 'Deal Slippage Rate', ai: '9%', human: '24%', delta: '-63%', insight: 'Risk flags triggered early intervention' },
];

function ReportsContent() {
    const [reportTab, setReportTab] = useState<'executive' | 'ai_accuracy' | 'cohort'>('executive');
    const maxShap = Math.max(...SHAP_FEATURES.map(f => Math.abs(f.contribution)));

    const aiSeries = {
        label: 'AI-Weighted Revenue',
        color: accent,
        data: REVENUE_PROJECTION[0].map(d => ({ x: d.month, value: d.value })),
        fillOpacity: 0.25,
    };
    const rawSeries = {
        label: 'Human Baseline',
        color: '#6b7280',
        dashed: true,
        data: REVENUE_PROJECTION[1].map(d => ({ x: d.month, value: d.value * 0.75 })),
        fillOpacity: 0.1,
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Behavioral Intelligence Report Center
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                            AI vs. human baseline · Confidence funnel · Revenue attribution
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {([['executive', 'Executive Summary'], ['ai_accuracy', 'AI Accuracy'], ['cohort', 'Cohort Analysis']] as const).map(([key, label]) => (
                            <button key={key} onClick={() => setReportTab(key)} style={{
                                padding: '6px 12px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                background: reportTab === key ? accent : 'transparent',
                                color: reportTab === key ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${reportTab === key ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{label}</button>
                        ))}
                    </div>
                </div>

                {reportTab === 'executive' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                            {/* Revenue comparison chart */}
                            <div style={card}>
                                <div style={lbl}>AI vs. Human Forecast Comparison</div>
                                <AreaChart series={[aiSeries, rawSeries]} height={180} />
                            </div>
                            {/* Engagement funnel */}
                            <div style={card}>
                                <div style={lbl}>AI Behavioral Conversion Funnel</div>
                                <FunnelChart stages={ENGAGEMENT_FUNNEL} accent={accent} />
                            </div>
                        </div>
                        {/* Executive table */}
                        <div style={card}>
                            <div style={lbl}>AI Intelligence Impact Analysis</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                        {['Metric', 'AI-Powered', 'Human Baseline', 'Delta', 'AI Insight'].map(h => (
                                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {EXEC_INSIGHTS.map(row => (
                                        <tr key={row.category}
                                            style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'default', transition: 'background 0.15s' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.category}</td>
                                            <td style={{ padding: '10px 12px', color: accent, fontWeight: 700 }}>{row.ai}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.human}</td>
                                            <td style={{ padding: '10px 12px', fontWeight: 700, color: row.delta.startsWith('+') ? '#10b981' : '#ef4444' }}>{row.delta}</td>
                                            <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{row.insight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {reportTab === 'ai_accuracy' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div style={card}>
                            <div style={lbl}>Feature Importance (SHAP Analysis)</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {SHAP_FEATURES.map(f => (
                                    <div key={f.feature}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{f.feature}</span>
                                            <span style={{ fontSize: '0.6875rem', color: f.positive ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                                                {f.positive ? '+' : ''}{f.contribution.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div style={{ height: 7, background: 'var(--border-subtle)', borderRadius: 3, position: 'relative' }}>
                                            {f.positive ? (
                                                <div style={{ position: 'absolute', left: '50%', width: `${Math.abs(f.contribution) / maxShap * 48}%`, height: '100%', background: '#10b981', borderRadius: '0 3px 3px 0' }} />
                                            ) : (
                                                <div style={{ position: 'absolute', right: '50%', width: `${Math.abs(f.contribution) / maxShap * 48}%`, height: '100%', background: '#ef4444', borderRadius: '3px 0 0 3px' }} />
                                            )}
                                            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--text-muted)', opacity: 0.3 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={card}>
                            <div style={lbl}>Model Performance KPIs</div>
                            {[
                                { label: 'Overall Accuracy', value: '91.2%', color: '#10b981' },
                                { label: 'Precision (Won)', value: '88.4%', color: '#10b981' },
                                { label: 'Recall (Won)', value: '79.3%', color: '#f59e0b' },
                                { label: 'AUC-ROC', value: '0.924', color: '#10b981' },
                                { label: 'F1 Score', value: '0.836', color: '#10b981' },
                                { label: 'Behavioral Drift', value: '0.04', color: accent },
                            ].map(m => (
                                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                                    <span style={{ fontSize: '1rem', fontWeight: 700, color: m.color }}>{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {reportTab === 'cohort' && (
                    <div style={card}>
                        <div style={lbl}>Behavioral Retention Cohort (Engagement %)</div>
                        <div style={{ overflowX: 'auto', marginTop: 8 }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left', width: 70 }}>Cohort</th>
                                        {BEHAVIORAL_COHORT.cols.map(c => (
                                            <th key={c} style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center', minWidth: 55 }}>{c}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {BEHAVIORAL_COHORT.rows.map((row, ri) => (
                                        <tr key={row}>
                                            <td style={{ padding: '3px 8px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                            {BEHAVIORAL_COHORT.cols.map((_, ci) => {
                                                const val = BEHAVIORAL_COHORT.values[ri][ci];
                                                if (val === null) return <td key={ci}><div style={{ height: 32, borderRadius: 3, background: 'var(--border-subtle)', opacity: 0.3, margin: '2px' }} /></td>;
                                                const hex = Math.round(val * 2.2).toString(16).padStart(2, '0');
                                                return (
                                                    <td key={ci}>
                                                        <div style={{ height: 32, borderRadius: 3, background: `${accent}${hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px' }}>
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Reports07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
