'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { OPS_RULES } from '../data';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: 8, padding: '20px 24px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

function AutomationContent() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>Operational Automation Rules</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Capacity alerts · Territory rebalance · Ramp milestones · CAC monitoring</p>
                    </div>
                    <button style={{ padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 700, background: accent, color: 'var(--text-primary)', border: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px ${accent}40`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}>
                        + Create Rule
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { label: 'Active Rules', value: '5', color: '#22c55e' },
                        { label: 'Total Triggers', value: '238', color: accent },
                        { label: 'Actions This Week', value: '18', color: '#3b82f6' },
                    ].map(m => (
                        <div key={m.label} style={card}>
                            <div style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {OPS_RULES.map(rule => (
                        <div key={rule.id} style={{ ...card, cursor: 'pointer', borderColor: expanded === rule.id ? `${accent}30` : 'rgba(249,115,22,0.08)' }}
                            onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
                            onMouseEnter={e => { if (expanded !== rule.id) (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}18`; }}
                            onMouseLeave={e => { if (expanded !== rule.id) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>{rule.name}</span>
                                        <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700, background: '#22c55e15', color: '#22c55e' }}>ACTIVE</span>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                                        <strong style={{ color: accent }}>WHEN:</strong> {rule.trigger}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                                        <strong style={{ color: '#22c55e' }}>THEN:</strong> {rule.actions.join(' → ')}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: accent, fontFamily: "'Space Grotesk', sans-serif" }}>{rule.executions}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>triggers</div>
                                    <div style={{ fontSize: '0.5rem', color: '#374151', marginTop: 4 }}>Last: {rule.lastRun}</div>
                                </div>
                            </div>
                            {expanded === rule.id && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(249,115,22,0.08)', display: 'flex', gap: 10 }}>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}25`; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}15`; }}>Edit Rule</button>
                                    <button style={{ padding: '6px 14px', borderRadius: 4, fontSize: '0.625rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid rgba(249,115,22,0.1)', cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}08`; }}
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

export default function Automation12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
