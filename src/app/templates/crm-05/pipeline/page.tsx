'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { KanbanBoard } from '@/components/charts/KanbanBoard';
import { CumulativeFlowChart } from '@/components/charts/CumulativeFlowChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { KANBAN_COLUMNS, CFD_DATA, CFD_STAGE_ORDER, CFD_COLORS, FUNNEL_STAGES } from '../data';
import type { KanbanDeal } from '@/components/charts/KanbanBoard';

const accent = '#58a6ff';

function PipelineContent() {
    const [selectedOwner, setSelectedOwner] = useState<string>('All');
    const [selectedSLA, setSelectedSLA] = useState<string>('All');
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<{ deal: KanbanDeal; col: string } | null>(null);

    const owners = ['All', 'JR', 'AL', 'SM', 'KT'];
    const slaFilters = ['All', 'Breach', 'Warning', 'OK'] as const;

    // Apply filters
    const filteredCols = KANBAN_COLUMNS.map(col => ({
        ...col,
        deals: col.deals.filter(d => {
            const ownerMatch = selectedOwner === 'All' || d.ownerInitials === selectedOwner;
            const slaMatch = selectedSLA === 'All' || d.slaStatus === selectedSLA.toLowerCase();
            return ownerMatch && slaMatch;
        }),
    }));

    const totalDeals = filteredCols.reduce((s, c) => s + c.deals.length, 0);
    const stalledCount = filteredCols.reduce((s, c) => s + c.deals.filter(d => d.slaStatus === 'breach').length, 0);
    const warnCount = filteredCols.reduce((s, c) => s + c.deals.filter(d => d.slaStatus === 'warning').length, 0);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '24px 28px', maxWidth: 1600, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Kanban Execution Grid</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>6-gate pipeline · WIP limits enforced · SLA monitoring</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Owner filter */}
                        {owners.map(o => (
                            <button key={o} onClick={() => setSelectedOwner(o)} style={{
                                padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                background: selectedOwner === o ? accent : 'transparent',
                                color: selectedOwner === o ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                border: `1px solid ${selectedOwner === o ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{o}</button>
                        ))}
                        <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
                        {slaFilters.map(f => (
                            <button key={f} onClick={() => setSelectedSLA(f)} style={{
                                padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                                background: selectedSLA === f ? `${accent}18` : 'transparent',
                                color: selectedSLA === f ? accent : 'var(--text-secondary)',
                                border: `1px solid ${selectedSLA === f ? `${accent}40` : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{f}</button>
                        ))}
                    </div>
                </div>

                {/* Summary bar */}
                <div style={{
                    display: 'flex', gap: 20, padding: '10px 16px', marginBottom: 16,
                    background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 6,
                    flexWrap: 'wrap',
                }}>
                    {[
                        { label: 'Active Deals', value: totalDeals, color: 'var(--text-primary)' },
                        { label: 'SLA Breach', value: stalledCount, color: '#f85149' },
                        { label: 'At Risk', value: warnCount, color: '#d29922' },
                        { label: 'Avg Velocity', value: '6.8d', color: accent },
                    ].map(s => (
                        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Kanban Board */}
                <KanbanBoard
                    columns={filteredCols}
                    accent={accent}
                    onDealClick={(deal, col) => setSelectedDeal({ deal, col })}
                />

                {/* Expand analysis */}
                <button
                    onClick={() => setShowAnalysis(v => !v)}
                    style={{
                        width: '100%', marginTop: 16, padding: '8px 0',
                        background: 'transparent', border: `1px solid ${accent}30`,
                        borderRadius: 6, cursor: 'pointer', color: accent,
                        fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}10`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                    {showAnalysis ? '↑ Hide Analysis' : '↓ Show Pipeline Analysis'}
                </button>

                {showAnalysis && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '18px 20px' }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                                Cumulative Flow — 30 Day View
                            </div>
                            <CumulativeFlowChart
                                data={CFD_DATA}
                                stageOrder={CFD_STAGE_ORDER}
                                stageColors={CFD_COLORS}
                                accent={accent}
                                height={200}
                            />
                        </div>
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, padding: '18px 20px' }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                                Stage Conversion Funnel
                            </div>
                            <FunnelChart stages={FUNNEL_STAGES} accent={accent} height={200} />
                        </div>
                    </div>
                )}

                {/* Deal detail panel */}
                {selectedDeal && (
                    <div style={{
                        position: 'fixed', right: 0, top: 0, bottom: 0, width: 320,
                        background: 'var(--bg-card)', borderLeft: `2px solid ${accent}40`,
                        padding: '24px 20px', overflowY: 'auto', zIndex: 100,
                        boxShadow: '-8px 0 32px var(--bg-overlay)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <span style={{ fontSize: '0.625rem', color: accent, fontWeight: 700, textTransform: 'uppercase' }}>Deal Detail</span>
                            <button onClick={() => setSelectedDeal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{selectedDeal.deal.account}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 16 }}>{selectedDeal.col} · {selectedDeal.deal.dwellDays}d dwell</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'ARR', value: selectedDeal.deal.arrFormatted },
                                { label: 'Owner', value: selectedDeal.deal.ownerInitials },
                                { label: 'SLA Status', value: selectedDeal.deal.slaStatus.toUpperCase() },
                                { label: 'Dwell', value: `${selectedDeal.deal.dwellDays} days` },
                            ].map(row => (
                                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{row.label}</span>
                                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <button style={{
                            marginTop: 20, width: '100%', padding: '10px 0',
                            background: accent, color: 'var(--bg-primary)',
                            border: 'none', borderRadius: 6, cursor: 'pointer',
                            fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                            Advance Stage →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Pipeline05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <PipelineContent />
        </CrmLayout>
    );
}
