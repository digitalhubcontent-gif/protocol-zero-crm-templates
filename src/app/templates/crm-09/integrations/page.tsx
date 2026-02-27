'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#3b82f6';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: '20px 24px' };

const CATEGORIES = [
    {
        name: 'ERP',
        integrations: [
            { name: 'SAP', desc: 'Revenue recognition sync for enterprise contracts', status: 'connected' as const },
            { name: 'Oracle NetSuite', desc: 'GL + AR bi-directional reconciliation', status: 'connected' as const },
            { name: 'Microsoft Dynamics', desc: 'Financial data pipeline for multi-division reporting', status: 'available' as const },
        ],
    },
    {
        name: 'Financial Systems',
        integrations: [
            { name: 'Workday Financials', desc: 'Plan vs actual automated sync, variance calculation', status: 'connected' as const },
            { name: 'CashbackPro', desc: 'Rewards and cashback revenue stream reconciliation', status: 'connected' as const },
            { name: 'Anaplan', desc: 'FP&A model sync for board-level ARR projections', status: 'available' as const },
        ],
    },
    {
        name: 'BI Platforms',
        integrations: [
            { name: 'Tableau', desc: 'Board deck export as live data feed', status: 'connected' as const },
            { name: 'Power BI', desc: 'Executive dashboard embedding', status: 'connected' as const },
            { name: 'Looker', desc: 'Real-time revenue data mart integration', status: 'available' as const },
        ],
    },
    {
        name: 'Compliance',
        integrations: [
            { name: 'Salesforce', desc: 'CRM data sync with audit trail preservation', status: 'connected' as const },
            { name: 'Veeva', desc: 'Regulated vertical compliance sync', status: 'available' as const },
        ],
    },
    {
        name: 'Communication',
        integrations: [
            { name: 'Zoom', desc: 'Exec meeting logging and sentiment analysis', status: 'connected' as const },
            { name: 'Microsoft Teams', desc: 'Strategic interaction capture and classification', status: 'connected' as const },
        ],
    },
];

function IntegrationsContent() {
    const [hoveredInt, setHoveredInt] = useState<string | null>(null);
    const statusConfig = { connected: { color: '#22c55e', label: 'Connected' }, available: { color: 'var(--text-muted)', label: 'Available' } };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>Enterprise Infrastructure</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>ERP · Financial Systems · BI Platforms · Compliance · Communication</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { label: 'Connected Integrations', value: '8', color: '#22c55e' },
                        { label: 'Data Sync Health', value: '99.8%', color: accent },
                        { label: 'Last Sync', value: '2m ago', color: 'var(--text-muted)' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {/* Integration Categories */}
                {CATEGORIES.map(cat => (
                    <div key={cat.name} style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${accent}15` }}>
                            {cat.name}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            {cat.integrations.map(int => {
                                const cfg = statusConfig[int.status];
                                const isHov = hoveredInt === `${cat.name}-${int.name}`;
                                return (
                                    <div key={int.name}
                                        onMouseEnter={() => setHoveredInt(`${cat.name}-${int.name}`)}
                                        onMouseLeave={() => setHoveredInt(null)}
                                        style={{
                                            ...card, transition: 'all 0.2s', cursor: 'pointer',
                                            borderColor: isHov ? `${accent}40` : 'rgba(59,130,246,0.1)',
                                            transform: isHov ? 'translateY(-2px)' : 'none',
                                        }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{int.name}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
                                                <span style={{ fontSize: '0.5rem', color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{int.desc}</p>
                                        {int.status === 'available' && (
                                            <button style={{ marginTop: 12, padding: '5px 12px', borderRadius: 4, fontSize: '0.5625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer' }}>Connect →</button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Integrations09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-09');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <IntegrationsContent />
        </CrmLayout>
    );
}
