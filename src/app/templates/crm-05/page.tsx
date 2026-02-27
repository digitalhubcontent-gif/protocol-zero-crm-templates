import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SAMPLE_CONTACTS, SAMPLE_PIPELINE, SAMPLE_METRICS } from '@/lib/data';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Revenue Operations Suite — CRM 05',
    description: 'Kanban-centric pipeline management for high-velocity sales teams.',
};

export default function Crm05Page() {
    const template = getTemplateBySlug('crm-05');
    if (!template) return notFound();
    const { prev, next } = getAdjacentTemplates('crm-05');
    const accent = template.accentColor;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="landing" accentColor={accent}>
            {/* KANBAN HERO — pipeline cards as visual centerpiece */}
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
                <div style={{ padding: '64px 48px 48px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{ width: 3, height: 40, background: accent, borderRadius: 2 }} />
                                <div>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Revenue Operations Suite</p>
                                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
                                        Pipeline Command
                                    </h1>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 480, marginBottom: 24 }}>
                                Kanban-native workflow management with AI stage prediction. Every deal card contains behavioral signals, next-action recommendations, and close probability scores.
                            </p>
                            <Link href="/templates/crm-05/dashboard" className="btn btn-primary" style={{ background: accent }}>Open Pipeline Board</Link>
                        </div>
                        <div style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
                            {SAMPLE_METRICS.slice(0, 3).map((m) => (
                                <div key={m.label} className="glass-card card-pad-md" style={{ borderColor: `${accent}30`, textAlign: 'center', minWidth: 120 }}>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em' }}>{m.value}</p>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label.split(' ').slice(-1)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kanban Board */}
                <div style={{ padding: '32px 48px', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
                        {SAMPLE_PIPELINE.map((stage) => (
                            <div key={stage.name} style={{ width: 240, flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, opacity: stage.percentage / 100 }} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stage.name}</span>
                                    </div>
                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 100 }}>{stage.count}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {SAMPLE_CONTACTS.slice(0, Math.min(3, Math.ceil(stage.count / 30))).map((c, i) => (
                                        <div key={`${stage.name}-${i}`} className="glass-card card-pad-sm" style={{ borderLeft: `2px solid ${accent}${(30 + i * 15).toString(16)}` }}>
                                            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{c.name}</p>
                                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 8 }}>{c.company}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: accent }}>{c.value}</span>
                                                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{stage.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ height: 3, background: 'var(--border-card)', borderRadius: 2, marginTop: 4 }}>
                                        <div style={{ width: `${stage.percentage}%`, height: '100%', background: accent, borderRadius: 2 }} />
                                    </div>
                                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'right' }}>{stage.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation to internal pages */}
                <div style={{ padding: '0 48px 48px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {['dashboard', 'analytics', 'contact', 'pipeline', 'features'].map((page) => (
                        <Link key={page} href={`/templates/crm-05/${page}`} className="btn btn-secondary btn-sm" style={{ textTransform: 'capitalize' }}>
                            {page}
                        </Link>
                    ))}
                </div>
            </div>
        </CrmLayout>
    );
}
