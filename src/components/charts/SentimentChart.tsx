'use client';

import React, { useState } from 'react';

export interface SentimentPoint {
    date: string;
    value: number;   // -1.0 to +1.0
    upper?: number;  // confidence band upper
    lower?: number;  // confidence band lower
    event?: string;  // e.g. "Discovery Call"
}

interface Props {
    data: SentimentPoint[];
    showBands?: boolean;
    positiveColor?: string;
    negativeColor?: string;
    neutralColor?: string;
    height?: number;
    monochromeMode?: boolean;
    accent?: string;
}

export function SentimentChart({
    data,
    showBands = false,
    positiveColor = '#10b981',
    negativeColor = '#ef4444',
    neutralColor = '#6b7280',
    height = 220,
    monochromeMode = false,
    accent = '#8b5cf6',
}: Props) {
    const [hovered, setHovered] = useState<number | null>(null);

    const width = 600;
    const padL = 52, padR = 20, padT = 16, padB = 32;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;

    // Y: -1.0 to +1.0
    const yMin = -1.0, yMax = 1.0, yRange = 2.0;
    const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
    const toY = (v: number) => padT + chartH - ((v - yMin) / yRange) * chartH;
    const zeroY = toY(0);

    if (data.length < 2) return null;

    // Build positive and negative filled area paths
    function buildPosArea() {
        const pts = data.map((d, i) => ({ x: toX(i), y: Math.min(toY(d.value), zeroY) }));
        const tops = data.map((d, i) => ({ x: toX(i), raw: Math.max(d.value, 0) }));
        const lineStr = tops.map((t, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(t.raw)}`).join(' ');
        return `${lineStr} L ${toX(data.length - 1)} ${zeroY} L ${toX(0)} ${zeroY} Z`;
    }

    function buildNegArea() {
        const tops = data.map((d, i) => ({ x: toX(i), raw: Math.min(d.value, 0) }));
        const lineStr = tops.map((t, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(t.raw)}`).join(' ');
        return `${lineStr} L ${toX(data.length - 1)} ${zeroY} L ${toX(0)} ${zeroY} Z`;
    }

    function buildLine() {
        return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.value)}`).join(' ');
    }

    function buildBandArea(key: 'upper' | 'lower') {
        const pts = data.filter(d => d[key] !== undefined);
        if (pts.length < 2) return '';
        const s = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d[key] ?? d.value)}`).join(' ');
        const rev = [...data].reverse().map((d, i, arr) => `L ${toX(data.length - 1 - i)} ${toY(d[key] ?? d.value)}`).join(' ');
        return `${s} ${rev} Z`;
    }

    const yLabels = [-1.0, -0.5, 0, 0.5, 1.0];
    const sentimentLabel = (v: number) => v > 0.2 ? 'Positive' : v < -0.2 ? 'Negative' : 'Neutral';

    const pC = monochromeMode ? '#3a8a3a' : positiveColor;
    const nC = monochromeMode ? '#cc3333' : negativeColor;
    const lineColor = monochromeMode ? '#444' : accent;

    return (
        <svg width={width} height={height} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <defs>
                <linearGradient id="pos-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={pC} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={pC} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="neg-fill" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={nC} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={nC} stopOpacity={0.02} />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {yLabels.map((v, i) => {
                const y = toY(v);
                const isZero = v === 0;
                return (
                    <g key={i}>
                        <line
                            x1={padL} y1={y} x2={padL + chartW} y2={y}
                            stroke={isZero
                                ? (monochromeMode ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)')
                                : (monochromeMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)')}
                            strokeWidth={isZero ? 1.5 : 1}
                            strokeDasharray={isZero ? undefined : '4 4'}
                        />
                        <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={9}
                            fill={monochromeMode ? '#6b6b6b' : 'rgba(255,255,255,0.3)'}
                            fontFamily="'Inter', monospace">
                            {v === 0 ? 'Neutral' : v.toFixed(1)}
                        </text>
                    </g>
                );
            })}

            {/* Positive fill area */}
            <path d={buildPosArea()} fill="url(#pos-fill)" />
            {/* Negative fill area */}
            <path d={buildNegArea()} fill="url(#neg-fill)" />

            {/* Confidence bands */}
            {showBands && data[0]?.upper !== undefined && (
                <path d={buildBandArea('upper')} fill={monochromeMode ? 'rgba(0,0,0,0.04)' : `${accent}12`} />
            )}

            {/* Main sentiment line */}
            <path d={buildLine()} fill="none" stroke={lineColor} strokeWidth={2} strokeLinejoin="round" />

            {/* Event annotation dots */}
            {data.map((d, i) => {
                if (!d.event && hovered !== i) return null;
                return (
                    <circle key={i} cx={toX(i)} cy={toY(d.value)} r={d.event ? 4 : 3}
                        fill={d.value >= 0 ? pC : nC}
                        stroke={monochromeMode ? '#fff' : '#0f0f13'}
                        strokeWidth={1.5} />
                );
            })}

            {/* Mouse hit areas + hover dots */}
            {data.map((d, i) => (
                <rect key={i}
                    x={toX(i) - chartW / data.length / 2} y={padT}
                    width={chartW / data.length} height={chartH}
                    fill="transparent"
                    style={{ cursor: 'crosshair' }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                />
            ))}

            {/* X labels (sparse) */}
            {data.filter((_, i) => i % Math.ceil(data.length / 7) === 0).map((d, _, arr) => {
                const i = data.indexOf(d);
                return (
                    <text key={d.date} x={toX(i)} y={padT + chartH + 16} textAnchor="middle" fontSize={9}
                        fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.3)'}
                        fontFamily="'Inter', sans-serif">
                        {d.date}
                    </text>
                );
            })}

            {/* Hover tooltip */}
            {hovered !== null && (() => {
                const d = data[hovered];
                const cx = toX(hovered);
                const cy = toY(d.value);
                const vColor = d.value > 0.2 ? pC : d.value < -0.2 ? nC : neutralColor;
                return (
                    <>
                        <line x1={cx} y1={padT} x2={cx} y2={padT + chartH}
                            stroke={vColor} strokeWidth={1} strokeDasharray="3 3" />
                        <circle cx={cx} cy={cy} r={5} fill={vColor} stroke={monochromeMode ? '#fff' : '#0f0f13'} strokeWidth={2} />
                        <rect x={cx - 54} y={cy - 44} width={108} height={38} rx={5}
                            fill={monochromeMode ? '#fff' : '#1a1a22'}
                            stroke={vColor} strokeWidth={0.75} />
                        <text x={cx} y={cy - 29} textAnchor="middle" fontSize={8.5}
                            fill={monochromeMode ? '#555' : 'rgba(255,255,255,0.5)'}
                            fontFamily="'Inter', sans-serif">{d.date}</text>
                        <text x={cx} y={cy - 16} textAnchor="middle" fontSize={10} fontWeight="700"
                            fill={vColor} fontFamily="'Inter', sans-serif">
                            {d.value > 0 ? '+' : ''}{d.value.toFixed(2)} · {sentimentLabel(d.value)}
                        </text>
                    </>
                );
            })()}
        </svg>
    );
}
