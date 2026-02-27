'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface TreemapNode {
    id: string;
    label: string;
    value: number;
    riskScore: number; // 1–10
    arr?: string;
}

interface Props {
    nodes: TreemapNode[];
    accent?: string;
    height?: number;
}

function lerp(a: string, b: string, t: number): string {
    // Simple color lerp between two hex colors
    const parse = (hex: string) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    const [ar, ag, ab] = parse(a);
    const [br, bg, bb] = parse(b);
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const bl = Math.round(ab + (bb - ab) * t);
    return `rgb(${r},${g},${bl})`;
}

function computeRects(nodes: TreemapNode[], x0: number, y0: number, x1: number, y1: number) {
    if (nodes.length === 0) return [];
    const total = nodes.reduce((s, n) => s + n.value, 0);
    const results: { node: TreemapNode; x: number; y: number; w: number; h: number }[] = [];

    // Squarified treemap — simple recursive slice
    let cx = x0, cy = y0;
    const fullW = x1 - x0, fullH = y1 - y0;
    const isHorizontal = fullW >= fullH;

    for (let i = 0; i < nodes.length; i++) {
        const frac = nodes[i].value / total;
        if (isHorizontal) {
            const w = fullW * frac;
            results.push({ node: nodes[i], x: cx, y: cy, w, h: fullH });
            cx += w;
        } else {
            const h = fullH * frac;
            results.push({ node: nodes[i], x: cx, y: cy, w: fullW, h });
            cy += h;
        }
    }
    return results;
}

export function TreemapChart({ nodes, accent = '#f59e0b', height = 260 }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    const width = 600;
    const sorted = [...nodes].sort((a, b) => b.value - a.value);
    const rects = computeRects(sorted, 0, 0, width, height);

    const riskColor = (score: number) => {
        const t = (score - 1) / 9;
        return lerp('#1a3a2a', '#7f1d1d', t);
    };

    return (
        <svg width={width} height={height} style={{ width: '100%', height: 'auto', cursor: 'pointer' }}>
            {rects.map(({ node, x, y, w, h }) => {
                const isHov = hovered === node.id;
                const fg = riskColor(node.riskScore);
                return (
                    <g key={node.id} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}>
                        <rect
                            x={x + 1} y={y + 1} width={w - 2} height={h - 2}
                            fill={isHov ? `${fg}` : fg}
                            stroke={isHov ? accent : 'rgba(0,0,0,0.4)'}
                            strokeWidth={isHov ? 2 : 0.5}
                            rx={2}
                        />
                        {w > 60 && h > 36 && (
                            <>
                                <text x={x + 8} y={y + 18} fontSize={Math.min(12, w / 8)} fontWeight="600"
                                    fill="rgba(255,255,255,0.85)" fontFamily="'JetBrains Mono', monospace"
                                    clipPath={`url(#clip-${node.id})`}>
                                    {node.label}
                                </text>
                                {h > 52 && (
                                    <text x={x + 8} y={y + 34} fontSize={Math.min(11, w / 10)}
                                        fill={accent} fontFamily="'JetBrains Mono', monospace" fontWeight="700">
                                        {node.arr}
                                    </text>
                                )}
                                {h > 68 && (
                                    <text x={x + 8} y={y + 50} fontSize={9}
                                        fill="rgba(255,255,255,0.4)" fontFamily="'JetBrains Mono', monospace">
                                        Risk: {node.riskScore}/10
                                    </text>
                                )}
                            </>
                        )}
                        <clipPath id={`clip-${node.id}`}>
                            <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} />
                        </clipPath>
                    </g>
                );
            })}
        </svg>
    );
}
