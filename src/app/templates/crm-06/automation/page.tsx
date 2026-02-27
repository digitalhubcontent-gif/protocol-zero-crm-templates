'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { NEURAL_TRIGGERS } from '../data';

const accent = '#a78bfa';

function AutomationContent() {
    const [triggers, setTriggers] = useState(NEURAL_TRIGGERS);
    const [condition, setCondition] = useState('Confidence drops > 10%');
    const [threshold, setThreshold] = useState('10');
    const [action, setAction] = useState('Escalate to manager');
    const [saved, setSaved] = useState(false);

    const toggleTrigger = (id: string) => {
        setTriggers(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
    };

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Neural Trigger Engine</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI signal triggers · Confidence alerts · Behavioral automation</p>
                </div>

                {/* Trigger builder */}
                <div style={{
                    background: 'var(--bg-card)', border: `1px solid ${accent}25`,
                    borderRadius: 8, padding: '22px 24px', marginBottom: 24,
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>New Neural Trigger</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WHEN Signal Detects</label>
                            <select value={condition} onChange={e => setCondition(e.target.value)} style={{
                                padding: '7px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', outline: 'none', cursor: 'pointer',
                            }}>
                                {['Confidence drops > 10%', 'Intent score surge', 'No behavioral signal 5d', 'Competitor mention', 'Champion departure'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 80 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>THRESHOLD</label>
                            <input value={threshold} onChange={e => setThreshold(e.target.value)} style={{
                                padding: '7px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', outline: 'none',
                            }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }}>
                            <label style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>THEN FIRE ACTION</label>
                            <select value={action} onChange={e => setAction(e.target.value)} style={{
                                padding: '7px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                                borderRadius: 5, color: 'var(--text-primary)', fontSize: '0.75rem', outline: 'none', cursor: 'pointer',
                            }}>
                                {['Escalate to manager', 'Move to Fast Track', 'Re-engage sequence', 'Flag for review', 'Alert team lead'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{
                            padding: '8px 20px', background: saved ? '#3fb950' : accent,
                            color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer',
                            fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.2s',
                        }}>
                            {saved ? '✓ Saved' : 'Create Trigger'}
                        </button>
                    </div>
                </div>

                {/* Trigger list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {triggers.map(t => (
                        <div key={t.id} style={{
                            background: 'var(--bg-card)', border: `1px solid ${t.active ? `${accent}25` : 'var(--border-subtle)'}`,
                            borderRadius: 8, padding: '16px 18px',
                            opacity: t.active ? 1 : 0.55,
                            transition: 'all 0.2s',
                        }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{ fontSize: '0.5rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{t.id}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</span>
                                        <span style={{ fontSize: '0.4375rem', color: accent, background: `${accent}10`, padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                                            ⚡ Neural
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6, fontSize: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>WHEN</span>
                                        <span style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 3 }}>{t.condition}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>→</span>
                                        <span style={{ background: `${accent}10`, color: accent, padding: '2px 8px', borderRadius: 3 }}>{t.action}</span>
                                    </div>
                                    <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', marginTop: 6 }}>Last fired: {t.lastTriggered}</div>
                                </div>
                                <button onClick={() => toggleTrigger(t.id)} style={{
                                    minWidth: 44, height: 22, borderRadius: 11,
                                    background: t.active ? accent : 'var(--border-card)', border: 'none', cursor: 'pointer',
                                    position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                                }}>
                                    <div style={{
                                        position: 'absolute', top: 3,
                                        left: t.active ? 'calc(100% - 19px)' : 3,
                                        width: 16, height: 16, borderRadius: '50%', background: 'white',
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

export default function Automation06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <AutomationContent />
        </CrmLayout>
    );
}
