'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PRINCIPALS, INTERACTION_HISTORY } from '../data';
import { NetworkGraph, GraphNode, GraphEdge } from '@/components/charts/NetworkGraph';

const NODES: GraphNode[] = PRINCIPALS.map((p, i) => ({
    id: `p${i}`, label: p.name.split(' ').pop() || p.name, role: p.role, size: p.influence,
}));
const EDGES: GraphEdge[] = [
    { from: 'p0', to: 'p1', strength: 3 }, { from: 'p0', to: 'p2', strength: 2 },
    { from: 'p3', to: 'p0', strength: 2 }, { from: 'p4', to: 'p1', strength: 1 },
    { from: 'p5', to: 'p0', strength: 3 }, { from: 'p6', to: 'p3', strength: 1 },
    { from: 'p7', to: 'p1', strength: 2 }, { from: 'p2', to: 'p5', strength: 1 },
];

export default function Crm04ContactPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [selected, setSelected] = useState<typeof PRINCIPALS[0] | null>(null);
    const [search, setSearch] = useState('');
    const filtered = PRINCIPALS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.org.toLowerCase().includes(search.toLowerCase())
    );

    const sentimentIcon = (s: string) => s === 'Positive' ? '↑' : s === 'Cautious' ? '→' : '↓';
    const sentimentColor = (s: string) => s === 'Positive' ? 'var(--status-success-text, #16a34a)' : s === 'Cautious' ? 'var(--status-warning-text, #d97706)' : 'var(--status-danger-text, #dc2626)';

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contacts &nbsp;/&nbsp; Principal Register</span>
                </div>

                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>
                        <div>
                            {/* Search */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Principal Register</p>
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search principals…"
                                    style={{ padding: '7px 12px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.75rem', fontFamily: 'inherit', outline: 'none', minWidth: 200, transition: 'border-color 0.15s' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--text-primary)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                            </div>

                            {/* Principal cards 2-col grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {filtered.map(p => (
                                    <button key={p.name} onClick={() => setSelected(x => x?.name === p.name ? null : p)}
                                        style={{ background: selected?.name === p.name ? 'var(--text-primary)' : 'var(--bg-primary)', border: `1px solid ${selected?.name === p.name ? 'var(--text-primary)' : 'var(--border)'}`, padding: '16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { if (selected?.name !== p.name) { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--bg-secondary)'; } }}
                                        onMouseLeave={e => { if (selected?.name !== p.name) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-primary)'; } }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                            <div>
                                                <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: selected?.name === p.name ? 'var(--bg-primary)' : 'var(--text-primary)', marginBottom: 2 }}>{p.name}</p>
                                                <p style={{ fontSize: '0.625rem', color: selected?.name === p.name ? 'var(--bg-secondary)' : 'var(--text-secondary)' }}>{p.title}</p>
                                                <p style={{ fontSize: '0.5625rem', color: selected?.name === p.name ? 'var(--bg-card)' : 'var(--text-muted)', marginTop: 2 }}>{p.org}</p>
                                            </div>
                                            {p.decisionMaker && (
                                                <span style={{ fontSize: '0.45rem', padding: '2px 6px', background: selected?.name === p.name ? 'var(--bg-card)' : 'var(--bg-card)', color: selected?.name === p.name ? 'var(--bg-primary)' : 'var(--text-primary)', letterSpacing: '0.08em', border: selected?.name === p.name ? '1px solid var(--bg-secondary)' : '1px solid var(--border)', borderRadius: 2 }}>DECISION MAKER</span>
                                            )}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                            {[
                                                { l: 'SENTIMENT', v: `${sentimentIcon(p.sentiment)} ${p.sentiment}` },
                                                { l: 'AUTHORITY', v: `${p.authority}/5` },
                                                { l: 'INFLUENCE', v: p.influence.toString() },
                                            ].map(m => (
                                                <div key={m.l}>
                                                    <p style={{ fontSize: '0.4rem', color: selected?.name === p.name ? 'var(--bg-card)' : 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 3 }}>{m.l}</p>
                                                    <p style={{ fontSize: '0.625rem', fontWeight: 600, color: m.l === 'SENTIMENT' ? (selected?.name === p.name ? '#86efac' : sentimentColor(p.sentiment)) : (selected?.name === p.name ? 'var(--bg-primary)' : 'var(--text-primary)') }}>{m.v}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Interaction history */}
                            <div style={{ marginTop: 24, border: '1px solid var(--border)' }}>
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Interaction Log</p>
                                </div>
                                {INTERACTION_HISTORY.map((ev, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', flexShrink: 0, paddingTop: 2 }}>{ev.date}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 500, marginBottom: 2 }}>{ev.contact} — {ev.type}</p>
                                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{ev.notes}</p>
                                        </div>
                                        <span style={{ fontSize: '0.5rem', padding: '2px 7px', background: 'var(--bg-card)', color: 'var(--text-secondary)', borderRadius: 2, flexShrink: 0 }}>{ev.outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right panel */}
                        <div>
                            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Influence Network</p>
                            <div style={{ border: '1px solid var(--border)', padding: 12, marginBottom: 16 }}>
                                <NetworkGraph nodes={NODES} edges={EDGES} accent="var(--text-primary)" size={268} monochromeMode />
                            </div>
                            <AnimatePresence mode="wait">
                                {selected ? (
                                    <motion.div key={selected.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        style={{ border: '1px solid var(--border)', padding: '16px' }}>
                                        <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 8, textTransform: 'uppercase' }}>Contact Detail</p>
                                        <p style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>{selected.name}</p>
                                        <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{selected.title} · {selected.org}</p>
                                        {[
                                            { label: 'Email', val: selected.email },
                                            { label: 'Last Engaged', val: selected.lastEngaged },
                                            { label: 'Decision Maker', val: selected.decisionMaker ? 'Yes' : 'No' },
                                        ].map(m => (
                                            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                                                <span style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{m.label}</span>
                                                <span style={{ fontSize: '0.5625rem', fontWeight: 500, color: 'var(--text-primary)' }}>{m.val}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div style={{ border: '1px solid var(--border)', padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.5625rem', letterSpacing: '0.08em' }}>
                                        SELECT A PRINCIPAL
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
