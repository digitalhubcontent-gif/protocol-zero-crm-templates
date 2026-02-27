import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_METRICS, AI_FEATURES, SAMPLE_PIPELINE } from '@/lib/data';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Asymmetric Intelligence — CRM 06',
    description: 'Left-dominant asymmetric dashboard layout for sales analytics.',
};

export default function Crm06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-06');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="landing" accentColor={accent}>
            {/* ASYMMETRIC — large left column (70%), narrow right (30%) */}
            <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', minHeight: '100vh' }}>
                {/* Left — big hero */}
                <div style={{ padding: '80px 64px', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}>
                    <p style={{ fontSize: '0.6875rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 32 }}>
                        Template 06 · Asymmetric Intelligence
                    </p>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 40 }}>
                        Revenue<br />Intelligence<br />
                        <span style={{ color: accent }}>Unbalanced.</span><br />By Design.
                    </h1>
                    <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 520, marginBottom: 48 }}>
                        Asymmetric layouts force hierarchy. This template ensures your most critical revenue data occupies 70% of every screen — strategic prominence over visual balance.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border-subtle)', marginBottom: 48, border: '1px solid var(--border-subtle)' }}>
                        {SAMPLE_METRICS.slice(0, 3).map((m) => (
                            <div key={m.label} style={{ padding: '24px', background: 'var(--bg-primary)' }}>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 4 }}>{m.value}</p>
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</p>
                                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-success)', marginTop: 4 }}>{m.change}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        {AI_FEATURES.slice(0, 4).map((f) => (
                            <div key={f.id} className="glass-card card-pad-md" style={{ borderLeft: `3px solid ${accent}` }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</p>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — narrow stats strip */}
                <div style={{ background: 'var(--bg-secondary)', padding: '80px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="glass-card card-pad-md" style={{ borderColor: `${accent}30` }}>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Stage Breakdown</p>
                        {SAMPLE_PIPELINE.map((stage) => (
                            <div key={stage.name} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stage.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: accent, fontWeight: 600 }}>{stage.value}</span>
                                </div>
                                <div style={{ height: 2, background: 'var(--border-card)', borderRadius: 1 }}>
                                    <div style={{ width: `${stage.percentage}%`, height: '100%', background: accent }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {SAMPLE_METRICS.slice(3).map((m) => (
                        <div key={m.label} className="glass-card card-pad-md">
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{m.label}</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{m.value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 600, marginTop: 4 }}>{m.change}</p>
                        </div>
                    ))}
                    <div style={{ marginTop: 'auto' }}>
                        <Link href="/templates/crm-06/dashboard" className="btn btn-primary btn-full" style={{ background: accent }}>Open Dashboard</Link>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
