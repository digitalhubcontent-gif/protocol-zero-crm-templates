'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { ACTIVE_DEALS, FLOW_OWNERS, FUNNEL_STAGES } from '../data';

const accent = '#58a6ff';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

function ContactContent() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'health' | 'dwell' | 'account'>('health');

    const contacts = [...ACTIVE_DEALS]
        .filter(d => d.account.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'health') return b.health - a.health;
            if (sortBy === 'dwell') return b.dwell - a.dwell;
            return a.account.localeCompare(b.account);
        });

    // Best outreach times heatmap (days × time slots)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const slots = ['8am', '10am', '12pm', '2pm', '4pm'];
    const reachability = [
        [0.4, 0.7, 0.5, 0.6, 0.3],
        [0.6, 0.8, 0.4, 0.9, 0.5],
        [0.3, 0.5, 0.8, 0.7, 0.4],
        [0.5, 0.9, 0.6, 0.8, 0.6],
        [0.2, 0.4, 0.3, 0.5, 0.2],
    ];

    const heroMetrics = [
        { label: 'Responsiveness Score', value: '72%', sub: 'Avg across queue' },
        { label: 'Open Loop Count', value: '18', sub: 'Awaiting response' },
        { label: 'Avg Touchpoint Freq', value: '3.2', sub: 'Per week per deal' },
    ];

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Actionable Prospect Queue</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Responsiveness tracking · Open loops · Outreach intelligence</p>
                </div>

                {/* Hero metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                    {heroMetrics.map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: 5 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>
                    {/* Contact Table */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Search + Sort bar */}
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search accounts..."
                                style={{
                                    flex: 1, padding: '6px 10px', background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-card)', borderRadius: 5,
                                    color: 'var(--text-primary)', fontSize: '0.75rem', outline: 'none',
                                }}
                            />
                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>Sort:</span>
                            {(['health', 'dwell', 'account'] as const).map(s => (
                                <button key={s} onClick={() => setSortBy(s)} style={{
                                    padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.5625rem', fontWeight: 600,
                                    background: sortBy === s ? `${accent}18` : 'transparent',
                                    color: sortBy === s ? accent : 'var(--text-secondary)',
                                    border: `1px solid ${sortBy === s ? `${accent}40` : 'var(--border-subtle)'}`,
                                    transition: 'all 0.15s', textTransform: 'capitalize',
                                }}>{s}</button>
                            ))}
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Account', 'Phase', 'Dwell', 'Owner', 'Health Score', 'Last Touch', 'SLA', 'Action'].map(h => (
                                        <th key={h} style={{ padding: '8px 12px', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(d => {
                                    const slaColor = d.sla === 'breach' ? '#f85149' : d.sla === 'warning' ? '#d29922' : '#3fb950';
                                    return (
                                        <tr key={d.id} style={{ cursor: 'pointer', transition: 'background 0.1s' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{d.account}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{d.phase}</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', fontWeight: 600, color: slaColor }}>{d.dwell}d</td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{d.owner}</td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 50, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                                        <div style={{ width: `${d.health}%`, height: '100%', background: d.health > 70 ? '#3fb950' : d.health > 50 ? '#d29922' : '#f85149', borderRadius: 2 }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{d.health}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '9px 12px', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{d.lastExec}</td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <span style={{ fontSize: '0.5rem', fontWeight: 700, color: slaColor, background: `${slaColor}15`, padding: '2px 5px', borderRadius: 3 }}>
                                                    {d.sla.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <button style={{
                                                    padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.5rem', fontWeight: 600,
                                                    background: `${accent}15`, color: accent, border: `1px solid ${accent}30`,
                                                    transition: 'all 0.15s',
                                                }}
                                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}28`; }}
                                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}15`; }}>
                                                    Reach Out
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Outreach heatmap */}
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Best Outreach Windows</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Time</th>
                                    {days.map(d => <th key={d} style={{ padding: '4px 4px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{d}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot, si) => (
                                    <tr key={slot}>
                                        <td style={{ padding: '4px 6px', fontSize: '0.5625rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{slot}</td>
                                        {days.map((day, di) => {
                                            const v = reachability[di][si];
                                            return (
                                                <td key={day} style={{ padding: '3px' }}>
                                                    <div style={{ height: 24, background: `rgba(88,166,255,${v * 0.85})`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '0.4375rem', color: v > 0.6 ? 'var(--bg-primary)' : 'var(--text-secondary)', fontWeight: 600 }}>
                                                            {Math.round(v * 100)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Funnel mini */}
                <div style={{ ...card }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                        Sequence Step Drop-Off Analysis
                    </div>
                    <FunnelChart stages={FUNNEL_STAGES.slice(0, 4)} accent={accent} height={140} />
                </div>
            </div>
        </div>
    );
}

export default function Contact05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor={accent}>
            <ContactContent />
        </CrmLayout>
    );
}
