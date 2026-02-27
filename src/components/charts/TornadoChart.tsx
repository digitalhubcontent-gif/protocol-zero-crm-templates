'use client';

import React, { useState } from 'react';

export interface TornadoItem {
    label: string;
    downside: number;
    base: number;
    upside: number;
}

interface Props {
    items: TornadoItem[];
    accent?: string;
    height?: number;
}

export function TornadoChart({ items, accent = '#f59e0b', height = 280 }: Props) {
    const [hovered, setHovered] = useState<number | null>(null);
    const maxAbs = Math.max(...items.flatMap(i => [Math.abs(i.downside), Math.abs(i.upside)]));
    const rowH = Math.floor(height / items.length);
    const padY = 8;
    const barH = rowH - padY * 2;
    const totalW = 600;
    const labelW = 190;
    const centerX = totalW / 2;
    const halfW = (totalW - labelW) / 2 - 8;

    const scaleX = (val: number) => (Math.abs(val) / maxAbs) * halfW;

    return (
        <svg width={totalW} height={height} style={{ width: '100%', height: 'auto' }}>
            {/* Center axis */}
            <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

            {/* Axis labels */}
            <text x={centerX - halfW / 2} y={12} textAnchor="middle" fontSize={9}
                fill="rgba(255,255,255,0.25)" fontFamily="'JetBrains Mono', monospace">▼ DOWNSIDE</text>
            <text x={centerX + halfW / 2} y={12} textAnchor="middle" fontSize={9}
                fill="rgba(255,255,255,0.25)" fontFamily="'JetBrains Mono', monospace">▲ UPSIDE</text>

            {items.map((item, i) => {
                const y = 20 + i * rowH + padY;
                const isHov = hovered === i;
                const downW = scaleX(item.downside);
                const upW = scaleX(item.upside);
                const downColor = '#ef4444';
                const upColor = accent;

                return (
                    <g key={item.label} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                        style={{ cursor: 'pointer' }}>
                        {/* Label in center */}
                        <text x={centerX} y={y + barH / 2 + 4} textAnchor="middle" fontSize={9.5}
                            fill={isHov ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)'}
                            fontFamily="'JetBrains Mono', monospace" fontWeight={isHov ? '700' : '400'}>
                            {item.label}
                        </text>

                        {/* Downside bar (left from center) */}
                        <rect
                            x={centerX - downW - labelW / 2} y={y} width={downW} height={barH}
                            fill={isHov ? downColor : `${downColor}70`} rx={2}
                        />
                        {/* Value label at end of downside */}
                        <text x={centerX - downW - labelW / 2 - 4} y={y + barH / 2 + 4}
                            textAnchor="end" fontSize={8} fill={downColor}
                            fontFamily="'JetBrains Mono', monospace">
                            -{Math.abs(item.downside)}M
                        </text>

                        {/* Upside bar (right from center) */}
                        <rect
                            x={centerX + labelW / 2} y={y} width={upW} height={barH}
                            fill={isHov ? upColor : `${upColor}70`} rx={2}
                        />
                        {/* Value label at end of upside */}
                        <text x={centerX + labelW / 2 + upW + 4} y={y + barH / 2 + 4}
                            textAnchor="start" fontSize={8} fill={upColor}
                            fontFamily="'JetBrains Mono', monospace">
                            +{item.upside}M
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
