import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { REVENUE_BRIDGE, GEO_REGIONS, BOARD_REGISTER } from './data';

export const metadata: Metadata = {
    title: 'Sovereign Enterprise — CRM 09',
    description: 'Board-grade revenue governance for CROs, CEOs, and enterprise sales leadership.',
};

export default function Crm09Page() {
    const template = getTemplateBySlug('crm-09');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-09');
    const accent = template.accentColor;

    const heroMetrics = [
        { label: 'Quarterly Revenue Attainment', value: '103%', sub: 'vs Q2 target' },
        { label: 'Forecast Confidence Index', value: '89%', sub: '8-quarter historical' },
        { label: 'Net Revenue Retention', value: '112%', sub: 'Expansion-driven' },
    ];

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="landing" accentColor={accent}>
            {/* SOVEREIGN ENTERPRISE — Structured, board-grade, authoritative */}
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
                {/* Governance Status Bar */}
                <div style={{
                    background: 'rgba(34,197,94,0.06)', borderBottom: '1px solid rgba(34,197,94,0.15)',
                    padding: '10px 48px', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6875rem',
                    display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-muted)',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
                        <span style={{ color: '#22c55e', fontWeight: 700, letterSpacing: '0.06em' }}>GOVERNANCE STATUS: SOUND</span>
                    </span>
                    <span>Q2 2026</span>
                    <span>103% Attainment</span>
                    <span>Forecast Confidence: 89%</span>
                    <span style={{ color: '#f59e0b' }}>Risk Escalations: 2</span>
                </div>

                {/* Hero Section */}
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 40px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6875rem', color: accent, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 24 }}>
                            SOVEREIGN ENTERPRISE · REVENUE GOVERNANCE PLATFORM
                        </p>
                        <h1 style={{ fontFamily: 'var(--font-display, Inter)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                            Revenue Governance<br />
                            <span style={{ color: accent }}>Structurally Sound</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 540 }}>
                            Board-grade revenue intelligence with forecast accuracy tracking, multi-division portfolio management, and executive oversight — built for the C-suite.
                        </p>
                    </div>

                    {/* Hero Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
                        {heroMetrics.map(m => (
                            <div key={m.label} style={{
                                background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.12)',
                                borderRadius: 8, padding: '24px 28px',
                            }}>
                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 700 }}>{m.label}</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: accent, letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>{m.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Revenue Bridge Preview */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: 8, padding: '24px 28px', marginBottom: 48 }}>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                            Quarterly Revenue Bridge — Q2 2026
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
                            {REVENUE_BRIDGE.map((seg, i) => {
                                const maxVal = Math.max(...REVENUE_BRIDGE.map(s => Math.abs(s.value)));
                                const h = (Math.abs(seg.value) / maxVal) * 100;
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: seg.color }}>{seg.value > 0 ? `$${seg.value}M` : `-$${Math.abs(seg.value)}M`}</span>
                                        <div style={{ width: '100%', background: seg.color, borderRadius: '4px 4px 0 0', height: `${h}%`, minHeight: 6, opacity: 0.85 }} />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {REVENUE_BRIDGE.map(seg => (
                                <span key={seg.label} style={{ flex: 1, textAlign: 'center', fontSize: '0.5rem', color: 'var(--text-muted)' }}>{seg.label}</span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <Link href="/templates/crm-09/dashboard" style={{
                            background: accent, color: '#ffffff', fontWeight: 700, fontSize: '0.875rem',
                            padding: '14px 32px', borderRadius: 6, display: 'inline-block', letterSpacing: '-0.01em',
                        }}>
                            Enter Governance Dashboard
                        </Link>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Board Mode · PDF Exports · Multi-Division Portfolio
                        </span>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
