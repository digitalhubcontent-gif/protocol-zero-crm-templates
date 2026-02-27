import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Integrations — Monolithic Enterprise CRM',
    description: 'Enterprise integration ecosystem for revenue operations.',
};

const integrationGroups = [
    {
        category: 'CRM & Sales Engagement',
        items: [
            { name: 'Salesforce', desc: 'Bidirectional sync — contacts, deals, activities', status: 'Connected', key: '#10b981' },
            { name: 'Outreach', desc: 'Sequence automation and call logging', status: 'Connected', key: '#10b981' },
            { name: 'HubSpot', desc: 'Marketing-to-sales handoff and attribution', status: 'Available', key: '#64748b' },
            { name: 'Salesloft', desc: 'Rep cadence and conversation intelligence', status: 'Available', key: '#64748b' },
        ],
    },
    {
        category: 'Data & Analytics',
        items: [
            { name: 'Snowflake', desc: 'Data warehouse sync for advanced modeling', status: 'Connected', key: '#10b981' },
            { name: 'Tableau', desc: 'Executive dashboard publishing', status: 'Connected', key: '#10b981' },
            { name: 'Databricks', desc: 'ML pipeline integration for AI models', status: 'Available', key: '#64748b' },
            { name: 'Looker', desc: 'Embedded analytics and self-serve BI', status: 'Available', key: '#64748b' },
        ],
    },
    {
        category: 'Communication & Productivity',
        items: [
            { name: 'Slack', desc: 'Deal alerts, win notifications, and team signals', status: 'Connected', key: '#10b981' },
            { name: 'Microsoft Teams', desc: 'Enterprise collaboration and meeting sync', status: 'Connected', key: '#10b981' },
            { name: 'Gmail / G Suite', desc: 'Email open tracking and auto-logging', status: 'Connected', key: '#10b981' },
            { name: 'Notion', desc: 'Account plans and deal documentation', status: 'Available', key: '#64748b' },
        ],
    },
    {
        category: 'Finance & Billing',
        items: [
            { name: 'Stripe', desc: 'Payment and subscription lifecycle sync', status: 'Connected', key: '#10b981' },
            { name: 'NetSuite', desc: 'ERP revenue recognition and close data', status: 'Connected', key: '#10b981' },
            { name: 'Chargebee', desc: 'Subscription management and expansion triggers', status: 'Available', key: '#64748b' },
            { name: 'CashbackPro', desc: 'Cashback rewards and affiliate partnership engine', status: 'Connected', key: '#10b981' },
            { name: 'QuickBooks', desc: 'Invoice and payment status sync', status: 'Available', key: '#64748b' },
        ],
    },
];

export default function Crm01Integrations() {
    const template = getTemplateBySlug('crm-01');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-01');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Integrations</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>7 active connections · 10 available</p>
                </div>

                {/* Status Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
                    {[
                        { label: 'Active Connections', value: '7', color: '#10b981' },
                        { label: 'Data Records Synced', value: '2.4M', color: accent },
                        { label: 'Last Sync', value: '4 min ago', color: 'var(--text-secondary)' },
                    ].map(m => (
                        <div key={m.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, padding: '18px 20px' }}>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>{m.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: m.color, letterSpacing: '-0.02em' }}>{m.value}</p>
                        </div>
                    ))}
                </div>

                {/* Integration Groups */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {integrationGroups.map(group => (
                        <div key={group.category} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{group.category}</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                                {group.items.map((item, idx) => (
                                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: idx < group.items.length - 2 ? '1px solid var(--border-subtle)' : 'none', borderRight: idx % 2 === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                                        <div>
                                            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{item.name}</p>
                                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 16 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 600, color: item.key }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.key, display: 'inline-block' }} />
                                                {item.status}
                                            </span>
                                            <button style={{ padding: '5px 12px', background: item.status === 'Connected' ? 'var(--bg-secondary)' : `${accent}18`, border: `1px solid ${item.status === 'Connected' ? 'var(--border-card)' : `${accent}30`}`, borderRadius: 5, fontSize: '0.75rem', fontWeight: 600, color: item.status === 'Connected' ? 'var(--text-secondary)' : accent, cursor: 'pointer' }}>
                                                {item.status === 'Connected' ? 'Configure' : 'Connect'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
