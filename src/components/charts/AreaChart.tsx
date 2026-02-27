'use client';

import React, { useState } from 'react';

export interface AreaSeries {
    label: string;
    color: string;
    data: { x: string; value: number }[];
    dashed?: boolean;
    fillOpacity?: number;
}

interface Props {
    series: AreaSeries[];
    height?: number;
    showDots?: boolean;
    monochromeMode?: boolean;
}

export function AreaChart({ series, height = 220, showDots = true, monochromeMode = false }: Props) {
    const [hovered, setHovered] = useState<{ seriesIdx: number; pointIdx: number } | null>(null);
    const width = 600;
    const padL = 48, padR = 24, padT = 20, padB = 32;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const allValues = series.flatMap(s => s.data.map(d => d.value));
    const maxVal = Math.max(...allValues) * 1.12;
    const minVal = Math.min(0, ...allValues);
    const range = maxVal - minVal || 1;
    const labels = series[0]?.data.map(d => d.x) || [];

    const toX = (i: number) => padL + (i / (labels.length - 1)) * chartW;
    const toY = (v: number) => padT + chartH - ((v - minVal) / range) * chartH;

    const pathD = (data: { x: string; value: number }[]) => {
        return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.value).toFixed(1)}`).join(' ');
    };
    const areaD = (data: { x: string; value: number }[]) => {
        const bottom = toY(minVal);
        return `${pathD(data)} L ${toX(data.length - 1).toFixed(1)} ${bottom} L ${toX(0).toFixed(1)} ${bottom} Z`;
    };

    return (
        <svg width={width} height={height} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <defs>
                {series.map((s, i) => (
                    <linearGradient key={i} id={`area-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity={s.fillOpacity ?? 0.25} />
                        <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                    </linearGradient>
                ))}
            </defs>

            {/* Grid */}
            {[0.25, 0.5, 0.75, 1].map((t, i) => {
                const val = minVal + range * t;
                const y = toY(val);
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

            {/* X labels */}
            {labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0).map((label, _, arr) => {
                const idx = labels.indexOf(label);
                return (
                    <text key={label} x={toX(idx)} y={padT + chartH + 16} textAnchor="middle" fontSize={9}
                        fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.3)'}
                        fontFamily="'Inter', sans-serif">
                        {label}
                    </text>
                );
            })}

            {/* Series */}
            {series.map((s, si) => (
                <g key={si}>
                    <path d={areaD(s.data)} fill={`url(#area-grad-${si})`} />
                    <path d={pathD(s.data)} fill="none" stroke={s.color} strokeWidth={monochromeMode ? 1.5 : 2}
                        strokeDasharray={s.dashed ? '6 4' : undefined} />
                    {/* Right-end label */}
                    <text x={padL + chartW + 6} y={toY(s.data[s.data.length - 1].value) + 4}
                        fontSize={9} fill={s.color} fontFamily="'Inter', sans-serif" fontWeight="500">
                        {s.label}
                    </text>
                    {showDots && s.data.map((d, di) => {
                        const isHov = hovered?.seriesIdx === si && hovered?.pointIdx === di;
                        return (
                            <circle key={di} cx={toX(di)} cy={toY(d.value)} r={isHov ? 4 : 2.5}
                                fill={s.color} stroke={monochromeMode ? '#fff' : '#0a0e14'} strokeWidth={1.5}
                                style={{ cursor: 'crosshair' }}
                                onMouseEnter={() => setHovered({ seriesIdx: si, pointIdx: di })}
                                onMouseLeave={() => setHovered(null)}
                            />
                        );
                    })}
                </g>
            ))}

            {/* Tooltip */}
            {hovered && (
                <g>
                    {(() => {
                        const s = series[hovered.seriesIdx];
                        const d = s.data[hovered.pointIdx];
                        const cx = toX(hovered.pointIdx);
                        const cy = toY(d.value);
                        return (
                            <>
                                <rect x={cx - 44} y={cy - 36} width={88} height={30} rx={4}
                                    fill={monochromeMode ? '#fff' : '#111820'}
                                    stroke={s.color} strokeWidth={0.75} />
                                <text x={cx} y={cy - 22} textAnchor="middle" fontSize={9}
                                    fill={monochromeMode ? '#3a3a3a' : 'rgba(255,255,255,0.5)'}
                                    fontFamily="'Inter', sans-serif">{d.x}</text>
                                <text x={cx} y={cy - 10} textAnchor="middle" fontSize={10} fontWeight="700"
                                    fill={s.color} fontFamily="'Inter', sans-serif">
                                    {d.value >= 1000 ? `$${(d.value / 1000).toFixed(1)}B` : `$${d.value}M`}
                                </text>
                            </>
                        );
                    })()}
                </g>
            )}
        </svg>
    );
}
