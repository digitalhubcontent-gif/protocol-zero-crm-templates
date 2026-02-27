'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { REPORTS } from '../data';

const accent = '#58a6ff';

function ReportsContent() {
    const [selected, setSelected] = useState(REPORTS[0]);

    const statusColor = (s: string) =>
        s === 'ready' ? '#3fb950' : s === 'generating' ? '#d29922' : '#8b949e';
    const statusLabel = (s: string) =>
        s === 'ready' ? 'Ready' : s === 'generating' ? 'Generating…' : 'Scheduled';

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Report Suite</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Flow analysis · Compliance · Sequence performance</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
                    {/* Report cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, alignContent: 'start' }}>
                        {REPORTS.map(r => (
                            <div key={r.id}
                                onClick={() => setSelected(r)}
                                style={{
                                    background: selected.id === r.id ? `${accent}0c` : 'var(--bg-card)',
                                    border: `1px solid ${selected.id === r.id ? accent : 'var(--border-card)'}`,
                                    borderRadius: 8, padding: '16px 18px',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    transform: selected.id === r.id ? 'translateY(-2px)' : 'none',
                                }}
                                onMouseEnter={e => {
                                    if (selected.id !== r.id) {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`;
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (selected.id !== r.id) {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)';
                                        (e.currentTarget as HTMLDivElement).style.transform = 'none';
                                    }
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <span style={{ fontSize: '0.5625rem', color: accent, background: `${accent}10`, padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>
                                        {r.category.toUpperCase()}
                                    </span>
                                    <span style={{ fontSize: '0.5rem', color: statusColor(r.status), background: `${statusColor(r.status)}15`, padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>
                                        ● {statusLabel(r.status)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{r.name}</div>
                                <div style={{ fontSize: '0.625rem', color: accent, marginBottom: 4 }}>{r.stat}</div>
                                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Last run: {r.lastRun}</div>
                            </div>
                        ))}
                    </div>

                    {/* Report detail panel */}
                    <div style={{
                        background: 'var(--bg-card)', border: `1px solid ${accent}25`,
                        borderRadius: 8, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        <div>
                            <div style={{ fontSize: '0.5625rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                                {selected.category}
                            </div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{selected.name}</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                This report provides detailed visibility into {selected.name.toLowerCase()}, tracking key metrics across all active deals and flow owners. Last updated {selected.lastRun}.
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', borderRadius: 6, padding: '12px 14px' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Metric</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: accent }}>{selected.stat}</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button style={{
                                padding: '10px 0', background: accent, color: 'var(--bg-primary)',
                                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                                transition: 'opacity 0.15s',
                                opacity: selected.status !== 'ready' ? 0.5 : 1,
                            }}
                                disabled={selected.status !== 'ready'}
                                onMouseEnter={e => { if (selected.status === 'ready') (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = selected.status !== 'ready' ? '0.5' : '1'; }}>
                                ↓ Export PDF
                            </button>
                            <button style={{
                                padding: '10px 0', background: `${accent}12`, color: accent,
                                border: `1px solid ${accent}30`, borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                                transition: 'all 0.15s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}22`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}12`; }}>
                                ⏰ Schedule Report
                            </button>
                        </div>

                        <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-subtle)' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Details</div>
                            {[{ k: 'Report ID', v: selected.id }, { k: 'Status', v: selected.status }, { k: 'Last Run', v: selected.lastRun }].map(row => (
                                <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{row.k}</span>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Reports05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
