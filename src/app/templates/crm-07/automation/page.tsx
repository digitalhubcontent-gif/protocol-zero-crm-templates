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

const PLAYBOOKS = [
    {
        id: 'pb1', name: 'Sentiment Recovery', trigger: 'Sentiment < -0.2 for 5+ days',
        actions: ['Escalate to AE Manager', 'Schedule sentiment call', 'Send value-re-engagement doc'],
        status: 'live', runs: 34, successRate: 71, color: '#10b981',
    },
    {
        id: 'pb2', name: 'Intent Spike Response', trigger: 'Intent score +25 in 72h',
        actions: ['Alert rep within 1h', 'Auto-schedule demo', 'Increase cadence to daily'],
        status: 'live', runs: 127, successRate: 84, color: accent,
    },
    {
        id: 'pb3', name: 'Committee Gap Alert', trigger: 'Missing economic buyer > 14 days',
        actions: ['Identify LinkedIn paths', 'Request intro from champion', 'Executive briefing prep'],
        status: 'live', runs: 89, successRate: 63, color: '#06b6d4',
    },
    {
        id: 'pb4', name: 'Staleness Watchdog', trigger: 'No activity for 10 days',
        actions: ['Send personalized re-engagement', 'Notify rep', 'Auto flag for pipeline review'],
        status: 'paused', runs: 45, successRate: 41, color: '#f59e0b',
    },
    {
        id: 'pb5', name: 'Risk Escalation', trigger: 'Confidence < 40% + Stage ≥ Decision',
        actions: ['VP review flag', 'Deal desk intervention', 'Discount authority alert'],
        status: 'live', runs: 22, successRate: 58, color: '#ef4444',
    },
];

const AUTOMATION_LOG = [
    { time: '9:41 AM', playbook: 'Intent Spike Response', account: 'Acme Corp', action: 'Demo scheduled', result: 'success' },
    { time: '8:15 AM', playbook: 'Committee Gap Alert', account: 'Initech', action: 'LinkedIn path identified', result: 'success' },
    { time: '7:02 AM', playbook: 'Sentiment Recovery', account: 'Sterling Cooper', action: 'Rep notified', result: 'pending' },
    { time: '6:30 AM', playbook: 'Intent Spike Response', account: 'LexCorp', action: 'Demo scheduled', result: 'success' },
    { time: 'Yesterday', playbook: 'Staleness Watchdog', account: 'Soylent Systems', action: 'Re-engagement sent', result: 'failed' },
    { time: 'Yesterday', playbook: 'Risk Escalation', account: 'Dunder Mifflin', action: 'VP review flagged', result: 'success' },
];

const resultColor = (r: string) => r === 'success' ? '#10b981' : r === 'pending' ? '#f59e0b' : '#ef4444';

function AutomationContent() {
    const [activePlaybook, setActivePlaybook] = useState(PLAYBOOKS[0]);
    const [status, setStatus] = useState<Record<string, string>>(
        Object.fromEntries(PLAYBOOKS.map(p => [p.id, p.status]))
    );

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Behavioral Automation Playbooks
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        AI-triggered interventions · Sentiment recovery · Intent spike response
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Active Playbooks', value: PLAYBOOKS.filter(p => p.status === 'live').length, color: '#10b981' },
                        { label: 'Executions (30d)', value: PLAYBOOKS.reduce((s, p) => s + p.runs, 0), color: accent },
                        { label: 'Avg Success Rate', value: `${Math.round(PLAYBOOKS.reduce((s, p) => s + p.successRate, 0) / PLAYBOOKS.length)}%`, color: '#06b6d4' },
                        { label: 'Hours Saved', value: '284h', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Playbook list */}
                    <div style={card}>
                        <div style={lbl}>Playbooks</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {PLAYBOOKS.map(p => (
                                <button key={p.id} onClick={() => setActivePlaybook(p)}
                                    style={{
                                        padding: '10px 12px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', width: '100%',
                                        background: activePlaybook.id === p.id ? `${p.color}18` : 'transparent',
                                        border: `1px solid ${activePlaybook.id === p.id ? p.color : 'var(--border-subtle)'}`,
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => { if (activePlaybook.id !== p.id) (e.currentTarget as HTMLButtonElement).style.borderColor = `${p.color}40`; }}
                                    onMouseLeave={e => { if (activePlaybook.id !== p.id) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)'; }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                        <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</span>
                                        <span style={{
                                            fontSize: '0.4rem', padding: '1px 5px', borderRadius: 3, fontWeight: 700, textTransform: 'uppercase',
                                            background: p.status === 'live' ? '#10b98120' : '#f59e0b20',
                                            color: p.status === 'live' ? '#10b981' : '#f59e0b',
                                        }}>{p.status}</span>
                                    </div>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{p.successRate}% success · {p.runs} runs</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active playbook detail */}
                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{activePlaybook.name}</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Trigger: <span style={{ color: activePlaybook.color }}>{activePlaybook.trigger}</span></div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button
                                    onClick={() => setStatus(prev => ({ ...prev, [activePlaybook.id]: prev[activePlaybook.id] === 'live' ? 'paused' : 'live' }))}
                                    style={{
                                        padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700,
                                        background: status[activePlaybook.id] === 'live' ? '#ef444418' : '#10b98118',
                                        color: status[activePlaybook.id] === 'live' ? '#ef4444' : '#10b981',
                                        border: `1px solid ${status[activePlaybook.id] === 'live' ? '#ef4444' : '#10b981'}`,
                                        transition: 'all 0.15s',
                                    }}>
                                    {status[activePlaybook.id] === 'live' ? '⏸ Pause' : '▶ Resume'}
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Action Sequence</div>
                            {activePlaybook.actions.map((action, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: '50%', background: `${activePlaybook.color}20`,
                                        border: `1px solid ${activePlaybook.color}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.55rem', fontWeight: 700, color: activePlaybook.color, flexShrink: 0,
                                    }}>{i + 1}</div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', paddingTop: 2 }}>{action}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                            {[
                                { label: 'Executions', value: activePlaybook.runs },
                                { label: 'Success Rate', value: `${activePlaybook.successRate}%` },
                                { label: 'Avg Latency', value: '< 2 min' },
                            ].map(m => (
                                <div key={m.label} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>{m.label}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: activePlaybook.color }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Execution log */}
                <div style={card}>
                    <div style={lbl}>Automation Execution Log (Today)</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                {['Time', 'Playbook', 'Account', 'Action Taken', 'Result'].map(h => (
                                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5625rem', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {AUTOMATION_LOG.map((l, i) => (
                                <tr key={i}
                                    style={{ borderTop: '1px solid var(--border-subtle)', transition: 'background 0.15s', cursor: 'default' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.625rem' }}>{l.time}</td>
                                    <td style={{ padding: '9px 12px', fontWeight: 600, color: accent }}>{l.playbook}</td>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-primary)' }}>{l.account}</td>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-secondary)' }}>{l.action}</td>
                                    <td style={{ padding: '9px 12px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, background: `${resultColor(l.result)}20`, color: resultColor(l.result) }}>
                                            {l.result}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Automation07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
