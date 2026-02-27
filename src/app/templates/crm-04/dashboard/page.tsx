'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { STRATEGIC_OPPORTUNITIES, SECTOR_DISTRIBUTION, COHORT_RETENTION_04 } from '../data';
import { QuadrantChart } from '@/components/charts/QuadrantChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';

const QUADRANT_DATA = STRATEGIC_OPPORTUNITIES.map(o => ({
    org: o.org, x: o.value, y: o.fit, confidence: o.confidence, quadrant: o.confidence > 80 ? 'Pursue' : 'Evaluate'
}));

const RETENTION_AREA = COHORT_RETENTION_04.map((row, i) => ({
    x: `C${i + 1}`,
    value: row.q0,
}));

const SECTOR_STACKED = SECTOR_DISTRIBUTION.map(s => ({
    label: s.sector.slice(0, 5),
    segments: [
        { label: 'ARR', value: Math.round(s.arr / 20), color: 'var(--text-primary)' },
        { label: 'Pipeline', value: Math.round(s.pipeline / 30), color: 'var(--text-secondary)' },
    ],
}));

export default function Crm04DashboardPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');

    const KPIs = [
        { label: 'TOTAL PORTFOLIO ARR', value: '$48.2M', delta: '+12.3% YoY', up: true },
        { label: 'WEIGHTED PIPELINE', value: '$294M', delta: '+8.1% QoQ', up: true },
        { label: 'AVG DEAL FIT', value: '7.8 / 10', delta: '', up: null },
        { label: 'WIN RATE', value: '64%', delta: '+4pp QoQ', up: true },
        { label: 'CYCLE TIME AVG', value: '73 days', delta: '−6d QoQ', up: true },
        { label: 'STRATEGIC OPPS', value: '18', delta: '3 new Q2', up: true },
    ];

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                {/* Top bar */}
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Portfolio Overview &nbsp;/&nbsp; Q2 2026</span>
                    <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)' }}>
                        {(['overview', 'detail'] as const).map(v => (
                            <button key={v} onClick={() => setViewMode(v)}
                                style={{ padding: '5px 14px', background: viewMode === v ? 'var(--text-primary)' : 'transparent', color: viewMode === v ? 'var(--bg-primary)' : 'var(--text-secondary)', border: 'none', fontSize: '0.5625rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* KPI strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 32 }}>
                        {KPIs.map((k, i) => (
                            <div key={k.label} style={{ padding: '20px 20px', borderRight: i < 5 ? '1px solid var(--border)' : 'none' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 8, textTransform: 'uppercase' }}>{k.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: k.delta ? 4 : 0 }}>{k.value}</p>
                                {k.delta && <p style={{ fontSize: '0.5rem', color: k.up ? 'var(--status-success-text, #16a34a)' : 'var(--status-danger-text, #dc2626)' }}>{k.delta}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Charts 2-col */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                        {/* Quadrant */}
                        <div style={{ border: '1px solid var(--border)', padding: '20px' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Deal Size vs Strategic Fit</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 16 }}>Opportunity positioning across portfolio</p>
                            <QuadrantChart
                                points={QUADRANT_DATA}
                                xLabel="Deal Value ($K)" yLabel="Strategic Fit"
                                quadrantLabels={['Qualify', 'Pursue', 'Defer', 'Nurture']}
                                monochromeMode
                                height={210}
                            />
                        </div>

                        {/* Stacked sector */}
                        <div style={{ border: '1px solid var(--border)', padding: '20px' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Sector Composition</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 16 }}>ARR vs pipeline by sector</p>
                            <StackedBarChart bars={SECTOR_STACKED} height={210} monochromeMode={true} />
                        </div>
                    </div>

                    {/* Opportunity table */}
                    <div style={{ border: '1px solid var(--border)' }}>
                        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Strategic Opportunities Register</p>
                            <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{STRATEGIC_OPPORTUNITIES.length} active</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    {['Organisation', 'Sector', 'Value ($K)', 'Fit Score', 'Partner', 'Phase', 'Cycle Days', 'Confidence'].map(h => (
                                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {STRATEGIC_OPPORTUNITIES.map((opp, i) => (
                                    <tr key={opp.org} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s', cursor: 'pointer' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '11px 16px', fontWeight: 500 }}>{opp.org}</td>
                                        <td style={{ padding: '11px 16px', color: 'var(--text-secondary)' }}>{opp.sector}</td>
                                        <td style={{ padding: '11px 16px', fontWeight: 700 }}>{opp.value.toLocaleString()}</td>
                                        <td style={{ padding: '11px 16px' }}>{opp.fit}</td>
                                        <td style={{ padding: '11px 16px', color: 'var(--text-secondary)' }}>{opp.partner}</td>
                                        <td style={{ padding: '11px 16px' }}>
                                            <span style={{ padding: '2px 7px', background: 'var(--bg-card)', fontSize: '0.5625rem', color: 'var(--text-secondary)', borderRadius: 2 }}>{opp.phase}</span>
                                        </td>
                                        <td style={{ padding: '11px 16px', color: opp.cycleDays > 80 ? 'var(--status-danger-text, #dc2626)' : 'var(--text-secondary)' }}>{opp.cycleDays}d</td>
                                        <td style={{ padding: '11px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 48, height: 3, background: 'var(--bg-card)', borderRadius: 2, overflow: 'hidden' }}>
                                                    <div style={{ width: `${opp.confidence}%`, height: '100%', background: 'var(--text-primary)', borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 600 }}>{opp.confidence}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
