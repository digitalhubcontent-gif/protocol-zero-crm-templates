'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { RISK_RULES } from '../data';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const REPORT_TEMPLATES = [
    { id: 'QRR-001', name: 'Q2 2026 Revenue Audit Report', period: 'Q2 2026', status: 'READY', pages: 48, generated: '2h ago' },
    { id: 'QRR-002', name: 'Monthly Exposure Briefing', period: 'Feb 2026', status: 'READY', pages: 12, generated: '1d ago' },
    { id: 'QRR-003', name: 'Board-Level ARR Attribution Report', period: 'Q1 2026', status: 'READY', pages: 24, generated: '3d ago' },
    { id: 'QRR-004', name: 'Credit Risk Sensitivity Analysis', period: 'Feb 2026', status: 'GENERATING', pages: null, generated: null },
    { id: 'QRR-005', name: 'Annual Revenue Recognition Report', period: 'FY 2025', status: 'READY', pages: 96, generated: '1w ago' },
    { id: 'QRR-006', name: 'Cohort NRR & Retention Analysis', period: 'Q1–Q4 2025', status: 'READY', pages: 32, generated: '2d ago' },
    { id: 'QRR-007', name: 'FX Exposure & Hedging Report', period: 'Feb 2026', status: 'SCHEDULED', pages: null, generated: null },
    { id: 'QRR-008', name: 'Investor Data Room Package', period: 'FY 2025', status: 'READY', pages: 128, generated: '5d ago' },
];

const STATUS_COLORS: Record<string, string> = {
    READY: '#10b981', GENERATING: '#3b82f6', SCHEDULED: am('70'),
};

const BOARDS = [
    { label: 'Revenue Intelligence', items: ['ARR Waterfall', 'Risk Tier Distribution', 'Renewal Forecast', 'Cohort NRR Table'] },
    { label: 'Executive Summary', items: ['Portfolio Overview', 'Exposure Index', 'Key Risk Flags', 'Scenario Comparison'] },
    { label: 'Credit Risk Report', items: ['Rating Breakdown', 'Settlement Analysis', 'Liquidity Horizon', 'Default Probability'] },
    { label: 'FX & Hedging', items: ['Currency Pairs Live', 'Hedging Coverage', 'Exposure by Currency', 'Impact Report'] },
];

export default function Crm03ReportsPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [selectedReport, setSelectedReport] = useState<typeof REPORT_TEMPLATES[0] | null>(null);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>EARNINGS REPORTS TERMINAL &nbsp;◆&nbsp; REGULATORY &amp; BOARD PACKAGES</span>
                </div>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
                        {/* Left */}
                        <div>
                            {/* Boards */}
                            <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>REPORT_BOARDS :: 4 CONFIGURED</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                                {BOARDS.map(board => (
                                    <div key={board.label} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px' }}>
                                        <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: 10 }}>{board.label}</p>
                                        {board.items.map(item => (
                                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: am('60'), flexShrink: 0 }} />
                                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Reports list */}
                            <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>GENERATED_REPORTS</p>
                            <div style={{ border: `1px solid ${am('12')}` }}>
                                {REPORT_TEMPLATES.map((r, i) => (
                                    <button key={r.id} onClick={() => setSelectedReport(x => x?.id === r.id ? null : r)}
                                        style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 16px', background: selectedReport?.id === r.id ? am('08') : 'transparent', borderBottom: i < REPORT_TEMPLATES.length - 1 ? `1px solid ${am('06')}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'monospace', border: selectedReport?.id === r.id ? `1px solid ${am('25')}` : 'none', transition: 'background 0.1s' }}
                                        onMouseEnter={e => { if (selectedReport?.id !== r.id) e.currentTarget.style.background = am('04'); }}
                                        onMouseLeave={e => { if (selectedReport?.id !== r.id) e.currentTarget.style.background = 'transparent'; }}>
                                        <div>
                                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{r.name}</p>
                                            <p style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginTop: 3 }}>{r.period}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                                            {r.pages && <span style={{ fontSize: '0.5rem', color: 'var(--text-accent)' }}>{r.pages}p</span>}
                                            {r.generated && <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{r.generated}</span>}
                                            <span style={{ fontSize: '0.45rem', fontWeight: 700, color: STATUS_COLORS[r.status], letterSpacing: '0.08em' }}>{r.status}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right panel */}
                        <div>
                            {selectedReport ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'var(--bg-card)', border: `1px solid ${am('25')}`, padding: '16px' }}>
                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>REPORT_BRIEF</p>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{selectedReport.name}</p>
                                    <p style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', marginBottom: 14 }}>{selectedReport.period}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                                        {[
                                            { key: 'ID', val: selectedReport.id },
                                            { key: 'STATUS', val: selectedReport.status },
                                            { key: 'PAGES', val: selectedReport.pages?.toString() || 'N/A' },
                                            { key: 'GENERATED', val: selectedReport.generated || 'Pending' },
                                        ].map(m => (
                                            <div key={m.key} style={{ background: 'var(--bg-secondary)', padding: '8px 10px' }}>
                                                <p style={{ fontSize: '0.4rem', color: 'var(--text-accent)', marginBottom: 3 }}>{m.key}</p>
                                                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-accent)' }}>{m.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button style={{ width: '100%', padding: '10px', background: selectedReport.status === 'READY' ? am('18') : '#0a0e14', border: `1px solid ${am('30')}`, color: 'var(--text-accent)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', cursor: selectedReport.status === 'READY' ? 'pointer' : 'not-allowed', fontFamily: 'monospace', opacity: selectedReport.status === 'READY' ? 1 : 0.5, transition: 'background 0.15s' }}
                                        onMouseEnter={e => { if (selectedReport.status === 'READY') e.currentTarget.style.background = am('28'); }}
                                        onMouseLeave={e => e.currentTarget.style.background = am('18')}>
                                        {selectedReport.status === 'READY' ? 'DOWNLOAD PDF' : 'AWAITING GENERATION...'}
                                    </button>
                                </motion.div>
                            ) : (
                                <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '20px', textAlign: 'center', color: 'var(--text-accent)', fontSize: '0.5625rem', letterSpacing: '0.08em' }}>
                                    SELECT A REPORT
                                </div>
                            )}

                            {/* Quick stats */}
                            <div style={{ marginTop: 12, background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>REPORT_STATISTICS</p>
                                {[
                                    { label: 'Total Reports Generated', val: '48' },
                                    { label: 'Avg Generation Time', val: '4.2 min' },
                                    { label: 'Scheduled This Month', val: '6' },
                                    { label: 'Compliance Coverage', val: '100%' },
                                ].map(s => (
                                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${am('06')}` }}>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{s.label}</span>
                                        <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-accent)' }}>{s.val}</span>
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
