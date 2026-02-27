import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activity — Monolithic Enterprise CRM',
    description: 'Team activity log and engagement tracking.',
};

const activities = [
    { type: 'call', user: 'S. Park', action: 'Discovery call with Meridian Financial — confirmed $420K budget, multi-year contract discussed', timestamp: '10:24 AM', company: 'Meridian Financial' },
    { type: 'email', user: 'R. Torres', action: 'Proposal sent to Orion Global Solutions — 3-tier pricing, $510K ACV', timestamp: '9:02 AM', company: 'Orion Global' },
    { type: 'meeting', user: 'D. Kim', action: 'Executive QBR with Vantage Analytics — renewal confirmed, expansion discussion initiated', timestamp: '8:30 AM', company: 'Vantage Analytics' },
    { type: 'deal', user: 'L. Chen', action: 'Sigma Analytics advanced to Closed Won — $220,000 ARR signed', timestamp: 'Yesterday 4:12 PM', company: 'Sigma Analytics' },
    { type: 'note', user: 'S. Park', action: 'Nexova Industries: Champion contact changed to CFO, updated strategy for CFO-level pitch', timestamp: 'Yesterday 2:45 PM', company: 'Nexova Industries' },
    { type: 'call', user: 'R. Torres', action: 'Intro call with Fortis Data Co. — technical team engaged, strong ICP fit confirmed', timestamp: 'Yesterday 11:00 AM', company: 'Fortis Data' },
    { type: 'email', user: 'D. Kim', action: 'Follow-up sent to Corvus Data Corp — addressed technical evaluation concerns', timestamp: '2d ago', company: 'Corvus Data' },
    { type: 'meeting', user: 'L. Chen', action: 'Axon Systems demo — positive signal from CTO, next step: procurement review', timestamp: '2d ago', company: 'Axon Systems' },
    { type: 'deal', user: 'S. Park', action: 'Atlas Group entered Qualification — $240K opportunity flagged by SDR', timestamp: '3d ago', company: 'Atlas Group' },
    { type: 'note', user: 'R. Torres', action: 'Zenith Capital risk assessment: deal stalled, scheduling exec alignment call next week', timestamp: '3d ago', company: 'Zenith Capital' },
];

const typeConfig: Record<string, { icon: string; color: string }> = {
    call: { icon: 'C', color: '#3b82f6' },
    email: { icon: 'E', color: '#8b5cf6' },
    meeting: { icon: 'M', color: '#10b981' },
    deal: { icon: 'D', color: '#f59e0b' },
    note: { icon: 'N', color: '#64748b' },
};

export default function Crm01Activity() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Activity Log</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>All team interactions · Updated in real time</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                            <option>All Types</option><option>Calls</option><option>Emails</option><option>Meetings</option>
                        </select>
                        <select style={{ padding: '8px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', outline: 'none' }}>
                            <option>All Reps</option><option>S. Park</option><option>R. Torres</option>
                        </select>
                    </div>
                </div>

                {/* Activity Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
                    {[
                        { type: 'Calls', count: 48, period: 'This week', color: '#3b82f6' },
                        { type: 'Emails', count: 124, period: 'This week', color: '#8b5cf6' },
                        { type: 'Meetings', count: 27, period: 'This week', color: '#10b981' },
                        { type: 'Deals Updated', count: 18, period: 'This week', color: '#f59e0b' },
                        { type: 'Notes Added', count: 34, period: 'This week', color: '#64748b' },
                    ].map(s => (
                        <div key={s.type} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 9, padding: '16px 18px', borderTop: `2px solid ${s.color}` }}>
                            <p style={{ fontSize: '1.375rem', fontWeight: 700, color: s.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.count}</p>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 2 }}>{s.type}</p>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{s.period}</p>
                        </div>
                    ))}
                </div>

                {/* Activity Feed */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Recent Activity</p>
                    </div>

                    <div style={{ padding: '8px 0' }}>
                        {activities.map((a, i) => {
                            const cfg = typeConfig[a.type];
                            return (
                                <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 24px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'flex-start' }}>
                                    {/* Icon */}
                                    <div style={{ width: 34, height: 34, borderRadius: 8, background: `${cfg.color}18`, border: `1px solid ${cfg.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: cfg.color }}>{cfg.icon}</span>
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 6 }}>{a.action}</p>
                                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{a.user}</span>
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{a.company}</span>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }}>{a.timestamp}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
