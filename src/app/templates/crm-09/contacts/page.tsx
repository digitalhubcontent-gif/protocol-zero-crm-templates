'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { NetworkGraph } from '@/components/charts/NetworkGraph';
import { OrgTreeChart } from '@/components/charts/OrgTreeChart';
import {
    EXEC_NETWORK_NODES, EXEC_NETWORK_EDGES, ORG_TREE,
    ENGAGEMENT_DEPTH, INFLUENCE_HEATMAP,
} from '../data';

const accent = '#3b82f6';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: '20px 24px' };
const lbl: React.CSSProperties = { fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 };

function ContactsContent() {
    const [selectedAccount] = useState('Vantage Analytics');
    const maxInfluence = 10;
    const depthColor = (s: number) => s >= 8 ? '#22c55e' : s >= 5 ? '#f59e0b' : '#ef4444';
    const maxDepth = Math.max(...ENGAGEMENT_DEPTH.map(d => d.score));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>Executive Relationship Map</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Sponsor coverage · Multi-threading depth · Influence mapping</p>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
                    {[
                        { label: 'Executive Sponsor Coverage', value: '84%', color: accent },
                        { label: 'Multi-Threading Depth', value: '3.2 avg', color: '#22c55e' },
                        { label: 'Avg Influence Score', value: '7.1/10', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card, transition: 'all 0.2s', cursor: 'default' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}45`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Network Graph + Org Tree */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Executive Stakeholder Network</div>
                        <NetworkGraph nodes={EXEC_NETWORK_NODES} edges={EXEC_NETWORK_EDGES} accent={accent} size={280} />
                    </div>

                    <div style={card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={lbl}>Executive Org Hierarchy — {selectedAccount}</div>
                        </div>
                        <OrgTreeChart nodes={ORG_TREE} accent={accent} height={280} />
                    </div>
                </div>

                {/* Row 2: Engagement Depth + Influence Heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Engagement Depth */}
                    <div style={card}>
                        <div style={lbl}>Executive Engagement Depth by Account</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {ENGAGEMENT_DEPTH.map(d => (
                                <div key={d.account} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 50px', gap: 8, alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.account}</span>
                                    <div style={{ height: 10, background: 'var(--bg-card)', borderRadius: 3 }}>
                                        <div style={{ width: `${(d.score / maxDepth) * 100}%`, height: '100%', background: depthColor(d.score), borderRadius: 3, opacity: 0.8 }} />
                                    </div>
                                    <span style={{ fontSize: '0.625rem', color: depthColor(d.score), fontWeight: 700, textAlign: 'right' }}>{d.score}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
                            {[['Strong (8+)', '#22c55e'], ['At Risk (5-8)', '#f59e0b'], ['Critical (<5)', '#ef4444']].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                                    <span style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Influence Heatmap */}
                    <div style={card}>
                        <div style={lbl}>Stakeholder Influence by Governance Phase</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '3px 6px', fontSize: '0.45rem', color: 'var(--text-muted)', textAlign: 'left', fontWeight: 700 }}>Stakeholder</th>
                                        {INFLUENCE_HEATMAP.phases.map(p => (
                                            <th key={p} style={{ padding: '3px 4px', fontSize: '0.4rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 700, minWidth: 42 }}>{p}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {INFLUENCE_HEATMAP.stakeholders.map((s, ri) => (
                                        <tr key={s}>
                                            <td style={{ padding: '2px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{s}</td>
                                            {INFLUENCE_HEATMAP.phases.map((_, ci) => {
                                                const val = INFLUENCE_HEATMAP.values[ri][ci];
                                                const intensity = Math.round((val / maxInfluence) * 200).toString(16).padStart(2, '0');
                                                return (
                                                    <td key={ci} style={{ padding: '2px' }}>
                                                        <div style={{ height: 22, borderRadius: 3, background: `${accent}${intensity}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span style={{ fontSize: '0.4375rem', fontWeight: 700, color: val > 7 ? 'rgba(0,0,0,0.7)' : '#e2e8f0' }}>{val}</span>
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
                </div>
            </div>
        </div>
    );
}

export default function Contacts09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-09');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contacts" accentColor={accent}>
            <ContactsContent />
        </CrmLayout>
    );
}
