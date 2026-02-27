'use client';

import React, { useState } from 'react';

export interface GraphNode {
    id: string;
    label: string;
    role: string;
    size: number; // 1–10
    color?: string;
}

export interface GraphEdge {
    from: string;
    to: string;
    strength: number; // 1–3
}

interface Props {
    nodes: GraphNode[];
    edges: GraphEdge[];
    monochromeMode?: boolean;
    accent?: string;
    size?: number;
}

export function NetworkGraph({ nodes, edges, monochromeMode = false, accent = '#f59e0b', size = 300 }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    // Place nodes in a circle
    const positions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        positions[node.id] = {
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
        };
    });

    const roleColors: Record<string, string> = {
        'Finance': monochromeMode ? '#3a3a3a' : '#f59e0b',
        'Legal': monochromeMode ? '#5a5a5a' : '#a78bfa',
        'Operations': monochromeMode ? '#4a4a4a' : '#06b6d4',
        'C-Suite': monochromeMode ? '#0a0a0a' : '#ef4444',
        'Champion': monochromeMode ? '#0a0a0a' : accent,
        'Neutral': monochromeMode ? '#5a5a5a' : '#8a8a8a',
        'Blocker': monochromeMode ? '#3a3a3a' : '#ef4444',
    };

    return (
        <div style={{ position: 'relative' }}>
            <svg width={size} height={size} style={{ width: '100%', height: 'auto' }}>
                {/* Edges */}
                {edges.map((edge, i) => {
                    const from = positions[edge.from];
                    const to = positions[edge.to];
                    if (!from || !to) return null;
                    const isHov = hovered === edge.from || hovered === edge.to;
                    return (
                        <line key={i}
                            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                            stroke={isHov ? (monochromeMode ? '#3a3a3a' : accent) : (monochromeMode ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)')}
                            strokeWidth={edge.strength * 0.75}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map(node => {
                    const pos = positions[node.id];
                    if (!pos) return null;
                    const isHov = hovered === node.id;
                    const nodeR = 6 + node.size * 1.6;
                    const color = node.color ?? roleColors[node.role] ?? (monochromeMode ? '#4a4a4a' : '#666');
                    return (
                        <g key={node.id}
                            onMouseEnter={() => setHovered(node.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: 'pointer' }}>
                            <circle cx={pos.x} cy={pos.y} r={nodeR}
                                fill={isHov ? color : `${color}88`}
                                stroke={isHov ? color : (monochromeMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')}
                                strokeWidth={2}
                            />
                            <text x={pos.x} y={pos.y - nodeR - 5} textAnchor="middle" fontSize={8.5}
                                fill={monochromeMode ? '#3a3a3a' : 'rgba(255,255,255,0.65)'}
                                fontFamily="'Inter', sans-serif" fontWeight={isHov ? '700' : '400'}>
                                {node.label}
                            </text>
                            {isHov && (
                                <text x={pos.x} y={pos.y + nodeR + 12} textAnchor="middle" fontSize={8}
                                    fill={monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.4)'}
                                    fontFamily="'Inter', sans-serif">
                                    {node.role}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                {Object.entries(roleColors).slice(0, 4).map(([role, color]) => (
                    <div key={role} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                        <span style={{ fontSize: '0.6875rem', color: monochromeMode ? '#8a8a8a' : 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>{role}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
