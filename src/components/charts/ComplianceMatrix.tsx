'use client';

import React, { useState } from 'react';

export interface ComplianceControl {
    id: string;
    category: string;
    name: string;
    statuses: {
        regulation: string;
        status: 'compliant' | 'warning' | 'breach' | 'na';
        detail?: string;
    }[];
}

interface Props {
    controls: ComplianceControl[];
    accent?: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    compliant: { bg: '#22c55e20', text: '#22c55e', label: '✓ Compliant' },
    warning: { bg: '#f59e0b20', text: '#f59e0b', label: '⚠ Warning' },
    breach: { bg: '#ef444420', text: '#ef4444', label: '✕ Breach' },
    na: { bg: '#6b728015', text: '#6b7280', label: '— N/A' },
};

export function ComplianceMatrix({ controls, accent = '#10b981' }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);

    // Get unique regulations from the first control
    const regulations = controls[0]?.statuses.map(s => s.regulation) || [];

    // Group by category
    const categories: Record<string, ComplianceControl[]> = {};
    controls.forEach(c => {
        if (!categories[c.category]) categories[c.category] = [];
        categories[c.category].push(c);
    });

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 2px' }}>
                <thead>
                    <tr>
                        <th style={{
                            padding: '8px 12px', textAlign: 'left', fontSize: '0.5625rem',
                            fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase',
                            letterSpacing: '0.06em', width: 200, whiteSpace: 'nowrap',
                        }}>Control</th>
                        {regulations.map(r => (
                            <th key={r} style={{
                                padding: '8px 10px', textAlign: 'center', fontSize: '0.5625rem',
                                fontWeight: 700, color: accent, textTransform: 'uppercase',
                                letterSpacing: '0.06em', minWidth: 90,
                            }}>{r}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(categories).map(([cat, catControls]) => (
                        <React.Fragment key={cat}>
                            {/* Category header */}
                            <tr>
                                <td colSpan={regulations.length + 1} style={{
                                    padding: '10px 12px 4px', fontSize: '0.5rem',
                                    fontWeight: 800, color: accent,
                                    textTransform: 'uppercase', letterSpacing: '0.1em',
                                    borderBottom: `1px solid ${accent}20`,
                                }}>{cat}</td>
                            </tr>
                            {catControls.map(control => {
                                const hasBreach = control.statuses.some(s => s.status === 'breach');
                                const isHov = hovered === control.id;
                                return (
                                    <tr key={control.id}
                                        onMouseEnter={() => setHovered(control.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        style={{
                                            background: hasBreach ? '#ef444408' : isHov ? 'var(--bg-elevated, rgba(255,255,255,0.02))' : 'transparent',
                                            borderLeft: hasBreach ? '3px solid #ef4444' : '3px solid transparent',
                                            transition: 'background 0.15s',
                                        }}>
                                        <td style={{
                                            padding: '6px 12px', fontSize: '0.6875rem',
                                            color: 'var(--text-secondary)', fontWeight: 500,
                                        }}>
                                            {control.name}
                                        </td>
                                        {control.statuses.map((s, i) => {
                                            const cfg = statusConfig[s.status];
                                            return (
                                                <td key={i} style={{ padding: '4px 6px', textAlign: 'center' }}>
                                                    <span
                                                        title={s.detail || cfg.label}
                                                        style={{
                                                            display: 'inline-block',
                                                            padding: '3px 10px',
                                                            borderRadius: 12,
                                                            background: cfg.bg,
                                                            color: cfg.text,
                                                            fontSize: '0.5rem',
                                                            fontWeight: 700,
                                                            cursor: s.detail ? 'help' : 'default',
                                                            transition: 'all 0.15s',
                                                        }}
                                                    >
                                                        {cfg.label}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
