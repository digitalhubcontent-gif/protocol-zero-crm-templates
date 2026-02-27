'use client';

import React, { useState } from 'react';

export interface OrgNode {
    id: string;
    label: string;
    role?: string;
    level: number;
    parentId?: string;
    status?: 'engaged' | 'neutral' | 'unengaged' | 'blocker';
}

interface Props {
    nodes: OrgNode[];
    accent?: string;
    height?: number;
    orientation?: 'vertical' | 'horizontal';
}

const statusColors: Record<string, string> = {
    engaged: '#22c55e',
    neutral: '#6b7280',
    unengaged: '#94a3b8',
    blocker: '#ef4444',
};

export function OrgTreeChart({ nodes, accent = '#3b82f6', height = 320, orientation = 'vertical' }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    const width = 600;

    // Group by level
    const levels: Record<number, OrgNode[]> = {};
    nodes.forEach(n => {
        if (!levels[n.level]) levels[n.level] = [];
        levels[n.level].push(n);
    });
    const maxLevel = Math.max(...Object.keys(levels).map(Number));
    const levelKeys = Object.keys(levels).map(Number).sort((a, b) => a - b);

    // Positional mapping
    const positions: Record<string, { x: number; y: number }> = {};
    const nodeW = 110, nodeH = 36;
    const levelGap = (height - 40) / (maxLevel + 1);

    levelKeys.forEach(lvl => {
        const nodesAtLevel = levels[lvl];
        const totalW = nodesAtLevel.length * (nodeW + 20) - 20;
        const startX = (width - totalW) / 2;
        nodesAtLevel.forEach((n, i) => {
            positions[n.id] = {
                x: startX + i * (nodeW + 20) + nodeW / 2,
                y: 20 + lvl * levelGap + nodeH / 2,
            };
        });
    });

    // Build edges
    const edges: { from: string; to: string }[] = [];
    nodes.forEach(n => {
        if (n.parentId && positions[n.parentId]) {
            edges.push({ from: n.parentId, to: n.id });
        }
    });

    return (
        <svg width={width} height={height} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Connector lines */}
            {edges.map((e, i) => {
                const from = positions[e.from];
                const to = positions[e.to];
                if (!from || !to) return null;
                const midY = (from.y + to.y) / 2;
                return (
                    <path key={i}
                        d={`M ${from.x} ${from.y + nodeH / 2} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y - nodeH / 2}`}
                        fill="none"
                        stroke="var(--border-card, rgba(255,255,255,0.1))"
                        strokeWidth={1.5}
                        strokeDasharray="4 3"
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map(n => {
                const pos = positions[n.id];
                if (!pos) return null;
                const isHov = hovered === n.id;
                const status = n.status || 'neutral';
                const color = statusColors[status];
                const fillOpacity = status === 'engaged' ? '18' : status === 'blocker' ? '15' : '08';

                return (
                    <g key={n.id}
                        onMouseEnter={() => setHovered(n.id)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ cursor: 'pointer' }}>
                        {/* Node background */}
                        <rect
                            x={pos.x - nodeW / 2} y={pos.y - nodeH / 2}
                            width={nodeW} height={nodeH}
                            rx={6}
                            fill={`${color}${fillOpacity}`}
                            stroke={isHov ? color : `${color}40`}
                            strokeWidth={isHov ? 2 : 1}
                        />
                        {/* Status indicator dot */}
                        <circle cx={pos.x - nodeW / 2 + 12} cy={pos.y} r={4}
                            fill={color}
                            opacity={status === 'engaged' ? 1 : 0.6} />
                        {/* Name */}
                        <text x={pos.x - nodeW / 2 + 22} y={pos.y - 3} fontSize={9} fontWeight={700}
                            fill="var(--text-primary, #e6edf3)" fontFamily="'Inter', sans-serif">
                            {n.label.length > 14 ? n.label.slice(0, 13) + '…' : n.label}
                        </text>
                        {/* Role */}
                        {n.role && (
                            <text x={pos.x - nodeW / 2 + 22} y={pos.y + 10} fontSize={7.5}
                                fill="var(--text-muted, #484f58)" fontFamily="'Inter', sans-serif">
                                {n.role}
                            </text>
                        )}
                        {/* Hover: status label */}
                        {isHov && (
                            <text x={pos.x + nodeW / 2 - 8} y={pos.y + 3} textAnchor="end"
                                fontSize={7} fontWeight={600} fill={color}
                                fontFamily="'Inter', sans-serif" transform="uppercase">
                                {status}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Legend */}
            {['engaged', 'neutral', 'unengaged', 'blocker'].map((s, i) => (
                <g key={s} transform={`translate(${width - 280 + i * 72}, ${height - 12})`}>
                    <circle cx={0} cy={0} r={4} fill={statusColors[s]} />
                    <text x={8} y={3} fontSize={8} fill="var(--text-muted, #484f58)"
                        fontFamily="'Inter', sans-serif" style={{ textTransform: 'capitalize' } as React.CSSProperties}>
                        {s}
                    </text>
                </g>
            ))}
        </svg>
    );
}
