'use client';

import React, { useState } from 'react';

export interface QuadrantPoint {
    org: string;
    x: number;
    y: number;
    confidence: number;
    quadrant?: string;
}

interface Props {
    points: QuadrantPoint[];
    xLabel?: string;
    yLabel?: string;
    quadrantLabels?: [string, string, string, string];
    accent?: string;
    monochromeMode?: boolean;
    height?: number;
}

export function QuadrantChart({
    points, xLabel = 'Value ($K)', yLabel = 'Fit Score',
    quadrantLabels = ['Develop', 'Pursue', 'Deprioritize', 'Qualify'],
    accent = '#f59e0b', height = 280,
}: Props) {
    const [hovered, setHovered] = useState<number | null>(null);

    const width = 480;
    const padL = 36, padR = 16, padT = 20, padB = 32;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;
    const clipId = 'qc-clip';

    const maxX = Math.max(...points.map(p => p.x)) * 1.12;
    const maxY = 10;
    const midX = maxX * 0.5;
    const midY = 5;

    const toX = (v: number) => padL + (v / maxX) * chartW;
    const toY = (v: number) => padT + chartH - (v / maxY) * chartH;
    const midPx = toX(midX);
    const midPy = toY(midY);

    return (
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: 4 }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{ width: '100%', height: 'auto', display: 'block', overflow: 'hidden' }}
            >
                <defs>
                    {/* Clip so dots never spill outside chart area */}
                    <clipPath id={clipId}>
                        <rect x={padL} y={padT} width={chartW} height={chartH} />
                    </clipPath>
                </defs>

                {/* ── Quadrant backgrounds ─────────────────────────────── */}
                {/* Top-left: Develop */}
                <rect x={padL} y={padT} width={midPx - padL} height={midPy - padT}
                    fill="var(--border-subtle)" opacity={0.6} />
                {/* Top-right: Pursue — highlight the "good" quadrant */}
                <rect x={midPx} y={padT} width={padL + chartW - midPx} height={midPy - padT}
                    fill={`${accent}12`} />
                {/* Bottom halves */}
                <rect x={padL} y={midPy} width={midPx - padL} height={padT + chartH - midPy}
                    fill="var(--border-subtle)" opacity={0.3} />
                <rect x={midPx} y={midPy} width={padL + chartW - midPx} height={padT + chartH - midPy}
                    fill="var(--border-subtle)" opacity={0.3} />

                {/* ── Chart border ─────────────────────────────────────── */}
                <rect x={padL} y={padT} width={chartW} height={chartH}
                    fill="none" stroke="var(--border-card)" strokeWidth={1} />

                {/* ── Dividers ─────────────────────────────────────────── */}
                <line x1={midPx} y1={padT} x2={midPx} y2={padT + chartH}
                    stroke="var(--border-card)" strokeWidth={1} strokeDasharray="4 3" />
                <line x1={padL} y1={midPy} x2={padL + chartW} y2={midPy}
                    stroke="var(--border-card)" strokeWidth={1} strokeDasharray="4 3" />

                {/* ── Quadrant labels ──────────────────────────────────── */}
                <text x={padL + 8} y={padT + 14} fill="var(--text-secondary)"
                    fontSize={9} fontWeight="700" letterSpacing="0.07em"
                    fontFamily="'Inter', sans-serif" opacity={0.8}>{quadrantLabels[0]}</text>
                <text x={midPx + 8} y={padT + 14} fill={accent}
                    fontSize={9} fontWeight="700" letterSpacing="0.07em"
                    fontFamily="'Inter', sans-serif" opacity={0.9}>{quadrantLabels[1]}</text>
                <text x={padL + 8} y={padT + chartH - 6} fill="var(--text-muted)"
                    fontSize={9} fontWeight="600" letterSpacing="0.07em"
                    fontFamily="'Inter', sans-serif">{quadrantLabels[2]}</text>
                <text x={midPx + 8} y={padT + chartH - 6} fill="var(--text-muted)"
                    fontSize={9} fontWeight="600" letterSpacing="0.07em"
                    fontFamily="'Inter', sans-serif">{quadrantLabels[3]}</text>

                {/* ── Y-axis grid + labels ─────────────────────────────── */}
                {[2.5, 5, 7.5, 10].map((yVal, i) => {
                    const y = toY(yVal);
                    return (
                        <g key={i}>
                            <line x1={padL} y1={y} x2={padL + chartW} y2={y}
                                stroke="var(--border-subtle)" strokeWidth={0.75} />
                            <text x={padL - 5} y={y + 3.5} textAnchor="end" fontSize={8}
                                fill="var(--text-secondary)"
                                fontFamily="'Inter', sans-serif">{yVal}</text>
                        </g>
                    );
                })}

                {/* ── Axis label ───────────────────────────────────────── */}
                <text x={padL + chartW / 2} y={height - 4} textAnchor="middle" fontSize={9}
                    fill="var(--text-secondary)" fontFamily="'Inter', sans-serif" fontWeight="500">
                    {xLabel}
                </text>

                {/* ── Data points (clipped) ────────────────────────────── */}
                <g clipPath={`url(#${clipId})`}>
                    {points.map((p, i) => {
                        const px = toX(p.x);
                        const py = toY(p.y);
                        const r = 4 + (p.confidence / 100) * 7;
                        const isHov = hovered === i;
                        return (
                            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                                style={{ cursor: 'pointer' }}>
                                {/* Outer glow ring on hover */}
                                {isHov && (
                                    <circle cx={px} cy={py} r={r + 5}
                                        fill={`${accent}18`} stroke={`${accent}40`} strokeWidth={1} />
                                )}
                                <circle cx={px} cy={py} r={r}
                                    fill={`${accent}28`}
                                    stroke={accent}
                                    strokeWidth={isHov ? 2.5 : 1.5}
                                    opacity={isHov ? 1 : 0.85}
                                />
                            </g>
                        );
                    })}
                </g>

                {/* ── Tooltip (outside clip so it can overflow chart bounds into card) ── */}
                {hovered !== null && (() => {
                    const p = points[hovered];
                    const px = Math.min(Math.max(toX(p.x), padL + 60), padL + chartW - 60);
                    const py = toY(p.y) - 14;
                    return (
                        <g>
                            <rect x={px - 60} y={py - 32} width={120} height={30} rx={5}
                                fill="var(--bg-elevated, var(--bg-card))"
                                stroke={accent} strokeWidth={0.75} />
                            <text x={px} y={py - 19} textAnchor="middle" fontSize={9} fontWeight="700"
                                fill="var(--text-primary)"
                                fontFamily="'Inter', sans-serif">{p.org}</text>
                            <text x={px} y={py - 7} textAnchor="middle" fontSize={8}
                                fill="var(--text-secondary)"
                                fontFamily="'Inter', sans-serif">
                                ${(p.x / 1000).toFixed(1)}M · Fit {p.y}
                            </text>
                        </g>
                    );
                })()}
            </svg>
        </div>
    );
}
