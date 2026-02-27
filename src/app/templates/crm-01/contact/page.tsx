import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacts — Monolithic Enterprise CRM',
    description: 'Enterprise account and contact management at scale.',
};

const contacts = [
    { id: 'c1', name: 'Alexandra Chen', company: 'Meridian Financial Group', role: 'VP of Operations', status: 'Active', value: '$420,000', lastContact: '2d ago', score: 88, threads: 4 },
    { id: 'c2', name: 'Marcus Webb', company: 'Axon Enterprise Systems', role: 'CTO', status: 'Negotiation', value: '$280,000', lastContact: '5d ago', score: 74, threads: 2 },
    { id: 'c3', name: 'Sophia Laurent', company: 'Corvus Data Corp', role: 'Director of Engineering', status: 'Proposal', value: '$195,000', lastContact: '1w ago', score: 61, threads: 1 },
    { id: 'c4', name: 'James Okafor', company: 'Vantage Analytics', role: 'CEO', status: 'Active', value: '$340,000', lastContact: 'Today', score: 92, threads: 5 },
    { id: 'c5', name: 'Elena Rodriguez', company: 'Nexova Industries', role: 'CFO', status: 'At Risk', value: '$510,000', lastContact: '3w ago', score: 38, threads: 1 },
    { id: 'c6', name: 'Daniel Kim', company: 'Orion Global Solutions', role: 'VP Finance', status: 'Negotiation', value: '$340,000', lastContact: '1d ago', score: 79, threads: 3 },
    { id: 'c7', name: 'Laura Chen', company: 'Sigma Analytics', role: 'CRO', status: 'Active', value: '$220,000', lastContact: 'Today', score: 85, threads: 3 },
    { id: 'c8', name: 'Ryan Park', company: 'Fortis Data Co.', role: 'CISO', status: 'Discovery', value: '$290,000', lastContact: '3d ago', score: 67, threads: 2 },
];

const statusBadge: Record<string, { bg: string; color: string }> = {
    'Active': { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    'Negotiation': { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
    'Proposal': { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
    'Discovery': { bg: 'rgba(6,182,212,0.1)', color: '#06b6d4' },
    'At Risk': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};
const scoreColor = (s: number) => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444';

export default function Crm01Contact() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor={accent}>
            <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Contacts</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>8,241 total accounts · 23,411 contacts</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input type="text" placeholder="Search contacts..." style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none', width: 220 }} />
                        <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                            <option>All Status</option><option>Active</option><option>At Risk</option>
                        </select>
                    </div>
                </div>

                {/* Top Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { label: 'Avg Engagement Score', value: '72', sub: 'Out of 100' },
                        { label: 'Multi-Thread Rate', value: '61%', sub: '2+ contacts per deal' },
                        { label: 'At-Risk Contacts', value: '142', sub: 'No contact > 14d' },
                        { label: 'Exec Coverage', value: '78%', sub: 'C-suite identified' },
                    ].map(m => (
                        <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '16px 20px' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>{m.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Table */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Key Accounts</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {['All', 'Active', 'At Risk', 'Negotiation'].map(f => (
                                <button key={f} style={{ padding: '4px 12px', background: f === 'All' ? `${accent}20` : 'transparent', border: `1px solid ${f === 'All' ? accent : 'var(--border-card)'}`, borderRadius: 4, fontSize: '0.75rem', fontWeight: 500, color: f === 'All' ? accent : 'var(--text-muted)', cursor: 'pointer' }}>{f}</button>
                            ))}
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                {['Name', 'Company', 'Role', 'Status', 'Deal Value', 'Score', 'Threads', 'Last Contact'].map(h => (
                                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c) => {
                                const sb = statusBadge[c.status] ?? { bg: 'var(--bg-secondary)', color: 'var(--text-muted)' };
                                return (
                                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <td style={{ padding: '13px 16px', fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-secondary)' }}>{c.company}</td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{c.role}</td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '3px 9px', borderRadius: 4, background: sb.bg, color: sb.color }}>{c.status}</span>
                                        </td>
                                        <td style={{ padding: '13px 16px', fontWeight: 600, color: accent, fontVariantNumeric: 'tabular-nums' }}>{c.value}</td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 28, height: 3, background: 'var(--border-card)', borderRadius: 2 }}>
                                                    <div style={{ width: `${c.score}%`, height: '100%', background: scoreColor(c.score), borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: scoreColor(c.score) }}>{c.score}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-muted)', textAlign: 'center' }}>{c.threads}</td>
                                        <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{c.lastContact}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </CrmLayout>
    );
}
