'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: 8, padding: '24px 28px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

const FEATURES = [
    {
        title: 'Revenue Capacity Engine',
        desc: 'Know exactly how many producers you need, where they should sit, and what they should carry.',
        icon: '⚡',
        features: [
            'Capacity utilization gauge with green/amber/red zones',
            'Headcount vs revenue scatter with efficiency trend line',
            'Revenue Capacity Matrix with conditional formatting',
            'Scenario modeling sliders (headcount, territory, quota)',
            'Collapsible capacity planning sidebar panel',
        ],
    },
    {
        title: 'Ramp Intelligence Framework',
        desc: 'Track new hire time-to-productivity with cohort comparison and S-curve benchmarking.',
        icon: '🚀',
        features: [
            'Ramp timeline Gantt chart with status-coded bars',
            'S-curve productivity overlay with expected checkpoints',
            'Cohort ramp heatmap — % quota attained per hire quarter',
            'Producer productivity dots showing current vs expected',
            'Automated ramp milestone alerts and coaching triggers',
        ],
    },
    {
        title: 'Territory Coverage Analysis',
        desc: 'Multi-quarter coverage heatmap with rebalancing recommendations and gap detection.',
        icon: '🗺️',
        features: [
            'Territory × quarter coverage heatmap with color coding',
            'Red zone alerts for under-covered territories',
            'Pipeline coverage imbalance detection and alerting',
            'Territory rebalance automation workflow integration',
            'Headcount allocation scenario modeling per territory',
        ],
    },
    {
        title: 'Operational Cost Modeling',
        desc: 'CAC payback curves, headcount ROI, and revenue mix analysis.',
        icon: '💰',
        features: [
            'CAC payback curve with crossover annotation',
            'ARR per producer trend with optimal band overlay',
            'ARR bridge waterfall (New + Expansion - Contraction - Churn)',
            'NRR trend with 100% baseline and green zone',
            'Revenue mix stacked analysis (new vs expansion vs renewal)',
        ],
    },
];

function FeaturesContent() {
    const [expanded, setExpanded] = useState<number | null>(0);

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}12`, border: `1px solid ${accent}20`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Revenue Operations Platform
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif" }}>
                        The engine behind your <span style={{ color: accent }}>revenue machine.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
                        Built for RevOps leaders who think in headcount, capacity, and operational efficiency.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {FEATURES.map((cat, i) => (
                        <div key={i} style={{ ...card, cursor: 'pointer', borderColor: expanded === i ? `${accent}30` : 'rgba(249,115,22,0.08)' }}
                            onClick={() => setExpanded(expanded === i ? null : i)}
                            onMouseEnter={e => { if (expanded !== i) (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}18`; }}
                            onMouseLeave={e => { if (expanded !== i) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{cat.title}</div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cat.desc}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'transform 0.2s', transform: expanded === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                            </div>
                            {expanded === i && (
                                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${accent}12` }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {cat.features.map((f, fi) => (
                                            <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                                <span style={{ color: accent, fontSize: '0.625rem', flexShrink: 0, marginTop: 2 }}>✓</span>
                                                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Features12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
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
