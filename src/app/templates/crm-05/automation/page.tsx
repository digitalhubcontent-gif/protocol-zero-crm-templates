'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { AUTOMATION_RULES } from '../data';

const accent = '#58a6ff';

function AutomationContent() {
    const [rules, setRules] = useState(AUTOMATION_RULES);
    const [condition1, setCondition1] = useState('Dwell > X days');
    const [condition2, setCondition2] = useState('No exec touch');
    const [action, setAction] = useState('Alert team lead');
    const [saved, setSaved] = useState(false);

    const toggleRule = (id: string) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1300, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Flow Rule Engine</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>SLA automation · Stage triggers · Escalation rules</p>
                </div>

                {/* Rule builder */}
                <div style={{
                    background: 'var(--bg-card)', border: `1px solid ${accent}25`,
                    borderRadius: 8, padding: '22px 24px', marginBottom: 24,
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                        New Rule Builder
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WHEN</label>
                            <select value={condition1} onChange={e => setCondition1(e.target.value)} style={{
                                padding: '7px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', cursor: 'pointer', outline: 'none',
                            }}>
                                {['Dwell > X days', 'No exec touch 7d', 'SLA breach', 'WIP limit', 'Stage stall'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ paddingTop: 14, color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem' }}>AND</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CONDITION</label>
                            <select value={condition2} onChange={e => setCondition2(e.target.value)} style={{
                                padding: '7px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', cursor: 'pointer', outline: 'none',
                            }}>
                                {['No exec touch', 'No reply 48h', 'WIP at limit', 'Champion inactive', 'Any time'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ paddingTop: 14, color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem' }}>THEN</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ACTION</label>
                            <select value={action} onChange={e => setAction(e.target.value)} style={{
                                padding: '7px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', cursor: 'pointer', outline: 'none',
                            }}>
                                {['Alert team lead', 'Reassign owner', 'Nudge owner', 'Escalate to manager', 'Next sequence step'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ paddingTop: 14 }}>
                            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{
                                padding: '8px 20px', background: saved ? '#3fb950' : accent,
                                color: 'var(--bg-primary)', border: 'none', borderRadius: 5,
                                cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                                {saved ? '✓ Saved' : 'Save Rule'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rule cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {rules.map(rule => (
                        <div key={rule.id} style={{
                            background: 'var(--bg-card)', border: `1px solid ${rule.active ? `${accent}25` : 'var(--border-subtle)'}`,
                            borderRadius: 8, padding: '16px 18px',
                            opacity: rule.active ? 1 : 0.6,
                            transition: 'all 0.2s',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{rule.id}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.name}</span>
                                        <span style={{ fontSize: '0.5rem', color: accent, background: `${accent}10`, padding: '1px 6px', borderRadius: 3 }}>
                                            {rule.affected} deals
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6, fontSize: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>WHEN</span>
                                        <span style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 3 }}>{rule.condition}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>→</span>
                                        <span style={{ color: accent, background: `${accent}10`, padding: '2px 8px', borderRadius: 3 }}>{rule.action}</span>
                                    </div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 6 }}>Last triggered: {rule.lastTriggered}</div>
                                </div>
                                <button onClick={() => toggleRule(rule.id)} style={{
                                    minWidth: 44, height: 22, borderRadius: 11,
                                    background: rule.active ? accent : 'var(--border-card)',
                                    border: 'none', cursor: 'pointer', position: 'relative',
                                    transition: 'background 0.2s',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: 3,
                                        left: rule.active ? 'calc(100% - 19px)' : 3,
                                        width: 16, height: 16, borderRadius: '50%',
                                        background: 'white',
                                        transition: 'left 0.2s',
                                    }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Automation05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
