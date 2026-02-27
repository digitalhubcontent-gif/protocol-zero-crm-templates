'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const accent = 'var(--text-accent)';
const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;

const FEATURES = [
    {
        cat: 'Revenue Intelligence', items: [
            { name: 'Revenue Instrument Ledger', desc: 'Structured counterparty register with ARR, credit ratings, contract duration, and exposure scoring.' },
            { name: 'Bloomberg-Grade Candlestick Analysis', desc: 'Weekly projected earnings variance visualized as OHLC candlesticks with 4W/8W/12W windows.' },
            { name: 'ARR Waterfall Bridge', desc: 'Visual decomposition from Booked ARR to Projected Earnings across expansion, contraction, and attrition.' },
            { name: 'Cohort NRR Retention Heatmap', desc: 'Color-coded quartile cohort analysis for net revenue retention per quarterly cohort.' },
        ]
    },
    {
        cat: 'Risk & Scenario Analysis', items: [
            { name: '3-Scenario Stress Testing', desc: 'Toggle between Base, Conservative (–15%), and Aggressive (+20%) scenarios that update all metrics live.' },
            { name: 'Tornado Sensitivity Analysis', desc: 'Horizontal sensitivity chart showing top 5 revenue drivers and their downside/upside impact ranges.' },
            { name: 'Sector Risk Treemap', desc: 'Hierarchical treemap of revenue exposure by sector, heat-mapped by credit risk score.' },
            { name: 'Risk Probability Adjustment Slider', desc: 'Manually adjust deal probability weightings and see real-time impact on pipeline value.' },
        ]
    },
    {
        cat: 'Counterparty Management', items: [
            { name: 'Authorized Representative Registry', desc: 'Track decision-makers with authority tier, sentiment vector, influence score, and event history.' },
            { name: 'Principal Influence Network', desc: 'Circular graph visualization of stakeholder connections and relationship strengths.' },
            { name: 'Real-Time Engagement Event Stream', desc: 'Severity-filtered event feed covering renewals, escalations, expansions, and executive touches.' },
            { name: 'Currency Exposure Ticker', desc: 'Live FX pair tracking for USD/EUR, USD/GBP, USD/SGD, USD/JPY with micro-drift simulation.' },
        ]
    },
    {
        cat: 'Reporting & Compliance', items: [
            { name: 'Board-Level Attribution Reports', desc: 'One-click generation for investor data rooms, board packages, and regulatory submissions.' },
            { name: 'SOX & GDPR Compliance Layer', desc: 'Full audit trail, access controls, and data retention policies meeting SOX and GDPR requirements.' },
            { name: 'Earnings Report Template Library', desc: '8 pre-built report templates covering quarterly audits, monthly briefings, and credit sensitivity.' },
            { name: 'FX & Hedging Analysis Module', desc: 'Currency exposure breakdown by instrument with hedging coverage and impact simulation.' },
        ]
    },
];

export default function Crm03FeaturesPage() {
    const template = getTemplateBySlug('crm-03');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-03');
    const [activeCat, setActiveCat] = useState(FEATURES[0].cat);
    const displayed = FEATURES.find(f => f.cat === activeCat)?.items || [];

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="features" accentColor={accent}>
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                <div style={{ background: 'var(--bg-secondary)', borderBottom: `1px solid ${am('14')}`, padding: '10px 32px' }}>
                    <span style={{ fontSize: '0.5625rem', color: 'var(--text-accent)', letterSpacing: '0.1em' }}>PLATFORM FEATURES &nbsp;◆&nbsp; REVENUE INTELLIGENCE CAPABILITIES</span>
                </div>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px' }}>
                    <div style={{ marginBottom: 40, textAlign: 'center' }}>
                        <p style={{ fontSize: '0.5rem', color: 'var(--text-accent)', letterSpacing: '0.15em', marginBottom: 16 }}>CAPABILITY_INDEX</p>
                        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 12 }}>
                            Bloomberg-Grade Revenue Intelligence.<br />Purpose-Built for Financial Teams.
                        </h1>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
                            16 specialized capabilities built around the way finance-led revenue teams actually operate.
                        </p>
                    </div>

                    {/* Category tabs */}
                    <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${am('18')}`, marginBottom: 32 }}>
                        {FEATURES.map(f => (
                            <button key={f.cat} onClick={() => setActiveCat(f.cat)}
                                style={{ padding: '10px 20px', background: 'transparent', border: 'none', borderBottom: activeCat === f.cat ? `2px solid ${accent}` : '2px solid transparent', color: activeCat === f.cat ? accent : am('35'), fontSize: '0.5625rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace', transition: 'color 0.15s', whiteSpace: 'nowrap' }}>
                                {f.cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Feature grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
                        {displayed.map((item, i) => (
                            <motion.div key={item.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                style={{ background: 'var(--bg-card)', border: `1px solid ${am('12')}`, padding: '20px', cursor: 'default', transition: 'border-color 0.15s', position: 'relative', overflow: 'hidden' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = am('30')} onMouseLeave={e => e.currentTarget.style.borderColor = am('12')}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}50, transparent)` }} />
                                <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{item.name}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 3-col stat strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${am('18')}`, marginBottom: 32 }}>
                        {[
                            { label: 'TOTAL CAPABILITIES', val: '16' },
                            { label: 'COMPLIANCE FRAMEWORKS', val: '3' },
                            { label: 'MAX MANAGED ARR', val: 'Unlimited' },
                        ].map((m, i) => (
                            <div key={m.label} style={{ padding: '20px 24px', borderRight: i < 2 ? `1px solid ${am('12')}` : 'none', textAlign: 'center' }}>
                                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-accent)', letterSpacing: '-0.03em', marginBottom: 4 }}>{m.val}</p>
                                <p style={{ fontSize: '0.45rem', color: 'var(--text-accent)', letterSpacing: '0.12em' }}>{m.label}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/templates/crm-03/pricing"
                            style={{ padding: '12px 28px', background: accent, color: '#010409', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.08em', textDecoration: 'none', display: 'inline-block', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: `0 4px 20px ${am('40')}` }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${am('55')}`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 20px ${am('40')}`; }}>
                            VIEW INSTITUTIONAL TERM SHEET →
                        </Link>
                    </div>
                </div>

                {/* Custom Development Banner */}
                <div style={{ marginTop: 64, padding: '32px 40px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Need a custom CRM or SaaS platform?</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hire the creator of PROTOCOL_ZERO to build your custom software.</p>
                    </div>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D'm%20impressed%20with%20the%20quality%20of%20your%20work.%0A%0AI'm%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none' }}>
                        Contact Developer →
                    </a>
                </div>

            </div>
        </CrmLayout>
    );
}
