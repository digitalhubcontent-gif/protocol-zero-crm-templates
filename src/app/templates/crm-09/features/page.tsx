'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#3b82f6';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: '24px 28px' };

const FEATURE_CATEGORIES = [
    {
        title: 'Revenue Governance Framework',
        desc: 'Multi-division portfolio management with board-grade oversight capabilities.',
        features: [
            'Multi-division portfolio management with independent P&L tracking',
            'Risk tier classification engine (Low / Medium / High / Critical)',
            'Enterprise pipeline coverage analysis with 3x-5x target tracking',
            'Governance phase tracking (Qualification → Commit → Closed)',
            'Board Revenue Register with real-time attainment metrics',
        ],
        icon: '🏛️',
    },
    {
        title: 'Strategic Forecasting Engine',
        desc: 'Confidence-weighted projections with 8-quarter historical accuracy tracking.',
        features: [
            'Confidence-weighted revenue projections with band analysis',
            '8-quarter forecast accuracy trend monitoring',
            'Commit / Upside / Pipeline classification with executive confidence scoring',
            'Multi-year ARR growth modeling (base + upside scenarios)',
            'Deviation alerts when committed forecast changes by >5%',
        ],
        icon: '📊',
    },
    {
        title: 'Executive Oversight Layer',
        desc: 'Board Mode views, executive summary exports, and governance status indicators.',
        features: [
            'Board Mode toggle — white background variant for projector/screen share',
            'Executive Summary PDF export (2-page deck: metrics + register)',
            'Governance Status Indicator with automated color-coding',
            'Risk Escalation Panel for CRO attention items',
            'Quarterly Revenue Bridge waterfall visualization',
        ],
        icon: '👔',
    },
    {
        title: 'Multi-Division Portfolio Management',
        desc: 'Regional performance mapping with large deal tracking and approval gates.',
        features: [
            'Geographic Performance Map with 5-region attainment visualization',
            'Large Deal Tracker for strategic revenue assets >$1M',
            'Multi-approval gate workflows (AE → Manager → VP → CRO)',
            'Contract duration distribution with multi-year ratio tracking',
            'Executive Relationship Network graph with influence scoring',
        ],
        icon: '🌐',
    },
];

function FeaturesContent() {
    const [expandedCat, setExpandedCat] = useState<number | null>(0);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Revenue Governance Platform
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-secondary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Built for the executive <span style={{ color: accent }}>who signs the forecast.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
                        Every feature designed for board-level clarity, multi-division governance, and forecast confidence.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {FEATURE_CATEGORIES.map((cat, i) => (
                        <div key={i}
                            style={{
                                ...card, cursor: 'pointer', transition: 'all 0.2s',
                                borderColor: expandedCat === i ? `${accent}40` : 'rgba(59,130,246,0.1)',
                            }}
                            onClick={() => setExpandedCat(expandedCat === i ? null : i)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>{cat.title}</div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cat.desc}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'transform 0.2s', transform: expandedCat === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                            </div>
                            {expandedCat === i && (
                                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(59,130,246,0.08)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {cat.features.map((f, fi) => (
                                            <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                                <span style={{ color: '#22c55e', fontSize: '0.625rem', flexShrink: 0, marginTop: 2 }}>✓</span>
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

export default function Features09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-09');
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
