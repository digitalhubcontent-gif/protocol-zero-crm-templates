'use client';

import React from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';

const accent = '#f97316';
const bg = 'var(--bg-primary)';
const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid rgba(249,115,22,0.08)', borderRadius: 8, padding: '20px 24px', transition: 'all 0.25s cubic-bezier(.4,0,.2,1)' };
const lbl: React.CSSProperties = { fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 };

function ActivityContent() {
    return (
        <div style={{ background: bg, minHeight: '100vh' }}>
            <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>Operational Rhythm Tracker</h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 20px' }}>Weekly velocity · Operational cadence · Headcount utilization · Output rate</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
                    {[
                        { label: 'Ops Velocity', value: '18.2', sub: 'actions/producer/day', color: accent },
                        { label: 'Meeting Load', value: '4.8 hrs', sub: 'per producer weekly', color: '#3b82f6' },
                        { label: 'SLA Hit Rate', value: '94.2%', sub: 'within 2-hr target', color: '#22c55e' },
                        { label: 'Idle Capacity', value: '12%', sub: '4 producers below threshold', color: '#f59e0b' },
                    ].map(m => (
                        <div key={m.label} style={card}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}30`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                            <div style={{ fontSize: '0.45rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</div>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 2 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                        <div style={lbl}>Weekly Ops Velocity — 12 Weeks</div>
                        <svg width="100%" height="160" viewBox="0 0 300 160">
                            <rect x={30} y={20} width={260} height={40} fill={`${accent}06`} rx={2} />
                            <text x={24} y={38} fontSize={5} fill={`${accent}40`}>Target</text>
                            <polyline points="30,90 50,82 70,75 90,68 110,62 130,55 150,52 170,48 190,45 210,42 230,38 250,35 270,32" stroke={accent} strokeWidth={2} fill="none" />
                            <polyline points="30,110 50,105 70,98 90,95 110,92 130,88 150,85 170,82 190,80 210,78 230,75 250,72 270,70" stroke="#3b82f6" strokeWidth={1.5} fill="none" opacity={0.5} />
                            <text x={275} y={30} fontSize={6} fill={accent}>Action Rate</text>
                            <text x={275} y={68} fontSize={6} fill="#3b82f6">Output</text>
                        </svg>
                    </div>
                    <div style={card}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                        <div style={lbl}>Operational Cadence Heatmap</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5,1fr)', gap: 2 }}>
                            <div />
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                                <div key={d} style={{ fontSize: '0.45rem', color: 'var(--text-muted)', textAlign: 'center', padding: '2px 0' }}>{d}</div>
                            ))}
                            {['8am', '10am', '12pm', '2pm', '4pm', '6pm'].map(t => (
                                <React.Fragment key={t}>
                                    <div style={{ fontSize: '0.4375rem', color: 'var(--text-muted)', paddingRight: 4, textAlign: 'right' }}>{t}</div>
                                    {[0.3, 0.7, 0.9, 0.8, 0.5].map((v, i) => {
                                        const intensity = Math.random() * 0.4 + v * 0.6;
                                        return <div key={`${t}-${i}`} style={{ height: 16, borderRadius: 2, background: `rgba(249,115,22,${intensity * 0.3})`, transition: 'all 0.2s', cursor: 'pointer' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = `rgba(249,115,22,${intensity * 0.6})`; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `rgba(249,115,22,${intensity * 0.3})`; }} />;
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={card}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(249,115,22,0.08)'; }}>
                    <div style={lbl}>Producer Output Ranking</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                        {[
                            { name: 'Sarah Chen', score: 94, rank: 1 },
                            { name: 'Mike Ross', score: 91, rank: 2 },
                            { name: 'Lisa Park', score: 88, rank: 3 },
                            { name: 'James Wilson', score: 85, rank: 4 },
                            { name: 'Anna Kim', score: 82, rank: 5 },
                            { name: 'David Lee', score: 78, rank: 6 },
                            { name: 'Rachel Green', score: 74, rank: 7 },
                            { name: 'Tom Brown', score: 68, rank: 8 },
                            { name: 'Emily Davis', score: 62, rank: 9 },
                            { name: 'Chris Taylor', score: 55, rank: 10 },
                        ].map(p => (
                            <div key={p.name} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--bg-card)', borderRadius: 6, transition: 'all 0.2s', cursor: 'pointer', border: `1px solid ${p.score >= 80 ? '#22c55e12' : p.score >= 60 ? '#f59e0b12' : '#ef444412'}` }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}30`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = p.score >= 80 ? '#22c55e12' : p.score >= 60 ? '#f59e0b12' : '#ef444412'; }}>
                                <div style={{ fontSize: '0.4rem', color: '#374151', fontWeight: 700 }}>#{p.rank}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: p.score >= 80 ? '#22c55e' : p.score >= 60 ? '#f59e0b' : '#ef4444', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{p.score}</div>
                                <div style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginTop: 4 }}>{p.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Activity12Page() {
    const template = getTemplateBySlug('crm-12');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-12');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="activity" accentColor={accent}>
            <ActivityContent />
        </CrmLayout>
    );
}
