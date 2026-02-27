'use client';

import React from 'react';

interface WaterfallComponent {
    label: string;
    deltaValue: number;
    type: 'positive' | 'negative' | 'subtotal' | 'total';
}

interface Props {
    title?: string;
    segmentALabel?: string;
    segmentBLabel?: string;
    components: WaterfallComponent[];
    currency?: boolean;
    height?: number;
}

export function DeltaWaterfallChart({
    title, segmentALabel = 'A', segmentBLabel = 'B',
    components, currency = true, height = 220,
}: Props) {
    const absMax = Math.max(...components.map(c => Math.abs(c.deltaValue)), 1);
    const barW = Math.min(60, Math.floor(400 / components.length) - 12);
    const centerY = height / 2;
    const scaleY = (centerY - 30) / absMax;
    const totalW = components.length * (barW + 12) + 40;

    const formatVal = (v: number) => {
        const sign = v > 0 ? '+' : '';
        if (currency) {
            return `${sign}$${Math.abs(v)}M`;
        }
        return `${sign}${v}`;
    };

    const barColor = (c: WaterfallComponent) => {
        if (c.type === 'total') return c.deltaValue >= 0 ? '#22c55e' : '#ef4444';
        return c.deltaValue >= 0 ? '#22c55e' : '#ef4444';
    };

    const barOpacity = (c: WaterfallComponent) => c.type === 'total' ? 1 : 0.75;

    return (
        <div>
            {title && <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{title}</div>}
            <div style={{ fontSize: '0.5rem', color: '#4b5563', marginBottom: 6, display: 'flex', gap: 12 }}>
                <span>Positive = <strong style={{ color: '#22c55e' }}>{segmentALabel}</strong> advantage</span>
                <span>Negative = <strong style={{ color: '#ef4444' }}>{segmentBLabel}</strong> advantage</span>
            </div>
            <svg width={totalW} height={height} style={{ width: '100%', height: 'auto' }} viewBox={`0 0 ${totalW} ${height}`}>
                {/* Center line (0 axis) */}
                <line x1={20} y1={centerY} x2={totalW - 10} y2={centerY} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
                <text x={14} y={centerY + 3} textAnchor="end" fontSize={7} fill="#4b5563" fontFamily="monospace">0</text>

                {/* Connecting line between bars */}
                {components.map((c, i) => {
                    if (i === 0) return null;
                    const prevX = 30 + (i - 1) * (barW + 12) + barW / 2;
                    const curX = 30 + i * (barW + 12) + barW / 2;
                    const prevEnd = centerY - components[i - 1].deltaValue * scaleY;
                    return (
                        <line key={`line-${i}`} x1={prevX + barW / 2 + 2} y1={prevEnd} x2={curX - barW / 2 - 2} y2={prevEnd}
                            stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="3 2" />
                    );
                })}

                {/* Bars */}
                {components.map((c, i) => {
                    const x = 30 + i * (barW + 12);
                    const barH = Math.abs(c.deltaValue) * scaleY;
                    const y = c.deltaValue >= 0 ? centerY - barH : centerY;
                    const color = barColor(c);

                    return (
                        <g key={i}>
                            <rect x={x} y={y} width={barW} height={Math.max(barH, 2)} rx={3}
                                fill={color} opacity={barOpacity(c)}
                                style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseEnter={e => { (e.target as SVGRectElement).setAttribute('opacity', '1'); (e.target as SVGRectElement).setAttribute('filter', `drop-shadow(0 0 6px ${color}40)`); }}
                                onMouseLeave={e => { (e.target as SVGRectElement).setAttribute('opacity', String(barOpacity(c))); (e.target as SVGRectElement).removeAttribute('filter'); }}>
                                <title>{c.label}: {formatVal(c.deltaValue)}</title>
                            </rect>
                            {/* Value label */}
                            <text x={x + barW / 2} y={c.deltaValue >= 0 ? y - 4 : y + barH + 10}
                                textAnchor="middle" fontSize={8} fontWeight={700}
                                fill={color} fontFamily="Inter, sans-serif">
                                {formatVal(c.deltaValue)}
                            </text>
                            {/* Arrow indicator */}
                            <text x={x + barW / 2} y={c.deltaValue >= 0 ? y - 12 : y + barH + 18}
                                textAnchor="middle" fontSize={7} fill={color}>
                                {c.deltaValue >= 0 ? '↑' : '↓'}
                            </text>
                            {/* Label */}
                            <text x={x + barW / 2} y={height - 4}
                                textAnchor="middle" fontSize={6.5} fill="#6b7280" fontFamily="Inter, sans-serif">
                                {c.label.length > 12 ? c.label.slice(0, 12) + '…' : c.label}
                            </text>
                            {/* Total indicator */}
                            {c.type === 'total' && (
                                <rect x={x - 2} y={y - 2} width={barW + 4} height={barH + 4} rx={4}
                                    fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="4 2" />
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
