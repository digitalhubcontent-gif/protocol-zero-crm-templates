'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { COMPLIANCE_REPORTS } from '../data';

const accent = '#10b981';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 8, padding: '24px 28px' };

function ReportsContent() {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Regulatory Reporting Suite</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Audit readiness · GDPR compliance · Revenue compliance · Access control audit</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ padding: '7px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, background: accent, color: 'var(--text-primary)', border: 'none' }}>Generate All</button>
                        <button style={{ padding: '7px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid rgba(16,185,129,0.1)' }}>Schedule</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {COMPLIANCE_REPORTS.map(report => {
                        const isSelected = selectedReport === report.id;
                        return (
                            <div key={report.id}
                                onClick={() => setSelectedReport(isSelected ? null : report.id)}
                                style={{
                                    ...card, cursor: 'pointer', transition: 'all 0.2s',
                                    borderColor: isSelected ? accent : 'rgba(16,185,129,0.08)',
                                    transform: isSelected ? 'translateY(-4px)' : 'none',
                                    boxShadow: isSelected ? `0 12px 32px rgba(16,185,129,0.1)` : 'none',
                                }}>
                                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{report.icon}</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{report.name}</div>
                                <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16, minHeight: 36 }}>{report.desc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>Frequency: {report.frequency}</span>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button style={{ padding: '4px 10px', borderRadius: 4, fontSize: '0.5625rem', fontWeight: 600, background: `${accent}15`, color: accent, border: 'none', cursor: 'pointer' }}>Generate</button>
                                        <button style={{ padding: '4px 10px', borderRadius: 4, fontSize: '0.5625rem', fontWeight: 600, background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>History</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedReport && (
                    <div style={{ marginTop: 24, ...card, borderColor: `${accent}30` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                Report Preview — {COMPLIANCE_REPORTS.find(r => r.id === selectedReport)?.name}
                            </div>
                            <button onClick={() => setSelectedReport(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
                        </div>
                        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', borderRadius: 6, border: '1px dashed rgba(16,185,129,0.15)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔒</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>Regulatory compliance report preview</div>
                                <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', marginBottom: 12 }}>All reports are cryptographically signed and tamper-proof</div>
                                <button style={{ padding: '8px 20px', borderRadius: 5, background: accent, color: 'var(--text-primary)', border: 'none', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }}>Generate Signed Report</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Reports10Page() {
    const template = getTemplateBySlug('crm-10');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-10');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="reports" accentColor={accent}>
            <ReportsContent />
        </CrmLayout>
    );
}
