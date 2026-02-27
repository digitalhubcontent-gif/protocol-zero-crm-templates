import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reports — Monolithic Enterprise CRM',
    description: 'Revenue reporting and performance analysis.',
};

const reports = [
    {
        title: 'Pipeline Coverage Report',
        desc: 'Stage-by-stage pipeline analysis with coverage ratios and projected close values.',
        meta: 'Updated daily · Q2 2026',
        metrics: [{ label: 'Coverage', value: '3.8x' }, { label: 'at Risk', value: '$6.2M' }],
    },
    {
        title: 'Win / Loss Analysis',
        desc: 'Close rate trends by rep, segment, deal size, and competitive factor.',
        meta: 'Updated weekly · Last 90 days',
        metrics: [{ label: 'Win Rate', value: '38.4%' }, { label: 'vs Quarter', value: '+4.2pp' }],
    },
    {
        title: 'Forecast Variance Report',
        desc: 'Commit vs. actual delta by quarter with deviation trend analysis.',
        meta: 'Updated quarterly · 8 quarters',
        metrics: [{ label: 'Accuracy', value: '91%' }, { label: 'Avg Deviation', value: '4.1%' }],
    },
    {
        title: 'Team Performance Summary',
        desc: 'Per-rep and per-team quota attainment, deal velocity, and activity benchmarks.',
        meta: 'Updated daily · All teams',
        metrics: [{ label: 'Attainment', value: '104%' }, { label: 'Top Rep', value: 'S. Park' }],
    },
    {
        title: 'Cohort Retention Analysis',
        desc: 'Net revenue retention tracked across close cohorts at 3, 6, and 12 months.',
        meta: 'Updated monthly · 8 cohorts',
        metrics: [{ label: 'Avg NRR', value: '118%' }, { label: 'Best Cohort', value: 'Q4\'25' }],
    },
    {
        title: 'Expansion Revenue Report',
        desc: 'Upsell and expansion ARR by account, segment, and growth quarter.',
        meta: 'Updated monthly · All segments',
        metrics: [{ label: 'Expansion ARR', value: '$12.4M' }, { label: 'of Total', value: '15%' }],
    },
];

// Simple SVG bar chart
const BarSparkline = ({ accent }: { accent: string }) => {
    const bars = [42, 58, 51, 67, 74, 62, 81, 88];
    const max = Math.max(...bars);
    return (
        <svg width="100%" height="40" viewBox={`0 0 ${bars.length * 18} 40`} preserveAspectRatio="none">
            {bars.map((v, i) => (
                <rect key={i} x={i * 18 + 2} y={40 - (v / max) * 36} width={13} height={(v / max) * 36} rx={2} fill={accent} fillOpacity={0.4 + (i / bars.length) * 0.5} />
            ))}
        </svg>
    );
};

export default function Crm01Reports() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Reports</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Revenue intelligence and performance reporting suite</p>
                    </div>
                    <button style={{ padding: '8px 18px', background: accent, border: 'none', borderRadius: 6, color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                        New Report
                    </button>
                </div>

                {/* Report Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 }}>
                    {reports.map(r => (
                        <div key={r.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{r.title}</p>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{r.desc}</p>
                            </div>
                            <BarSparkline accent={accent} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    {r.metrics.map(m => (
                                        <div key={m.label}>
                                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 2 }}>{m.label}</p>
                                            <p style={{ fontSize: '1rem', fontWeight: 700, color: accent }}>{m.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 8 }}>{r.meta}</p>
                                    <button style={{ padding: '6px 14px', background: `${accent}18`, border: `1px solid ${accent}30`, borderRadius: 5, color: accent, fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                                        View Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
