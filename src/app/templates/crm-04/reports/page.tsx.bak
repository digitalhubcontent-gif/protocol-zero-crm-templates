'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const REPORTS = [
    { id: 'R-001', name: 'Q2 2026 Partner Alignment Report', type: 'Quarterly', status: 'Ready', pages: 28, date: '2 hours ago' },
    { id: 'R-002', name: 'Strategic Opportunity Digest', type: 'Weekly', status: 'Ready', pages: 12, date: '1 day ago' },
    { id: 'R-003', name: 'Board Investment Thesis Documentation', type: 'Quarterly', status: 'Ready', pages: 44, date: '3 days ago' },
    { id: 'R-004', name: 'Sector Distribution Analysis', type: 'Monthly', status: 'Generating', pages: null, date: null },
    { id: 'R-005', name: 'Principal Influence Mapping Report', type: 'As Needed', status: 'Ready', pages: 16, date: '5 days ago' },
    { id: 'R-006', name: 'NRR Cohort Retention Analysis', type: 'Quarterly', status: 'Ready', pages: 24, date: '1 week ago' },
    { id: 'R-007', name: 'Decision Trigger Intelligence Brief', type: 'Monthly', status: 'Scheduled', pages: null, date: null },
    { id: 'R-008', name: 'FY 2025 Strategic Impact Summary', type: 'Annual', status: 'Ready', pages: 64, date: '2 weeks ago' },
];

export default function Crm04ReportsPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [selected, setSelected] = useState<typeof REPORTS[0] | null>(null);
    const [typeFilter, setTypeFilter] = useState('All');
    const types = ['All', ...Array.from(new Set(REPORTS.map(r => r.type)))];
    const filtered = typeFilter === 'All' ? REPORTS : REPORTS.filter(r => r.type === typeFilter);

    const statusStyle = (s: string) => ({
        Ready: { color: 'var(--status-success-text, #15803d)', bg: 'var(--status-success-bg, #f0fdf4)', border: 'var(--status-success-border, #bbf7d0)' },
        Generating: { color: 'var(--status-info-text, #1d4ed8)', bg: 'var(--status-info-bg, #eff6ff)', border: 'var(--status-info-border, #bfdbfe)' },
        Scheduled: { color: 'var(--text-secondary)', bg: 'var(--bg-secondary)', border: 'var(--border)' },
    }[s] || { color: 'var(--text-secondary)', bg: 'var(--bg-secondary)', border: 'var(--border)' });

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reports &nbsp;/&nbsp; Outputs &amp; Documentation</span>
                </div>
                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <p style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Report Library</p>
                                <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', overflow: 'hidden' }}>
                                    {types.map(t => (
                                        <button key={t} onClick={() => setTypeFilter(t)}
                                            style={{ padding: '5px 12px', background: typeFilter === t ? 'var(--text-primary)' : 'transparent', color: typeFilter === t ? 'var(--bg-primary)' : 'var(--text-secondary)', border: 'none', fontSize: '0.5rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', borderRight: '1px solid var(--border)' }}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ border: '1px solid var(--border)' }}>
                                {filtered.map((r, i) => {
                                    const ss = statusStyle(r.status);
                                    return (
                                        <button key={r.id} onClick={() => setSelected(x => x?.id === r.id ? null : r)}
                                            style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', background: selected?.id === r.id ? 'var(--bg-secondary)' : 'var(--bg-primary)', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', border: selected?.id === r.id ? '1px solid var(--text-primary)' : 'none', transition: 'all 0.15s' }}
                                            onMouseEnter={e => { if (selected?.id !== r.id) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                                            onMouseLeave={e => { if (selected?.id !== r.id) e.currentTarget.style.background = 'var(--bg-primary)'; }}>
                                            <div>
                                                <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{r.name}</p>
                                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{r.type}{r.pages ? ` · ${r.pages} pages` : ''}{r.date ? ` · ${r.date}` : ''}</p>
                                            </div>
                                            <span style={{ fontSize: '0.5rem', padding: '2px 7px', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 2, flexShrink: 0 }}>{r.status}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right panel */}
                        <div>
                            <AnimatePresence mode="wait">
                                {selected ? (
                                    <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ border: '1px solid var(--border)', padding: '20px', marginBottom: 16 }}>
                                        <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Report Preview</p>
                                        <p style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 4px', lineHeight: 1.4 }}>{selected.name}</p>
                                        <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{selected.type}</p>
                                        {[
                                            { label: 'Report ID', val: selected.id },
                                            { label: 'Status', val: selected.status },
                                            { label: 'Pages', val: selected.pages?.toString() || 'N/A' },
                                            { label: 'Generated', val: selected.date || 'Pending' },
                                        ].map(m => (
                                            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{m.label}</span>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 500 }}>{m.val}</span>
                                            </div>
                                        ))}
                                        <button
                                            disabled={selected.status !== 'Ready'}
                                            style={{ width: '100%', marginTop: 16, padding: '11px', background: selected.status === 'Ready' ? 'var(--text-primary)' : 'var(--bg-card)', border: 'none', color: selected.status === 'Ready' ? 'var(--bg-primary)' : 'var(--text-muted)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', cursor: selected.status === 'Ready' ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background 0.15s' }}
                                            onMouseEnter={e => { if (selected.status === 'Ready') e.currentTarget.style.opacity = '0.85'; }}
                                            onMouseLeave={e => { if (selected.status === 'Ready') e.currentTarget.style.opacity = '1'; }}>
                                            {selected.status === 'Ready' ? 'Download PDF' : 'Awaiting Generation'}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div style={{ border: '1px solid var(--border)', padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.625rem', letterSpacing: '0.08em', marginBottom: 16 }}>
                                        SELECT A REPORT
                                    </div>
                                )}
                            </AnimatePresence>
                            <div style={{ border: '1px solid var(--border)', padding: '16px' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Statistics</p>
                                {[
                                    { label: 'Total Reports', val: REPORTS.length },
                                    { label: 'Ready', val: REPORTS.filter(r => r.status === 'Ready').length },
                                    { label: 'Generating', val: REPORTS.filter(r => r.status === 'Generating').length },
                                    { label: 'Scheduled', val: REPORTS.filter(r => r.status === 'Scheduled').length },
                                ].map(s => (
                                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                                        <span style={{ fontSize: '0.5625rem', fontWeight: 600 }}>{s.val}</span>
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
