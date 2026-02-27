'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { INTEGRATIONS_03 } from '../data';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const CATS = ['All', 'ERP & Finance', 'BI & Analytics', 'Market Data', 'CRM Core', 'Identity'];

export default function Crm03IntegrationsPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [cat, setCat] = useState('All');
    const filtered = cat === 'All' ? INTEGRATIONS_03 : INTEGRATIONS_03.filter(i => i.cat === cat);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>DATA INFRASTRUCTURE &nbsp;◆&nbsp; PROTOCOL_ZERO INTEGRATION LAYER</span>
                </div>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                        {[
                            { label: 'LIVE_CONNECTIONS', val: '8', color: '#10b981' },
                            { label: 'PENDING_SETUP', val: '1', color: 'var(--text-accent)' },
                            { label: 'DAILY_RECORD_SYNCED', val: '1.2M', color: 'var(--text-secondary)' },
                            { label: 'COMPLIANCE_FRAMEWORKS', val: '3', color: 'var(--text-secondary)' },
                        ].map(m => (
                            <div key={m.label} style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px 16px' }}>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: m.color }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Category filters */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        {CATS.map(c => (
                            <button key={c} onClick={() => setCat(c)}
                                style={{ padding: '4px 12px', border: `1px solid ${cat === c ? am('40') : am('18')}`, background: cat === c ? am('14') : 'transparent', color: cat === c ? accent : am('40'), fontSize: '0.5rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}>
                                [{c.toUpperCase()}]
                            </button>
                        ))}
                    </div>

                    {/* Integrations grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {filtered.map((int, i) => (
                            <motion.div key={int.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                style={{ background: 'var(--bg-card)', border: `1px solid ${int.status === 'LIVE' ? am('14') : am('0a')}`, padding: '14px', cursor: 'pointer', transition: 'border-color 0.15s', position: 'relative' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = am('30')} onMouseLeave={e => e.currentTarget.style.borderColor = int.status === 'LIVE' ? am('14') : am('0a')}>
                                {/* Status dot */}
                                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <motion.div animate={int.status === 'LIVE' ? { opacity: [1, 0.3, 1] } : {}} transition={{ duration: 1.8, repeat: Infinity }}
                                        style={{ width: 6, height: 6, borderRadius: '50%', background: int.status === 'LIVE' ? '#10b981' : int.status === 'SETUP' ? accent : '#5a6048', boxShadow: int.status === 'LIVE' ? '0 0 6px #10b981' : 'none' }} />
                                    <span style={{ fontSize: '0.45rem', fontWeight: 700, color: int.status === 'LIVE' ? '#10b981' : accent, letterSpacing: '0.1em' }}>{int.status}</span>
                                </div>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 6 }}>{int.cat.toUpperCase()}</p>
                                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{int.name}</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                                    <div>
                                        <p style={{ fontSize: '0.4rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 3 }}>LAST_SYNC</p>
                                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{int.sync}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.4rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 3 }}>RECORDS</p>
                                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{int.records}</p>
                                    </div>
                                </div>
                                {int.compliance.length > 0 && (
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                        {int.compliance.map(c => (
                                            <span key={c} style={{ fontSize: '0.4rem', padding: '2px 5px', border: `1px solid ${am('20')}`, color: 'var(--text-accent)', letterSpacing: '0.08em' }}>{c}</span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Architecture info */}
                    <div style={{ marginTop: 20, background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '14px 16px' }}>
                        <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.12em', marginBottom: 10 }}>DATA_ARCHITECTURE :: PROTOCOL_ZERO INTEGRATION LAYER</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                            {[
                                { label: 'DATA LAYER', desc: 'Snowflake-native lakehouse with real-time streaming from ERP sources.' },
                                { label: 'ENCRYPTION', desc: 'AES-256 at rest, TLS 1.3 in transit. Zero-trust architecture.' },
                                { label: 'COMPLIANCE', desc: 'SOX, GDPR, PCI-DSS, SOC 2 Type II certified. Annual audits.' },
                                { label: 'SLA', desc: '99.97% uptime guarantee. Recovery time objective: < 4 hours.' },
                            ].map(a => (
                                <div key={a.label}>
                                    <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.1em', marginBottom: 5 }}>{a.label}</p>
                                    <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
