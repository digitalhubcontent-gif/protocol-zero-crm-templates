'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#06b6d4';
const surge = '#f59e0b';

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
        id: 'pb1', name: 'Surge Response', trigger: 'Intent score +25% in 72h',
        actions: ['Rep notified within 5 min', 'Auto-schedule discovery call', 'Increase signal monitoring to hourly'],
        status: 'live', runs: 157, successRate: 79, color: surge,
    },
    {
        id: 'pb2', name: 'PLG Product-Qualified', trigger: 'Trial: 3+ features activated in 7 days',
        actions: ['Sales rep assigned', 'Personalized upgrade email', 'In-app conversion prompt triggered'],
        status: 'live', runs: 89, successRate: 88, color: '#22c55e',
    },
    {
        id: 'pb3', name: 'ICP Decay Alert', trigger: 'High-ICP account signal < 30 for 14 days',
        actions: ['Re-engagement sequence triggered', 'Content recommendation pushed', 'Slack alert to AE'],
        status: 'live', runs: 44, successRate: 52, color: '#ef4444',
    },
    {
        id: 'pb4', name: 'Buying Group Expansion', trigger: 'New stakeholder from same domain',
        actions: ['Auto-map to buying group', 'Personalization prompt for rep', 'LinkedIn connect suggestion'],
        status: 'live', runs: 62, successRate: 67, color: accent,
    },
    {
        id: 'pb5', name: 'Champion Departure', trigger: 'Champion contact changes job',
        actions: ['Deal risk flag raised', 'VP alert sent', 'New champion identification mode'],
        status: 'paused', runs: 18, successRate: 41, color: '#8b5cf6',
    },
];

const EXEC_LOG = [
    { time: '4m ago', playbook: 'Surge Response', account: 'Stark Industries', action: 'Discovery call scheduled', result: 'success' },
    { time: '22m ago', playbook: 'PLG Product-Qualified', account: 'LexCorp', action: 'Upgrade email sent', result: 'success' },
    { time: '1h ago', playbook: 'ICP Decay Alert', account: 'Initech', action: 'Sequence triggered', result: 'pending' },
    { time: '2h ago', playbook: 'Buying Group Expansion', account: 'Acme Corp', action: 'New stakeholder mapped', result: 'success' },
    { time: '3h ago', playbook: 'Champion Departure', account: 'Soylent Systems', action: 'VP notified', result: 'failed' },
];

const rc = (r: string) => r === 'success' ? '#22c55e' : r === 'pending' ? surge : '#ef4444';

function AutomationContent() {
    const [activePlaybook, setActivePlaybook] = useState(PLAYBOOKS[0]);
    const [toggled, setToggled] = useState<Record<string, string>>(Object.fromEntries(PLAYBOOKS.map(p => [p.id, p.status])));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Signal-Triggered Automation Hub</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Surge response · PLG qualification · Decay watchdog · Group expansion</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Active Playbooks', value: PLAYBOOKS.filter(p => p.status === 'live').length, color: '#22c55e' },
                        { label: 'Executions (30d)', value: PLAYBOOKS.reduce((s, p) => s + p.runs, 0), color: accent },
                        { label: 'Avg Success Rate', value: `${Math.round(PLAYBOOKS.reduce((s, p) => s + p.successRate, 0) / PLAYBOOKS.length)}%`, color: surge },
                        { label: 'Time Saved', value: '312h', color: '#8b5cf6' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, cursor: 'default' }}>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Signal Playbooks</div>
                        {PLAYBOOKS.map(p => (
                            <button key={p.id} onClick={() => setActivePlaybook(p)}
                                style={{
                                    width: '100%', padding: '10px 12px', borderRadius: 6, textAlign: 'left', cursor: 'pointer', marginBottom: 5,
                                    background: activePlaybook.id === p.id ? `${p.color}18` : 'transparent',
                                    border: `1px solid ${activePlaybook.id === p.id ? p.color : 'var(--border-subtle)'}`,
                                    transition: 'all 0.15s',
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</span>
                                    <span style={{ fontSize: '0.4rem', padding: '1px 5px', borderRadius: 3, fontWeight: 700, textTransform: 'uppercase', background: toggled[p.id] === 'live' ? '#22c55e20' : `${surge}20`, color: toggled[p.id] === 'live' ? '#22c55e' : surge }}>{toggled[p.id]}</span>
                                </div>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{p.successRate}% success · {p.runs} runs</div>
                            </button>
                        ))}
                    </div>
                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{activePlaybook.name}</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Trigger: <span style={{ color: activePlaybook.color }}>{activePlaybook.trigger}</span></div>
                            </div>
                            <button onClick={() => setToggled(prev => ({ ...prev, [activePlaybook.id]: prev[activePlaybook.id] === 'live' ? 'paused' : 'live' }))}
                                style={{
                                    padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700, transition: 'all 0.15s',
                                    background: toggled[activePlaybook.id] === 'live' ? '#ef444418' : '#22c55e18',
                                    color: toggled[activePlaybook.id] === 'live' ? '#ef4444' : '#22c55e',
                                    border: `1px solid ${toggled[activePlaybook.id] === 'live' ? '#ef4444' : '#22c55e'}`,
                                }}>
                                {toggled[activePlaybook.id] === 'live' ? '⏸ Pause' : '▶ Resume'}
                            </button>
                        </div>
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Actions</div>
                            {activePlaybook.actions.map((a, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${activePlaybook.color}20`, border: `1px solid ${activePlaybook.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700, color: activePlaybook.color, flexShrink: 0 }}>{i + 1}</div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', paddingTop: 2 }}>{a}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                            {[['Runs', activePlaybook.runs], ['Success', `${activePlaybook.successRate}%`], ['Latency', '< 5 min']].map(([l, v]) => (
                                <div key={l as string} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 6, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{l}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: activePlaybook.color }}>{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={card}>
                    <div style={lbl}>Automation Execution Log</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                {['Time', 'Playbook', 'Account', 'Action', 'Result'].map(h => (
                                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.5rem', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {EXEC_LOG.map((l, i) => (
                                <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'default', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-elevated)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.5625rem' }}>{l.time}</td>
                                    <td style={{ padding: '9px 12px', fontWeight: 600, color: accent }}>{l.playbook}</td>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-primary)' }}>{l.account}</td>
                                    <td style={{ padding: '9px 12px', color: 'var(--text-secondary)' }}>{l.action}</td>
                                    <td style={{ padding: '9px 12px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, background: `${rc(l.result)}20`, color: rc(l.result) }}>{l.result}</span>
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

export default function Automation08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
