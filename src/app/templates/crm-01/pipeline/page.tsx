import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pipeline — Monolithic Enterprise CRM',
    description: 'Multi-team enterprise opportunity pipeline management.',
};

const columns = [
    {
        name: 'Prospecting', count: 148, total: '$18.4M',
        deals: [
            { name: 'Zenith Capital Partners', value: '$380K', owner: 'S. Park', days: 5 },
            { name: 'Atlas Group Int\'l', value: '$240K', owner: 'R. Torres', days: 9 },
            { name: 'Stratum Technologies', value: '$190K', owner: 'D. Kim', days: 3 },
        ]
    },
    {
        name: 'Qualification', count: 97, total: '$14.2M',
        deals: [
            { name: 'Meridian Financial', value: '$420K', owner: 'S. Park', days: 18 },
            { name: 'Calloway & Assoc.', value: '$155K', owner: 'L. Chen', days: 22 },
            { name: 'Fortis Data Co.', value: '$290K', owner: 'R. Torres', days: 14 },
        ]
    },
    {
        name: 'Proposal', count: 51, total: '$9.6M',
        deals: [
            { name: 'Nexova Industries', value: '$510K', owner: 'D. Kim', days: 31 },
            { name: 'Corvus Data Corp', value: '$195K', owner: 'S. Park', days: 29 },
            { name: 'Vantage Analytics', value: '$340K', owner: 'L. Chen', days: 35 },
        ]
    },
    {
        name: 'Negotiation', count: 28, total: '$6.2M',
        deals: [
            { name: 'Orion Global Sol.', value: '$510K', owner: 'R. Torres', days: 82 },
            { name: 'Axon Enterprise', value: '$280K', owner: 'S. Park', days: 58 },
            { name: 'Meridian Corp', value: '$420K', owner: 'D. Kim', days: 72 },
        ]
    },
    {
        name: 'Closed Won', count: 14, total: '$3.1M',
        deals: [
            { name: 'Sigma Analytics', value: '$220K', owner: 'L. Chen', days: 91 },
            { name: 'Vertex Cloud Inc.', value: '$180K', owner: 'S. Park', days: 88 },
        ]
    },
];

const stageColors: Record<string, string> = {
    'Prospecting': '#64748b', 'Qualification': '#3b82f6', 'Proposal': '#8b5cf6', 'Negotiation': '#f59e0b', 'Closed Won': '#10b981',
};

export default function Crm01Pipeline() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <div style={{ padding: '28px 32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Pipeline Board</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>338 active deals · $51.4M total pipeline value</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                            <option>All Teams</option><option>Enterprise East</option>
                        </select>
                        <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                            <option>All Owners</option><option>S. Park</option>
                        </select>
                    </div>
                </div>

                {/* Stage Summary Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
                    {columns.map(c => (
                        <div key={c.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '14px 16px', borderTop: `2px solid ${stageColors[c.name]}` }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>{c.name}</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 2, fontVariantNumeric: 'tabular-nums' }}>{c.total}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.count} deals</p>
                        </div>
                    ))}
                </div>

                {/* Kanban Board */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, overflowX: 'auto' }}>
                    {columns.map(col => (
                        <div key={col.name} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 10, padding: 14, minWidth: 200 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: stageColors[col.name], display: 'inline-block' }} />
                                    {col.name}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 7px', borderRadius: 4 }}>{col.count}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {col.deals.map((d, i) => (
                                    <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 7, padding: '12px 13px', cursor: 'pointer', transition: 'border-color 0.15s', borderLeft: `2px solid ${stageColors[col.name]}30` }}>
                                        <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>{d.name}</p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: accent, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{d.value}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{d.owner}</span>
                                            <span style={{ fontSize: '0.6875rem', color: d.days > 60 ? 'var(--status-danger)' : d.days > 30 ? 'var(--status-warning)' : 'var(--text-muted)' }}>{d.days}d</span>
                                        </div>
                                    </div>
                                ))}
                                <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px dashed var(--border-card)', borderRadius: 7, fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    + {col.count - col.deals.length} more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
