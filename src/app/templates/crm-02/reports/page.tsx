import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reports — AI Command Center CRM',
    description: 'AI-generated revenue intelligence reports and model output digests.',
};

const reports = [
    {
        key: 'FORECAST_DIGEST',
        title: 'AI Forecast Digest',
        desc: 'Weekly model predictions vs actuals, confidence intervals, and variance attribution.',
        stats: [{ label: 'MODEL_ACCURACY', value: '96.1%' }, { label: 'LAST_RUN', value: '2h ago' }],
    },
    {
        key: 'SIGNAL_SUMMARY',
        title: 'Signal Intelligence Report',
        desc: 'Ranked buyer intent signals, top movers in deal score, and engagement anomalies.',
        stats: [{ label: 'SIGNALS_THIS_WEEK', value: '14,208' }, { label: 'HIGH_INTENT', value: '89' }],
    },
    {
        key: 'WIN_LOSS_ATTRIBUTION',
        title: 'Win / Loss Attribution Report',
        desc: 'Shapley value attribution: which signals and touchpoints drove each closed deal.',
        stats: [{ label: 'WIN_RATE', value: '47.3%' }, { label: 'TOP_FACTOR', value: 'Champion Eng.' }],
    },
    {
        key: 'CHURN_RISK_REPORT',
        title: 'Churn Risk Assessment',
        desc: 'ML-predicted churn probability across all accounts in the current book, ranked by urgency.',
        stats: [{ label: 'HIGH_RISK_ACCTS', value: '12' }, { label: 'MODEL_VERSION', value: 'v3.2' }],
    },
    {
        key: 'EXPANSION_TARGETS',
        title: 'Expansion Target Report',
        desc: 'AI-identified upsell candidates ranked by expansion probability and estimated ACV uplift.',
        stats: [{ label: 'TARGETS_IDENT', value: '28' }, { label: 'POTENTIAL_ARR', value: '+$4.2M' }],
    },
    {
        key: 'PIPELINE_HEALTH',
        title: 'Pipeline Health Index',
        desc: 'Composite AI score across coverage, deal velocity, engagement, and forecast alignment.',
        stats: [{ label: 'HEALTH_INDEX', value: '84/100' }, { label: 'TREND', value: '+12 MoM' }],
    },
];

export default function Crm02Reports() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 28 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::REPORT_ENGINE</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>AI Reports</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Model-generated revenue intelligence reports · Auto-updated</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {reports.map(r => (
                        <div key={r.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />

                            {/* SVG scatter/noise preview */}
                            <svg width="100%" height="36" viewBox="0 0 300 36" style={{ marginBottom: 14, opacity: 0.6 }}>
                                {[12, 45, 28, 62, 38, 71, 55, 84, 48, 92, 67, 78, 82, 95, 73].map((v, i) => (
                                    <circle key={i} cx={i * 20 + 10} cy={36 - v * 0.34} r={2} fill={accent} opacity={0.6 + (i / 15) * 0.4} />
                                ))}
                                <polyline
                                    points={[12, 45, 28, 62, 38, 71, 55, 84, 48, 92, 67, 78, 82, 95, 73].map((v, i) => `${i * 20 + 10},${36 - v * 0.34}`).join(' ')}
                                    fill="none" stroke={accent} strokeWidth="1" opacity={0.4}
                                />
                            </svg>

                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>{r.key}</span>
                            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{r.title}</p>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>{r.desc}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div style={{ display: 'flex', gap: 20 }}>
                                    {r.stats.map(s => (
                                        <div key={s.label}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', display: 'block', marginBottom: 3 }}>{s.label}</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-accent)' }}>{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button style={{ padding: '6px 14px', background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 5, color: 'var(--text-accent)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                                    RUN_REPORT
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
