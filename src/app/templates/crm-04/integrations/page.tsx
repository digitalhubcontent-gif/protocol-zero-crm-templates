'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
    { name: 'Salesforce', cat: 'CRM', status: 'Connected', sync: '2 min ago', records: '14,821', icon: '⚡' },
    { name: 'HubSpot', cat: 'CRM', status: 'Connected', sync: '5 min ago', records: '8,432', icon: '🔶' },
    { name: 'Looker', cat: 'BI', status: 'Connected', sync: '15 min ago', records: '—', icon: '◈' },
    { name: 'Google Analytics', cat: 'Analytics', status: 'Connected', sync: '1 hr ago', records: '—', icon: '◎' },
    { name: 'Stripe', cat: 'Billing', status: 'Connected', sync: '10 min ago', records: '4,201', icon: '▷' },
    { name: 'Notion', cat: 'Docs', status: 'Connected', sync: '1 day ago', records: '—', icon: '□' },
    { name: 'Slack', cat: 'Comms', status: 'Setup', sync: '—', records: '—', icon: '◇' },
    { name: 'Supermetrics', cat: 'BI', status: 'Available', sync: '—', records: '—', icon: '△' },
    { name: 'Gong', cat: 'Sales', status: 'Available', sync: '—', records: '—', icon: '○' },
    { name: 'Outreach', cat: 'Sales', status: 'Available', sync: '—', records: '—', icon: '⊞' },
    { name: 'Crossbeam', cat: 'Partner', status: 'Available', sync: '—', records: '—', icon: '◈' },
    { name: 'CashbackPro', cat: 'Partner', status: 'Connected', sync: '8 min ago', records: '6,420', icon: '💰' },
    { name: 'PartnerStack', cat: 'Partner', status: 'Available', sync: '—', records: '—', icon: '◉' },
];

const CATS = ['All', 'CRM', 'BI', 'Billing', 'Sales', 'Partner', 'Analytics', 'Docs', 'Comms'];

const statusStyle = (s: string) => ({
    Connected: { dot: 'var(--status-success-text, #16a34a)', text: 'var(--status-success-text, #15803d)', bg: 'var(--status-success-bg, #f0fdf4)', border: 'var(--status-success-border, #bbf7d0)' },
    Setup: { dot: 'var(--status-warning-text, #d97706)', text: 'var(--status-warning-text, #92400e)', bg: 'var(--status-warning-bg, #fffbeb)', border: 'var(--status-warning-border, #fde68a)' },
    Available: { dot: 'var(--text-muted)', text: 'var(--text-secondary)', bg: 'var(--bg-secondary)', border: 'var(--border)' },
}[s] || { dot: 'var(--text-muted)', text: 'var(--text-secondary)', bg: 'var(--bg-secondary)', border: 'var(--border)' });

export default function Crm04IntegrationsPage() {
    const template = getTemplateBySlug('crm-04');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-04');
    const [cat, setCat] = useState('All');
    const filtered = cat === 'All' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.cat === cat);

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor="var(--text-primary)">
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}>
                <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 40px' }}>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Integrations &nbsp;/&nbsp; Connected Data Sources</span>
                </div>
                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '36px 40px' }}>
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 28 }}>
                        {[
                            { label: 'Connected', val: INTEGRATIONS.filter(i => i.status === 'Connected').length },
                            { label: 'Records Synced', val: '27.4K' },
                            { label: 'Applications Available', val: INTEGRATIONS.length },
                            { label: 'Last Full Sync', val: '2 min ago' },
                        ].map((m, i) => (
                            <div key={m.label} style={{ padding: '18px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</p>
                                <p style={{ fontSize: '1.375rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filter */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                        {CATS.map(c => (
                            <button key={c} onClick={() => setCat(c)}
                                style={{ padding: '4px 12px', border: `1px solid ${cat === c ? 'var(--text-primary)' : 'var(--border)'}`, background: cat === c ? 'var(--text-primary)' : 'transparent', color: cat === c ? 'var(--bg-primary)' : 'var(--text-secondary)', fontSize: '0.5rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Integration grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {filtered.map((int, i) => {
                            const ss = statusStyle(int.status);
                            return (
                                <motion.div key={int.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                    style={{ border: '1px solid var(--border)', padding: '18px', cursor: 'pointer', transition: 'all 0.15s', position: 'relative' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', borderRadius: 4 }}>
                                                {int.icon}
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{int.name}</p>
                                                <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 1 }}>{int.cat}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '0.45rem', padding: '2px 6px', background: ss.bg, color: ss.text, border: `1px solid ${ss.border}`, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: ss.dot }} />
                                            {int.status}
                                        </span>
                                    </div>
                                    {int.status === 'Connected' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <p style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: 2 }}>LAST SYNC</p>
                                                <p style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)' }}>{int.sync}</p>
                                            </div>
                                            {int.records !== '—' && (
                                                <div>
                                                    <p style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: 2 }}>RECORDS</p>
                                                    <p style={{ fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{int.records}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {int.status !== 'Connected' && (
                                        <button style={{ width: '100%', padding: '7px', border: '1px solid var(--border)', background: 'transparent', color: int.status === 'Setup' ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.5625rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', letterSpacing: '0.04em' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                                            {int.status === 'Setup' ? 'Complete Setup' : 'Connect'}
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
