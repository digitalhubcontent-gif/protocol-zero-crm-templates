'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DECISION_TRIGGERS } from '../data';

const WORKFLOWS = [
    { id: 'WF-001', name: 'Principal Engagement Sequence', trigger: 'Opportunity Phase = Final Review', action: 'Schedule executive call + send briefing doc', status: 'Active', fired: '3 today' },
    { id: 'WF-002', name: 'Cycle Time Alert', trigger: 'Cycle Days > 90', action: 'Escalate to partner + log risk note', status: 'Active', fired: '1 today' },
    { id: 'WF-003', name: 'Low Confidence Warning', trigger: 'Confidence < 65%', action: 'Flag for partner review + notify analyst', status: 'Active', fired: '0 today' },
    { id: 'WF-004', name: 'Sector Concentration Check', trigger: 'Sector > 30% of ARR', action: 'Generate diversification alert', status: 'Paused', fired: '—' },
    { id: 'WF-005', name: 'Win Rate Watch', trigger: 'Win Rate < 50% (rolling 90d)', action: 'Trigger pipeline review session', status: 'Active', fired: '0 today' },
];

export default function Crm04AutomationPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [paused, setPaused] = useState<Set<string>>(new Set());
    const [activeWF, setActiveWF] = useState<typeof WORKFLOWS[0] | null>(null);

    const togglePause = (id: string) => {
        setPaused(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Automation &nbsp;/&nbsp; Decision Engine</span>
                    <button style={{ padding: '5px 14px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', fontSize: '0.5625rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        + New Workflow
                    </button>
                </div>

                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 28 }}>
                        {[
                            { label: 'Active Workflows', val: WORKFLOWS.filter(w => w.status === 'Active').length },
                            { label: 'Triggered Today', val: 4 },
                            { label: 'Decision Triggers Ready', val: DECISION_TRIGGERS.length },
                            { label: 'Avg Response Time', val: '< 2 min' },
                        ].map((m, i) => (
                            <div key={m.label} style={{ padding: '18px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>
                        <div>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Automation Workflows</p>
                            {WORKFLOWS.map(wf => {
                                const isPaused = paused.has(wf.id) || wf.status === 'Paused';
                                return (
                                    <div key={wf.id} style={{ border: `1px solid ${activeWF?.id === wf.id ? 'var(--text-primary)' : 'var(--border)'}`, padding: '16px 18px', marginBottom: 8, cursor: 'pointer', opacity: isPaused ? 0.55 : 1, transition: 'all 0.15s' }}
                                        onClick={() => setActiveWF(x => x?.id === wf.id ? null : wf)}
                                        onMouseEnter={e => { if (activeWF?.id !== wf.id) e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                                        onMouseLeave={e => { if (activeWF?.id !== wf.id) e.currentTarget.style.borderColor = 'var(--border)'; }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{wf.id}</span>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: isPaused ? 'var(--text-muted)' : 'var(--text-primary)' }} />
                                                    <span style={{ fontSize: '0.5rem', color: isPaused ? 'var(--text-muted)' : 'var(--text-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                                                        {isPaused ? 'Paused' : 'Active'}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{wf.name}</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Fired: {wf.fired}</span>
                                                <button onClick={e => { e.stopPropagation(); togglePause(wf.id); }}
                                                    style={{ padding: '3px 9px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                                                    {isPaused ? 'Resume' : 'Pause'}
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ background: 'var(--bg-secondary)', padding: '8px 12px', fontSize: '0.625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>IF</span> {wf.trigger} → <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>THEN</span> {wf.action}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Decision triggers */}
                        <div>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Decision Triggers</p>
                            <div style={{ border: '1px solid var(--border)' }}>
                                {DECISION_TRIGGERS.map((t, i) => (
                                    <div key={t.trigger} style={{ padding: '12px 14px', borderBottom: i < DECISION_TRIGGERS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                            <p style={{ fontSize: '0.6875rem', fontWeight: 500, flex: 1 }}>{t.trigger}</p>
                                            <span style={{ fontSize: '0.5rem', padding: '2px 6px', background: t.urgency === 'High' ? 'var(--status-danger-bg, #fef2f2)' : 'var(--bg-card)', color: t.urgency === 'High' ? 'var(--status-danger-text, #dc2626)' : 'var(--text-secondary)', border: `1px solid ${t.urgency === 'High' ? 'var(--status-danger-border, #fecaca)' : 'var(--border)'}`, borderRadius: 2, flexShrink: 0, marginLeft: 8 }}>{t.urgency}</span>
                                        </div>
                                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{t.action}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
