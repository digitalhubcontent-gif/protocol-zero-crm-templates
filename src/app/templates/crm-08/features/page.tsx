'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#06b6d4';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const SIGNAL_FEATURES = [
    {
        id: 'sf1', icon: '📡', title: 'Multi-Source Signal Engine',
        tag: 'Core', tagColor: accent,
        summary: 'Aggregates 1st and 3rd-party intent signals from Bombora, G2, Segment, and your own product analytics.',
        points: [
            'Unified signal score across 4+ intelligence sources',
            '4.8M+ behavioral events processed per day',
            'Real-time sub-2-minute signal freshness',
            'Weighted composite intent index (0–100)',
        ],
    },
    {
        id: 'sf2', icon: '🏆', title: 'ICP Fit Scoring',
        tag: 'Unique', tagColor: '#f59e0b',
        summary: 'ML model scores incoming accounts against your ideal customer profile in real-time.',
        points: [
            'Trained on your historicial closed-won data',
            'Continuous model refresh as new wins occur',
            'ICP tier bucketing: High / Medium / Low',
            'Team and persona-level ICP analysis',
        ],
    },
    {
        id: 'sf3', icon: '⚡', title: 'Intent Surge Detection',
        tag: 'Differentiator', tagColor: '#22c55e',
        summary: 'Identifies anomalous spikes in account-level intent before your competitors see them.',
        points: [
            'Statistical surge threshold: +25% z-score',
            'Named surge events with context labels',
            'Surge → rep alert latency < 5 minutes',
            'Competitor mention surge detection',
        ],
    },
    {
        id: 'sf4', icon: '📉', title: 'Signal Decay Curves',
        tag: 'AI', tagColor: '#8b5cf6',
        summary: 'Every signal has a half-life. Our decay model tells you when to act before the window closes.',
        points: [
            '3 decay curve types: Intent, Web, Trial',
            'Half-life annotation at optimal action point',
            'Stale zone threshold (default: 20% signal strength)',
            'Decay alerts before accounts go cold',
        ],
    },
    {
        id: 'sf5', icon: '🚀', title: 'PLG Activation Intelligence',
        tag: 'PLG', tagColor: '#ec4899',
        summary: 'Maps product engagement events to buying signals, turning free users into revenue conversations.',
        points: [
            'Feature activation → intent correlation',
            'Team expansion detection (seat growth events)',
            'Trial-to-SQL conversion timing model',
            'PLG cohort activation retention grid',
        ],
    },
    {
        id: 'sf6', icon: '👥', title: 'Buying Group Coverage',
        tag: 'Data', tagColor: '#6b7280',
        summary: 'Visualizes engagement across every stakeholder in a buying group, with gap detection.',
        points: [
            'Role-based engagement heatmap per account',
            'Economic buyer identification',
            'Stakeholder domain mapping across CRM contacts',
            'Auto-detect new buying group members',
        ],
    },
];

function FeaturesContent() {
    const [active, setActive] = useState(SIGNAL_FEATURES[0]);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Product Capabilities
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        See the signal.<br />
                        <span style={{ color: accent }}>Before anyone else does.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
                        Real-time intent aggregation, decay engineering, and PLG qualification — all in one signal intelligence platform.
                    </p>
                </div>

                {/* Feature explorer */}
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 32 }}>
                    <div style={card}>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 12 }}>Signal Capabilities</div>
                        {SIGNAL_FEATURES.map(f => (
                            <button key={f.id} onClick={() => setActive(f)}
                                style={{
                                    width: '100%', padding: '10px 12px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', marginBottom: 4,
                                    background: active.id === f.id ? `${f.tagColor}18` : 'transparent',
                                    border: `1px solid ${active.id === f.id ? f.tagColor : 'transparent'}`,
                                    transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => { if (active.id !== f.id) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)'; }}
                                onMouseLeave={e => { if (active.id !== f.id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: '0.875rem' }}>{f.icon}</span>
                                    <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</span>
                                </div>
                                <div style={{ marginLeft: 26, marginTop: 2 }}>
                                    <span style={{ fontSize: '0.4rem', padding: '1px 5px', borderRadius: 3, fontWeight: 700, background: `${f.tagColor}20`, color: f.tagColor }}>{f.tag}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div style={{ ...card, background: `linear-gradient(135deg, var(--bg-card) 0%, ${active.tagColor}08 100%)`, transition: 'all 0.3s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: `${active.tagColor}20`, border: `1.5px solid ${active.tagColor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                                {active.icon}
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{active.title}</h2>
                                    <span style={{ fontSize: '0.45rem', padding: '2px 8px', borderRadius: 10, fontWeight: 700, background: `${active.tagColor}20`, color: active.tagColor, border: `1px solid ${active.tagColor}` }}>{active.tag}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{active.summary}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {active.points.map((p, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                    <span style={{ color: active.tagColor, fontWeight: 700, flexShrink: 0, fontSize: '0.75rem', marginTop: 1 }}>→</span>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Signal Intelligence vs Traditional comparison */}
                <div style={card}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Signal Intelligence vs. Traditional Intent Tools</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--border-card)', borderRadius: 6, overflow: 'hidden' }}>
                        {[
                            ['', 'Signal Intelligence', 'Point Intent Tool'],
                            ['Update frequency', '✓ Real-time (< 2 min)', '✗ Weekly/daily batch'],
                            ['PLG product signals', '✓ Native integration', '✗ Not tracked'],
                            ['Signal decay awareness', '✓ Decay curve per signal', '✗ Static score'],
                            ['Surge event detection', '✓ Z-score anomaly alerts', '✗ Threshold only'],
                            ['Buying group analysis', '✓ Full heatmap + gaps', '✗ Account-only scoring'],
                        ].map(([label, si, trad], i) => (
                            <React.Fragment key={i}>
                                {i === 0 ? (
                                    <>
                                        <div style={{ padding: '8px 16px', background: `${accent}15`, fontSize: '0.5rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{si}</div>
                                        <div style={{ padding: '8px 16px', background: 'var(--bg-elevated)', fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{trad}</div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ padding: '10px 16px', fontSize: '0.5625rem', color: '#22c55e', borderTop: '1px solid var(--border-subtle)', fontWeight: 500 }}>{si}</div>
                                        <div style={{ padding: '10px 16px', fontSize: '0.5625rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', fontStyle: 'italic' }}>{trad}</div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Features08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-08');
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
