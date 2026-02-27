'use client';

import React, { useState } from 'react';

export interface DecaySeries {
    label: string;
    color: string;
    data: { day: number; value: number }[];
    halfLifeDay?: number;
    dashed?: boolean;
}

interface Props {
    series: DecaySeries[];
    thresholdValue?: number;   // horizontal reference line
    thresholdLabel?: string;   // e.g. "Re-engagement needed"
    height?: number;
    monochromeMode?: boolean;
    accent?: string;
}

export function DecayCurveChart({
    series,
    thresholdValue = 30,
    thresholdLabel = 'Re-engagement threshold',
    height = 220,
    monochromeMode = false,
    accent = '#06b6d4',
}: Props) {
    const [hovered, setHovered] = useState<{ si: number; pi: number } | null>(null);

    const width = 600;
    const padL = 44, padR = 24, padT = 20, padB = 36;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    const allDays = series.flatMap(s => s.data.map(d => d.day));
    const maxDay = Math.max(...allDays);
    const allVals = series.flatMap(s => s.data.map(d => d.value));
    const maxVal = Math.max(...allVals, 100);

    const toX = (day: number) => padL + (day / maxDay) * chartW;
    const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;
    const threshY = toY(thresholdValue);

    function buildCurvePath(pts: { day: number; value: number }[]) {
        if (pts.length < 2) return '';
        let d = `M ${toX(pts[0].day)} ${toY(pts[0].value)}`;
        for (let i = 1; i < pts.length; i++) {
            const prev = pts[i - 1];
            const curr = pts[i];
            const cpX = (toX(prev.day) + toX(curr.day)) / 2;
            d += ` C ${cpX} ${toY(prev.value)}, ${cpX} ${toY(curr.value)}, ${toX(curr.day)} ${toY(curr.value)}`;
        }
        return d;
    }

    function buildAreaPath(pts: { day: number; value: number }[]) {
        if (pts.length < 2) return '';
        const curve = buildCurvePath(pts);
        return `${curve} L ${toX(pts[pts.length - 1].day)} ${padT + chartH} L ${toX(pts[0].day)} ${padT + chartH} Z`;
    }

    const gridVals = [0, 25, 50, 75, 100];

    return (
        <svg width={width} height={height} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <defs>
                {series.map((s, i) => (
                    <linearGradient key={i} id={`decay-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity={monochromeMode ? 0.12 : 0.2} />
                        <stop offset="100%" stopColor={s.color} stopOpacity={0.01} />
                    </linearGradient>
                ))}
            </defs>

            {/* Grid */}
            {gridVals.map(v => {
                const y = toY(v);
                return (
                    <g key={v}>
                        <line x1={padL} y1={y} x2={padL + chartW} y2={y}
                            stroke={monochromeMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}
                            strokeWidth={1} strokeDasharray="4 4" />
                        <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={9}
                            fill={monochromeMode ? '#888' : 'rgba(255,255,255,0.25)'}
                            fontFamily="'Inter', monospace">{v}</text>
                    </g>
                );
            })}

            {/* Threshold zone (shaded below threshold) */}
            <rect x={padL} y={threshY} width={chartW} height={padT + chartH - threshY}
                fill={monochromeMode ? 'rgba(220,38,38,0.06)' : 'rgba(239,68,68,0.08)'} />
            <line x1={padL} y1={threshY} x2={padL + chartW} y2={threshY}
                stroke={monochromeMode ? '#cc4444' : '#ef4444'}
                strokeWidth={1.5} strokeDasharray="6 4" />
            <text x={padL + chartW - 4} y={threshY - 5} textAnchor="end" fontSize={8.5}
                fill={monochromeMode ? '#cc4444' : '#ef4444'}
                fontFamily="'Inter', sans-serif">{thresholdLabel}</text>

            {/* Series */}
            {series.map((s, si) => {
                const halfX = s.halfLifeDay ? toX(s.halfLifeDay) : null;
                return (
                    <g key={si}>
                        {/* Area fill */}
                        <path d={buildAreaPath(s.data)} fill={`url(#decay-grad-${si})`} />
                        {/* Curve line */}
                        <path d={buildCurvePath(s.data)} fill="none"
                            stroke={s.color} strokeWidth={2}
                            strokeDasharray={s.dashed ? '6 4' : undefined} />
                        {/* Half-life annotation */}
                        {halfX !== null && (
                            <g>
                                <line x1={halfX} y1={padT} x2={halfX} y2={padT + chartH}
                                    stroke={s.color} strokeWidth={1.5} strokeDasharray="4 3" strokeOpacity={0.6} />
                                <text x={halfX + 4} y={padT + 12} fontSize={8}
                                    fill={s.color} fontFamily="'Inter', sans-serif">
                                    ½-life
                                </text>
                            </g>
                        )}
                        {/* Label at right end */}
                        {s.data.length > 0 && (
                            <text x={padL + chartW + 5} y={toY(s.data[s.data.length - 1].value) + 4}
                                fontSize={8.5} fill={s.color} fontFamily="'Inter', sans-serif">
                                {s.label}
                            </text>
                        )}
                        {/* Hover dots */}
                        {s.data.map((pt, pi) => (
                            <circle key={pi} cx={toX(pt.day)} cy={toY(pt.value)}
                                r={hovered?.si === si && hovered?.pi === pi ? 4 : 2.5}
                                fill={s.color}
                                stroke={monochromeMode ? '#fff' : '#0a0e1a'} strokeWidth={1.5}
                                style={{ cursor: 'crosshair' }}
                                onMouseEnter={() => setHovered({ si, pi })}
                                onMouseLeave={() => setHovered(null)}
                            />
                        ))}
                    </g>
                );
            })}

            {/* X axis labels */}
            {[0, Math.round(maxDay * 0.25), Math.round(maxDay * 0.5), Math.round(maxDay * 0.75), maxDay].map(d => (
                <text key={d} x={toX(d)} y={padT + chartH + 16} textAnchor="middle" fontSize={9}
                    fill={monochromeMode ? '#888' : 'rgba(255,255,255,0.3)'}
                    fontFamily="'Inter', sans-serif">
                    Day {d}
                </text>
            ))}

            {/* Hover tooltip */}
            {hovered !== null && (() => {
                const s = series[hovered.si];
                const pt = s.data[hovered.pi];
                const cx = toX(pt.day);
                const cy = toY(pt.value);
                return (
                    <>
                        <rect x={cx - 46} y={cy - 42} width={92} height={34} rx={4}
                            fill={monochromeMode ? '#fff' : '#111820'}
                            stroke={s.color} strokeWidth={0.75} />
                        <text x={cx} y={cy - 27} textAnchor="middle" fontSize={8.5}
                            fill={monochromeMode ? '#555' : 'rgba(255,255,255,0.45)'}
                            fontFamily="'Inter', sans-serif">Day {pt.day} · {s.label}</text>
                        <text x={cx} y={cy - 14} textAnchor="middle" fontSize={10} fontWeight="700"
                            fill={s.color} fontFamily="'Inter', sans-serif">
                            {pt.value.toFixed(1)}%
                        </text>
                    </>
                );
            })()}
        </svg>
    );
}
