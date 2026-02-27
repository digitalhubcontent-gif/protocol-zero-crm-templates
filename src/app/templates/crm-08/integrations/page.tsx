'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#06b6d4';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const lbl: React.CSSProperties = {
    fontSize: '0.6875rem', fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
};

const INTEGRATIONS = [
    {
        category: 'Signal Sources',
        items: [
            { name: 'Bombora', desc: 'Company-level intent surge · 7,000+ B2B topics · Real-time category alerts', connected: true, icon: '📡' },
            { name: 'CashbackPro', desc: 'Purchase intent signal from rewards and cashback behavior analysis', connected: true, icon: '💰' },
            { name: 'G2 Buyer Intent', desc: 'Product category page engagement → warm signal', connected: true, icon: '⭐' },
            { name: '6sense', desc: 'AI intent scoring · Account-level predictive insights', connected: false, icon: '🔮' },
        ],
    },
    {
        category: 'PLG & Product Data',
        items: [
            { name: 'Segment', desc: 'Unified product event stream · Feature activation telemetry', connected: true, icon: '⚡' },
            { name: 'Amplitude', desc: 'Cohort analysis · Feature engagement depth', connected: true, icon: '📊' },
            { name: 'Mixpanel', desc: 'User-level funnel events → PLG signal enrichment', connected: false, icon: '🔥' },
        ],
    },
    {
        category: 'CRM & Pipeline',
        items: [
            { name: 'Salesforce', desc: 'Bi-directional signal sync · PLG-sourced opportunity creation', connected: true, icon: '☁' },
            { name: 'HubSpot', desc: 'Contact enrichment · Sequence trigger from signal events', connected: false, icon: '🔶' },
            { name: 'Outreach', desc: 'Surge-triggered cadence activation', connected: false, icon: '📤' },
        ],
    },
    {
        category: 'Analytics & Data Warehouse',
        items: [
            { name: 'Snowflake', desc: 'Raw signal event stream · Attribution model data lake', connected: true, icon: '❄' },
            { name: 'dbt', desc: 'Signal transformation models · ICP scoring pipeline', connected: false, icon: '🔧' },
            { name: 'Looker', desc: 'Custom signal dashboards · Exec BI layer', connected: false, icon: '🔍' },
        ],
    },
];

function IntegrationsContent() {
    const [connected, setConnected] = useState<Record<string, boolean>>(
        Object.fromEntries(INTEGRATIONS.flatMap(g => g.items.map(i => [i.name, i.connected])))
    );

    const connectedCount = Object.values(connected).filter(Boolean).length;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal Source Integration Hub</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>1st & 3rd-party intent · PLG product data · CRM sync</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
                    {[
                        { label: 'Connected Sources', value: connectedCount, color: '#22c55e' },
                        { label: 'Signal Events/Day', value: '4.8M', color: accent },
                        { label: 'Freshness', value: '< 2 min', color: '#f59e0b' },
                        { label: 'API Uptime', value: '99.9%', color: '#8b5cf6' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default' }}>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {INTEGRATIONS.map(group => (
                    <div key={group.category} style={{ marginBottom: 22 }}>
                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{group.category}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                            {group.items.map(item => {
                                const isConnected = connected[item.name];
                                return (
                                    <div key={item.name}
                                        style={{
                                            ...card,
                                            borderColor: isConnected ? '#22c55e30' : 'var(--border-card)',
                                            transition: 'all 0.2s', cursor: 'default',
                                        }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.borderColor = isConnected ? '#22c55e50' : `${accent}40`; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = isConnected ? '#22c55e30' : 'var(--border-card)'; }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                                                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{item.name}</span>
                                            </div>
                                            <button
                                                onClick={() => setConnected(prev => ({ ...prev, [item.name]: !prev[item.name] }))}
                                                style={{
                                                    padding: '3px 10px', borderRadius: 10, cursor: 'pointer', fontSize: '0.45rem', fontWeight: 700, transition: 'all 0.15s',
                                                    background: isConnected ? '#22c55e20' : `${accent}14`,
                                                    color: isConnected ? '#22c55e' : accent,
                                                    border: `1px solid ${isConnected ? '#22c55e' : accent}`,
                                                }}>
                                                {isConnected ? '✓ Connected' : '+ Connect'}
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Data pipeline diagram */}
                <div style={card}>
                    <div style={lbl}>Signal Processing Pipeline</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto', padding: '4px 0' }}>
                        {[
                            { step: '1', label: 'Signal Ingestion', desc: 'Bombora, G2, Segment', color: '#8b5cf6' },
                            { step: '→', label: '', desc: '', color: 'transparent' },
                            { step: '2', label: 'Normalization', desc: 'Schema unification', color: accent },
                            { step: '→', label: '', desc: '', color: 'transparent' },
                            { step: '3', label: 'ICP Scoring', desc: 'ML model', color: '#22c55e' },
                            { step: '→', label: '', desc: '', color: 'transparent' },
                            { step: '4', label: 'Surge Detection', desc: 'Threshold alerting', color: '#f59e0b' },
                            { step: '→', label: '', desc: '', color: 'transparent' },
                            { step: '5', label: 'CRM Sync', desc: 'Salesforce write-back', color: '#ef4444' },
                        ].map((s, i) => (
                            s.step === '→' ? (
                                <div key={i} style={{ fontSize: '1.25rem', color: 'var(--text-muted)', flexShrink: 0 }}>→</div>
                            ) : (
                                <div key={i} style={{ padding: '12px 16px', background: `${s.color}10`, border: `1px solid ${s.color}30`, borderRadius: 8, textAlign: 'center', flexShrink: 0, minWidth: 100 }}>
                                    <div style={{ fontSize: '0.5rem', color: s.color, fontWeight: 800, marginBottom: 4 }}>STEP {s.step}</div>
                                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{s.label}</div>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Integrations08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <IntegrationsContent />
        </CrmLayout>
    );
}
