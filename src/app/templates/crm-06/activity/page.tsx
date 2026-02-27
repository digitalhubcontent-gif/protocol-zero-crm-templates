'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { AI_ACTIVITY, AI_DEALS } from '../data';

const accent = '#a78bfa';

const outcomeColor = (o: string) =>
    o === 'Advanced' ? '#3fb950' : o === 'Stalled' ? '#d29922' : '#f85149';

const triggerStyle = (t: string): React.CSSProperties => ({
    fontSize: '0.4375rem',
    fontWeight: 700,
    padding: '2px 5px',
    borderRadius: 3,
    background: t === 'ai' ? `${accent}18` : 'rgba(88,166,255,0.15)',
    color: t === 'ai' ? accent : '#58a6ff',
});

function ActivityContent() {
    const [activeTab, setActiveTab] = useState<'All' | 'AI' | 'Human'>('All');

    const filtered = AI_ACTIVITY.filter(a =>
        activeTab === 'All' || a.trigger === activeTab.toLowerCase()
    );

    const kpis = [
        { label: 'AI Signals (7d)', value: '284', icon: '⚡' },
        { label: 'Human Actions', value: '47', icon: '👤' },
        { label: 'Conf Events', value: '12', icon: '↑' },
        { label: 'Risk Events', value: '5', icon: '⚠' },
    ];

    // Score delta timeline: show deltas as bar
    const eventWithDeltas = AI_DEALS
        .filter(d => d.confidence !== 0)
        .map(d => ({
            account: d.account,
            delta: (d.momentum === 'accelerating' ? 1 : d.momentum === 'decelerating' ? -1 : 0) * Math.abs(d.confidence - 70),
        }));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal Event Stream</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI events · Human touches · Confidence impact</p>
                </div>

                {/* KPI row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                    {kpis.map(k => (
                        <div key={k.label} style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                            borderRadius: 8, padding: '12px 14px', textAlign: 'center',
                            cursor: 'default', transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>{k.icon}</div>
                            <div style={{ fontSize: '1.625rem', fontWeight: 800, color: accent, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{k.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
                    {/* Event feed */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-subtle)' }}>
                            {(['All', 'AI', 'Human'] as const).map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                    padding: '10px 18px', cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                    background: 'transparent', border: 'none',
                                    color: activeTab === tab ? accent : 'var(--text-secondary)',
                                    borderBottom: activeTab === tab ? `2px solid ${accent}` : '2px solid transparent',
                                    transition: 'all 0.15s',
                                }}>{tab} Events</button>
                            ))}
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Event', 'Account', 'Triggered By', 'Conf Δ', 'Outcome', 'Date'].map(h => (
                                        <th key={h} style={{ padding: '8px 14px', fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(a => {
                                    const dColor = a.confDelta > 0 ? '#3fb950' : '#f85149';
                                    return (
                                        <tr key={a.id} style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.1s' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                            <td style={{ padding: '9px 14px', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.type}</td>
                                            <td style={{ padding: '9px 14px', fontSize: '0.625rem', color: 'var(--text-secondary)' }}>{a.account}</td>
                                            <td style={{ padding: '9px 14px' }}>
                                                <span style={triggerStyle(a.trigger)}>{a.trigger === 'ai' ? '⚡ AI' : '👤 Human'}</span>
                                            </td>
                                            <td style={{ padding: '9px 14px', fontSize: '0.75rem', fontWeight: 800, color: dColor }}>
                                                {a.confDelta > 0 ? '+' : ''}{a.confDelta}%
                                            </td>
                                            <td style={{ padding: '9px 14px' }}>
                                                <span style={{ fontSize: '0.5rem', fontWeight: 700, color: outcomeColor(a.outcome), background: `${outcomeColor(a.outcome)}15`, padding: '2px 6px', borderRadius: 3 }}>
                                                    {a.outcome}
                                                </span>
                                            </td>
                                            <td style={{ padding: '9px 14px', fontSize: '0.5rem', color: 'var(--text-muted)' }}>{a.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Confidence impact chart */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '16px 16px' }}>
                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>Signal Impact by Deal</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {eventWithDeltas.map(e => {
                                const color = e.delta >= 0 ? accent : '#f85149';
                                const maxAbs = 30;
                                const pct = Math.min((Math.abs(e.delta) / maxAbs) * 100, 100);
                                return (
                                    <div key={e.account}>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 3 }}>{e.account}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ flex: 1, height: 6, background: 'var(--border-subtle)', borderRadius: 3 }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
                                            </div>
                                            <span style={{ fontSize: '0.5rem', fontWeight: 700, color, minWidth: 30 }}>
                                                {e.delta >= 0 ? '+' : ''}{e.delta.toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Activity06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <ActivityContent />
        </CrmLayout>
    );
}
