'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#8b5cf6';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const AI_FEATURES = [
    {
        id: 'f1',
        icon: '🧠',
        title: 'Behavioral Scoring Engine',
        tag: 'Core',
        tagColor: accent,
        summary: 'Converts 12+ behavioral signals into a single, confidence-weighted intent score.',
        points: [
            'Intent intensity index (0–100) updated hourly',
            'SHAP feature explanations for every score',
            'Behavioral drift alerting when patterns shift',
            'Multi-signal blending: contact, account, channel',
        ],
    },
    {
        id: 'f2',
        icon: '💬',
        title: 'Emotional Sentiment AI',
        tag: 'Differentiator',
        tagColor: '#10b981',
        summary: 'NLP model that tracks emotional health of every buyer relationship over time.',
        points: [
            'Call + email + meeting transcript analysis',
            'Sentiment timeline (-1.0 to +1.0) per contact',
            'Emotion matrix: interaction type × emotional outcome',
            'Automated sentiment recovery playbooks',
        ],
    },
    {
        id: 'f3',
        icon: '🎯',
        title: 'Buying Committee Intelligence',
        tag: 'Unique',
        tagColor: '#f59e0b',
        summary: 'Maps and analyzes every committee member\'s role, authority, and psychological profile.',
        points: [
            'Auto-identifies economic buyers, champions, blockers',
            'Decision authority heatmap by deal phase',
            'Influence network graph (relationship strength)',
            'Committee coverage gaps with suggested actions',
        ],
    },
    {
        id: 'f4',
        icon: '📊',
        title: 'Predictive Outcome Layer',
        tag: 'AI',
        tagColor: '#06b6d4',
        summary: 'Projects quarterly revenue with 91.2% accuracy using multi-factor behavioral weighting.',
        points: [
            'Confidence-weighted pipeline projection',
            'AI vs. unweighted baseline comparison',
            'Risk-adjusted close probability per deal',
            'Engagement velocity trending with forecasts',
        ],
    },
    {
        id: 'f5',
        icon: '⚡',
        title: 'Behavioral Automation',
        tag: 'Automation',
        tagColor: '#ec4899',
        summary: 'Converts behavioral signals into real-time coaching actions and rep alerts.',
        points: [
            '5 built-in playbooks (sentiment, intent, committee, staleness, risk)',
            'Custom trigger builder with IF/AND/OR logic',
            'Rep nudges via Slack / email / CRM',
            'Avg 2-minute latency from signal to action',
        ],
    },
    {
        id: 'f6',
        icon: '🔌',
        title: 'Signal Aggregation Hub',
        tag: 'Data',
        tagColor: '#6b7280',
        summary: 'Unified data layer that combines 1st and 3rd party behavioral signals.',
        points: [
            'Gong + Chorus call intelligence bridge',
            'Bombora + G2 3rd-party intent overlay',
            'Salesforce + HubSpot bi-directional sync',
            '4.8M+ behavioral events processed daily',
        ],
    },
];

function FeaturesContent() {
    const [activeFeature, setActiveFeature] = useState(AI_FEATURES[0]);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Core Capabilities
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Intelligence that explains itself.
                        <br />
                        <span style={{ color: accent }}>No black boxes.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
                        Every score, every signal, every behavioral insight is transparent, explainable, and backed by real interaction data.
                    </p>
                </div>

                {/* Interactive feature explorer */}
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 32 }}>
                    {/* Feature nav */}
                    <div style={card}>
                        <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 12 }}>
                            AI Capabilities
                        </div>
                        {AI_FEATURES.map(f => (
                            <button key={f.id} onClick={() => setActiveFeature(f)}
                                style={{
                                    width: '100%', padding: '10px 12px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', marginBottom: 4,
                                    background: activeFeature.id === f.id ? `${f.tagColor}18` : 'transparent',
                                    border: `1px solid ${activeFeature.id === f.id ? f.tagColor : 'transparent'}`,
                                    transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => { if (activeFeature.id !== f.id) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)'; }}
                                onMouseLeave={e => { if (activeFeature.id !== f.id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: '0.875rem' }}>{f.icon}</span>
                                    <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</span>
                                </div>
                                <div style={{ marginLeft: 26, marginTop: 2 }}>
                                    <span style={{ fontSize: '0.4rem', padding: '1px 5px', borderRadius: 3, fontWeight: 700, background: `${f.tagColor}20`, color: f.tagColor }}>
                                        {f.tag}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Feature detail */}
                    <div style={{ ...card, background: `linear-gradient(135deg, var(--bg-card) 0%, ${activeFeature.tagColor}08 100%)`, transition: 'all 0.3s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: `${activeFeature.tagColor}20`, border: `1.5px solid ${activeFeature.tagColor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                                {activeFeature.icon}
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{activeFeature.title}</h2>
                                    <span style={{ fontSize: '0.45rem', padding: '2px 8px', borderRadius: 10, fontWeight: 700, background: `${activeFeature.tagColor}20`, color: activeFeature.tagColor, border: `1px solid ${activeFeature.tagColor}` }}>
                                        {activeFeature.tag}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{activeFeature.summary}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {activeFeature.points.map((p, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                                    <span style={{ color: activeFeature.tagColor, fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: '0.75rem' }}>→</span>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Score comparison: Behavioral vs Traditional */}
                <div style={card}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                        Behavioral Intelligence vs. Traditional CRM
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--border-card)', borderRadius: 6, overflow: 'hidden' }}>
                        {[
                            ['What you know', 'Behavioral Intelligence reads', 'Traditional CRM tracks'],
                            ['Buyer\'s true emotional state', '✓ Live sentiment score (-1 to +1)', '✗ Not tracked'],
                            ['Who has buying authority', '✓ Auto-detected & mapped', '✗ Manual notes only'],
                            ['Why a deal will be won/lost', '✓ SHAP feature explanations', '✗ Rep opinion'],
                            ['Intent signal freshness', '✓ Real-time (< 2 min delay)', '✗ Weekly manual update'],
                            ['Predictive outcome accuracy', '✓ 91.2% accuracy', '✗ Gut-based forecast'],
                        ].map(([label, ai, crm], i) => (
                            <React.Fragment key={i}>
                                {i === 0 ? (
                                    <>
                                        <div style={{ padding: '8px 16px', background: `${accent}15`, fontSize: '0.5rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ai}</div>
                                        <div style={{ padding: '8px 16px', background: 'var(--bg-elevated)', fontSize: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{crm}</div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ padding: '10px 16px', fontSize: '0.5625rem', color: '#10b981', borderTop: '1px solid var(--border-subtle)', fontWeight: 500 }}>{ai}</div>
                                        <div style={{ padding: '10px 16px', fontSize: '0.5625rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', fontStyle: 'italic' }}>{crm}</div>
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

export default function Features07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
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
