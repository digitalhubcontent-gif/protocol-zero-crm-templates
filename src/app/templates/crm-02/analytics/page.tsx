import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Analytics — AI Command Center CRM',
    description: 'AI model performance analytics and revenue intelligence.',
};

const modelPerf = [
    { model: 'Deal Score Engine v4', accuracy: 96.1, precision: 94.2, recall: 91.8, f1: 93.0, training: '48h ago' },
    { model: 'Churn Prediction v3', accuracy: 88.4, precision: 87.1, recall: 85.6, f1: 86.3, training: '1w ago' },
    { model: 'Forecast LSTMv2', accuracy: 94.7, precision: 93.0, recall: 92.1, f1: 92.5, training: '24h ago' },
    { model: 'Expansion Trigger Classifier', accuracy: 91.2, precision: 89.4, recall: 88.7, f1: 89.0, training: '3d ago' },
];

const signalVolume = [
    { date: 'Mon', email: 142, web: 98, call: 34, deal: 18 },
    { date: 'Tue', email: 168, web: 114, call: 41, deal: 22 },
    { date: 'Wed', email: 189, web: 127, call: 38, deal: 19 },
    { date: 'Thu', email: 203, web: 145, call: 47, deal: 31 },
    { date: 'Fri', email: 177, web: 132, call: 42, deal: 27 },
    { date: 'Sat', email: 42, web: 28, call: 8, deal: 5 },
    { date: 'Sun', email: 31, web: 19, call: 3, deal: 2 },
];

const maxSignal = Math.max(...signalVolume.map(d => d.email + d.web + d.call + d.deal));

export default function Crm02Analytics() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 28 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: `${accent}`, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::AI_ANALYTICS</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>AI Model Performance</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Real-time model accuracy, signal classification, and behavioral intelligence metrics</p>
                </div>

                {/* Top Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                    {[
                        { key: 'SIGNALS_TODAY', value: '2,847', label: 'Signals processed today' },
                        { key: 'MODEL_UPTIME', value: '99.97%', label: 'AI engine uptime' },
                        { key: 'AVG_ACCURACY', value: '92.6%', label: 'Cross-model accuracy' },
                        { key: 'ACTIONS_AUTO', value: '94', label: 'Autonomous actions taken' },
                    ].map(m => (
                        <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>{m.key}</span>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.label}</p>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                    {/* Model Performance Table */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}12` }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>MODEL_REGISTRY::PERFORMANCE</span>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${accent}10` }}>
                                    {['Model', 'Accuracy', 'F1', 'Training'].map(h => (
                                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {modelPerf.map(m => (
                                    <tr key={m.model} style={{ borderBottom: `1px solid ${accent}08` }}>
                                        <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.8125rem' }}>{m.model}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 36, height: 3, background: `${accent}20`, borderRadius: 2 }}>
                                                    <div style={{ width: `${m.accuracy}%`, height: '100%', background: accent, borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-accent)' }}>{m.accuracy}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{m.f1}%</td>
                                        <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.training}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Signal Volume Chart */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '20px' }}>
                        <div style={{ marginBottom: 20 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>SIGNAL_VOLUME::7D</span>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Processed signals by type — last 7 days</p>
                        </div>
                        {/* Stacked bar chart */}
                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 130, marginBottom: 10 }}>
                            {signalVolume.map(d => {
                                const total = d.email + d.web + d.call + d.deal;
                                const h = (total / maxSignal) * 120;
                                return (
                                    <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', height: h, gap: 0 }}>
                                        <div style={{ flex: d.email / total, background: `${accent}90`, borderRadius: '2px 2px 0 0' }} />
                                        <div style={{ flex: d.web / total, background: `${accent}60` }} />
                                        <div style={{ flex: d.call / total, background: `${accent}40` }} />
                                        <div style={{ flex: d.deal / total, background: '#10b981', borderRadius: '2px 2px 0 0' }} />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {signalVolume.map(d => (
                                <div key={d.date} style={{ flex: 1, textAlign: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{d.date}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                            {[['Email', `${accent}90`], ['Web', `${accent}60`], ['Call', `${accent}40`], ['Deal Event', '#10b981']].map(([l, c]) => (
                                <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c as string }} />
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{l as string}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
