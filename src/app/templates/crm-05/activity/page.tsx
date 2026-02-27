'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { FUNNEL_STAGES } from '../data';

const accent = '#58a6ff';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const ACTIVITY_LOG = [
    { id: 'A001', type: 'Call — Answered', account: 'Nexus Capital', owner: 'JR', outcome: 'Advanced', time: '9:14 AM', durationMin: 18, date: 'Today' },
    { id: 'A002', type: 'Email — Replied', account: 'Summit Group', owner: 'KT', outcome: 'Advanced', time: '8:47 AM', durationMin: 0, date: 'Today' },
    { id: 'A003', type: 'Meeting - Demo', account: 'Catalyst Corp', owner: 'AL', outcome: 'Advanced', time: '11:00 AM', durationMin: 45, date: 'Today' },
    { id: 'A004', type: 'Task — Follow-up', account: 'Vortex Systems', owner: 'SM', outcome: 'Pending', time: '2:00 PM', durationMin: 0, date: 'Today' },
    { id: 'A005', type: 'Call — No Answer', account: 'Horizon Ventures', owner: 'JR', outcome: 'Stalled', time: '10:30 AM', durationMin: 2, date: 'Yesterday' },
    { id: 'A006', type: 'Email — Sent', account: 'Apex Infrastructure', owner: 'AL', outcome: 'Pending', time: '4:15 PM', durationMin: 0, date: 'Yesterday' },
    { id: 'A007', type: 'Meeting — Exec QBR', account: 'Meridian Advisory', owner: 'KT', outcome: 'Advanced', time: '2:00 PM', durationMin: 60, date: 'Yesterday' },
    { id: 'A008', type: 'Task — Proposal Sent', account: 'Rivestone Inc', owner: 'SM', outcome: 'Advanced', time: '11:45 AM', durationMin: 0, date: 'Mar 16' },
];

const CALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALL_RAW = [
    { label: 'Answered', data: [8, 11, 9, 13, 10, 4, 2], color: '#3fb950' },
    { label: 'VM Left', data: [5, 4, 7, 6, 8, 3, 1], color: '#d29922' },
    { label: 'No Answer', data: [3, 2, 4, 3, 5, 2, 1], color: '#f85149' },
];
// Convert to StackedBarChart bars format
const callOutcomeBars = CALL_DAYS.map((day, di) => ({
    label: day,
    segments: CALL_RAW.map(s => ({ label: s.label, value: s.data[di], color: s.color })),
}));

function ActivityContent() {
    const [activeTab, setActiveTab] = useState<'All' | 'Calls' | 'Emails' | 'Meetings' | 'Tasks'>('All');

    const todayStats = [
        { label: 'Calls', value: 24, icon: '📞' },
        { label: 'Emails', value: 47, icon: '📧' },
        { label: 'Meetings', value: 6, icon: '📅' },
        { label: 'Tasks', value: 12, icon: '✓' },
    ];

    const filtered = ACTIVITY_LOG.filter(a =>
        activeTab === 'All' || a.type.toLowerCase().startsWith(activeTab.toLowerCase().replace('s', ''))
    );

    const outcomeColor = (o: string) =>
        o === 'Advanced' ? '#3fb950' : o === 'Stalled' ? '#f85149' : '#d29922';

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Execution Log</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Activity tracking · Sequence performance · Execution trends</p>
                </div>

                {/* Today's stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                    {todayStats.map(s => (
                        <div key={s.label} style={{ ...card, textAlign: 'center', cursor: 'default', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label} Today</div>
                        </div>
                    ))}
                </div>

                {/* Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Call Outcomes — Last 7 Days
                        </div>
                        <StackedBarChart
                            bars={callOutcomeBars}
                            height={180}
                        />
                    </div>
                    <div style={card}>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Sequence Step Drop-Off
                        </div>
                        <FunnelChart stages={FUNNEL_STAGES} accent={accent} height={200} />
                    </div>
                </div>

                {/* Activity log */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                    {/* Filter tabs */}
                    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                        {(['All', 'Calls', 'Emails', 'Meetings', 'Tasks'] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                padding: '10px 18px', cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                background: 'transparent', border: 'none',
                                color: activeTab === tab ? accent : 'var(--text-secondary)',
                                borderBottom: activeTab === tab ? `2px solid ${accent}` : '2px solid transparent',
                                transition: 'all 0.15s',
                            }}
                                onMouseEnter={e => { if (activeTab !== tab) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                                onMouseLeave={e => { if (activeTab !== tab) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                {['Type', 'Account', 'Owner', 'Outcome', 'Time', 'Duration', 'Date'].map(h => (
                                    <th key={h} style={{ padding: '8px 14px', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(a => (
                                <tr key={a.id} style={{ cursor: 'pointer', transition: 'background 0.1s', borderBottom: '1px solid var(--border-subtle)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                    <td style={{ padding: '9px 14px', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.type}</td>
                                    <td style={{ padding: '9px 14px', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{a.account}</td>
                                    <td style={{ padding: '9px 14px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{a.owner}</td>
                                    <td style={{ padding: '9px 14px' }}>
                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: outcomeColor(a.outcome), background: `${outcomeColor(a.outcome)}15`, padding: '2px 6px', borderRadius: 3 }}>
                                            {a.outcome}
                                        </span>
                                    </td>
                                    <td style={{ padding: '9px 14px', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{a.time}</td>
                                    <td style={{ padding: '9px 14px', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{a.durationMin > 0 ? `${a.durationMin}m` : '—'}</td>
                                    <td style={{ padding: '9px 14px', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{a.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Activity05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <ActivityContent />
        </CrmLayout>
    );
}
