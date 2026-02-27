import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pipeline — AI Command Center CRM',
    description: 'AI-scored opportunity pipeline with autonomous deal intelligence.',
};

const stages = [
    {
        key: 'INBOUND', label: 'Inbound Qualified', count: 62, value: '$8.1M',
        deals: [
            { name: 'Nexogen AI', value: '$180K', score: 74, signal: 'High web engagement', owner: 'AUTO' },
            { name: 'Quantum Edge', value: '$240K', score: 81, signal: 'Pricing page visited 3x', owner: 'K. Ross' },
            { name: 'Vertex Cloud', value: '$95K', score: 58, signal: 'Email opened — no reply', owner: 'AUTO' },
        ]
    },
    {
        key: 'DISCOVERY', label: 'Discovery', count: 44, value: '$6.4M',
        deals: [
            { name: 'Meridian Capital', value: '$420K', score: 88, signal: 'Champion engaged', owner: 'S. Park' },
            { name: 'Stratum Systems', value: '$195K', score: 67, signal: 'Decision delayed', owner: 'K. Ross' },
            { name: 'Atlas Finance', value: '$310K', score: 79, signal: 'Technical eval in progress', owner: 'M. Bell' },
        ]
    },
    {
        key: 'PROPOSAL', label: 'Proposal-Sent', count: 29, value: '$5.2M',
        deals: [
            { name: 'Orion Global', value: '$510K', score: 83, signal: 'Proposal opened 6x', owner: 'S. Park' },
            { name: 'Fortis Data', value: '$290K', score: 71, signal: 'Legal review initiated', owner: 'M. Bell' },
        ]
    },
    {
        key: 'NEGOTIATE', label: 'Negotiation', count: 14, value: '$3.8M',
        deals: [
            { name: 'Vantage Analytics', value: '$340K', score: 91, signal: 'Contract review — close imm.', owner: 'K. Ross' },
            { name: 'Sigma Cloud', value: '$210K', score: 78, signal: 'Multi-year terms discussion', owner: 'S. Park' },
        ]
    },
];

const scoreColor = (s: number) => s >= 80 ? '#10b981' : s >= 65 ? '#f59e0b' : '#ef4444';

export default function Crm02Pipeline() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::PIPELINE_INTELLIGENCE</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>AI Pipeline Board</h1>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>149 active deals · All scored by AI engine · Live</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', padding: '5px 12px', border: `1px solid ${accent}30`, borderRadius: 4, color: 'var(--text-accent)' }}>AUTO-PRIORITIZED</span>
                        </div>
                    </div>
                </div>

                {/* Stage Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                    {stages.map(s => (
                        <div key={s.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 7, padding: '14px 16px', borderTop: `2px solid ${accent}50` }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>{s.key}</span>
                            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 2 }}>{s.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.count} deals</p>
                        </div>
                    ))}
                </div>

                {/* Kanban */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {stages.map(col => (
                        <div key={col.key} style={{ background: 'var(--bg-secondary)', border: `1px solid ${accent}12`, borderRadius: 8, padding: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${accent}12` }}>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{col.label}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-accent)' }}>{col.count}</span>
                            </div>
                            {col.deals.map((d, i) => (
                                <div key={i} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 6, padding: '12px 14px', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{d.name}</p>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: scoreColor(d.score) }}>{d.score}</span>
                                    </div>
                                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-accent)', marginBottom: 8 }}>{d.value}</p>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-accent)', marginBottom: 6 }}>{d.signal}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{d.owner}</span>
                                        <div style={{ width: 24, height: 3, background: `${accent}20`, borderRadius: 2 }}>
                                            <div style={{ width: `${d.score}%`, height: '100%', background: scoreColor(d.score), borderRadius: 2 }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
