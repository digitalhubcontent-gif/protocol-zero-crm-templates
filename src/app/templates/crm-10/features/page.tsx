'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 8, padding: '24px 28px' };

const FEATURE_CATEGORIES = [
    {
        title: 'Immutable Audit Trail',
        desc: 'Cryptographically signed, hash-chain verified audit logs for every revenue action.',
        features: [
            'Hash-chain integrity verification for tamper-proof audit history',
            'Cryptographic signatures on all deal phase transitions',
            'Real-time anomaly detection on audit trail integrity',
            'Complete actor, action, resource, timestamp logging',
            'Exportable evidence packages for external auditors',
        ],
        icon: '🔒',
    },
    {
        title: 'Multi-Framework Compliance Engine',
        desc: 'Continuous monitoring across SOC 2, ISO 27001, GDPR, HIPAA, and FedRAMP.',
        features: [
            'Automated compliance scoring across 5 regulatory frameworks',
            'Control-level status tracking (compliant / warning / breach)',
            'Framework coverage heatmap with gap analysis',
            'GDPR Data Subject Access Request (DSAR) automation',
            'FedRAMP High authorization support for government deals',
        ],
        icon: '🛡️',
    },
    {
        title: 'Compliance Gate Enforcement',
        desc: 'Deal phase advancement blocked until compliance requirements are met.',
        features: [
            'Automated compliance score calculation per deal',
            'Configurable minimum threshold (default: 80%)',
            'CCO/CISO review triggers for restricted/top-secret deals',
            'Security classification enforcement (Public → Top Secret)',
            'Jurisdiction-aware compliance checks for cross-border deals',
        ],
        icon: '🚧',
    },
    {
        title: 'Defense-Grade Security Architecture',
        desc: 'Zero-knowledge architecture, AES-256 encryption, and air-gapped deployment support.',
        features: [
            'AES-256 encryption for all data at rest and in transit',
            'Zero-knowledge architecture — we never see your revenue data',
            'Air-gapped / on-premise deployment for defense contractors',
            'Role-based access control with permission matrix',
            'Continuous vulnerability scanning with Snyk integration',
        ],
        icon: '🏗️',
    },
];

function FeaturesContent() {
    const [expandedCat, setExpandedCat] = useState<number | null>(0);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 20, background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                        Apex Compliance Platform
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
                        Every action <span style={{ color: accent }}>cryptographically verified.</span>
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
                        Defense-grade compliance built into every layer of revenue operations.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {FEATURE_CATEGORIES.map((cat, i) => (
                        <div key={i}
                            style={{
                                ...card, cursor: 'pointer', transition: 'all 0.2s',
                                borderColor: expandedCat === i ? `${accent}40` : 'rgba(16,185,129,0.08)',
                            }}
                            onClick={() => setExpandedCat(expandedCat === i ? null : i)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{cat.title}</div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cat.desc}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'transform 0.2s', transform: expandedCat === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                            </div>
                            {expandedCat === i && (
                                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(16,185,129,0.08)' }}>
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

export default function Features10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
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
