'use client';

import React, { useState } from 'react';

export interface KanbanDeal {
    id: string;
    account: string;
    arrFormatted: string;
    ownerInitials: string;
    dwellDays: number;
    slaStatus: 'ok' | 'warning' | 'breach';
}

export interface KanbanColumn {
    id: string;
    label: string;
    wipLimit: number;
    slaThresholdDays: number;
    deals: KanbanDeal[];
}

interface Props {
    columns: KanbanColumn[];
    accent?: string;
    onDealClick?: (deal: KanbanDeal, columnId: string) => void;
}

const SLA_COLORS = {
    ok: { bg: 'rgba(63,185,80,0.15)', text: '#3fb950', border: 'rgba(63,185,80,0.4)' },
    warning: { bg: 'rgba(210,153,34,0.15)', text: '#d29922', border: 'rgba(210,153,34,0.4)' },
    breach: { bg: 'rgba(248,81,73,0.15)', text: '#f85149', border: 'rgba(248,81,73,0.4)' },
};

function DealCard({ deal, accent, onClick }: { deal: KanbanDeal; accent: string; onClick?: () => void }) {
    const [hov, setHov] = useState(false);
    const sla = SLA_COLORS[deal.slaStatus];

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? 'var(--bg-elevated, #22272e)' : 'var(--bg-card, #1c2128)',
                border: `1px solid ${hov ? `${accent}35` : 'var(--border-card, rgba(48,54,61,0.8))'}`,
                borderRadius: 6,
                padding: '8px 10px',
                marginBottom: 6,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                transform: hov ? 'translateY(-1px)' : 'none',
                boxShadow: hov ? `0 4px 12px rgba(0,0,0,0.3)` : 'none',
                borderLeft: `3px solid ${sla.border}`,
            }}>
            {/* Account name */}
            <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary, #e6edf3)',
                marginBottom: 5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 160,
            }}>
                {deal.account}
            </div>
            {/* Row 2: ARR + Owner + Dwell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* ARR badge */}
                <span style={{
                    background: `${accent}18`,
                    color: accent,
                    fontSize: '0.5625rem',
                    padding: '2px 5px',
                    borderRadius: 3,
                    fontWeight: 600,
                }}>
                    {deal.arrFormatted}
                </span>
                {/* Owner initials */}
                <span style={{
                    background: 'var(--bg-elevated, #22272e)',
                    color: 'var(--text-secondary, #8b949e)',
                    fontSize: '0.5625rem',
                    padding: '2px 5px',
                    borderRadius: '50%',
                    fontWeight: 700,
                    minWidth: 20,
                    textAlign: 'center',
                }}>
                    {deal.ownerInitials}
                </span>
                {/* Dwell timer */}
                <span style={{
                    background: sla.bg,
                    color: sla.text,
                    fontSize: '0.5625rem',
                    padding: '2px 5px',
                    borderRadius: 3,
                    fontWeight: 600,
                    marginLeft: 'auto',
                }}>
                    {deal.dwellDays}d
                </span>
            </div>
        </div>
    );
}

export function KanbanBoard({ columns, accent = '#58a6ff', onDealClick }: Props) {
    const [expandedCol, setExpandedCol] = useState<string | null>(null);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns.length}, minmax(180px, 1fr))`,
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
        }}>
            {columns.map(col => {
                const dealCount = col.deals.length;
                const wipPct = (dealCount / col.wipLimit) * 100;
                const wipColor = wipPct >= 100 ? '#f85149' : wipPct >= 80 ? '#d29922' : 'var(--text-secondary, #8b949e)';
                const avgDwell = dealCount > 0
                    ? col.deals.reduce((s, d) => s + d.dwellDays, 0) / dealCount
                    : 0;
                const isBottleneck = avgDwell > col.slaThresholdDays;

                // Sort: breach first, then warning, then ok
                const sorted = [...col.deals].sort((a, b) => {
                    const order = { breach: 0, warning: 1, ok: 2 };
                    return order[a.slaStatus] - order[b.slaStatus];
                });
                const showAll = expandedCol === col.id;
                const visible = showAll ? sorted : sorted.slice(0, 5);

                return (
                    <div key={col.id} style={{
                        background: 'var(--bg-secondary, #161b22)',
                        border: `1px solid var(--border-card, rgba(48,54,61,0.8))`,
                        borderTop: `3px solid ${isBottleneck ? '#d29922' : accent}`,
                        borderRadius: 8,
                        minWidth: 180,
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 520,
                    }}>
                        {/* Column Header */}
                        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle, rgba(48,54,61,0.4))' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{
                                    fontSize: '0.625rem',
                                    fontWeight: 700,
                                    color: isBottleneck ? '#d29922' : 'var(--text-primary, #e6edf3)',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                }}>
                                    {col.label}
                                </span>
                                {isBottleneck && (
                                    <span style={{ fontSize: '0.5rem', color: '#d29922' }}>⚠ Bottleneck</span>
                                )}
                            </div>
                            {/* WIP gauge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ flex: 1, height: 3, background: 'var(--border-subtle, rgba(48,54,61,0.4))', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${Math.min(wipPct, 100)}%`,
                                        height: '100%',
                                        background: wipColor,
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                                <span style={{ fontSize: '0.5rem', color: wipColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {dealCount}/{col.wipLimit}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted, #484f58)', marginTop: 3 }}>
                                SLA: {col.slaThresholdDays}d · Avg: {avgDwell.toFixed(1)}d
                            </div>
                        </div>

                        {/* Cards */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
                            {visible.map(deal => (
                                <DealCard
                                    key={deal.id}
                                    deal={deal}
                                    accent={accent}
                                    onClick={() => onDealClick?.(deal, col.id)}
                                />
                            ))}
                            {sorted.length > 5 && (
                                <button
                                    onClick={() => setExpandedCol(showAll ? null : col.id)}
                                    style={{
                                        width: '100%',
                                        padding: '6px',
                                        background: 'transparent',
                                        border: `1px dashed ${accent}30`,
                                        borderRadius: 4,
                                        color: accent,
                                        fontSize: '0.5625rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                        marginTop: 4,
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = `${accent}10`)}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    {showAll ? `Show less ↑` : `+${sorted.length - 5} more ↓`}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
