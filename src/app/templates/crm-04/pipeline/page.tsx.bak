'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { STRATEGIC_OPPORTUNITIES } from '../data';

const PHASES = ['All', 'Proposal', 'Due Diligence', 'Final Review', 'Negotiation', 'Closed Won'];

const STAGE_ORDER = ['Proposal', 'Due Diligence', 'Final Review', 'Negotiation', 'Closed Won'];

export default function Crm04PipelinePage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [phaseFilter, setPhaseFilter] = useState('All');
    const [sortBy, setSortBy] = useState<'value' | 'confidence' | 'cycleDays'>('value');
    const filtered = (phaseFilter === 'All' ? STRATEGIC_OPPORTUNITIES : STRATEGIC_OPPORTUNITIES.filter(o => o.phase === phaseFilter))
        .sort((a, b) => b[sortBy] - a[sortBy]);

    // Funnel data
    const funnelCounts = STAGE_ORDER.map(s => STRATEGIC_OPPORTUNITIES.filter(o => o.phase === s || (s === 'Proposal' && o.phase === 'Negotiation')).length);
    const maxCount = Math.max(...[8, 6, 5, 4, 2]);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Pipeline &nbsp;/&nbsp; Strategic Opportunity Register</span>
                </div>

                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* Summary metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 28 }}>
                        {[
                            { label: 'Total Weighted Value', val: `$${STRATEGIC_OPPORTUNITIES.reduce((s, o) => s + Math.round(o.value * o.confidence / 100), 0).toLocaleString()}K` },
                            { label: 'Opportunities', val: STRATEGIC_OPPORTUNITIES.length.toString() },
                            { label: 'Avg Confidence', val: `${Math.round(STRATEGIC_OPPORTUNITIES.reduce((s, o) => s + o.confidence, 0) / STRATEGIC_OPPORTUNITIES.length)}%` },
                            { label: 'Avg Cycle Days', val: `${Math.round(STRATEGIC_OPPORTUNITIES.reduce((s, o) => s + o.cycleDays, 0) / STRATEGIC_OPPORTUNITIES.length)}d` },
                        ].map((m, i) => (
                            <div key={m.label} style={{ padding: '20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
                        <div>
                            {/* Controls */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', overflow: 'hidden' }}>
                                    {PHASES.map(p => (
                                        <button key={p} onClick={() => setPhaseFilter(p)}
                                            style={{ padding: '5px 12px', background: phaseFilter === p ? 'var(--text-primary)' : 'transparent', color: phaseFilter === p ? 'var(--bg-primary)' : 'var(--text-secondary)', border: 'none', fontSize: '0.5rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', borderRight: '1px solid var(--border)' }}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                                    style={{ padding: '5px 10px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: '0.5625rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
                                    <option value="value">Sort: Value</option>
                                    <option value="confidence">Sort: Confidence</option>
                                    <option value="cycleDays">Sort: Cycle Days</option>
                                </select>
                            </div>

                            {/* Table */}
                            <div style={{ border: '1px solid var(--border)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                            {['Organisation', 'Sector', 'Value', 'Fit', 'Partner', 'Phase', 'Cycle', 'Confidence'].map(h => (
                                                <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map(opp => (
                                            <motion.tr key={opp.org} layout
                                                style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s', cursor: 'pointer' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '11px 14px', fontWeight: 600 }}>{opp.org}</td>
                                                <td style={{ padding: '11px 14px', color: 'var(--text-secondary)' }}>{opp.sector}</td>
                                                <td style={{ padding: '11px 14px', fontWeight: 700 }}>${opp.value.toLocaleString()}K</td>
                                                <td style={{ padding: '11px 14px' }}>{opp.fit}</td>
                                                <td style={{ padding: '11px 14px', color: 'var(--text-secondary)', fontSize: '0.6875rem' }}>{opp.partner}</td>
                                                <td style={{ padding: '11px 14px' }}>
                                                    <span style={{ padding: '2px 7px', background: 'var(--bg-card)', fontSize: '0.5625rem', color: 'var(--text-secondary)', borderRadius: 2 }}>{opp.phase}</span>
                                                </td>
                                                <td style={{ padding: '11px 14px', color: opp.cycleDays > 80 ? 'var(--status-danger-text, #dc2626)' : 'var(--text-secondary)' }}>{opp.cycleDays}d</td>
                                                <td style={{ padding: '11px 14px' }}>
                                                    <span style={{ fontWeight: 600, color: opp.confidence >= 80 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{opp.confidence}%</span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Funnel */}
                        <div style={{ border: '1px solid var(--border)', padding: '20px' }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Stage Funnel</p>
                            {STAGE_ORDER.map((stage, i) => {
                                const counts = [8, 6, 5, 4, 2];
                                const count = counts[i];
                                const pct = Math.round(count / 8 * 100);
                                return (
                                    <div key={stage} style={{ marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{stage}</span>
                                            <span style={{ fontSize: '0.5625rem', fontWeight: 600 }}>{count}</span>
                                        </div>
                                        <div style={{ height: 6, background: 'var(--bg-card)', borderRadius: 3, overflow: 'hidden' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                                style={{ height: '100%', background: 'var(--text-primary)', borderRadius: 3 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
