import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activity — AI Command Center CRM',
    description: 'AI-orchestrated revenue activity log and autonomous action history.',
};

const events = [
    { type: 'AI_ACTION', actor: 'SYSTEM', event: 'Auto-escalated Meridian Capital to VP: Champion risk detected — deal score dropped 18pts', ts: '3m ago', severity: 'CRITICAL' },
    { type: 'SIGNAL', actor: 'SYSTEM', event: 'High intent signal detected for Orion Global — pricing page visited 4x in 2 hours, score +22', ts: '11m ago', severity: 'HIGH' },
    { type: 'CALL', actor: 'S. Park', event: 'Discovery call with Sarah Kim (Vantage Analytics CEO) — 42min, expansion path identified', ts: '1h ago', severity: 'INFO' },
    { type: 'AI_ACTION', actor: 'SYSTEM', event: 'Created expansion deal for Sigma Cloud — NRR exceeded 120% for 2 consecutive quarters', ts: '2h ago', severity: 'HIGH' },
    { type: 'EMAIL', actor: 'K. Ross', event: 'Proposal sent to Fortis Data — 3-year contract terms, enterprise pricing attached', ts: '3h ago', severity: 'INFO' },
    { type: 'DEAL', actor: 'M. Bell', event: 'Nexogen AI advanced to Discovery stage — $180K ACV, strong ICP fit confirmed by AI', ts: '4h ago', severity: 'INFO' },
    { type: 'AI_ACTION', actor: 'SYSTEM', event: 'Stale deal alert: Atlas Finance — 21 days no activity, follow-up task auto-created', ts: '5h ago', severity: 'MEDIUM' },
    { type: 'SIGNAL', actor: 'SYSTEM', event: 'Competitor evaluation: Stratum Systems running Salesforce trial — intent score adjusted by model', ts: 'Yesterday', severity: 'HIGH' },
];

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
    AI_ACTION: { label: 'AI', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
    SIGNAL: { label: 'SIG', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    CALL: { label: 'CALL', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    EMAIL: { label: 'MAIL', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    DEAL: { label: 'DEAL', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
};

const severityColor: Record<string, string> = {
    CRITICAL: '#ef4444', HIGH: '#f59e0b', MEDIUM: '#3b82f6', INFO: '#64748b',
};

export default function Crm02Activity() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::ACTIVITY_LOG</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Event Log</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Autonomous AI actions + human activity · Real-time</p>
                </div>

                {/* Summary Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
                    {[
                        { key: 'AI_ACTIONS', label: 'AI Actions', value: '94', color: '#a78bfa' },
                        { key: 'SIGNALS_PROC', label: 'Signals', value: '2847', color: '#06b6d4' },
                        { key: 'CALLS_LOGGED', label: 'Calls', value: '48', color: '#10b981' },
                        { key: 'EMAILS_TRACKED', label: 'Emails', value: '312', color: '#3b82f6' },
                        { key: 'DEALS_MOVED', label: 'Deals Moved', value: '18', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 7, padding: '14px 16px', borderTop: `2px solid ${m.color}` }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: `${m.color}60`, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>{m.key}</span>
                            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: m.color, letterSpacing: '-0.02em', marginBottom: 2 }}>{m.value}</p>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Event Feed */}
                <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', borderBottom: `1px solid ${accent}12`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.08em' }}>EVENT_LOG::LIVE_FEED</span>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                    </div>
                    {events.map((e, i) => {
                        const tc = typeConfig[e.type];
                        const sc = severityColor[e.severity];
                        return (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 80px 1fr 80px', gap: 16, padding: '14px 20px', borderBottom: `1px solid ${accent}08`, alignItems: 'flex-start' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, color: tc.color, background: tc.bg, padding: '3px 6px', borderRadius: 3, textAlign: 'center' }}>{tc.label}</span>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: sc, background: `${sc}12`, padding: '3px 8px', borderRadius: 3, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{e.severity}</span>
                                <div>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 3 }}>{e.event}</p>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-accent)' }}>{e.actor}</span>
                                </div>
                                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'right' }}>{e.ts}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </CrmLayout>
    );
}
