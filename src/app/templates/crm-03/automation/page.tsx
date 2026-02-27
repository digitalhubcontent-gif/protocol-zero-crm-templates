'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RISK_RULES } from '../data';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const TRIGGER_LOG = [
    { ts: '14:22:08', rule: 'RR-001', counterparty: 'Quantum Dynamics', action: 'Escalated to VP', status: 'EXECUTED' },
    { ts: '14:18:41', rule: 'RR-002', counterparty: 'Sentinel Solutions', action: 'Coverage Alert Sent', status: 'EXECUTED' },
    { ts: '13:55:12', rule: 'RR-005', counterparty: 'Axiom Financial', action: 'Renewal Sequence Launched', status: 'EXECUTED' },
    { ts: '13:01:44', rule: 'RR-005', counterparty: 'Pinnacle Logistics', action: 'Renewal Sequence Launched', status: 'EXECUTED' },
    { ts: '08:00:00', rule: 'RR-003', counterparty: 'All Instruments', action: 'Volatility Check — No Alert', status: 'PASSED' },
];

export default function Crm03AutomationPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [activeRule, setActiveRule] = useState<typeof RISK_RULES[0] | null>(null);
    const [rulePaused, setRulePaused] = useState<Set<string>>(new Set());

    const togglePause = (id: string) => {
        setRulePaused(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>RISK RULES ENGINE &nbsp;◆&nbsp; INTELLIGENT AUTOMATION</span>
                    <button style={{ padding: '5px 14px', border: `1px solid ${am('35')}`, background: am('14'), color: 'var(--text-accent)', fontSize: '0.5rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = am('24')} onMouseLeave={e => e.currentTarget.style.background = am('14')}>
                        [+ NEW RULE]
                    </button>
                </div>

                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                        {[
                            { label: 'ACTIVE_RULES', val: '5', color: '#10b981' },
                            { label: 'TRIGGERS_TODAY', val: '4', color: 'var(--text-accent)' },
                            { label: 'ESCALATIONS_ACTIVE', val: '2', color: '#ef4444' },
                            { label: 'AVG_RESPONSE_TIME', val: '< 3 min', color: 'var(--text-secondary)' },
                        ].map(m => (
                            <div key={m.label} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px 16px' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: m.color }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
                        {/* Rules list */}
                        <div>
                            <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>RISK_RULES :: {RISK_RULES.length} RULES DEPLOYED</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {RISK_RULES.map(rule => (
                                    <motion.div key={rule.id} whileHover={{ borderColor: am('30') }}
                                        style={{ background: 'var(--bg-card)', border: `1px solid ${activeRule?.id === rule.id ? am('40') : am('12')}`, padding: '14px 16px', cursor: 'pointer', opacity: rulePaused.has(rule.id) ? 0.5 : 1, transition: 'opacity 0.2s' }}
                                        onClick={() => setActiveRule(r => r?.id === rule.id ? null : rule)}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                                    <span style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>{rule.id}</span>
                                                    <motion.div animate={rulePaused.has(rule.id) ? {} : { opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                                                        style={{ width: 5, height: 5, borderRadius: '50%', background: rulePaused.has(rule.id) ? '#5a6048' : '#10b981', boxShadow: rulePaused.has(rule.id) ? 'none' : '0 0 6px #10b981' }} />
                                                    <span style={{ fontSize: '0.5rem', color: rulePaused.has(rule.id) ? '#5a6048' : '#10b981', letterSpacing: '0.08em' }}>{rulePaused.has(rule.id) ? 'PAUSED' : rule.status}</span>
                                                </div>
                                                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{rule.name}</p>
                                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>
                                                    IF [{rule.condition}] {rule.op} [{rule.threshold}] → THEN [{rule.action}]
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, marginLeft: 16 }}>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-accent)', fontWeight: 700 }}>{rule.affected} AFFECTED</span>
                                                <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>FIRED: {rule.lastFired}</span>
                                                <button onClick={e => { e.stopPropagation(); togglePause(rule.id); }}
                                                    style={{ padding: '3px 8px', border: `1px solid ${am('25')}`, background: 'transparent', color: 'var(--text-accent)', fontSize: '0.4rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace', transition: 'background 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = am('10')} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    {rulePaused.has(rule.id) ? '[RESUME]' : '[PAUSE]'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right panel */}
                        <div>
                            <AnimatePresence mode="wait">
                                {activeRule ? (
                                    <motion.div key={activeRule.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        style={{ background: 'var(--bg-card)', border: `1px solid ${am('30')}`, padding: '16px', marginBottom: 12 }}>
                                        <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>RULE INSPECTOR</p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-accent)', marginBottom: 6 }}>{activeRule.name}</p>
                                        {[
                                            { label: 'RULE ID', val: activeRule.id },
                                            { label: 'CONDITION', val: activeRule.condition },
                                            { label: 'OPERATOR', val: activeRule.op },
                                            { label: 'THRESHOLD', val: activeRule.threshold },
                                            { label: 'ACTION', val: activeRule.action },
                                            { label: 'AFFECTED NOW', val: `${activeRule.affected} instruments` },
                                            { label: 'LAST FIRED', val: activeRule.lastFired },
                                        ].map(m => (
                                            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${am('08')}` }}>
                                                <span style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>{m.label}</span>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{m.val}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '20px', textAlign: 'center', color: 'var(--text-accent)', fontSize: '0.5625rem', letterSpacing: '0.08em', marginBottom: 12 }}>
                                        SELECT A RULE TO INSPECT
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Trigger log */}
                            <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '12px' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>TRIGGER_LOG :: TODAY</p>
                                {TRIGGER_LOG.map((log, i) => (
                                    <div key={i} style={{ padding: '7px 0', borderBottom: i < TRIGGER_LOG.length - 1 ? `1px solid ${am('08')}` : 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.06em' }}>{log.ts} · {log.rule}</span>
                                            <span style={{ fontSize: '0.4rem', fontWeight: 700, color: log.status === 'EXECUTED' ? '#10b981' : accent, letterSpacing: '0.08em' }}>{log.status}</span>
                                        </div>
                                        <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 3 }}>{log.counterparty} → {log.action}</p>
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
