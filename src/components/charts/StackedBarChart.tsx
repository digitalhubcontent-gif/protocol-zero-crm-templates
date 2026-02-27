'use client';

import React, { useState } from 'react';

export interface StackedBar {
    label: string;
    segments: { label: string; value: number; color: string }[];
}

interface Props {
    bars: StackedBar[];
    height?: number;
    monochromeMode?: boolean;
}

export function StackedBarChart({ bars, height = 220, monochromeMode = false }: Props) {
    const [hovered, setHovered] = useState<{ barIdx: number; segIdx: number } | null>(null);
    const width = 600;
    const padL = 48, padR = 24, padT = 20, padB = 48;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const maxTotal = Math.max(...bars.map(b => b.segments.reduce((s, seg) => s + seg.value, 0)));
    const barW = Math.floor(chartW / bars.length) - 8;
    const gapW = (chartW - barW * bars.length) / (bars.length + 1);
    const allSegmentLabels = Array.from(new Set(bars.flatMap(b => b.segments.map(s => s.label))));
    const labelColors: Record<string, string> = {};
    bars[0]?.segments.forEach(s => { labelColors[s.label] = s.color; });

    const toBarH = (val: number) => (val / maxTotal) * chartH;

    return (
        <div>
            <svg width={width} height={height} style={{ width: '100%', height: 'auto' }}>
                {/* Y grid */}
                {[0.25, 0.5, 0.75, 1].map((t, i) => {
                    const val = maxTotal * t;
                    const y = padT + chartH - chartH * t;
                    return (
                        <g key={i}>
                            <line x1={padL} y1={y} x2={padL + chartW} y2={y}
                                stroke={monochromeMode ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'} strokeWidth={1} />
                            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9}
                                fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.25)'}
                                fontFamily="'Inter', sans-serif">
                                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                            </text>
                        </g>
                    );
                })}

                {bars.map((bar, bi) => {
                    const x = padL + gapW + (barW + gapW) * bi;
                    let stackY = padT + chartH;
                    return (
                        <g key={bar.label}>
                            {bar.segments.map((seg, si) => {
                                const h = toBarH(seg.value);
                                stackY -= h;
                                const isHov = hovered?.barIdx === bi && hovered?.segIdx === si;
                                return (
                                    <rect key={si} x={x} y={stackY} width={barW} height={h}
                                        fill={isHov ? seg.color : `${seg.color}cc`}
                                        onMouseEnter={() => setHovered({ barIdx: bi, segIdx: si })}
                                        onMouseLeave={() => setHovered(null)}
                                        style={{ cursor: 'pointer', transition: 'fill 0.15s' }}
                                    />
                                );
                            })}
                            {/* Label */}
                            <text x={x + barW / 2} y={padT + chartH + 14} textAnchor="middle" fontSize={9}
                                fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.35)'}
                                fontFamily="'Inter', sans-serif">
                                {bar.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingLeft: padL, marginTop: 4 }}>
                {allSegmentLabels.map(label => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: labelColors[label] || '#666' }} />
                        <span style={{ fontSize: '0.6875rem', color: monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
