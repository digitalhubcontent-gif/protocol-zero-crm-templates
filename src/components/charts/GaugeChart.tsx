'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

interface Zone {
    min: number;
    max: number;
    color: string;
    label?: string;
}

interface Props {
    value: number;        // 0–max
    max?: number;
    zones?: Zone[];
    centerLabel?: string;
    subLabel?: string;
    size?: number;
    accent?: string;
    bgColor?: string;
    labelColor?: string;
}

const DEFAULT_ZONES: Zone[] = [
    { min: 0, max: 40, color: '#f85149', label: 'Critical' },
    { min: 40, max: 70, color: '#d29922', label: 'Moderate' },
    { min: 70, max: 100, color: '#3fb950', label: 'Optimal' },
];

export function GaugeChart({
    value,
    max = 100,
    zones = DEFAULT_ZONES,
    centerLabel,
    subLabel,
    size = 200,
    accent = '#58a6ff',
    bgColor = 'transparent',
    labelColor,
}: Props) {
    const svgSize = size;
    const cx = svgSize / 2;
    const cy = svgSize * 0.58;
    const r = svgSize * 0.38;
    const strokeW = svgSize * 0.085;

    // Semi-circle: from 180° to 0° (left to right)
    const startAngle = Math.PI;
    const endAngle = 0;

    const polarToXY = (angle: number, radius: number) => ({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
    });

    const describeArc = (fromDeg: number, toDeg: number, rad: number) => {
        const from = polarToXY(fromDeg, rad);
        const to = polarToXY(toDeg, rad);
        const large = (toDeg - fromDeg) > Math.PI ? 1 : 0;
        return `M ${from.x} ${from.y} A ${rad} ${rad} 0 ${large} 1 ${to.x} ${to.y}`;
    };

    // Map value to angle
    const valueAngle = (v: number) => {
        const clamped = Math.min(Math.max(v, 0), max);
        return startAngle - (clamped / max) * Math.PI;
    };

    // Needle tip
    const needleAngle = valueAngle(value);
    const needleTip = polarToXY(needleAngle, r * 0.82);
    const needleBase1 = polarToXY(needleAngle + Math.PI / 2, strokeW * 0.15);
    const needleBase2 = polarToXY(needleAngle - Math.PI / 2, strokeW * 0.15);

    // Active zone color
    const activeZone = zones.find(z => (value / max) * 100 >= z.min && (value / max) * 100 < z.max) ?? zones[zones.length - 1];
    const needleColor = activeZone?.color ?? accent;

    // Zone arcs: map zone % to radians
    const zoneArcs = zones.map(z => ({
        color: z.color,
        from: startAngle - (z.min / 100) * Math.PI,
        to: startAngle - (z.max / 100) * Math.PI,
    }));

    const textColor = labelColor ?? 'var(--text-primary, #e6edf3)';
    const mutedColor = 'var(--text-secondary, #8b949e)';

    return (
        <svg width="100%" height="auto" style={{ maxHeight: svgSize * 0.68, overflow: 'visible' }} viewBox={`0 0 ${svgSize} ${svgSize * 0.68}`} preserveAspectRatio="xMidYMid meet">

            {/* Background track */}
            <path
                d={describeArc(startAngle, endAngle, r)}
                fill="none"
                stroke="var(--border-subtle, rgba(255,255,255,0.06))"
                strokeWidth={strokeW}
                strokeLinecap="round"
            />

            {/* Zone arcs */}
            {zoneArcs.map((z, i) => (
                <path key={i}
                    d={describeArc(z.from, z.to, r)}
                    fill="none"
                    stroke={z.color}
                    strokeWidth={strokeW}
                    opacity={0.22}
                />
            ))}

            {/* Filled arc up to value */}
            <path
                d={describeArc(startAngle, needleAngle, r)}
                fill="none"
                stroke={needleColor}
                strokeWidth={strokeW}
                strokeLinecap="butt"
                opacity={0.85}
            />

            {/* Needle */}
            <polygon
                points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
                fill={needleColor}
            />
            {/* Center hub */}
            <circle cx={cx} cy={cy} r={strokeW * 0.28} fill={needleColor} />
            <circle cx={cx} cy={cy} r={strokeW * 0.14} fill="var(--bg-card, #1c2128)" />

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map(pct => {
                const angle = startAngle - (pct / 100) * Math.PI;
                const inner = polarToXY(angle, r - strokeW * 0.65);
                const outer = polarToXY(angle, r + strokeW * 0.05);
                const label = polarToXY(angle, r - strokeW * 0.95);
                return (
                    <g key={pct}>
                        <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                            stroke="var(--chart-grid, rgba(255,255,255,0.1))" strokeWidth={1} />
                        <text x={label.x} y={label.y + 4} textAnchor="middle" fontSize={7.5}
                            fill={mutedColor} fontFamily="'Inter', sans-serif">
                            {pct}
                        </text>
                    </g>
                );
            })}

            {/* Center value */}
            <text x={cx} y={cy - strokeW * 0.3} textAnchor="middle"
                fontSize={svgSize * 0.115} fontWeight="700"
                fill={needleColor} fontFamily="'Inter', 'Space Grotesk', sans-serif">
                {centerLabel ?? `${Math.round(value)}%`}
            </text>

            {/* Sub label */}
            {subLabel && (
                <text x={cx} y={cy + svgSize * 0.06} textAnchor="middle"
                    fontSize={svgSize * 0.05}
                    fill={mutedColor} fontFamily="'Inter', sans-serif">
                    {subLabel}
                </text>
            )}

            {/* Active zone label */}
            {activeZone?.label && (
                <text x={cx} y={cy + svgSize * 0.12} textAnchor="middle"
                    fontSize={svgSize * 0.048} fontWeight="600"
                    fill={activeZone.color} fontFamily="'Inter', sans-serif">
                    {activeZone.label}
                </text>
            )}
        </svg>
    );
}
