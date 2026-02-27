'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { INTERACTION_HISTORY } from '../data';

const ALL_EVENTS = [
    { date: '2026-03-18', type: 'Executive Briefing', contact: 'Amara Foster', org: 'Nexus Global Partners', notes: 'Presented Q2 2026 roadmap. CFO confirmed budget allocated. Multi-year expansion intent confirmed.', outcome: 'Positive' },
    { date: '2026-03-17', type: 'Contract Review Call', contact: 'James Reilly', org: 'Atlas Biomedical', notes: 'Legal redlines returned. No material concerns. Terms acceptable to both parties.', outcome: 'Neutral' },
    { date: '2026-03-16', type: 'Risk Assessment', contact: 'Lena Park', org: 'Cortex Systems', notes: 'Procurement committee requested revised pricing. 8% discount requested. Escalating to revenue ops.', outcome: 'Risk' },
    { date: '2026-03-14', type: 'Discovery Call', contact: 'Priya Sharma', org: 'Vanta Industries', notes: 'New opportunity identified via partner referral. Strong product fit. Technical demo requested.', outcome: 'Positive' },
    { date: '2026-03-12', type: 'Renewal Call', contact: 'Marcus Webb', org: 'Quantum Dynamics', notes: 'Champion raised churn risk — internal budget cuts. 2-month timeline agreed for decision.', outcome: 'Risk' },
    { date: '2026-03-11', type: 'Partner Review', contact: 'Sophie Chen', org: 'Meridian Health', notes: 'Partner Aiko Tanaka introduced new division head at Meridian. High-value expansion angle.', outcome: 'Positive' },
    { date: '2026-03-10', type: 'Proposal Delivery', contact: 'Daniel Osei', org: 'Helios Capital', notes: 'Final proposal sent. $1.1M ARR at 36-month term. Awaiting board sign-off.', outcome: 'Neutral' },
    { date: '2026-03-08', type: 'Legal Review', contact: 'James Reilly', org: 'Novu Technologies', notes: 'NDA countersigned. Data processing agreement under review by privacy team.', outcome: 'Neutral' },
];

const OUTCOME_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    Positive: { bg: 'var(--status-success-bg, #f0fdf4)', text: 'var(--status-success-text, #15803d)', border: 'var(--status-success-border, #bbf7d0)' },
    Neutral: { bg: 'var(--bg-secondary)', text: 'var(--text-secondary)', border: 'var(--border)' },
    Risk: { bg: 'var(--status-danger-bg, #fef2f2)', text: 'var(--status-danger-text, #dc2626)', border: 'var(--status-danger-border, #fecaca)' },
};

export default function Crm04ActivityPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [outcomeFilter, setOutcomeFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const types = ['All', ...Array.from(new Set(ALL_EVENTS.map(e => e.type)))];
    const displayed = ALL_EVENTS
        .filter(e => outcomeFilter === 'All' || e.outcome === outcomeFilter)
        .filter(e => typeFilter === 'All' || e.type === typeFilter);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Activity &nbsp;/&nbsp; Interaction Events</span>
                </div>
                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 28 }}>
                        {[
                            { label: 'Total Events', val: ALL_EVENTS.length },
                            { label: 'Positive Signals', val: ALL_EVENTS.filter(e => e.outcome === 'Positive').length },
                            { label: 'Risk Flags', val: ALL_EVENTS.filter(e => e.outcome === 'Risk').length },
                            { label: 'Pending Follow-Ups', val: 3 },
                        ].map((m, i) => (
                            <div key={m.label} style={{ padding: '18px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {['All', 'Positive', 'Neutral', 'Risk'].map(o => (
                                <button key={o} onClick={() => setOutcomeFilter(o)}
                                    style={{ padding: '4px 12px', border: `1px solid ${outcomeFilter === o ? 'var(--text-primary)' : 'var(--border)'}`, background: outcomeFilter === o ? 'var(--text-primary)' : 'transparent', color: outcomeFilter === o ? 'var(--bg-primary)' : 'var(--text-secondary)', fontSize: '0.5rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                    {o}
                                </button>
                            ))}
                        </div>
                        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                            style={{ padding: '5px 10px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: '0.5625rem', fontFamily: 'inherit', outline: 'none' }}>
                            {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                        </select>
                    </div>

                    {/* Timeline */}
                    <div style={{ position: 'relative', paddingLeft: 28 }}>
                        <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
                        {displayed.map((ev, i) => {
                            const c = OUTCOME_COLORS[ev.outcome];
                            return (
                                <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                    style={{ marginBottom: 16, position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: -24, top: 14, width: 10, height: 10, borderRadius: '50%', background: ev.outcome === 'Positive' ? 'var(--status-success-text, #16a34a)' : ev.outcome === 'Risk' ? 'var(--status-danger-text, #dc2626)' : 'var(--text-muted)', border: '2px solid var(--bg-primary)' }} />
                                    <div style={{ border: `1px solid ${c.border}`, background: c.bg, padding: '14px 18px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                            <div>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)', marginRight: 8 }}>{ev.type}</span>
                                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{ev.contact} · {ev.org}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.5625rem', padding: '2px 7px', background: 'var(--bg-primary)', border: `1px solid ${c.border}`, color: c.text, borderRadius: 2, fontWeight: 500 }}>{ev.outcome}</span>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{ev.date}</span>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ev.notes}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
