'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { RISK_RULES } from '../data';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const EVENT_STREAM = [
    { ts: '14:22:08', type: 'RENEWAL_ALERT', id: 'RI-0956', counterparty: 'Quantum Dynamics Inc', msg: 'Contract expires in 3 months. Renewal probability 34%. Escalation triggered.', severity: 'CRITICAL' },
    { ts: '14:18:41', type: 'RISK_ESCALATION', id: 'RI-0482', counterparty: 'Sentinel Solutions', msg: 'Exposure score 96. Assigned to VP of Revenue Operations.', severity: 'CRITICAL' },
    { ts: '13:54:19', type: 'EXPANSION_EVENT', id: 'RI-0841', counterparty: 'Cortex Systems LLC', msg: 'Module expansion: +$4.2M projected uplift. Renewal forecast upgraded to AAA.', severity: 'POSITIVE' },
    { ts: '13:33:07', type: 'CREDIT_REVIEW', id: 'RI-0217', counterparty: 'Axiom Financial Corp', msg: 'Rating agency review initiated. Monitoring for potential BBB+ upgrade.', severity: 'WARNING' },
    { ts: '13:01:44', type: 'CONTRACT_SIGNED', id: 'RI-0339', counterparty: 'Atlas Biomedical', msg: '36-month renewal finalized. ARR +$12.8M secured. Exposure risk eliminated.', severity: 'POSITIVE' },
    { ts: '12:48:22', type: 'NRR_ALERT', id: 'RI-0392', counterparty: 'Helios Capital Group', msg: 'NRR dropped to 97%. Contraction risk flagged at $4.6M.', severity: 'WARNING' },
    { ts: '12:21:13', type: 'RENEWAL_ALERT', id: 'RI-0621', counterparty: 'Pinnacle Logistics', msg: 'Contract expires in 7 months. Renewal probability 55%. Outreach initiated.', severity: 'WARNING' },
    { ts: '11:58:06', type: 'EXECUTIVE_TOUCH', id: 'RI-0654', counterparty: 'Meridian Health Sys', msg: 'CFO executive call completed. Sentiment: Positive. Multi-year expansion indicated.', severity: 'POSITIVE' },
    { ts: '11:42:38', type: 'EXPANSION_EVENT', id: 'RI-0731', counterparty: 'Novu Technologies', msg: '+$3.1M pipeline module expansion under review. Awaiting budget approval.', severity: 'NEUTRAL' },
    { ts: '11:28:55', type: 'RISK_ESCALATION', id: 'RI-0217', counterparty: 'Axiom Financial Corp', msg: 'Finance department restructuring detected. Watchlist: Decision timeline unknown.', severity: 'WARNING' },
    { ts: '10:47:12', type: 'CONTRACT_SIGNED', id: 'RI-0118', counterparty: 'Vanta Industries', msg: '60-month contract renewal locked. ARR $19.8M secured. Long-term visibility confirmed.', severity: 'POSITIVE' },
];

const SEVERITY_COLORS = {
    CRITICAL: '#ef4444', WARNING: '#f97316', POSITIVE: '#10b981', NEUTRAL: am('80'),
};

export default function Crm03ActivityPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [filter, setFilter] = useState<string>('ALL');
    const filters = ['ALL', 'CRITICAL', 'WARNING', 'POSITIVE', 'NEUTRAL'];
    const [autoRefresh, setAutoRefresh] = useState(true);
    const displayed = filter === 'ALL' ? EVENT_STREAM : EVENT_STREAM.filter(e => e.severity === filter);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>ENGAGEMENT EVENT STREAM &nbsp;◆&nbsp; REAL-TIME FEED</span>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>
                            <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} style={{ accentColor: accent }} />
                            AUTO-REFRESH
                        </label>
                        {autoRefresh && (
                            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                                style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                        )}
                    </div>
                </div>

                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    {/* Summary stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
                        {[
                            { label: 'TOTAL_EVENTS_TODAY', count: 11, color: 'var(--text-accent)' },
                            { label: 'CRITICAL_EVENTS', count: 2, color: '#ef4444' },
                            { label: 'POSITIVE_SIGNALS', count: 4, color: '#10b981' },
                            { label: 'RISK_WARNINGS', count: 3, color: '#f97316' },
                        ].map(m => (
                            <div key={m.label} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '12px 16px' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 5 }}>{m.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: m.color }}>{m.count}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                        {filters.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{ padding: '5px 12px', border: `1px solid ${filter === f ? am('40') : am('18')}`, background: filter === f ? am('14') : 'transparent', color: filter === f ? accent : am('40'), fontSize: '0.5rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                [{f}]
                            </button>
                        ))}
                    </div>

                    {/* Event stream */}
                    <div style={{ border: `1px solid ${am('12')}`, background: 'var(--bg-card)' }}>
                        <div style={{ padding: '8px 16px', borderBottom: `1px solid ${am('0a')}`, display: 'flex', gap: 24 }}>
                            {['TIME', 'EVENT TYPE', 'INSTRUMENT', 'COUNTERPARTY', 'MESSAGE', 'SEVERITY'].map(h => (
                                <span key={h} style={{ fontSize: '0.4rem', color: 'var(--text-accent)', letterSpacing: '0.12em', flex: h === 'MESSAGE' ? 1 : undefined, minWidth: h === 'COUNTERPARTY' ? 160 : undefined }}>{h}</span>
                            ))}
                        </div>
                        {displayed.map((evt, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                                style={{ display: 'flex', gap: 24, padding: '10px 16px', borderBottom: `1px solid ${am('06')}`, alignItems: 'flex-start', borderLeft: `2px solid ${(SEVERITY_COLORS as any)[evt.severity]}40`, cursor: 'default', transition: 'background 0.1s' }}
                                onMouseEnter={e => e.currentTarget.style.background = am('04')}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', flexShrink: 0, minWidth: 64 }}>{evt.ts}</span>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.06em', flexShrink: 0, minWidth: 108 }}>{evt.type}</span>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', flexShrink: 0, minWidth: 64 }}>{evt.id}</span>
                                <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', flexShrink: 0, minWidth: 160 }}>{evt.counterparty}</span>
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', flex: 1, lineHeight: 1.5 }}>{evt.msg}</span>
                                <span style={{ fontSize: '0.5rem', fontWeight: 700, color: (SEVERITY_COLORS as any)[evt.severity], flexShrink: 0 }}>{evt.severity}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
