'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { GOV_AUTOMATIONS, APPROVAL_STEPS } from '../data';

const accent = '#3b82f6';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: '20px 24px' };

function AutomationContent() {
    const [expandedRule, setExpandedRule] = useState<string | null>(null);
    const statusColor = (s: string) => s === 'approved' ? '#22c55e' : s === 'pending' ? '#f59e0b' : '#94a3b8';

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>Governance Automation Layer</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Risk escalation · Executive review triggers · Approval gates · Forecast alerts</p>
                    </div>
                    <button style={{ padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700, background: accent, color: 'var(--text-primary)', border: 'none' }}>+ Create Rule</button>
                </div>

                {/* Automation Rules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {GOV_AUTOMATIONS.map(rule => (
                        <div key={rule.id}
                            style={{
                                ...card,
                                cursor: 'pointer', transition: 'all 0.15s',
                                borderColor: expandedRule === rule.id ? `${accent}40` : 'rgba(59,130,246,0.1)',
                            }}
                            onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{rule.name}</span>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700,
                                            background: rule.status === 'active' ? '#22c55e18' : '#f59e0b18',
                                            color: rule.status === 'active' ? '#22c55e' : '#f59e0b',
                                        }}>{rule.status.toUpperCase()}</span>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                                        <strong style={{ color: '#f59e0b' }}>WHEN:</strong> {rule.trigger}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                                        <strong style={{ color: '#22c55e' }}>THEN:</strong> {rule.actions.join(' → ')}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: accent }}>{rule.executions}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>executions</div>
                                    <div style={{ fontSize: '0.5rem', color: '#475569', marginTop: 4 }}>Last: {rule.lastRun}</div>
                                </div>
                            </div>
                            {expandedRule === rule.id && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(59,130,246,0.08)', display: 'flex', gap: 10 }}>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer' }}>Edit Rule</button>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                                        {rule.status === 'active' ? 'Pause' : 'Activate'}
                                    </button>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>View Log</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Approval Gate Visual */}
                <div style={{ ...card }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                        Multi-Approval Gate — Deal #CR-4421 ($2.1M) Progression
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        {APPROVAL_STEPS.map((step, i) => (
                            <React.Fragment key={i}>
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1,
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: '50%',
                                        background: `${statusColor(step.status)}18`,
                                        border: `2px solid ${statusColor(step.status)}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <span style={{ fontSize: '0.875rem' }}>
                                            {step.status === 'approved' ? '✓' : step.status === 'pending' ? '⏳' : '○'}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{step.role}</div>
                                        <div style={{ fontSize: '0.5rem', color: statusColor(step.status), fontWeight: 600, marginTop: 2 }}>
                                            {step.status.toUpperCase()}
                                        </div>
                                        {step.timestamp && (
                                            <div style={{ fontSize: '0.4375rem', color: '#475569', marginTop: 2, fontFamily: 'monospace' }}>{step.timestamp}</div>
                                        )}
                                    </div>
                                </div>
                                {i < APPROVAL_STEPS.length - 1 && (
                                    <div style={{
                                        height: 2, flex: 0.5,
                                        background: step.status === 'approved' ? '#22c55e' : 'rgba(255,255,255,0.06)',
                                        marginBottom: 40,
                                    }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Automation09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-09');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
