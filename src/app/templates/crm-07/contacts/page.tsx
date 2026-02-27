'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SentimentChart } from '@/components/charts/SentimentChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { AUTHORITY_HEATMAP, SENTIMENT_TREND } from '../data';

const accent = '#8b5cf6';

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
    { name: 'Sarah Kim', title: 'CFO', company: 'Acme Corp', icp: 3, intent: 89, sentiment: 0.42, recencyDecay: 12, role: 'Economic Buyer' },
    { name: 'Mike Rodriguez', title: 'VP Engineering', company: 'Globex Inc', icp: 2, intent: 74, sentiment: 0.18, recencyDecay: 28, role: 'Technical Evaluator' },
    { name: 'Lisa Park', title: 'Revenue Ops Lead', company: 'Umbrella Ltd', icp: 3, intent: 93, sentiment: 0.61, recencyDecay: 5, role: 'Champion' },
    { name: 'Tom Wells', title: 'General Counsel', company: 'Initech', icp: 1, intent: 55, sentiment: -0.24, recencyDecay: 51, role: 'Blocker' },
];

const COMMITTEE_ROLES = [
    { role: 'Economic Buyer', status: 'filled', contact: 'Sarah Kim' },
    { role: 'Technical Evaluator', status: 'filled', contact: 'Mike Rodriguez' },
    { role: 'User Champion', status: 'partial', contact: '2 contacts' },
    { role: 'Legal/Finance', status: 'gap', contact: null },
    { role: 'Executive Sponsor', status: 'gap', contact: null },
];

const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#ef4444', label: 'Cold' },
    { min: 40, max: 70, color: '#f59e0b', label: 'Warming' },
    { min: 70, max: 100, color: '#8b5cf6', label: 'Hot' },
];

const NETWORK_NODES = [
    { id: 'sarah', label: 'Sarah', role: 'Economic Buyer', influence: 9, color: '#f59e0b', x: 50, y: 25 },
    { id: 'mike', label: 'Mike', role: 'Tech Eval', influence: 7, color: '#06b6d4', x: 80, y: 55 },
    { id: 'lisa', label: 'Lisa', role: 'Champion', influence: 8, color: '#10b981', x: 25, y: 65 },
    { id: 'tom', label: 'Tom', role: 'Blocker', influence: 5, color: '#ef4444', x: 62, y: 75 },
    { id: 'you', label: 'Sales', role: 'Rep', influence: 6, color: accent, x: 50, y: 50 },
];
const NETWORK_EDGES = [
    { from: 'you', to: 'sarah', w: 2 }, { from: 'you', to: 'lisa', w: 3 },
    { from: 'you', to: 'mike', w: 2 }, { from: 'lisa', to: 'sarah', w: 2 },
    { from: 'mike', to: 'tom', w: 1 }, { from: 'sarah', to: 'mike', w: 1.5 },
];

function ContactsContent() {
    const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);

    const roleStatusColor = (s: string) => s === 'filled' ? '#10b981' : s === 'partial' ? '#f59e0b' : accent;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        Buyer Persona Intelligence Map
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                        Committee influence · Sentiment trajectory · Authority mapping
                    </p>
                </div>

                {/* Persona selector */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    {PERSONAS.map(p => (
                        <button key={p.name} onClick={() => setSelectedPersona(p)}
                            style={{
                                padding: '10px 14px', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                                background: selectedPersona.name === p.name ? `${accent}18` : 'var(--bg-card)',
                                border: `1px solid ${selectedPersona.name === p.name ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                                flex: 1,
                            }}
                            onMouseEnter={e => { if (selectedPersona.name !== p.name) (e.currentTarget as HTMLButtonElement).style.borderColor = `${accent}45`; }}
                            onMouseLeave={e => { if (selectedPersona.name !== p.name) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-card)'; }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{p.title} · {p.company}</div>
                            <div style={{ marginTop: 4, fontSize: '0.5rem', color: p.role === 'Blocker' ? '#ef4444' : p.role === 'Champion' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                                {p.role}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Profile card */}
                <div style={{ ...card, marginBottom: 20, background: `linear-gradient(135deg, var(--bg-card) 0%, ${accent}08 100%)` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}25`, border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: accent }}>
                                    {selectedPersona.name[0]}
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedPersona.name}</div>
                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{selectedPersona.title} · {selectedPersona.company}</div>
                                </div>
                                <span style={{
                                    padding: '3px 10px', borderRadius: 20, fontSize: '0.5625rem', fontWeight: 700,
                                    background: selectedPersona.role === 'Blocker' ? '#ef444420' : selectedPersona.role === 'Champion' ? '#10b98120' : `${accent}20`,
                                    color: selectedPersona.role === 'Blocker' ? '#ef4444' : selectedPersona.role === 'Champion' ? '#10b981' : accent,
                                    border: `1px solid ${selectedPersona.role === 'Blocker' ? '#ef4444' : selectedPersona.role === 'Champion' ? '#10b981' : accent}`,
                                }}>{selectedPersona.role}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase' }}>Emotional Sentiment</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: selectedPersona.sentiment > 0.2 ? '#10b981' : selectedPersona.sentiment < -0.2 ? '#ef4444' : '#6b7280' }}>
                                        {selectedPersona.sentiment > 0 ? '+' : ''}{selectedPersona.sentiment.toFixed(2)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase' }}>Recency Decay</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: selectedPersona.recencyDecay > 40 ? '#ef4444' : selectedPersona.recencyDecay > 20 ? '#f59e0b' : '#10b981' }}>
                                        {selectedPersona.recencyDecay}%
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase' }}>ICP Level</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: accent }}>L{selectedPersona.icp}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Intent Intensity Index</div>
                            <GaugeChart value={selectedPersona.intent} zones={GAUGE_ZONES} size={100} centerLabel={`${selectedPersona.intent}`} />
                        </div>
                    </div>
                </div>

                {/* Charts row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* Influence network */}
                    <div style={card}>
                        <div style={lbl}>Buying Committee Influence Map</div>
                        <svg width={300} height={220} style={{ width: '100%', height: 'auto' }}>
                            {NETWORK_EDGES.map((e, i) => {
                                const f = NETWORK_NODES.find(n => n.id === e.from)!;
                                const t = NETWORK_NODES.find(n => n.id === e.to)!;
                                return (
                                    <line key={i}
                                        x1={f.x * 3} y1={f.y * 2.2}
                                        x2={t.x * 3} y2={t.y * 2.2}
                                        stroke="rgba(139,92,246,0.2)" strokeWidth={e.w * 1.5} />
                                );
                            })}
                            {NETWORK_NODES.map(n => (
                                <g key={n.id} style={{ cursor: 'pointer' }}>
                                    <circle cx={n.x * 3} cy={n.y * 2.2} r={6 + n.influence * 1.5}
                                        fill={`${n.color}35`} stroke={n.color} strokeWidth={2} />
                                    <text x={n.x * 3} y={n.y * 2.2 + 3} textAnchor="middle" fontSize={8}
                                        fill="var(--text-primary)" fontWeight={700} fontFamily="Inter, sans-serif">
                                        {n.label}
                                    </text>
                                    <text x={n.x * 3} y={n.y * 2.2 + (6 + n.influence * 1.5) + 12} textAnchor="middle" fontSize={6.5}
                                        fill={n.color} fontFamily="Inter, sans-serif">
                                        {n.role}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Contact sentiment */}
                    <div style={card}>
                        <div style={lbl}>Contact Sentiment Timeline — {selectedPersona.name}</div>
                        <SentimentChart
                            data={SENTIMENT_TREND.slice(0, 30).map((d, i) => ({
                                ...d,
                                value: +(d.value * 0.7 + selectedPersona.sentiment * 0.3 + Math.sin(i * 0.5) * 0.15).toFixed(2),
                            }))}
                            accent={accent}
                            positiveColor="#10b981"
                            negativeColor="#ef4444"
                            height={180}
                        />
                    </div>
                </div>

                {/* Authority heatmap + Committee completeness */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Decision Authority by Phase</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Contact</th>
                                        {AUTHORITY_HEATMAP.phases.map(p => (
                                            <th key={p} style={{ padding: '4px 8px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{p}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {AUTHORITY_HEATMAP.contacts.map((c, ri) => (
                                        <tr key={c}>
                                            <td style={{ padding: '3px 8px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{c}</td>
                                            {AUTHORITY_HEATMAP.phases.map((_, ci) => {
                                                const v = AUTHORITY_HEATMAP.values[ri][ci];
                                                const alpha = Math.round(v * 2.2).toString(16).padStart(2, '0');
                                                return (
                                                    <td key={ci} style={{ padding: '2px 4px' }}>
                                                        <div style={{ height: 28, borderRadius: 3, background: `${accent}${alpha}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: v > 65 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{v}</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={card}>
                        <div style={lbl}>Committee Role Coverage — {selectedPersona.company}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {COMMITTEE_ROLES.map(r => (
                                <div key={r.role} style={{
                                    padding: '10px 14px', borderRadius: 6,
                                    border: `1px solid ${r.status === 'gap' ? '#ef444435' : r.status === 'partial' ? '#f59e0b35' : '#10b98135'}`,
                                    background: r.status === 'gap' ? '#ef444408' : r.status === 'partial' ? '#f59e0b08' : '#10b98108',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{r.role}</div>
                                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                            {r.contact ?? 'No contact identified'}
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: 10, fontSize: '0.5rem', fontWeight: 700,
                                        background: `${roleStatusColor(r.status)}20`, color: roleStatusColor(r.status),
                                    }}>
                                        {r.status === 'filled' ? '✓ Covered' : r.status === 'partial' ? '⚠ Partial' : '✕ Gap'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Contacts07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contacts" accentColor={accent}>
            <ContactsContent />
        </CrmLayout>
    );
}
