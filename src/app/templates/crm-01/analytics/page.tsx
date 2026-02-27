import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Analytics — Monolithic Enterprise CRM',
    description: 'Deep revenue analytics and forecasting intelligence.',
};

const forecastData = [
    { quarter: 'Q3\'25', commit: 78, upside: 88, actual: 81 },
    { quarter: 'Q4\'25', commit: 82, upside: 91, actual: 86 },
    { quarter: 'Q1\'26', commit: 76, upside: 84, actual: 80 },
    { quarter: 'Q2\'26', commit: 84, upside: 96, actual: null },
];

const revenueBySegment = [
    { segment: 'Enterprise', arr: 48.2, growth: 22 },
    { segment: 'Mid-Market', arr: 22.4, growth: 14 },
    { segment: 'SMB', arr: 8.6, growth: 8 },
    { segment: 'Strategic', arr: 5.0, growth: 31 },
];

const cohortData = [
    { cohort: 'Q3\'24', m3: 94, m6: 89, m12: 84 },
    { cohort: 'Q4\'24', m3: 96, m6: 91, m12: 87 },
    { cohort: 'Q1\'25', m3: 93, m6: 88, m12: null },
    { cohort: 'Q2\'25', m3: 97, m6: 92, m12: null },
    { cohort: 'Q3\'25', m3: 95, m6: null, m12: null },
    { cohort: 'Q4\'25', m3: 98, m6: null, m12: null },
];

const cohortColor = (v: number | null) => {
    if (v === null) return { bg: 'var(--bg-secondary)', text: 'var(--text-muted)' };
    if (v >= 94) return { bg: 'rgba(16,185,129,0.15)', text: '#10b981' };
    if (v >= 88) return { bg: 'rgba(16,185,129,0.08)', text: '#6ee7b7' };
    return { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b' };
};

const maxArr = Math.max(...revenueBySegment.map(s => s.arr));

export default function Crm01Analytics() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <div style={{ padding: '32px', maxWidth: 1200 }}>

                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Revenue Analytics</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pipeline intelligence, forecasting accuracy, and cohort retention analysis</p>
                </div>

                {/* Top Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                    {[
                        { label: 'Forecast Accuracy', value: '91%', sub: 'Q2 2026' },
                        { label: 'NRR', value: '118%', sub: '+6pp YoY' },
                        { label: 'Churn Rate', value: '3.2%', sub: 'Gross annual' },
                        { label: 'Expansion ARR', value: '$12.4M', sub: '15% of total' },
                    ].map(m => (
                        <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '18px 20px' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>{m.label}</p>
                            <p style={{ fontSize: '1.625rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.sub}</p>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

                    {/* Forecast Waterfall */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 20 }}>Forecast vs Actual ($M)</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {forecastData.map(q => (
                                <div key={q.quarter}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{q.quarter}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {q.actual !== null ? <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>Actual: ${q.actual}M</span> : <span style={{ color: accent }}>In progress</span>}
                                        </span>
                                    </div>
                                    <div style={{ position: 'relative', height: 8, background: 'var(--border-card)', borderRadius: 4, overflow: 'visible' }}>
                                        <div style={{ position: 'absolute', left: 0, height: '100%', width: `${(q.upside / 100) * 100}%`, background: `${accent}30`, borderRadius: 4 }} />
                                        <div style={{ position: 'absolute', left: 0, height: '100%', width: `${(q.commit / 100) * 100}%`, background: `${accent}70`, borderRadius: 4 }} />
                                        {q.actual && <div style={{ position: 'absolute', left: `${(q.actual / 100) * 100}%`, top: -3, width: 2, height: 14, background: 'var(--status-success)', borderRadius: 1 }} />}
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Commit: ${q.commit}M</span>
                                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Upside: ${q.upside}M</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue by Segment */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 20 }}>ARR by Segment</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {revenueBySegment.map(s => (
                                <div key={s.segment}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{s.segment}</span>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>${s.arr}M</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 600 }}>+{s.growth}%</span>
                                        </div>
                                    </div>
                                    <div style={{ height: 8, background: 'var(--border-card)', borderRadius: 4, overflow: 'hidden' }}>
                                        <div style={{ width: `${(s.arr / maxArr) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}bb)`, borderRadius: 4 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cohort Retention */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                    <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>Revenue Cohort Retention</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Net revenue retention by close quarter, measured at 3, 6, and 12 months</p>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Cohort</th>
                                    {['Month 3', 'Month 6', 'Month 12'].map(h => (
                                        <th key={h} style={{ padding: '8px 24px', textAlign: 'center', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cohortData.map(row => (
                                    <tr key={row.cohort}>
                                        <td style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--text-secondary)' }}>{row.cohort}</td>
                                        {[row.m3, row.m6, row.m12].map((v, i) => {
                                            const c = cohortColor(v);
                                            return (
                                                <td key={i} style={{ padding: '10px 24px', textAlign: 'center' }}>
                                                    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 5, background: c.bg, color: c.text, fontWeight: 600, fontSize: '0.875rem', fontVariantNumeric: 'tabular-nums', minWidth: 56, textAlign: 'center' }}>
                                                        {v !== null ? `${v}%` : '—'}
                                                    </span>
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
        </CrmLayout>
    );
}
