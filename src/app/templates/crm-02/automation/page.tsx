import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Automation — AI Command Center CRM',
    description: 'Autonomous AI orchestration and no-code revenue workflow engine.',
};

const workflows = [
    {
        key: 'WF_001',
        name: 'Deal Score Cascade',
        type: 'AI_AUTONOMOUS',
        desc: 'Every signal event triggers model re-scoring for affected deal. Score changes > 10pts dispatch rep alert.',
        runs_today: 84,
        success_rate: 99.8,
        status: 'RUNNING',
    },
    {
        key: 'WF_002',
        name: 'Champion Risk Protocol',
        type: 'AI_AUTONOMOUS',
        desc: 'Detects contact change patterns indicating champion departure. Escalates to VP within 15 minutes.',
        runs_today: 3,
        success_rate: 100,
        status: 'RUNNING',
    },
    {
        key: 'WF_003',
        name: 'Intent Surge Responder',
        type: 'AI_HYBRID',
        desc: 'When web intent signals spike >3x baseline, AI composes personalized outreach and queues for rep review.',
        runs_today: 12,
        success_rate: 97.1,
        status: 'RUNNING',
    },
    {
        key: 'WF_004',
        name: 'Expansion Opportunity Creator',
        type: 'AI_AUTONOMOUS',
        desc: 'Monitors NRR and engagement scores. Automatically creates expansion deal in pipeline when conditions met.',
        runs_today: 4,
        success_rate: 100,
        status: 'RUNNING',
    },
    {
        key: 'WF_005',
        name: 'Stale Deal Alert',
        type: 'RULE_BASED',
        desc: 'No signal detected in 14 days → rep notification + auto-created follow-up task + score penalty applied.',
        runs_today: 22,
        success_rate: 100,
        status: 'RUNNING',
    },
    {
        key: 'WF_006',
        name: 'Forecast Commit Lock',
        type: 'RULE_BASED',
        desc: 'Prevents stage advance on deals missing AI score threshold. Gate enforced for deals > $200K.',
        runs_today: 7,
        success_rate: 100,
        status: 'PAUSED',
    },
];

const typeColors: Record<string, { color: string; bg: string }> = {
    AI_AUTONOMOUS: { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
    AI_HYBRID: { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    RULE_BASED: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
};

export default function Crm02Automation() {
    const template = getTemplateBySlug('crm-02');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-02');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="automation" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - 104px)', padding: '28px 32px' }}>

                <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>MODULE::ORCHESTRATION_ENGINE</span>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Automation</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>AI Autonomous + Hybrid + Rule-based workflows · 5 running · 1 paused</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { key: 'RUNS_TODAY', value: '132', label: 'Workflow executions today' },
                        { key: 'AI_AUTONOMOUS', value: '3', label: 'Fully autonomous workflows' },
                        { key: 'SUCCESS_RATE', value: '99.2%', label: 'Cross-workflow success rate' },
                        { key: 'TIME_SAVED', value: '14h', label: 'Rep hours saved today' },
                    ].map(m => (
                        <div key={m.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>{m.key}</span>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.label}</p>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {workflows.map(w => {
                        const tc = typeColors[w.type];
                        return (
                            <div key={w.key} style={{ background: 'var(--bg-card)', border: `1px solid ${accent}18`, borderRadius: 8, padding: '18px 22px', display: 'flex', gap: 20, alignItems: 'flex-start', borderLeft: `2px solid ${tc.color}` }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', marginRight: 4 }}>{w.key}</span>
                                        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{w.name}</p>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 8px', borderRadius: 3, background: tc.bg, color: tc.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{w.type}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{w.desc}</p>
                                </div>
                                <div style={{ flexShrink: 0, textAlign: 'right', minWidth: 140 }}>
                                    <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginBottom: 10 }}>
                                        <div>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', display: 'block', marginBottom: 2 }}>RUNS_TODAY</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-accent)' }}>{w.runs_today}</span>
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-accent)', display: 'block', marginBottom: 2 }}>SUCCESS</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>{w.success_rate}%</span>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 10px', borderRadius: 3, background: w.status === 'RUNNING' ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)', color: w.status === 'RUNNING' ? '#10b981' : '#64748b', fontFamily: 'var(--font-mono)' }}>{w.status}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </CrmLayout>
    );
}
