import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_METRICS, AI_FEATURES } from '@/lib/data';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Bold Oversized — CRM 08',
    description: 'Impact-first design with dramatic oversized typography for bold CRM positioning.',
};

export default function Crm08Page() {
    const template = getTemplateBySlug('crm-08');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-08');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="landing" accentColor={accent}>
            {/* BOLD OVERSIZED — massive display type, minimal copy, dramatic */}
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '80px 64px' }}>
                {/* Hero Section Container */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 80, flexWrap: 'wrap', gap: 40 }}>
                    {/* Left: Oversized headline */}
                    <div style={{ flex: '1 1 500px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: accent, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 40 }}>
                            CRM_08 / BOLD OVERSIZED
                        </p>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(4rem, 10vw, 9rem)',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.06em',
                            color: 'var(--text-primary)',
                            marginBottom: 0,
                        }}>
                            CLOSE<br />
                            MORE.<br />
                            <span style={{ color: accent, WebkitTextStroke: `2px ${accent}`, WebkitTextFillColor: 'transparent' }}>FAST.</span>
                        </h1>
                    </div>

                    {/* Right: Premium Aesthetic Graphic */}
                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', position: 'relative' }}>
                        {/* Glowing background blob */}
                        <div style={{ position: 'absolute', width: '300px', height: '300px', background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`, filter: 'blur(50px)', zIndex: 0 }} />

                        {/* Main premium card */}
                        <div className="glass-card" style={{ position: 'absolute', width: '280px', padding: '24px', zIndex: 2, transform: 'rotate(-4deg) translateX(-20px)', border: `1px solid ${accent}40`, boxShadow: `0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px ${accent}20 inset`, backdropFilter: 'blur(20px)', borderRadius: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}15`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, fontSize: '1.25rem', fontWeight: 800 }}>⚡</div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>velocity</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>+94.2%</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
                                {[30, 45, 20, 60, 80, 50, 90, 100, 70].map((v, i) => (
                                    <div key={i} style={{ flex: 1, height: `${v}%`, background: v >= 80 ? accent : 'var(--border-strong)', borderRadius: 3, transition: 'height 0.3s ease' }} />
                                ))}
                            </div>
                        </div>

                        {/* Secondary trailing card */}
                        <div className="glass-card" style={{ position: 'absolute', right: '10%', bottom: '15%', width: '220px', padding: '16px 20px', zIndex: 1, transform: 'rotate(6deg)', border: '1px solid var(--border-subtle)', boxShadow: '0 12px 32px rgba(0,0,0,0.08)', backdropFilter: 'blur(16px)', borderRadius: 12 }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.06em' }}>signal intent</div>
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 10px #16a34a' }} />
                                Strong Buy Detected
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thin horizontal rule */}
                <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}, var(--border-subtle) 60%, transparent)`, marginBottom: 64 }} />

                {/* Bold metric row */}
                <div style={{ display: 'flex', gap: 0, marginBottom: 80, borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                    {SAMPLE_METRICS.map((m, i) => (
                        <div key={m.label} style={{ flex: 1, padding: '40px 32px', borderRight: i < SAMPLE_METRICS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 8 }}>{m.value}</p>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Feature grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 64 }}>
                    {AI_FEATURES.map((f) => (
                        <div key={f.id} className="glass-card card-pad-lg" style={{ borderTop: `3px solid ${accent}` }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{f.title}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA — equally bold */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                        Ready to<br />outclose everyone?
                    </p>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <Link href="/templates/crm-08/dashboard" className="btn btn-lg" style={{ background: accent, color: '#fff', fontWeight: 800, fontSize: '1rem', padding: '16px 32px', boxShadow: `0 0 40px ${accent}40` }}>
                            Open Dashboard
                        </Link>
                        <Link href="/templates/crm-08/analytics" className="btn btn-secondary btn-lg" style={{ padding: '16px 32px' }}>
                            Analytics
                        </Link>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
