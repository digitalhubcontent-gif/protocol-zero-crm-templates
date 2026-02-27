'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import {
    COMPLIANCE_STATUS, SECURITY_METRICS, AUDIT_LOG,
    VIOLATION_TREND, REVENUE_COMPLIANCE,
} from '../data';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '20px 24px' };
const lbl: React.CSSProperties = { fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 };

function DashboardContent() {
    const [showAllLogs, setShowAllLogs] = useState(false);
    const logStatusColor = (s: string) => s === 'pass' ? '#10b981' : s === 'approved' ? '#22c55e' : s === 'violation' ? '#ef4444' : 'var(--text-muted)';
    const logStatusIcon = (s: string) => s === 'pass' ? '✓' : s === 'approved' ? '✓' : s === 'violation' ? '✕' : 'ℹ';
    const totalRevComp = REVENUE_COMPLIANCE.reduce((s, r) => s + r.value, 0);
    const maxViolation = Math.max(...VIOLATION_TREND.flatMap(v => [v.critical, v.warning, v.info]));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Security Status */}
            <div style={{
                background: 'rgba(16,185,129,0.04)', borderBottom: '1px solid rgba(16,185,129,0.12)',
                padding: '8px 32px', fontFamily: 'monospace', fontSize: '0.6875rem',
                display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-muted)',
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--bg-card)', boxShadow: '0 0 6px #10b981', display: 'inline-block' }} />
                    <span style={{ color: '#10b981', fontWeight: 700 }}>SECURITY STATUS: NOMINAL</span>
                </span>
                <span>Score: {COMPLIANCE_STATUS.overall}/100</span>
                <span>Frameworks: {COMPLIANCE_STATUS.frameworks.length}</span>
                <span style={{ color: '#f59e0b' }}>Violations: 3</span>
                <span>Hash: 0x7a3f...b2c1</span>
            </div>

            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Compliance & Revenue Security Dashboard</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Compliance scoring · Immutable audit trail · Violation tracking · Revenue exposure</p>
                </div>

                {/* Security Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
                    {SECURITY_METRICS.map(m => (
                        <div key={m.label} style={{ ...card, transition: 'all 0.2s', cursor: 'default' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}35`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: 8 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Framework Status + Revenue Compliance */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Framework Status */}
                    <div style={card}>
                        <div style={lbl}>Compliance Framework Status</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {COMPLIANCE_STATUS.frameworks.map(fw => (
                                <div key={fw.name} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 60px 80px', gap: 12, alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{fw.name}</span>
                                    <div style={{ height: 10, background: 'var(--bg-card)', borderRadius: 3 }}>
                                        <div style={{
                                            width: `${fw.score}%`, height: '100%', borderRadius: 3, opacity: 0.8,
                                            background: fw.status === 'compliant' ? accent : '#f59e0b',
                                        }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: fw.status === 'compliant' ? accent : '#f59e0b', textAlign: 'right' }}>{fw.score}%</span>
                                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, textAlign: 'center', background: fw.status === 'compliant' ? `${accent}18` : '#f59e0b18', color: fw.status === 'compliant' ? accent : '#f59e0b' }}>
                                        {fw.status.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue at Risk */}
                    <div style={card}>
                        <div style={lbl}>Revenue by Compliance Status</div>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                            <svg width={130} height={130} viewBox="0 0 130 130" style={{ flexShrink: 0 }}>
                                {(() => {
                                    let offset = 0;
                                    const r = 48, cx = 65, cy = 65, circ = 2 * Math.PI * r;
                                    return REVENUE_COMPLIANCE.map(seg => {
                                        const pct = seg.value / totalRevComp;
                                        const dash = pct * circ;
                                        const gap = circ - dash;
                                        const rotate = offset * 360 - 90;
                                        offset += pct;
                                        return (
                                            <circle key={seg.label} cx={cx} cy={cy} r={r} fill="none"
                                                stroke={seg.color} strokeWidth={16}
                                                strokeDasharray={`${dash} ${gap}`}
                                                transform={`rotate(${rotate} ${cx} ${cy})`}
                                                style={{ transition: 'all 0.3s', cursor: 'pointer' }}
                                                onMouseEnter={e => (e.target as SVGCircleElement).setAttribute('stroke-width', '20')}
                                                onMouseLeave={e => (e.target as SVGCircleElement).setAttribute('stroke-width', '16')}>
                                                <title>{seg.label}: ${seg.value}M</title>
                                            </circle>
                                        );
                                    });
                                })()}
                                <text x={65} y={61} textAnchor="middle" fontSize={15} fontWeight={800} fill="#f9fafb" fontFamily="Inter, sans-serif">${totalRevComp}M</text>
                                <text x={65} y={75} textAnchor="middle" fontSize={7} fill="#4b5563" fontFamily="Inter, sans-serif">total ARR</text>
                            </svg>
                            <div style={{ flex: 1 }}>
                                {REVENUE_COMPLIANCE.map(seg => (
                                    <div key={seg.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: 2, background: seg.color }} />
                                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{seg.label}</span>
                                        </div>
                                        <span style={{ fontWeight: 700, color: seg.color, fontSize: '0.875rem' }}>${seg.value}M</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Violation Trend + Audit Log */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
                    {/* Violation Trend */}
                    <div style={card}>
                        <div style={lbl}>Violation Severity Trend (6 Months)</div>
                        <svg viewBox="0 0 380 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
                            {VIOLATION_TREND.map((v, i) => {
                                const x = 30 + i * 60;
                                const barW = 14;
                                const gap = 3;
                                const scale = 130 / (maxViolation || 1);
                                return (
                                    <g key={i}>
                                        <rect x={x} y={150 - v.critical * scale} width={barW} height={v.critical * scale || 2} fill="#ef4444" rx={2} opacity={0.8} />
                                        <rect x={x + barW + gap} y={150 - v.warning * scale} width={barW} height={v.warning * scale || 2} fill="#f59e0b" rx={2} opacity={0.8} />
                                        <rect x={x + (barW + gap) * 2} y={150 - v.info * scale} width={barW} height={v.info * scale || 2} fill="var(--text-muted)" rx={2} opacity={0.8} />
                                        <text x={x + 22} y={165} textAnchor="middle" fontSize={8} fill="#4b5563" fontFamily="Inter, sans-serif">{v.month}</text>
                                    </g>
                                );
                            })}
                        </svg>
                        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                            {[['Critical', '#ef4444'], ['Warning', '#f59e0b'], ['Info', 'var(--text-muted)']].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                                    <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Immutable Audit Log */}
                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={lbl}>Immutable Audit Trail</div>
                            <span style={{ fontSize: '0.5rem', color: accent, fontFamily: 'monospace' }}>🔒 Hash-chain verified</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {(showAllLogs ? AUDIT_LOG : AUDIT_LOG.slice(0, 5)).map((log, i) => (
                                <div key={i} style={{
                                    display: 'grid', gridTemplateColumns: '120px 90px 1fr 140px 80px',
                                    gap: 8, alignItems: 'center', padding: '6px 0',
                                    borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                                    borderLeft: log.status === 'violation' ? '2px solid #ef4444' : '2px solid transparent',
                                    paddingLeft: 8,
                                    transition: 'background 0.15s',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{log.timestamp}</span>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', fontWeight: 500 }}>{log.actor}</span>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{log.action}</span>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.resource}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: logStatusColor(log.status) }}>{logStatusIcon(log.status)}</span>
                                        <span style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{log.hash}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {AUDIT_LOG.length > 5 && (
                            <button onClick={() => setShowAllLogs(!showAllLogs)} style={{
                                marginTop: 8, background: 'none', border: 'none', color: accent, fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer',
                            }}>
                                {showAllLogs ? '▲ Show less' : `▼ Show all ${AUDIT_LOG.length} entries`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="dashboard" accentColor={accent}>
            <DashboardContent />
        </CrmLayout>
    );
}
