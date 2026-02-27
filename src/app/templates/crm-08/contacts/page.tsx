'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { DecayCurveChart } from '@/components/charts/DecayCurveChart';
import { SIGNAL_DECAY } from '../data';

const accent = '#06b6d4';
const surge = '#f59e0b';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const lbl: React.CSSProperties = {
    fontSize: '0.6875rem', fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
};

const PERSONAS = [
    {
        id: 'p1', name: 'Jenna Walsh', title: 'VP of Engineering', company: 'Stark Industries',
        icpFit: 94, intent: 88, usageLevel: 'Power User', signalType: 'Trial Surge', confidence: 92,
        decay: 3, // days until stale
        bio: 'Activated trial 6 days ago. Opened 9 emails. Invited 3 teammates. Viewed pricing 4×.',
        signals: ['Pricing page viewed 4×', '3 seats added', 'API docs accessed', 'Champion email opened'],
        color: '#22c55e',
    },
    {
        id: 'p2', name: 'Marcus Bennet', title: 'CTO', company: 'LexCorp',
        icpFit: 81, intent: 72, usageLevel: 'Evaluator', signalType: 'Intent Spike', confidence: 78,
        decay: 6,
        bio: 'G2 review page visited 3×. LinkedIn engagement on competitor post. Web intent surge.',
        signals: ['G2 viewed 3×', 'Competitor research', 'Web intent surge +29%', 'Webinar attended'],
        color: accent,
    },
    {
        id: 'p3', name: 'Sarah Kim', title: 'Director of RevOps', company: 'Initech',
        icpFit: 67, intent: 54, usageLevel: 'Low', signalType: '3rd-Party Intent', confidence: 61,
        decay: 11,
        bio: 'Bombora surge detected on CRM category. Email cold opened. No trial yet.',
        signals: ['Bombora surge: CRM', 'Cold email opened 1×', 'No trial activation', 'LinkedIn profile view'],
        color: '#f59e0b',
    },
];

function ContactsContent() {
    const [activePersona, setActivePersona] = useState(PERSONAS[0]);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Contact Signal Intelligence
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        ICP profiles · Intent decay · Behavioral signal explorer
                    </p>
                </div>

                {/* Persona selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                    {PERSONAS.map(p => (
                        <button key={p.id} onClick={() => setActivePersona(p)}
                            style={{
                                ...card,
                                padding: '14px 16px',
                                cursor: 'pointer', textAlign: 'left',
                                borderColor: activePersona.id === p.id ? p.color : 'var(--border-card)',
                                background: activePersona.id === p.id ? `${p.color}10` : 'var(--bg-card)',
                                transition: 'all 0.2s', width: '100%',
                            }}
                            onMouseEnter={e => { if (activePersona.id !== p.id) (e.currentTarget as HTMLButtonElement).style.borderColor = `${p.color}40`; }}
                            onMouseLeave={e => { if (activePersona.id !== p.id) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-card)'; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
                                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{p.title} · {p.company}</div>
                                </div>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${p.color}20`, border: `2px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem', fontWeight: 700, color: p.color }}>
                                    {p.name[0]}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {[['ICP', p.icpFit], ['Intent', p.intent], ['Conf.', p.confidence]].map(([l, v]) => (
                                    <div key={l as string} style={{ flex: 1, textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: p.color }}>{v}</div>
                                        <div style={{ fontSize: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Profile */}
                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={{ textAlign: 'center', marginBottom: 14 }}>
                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: `${activePersona.color}20`, border: `3px solid ${activePersona.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '1.5rem', fontWeight: 800, color: activePersona.color }}>
                                {activePersona.name[0]}
                            </div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activePersona.name}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 2 }}>{activePersona.title}</div>
                            <div style={{ fontSize: '0.5rem', color: accent, marginTop: 1 }}>{activePersona.company}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, textAlign: 'center', marginBottom: 14 }}>
                            {[['ICP', activePersona.icpFit, activePersona.color], ['Intent', activePersona.intent, activePersona.color], ['Conf.', activePersona.confidence, accent]].map(([l, v, c]) => (
                                <div key={l as string} style={{ padding: '8px 4px', background: 'var(--bg-elevated)', borderRadius: 5 }}>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: c as string }}>{v}</div>
                                    <div style={{ fontSize: '0.4rem', color: 'var(--text-muted)' }}>{l}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Signal Type</div>
                            <span style={{ padding: '3px 10px', borderRadius: 10, background: `${activePersona.color}18`, color: activePersona.color, fontSize: '0.5625rem', fontWeight: 700 }}>{activePersona.signalType}</span>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Days Until Stale</div>
                            <div style={{
                                fontSize: '1.75rem', fontWeight: 800,
                                color: activePersona.decay <= 4 ? '#ef4444' : activePersona.decay <= 8 ? surge : '#22c55e',
                            }}>
                                {activePersona.decay}d
                            </div>
                            <div style={{ height: 4, background: 'var(--border-subtle)', borderRadius: 2, marginTop: 4 }}>
                                <div style={{ width: `${(1 - activePersona.decay / 14) * 100}%`, height: '100%', background: activePersona.decay <= 4 ? '#ef4444' : activePersona.decay <= 8 ? surge : '#22c55e', borderRadius: 2 }} />
                            </div>
                        </div>
                    </div>

                    <div style={card}>
                        <div style={lbl}>Behavioral Profile</div>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>{activePersona.bio}</p>
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Active Signals</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                {activePersona.signals.map((sig, i) => (
                                    <div key={i} style={{ padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 5, fontSize: '0.5625rem', color: 'var(--text-secondary)', borderLeft: `3px solid ${activePersona.color}` }}>
                                        {sig}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Signal Decay Curve</div>
                            <DecayCurveChart
                                series={SIGNAL_DECAY.slice(0, 1).map(s => ({
                                    label: activePersona.name,
                                    color: activePersona.color,
                                    data: s.data.map(d => ({ day: d.day, value: d.value })),
                                    halfLifeDay: s.halfLifeDay,
                                }))}
                                thresholdValue={20}
                                thresholdLabel="Stale"
                                height={120}
                            />
                        </div>
                    </div>
                </div>

                {/* Engagement timeline */}
                <div style={card}>
                    <div style={lbl}>Engagement Timeline — {activePersona.name}</div>
                    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 10 }}>
                        {[
                            { day: 'Day 1', event: 'Trial signup', type: 'signup' },
                            { day: 'Day 2', event: 'Core feature activated', type: 'feature' },
                            { day: 'Day 3', event: '2 teammates invited', type: 'team' },
                            { day: 'Day 4', event: 'API docs accessed', type: 'api' },
                            { day: 'Day 5', event: 'Pricing page ×3', type: 'pricing' },
                            { day: 'Day 6', event: 'Champion email', type: 'email' },
                        ].map((ev, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 80, position: 'relative' }}>
                                <div style={{ width: '100%', height: 2, background: i < 5 ? `${activePersona.color}50` : 'var(--border-subtle)', marginTop: 14 }} />
                                <div style={{ position: 'absolute', top: 7, width: 16, height: 16, borderRadius: '50%', background: activePersona.color, border: `2px solid var(--bg-primary)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.4rem', color: '#fff', fontWeight: 700 }}>
                                    {i + 1}
                                </div>
                                <div style={{ marginTop: 24, textAlign: 'center', padding: '0 4px' }}>
                                    <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)' }}>{ev.day}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', marginTop: 2 }}>{ev.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Contacts08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contacts" accentColor={accent}>
            <ContactsContent />
        </CrmLayout>
    );
}
