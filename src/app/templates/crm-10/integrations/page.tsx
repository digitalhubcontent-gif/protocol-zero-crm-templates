'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { SECURE_INTEGRATIONS } from '../data';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 8, padding: '20px 24px' };

function IntegrationsContent() {
    const [hoveredInt, setHoveredInt] = useState<string | null>(null);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Secure Infrastructure</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Security · Compliance platforms · Identity & access · Data protection</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {[
                        { label: 'Connected Services', value: '10', color: accent },
                        { label: 'Security Posture', value: 'A+', color: '#22c55e' },
                        { label: 'Last Security Scan', value: '4h ago', color: 'var(--text-muted)' },
                    ].map(m => (
                        <div key={m.label} style={{ ...card }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</div>
                        </div>
                    ))}
                </div>

                {SECURE_INTEGRATIONS.map(cat => (
                    <div key={cat.category} style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${accent}15` }}>
                            🔒 {cat.category}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                            {cat.items.map(int => {
                                const isHov = hoveredInt === `${cat.category}-${int.name}`;
                                return (
                                    <div key={int.name}
                                        onMouseEnter={() => setHoveredInt(`${cat.category}-${int.name}`)}
                                        onMouseLeave={() => setHoveredInt(null)}
                                        style={{
                                            ...card, transition: 'all 0.2s', cursor: 'pointer',
                                            borderColor: isHov ? `${accent}40` : 'rgba(16,185,129,0.08)',
                                            transform: isHov ? 'translateY(-2px)' : 'none',
                                        }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{int.name}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: int.status === 'connected' ? '#22c55e' : 'var(--text-muted)', display: 'inline-block' }} />
                                                <span style={{ fontSize: '0.5rem', color: int.status === 'connected' ? '#22c55e' : 'var(--text-muted)', fontWeight: 600 }}>
                                                    {int.status === 'connected' ? 'Connected' : 'Available'}
                                                </span>
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{int.desc}</p>
                                        {int.status === 'available' && (
                                            <button style={{ marginTop: 12, padding: '5px 12px', borderRadius: 4, fontSize: '0.5625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer' }}>Connect →</button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Integrations10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="integrations" accentColor={accent}>
            <IntegrationsContent />
        </CrmLayout>
    );
}
