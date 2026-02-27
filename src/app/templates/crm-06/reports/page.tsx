'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { NEURAL_REPORTS } from '../data';

const accent = '#a78bfa';

function ReportsContent() {
    const [selected, setSelected] = useState(NEURAL_REPORTS[0]);

    const statusColor = (s: string) =>
        s === 'ready' ? '#3fb950' : s === 'generating' ? accent : '#8b949e';

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1300, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Neural Report Suite</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI model accuracy · Signal attribution · Behavioral cohorts</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
                    {/* Report grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, alignContent: 'start' }}>
                        {NEURAL_REPORTS.map(r => (
                            <div key={r.id}
                                onClick={() => setSelected(r)}
                                style={{
                                    background: selected.id === r.id ? `${accent}08` : 'var(--bg-card)',
                                    border: `1px solid ${selected.id === r.id ? accent : 'var(--border-card)'}`,
                                    borderRadius: 8, padding: '16px 18px', cursor: 'pointer', transition: 'all 0.2s',
                                    transform: selected.id === r.id ? 'translateY(-2px)' : 'none',
                                }}
                                onMouseEnter={e => { if (selected.id !== r.id) { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; } }}
                                onMouseLeave={e => { if (selected.id !== r.id) { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; } }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <span style={{ fontSize: '0.5625rem', color: accent, background: `${accent}10`, padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>{r.category}</span>
                                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: statusColor(r.status), padding: '2px 6px', borderRadius: 3, background: `${statusColor(r.status)}15` }}>
                                        ● {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{r.name}</div>
                                <div style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, marginBottom: 4 }}>Accuracy: {r.accuracy}</div>
                                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Last run: {r.lastRun}</div>
                            </div>
                        ))}
                    </div>

                    {/* Report detail */}
                    <div style={{
                        background: 'var(--bg-card)', border: `1px solid ${accent}25`,
                        borderRadius: 8, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        <div>
                            <div style={{ fontSize: '0.5625rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{selected.category}</div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{selected.name}</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                AI-driven {selected.name.toLowerCase()} report. Evaluates model precision and behavioral patterns across active deal portfolio. Last run: {selected.lastRun}.
                            </div>
                        </div>

                        <div style={{ background: `${accent}08`, border: `1px solid ${accent}20`, borderRadius: 6, padding: '14px 16px' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Model Accuracy</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: accent }}>{selected.accuracy}</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button style={{
                                padding: '10px 0', background: accent, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer',
                                fontSize: '0.75rem', fontWeight: 700, opacity: selected.status !== 'ready' ? 0.5 : 1,
                                transition: 'opacity 0.15s',
                            }}
                                disabled={selected.status !== 'ready'}
                                onMouseEnter={e => { if (selected.status === 'ready') (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = selected.status !== 'ready' ? '0.5' : '1'; }}>
                                ↓ Export PDF
                            </button>
                            <button style={{
                                padding: '10px 0', background: `${accent}12`, color: accent,
                                border: `1px solid ${accent}30`, borderRadius: 6, cursor: 'pointer',
                                fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.15s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}22`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}12`; }}>
                                ⏰ Schedule Weekly
                            </button>
                        </div>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                            {[{ k: 'Report ID', v: selected.id }, { k: 'Status', v: selected.status }, { k: 'Last Run', v: selected.lastRun }].map(row => (
                                <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
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

export default function Reports06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
