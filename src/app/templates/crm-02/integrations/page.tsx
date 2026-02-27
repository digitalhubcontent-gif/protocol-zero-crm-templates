import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Integrations — AI Command Center CRM',
    description: 'Data pipeline integrations for the AI Revenue Intelligence platform.',
};

const dataSources = [
    {
        category: 'DATA_INPUTS',
        items: [
            { key: 'SFDC', name: 'Salesforce', desc: 'Contact, deal, and activity data pipeline', status: 'CONNECTED', latency: '2s' },
            { key: 'OUTREACH', name: 'Outreach', desc: 'Sequence and call signal ingestion', status: 'CONNECTED', latency: '8s' },
            { key: 'GONG', name: 'Gong', desc: 'Conversation intelligence and call transcript AI', status: 'CONNECTED', latency: '15s' },
            { key: 'APOLLO', name: 'Apollo', desc: 'Contact enrichment and intent data source', status: 'AVAILABLE', latency: '—' },
        ],
    },
    {
        category: 'AI_INFRA',
        items: [
            { key: 'OPENAI', name: 'OpenAI', desc: 'Language model for transcript analysis and email scoring', status: 'CONNECTED', latency: '450ms' },
            { key: 'SNOWFLAKE', name: 'Snowflake', desc: 'Data warehouse for model training and feature store', status: 'CONNECTED', latency: '1.2s' },
            { key: 'DATABRICKS', name: 'Databricks', desc: 'MLflow model training and deployment pipeline', status: 'CONNECTED', latency: '—' },
            { key: 'PINECONE', name: 'Pinecone', desc: 'Vector database for semantic contact clustering', status: 'AVAILABLE', latency: '—' },
        ],
    },
    {
        category: 'ALERTING_&_SYNC',
        items: [
            { key: 'SLACK', name: 'Slack', desc: 'Real-time deal alert and AI digest delivery', status: 'CONNECTED', latency: '200ms' },
            { key: 'TEAMS', name: 'Microsoft Teams', desc: 'Enterprise collaboration alert routing', status: 'CONNECTED', latency: '350ms' },
            { key: 'STRIPE', name: 'Stripe', desc: 'Revenue event triggers from billing system', status: 'CONNECTED', latency: '4s' },
            { key: 'CASHBACKPRO', name: 'CashbackPro', desc: 'Rewards and cashback event signal pipeline', status: 'CONNECTED', latency: '3s' },
            { key: 'PAGERDUTY', name: 'PagerDuty', desc: 'Critical deal risk escalation routing', status: 'AVAILABLE', latency: '—' },
        ],
    },
];

export default function Crm02Integrations() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::DATA_INFRASTRUCTURE</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Integrations</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>9 active data pipelines · AI infrastructure connected · 0 errors</p>
                </div>

                {/* Status Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px 20px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 7, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#10b981' }}>ALL_CRITICAL_PIPELINES::NOMINAL</span>
                    </div>
                    {['DATA_INGESTED_TODAY: 2.4M records', 'SYNC_ERRORS: 0', 'API_QUOTA_USED: 34%'].map(s => (
                        <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>{s}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {dataSources.map(group => (
                        <div key={group.category} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${accent}12` }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>{group.category}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                {group.items.map((item, idx) => (
                                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: idx < 2 ? `1px solid ${accent}08` : 'none', borderRight: idx % 2 === 0 ? `1px solid ${accent}08` : 'none' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)' }}>{item.key}</span>
                                                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</p>
                                            </div>
                                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        </div>
                                        <div style={{ flexShrink: 0, marginLeft: 16, textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, justifyContent: 'flex-end' }}>
                                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.status === 'CONNECTED' ? '#10b981' : '#64748b' }} />
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: item.status === 'CONNECTED' ? '#10b981' : '#64748b' }}>{item.status}</span>
                                            </div>
                                            {item.latency !== '—' && (
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>latency: {item.latency}</span>
                                            )}
                                            <div style={{ marginTop: 6 }}>
                                                <button style={{ padding: '4px 10px', background: item.status === 'CONNECTED' ? 'rgba(255,255,255,0.03)' : `${accent}12`, border: `1px solid ${item.status === 'CONNECTED' ? accent + '20' : accent + '35'}`, borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, color: item.status === 'CONNECTED' ? `${accent}80` : accent, cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                                                    {item.status === 'CONNECTED' ? 'CONFIGURE' : 'CONNECT'}
                                                </button>
                                            </div>
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
