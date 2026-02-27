'use client';

import React, { useState, useCallback } from 'react';

interface SegmentConfig {
    type: 'region' | 'industry' | 'rep' | 'timeframe' | 'segment';
    value: string;
    label: string;
}

interface DeltaItem {
    metric: string;
    valueA: string;
    valueB: string;
    delta: string;
    direction: 'positive' | 'negative';
}

interface Props {
    segmentA: SegmentConfig;
    segmentB: SegmentConfig;
    onSwap?: () => void;
    synced?: boolean;
    topDeltas?: DeltaItem[];
    significantCount?: number;
    childrenA: React.ReactNode;
    childrenB: React.ReactNode;
    centerContent?: React.ReactNode;
}

const SEGMENT_OPTIONS: { type: SegmentConfig['type']; label: string }[] = [
    { type: 'region', label: 'Region' },
    { type: 'industry', label: 'Industry' },
    { type: 'rep', label: 'Rep' },
    { type: 'timeframe', label: 'Timeframe' },
    { type: 'segment', label: 'Segment' },
];

const paneA = 'rgba(59, 130, 246, 0.04)';
const paneB = 'rgba(139, 92, 246, 0.04)';
const borderA = 'rgba(59, 130, 246, 0.2)';
const borderB = 'rgba(139, 92, 246, 0.2)';

export function DualPaneWrapper({
    segmentA, segmentB, onSwap, synced = false,
    topDeltas = [], significantCount = 0,
    childrenA, childrenB, centerContent,
}: Props) {
    const [isSynced, setIsSynced] = useState(synced);

    const handleSwap = useCallback(() => { onSwap?.(); }, [onSwap]);

    return (
        <div style={{ width: '100%' }}>
            {/* Significant Variance Badge */}
            {significantCount > 0 && (
                <div style={{
                    background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
                    borderRadius: 6, padding: '8px 16px', marginBottom: 14,
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: '0.6875rem', fontWeight: 700, color: '#ef4444',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(239,68,68,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(239,68,68,0.06)'; }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                    {significantCount} SIGNIFICANT VARIANCE{significantCount > 1 ? 'S' : ''} DETECTED — Review Required
                </div>
            )}

            {/* Main Layout */}
            <div style={{ display: 'flex', gap: 0, width: '100%' }}>
                {/* Pane A */}
                <div style={{ flex: '0 0 47%', background: paneA, borderLeft: `3px solid ${borderA}`, borderRadius: '8px 0 0 8px', padding: 20 }}>
                    {/* Segment Selector */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 0' }}>PANE A</span>
                        <select style={{
                            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                            color: '#d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: '0.625rem',
                            fontWeight: 600, cursor: 'pointer', outline: 'none',
                            transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = borderA; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(59,130,246,0.2)'; }}
                            defaultValue={segmentA.value}>
                            <option value={segmentA.value}>{segmentA.label}</option>
                            {SEGMENT_OPTIONS.map(o => (
                                <option key={o.type} value={o.type}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                    {childrenA}
                </div>

                {/* Center Strip */}
                <div style={{
                    flex: '0 0 6%', background: 'rgba(255,255,255,0.02)',
                    borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                    padding: '16px 4px', gap: 12,
                }}>
                    {/* Swap Button */}
                    <button onClick={handleSwap} style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        title="Swap panes">⇄</button>

                    {/* Sync Toggle */}
                    <button onClick={() => setIsSynced(!isSynced)} style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: isSynced ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isSynced ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        color: isSynced ? '#22c55e' : '#6b7280', cursor: 'pointer', fontSize: '0.6rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        title={isSynced ? 'Synced' : 'Unsyced'}>◎</button>

                    {/* Delta Ribbon */}
                    {topDeltas.slice(0, 3).map((d, i) => (
                        <div key={i} style={{
                            writingMode: 'vertical-rl', textOrientation: 'mixed',
                            fontSize: '0.4rem', fontWeight: 700, letterSpacing: '0.03em',
                            color: d.direction === 'positive' ? '#22c55e' : '#ef4444',
                            padding: '4px 2px', whiteSpace: 'nowrap',
                        }}>
                            {d.delta}
                        </div>
                    ))}

                    {centerContent}
                </div>

                {/* Pane B */}
                <div style={{ flex: '0 0 47%', background: paneB, borderLeft: `3px solid ${borderB}`, borderRadius: '0 8px 8px 0', padding: 20 }}>
                    {/* Segment Selector */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 0' }}>PANE B</span>
                        <select style={{
                            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
                            color: '#d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: '0.625rem',
                            fontWeight: 600, cursor: 'pointer', outline: 'none',
                            transition: 'all 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = borderB; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(139,92,246,0.2)'; }}
                            defaultValue={segmentB.value}>
                            <option value={segmentB.value}>{segmentB.label}</option>
                            {SEGMENT_OPTIONS.map(o => (
                                <option key={o.type} value={o.type}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                    {childrenB}
                </div>
            </div>
        </div>
    );
}
