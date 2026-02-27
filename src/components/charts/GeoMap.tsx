'use client';

import React, { useState } from 'react';

export interface GeoRegion {
    id: string;
    label: string;
    value: number;
    budget: string;
    attainment: number;
}

interface Props {
    regions: GeoRegion[];
    accent?: string;
    height?: number;
    onClick?: (regionId: string) => void;
}

function attainmentColor(attainment: number): string {
    if (attainment >= 105) return '#22c55e';
    if (attainment >= 95) return '#3b82f6';
    if (attainment >= 80) return '#f59e0b';
    return '#ef4444';
}

export function GeoMap({ regions, accent = '#3b82f6', height = 300, onClick }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    const width = 700;
    const padX = 20, padY = 16;
    const totalBudget = regions.reduce((s, r) => s + parseFloat(r.budget.replace(/[^0-9.]/g, '')), 0);

    // Layout regions in a treemap-style arrangement
    const sorted = [...regions].sort((a, b) =>
        parseFloat(b.budget.replace(/[^0-9.]/g, '')) - parseFloat(a.budget.replace(/[^0-9.]/g, ''))
    );

    // Simple proportional horizontal layout
    const usableW = width - padX * 2;
    const usableH = height - padY * 2;

    // First row: top 2, second row: remaining
    const firstRow = sorted.slice(0, 2);
    const secondRow = sorted.slice(2);
    const firstTotal = firstRow.reduce((s, r) => s + parseFloat(r.budget.replace(/[^0-9.]/g, '')), 0);
    const secondTotal = secondRow.reduce((s, r) => s + parseFloat(r.budget.replace(/[^0-9.]/g, '')), 0);

    const row1H = usableH * 0.50;
    const row2H = usableH * 0.50 - 4;
    const gap = 8;

    const blocks: { region: GeoRegion; x: number; y: number; w: number; h: number }[] = [];

    let cx = padX;
    firstRow.forEach((r) => {
        const frac = parseFloat(r.budget.replace(/[^0-9.]/g, '')) / firstTotal;
        const w = usableW * frac - gap;
        blocks.push({ region: r, x: cx, y: padY, w, h: row1H });
        cx += w + gap;
    });

    cx = padX;
    secondRow.forEach((r) => {
        const frac = parseFloat(r.budget.replace(/[^0-9.]/g, '')) / secondTotal;
        const w = usableW * frac - gap;
        blocks.push({ region: r, x: cx, y: padY + row1H + gap, w, h: row2H });
        cx += w + gap;
    });

    return (
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', cursor: 'pointer', display: 'block' }}>
            {blocks.map(({ region, x, y, w, h }) => {
                const isHov = hovered === region.id;
                const color = attainmentColor(region.attainment);
                return (
                    <g key={region.id}
                        onMouseEnter={() => setHovered(region.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => onClick?.(region.id)}
                    >
                        <rect
                            x={x} y={y} width={w} height={h}
                            rx={6}
                            fill={`${color}${isHov ? '30' : '18'}`}
                            stroke={isHov ? color : `${color}40`}
                            strokeWidth={isHov ? 2 : 1}
                        />
                        {/* Region label */}
                        <text x={x + w / 2} y={y + 30} textAnchor="middle" fontSize={13} fontWeight={700}
                            fill={color} fontFamily="'Inter', sans-serif">{region.label}</text>
                        {/* Budget */}
                        <text x={x + w / 2} y={y + 54} textAnchor="middle" fontSize={20} fontWeight={800}
                            fill="var(--text-primary, #e6edf3)" fontFamily="'Inter', sans-serif"
                            letterSpacing={-0.5}>{region.budget}</text>
                        {/* Attainment badge */}
                        <rect x={x + w / 2 - 45} y={y + 68} width={90} height={20} rx={4}
                            fill={`${color}20`} />
                        <text x={x + w / 2} y={y + 81} textAnchor="middle" fontSize={10} fontWeight={700}
                            fill={color} fontFamily="'Inter', sans-serif">
                            {region.attainment}% attained
                        </text>
                        {/* Glow effect on hover */}
                        {isHov && (
                            <rect x={x} y={y} width={w} height={h} rx={6}
                                fill="none" stroke={color} strokeWidth={1} opacity={0.3}
                                filter="blur(4px)" />
                        )}
                    </g>
                );
            })}
        </svg>
    );
}
