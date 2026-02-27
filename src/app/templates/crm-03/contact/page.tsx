'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { AUTHORIZED_REPS, INSTRUMENT_LEDGER } from '../data';
import { NetworkGraph, GraphNode, GraphEdge } from '@/components/charts/NetworkGraph';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const INFLUENCE_NODES: GraphNode[] = [
    { id: 'sch', label: 'S. Chen', role: 'C-Suite', size: 9 },
    { id: 'mwe', label: 'M. Webb', role: 'Finance', size: 7 },
    { id: 'lpa', label: 'L. Park', role: 'Legal', size: 6 },
    { id: 'jok', label: 'J. Okoye', role: 'Operations', size: 5 },
    { id: 'nal', label: 'N. Alvarez', role: 'Finance', size: 6 },
    { id: 'ext1', label: 'Alan T.', role: 'Champion', size: 8 },
    { id: 'ext2', label: 'James L.', role: 'Champion', size: 8 },
    { id: 'ext3', label: 'Priya S.', role: 'Neutral', size: 5 },
];

const INFLUENCE_EDGES: GraphEdge[] = [
    { from: 'sch', to: 'mwe', strength: 3 },
    { from: 'sch', to: 'lpa', strength: 2 },
    { from: 'nal', to: 'sch', strength: 2 },
    { from: 'mwe', to: 'jok', strength: 1 },
    { from: 'ext1', to: 'sch', strength: 3 },
    { from: 'ext2', to: 'mwe', strength: 2 },
    { from: 'ext2', to: 'nal', strength: 1 },
    { from: 'ext3', to: 'mwe', strength: 1 },
    { from: 'ext3', to: 'jok', strength: 1 },
    { from: 'lpa', to: 'ext1', strength: 1 },
];

const ratingColor = (r: string) => {
    if (['AAA', 'AA', 'A'].includes(r)) return '#10b981';
    if (r === 'BBB') return '#f59e0b';
    if (['BB', 'B'].includes(r)) return '#f97316';
    return '#ef4444';
};

export default function Crm03ContactPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [search, setSearch] = useState('');
    const [activeRep, setActiveRep] = useState<typeof AUTHORIZED_REPS[0] | null>(null);
    const filtered = INSTRUMENT_LEDGER.filter(c => c.counterparty.toLowerCase().includes(search.toLowerCase()));

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>COUNTERPARTY REGISTRY &nbsp;◆&nbsp; AUTHORIZED REPRESENTATIVES</span>
                </div>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

                        {/* Left column */}
                        <div>
                            {/* Authorized Reps */}
                            <div style={{ marginBottom: 20 }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>AUTHORIZED_REPRESENTATIVES :: INFLUENCE MAP</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                                    {AUTHORIZED_REPS.map(rep => (
                                        <motion.button key={rep.name} onClick={() => setActiveRep(r => r?.name === rep.name ? null : rep)}
                                            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                            style={{ background: activeRep?.name === rep.name ? am('10') : 'var(--bg-card)', border: `1px solid ${activeRep?.name === rep.name ? am('40') : am('12')}`, padding: '14px 16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'monospace', transition: 'border-color 0.15s' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                                <div>
                                                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{rep.name}</p>
                                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>{rep.title}</p>
                                                </div>
                                                {rep.champion && <span style={{ fontSize: '0.5rem', background: am('20'), border: `1px solid ${am('40')}`, color: 'var(--text-accent)', padding: '2px 6px', letterSpacing: '0.08em' }}>CHAMPION</span>}
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                                {[
                                                    { label: 'AUTHORITY', val: `${rep.authority}/5` },
                                                    { label: 'SENTIMENT', val: rep.sentiment },
                                                    { label: 'INFLUENCE', val: rep.influence.toFixed(1) },
                                                ].map(m => (
                                                    <div key={m.label}>
                                                        <p style={{ fontSize: '0.4rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 3 }}>{m.label}</p>
                                                        <p style={{ fontSize: '0.625rem', fontWeight: 600, color: m.label === 'SENTIMENT' ? (rep.sentiment === 'Positive' ? '#10b981' : rep.sentiment === 'Cautious' ? '#f97316' : accent) : accent }}>{m.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginTop: 8 }}>Last event: {rep.lastEvent}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Counterparty search */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>COUNTERPARTY_REGISTRY :: {INSTRUMENT_LEDGER.length} INSTRUMENTS</p>
                                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="SEARCH..."
                                        style={{ padding: '5px 10px', background: 'var(--bg-secondary)', border: `1px solid ${am('20')}`, color: 'var(--text-primary)', fontSize: '0.5625rem', letterSpacing: '0.08em', fontFamily: 'monospace', outline: 'none', width: 160 }} />
                                </div>
                                <div style={{ border: `1px solid ${am('12')}` }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: `1px solid ${am('10')}` }}>
                                                {['ID', 'COUNTERPARTY', 'ARR ($M)', 'RATING', 'REMAINING MO', 'RENEWAL %'].map(h => (
                                                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', fontWeight: 400 }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map(c => (
                                                <tr key={c.id} style={{ borderBottom: `1px solid ${am('06')}`, transition: 'background 0.1s', cursor: 'pointer' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = am('06')}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                    <td style={{ padding: '9px 12px', color: 'var(--text-accent)', fontSize: '0.5625rem' }}>{c.id}</td>
                                                    <td style={{ padding: '9px 12px', color: 'var(--text-primary)' }}>{c.counterparty}</td>
                                                    <td style={{ padding: '9px 12px', color: 'var(--text-accent)', fontWeight: 700 }}>${c.arr.toFixed(1)}</td>
                                                    <td style={{ padding: '9px 12px' }}><span style={{ color: ratingColor(c.rating), fontWeight: 700 }}>{c.rating}</span></td>
                                                    <td style={{ padding: '9px 12px', color: c.remaining < 6 ? '#ef4444' : 'var(--text-muted)' }}>{c.remaining}</td>
                                                    <td style={{ padding: '9px 12px' }}><span style={{ color: c.renewalProb < 60 ? '#ef4444' : '#10b981', fontWeight: c.renewalProb < 60 ? 700 : 400 }}>{c.renewalProb}%</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right column: influence network */}
                        <div>
                            <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 12 }}>PRINCIPAL_INFLUENCE_NETWORK</p>
                            <div style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: 12 }}>
                                <NetworkGraph nodes={INFLUENCE_NODES} edges={INFLUENCE_EDGES} accent={accent} size={280} />
                            </div>
                            {activeRep && (
                                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ background: 'var(--bg-card)', border: `1px solid ${am('30')}`, padding: '14px', marginTop: 12 }}>
                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 8 }}>REP INTELLIGENCE BRIEF</p>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{activeRep.name}</p>
                                    <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', marginBottom: 10 }}>{activeRep.title}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                        {[
                                            { label: 'AUTHORITY_LEVEL', val: `${activeRep.authority}/5` },
                                            { label: 'INFLUENCE_SCORE', val: activeRep.influence.toFixed(1) },
                                            { label: 'SENTIMENT_VECTOR', val: activeRep.sentiment.toUpperCase() },
                                            { label: 'LAST_EVENT', val: activeRep.lastEvent },
                                        ].map(m => (
                                            <div key={m.label}>
                                                <p style={{ fontSize: '0.4rem', color: 'var(--text-accent)', marginBottom: 3 }}>{m.label}</p>
                                                <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-accent)' }}>{m.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
