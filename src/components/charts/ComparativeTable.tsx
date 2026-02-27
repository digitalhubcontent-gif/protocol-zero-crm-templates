'use client';

import React, { useState, useMemo } from 'react';

interface ComparativeRow {
    metric: string;
    category: 'Revenue' | 'Efficiency' | 'Retention' | 'Activity';
    valueA: string | number;
    valueB: string | number;
    deltaAbs: string;
    deltaPct: number;
    interpretation: 'A_better' | 'B_better' | 'neutral';
    significant: boolean;
}

interface Props {
    rows: ComparativeRow[];
    sortBy?: 'deltaAbs' | 'deltaPct';
    filterCategory?: string;
    segmentALabel?: string;
    segmentBLabel?: string;
}

const catColors: Record<string, string> = {
    Revenue: '#3b82f6',
    Efficiency: '#22c55e',
    Retention: '#f59e0b',
    Activity: '#8b5cf6',
};

export function ComparativeTable({
    rows, sortBy = 'deltaPct', segmentALabel = 'AMER', segmentBLabel = 'EMEA',
}: Props) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const categories = Array.from(new Set(rows.map(r => r.category)));

    const filtered = useMemo(() => {
        let result = activeFilter ? rows.filter(r => r.category === activeFilter) : [...rows];
        if (sortBy === 'deltaPct') {
            result.sort((a, b) => Math.abs(b.deltaPct) - Math.abs(a.deltaPct));
        }
        return result;
    }, [rows, activeFilter, sortBy]);

    return (
        <div>
            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                <button onClick={() => setActiveFilter(null)} style={{
                    padding: '4px 10px', borderRadius: 12, fontSize: '0.5625rem', fontWeight: 600,
                    background: !activeFilter ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: !activeFilter ? '#e5e7eb' : '#6b7280',
                    border: `1px solid ${!activeFilter ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                    cursor: 'pointer', transition: 'all 0.15s',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = !activeFilter ? 'rgba(255,255,255,0.1)' : 'transparent'; }}>
                    All
                </button>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveFilter(activeFilter === cat ? null : cat)} style={{
                        padding: '4px 10px', borderRadius: 12, fontSize: '0.5625rem', fontWeight: 600,
                        background: activeFilter === cat ? `${catColors[cat]}18` : 'transparent',
                        color: activeFilter === cat ? catColors[cat] : '#6b7280',
                        border: `1px solid ${activeFilter === cat ? `${catColors[cat]}35` : 'rgba(255,255,255,0.06)'}`,
                        cursor: 'pointer', transition: 'all 0.15s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${catColors[cat]}12`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = activeFilter === cat ? `${catColors[cat]}18` : 'transparent'; }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                    <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
                            {['Metric', segmentALabel, segmentBLabel, 'Δ Abs', 'Δ%', 'Flag'].map(h => (
                                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#4b5563', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row, i) => (
                            <tr key={row.metric} style={{
                                borderTop: '1px solid rgba(255,255,255,0.03)',
                                borderLeft: row.significant ? `3px solid ${row.deltaPct >= 0 ? '#22c55e' : '#ef4444'}` : '3px solid transparent',
                                transition: 'all 0.15s', cursor: 'pointer',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.03)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}>
                                <td style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: '0.4375rem', fontWeight: 700, background: `${catColors[row.category]}15`, color: catColors[row.category] }}>{row.category}</span>
                                    <span style={{ color: '#d1d5db', fontWeight: 500 }}>{row.metric}</span>
                                </td>
                                <td style={{ padding: '8px 10px', color: '#9ca3af', fontWeight: 600 }}>{row.valueA}</td>
                                <td style={{ padding: '8px 10px', color: '#9ca3af', fontWeight: 600 }}>{row.valueB}</td>
                                <td style={{ padding: '8px 10px', color: '#d1d5db', fontWeight: 600 }}>{row.deltaAbs}</td>
                                <td style={{ padding: '8px 10px' }}>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: 3, fontSize: '0.5625rem', fontWeight: 700,
                                        background: row.deltaPct >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                        color: row.deltaPct >= 0 ? '#22c55e' : '#ef4444',
                                    }}>
                                        {row.deltaPct >= 0 ? '+' : ''}{row.deltaPct}%
                                    </span>
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                    {row.interpretation === 'A_better' && <span style={{ fontSize: '0.5rem', color: '#3b82f6', fontWeight: 700 }}>A ▲</span>}
                                    {row.interpretation === 'B_better' && <span style={{ fontSize: '0.5rem', color: '#8b5cf6', fontWeight: 700 }}>B ▲</span>}
                                    {row.interpretation === 'neutral' && <span style={{ fontSize: '0.5rem', color: '#6b7280' }}>—</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
