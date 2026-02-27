'use client';

import React, { useState } from 'react';

export interface Candle {
    week: string;
    open: number;
    close: number;
    high: number;
    low: number;
}

interface Props {
    candles: Candle[];
    width?: number;
    height?: number;
    accent?: string;
    className?: string;
}

export function CandlestickChart({ candles, width = 600, height = 220, accent = '#f59e0b', className }: Props) {
    const [hovered, setHovered] = useState<number | null>(null);

    const padL = 48, padR = 24, padT = 20, padB = 32;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const allValues = candles.flatMap(c => [c.high, c.low]);
    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);
    const range = maxVal - minVal || 1;

    const toY = (v: number) => padT + chartH - ((v - minVal) / range) * chartH;
    const candleW = Math.floor(chartW / candles.length) - 4;
    const xOffset = candleW / 2 + 2;

    return (
        <div className={className} style={{ position: 'relative', cursor: 'crosshair' }}>
            <svg width={width} height={height} style={{ width: '100%', height: 'auto' }}>
                {/* Zero line */}
                {minVal < 0 && maxVal > 0 && (
                    <line
                        x1={padL} y1={toY(0)} x2={padL + chartW} y2={toY(0)}
                        stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4 3"
                    />
                )}

                {/* Grid */}
                {[-1, 0, 1, 2].map((v, i) => {
                    const val = minVal + (range / 3) * i;
                    const y = toY(val);
                    return (
                        <g key={i}>
                            <line x1={padL} y1={y} x2={padL + chartW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.25)"
                                fontFamily="'JetBrains Mono', 'Courier New', monospace">
                                {val >= 0 ? '+' : ''}{val.toFixed(1)}
                            </text>
                        </g>
                    );
                })}

                {candles.map((c, i) => {
                    const x = padL + (i / candles.length) * chartW + xOffset;
                    const isGreen = c.close >= c.open;
                    const bodyColor = isGreen ? '#10b981' : '#ef4444';
                    const yOpen = toY(c.open);
                    const yClose = toY(c.close);
                    const yHigh = toY(c.high);
                    const yLow = toY(c.low);
                    const bodyTop = Math.min(yOpen, yClose);
                    const bodyH = Math.max(2, Math.abs(yOpen - yClose));
                    const isHov = hovered === i;

                    return (
                        <g key={c.week} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                            {/* Wick */}
                            <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={isHov ? bodyColor : `${bodyColor}99`} strokeWidth={1.5} />
                            {/* Body */}
                            <rect
                                x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH}
                                fill={isHov ? bodyColor : `${bodyColor}bb`}
                                rx={1}
                            />
                            {/* Hover tooltip */}
                            {isHov && (
                                <g>
                                    <rect x={x - 48} y={yHigh - 60} width={96} height={54} rx={4}
                                        fill="#111820" stroke={accent} strokeWidth={0.75} />
                                    <text x={x} y={yHigh - 45} textAnchor="middle" fontSize={8}
                                        fill={bodyColor} fontFamily="'JetBrains Mono', monospace" fontWeight="700">
                                        {c.week} · {isGreen ? '▲' : '▼'}
                                    </text>
                                    <text x={x} y={yHigh - 32} textAnchor="middle" fontSize={7.5}
                                        fill="rgba(255,255,255,0.6)" fontFamily="'JetBrains Mono', monospace">
                                        O: {c.open >= 0 ? '+' : ''}{c.open.toFixed(1)}M
                                    </text>
                                    <text x={x} y={yHigh - 20} textAnchor="middle" fontSize={7.5}
                                        fill="rgba(255,255,255,0.6)" fontFamily="'JetBrains Mono', monospace">
                                        H: +{c.high.toFixed(1)}M / L: {c.low.toFixed(1)}M
                                    </text>
                                    <text x={x} y={yHigh - 8} textAnchor="middle" fontSize={7.5}
                                        fill={bodyColor} fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                                        C: {c.close >= 0 ? '+' : ''}{c.close.toFixed(1)}M
                                    </text>
                                </g>
                            )}
                            {/* X label */}
                            <text x={x} y={padT + chartH + 16} textAnchor="middle" fontSize={8}
                                fill="rgba(255,255,255,0.25)" fontFamily="'JetBrains Mono', monospace">
                                {c.week}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
