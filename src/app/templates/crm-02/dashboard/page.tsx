import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard — AI Command Center CRM',
    description: 'Unified AI intelligence command dashboard for autonomous revenue operations.',
};

const systemMetrics = [
    { key: 'ARR_LIVE', label: 'Annual Recurring Revenue', value: '$62.8M', delta: '+24%', status: 'nominal' },
    { key: 'WIN_RATE', label: 'AI-Adjusted Win Rate', value: '47.3%', delta: '+9.1pp', status: 'nominal' },
    { key: 'PIPELINE_HEALTH', label: 'Pipeline Health Index', value: '84/100', delta: '+12', status: 'nominal' },
    { key: 'DEAL_VELOCITY', label: 'Deal Velocity Score', value: '7.2', delta: '+1.4', status: 'nominal' },
    { key: 'MODEL_ACCURACY', label: 'Forecast Model Accuracy', value: '96.1%', delta: '+2.1pp', status: 'nominal' },
    { key: 'SIGNAL_QUEUE', label: 'Unprocessed Signals', value: '0', delta: 'All clear', status: 'nominal' },
];

const signals = [
    { priority: 'CRITICAL', account: 'Meridian Capital', signal: 'Champion contact changed — deal at risk, 72hr window', time: '3 min ago', score_delta: -18 },
    { priority: 'HIGH', account: 'Orion Systems', signal: 'Pricing page visited 4x in last 2 hours — buying signal detected', time: '11 min ago', score_delta: +22 },
    { priority: 'HIGH', account: 'Vantage Analytics', signal: 'Contract renewal prediction: 94% confidence — expand now', time: '28 min ago', score_delta: +15 },
    { priority: 'MEDIUM', account: 'Fortis Data Co.', signal: 'Competitor evaluation detected — SEMrush data confirms Salesforce trial', time: '1h ago', score_delta: -8 },
    { priority: 'MEDIUM', account: 'Sigma Cloud', signal: 'Executive engagement score +31 — CTO opened 3 emails in 24h', time: '2h ago', score_delta: +10 },
    { priority: 'LOW', account: 'Nexova Industries', signal: 'Stale opportunity — no activity logged in 21 days, auto-ping queued', time: '4h ago', score_delta: -3 },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
    CRITICAL: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    HIGH: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    MEDIUM: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    LOW: { color: '#64748b', bg: 'rgba(100,116,139,0.08)' },
};

export default function Crm02Dashboard() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '0' }}>

                {/* System Status Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px 32px', borderBottom: `1px solid ${accent}12`, background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#10b981', letterSpacing: '0.06em' }}>SYSTEM::NOMINAL</span>
                    </div>
                    {['AI_ENGINE::ACTIVE', 'SIGNALS::PROCESSING', 'FORECAST_MODEL::v4.1', 'LAST_SYNC::2m ago'].map(s => (
                        <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.05em' }}>{s}</span>
                    ))}
                </div>

                <div style={{ padding: '28px 32px' }}>

                    {/* Metric Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
                        {systemMetrics.map(m => (
                            <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1, background: `linear-gradient(90deg, ${accent}50, transparent)` }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>{m.key}</span>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 8 }}>{m.label}</p>
                                <p style={{ fontSize: '1.625rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{m.value}</p>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>{m.delta}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>

                        {/* Signal Queue */}
                        <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, overflow: 'hidden' }}>
                            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}12`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>SIGNAL_QUEUE::LIVE</span>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulse 2s infinite', boxShadow: `0 0 6px ${accent}` }} />
                            </div>
                            <div>
                                {signals.map((s, i) => {
                                    const pc = priorityConfig[s.priority];
                                    return (
                                        <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 20px', borderBottom: `1px solid ${accent}08`, alignItems: 'flex-start' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, color: pc.color, background: pc.bg, padding: '3px 8px', borderRadius: 3, flexShrink: 0, marginTop: 2 }}>{s.priority}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                                                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.account}</span>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: s.score_delta > 0 ? '#10b981' : '#ef4444' }}>
                                                        {s.score_delta > 0 ? `+${s.score_delta}` : s.score_delta} pts
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{s.signal}</p>
                                            </div>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', flexShrink: 0 }}>{s.time}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* AI Engine Status */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '20px' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em', display: 'block', marginBottom: 14 }}>AI_ENGINE::STATUS</span>
                                {[
                                    { module: 'Deal Scoring Engine', status: 'Active', last: '47s ago', accuracy: 96 },
                                    { module: 'Forecast Model v4.1', status: 'Active', last: '2m ago', accuracy: 94 },
                                    { module: 'Signal Processor', status: 'Active', last: '12s ago', accuracy: 99 },
                                    { module: 'Churn Predictor', status: 'Active', last: '1h ago', accuracy: 88 },
                                ].map(mod => (
                                    <div key={mod.module} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${accent}10` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{mod.module}</span>
                                            <span style={{ fontSize: '0.6875rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>{mod.status}</span>
                                        </div>
                                        <div style={{ height: 3, background: `${accent}15`, borderRadius: 2, overflow: 'hidden' }}>
                                            <div style={{ width: `${mod.accuracy}%`, height: '100%', background: accent, borderRadius: 2 }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Last run: {mod.last}</span>
                                            <span style={{ fontSize: '0.625rem', color: 'var(--text-accent)' }}>{mod.accuracy}% acc.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '20px' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>TODAY::ACTIONS_TAKEN</span>
                                {[
                                    { action: 'Deals re-scored', count: 84 },
                                    { action: 'Alerts dispatched', count: 12 },
                                    { action: 'Tasks auto-created', count: 7 },
                                    { action: 'Forecasts updated', count: 3 },
                                ].map(a => (
                                    <div key={a.action} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${accent}08` }}>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{a.action}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-accent)' }}>{a.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
