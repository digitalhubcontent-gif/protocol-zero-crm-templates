'use client';

import React, { useState } from 'react';

export interface FunnelStage {
    label: string;
    count: number;
    conversionRate?: number; // vs previous stage (0–100)
    color?: string;
}

interface Props {
    stages: FunnelStage[];
    accent?: string;
    mutedColor?: string;
    height?: number;
    showConversionRates?: boolean;
    highlightDropOff?: boolean; // highlight stage with biggest drop
}

export function FunnelChart({
    stages,
    accent = '#58a6ff',
    mutedColor = 'rgba(255,255,255,0.08)',
    height = 280,
    showConversionRates = true,
    highlightDropOff = true,
}: Props) {
    const [hovered, setHovered] = useState<number | null>(null);
    const svgW = 520;
    const padL = 120, padR = 100, padT = 20, padB = 20;
    const maxW = svgW - padL - padR;
    const maxCount = stages[0]?.count ?? 1;
    const stageH = Math.floor((height - padT - padB) / stages.length);

    // Find biggest drop-off stage
    let biggestDropIdx = -1;
    let biggestDrop = 0;
    stages.forEach((s, i) => {
        if (i === 0) return;
        const drop = 100 - (s.conversionRate ?? 100);
        if (drop > biggestDrop) { biggestDrop = drop; biggestDropIdx = i; }
    });

    return (
        <svg width={svgW} height={height} viewBox={`0 0 ${svgW} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {stages.map((stage, i) => {
                const topWidth = (stages[i].count / maxCount) * maxW;
                const botWidth = i < stages.length - 1 ? (stages[i + 1].count / maxCount) * maxW : topWidth * 0.88;
                const y = padT + i * stageH;
                const cx = padL + maxW / 2;
                const topL = cx - topWidth / 2;
                const topR = cx + topWidth / 2;
                const botL = cx - botWidth / 2;
                const botR = cx + botWidth / 2;
                const isHov = hovered === i;
                const isDropOff = highlightDropOff && i === biggestDropIdx;
                const fillColor = isDropOff
                    ? `${accent}55`
                    : isHov
                        ? `${accent}40`
                        : `${accent}22`;
                const strokeColor = isDropOff
                    ? accent
                    : isHov
                        ? `${accent}80`
                        : `${accent}30`;

                const trapPath = `M ${topL} ${y} L ${topR} ${y} L ${botR} ${y + stageH - 3} L ${botL} ${y + stageH - 3} Z`;

                return (
                    <g key={i}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ cursor: 'default' }}>
                        {/* Trapezoid */}
                        <path
                            d={trapPath}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={isHov || isDropOff ? 1.5 : 0.75}
                        />

                        {/* Stage label — left */}
                        <text
                            x={padL - 10}
                            y={y + stageH / 2 + 4}
                            textAnchor="end"
                            fontSize={10}
                            fill={isHov ? accent : 'var(--text-secondary, #8b949e)'}
                            fontFamily="'Inter', sans-serif"
                            fontWeight={isHov ? '600' : '400'}
                        >
                            {stage.label}
                        </text>

                        {/* Count — inside trapezoid */}
                        <text
                            x={cx}
                            y={y + stageH / 2 + 4}
                            textAnchor="middle"
                            fontSize={11}
                            fill={isHov ? accent : 'var(--text-primary, #e6edf3)'}
                            fontFamily="'Inter', sans-serif"
                            fontWeight="600"
                        >
                            {stage.count.toLocaleString()}
                        </text>

                        {/* Conversion rate — right */}
                        {showConversionRates && stage.conversionRate !== undefined && (
                            <text
                                x={padL + maxW + 10}
                                y={y + stageH / 2 + 4}
                                textAnchor="start"
                                fontSize={9.5}
                                fill={isDropOff ? '#f85149' : 'var(--text-muted, #484f58)'}
                                fontFamily="'Inter', sans-serif"
                                fontWeight={isDropOff ? '700' : '400'}
                            >
                                {stage.conversionRate}%
                            </text>
                        )}

                        {/* Drop-off marker */}
                        {isDropOff && (
                            <text
                                x={padL + maxW + 10}
                                y={y + stageH / 2 + 16}
                                textAnchor="start"
                                fontSize={8}
                                fill="#f85149"
                                fontFamily="'Inter', sans-serif"
                            >
                                ↓ biggest drop
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}
