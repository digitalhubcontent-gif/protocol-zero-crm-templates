'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#8b5cf6';

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
        category: 'CRM & Pipeline',
        items: [
            { name: 'Salesforce', desc: 'Bi-directional opportunity sync · Behavioral field mapping · AI scoring write-back', connected: true, icon: '☁' },
            { name: 'HubSpot', desc: 'Contact sync · Deal stage alignment · Sequence triggers', connected: true, icon: '🔶' },
            { name: 'Pipedrive', desc: 'Pipeline stage import · Activity logging', connected: false, icon: '🔵' },
        ],
    },
    {
        category: 'Communication Intelligence',
        items: [
            { name: 'Gong', desc: 'Call transcript → sentiment extraction · Talk ratio analysis · Risk phrase detection', connected: true, icon: '🎙' },
            { name: 'Chorus', desc: 'Meeting NLP · Next-step commitment tracking', connected: true, icon: '🔊' },
            { name: 'Outreach', desc: 'Sequence performance → behavioral scoring', connected: false, icon: '📤' },
        ],
    },
    {
        category: 'Intent & Signal Data',
        items: [
            { name: 'Bombora', desc: '3rd-party intent → pipeline intent overlay · Category surge alerts', connected: true, icon: '📡' },
            { name: 'G2 Buyer Intent', desc: 'Product review engagement → warm lead signal', connected: true, icon: '⭐' },
            { name: 'LinkedIn Sales Nav', desc: 'Committee member tracking · Job change alerts', connected: false, icon: '💼' },
        ],
    },
    {
        category: 'Analytics & BI',
        items: [
            { name: 'CashbackPro', desc: 'Rewards behavior analytics · Purchase intent signal aggregation', connected: true, icon: '💰' },
            { name: 'Tableau', desc: 'Export behavioral dashboards · Custom visualization bridge', connected: false, icon: '📊' },
            { name: 'Looker', desc: 'Confidence model export · Cohort drill-down', connected: false, icon: '🔍' },
            { name: 'Snowflake', desc: 'Data warehouse behavioral event stream', connected: true, icon: '❄' },
        ],
    },
];

const DATA_FLOWS = [
    { source: 'Gong.io', target: 'Sentiment Engine', field: 'Call Transcript', delay: '< 2 min', color: accent },
    { source: 'Bombora', target: 'Intent Model', field: 'Topic Surge Score', delay: 'Daily', color: '#06b6d4' },
    { source: 'Salesforce', target: 'Confidence Layer', field: 'Stage + Close Date', delay: 'Real-time', color: '#10b981' },
    { source: 'G2 Intent', target: 'Behavioral Score', field: 'Review Engagement', delay: 'Hourly', color: '#f59e0b' },
];

function IntegrationsContent() {
    const [connected, setConnected] = useState<Record<string, boolean>>(
        Object.fromEntries(
            INTEGRATIONS.flatMap(g => g.items.map(i => [i.name, i.connected]))
        )
    );

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Behavioral Data Integration Hub
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        Signal sources · Data flows · Real-time behavior aggregation
                    </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Connected Sources', value: Object.values(connected).filter(Boolean).length, color: '#10b981' },
                        { label: 'Daily Signal Events', value: '4.8M', color: accent },
                        { label: 'Avg Latency', value: '< 90s', color: '#06b6d4' },
                        { label: 'Data Freshness', value: '99.7%', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {/* Integrations grid */}
                {INTEGRATIONS.map(group => (
                    <div key={group.category} style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 10 }}>
                            {group.category}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                            {group.items.map(item => {
                                const isConnected = connected[item.name];
                                return (
                                    <div key={item.name} style={{
                                        ...card,
                                        transition: 'all 0.2s',
                                        borderColor: isConnected ? '#10b98128' : 'var(--border-card)',
                                        cursor: 'default',
                                    }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = isConnected ? '#10b98145' : `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = isConnected ? '#10b98128' : 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                                            </div>
                                            <button
                                                onClick={() => setConnected(prev => ({ ...prev, [item.name]: !prev[item.name] }))}
                                                style={{
                                                    padding: '3px 10px', borderRadius: 10, cursor: 'pointer', fontSize: '0.5rem', fontWeight: 700, transition: 'all 0.15s',
                                                    background: isConnected ? '#10b98120' : `${accent}14`,
                                                    color: isConnected ? '#10b981' : accent,
                                                    border: `1px solid ${isConnected ? '#10b981' : accent}`,
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

                {/* Data flow diagram */}
                <div style={card}>
                    <div style={lbl}>Active Data Flow Map</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {DATA_FLOWS.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                <div style={{ fontSize: '0.625rem', fontWeight: 700, color: f.color, width: 100, flexShrink: 0 }}>{f.source}</div>
                                <div style={{ flex: 1, height: 2, background: `${f.color}30`, position: 'relative', overflow: 'hidden' }}>
                                    <div style={{
                                        position: 'absolute', height: '100%', background: f.color, width: 60,
                                        animation: `slideRight${i} 2s linear infinite`,
                                    }} />
                                </div>
                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', width: 100, textAlign: 'center' }}>{f.field}</div>
                                <div style={{ flex: 1, height: 2, background: `${f.color}30` }} />
                                <div style={{ fontSize: '0.625rem', fontWeight: 700, color: f.color, width: 120, flexShrink: 0 }}>{f.target}</div>
                                <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.45rem', fontWeight: 700, background: `${f.color}18`, color: f.color }}>{f.delay}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Integrations07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <IntegrationsContent />
        </CrmLayout>
    );
}
