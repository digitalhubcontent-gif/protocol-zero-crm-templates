'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { AI_DEALS, BEHAVIORAL_PROFILES } from '../data';

const accent = '#a78bfa';

const momentumColor = (m: string) =>
    m === 'accelerating' ? '#3fb950' : m === 'holding' ? '#d29922' : '#f85149';

function PipelineContent() {
    const [sortBy, setSortBy] = useState<'confidence' | 'value' | 'momentum'>('confidence');
    const [selectedDeal, setSelectedDeal] = useState(AI_DEALS[0]);

    const sorted = [...AI_DEALS].sort((a, b) => {
        if (sortBy === 'value') return b.value - a.value;
        if (sortBy === 'momentum') {
            const order = { accelerating: 0, holding: 1, decelerating: 2 } as Record<string, number>;
            return order[a.momentum] - order[b.momentum];
        }
        return b.confidence - a.confidence;
    });

    const stageGroups = ['Qualify', 'Discovery', 'Demo', 'Proposal', 'Negotiation'];
    const byStage = stageGroups.map(s => ({
        stage: s,
        deals: AI_DEALS.filter(d => d.stage === s),
        total: AI_DEALS.filter(d => d.stage === s).reduce((sum, d) => sum + d.value, 0),
    }));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>AI-Ranked Deal Matrix</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Confidence-ranked pipeline · Behavioral signals · Risk flags</p>
                </div>

                {/* Stage pipeline overview */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto' }}>
                    {byStage.map(group => (
                        <div key={group.stage} style={{
                            flex: 1, minWidth: 140, background: 'var(--bg-card)',
                            border: '1px solid var(--border-card)', borderRadius: 8,
                            padding: '12px 14px', cursor: 'default',
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{group.stage}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: accent, letterSpacing: '-0.02em' }}>{group.deals.length}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>${(group.total / 1000).toFixed(0)}K</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 348px', gap: 20 }}>
                    {/* Deal list */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pipeline Matrix</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {(['confidence', 'value', 'momentum'] as const).map(s => (
                                    <button key={s} onClick={() => setSortBy(s)} style={{
                                        padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.5625rem', fontWeight: 600,
                                        background: sortBy === s ? `${accent}20` : 'transparent',
                                        color: sortBy === s ? accent : 'var(--text-secondary)',
                                        border: `1px solid ${sortBy === s ? `${accent}40` : 'var(--border-subtle)'}`,
                                        transition: 'all 0.15s', textTransform: 'capitalize',
                                    }}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-secondary)' }}>
                                    {['Account', 'Stage', 'Value', 'Confidence', 'Momentum', 'Day', 'Risks'].map(h => (
                                        <th key={h} style={{ padding: '7px 12px', fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.map(d => {
                                    const confColor = d.confidence >= 75 ? accent : d.confidence >= 55 ? '#d29922' : '#f85149';
                                    const isSelected = selectedDeal.id === d.id;
                                    return (
                                        <tr key={d.id} onClick={() => setSelectedDeal(d)}
                                            style={{
                                                cursor: 'pointer', transition: 'background 0.1s',
                                                background: isSelected ? `${accent}10` : 'transparent',
                                                borderLeft: isSelected ? `3px solid ${accent}` : '3px solid transparent',
                                                borderBottom: '1px solid var(--border-subtle)',
                                            }}
                                            onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)'; }}
                                            onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                            <td style={{ padding: '8px 12px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{d.account}</td>
                                            <td style={{ padding: '8px 12px', fontSize: '0.625rem', color: 'var(--text-secondary)' }}>{d.stage}</td>
                                            <td style={{ padding: '8px 12px', fontSize: '0.625rem', fontWeight: 600, color: accent }}>${(d.value / 1000).toFixed(0)}K</td>
                                            <td style={{ padding: '8px 12px' }}>
                                                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                                    <div style={{ width: 36, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                                        <div style={{ width: `${d.confidence}%`, height: '100%', background: confColor, borderRadius: 2 }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: confColor }}>{d.confidence}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '8px 12px', fontSize: '0.625rem', fontWeight: 700, color: momentumColor(d.momentum) }}>
                                                {d.momentum.charAt(0).toUpperCase() + d.momentum.slice(1)}
                                            </td>
                                            <td style={{ padding: '8px 12px', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{d.days}d</td>
                                            <td style={{ padding: '8px 12px' }}>
                                                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                                    {d.risks.map(r => (
                                                        <span key={r} style={{ fontSize: '0.375rem', background: '#f8514912', color: '#f85149', padding: '1px 3px', borderRadius: 2, fontWeight: 600 }}>{r}</span>
                                                    ))}
                                                    {d.risks.length === 0 && <span style={{ fontSize: '0.375rem', color: '#3fb950' }}>✓ Clean</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Deal detail */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}30`, borderRadius: 8, padding: '18px 18px' }}>
                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Deal Intelligence</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{selectedDeal.account}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: 16 }}>{selectedDeal.stage} · {selectedDeal.days}d in stage</div>

                        {/* Confidence gauge band */}
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>AI Confidence Score</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedDeal.confidence >= 75 ? accent : selectedDeal.confidence >= 55 ? '#d29922' : '#f85149' }}>{selectedDeal.confidence}%</span>
                            </div>
                            <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4 }}>
                                <div style={{ width: `${selectedDeal.confidence}%`, height: '100%', background: selectedDeal.confidence >= 75 ? accent : selectedDeal.confidence >= 55 ? '#d29922' : '#f85149', borderRadius: 4, transition: 'width 0.4s' }} />
                            </div>
                        </div>

                        {/* Signals */}
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Active Signals</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {selectedDeal.signals.map(s => (
                                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', background: `${accent}10`, borderRadius: 4 }}>
                                        <span style={{ color: '#3fb950', fontSize: '0.625rem' }}>✓</span>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risks */}
                        {selectedDeal.risks.length > 0 && (
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: '0.5625rem', color: '#f85149', marginBottom: 6, textTransform: 'uppercase' }}>Risk Flags</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {selectedDeal.risks.map(r => (
                                        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', background: '#f8514910', borderRadius: 4 }}>
                                            <span style={{ color: '#f85149', fontSize: '0.625rem' }}>⚠</span>
                                            <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{r}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Momentum badge */}
                        <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: momentumColor(selectedDeal.momentum), background: `${momentumColor(selectedDeal.momentum)}15`, padding: '4px 10px', borderRadius: 4 }}>
                                {selectedDeal.momentum === 'accelerating' ? '↑' : selectedDeal.momentum === 'holding' ? '→' : '↓'} {selectedDeal.momentum}
                            </span>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: accent, background: `${accent}12`, padding: '4px 10px', borderRadius: 4 }}>
                                ${(selectedDeal.value / 1000).toFixed(0)}K ARR
                            </span>
                        </div>

                        {/* AI recommendation */}
                        <div style={{ padding: '10px 12px', background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 6, marginBottom: 14 }}>
                            <div style={{ fontSize: '0.5rem', color: accent, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>AI Next Action</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                {selectedDeal.confidence >= 75
                                    ? 'Champions actively engaged — schedule exec alignment meeting now.'
                                    : selectedDeal.confidence >= 55
                                        ? 'Momentum slowing — recommend direct outreach from AE + champion re-engagement.'
                                        : 'Multiple risk flags — flag for manager review immediately.'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Pipeline06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="pipeline" accentColor={accent}>
            <PipelineContent />
        </CrmLayout>
    );
}
