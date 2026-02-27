import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_METRICS, AI_FEATURES, SAMPLE_CONTACTS } from '@/lib/data';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Column Authority — CRM 07',
    description: 'Lexicon-style editorial CRM with authoritative column structure.',
};

export default function Crm07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-07');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="landing" accentColor={accent}>
            {/* COLUMN AUTHORITY — newspaper-style multi-column editorial */}
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
                <div style={{ padding: '0 0', borderBottom: '3px solid var(--text-primary)' }}>
                    <div style={{ padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>PROTOCOL_ZERO · COLUMN AUTHORITY · CRM 07</p>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                            ARR: $18.4M · WIN RATE: 41.2% · PIPELINE: 3.8x
                        </div>
                    </div>
                </div>

                <div style={{ padding: '48px 48px' }}>
                    {/* Column grid — newspaper style */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1px 1fr 1px 1fr', gap: 0 }}>
                        {/* Column 1 — Lead story */}
                        <div style={{ paddingRight: 40 }}>
                            <div style={{ width: 40, height: 3, background: accent, marginBottom: 20 }} />
                            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 24 }}>
                                Revenue<br />Without<br />Guesswork<br />
                                <span style={{ color: accent }}>Decoded.</span>
                            </h1>
                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 32, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 32 }}>
                                Column Authority applies the discipline of investigative journalism to enterprise revenue data. Every metric is sourced, attributed, and contextualized. No dashboard noise. Only facts that move deals.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border-subtle)' }}>
                                {SAMPLE_METRICS.slice(0, 4).map((m) => (
                                    <div key={m.label} style={{ padding: 20, background: 'var(--bg-primary)' }}>
                                        <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{m.label}</p>
                                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>{m.value}</p>
                                        <p style={{ fontSize: '0.6875rem', color: 'var(--status-success)', marginTop: 2, fontWeight: 600 }}>{m.change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Divider */}
                        <div style={{ background: 'var(--border-subtle)', margin: '0 32px' }} />
                        {/* Column 2 */}
                        <div style={{ paddingRight: 32 }}>
                            <p style={{ fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>AI Intelligence</p>
                            {AI_FEATURES.slice(0, 3).map((f, i) => (
                                <div key={f.id} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: accent, marginBottom: 6 }}>0{i + 1} /</p>
                                    <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>{f.title}</p>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
                                </div>
                            ))}
                            <Link href="/templates/crm-07/features" style={{ fontSize: '0.8125rem', color: accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                All capabilities →
                            </Link>
                        </div>
                        {/* Divider */}
                        <div style={{ background: 'var(--border-subtle)', margin: '0 32px' }} />
                        {/* Column 3 */}
                        <div>
                            <p style={{ fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>Key Accounts</p>
                            {SAMPLE_CONTACTS.slice(0, 4).map((c, i) => (
                                <div key={c.id} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{c.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>{c.company} · {c.role}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: accent }}>{c.value}</span>
                                        <span style={{ fontSize: '0.6875rem', padding: '1px 6px', background: `${accent}15`, color: accent, borderRadius: 2 }}>{c.status}</span>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: 24 }}>
                                <Link href="/templates/crm-07/dashboard" className="btn btn-primary btn-full btn-sm" style={{ background: accent, borderRadius: 2 }}>Open Dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CrmLayout>
    );
}
