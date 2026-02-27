'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { VARIANCE_RULES } from '../data';

const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '20px 24px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

function AutomationContent() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Variance-Triggered Rules</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Delta alerts · Gap triggers · Divergence detection · Imbalance correction</p>
                    </div>
                    <button style={{ padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700, background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-card)', transition: 'all 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}>
                        + Create Rule
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { label: 'Active Rules', value: '5', color: '#22c55e' },
                        { label: 'Total Executions', value: '283', color: '#3b82f6' },
                        { label: 'Alerts This Week', value: '12', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={card}>
                            <div style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {VARIANCE_RULES.map(rule => (
                        <div key={rule.id} style={{ ...card, cursor: 'pointer', borderColor: expanded === rule.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)' }}
                            onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
                            onMouseEnter={e => { if (expanded !== rule.id) (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; }}
                            onMouseLeave={e => { if (expanded !== rule.id) (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.name}</span>
                                        <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{rule.status.toUpperCase()}</span>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                                        <strong style={{ color: '#ef4444' }}>WHEN:</strong> {rule.trigger}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                                        <strong style={{ color: '#22c55e' }}>THEN:</strong> {rule.actions.join(' → ')}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{rule.executions}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>executions</div>
                                    <div style={{ fontSize: '0.5rem', color: '#374151', marginTop: 4 }}>Last: {rule.lastRun}</div>
                                </div>
                            </div>
                            {expanded === rule.id && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10 }}>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: 'var(--bg-card)', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; }}>Edit Rule</button>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>View Log</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Automation11Page() {
    const template = getTemplateBySlug('crm-11');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-11');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor="var(--crm-accent)">
            <AutomationContent />
        </CrmLayout>
    );
}
