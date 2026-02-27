'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { GaugeChart } from '@/components/charts/GaugeChart';

const accent = '#a78bfa';

const FEATURES = [
    {
        category: 'AI Confidence Engine',
        icon: '⚡',
        features: [
            { name: 'Multi-Factor Confidence Scoring', desc: 'Ensemble model blending behavioral, temporal, and engagement signals into a single deal confidence score.' },
            { name: 'Confidence Trend Analysis', desc: '12-week rolling comparison of predicted vs actual confidence scores. Model calibration alerts.' },
            { name: 'Intent Score Engine', desc: 'Real-time intent scoring per contact based on email open patterns, meeting acceptance, and document consumption.' },
            { name: 'Momentum Classifier', desc: 'AI classifies each deal as Accelerating, Holding, or Decelerating based on signal velocity changes.' },
        ],
    },
    {
        category: 'Behavioral Intelligence',
        icon: '◎',
        features: [
            { name: 'Contact Behavioral Profiling', desc: '5-axis radar profiles per contact: Engagement, Responsiveness, Technical Fit, Champion Score, Budget Signal.' },
            { name: 'Buyer Heatmap', desc: 'Day × Signal matrix showing peak engagement windows per activity type across the contact portfolio.' },
            { name: 'Signal Attribution Map', desc: 'Conversion rates at each deal stage by signal source — inbound, outbound, referral, event, and partner.' },
            { name: 'Competitor Mention Detection', desc: 'Gong call analysis flags competitor mentions automatically. Confidence impact applied immediately.' },
        ],
    },
    {
        category: 'Trigger Engine',
        icon: '●',
        features: [
            { name: 'Neural Trigger Builder', desc: 'Visual WHEN/THRESHOLD/THEN builder for creating AI-driven automation. Over 20 pre-built signal conditions.' },
            { name: 'Confidence Drop Alerting', desc: 'Instant alerts when deal confidence drops ≥ 10% in 48 hours. Auto-escalate to manager.' },
            { name: 'Intent Surge Fast-Track', desc: 'Deals with sudden ≥ 20pt intent surges are automatically moved to priority queue for rapid follow-up.' },
            { name: 'Behavioral Stall Detection', desc: '5-day signal absence triggers re-engagement workflow automatically. Reduces ghost deals by 67%.' },
        ],
    },
    {
        category: 'Neural Reports',
        icon: '≡',
        features: [
            { name: 'Model Performance Report', desc: 'Precision, recall, and calibration curves for the confidence model. Drift alerts included.' },
            { name: 'Close Rate Cohort Analysis', desc: 'Win rates segmented by signal profile, stage entry confidence, and momentum classification.' },
            { name: 'Signal Attribution Analysis', desc: 'Source × stage attribution for leads. Identifies the highest-signal path to revenue.' },
            { name: 'Behavioral Cohort Profiles', desc: 'Groups contacts by behavioral archetype. Fast-responders, deep-evaluators, ghosters, and more.' },
        ],
    },
];

const GAUGE_ZONES = [
    { min: 0, max: 40, color: '#f85149', label: 'Low' },
    { min: 40, max: 70, color: '#d29922', label: 'Mid' },
    { min: 70, max: 100, color: '#a78bfa', label: 'High' },
];

function FeaturesContent() {
    const [activeCategory, setActiveCategory] = useState(FEATURES[0].category);
    const active = FEATURES.find(f => f.category === activeCategory)!;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '48px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 48 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 3, height: 36, background: accent, borderRadius: 2 }} />
                            <div>
                                <div style={{ fontSize: '0.625rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Neural Analytics</div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>Built for AI-Driven Teams</h1>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 440, marginBottom: 24 }}>
                            Neural Analytics is the intelligence layer for revenue teams who use behavioral signals, confidence scoring, and AI-driven automation as their primary lens on every deal.
                        </p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {[
                                { k: 'Model Accuracy', v: '91.4%' },
                                { k: 'Signals Fired', v: '1,284/wk' },
                                { k: 'Win Rate Lift', v: '+31%' },
                            ].map(s => (
                                <div key={s.k} style={{ padding: '8px 14px', background: `${accent}10`, border: `1px solid ${accent}20`, borderRadius: 6 }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: accent }}>{s.v}</div>
                                    <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.k}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}25`, borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <div style={{ fontSize: '0.625rem', color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Portfolio Intent Score</div>
                        <GaugeChart value={78} zones={GAUGE_ZONES} subLabel="High Confidence Zone" size={200} accent={accent} />
                        <div style={{ display: 'flex', gap: 20, fontSize: '0.5rem', color: 'var(--text-muted)' }}>
                            {[{ l: 'Accelerating', v: '3' }, { l: 'Holding', v: '3' }, { l: 'Decelerating', v: '2' }].map(s => (
                                <div key={s.l} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: accent }}>{s.v}</div>
                                    <div>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 32px 48px', maxWidth: 1200, margin: '0 auto' }}>
                {/* Category tabs */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                    {FEATURES.map(f => (
                        <button key={f.category} onClick={() => setActiveCategory(f.category)} style={{
                            padding: '7px 16px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                            background: activeCategory === f.category ? accent : 'transparent',
                            color: activeCategory === f.category ? 'white' : 'var(--text-secondary)',
                            border: `1px solid ${activeCategory === f.category ? accent : 'var(--border-card)'}`,
                            transition: 'all 0.15s',
                        }}>
                            {f.icon} {f.category}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                    {active.features.map((feat, i) => (
                        <div key={feat.name} style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-card)',
                            borderTop: i < 2 ? `2px solid ${accent}` : `1px solid var(--border-card)`,
                            borderRadius: 8, padding: '18px 18px',
                            transition: 'all 0.2s', cursor: 'default',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}50`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = i < 2 ? accent : 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{feat.name}</div>
                                {i < 2 && <span style={{ fontSize: '0.4375rem', background: `${accent}15`, color: accent, padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>AI</span>}
                            </div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Features06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
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
