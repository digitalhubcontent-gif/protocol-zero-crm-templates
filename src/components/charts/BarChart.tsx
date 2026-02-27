'use client';

import React, { useState } from 'react';

export interface BarData {
    label: string;
    value: number;
    color: string;
}

interface Props {
    bars: BarData[];
    height?: number;
    monochromeMode?: boolean;
}

export function BarChart({ bars, height = 220, monochromeMode = false }: Props) {
    const [hovered, setHovered] = useState<number | null>(null);
    const width = 600;
    const padL = 48, padR = 24, padT = 20, padB = 60; // Extra bottom padding for rotated labels
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const maxVal = Math.max(...bars.map(b => b.value), 0);
    const minVal = Math.min(...bars.map(b => b.value), 0);

    // Add some padding to max/min
    const rangeMax = maxVal > 0 ? maxVal * 1.1 : 0;
    const rangeMin = minVal < 0 ? minVal * 1.1 : 0;
    const totalRange = rangeMax - rangeMin || 1;

    const toY = (val: number) => padT + chartH - ((val - rangeMin) / totalRange) * chartH;

    const zeroY = toY(0);

    const barW = Math.floor(chartW / bars.length) - 16;
    const gapW = (chartW - barW * bars.length) / (bars.length + 1);

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                {/* Y grid */}
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                    const val = rangeMin + totalRange * t;
                    const y = toY(val);
                    return (
                        <g key={i}>
                            <line x1={padL} y1={y} x2={padL + chartW} y2={y}
                                stroke={Math.abs(val) < 0.1 ? (monochromeMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') : (monochromeMode ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)')}
                                strokeWidth={Math.abs(val) < 0.1 ? 1.5 : 1}
                            />
                            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9}
                                fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.25)'}
                                fontFamily="'Inter', sans-serif">
                                {Math.abs(val) >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                            </text>
                        </g>
                    );
                })}

                {/* Bars */}
                {bars.map((bar, bi) => {
                    const x = padL + gapW + (barW + gapW) * bi;
                    const yVal = toY(bar.value);
                    const isHov = hovered === bi;
                    const h = Math.abs(yVal - zeroY);
                    const rectY = bar.value >= 0 ? yVal : zeroY;

                    // Label rotation coordinates
                    const labelX = x + barW / 2;
                    const labelY = padT + chartH + 16;

                    return (
                        <g key={bi}>
                            {/* Bar */}
                            <rect x={x} y={rectY} width={barW} height={h || 1}
                                fill={isHov ? bar.color : `${bar.color}cc`}
                                onMouseEnter={() => setHovered(bi)}
                                onMouseLeave={() => setHovered(null)}
                                style={{ cursor: 'pointer', transition: 'fill 0.15s' }}
                            />
                            {/* Hover Value */}
                            {isHov && (
                                <text x={labelX} y={bar.value >= 0 ? rectY - 6 : rectY + h + 12} textAnchor="middle" fontSize={10}
                                    fill={monochromeMode ? '#333' : '#fff'} fontWeight={600} fontFamily="'Inter', sans-serif">
                                    {bar.value > 0 ? '+' : ''}{bar.value.toFixed(1)}
                                </text>
                            )}
                            {/* Label */}
                            <text x={labelX} y={labelY} textAnchor="end" fontSize={9}
                                fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.35)'}
                                fontFamily="'Inter', sans-serif"
                                transform={`rotate(-45, ${labelX}, ${labelY - 6})`}
                            >
                                {bar.label.length > 20 ? bar.label.substring(0, 20) + '...' : bar.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
