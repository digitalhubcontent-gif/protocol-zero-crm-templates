'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import Link from 'next/link';
import { GaugeChart } from '@/components/charts/GaugeChart';

const accent = '#58a6ff';

const FEATURES = [
    {
        category: 'Pipeline Engine',
        icon: '⬡',
        features: [
            { name: 'Kanban Execution Grid', desc: '6-gate Kanban board with color-coded SLA status, WIP limits, and bottleneck detection.' },
            { name: 'WIP Limit Enforcement', desc: 'Per-column WIP limits with visual gauge. Columns flash red when at capacity.' },
            { name: 'Stage Velocity Tracking', desc: 'Avg dwell time per gate vs SLA threshold. Breach alerts auto-escalate.' },
            { name: 'Cumulative Flow Diagram', desc: 'Stacked area chart showing band widening (bottleneck) and pipeline depth over time.' },
        ],
    },
    {
        category: 'Analytics & Intelligence',
        icon: '⚡',
        features: [
            { name: 'Conversion Funnel Analysis', desc: 'Stage-by-stage drop-off with biggest drop highlighted and heat scoring.' },
            { name: 'Source Attribution Heatmap', desc: 'Conversion rates by signal source × pipeline stage for route optimization.' },
            { name: 'Flow Efficiency Index', desc: 'Gauge-based metric tracking overall pipeline throughput speed vs target.' },
            { name: 'Execution Log', desc: 'Tabbed activity feed — calls, emails, meetings, tasks with outcome coding.' },
        ],
    },
    {
        category: 'Automation & Rules',
        icon: '●',
        features: [
            { name: 'Visual Rule Builder', desc: 'WHEN / AND / THEN condition builder. Create SLA triggers, escalation paths, and nudge rules.' },
            { name: 'SLA Breach Auto-Escalation', desc: 'Deals exceeding dwell thresholds auto-alert team leads and slip into blocker view.' },
            { name: 'Clear Blockers Panel', desc: 'Dashboard widget surfacing the highest-risk stalled deals with direct action buttons.' },
            { name: 'Flow Owner Scorecards', desc: 'Per-rep efficiency, SLA compliance, and deal volume metrics on the dashboard.' },
        ],
    },
    {
        category: 'Integrations',
        icon: '◎',
        features: [
            { name: 'Dialer & Sequencer Sync', desc: 'Two-way sync with Gong, Salesloft, Outreach, and Apollo for call + sequence data.' },
            { name: 'CRM Bi-Directional Sync', desc: 'Stage changes in Pipeline Command push back to Salesforce and HubSpot in real time.' },
            { name: 'Calendar Intelligence', desc: 'Meeting outcomes from Google Calendar / Outlook automatically advance stage gates.' },
            { name: 'Open API', desc: 'Webhook + REST API for custom integrations with data warehouses and BI tools.' },
        ],
    },
];

const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#f85149', label: 'Critical' },
    { min: 40, max: 70, color: '#d29922', label: 'Moderate' },
    { min: 70, max: 100, color: '#3fb950', label: 'Optimal' },
];

function FeaturesContent() {
    const [activeCategory, setActiveCategory] = useState('Pipeline Engine');
    const active = FEATURES.find(f => f.category === activeCategory)!;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Hero */}
            <div style={{ padding: '48px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 48 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 3, height: 36, background: accent, borderRadius: 2 }} />
                            <div>
                                <div style={{ fontSize: '0.625rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Pipeline Command</div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>Built for Flow Velocity</h1>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 440, marginBottom: 24 }}>
                            Pipeline Command is the execution layer for SDR and AE teams who care deeply about deal flow velocity. Every feature is designed around time-in-stage, SLA enforcement, and bottleneck elimination.
                        </p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link href="/templates/crm-05/pricing" style={{
                                padding: '10px 22px', background: accent, color: 'var(--bg-primary)',
                                borderRadius: 6, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800,
                                transition: 'opacity 0.15s',
                            }}>Get Started</Link>
                            <Link href="/templates/crm-05/dashboard" style={{
                                padding: '10px 22px', background: `${accent}12`, color: accent,
                                border: `1px solid ${accent}30`, borderRadius: 6, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700,
                                transition: 'all 0.15s',
                            }}>View Dashboard</Link>
                        </div>
                    </div>
                    {/* Gauge showcase */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: 'var(--bg-card)', border: `1px solid ${accent}25`, borderRadius: 12, padding: '28px 24px' }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Flow Efficiency Index</div>
                        <GaugeChart value={74} zones={GAUGE_ZONES} subLabel="Pipeline is Optimal" size={200} accent={accent} />
                        <div style={{ display: 'flex', gap: 16, fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                            {[
                                { label: 'Conversions Today', v: '14' },
                                { label: 'SLA Compliance', v: '87%' },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: accent }}>{s.v}</div>
                                    <div style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature tabs + grid */}
            <div style={{ padding: '0 32px 48px', maxWidth: 1200, margin: '0 auto' }}>
                {/* Tab pills */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                    {FEATURES.map(f => (
                        <button key={f.category} onClick={() => setActiveCategory(f.category)} style={{
                            padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                            background: activeCategory === f.category ? accent : 'transparent',
                            color: activeCategory === f.category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                            border: `1px solid ${activeCategory === f.category ? accent : 'var(--border-card)'}`,
                            transition: 'all 0.15s',
                        }}>
                            {f.icon} {f.category}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                    {active.features.map((feat, i) => (
                        <div key={feat.name} style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                            borderTop: i < 2 ? `2px solid ${accent}` : `1px solid var(--border-card)`,
                            borderRadius: 8, padding: '18px 18px',
                            transition: 'all 0.2s', cursor: 'default',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}50`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = i < 2 ? accent : 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{feat.name}</div>
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Social proof bar */}
                <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {[
                        { stat: '38%', label: 'faster deal progression' },
                        { stat: '91%', label: 'SLA hit rate with rules' },
                        { stat: '4.8×', label: 'pipeline visibility lift' },
                        { stat: '22%', label: 'win rate improvement' },
                    ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center', padding: '14px 10px', background: 'var(--bg-card)', border: `1px solid ${accent}15`, borderRadius: 8 }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: accent, letterSpacing: '-0.03em' }}>{s.stat}</div>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Features05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-05');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="features" accentColor={accent}>
            <FeaturesContent />
        
            {/* Custom Development Banner */}
            <div style={{ margin: '64px auto 0', maxWidth: 1200, padding: '32px 40px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Need a custom CRM or SaaS platform?</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hire the creator of PROTOCOL_ZERO to build your custom software.</p>
                </div>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D'm%20impressed%20with%20the%20quality%20of%20your%20work.%0A%0AI'm%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none' }}>
                    Contact Developer →
                </a>
            </div>

        </CrmLayout>
    );
}
