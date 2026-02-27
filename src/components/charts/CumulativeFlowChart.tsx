'use client';

import React, { useState } from 'react';

interface DataPoint {
    date: string;
    stages: Record<string, number>;
}

interface Props {
    data: DataPoint[];
    stageOrder: string[];        // bottom→top stacking order
    stageColors: Record<string, string>;
    accent?: string;
    height?: number;
    yLabel?: string;
}

export function CumulativeFlowChart({
    data,
    stageOrder,
    stageColors,
    accent = '#58a6ff',
    height = 260,
    yLabel = 'Deal Count',
}: Props) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const svgW = 560;
    const padL = 44, padR = 16, padT = 16, padB = 36;
    const W = svgW - padL - padR;
    const H = height - padT - padB;

    if (!data.length || !stageOrder.length) return null;

    const maxTotal = Math.max(...data.map(d => stageOrder.reduce((s, k) => s + (d.stages[k] ?? 0), 0)));
    const n = data.length;

    const toX = (i: number) => padL + (i / (n - 1)) * W;
    const toY = (v: number) => padT + H - (v / maxTotal) * H;

    // Build stacked cumulative values
    const stackedData = data.map(d => {
        let cum = 0;
        const out: Record<string, { bottom: number; top: number }> = {};
        stageOrder.forEach(k => {
            const val = d.stages[k] ?? 0;
            out[k] = { bottom: cum, top: cum + val };
            cum += val;
        });
        return out;
    });

    const buildAreaPath = (stageKey: string) => {
        // Top line forward
        const top = data.map((_, i) => {
            const y = toY(stackedData[i][stageKey]?.top ?? 0);
            const x = toX(i);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        });
        // Bottom line backward
        const bottom = data.map((_, i) => {
            const ri = n - 1 - i;
            const y = toY(stackedData[ri][stageKey]?.bottom ?? 0);
            const x = toX(ri);
            return `L ${x} ${y}`;
        });
        return [...top, ...bottom, 'Z'].join(' ');
    };

    const gridLines = [0.25, 0.5, 0.75, 1].map(t => ({
        y: padT + H - t * H,
        val: Math.round(maxTotal * t),
    }));

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <svg width={svgW} height={height} viewBox={`0 0 ${svgW} ${height}`}
                style={{ width: '100%', height: 'auto', overflow: 'visible' }}
                onMouseLeave={() => setHoveredIdx(null)}>

                {/* Grid */}
                {gridLines.map(({ y, val }) => (
                    <g key={val}>
                        <line x1={padL} y1={y} x2={padL + W} y2={y}
                            stroke="var(--chart-grid, rgba(255,255,255,0.04))" strokeWidth={1} />
                        <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={8.5}
                            fill="var(--chart-label, #484f58)" fontFamily="'Inter', sans-serif">{val}</text>
                    </g>
                ))}

                {/* Stage areas — bottom to top */}
                {[...stageOrder].map(key => (
                    <path key={key}
                        d={buildAreaPath(key)}
                        fill={stageColors[key] ?? accent}
                        opacity={0.65}
                        style={{ transition: 'opacity 0.15s' }}
                    />
                ))}

                {/* Stage top borders */}
                {[...stageOrder].map(key => {
                    const linePts = data.map((_, i) => {
                        const x = toX(i);
                        const y = toY(stackedData[i][key]?.top ?? 0);
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ');
                    return (
                        <path key={`border-${key}`}
                            d={linePts}
                            fill="none"
                            stroke={stageColors[key] ?? accent}
                            strokeWidth={1.5}
                            opacity={0.9}
                        />
                    );
                })}

                {/* Hover scrubber */}
                {data.map((d, i) => (
                    <rect key={i}
                        x={toX(i) - W / (2 * n)}
                        y={padT}
                        width={W / n}
                        height={H}
                        fill="transparent"
                        onMouseEnter={() => setHoveredIdx(i)}
                    />
                ))}

                {/* Hover line */}
                {hoveredIdx !== null && (
                    <line
                        x1={toX(hoveredIdx)} y1={padT}
                        x2={toX(hoveredIdx)} y2={padT + H}
                        stroke={accent} strokeWidth={1} strokeDasharray="4 3" opacity={0.6}
                    />
                )}

                {/* Hover tooltip */}
                {hoveredIdx !== null && (() => {
                    const d = data[hoveredIdx];
                    const tx = toX(hoveredIdx);
                    const tooltipX = tx > svgW * 0.65 ? tx - 120 : tx + 10;
                    const total = stageOrder.reduce((s, k) => s + (d.stages[k] ?? 0), 0);
                    return (
                        <g>
                            <rect x={tooltipX} y={padT + 4} width={110} height={14 + stageOrder.length * 14}
                                rx={4} fill="var(--chart-tooltip-bg, #22272e)"
                                stroke={accent} strokeWidth={0.75} opacity={0.96} />
                            <text x={tooltipX + 8} y={padT + 15}
                                fontSize={8.5} fontWeight="600"
                                fill="var(--chart-tooltip-text, #e6edf3)" fontFamily="'Inter', sans-serif">
                                {d.date} — {total} total
                            </text>
                            {stageOrder.map((key, si) => (
                                <text key={key} x={tooltipX + 8} y={padT + 27 + si * 13}
                                    fontSize={8} fill={stageColors[key] ?? accent} fontFamily="'Inter', sans-serif">
                                    {key}: {d.stages[key] ?? 0}
                                </text>
                            ))}
                        </g>
                    );
                })()}

                {/* X axis dates */}
                {data.filter((_, i) => i % Math.ceil(n / 6) === 0).map((d, i, arr) => {
                    const origIdx = data.indexOf(d);
                    return (
                        <text key={i} x={toX(origIdx)} y={padT + H + 18}
                            textAnchor="middle" fontSize={8}
                            fill="var(--chart-label, #484f58)" fontFamily="'Inter', sans-serif">
                            {d.date}
                        </text>
                    );
                })}

                {/* Y label */}
                <text x={10} y={padT + H / 2} textAnchor="middle" fontSize={8}
                    fill="var(--chart-label, #484f58)" fontFamily="'Inter', sans-serif"
                    transform={`rotate(-90, 10, ${padT + H / 2})`}>
                    {yLabel}
                </text>
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                {stageOrder.map(key => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: stageColors[key] ?? accent, opacity: 0.8 }} />
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary, #8b949e)', fontFamily: 'Inter, sans-serif' }}>{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
