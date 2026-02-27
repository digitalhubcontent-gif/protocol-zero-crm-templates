import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard — Monolithic Enterprise CRM',
    description: 'Enterprise revenue pipeline dashboard with multi-team analytics.',
};

const metrics = [
    { label: 'Annual Recurring Revenue', value: '$84.2M', change: '+18%', trend: 'up' },
    { label: 'Pipeline Coverage', value: '3.8x', change: '+0.4x', trend: 'up' },
    { label: 'Win Rate', value: '38.4%', change: '+4.2pp', trend: 'up' },
    { label: 'Avg Deal Size', value: '$128K', change: '+22%', trend: 'up' },
    { label: 'Forecast Accuracy', value: '91%', change: '+3pp', trend: 'up' },
    { label: 'Open Opportunities', value: '412', change: '+34', trend: 'up' },
    { label: 'Sales Cycle (Avg)', value: '62 days', change: '-8 days', trend: 'up' },
    { label: 'Quota Attainment', value: '104%', change: '+4pp', trend: 'up' },
];

const pipelineStages = [
    { name: 'Prospecting', count: 148, value: '$18.4M', pct: 18 },
    { name: 'Qualification', count: 97, value: '$14.2M', pct: 22 },
    { name: 'Discovery', count: 74, value: '$11.8M', pct: 31 },
    { name: 'Proposal', count: 51, value: '$9.6M', pct: 48 },
    { name: 'Negotiation', count: 28, value: '$6.2M', pct: 72 },
    { name: 'Closed Won', count: 14, value: '$3.1M', pct: 100 },
];

const deals = [
    { company: 'Meridian Financial Group', value: '$420,000', stage: 'Negotiation', owner: 'S. Park', days: 54, score: 87 },
    { company: 'Axon Enterprise Systems', value: '$280,000', stage: 'Proposal', owner: 'R. Torres', days: 38, score: 74 },
    { company: 'Corvus Data Corp', value: '$195,000', stage: 'Discovery', owner: 'D. Kim', days: 21, score: 68 },
    { company: 'Vantage Analytics Inc.', value: '$340,000', stage: 'Negotiation', owner: 'S. Park', days: 67, score: 91 },
    { company: 'Nexova Industries', value: '$155,000', stage: 'Proposal', owner: 'L. Chen', days: 29, score: 62 },
    { company: 'Orion Global Solutions', value: '$510,000', stage: 'Negotiation', owner: 'R. Torres', days: 82, score: 78 },
];

const teams = [
    { name: 'Enterprise East', quota: '$22M', attained: '$23.1M', pct: 105, reps: 8 },
    { name: 'Enterprise West', quota: '$20M', attained: '$19.4M', pct: 97, reps: 7 },
    { name: 'Mid-Market Global', quota: '$18M', attained: '$17.2M', pct: 96, reps: 9 },
    { name: 'Strategic Accounts', quota: '$24M', attained: '$24.5M', pct: 102, reps: 6 },
];

const scoreColor = (s: number) => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444';

export default function Crm01Dashboard() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 104px)', fontFamily: 'var(--font-primary)' }}>

                {/* Sidebar */}
                <aside style={{ background: 'var(--crm-sidebar-bg)', borderRight: '1px solid var(--crm-sidebar-border)', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 28, overflowY: 'auto' }}>
                    <div>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 14 }}>Pipeline Stages</p>
                        {pipelineStages.map((s) => (
                            <div key={s.name} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{s.count}</span>
                                </div>
                                <div style={{ height: 3, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ width: `${s.pct}%`, height: '100%', background: accent, borderRadius: 2, opacity: 0.8, transition: 'width 0.4s ease' }} />
                                </div>
                                <div style={{ marginTop: 3, fontSize: '0.6875rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20 }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 14 }}>Team Performance</p>
                        {teams.map((t) => (
                            <div key={t.name} style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{t.name}</span>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: t.pct >= 100 ? 'var(--status-success)' : 'var(--status-warning)' }}>{t.pct}%</span>
                                </div>
                                <div style={{ height: 2, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.min(t.pct, 100)}%`, height: '100%', background: t.pct >= 100 ? 'var(--status-success)' : 'var(--status-warning)', borderRadius: 2 }} />
                                </div>
                                <div style={{ marginTop: 3, fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{t.attained} / {t.quota} · {t.reps} reps</div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main */}
                <main style={{ padding: '32px 32px', overflowY: 'auto' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                        <div>
                            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Enterprise Dashboard</h1>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Q2 2026 · All Teams · Updated 4 min ago</p>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                                <option>Q2 2026</option><option>Q1 2026</option><option>Q4 2025</option>
                            </select>
                            <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                                <option>All Teams</option><option>Enterprise East</option><option>Enterprise West</option>
                            </select>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                        {metrics.slice(0, 8).map((m) => (
                            <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '18px 20px' }}>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>{m.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{m.value}</p>
                                <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, color: m.trend === 'up' ? 'var(--status-success)' : 'var(--status-danger)', background: m.trend === 'up' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', padding: '2px 7px', borderRadius: 4 }}>
                                    {m.trend === 'up' ? '+' : ''}{m.change}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                        {/* Revenue Trend */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                <div>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>ARR Trend</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>$84.2M</p>
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-success)', background: 'rgba(16,185,129,0.08)', padding: '3px 8px', borderRadius: 4 }}>+18% YoY</span>
                            </div>
                            {/* SVG Area Chart */}
                            <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="arrGrad01" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
                                        <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>
                                <path d="M0,85 L50,78 L100,70 L150,62 L200,55 L250,45 L300,32 L350,22 L400,10" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
                                <path d="M0,85 L50,78 L100,70 L150,62 L200,55 L250,45 L300,32 L350,22 L400,10 L400,100 L0,100 Z" fill="url(#arrGrad01)" />
                                {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => (
                                    <line key={i} x1={x} y1="0" x2={x} y2="100" stroke="var(--border-subtle)" strokeWidth="0.5" />
                                ))}
                            </svg>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                {['Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25', 'Q3\'25', 'Q4\'25', 'Q1\'26', 'Q2\'26'].map(q => (
                                    <span key={q} style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{q}</span>
                                ))}
                            </div>
                        </div>

                        {/* Pipeline by Stage Bar */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '22px 24px' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 20 }}>Pipeline by Stage</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {pipelineStages.map((s) => (
                                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: 90, flexShrink: 0 }}>{s.name}</span>
                                        <div style={{ flex: 1, height: 6, background: 'var(--border-card)', borderRadius: 3, overflow: 'hidden' }}>
                                            <div style={{ width: `${s.pct}%`, height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}99)`, borderRadius: 3 }} />
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, width: 52, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Deals Table */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Active Opportunities</p>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>412 total</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Account', 'Value', 'Stage', 'Owner', 'Days Open', 'AI Score'].map(h => (
                                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {deals.map((d, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}>
                                        <td style={{ padding: '13px 16px', fontWeight: 500, color: 'var(--text-primary)' }}>{d.company}</td>
                                        <td style={{ padding: '13px 16px', fontWeight: 600, color: accent, fontVariantNumeric: 'tabular-nums' }}>{d.value}</td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '3px 9px', borderRadius: 4, background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{d.stage}</span>
                                        </td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-secondary)' }}>{d.owner}</td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{d.days}d</td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 32, height: 4, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
                                                    <div style={{ width: `${d.score}%`, height: '100%', background: scoreColor(d.score), borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: scoreColor(d.score) }}>{d.score}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </CrmLayout>
    );
}
