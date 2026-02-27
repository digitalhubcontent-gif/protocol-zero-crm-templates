'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { BEHAVIORAL_PROFILES } from '../data';

const accent = '#a78bfa';

const profileAxesLabels = ['Engagement', 'Responsiveness', 'Technical Fit', 'Champion Score', 'Budget Signal'];

function RadarMini({ axes }: { axes: number[] }) {
    const size = 80;
    const cx = size / 2, cy = size / 2;
    const r = 30;
    const n = axes.length;
    const points = axes.map((v, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const frac = v / 100;
        return { x: cx + r * frac * Math.cos(angle), y: cy + r * frac * Math.sin(angle) };
    });
    const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
    // Background web
    const bgPoints = Array.from({ length: n }, (_, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }).map(p => `${p.x},${p.y}`).join(' ');
    return (
        <svg width={size} height={size}>
            <polygon points={bgPoints} fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth={1} />
            <polygon points={polyline} fill={`rgba(167,139,250,0.2)`} stroke={accent} strokeWidth={1.5} />
        </svg>
    );
}

function ContactContent() {
    const [selected, setSelected] = useState(BEHAVIORAL_PROFILES[0]);
    const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

    const filtered = BEHAVIORAL_PROFILES.filter(p => {
        if (filter === 'High') return p.intentScore >= 75;
        if (filter === 'Medium') return p.intentScore >= 50 && p.intentScore < 75;
        if (filter === 'Low') return p.intentScore < 50;
        return true;
    });

    const intentColor = (s: number) => s >= 75 ? accent : s >= 50 ? '#d29922' : '#f85149';

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Behavioral Profile Engine</h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Intent scoring · Contact engagement · Signal attribution</p>
                </div>

                {/* Filter bar */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {(['All', 'High', 'Medium', 'Low'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '5px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600,
                            background: filter === f ? accent : 'transparent',
                            color: filter === f ? 'white' : 'var(--text-secondary)',
                            border: `1px solid ${filter === f ? accent : 'var(--border-card)'}`,
                            transition: 'all 0.15s',
                        }}>{f}</button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
                    {/* Profile cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, alignContent: 'start' }}>
                        {filtered.map(p => {
                            const color = intentColor(p.intentScore);
                            const isSelected = selected.name === p.name;
                            return (
                                <div key={p.name}
                                    onClick={() => setSelected(p)}
                                    style={{
                                        background: isSelected ? `${accent}08` : 'var(--bg-card)',
                                        border: `1px solid ${isSelected ? accent : 'var(--border-card)'}`,
                                        borderRadius: 8, padding: '14px 14px',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        transform: isSelected ? 'translateY(-2px)' : 'none',
                                    }}
                                    onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; } }}
                                    onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; } }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${color}20`, border: `1.5px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 800, color }}>
                                            {p.name.split(' ').map(s => s[0]).join('')}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color }}>{p.intentScore}</span>
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
                                    <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 8 }}>{p.org}</div>
                                    <div style={{ height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                        <div style={{ width: `${p.intentScore}%`, height: '100%', background: color, borderRadius: 2 }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                        <span style={{ fontSize: '0.4375rem', color: 'var(--text-muted)' }}>Last: {p.lastTouched}</span>
                                        <span style={{ fontSize: '0.4375rem', color: 'var(--text-muted)' }}>Resp: {p.responseTime}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Profile detail */}
                    <div style={{ background: 'var(--bg-card)', border: `1px solid ${accent}25`, borderRadius: 8, padding: '20px 18px' }}>
                        <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Neural Profile</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${intentColor(selected.intentScore)}20`, border: `2px solid ${intentColor(selected.intentScore)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: intentColor(selected.intentScore) }}>
                                {selected.name.split(' ').map(s => s[0]).join('')}
                            </div>
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selected.name}</div>
                                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{selected.org}</div>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: intentColor(selected.intentScore) }}>{selected.intentScore}</div>
                                <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Intent</div>
                            </div>
                        </div>

                        {/* Mini radar */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                            <RadarMini axes={selected.profileAxes} />
                        </div>

                        {/* Axes breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                            {profileAxesLabels.map((label, i) => {
                                const v = selected.profileAxes[i];
                                return (
                                    <div key={label}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{label}</span>
                                            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: accent }}>{v}%</span>
                                        </div>
                                        <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2 }}>
                                            <div style={{ width: `${v}%`, height: '100%', background: accent, borderRadius: 2, opacity: 0.7 + (v / 100) * 0.3 }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                            {[
                                { label: 'Meetings', value: selected.meetings },
                                { label: 'Email Opens', value: selected.emailOpens },
                                { label: 'Response Time', value: selected.responseTime, span: true },
                            ].map(s => (
                                <div key={s.label} style={{ background: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: 5, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: accent }}>{s.value}</div>
                                    <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <button style={{
                            width: '100%', padding: '9px 0',
                            background: accent, color: 'white', border: 'none',
                            borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700,
                            transition: 'opacity 0.15s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                            Generate Outreach Sequence
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Contact06Page() {
    const template = getTemplateBySlug('crm-06');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-06');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="contact" accentColor={accent}>
            <ContactContent />
        </CrmLayout>
    );
}
