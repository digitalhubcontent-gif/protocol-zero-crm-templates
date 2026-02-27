'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { OPS_REPORTS } from '../data';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: 8, padding: '24px 28px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };

function ReportsContent() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>Operational Reports</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Capacity · Efficiency · Territory · Mix · CAC · Ramp</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ padding: '7px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, background: accent, color: 'var(--text-primary)', border: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px ${accent}40`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}>
                            Export All (PDF)
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {OPS_REPORTS.map(r => {
                        const isSel = selected === r.id;
                        return (
                            <div key={r.id} onClick={() => setSelected(isSel ? null : r.id)}
                                style={{ ...card, cursor: 'pointer', borderColor: isSel ? `${accent}45` : 'rgba(249,115,22,0.08)', transform: isSel ? 'translateY(-4px)' : 'none', boxShadow: isSel ? '0 12px 32px rgba(0,0,0,0.3)' : 'none' }}
                                onMouseEnter={e => { if (!isSel) { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; } }}
                                onMouseLeave={e => { if (!isSel) { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; } }}>
                                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{r.icon}</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{r.name}</div>
                                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16, minHeight: 36 }}>{r.desc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{r.frequency}</span>
                                    <button style={{ padding: '4px 10px', borderRadius: 4, fontSize: '0.5625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}25`; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}15`; }}>
                                        Generate
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Reports12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
