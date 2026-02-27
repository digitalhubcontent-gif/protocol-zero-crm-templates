'use client';

import React from 'react';

interface RepRamp {
    name: string;
    startDate: string;
    rampEndDate: string;
    currentProductivity: number;  // 0–100%
    status: 'onboarding' | 'ramping' | 'ramped' | 'attrite';
}

interface ProductivityPoint {
    month: number;
    expectedPct: number;
}

interface Props {
    reps: RepRamp[];
    expectedRampMonths?: number;
    productivityCurve?: ProductivityPoint[];
    height?: number;
    accent?: string;
}

const statusColors: Record<string, string> = {
    onboarding: '#6b7280',
    ramping: '#f59e0b',
    ramped: '#22c55e',
    attrite: '#ef4444',
};

const statusLabels: Record<string, string> = {
    onboarding: 'Onboarding',
    ramping: 'Ramping',
    ramped: 'Ramped',
    attrite: 'Attrited',
};

export function RampTimelineChart({
    reps, expectedRampMonths = 4.5,
    productivityCurve = [
        { month: 0, expectedPct: 0 }, { month: 1, expectedPct: 15 },
        { month: 2, expectedPct: 35 }, { month: 3, expectedPct: 60 },
        { month: 4, expectedPct: 80 }, { month: 5, expectedPct: 92 },
        { month: 6, expectedPct: 100 },
    ],
    height = 280, accent = '#f97316',
}: Props) {
    const laneH = Math.min(28, (height - 60) / reps.length);
    const chartW = 500;
    const leftPad = 100;
    const rightPad = 60;
    const plotW = chartW - leftPad - rightPad;
    const maxMonth = Math.max(expectedRampMonths + 2, 8);
    const toX = (month: number) => leftPad + (month / maxMonth) * plotW;
    const toY = (idx: number) => 40 + idx * laneH;
    const prodToY = (pct: number) => 40 + (1 - pct / 100) * (reps.length * laneH);
    const svgH = 50 + reps.length * laneH;

    // S-curve path
    const curvePath = productivityCurve.map((p, i) => {
        const x = toX(p.month);
        const y = prodToY(p.expectedPct);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div>
            <svg width={chartW} height={svgH} style={{ width: '100%', height: 'auto' }} viewBox={`0 0 ${chartW} ${svgH}`}>
                {/* Month axis lines */}
                {Array.from({ length: Math.ceil(maxMonth) + 1 }, (_, i) => i).map(m => (
                    <g key={m}>
                        <line x1={toX(m)} y1={30} x2={toX(m)} y2={svgH - 10} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
                        <text x={toX(m)} y={24} textAnchor="middle" fontSize={7} fill="#4b5563" fontFamily="Inter, sans-serif">M{m}</text>
                    </g>
                ))}

                {/* Expected ramp vertical dashed line */}
                <line x1={toX(expectedRampMonths)} y1={30} x2={toX(expectedRampMonths)} y2={svgH - 10}
                    stroke={accent} strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
                <text x={toX(expectedRampMonths)} y={14} textAnchor="middle" fontSize={6} fill={accent} fontWeight={600} fontFamily="Inter, sans-serif">
                    Avg Ramp: {expectedRampMonths}mo
                </text>

                {/* S-Curve overlay */}
                <path d={curvePath} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.4} strokeDasharray="6 3" />

                {/* Rep Gantt bars */}
                {reps.map((rep, i) => {
                    const y = toY(i);
                    const startMonth = 0;
                    const rampMonths = parseFloat(rep.rampEndDate) || expectedRampMonths;
                    const barX = toX(startMonth);
                    const barEndX = toX(rampMonths);
                    const barWidth = Math.max(barEndX - barX, 4);
                    const color = statusColors[rep.status];
                    const currentMonth = rampMonths * (rep.currentProductivity / 100);
                    const dotX = toX(Math.min(currentMonth, maxMonth));

                    return (
                        <g key={rep.name}>
                            {/* Rep name */}
                            <text x={leftPad - 6} y={y + laneH / 2 + 3}
                                textAnchor="end" fontSize={7} fill="#9ca3af" fontWeight={500}
                                fontFamily="Inter, sans-serif">
                                {rep.name.length > 14 ? rep.name.slice(0, 14) + '…' : rep.name}
                            </text>

                            {/* Gantt bar */}
                            <rect x={barX} y={y + 3} width={barWidth} height={laneH - 6} rx={3}
                                fill={color} opacity={0.65}
                                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseEnter={e => { (e.target as SVGRectElement).setAttribute('opacity', '1'); }}
                                onMouseLeave={e => { (e.target as SVGRectElement).setAttribute('opacity', '0.65'); }}>
                                <title>{rep.name}: {rep.status} · {rep.currentProductivity}% productivity</title>
                            </rect>

                            {/* Productivity dot */}
                            <circle cx={dotX} cy={y + laneH / 2} r={4} fill="#fff" stroke={color} strokeWidth={2}
                                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseEnter={e => { (e.target as SVGCircleElement).setAttribute('r', '6'); }}
                                onMouseLeave={e => { (e.target as SVGCircleElement).setAttribute('r', '4'); }}>
                                <title>{rep.currentProductivity}% productivity</title>
                            </circle>

                            {/* Productivity % label */}
                            <text x={chartW - rightPad + 6} y={y + laneH / 2 + 3}
                                fontSize={7} fontWeight={700} fill={color} fontFamily="monospace">
                                {rep.currentProductivity}%
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
                {Object.entries(statusLabels).map(([key, label]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: statusColors[key], opacity: 0.7 }} />
                        <span style={{ fontSize: '0.5rem', color: '#6b7280' }}>{label}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 12, height: 2, background: accent, opacity: 0.4 }} />
                    <span style={{ fontSize: '0.5rem', color: '#6b7280' }}>Expected Curve</span>
                </div>
            </div>
        </div>
    );
}
