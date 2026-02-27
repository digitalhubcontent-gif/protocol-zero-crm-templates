import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Automation — Monolithic Enterprise CRM',
    description: 'Revenue workflow automation and alert configuration.',
};

const workflows = [
    {
        name: 'At-Risk Deal Escalation',
        status: 'Active',
        trigger: 'Deal score drops below 50',
        action: 'Alert sales manager + schedule review call',
        ran: '14 times this week',
        color: '#ef4444',
    },
    {
        name: 'Stale Opportunity Alert',
        status: 'Active',
        trigger: 'No activity logged in 14 days',
        action: 'Notify rep + add follow-up task',
        ran: '31 times this week',
        color: '#f59e0b',
    },
    {
        name: 'Win Notification',
        status: 'Active',
        trigger: 'Deal stage moves to Closed Won',
        action: 'Post to Slack #wins + update forecasting model',
        ran: '8 times this week',
        color: '#10b981',
    },
    {
        name: 'Expansion Opportunity Trigger',
        status: 'Active',
        trigger: 'Account NRR > 120% for 2 consecutive quarters',
        action: 'Create expansion deal + notify CSM',
        ran: '4 times this week',
        color: '#8b5cf6',
    },
    {
        name: 'Multi-Year Contract Bonus',
        status: 'Active',
        trigger: 'Contract duration > 24 months on close',
        action: 'Trigger compensation workflow + notify finance',
        ran: '2 times this week',
        color: '#3b82f6',
    },
    {
        name: 'Large Deal Review Gate',
        status: 'Active',
        trigger: 'Deal value > $500K entering Proposal stage',
        action: 'Require VP approval before stage advance',
        ran: '3 times this week',
        color: '#06b6d4',
    },
];

export default function Crm01Automation() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Automation</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Revenue workflow automation · 6 active rules</p>
                    </div>
                    <button style={{ padding: '8px 18px', background: accent, border: 'none', borderRadius: 6, color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                        New Workflow
                    </button>
                </div>

                {/* Summary Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
                    {[
                        { label: 'Active Workflows', value: '6', sub: '0 paused' },
                        { label: 'Runs This Week', value: '62', sub: '+18% vs last week' },
                        { label: 'Avg Run Time', value: '1.4s', sub: 'All workflows' },
                    ].map(m => (
                        <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '18px 20px' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>{m.label}</p>
                            <p style={{ fontSize: '1.625rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Workflow List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {workflows.map(w => (
                        <div key={w.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start', borderLeft: `3px solid ${w.color}` }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{w.name}</p>
                                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>{w.status}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4 }}>Trigger</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{w.trigger}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4 }}>Action</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{w.action}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{w.ran}</p>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button style={{ padding: '5px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 5, fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Edit</button>
                                    <button style={{ padding: '5px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 5, fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Pause</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
