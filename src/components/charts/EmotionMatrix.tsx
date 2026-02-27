'use client';

import React, { useState } from 'react';

interface Props {
    rows: string[];
    cols: string[];
    data: number[][];  // row × col matrix of percentages
    colorMap: Record<string, string>;  // col → color
    monochromeMode?: boolean;
}

export function EmotionMatrix({ rows, cols, data, colorMap, monochromeMode = false }: Props) {
    const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

    const cellStyle = (r: number, c: number): React.CSSProperties => {
        const val = data[r]?.[c] ?? 0;
        const col = cols[c];
        const baseColor = colorMap[col] ?? '#888';
        const isHov = hoveredCell?.r === r && hoveredCell?.c === c;
        const opacity = monochromeMode
            ? val / 100 * 0.6
            : val / 100 * 0.75;
        return {
            background: `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
            padding: '7px 8px',
            textAlign: 'center',
            borderRadius: 4,
            cursor: 'default',
            transition: 'all 0.15s',
            transform: isHov ? 'scale(1.05)' : 'none',
            boxShadow: isHov ? `0 0 8px ${baseColor}60` : 'none',
            outline: isHov ? `1px solid ${baseColor}` : 'none',
        };
    };

    const rowTotal = (r: number) => data[r]?.reduce((s, v) => s + v, 0) ?? 0;

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                <thead>
                    <tr>
                        <th style={{
                            padding: '6px 10px',
                            fontSize: '0.5rem',
                            fontWeight: 700,
                            textAlign: 'left',
                            color: monochromeMode ? '#6b6b6b' : 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            whiteSpace: 'nowrap',
                            fontFamily: "'Inter', sans-serif",
                        }}>Interaction Type</th>
                        {cols.map(col => (
                            <th key={col} style={{
                                padding: '6px 6px',
                                fontSize: '0.5rem',
                                fontWeight: 700,
                                textAlign: 'center',
                                color: monochromeMode ? '#555' : (colorMap[col] ?? 'rgba(255,255,255,0.5)'),
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                whiteSpace: 'nowrap',
                                fontFamily: "'Inter', sans-serif",
                            }}>{col}</th>
                        ))}
                        <th style={{
                            padding: '6px 8px',
                            fontSize: '0.5rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: monochromeMode ? '#6b6b6b' : 'rgba(255,255,255,0.2)',
                            textTransform: 'uppercase',
                            fontFamily: "'Inter', sans-serif",
                        }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, r) => (
                        <tr key={row}>
                            <td style={{
                                padding: '4px 10px',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                                color: monochromeMode ? '#333' : 'rgba(255,255,255,0.7)',
                                whiteSpace: 'nowrap',
                                fontFamily: "'Inter', sans-serif",
                            }}>{row}</td>
                            {cols.map((col, c) => {
                                const val = data[r]?.[c] ?? 0;
                                const baseColor = colorMap[col] ?? '#888';
                                return (
                                    <td key={col}
                                        onMouseEnter={() => setHoveredCell({ r, c })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        style={cellStyle(r, c)}>
                                        <span style={{
                                            fontSize: '0.6875rem',
                                            fontWeight: 700,
                                            color: val > 45
                                                ? (monochromeMode ? '#fff' : 'rgba(0,0,0,0.7)')
                                                : monochromeMode ? '#333' : 'rgba(255,255,255,0.85)',
                                            fontFamily: "'Inter', sans-serif",
                                        }}>
                                            {val}%
                                        </span>
                                    </td>
                                );
                            })}
                            <td style={{
                                padding: '4px 8px',
                                textAlign: 'center',
                                fontSize: '0.5625rem',
                                fontWeight: 600,
                                color: monochromeMode ? '#888' : 'rgba(255,255,255,0.25)',
                                fontFamily: "'Inter', sans-serif",
                            }}>{rowTotal(r)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
