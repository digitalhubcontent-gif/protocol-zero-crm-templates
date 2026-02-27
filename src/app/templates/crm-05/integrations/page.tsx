'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { INTEGRATIONS } from '../data';

const accent = '#58a6ff';

function IntegrationsContent() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [syncPulse, setSyncPulse] = useState(true);

    const cats = ['All', 'Dialers', 'Sequences', 'Calendar', 'CRM', 'Intelligence'];
    const filtered = activeCategory === 'All' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.category === activeCategory);
    const connected = INTEGRATIONS.filter(i => i.status === 'connected');

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Execution Stack</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Connected tools · Sync status · Signal sources</p>
                </div>

                {/* Sync ribbon */}
                <div style={{
                    background: 'var(--bg-card)', border: `1px solid ${accent}20`,
                    borderRadius: 8, padding: '12px 18px', marginBottom: 20,
                    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3fb950', boxShadow: `0 0 ${syncPulse ? 8 : 4}px #3fb950`, transition: 'box-shadow 0.5s' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3fb950' }}>Live Sync Active</span>
                    </div>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {[
                            { label: 'Connected', value: connected.length },
                            { label: 'Records synced', value: '28,416' },
                            { label: 'Last activity', value: '12s ago' },
                        ].map(s => (
                            <div key={s.label} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: accent }}>{s.value}</span>
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category filter */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                    {cats.map(c => (
                        <button key={c} onClick={() => setActiveCategory(c)} style={{
                            padding: '5px 12px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                            background: activeCategory === c ? accent : 'transparent',
                            color: activeCategory === c ? 'var(--bg-primary)' : 'var(--text-secondary)',
                            border: `1px solid ${activeCategory === c ? accent : 'var(--border-card)'}`,
                            transition: 'all 0.15s',
                        }}>{c}</button>
                    ))}
                </div>

                {/* Integration cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {filtered.map(intg => {
                        const isConnected = intg.status === 'connected';
                        return (
                            <div key={intg.name} style={{
                                background: isConnected ? `${accent}06` : 'var(--bg-card)',
                                border: `1px solid ${isConnected ? `${accent}25` : 'var(--border-card)'}`,
                                borderRadius: 8, padding: '16px 16px',
                                cursor: 'default', transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = isConnected ? `${accent}25` : 'var(--border-card)'; }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 8, background: isConnected ? `${accent}18` : 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: accent }}>
                                        {intg.name.charAt(0)}
                                    </div>
                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: isConnected ? '#3fb950' : 'var(--text-muted)', background: isConnected ? '#3fb95018' : 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 3 }}>
                                        {isConnected ? '● Connected' : '○ Available'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{intg.name}</div>
                                <div style={{ fontSize: '0.5625rem', color: accent, background: `${accent}10`, display: 'inline-block', padding: '1px 6px', borderRadius: 3, fontWeight: 600, marginBottom: 8 }}>{intg.category}</div>
                                {isConnected ? (
                                    <>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', marginBottom: 2 }}>{intg.records}</div>
                                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Synced {intg.lastSync}</div>
                                    </>
                                ) : (
                                    <button style={{
                                        width: '100%', padding: '6px 0', marginTop: 4,
                                        background: `${accent}10`, color: accent,
                                        border: `1px solid ${accent}25`, borderRadius: 5,
                                        cursor: 'pointer', fontSize: '0.625rem', fontWeight: 700,
                                        transition: 'all 0.15s',
                                    }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}22`; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}10`; }}>
                                        + Connect
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Integrations05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <IntegrationsContent />
        </CrmLayout>
    );
}
