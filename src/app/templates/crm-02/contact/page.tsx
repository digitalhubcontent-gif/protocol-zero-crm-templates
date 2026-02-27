import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacts — AI Command Center CRM',
    description: 'AI-classified contact intelligence and buyer graph.',
};

const contacts = [
    { name: 'Alexandra Chen', company: 'Meridian Capital', role: 'VP Operations', archetype: 'Champion', score: 91, signals: 14, lastSignal: '2h ago', intent: 'High' },
    { name: 'Raj Patel', company: 'Orion Global', role: 'CTO', archetype: 'Technical Buyer', score: 78, signals: 9, lastSignal: '8h ago', intent: 'Medium' },
    { name: 'Sarah Kim', company: 'Vantage Analytics', role: 'CEO', archetype: 'Economic Buyer', score: 94, signals: 22, lastSignal: '45m ago', intent: 'Very High' },
    { name: 'Marcus Webb', company: 'Stratum Systems', role: 'Dir. of IT', archetype: 'Blocker', score: 34, signals: 2, lastSignal: '3d ago', intent: 'Low' },
    { name: 'Elena Rodriguez', company: 'Fortis Data', role: 'CFO', archetype: 'Economic Buyer', score: 67, signals: 7, lastSignal: '1d ago', intent: 'Medium' },
    { name: 'James Okafor', company: 'Sigma Cloud', role: 'CPO', archetype: 'Champion', score: 82, signals: 11, lastSignal: '4h ago', intent: 'High' },
    { name: 'Dana Torres', company: 'Atlas Finance', role: 'VP Finance', archetype: 'Coach', score: 58, signals: 5, lastSignal: '2d ago', intent: 'Low' },
    { name: 'Lena Fischer', company: 'Nexogen AI', role: 'CRO', archetype: 'Champion', score: 86, signals: 18, lastSignal: '3h ago', intent: 'High' },
];

const archetypeColor: Record<string, string> = {
    'Champion': '#10b981',
    'Economic Buyer': '#8b5cf6',
    'Technical Buyer': '#3b82f6',
    'Coach': '#f59e0b',
    'Blocker': '#ef4444',
};

const intentColor: Record<string, string> = {
    'Very High': '#10b981',
    'High': '#6ee7b7',
    'Medium': '#f59e0b',
    'Low': '#ef4444',
};

const scoreColor = (s: number) => s >= 80 ? '#10b981' : s >= 55 ? '#f59e0b' : '#ef4444';

export default function Crm02Contact() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::CONTACT_INTELLIGENCE</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Buyer Graph</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>AI-classified contacts by buying archetype · Real-time intent scoring</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { key: 'CHAMPIONS_IDENT', label: 'Champions identified', value: '142' },
                        { key: 'AVG_INTENT_SCORE', label: 'Avg intent score', value: '68/100' },
                        { key: 'HIGH_INTENT', label: 'High-intent contacts', value: '89' },
                        { key: 'AT_RISK', label: 'At-risk buyers', value: '34' },
                    ].map(m => (
                        <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>{m.key}</span>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Table */}
                <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}12` }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>BUYER_GRAPH::RANKED_BY_INTENT</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${accent}10` }}>
                                {['Name', 'Company', 'Archetype', 'Score', 'Signals', 'Intent', 'Last Signal'].map(h => (
                                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.sort((a, b) => b.score - a.score).map((c, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${accent}08`, cursor: 'pointer' }}>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500 }}>{c.name}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{c.company}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '3px 9px', borderRadius: 4, background: `${archetypeColor[c.archetype]}15`, color: archetypeColor[c.archetype] }}>{c.archetype}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 28, height: 3, background: `${accent}15`, borderRadius: 2 }}>
                                                <div style={{ width: `${c.score}%`, height: '100%', background: scoreColor(c.score), borderRadius: 2 }} />
                                            </div>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: scoreColor(c.score) }}>{c.score}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>{c.signals}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: intentColor[c.intent] }}>{c.intent}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.lastSignal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CrmLayout>
    );
}
