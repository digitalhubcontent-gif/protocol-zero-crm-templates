'use client';

import React, { useState } from 'react';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { SentimentChart } from '@/components/charts/SentimentChart';
import { EmotionMatrix } from '@/components/charts/EmotionMatrix';
import {
    SHAP_FEATURES, BEHAVIORAL_COHORT, ENGAGEMENT_FUNNEL,
    SENTIMENT_DIST, EMOTION_MATRIX, SENTIMENT_TREND
} from '../data';

const accent = '#8b5cf6';

const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: '18px 20px',
};

const lbl: React.CSSProperties = {
    fontSize: '0.6875rem', fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12,
};

function AnalyticsContent() {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

    const heroMetrics = [
        { label: 'Model Accuracy', value: '91.2%', sub: 'Last 12-week cohort', color: accent },
        { label: 'Behavioral Drift Index', value: '0.04', sub: '0 = ideal • >0.10 = retrain', color: '#10b981' },
        { label: 'Engagement Velocity', value: '+8.3%/wk', sub: 'Rising vs prior period', color: '#06b6d4' },
    ];

    const maxShap = Math.max(...SHAP_FEATURES.map(f => Math.abs(f.contribution)));

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Behavioral Intelligence Lab
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                            Model accuracy · Sentiment distribution · Cohort engagement
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['7d', '30d', '90d'] as const).map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '6px 14px', borderRadius: 5, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                                background: period === p ? accent : 'transparent',
                                color: period === p ? '#fff' : 'var(--text-secondary)',
                                border: `1px solid ${period === p ? accent : 'var(--border-card)'}`,
                                transition: 'all 0.15s',
                            }}>{p}</button>
                        ))}
                    </div>
                </div>

                {/* Hero metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                    {heroMetrics.map(m => (
                        <div key={m.label} style={{ ...card, transition: 'all 0.2s', cursor: 'default' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}45`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-card)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{m.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: 6 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Row 1: Feature Importance + Cohort */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {/* SHAP Feature importance */}
                    <div style={card}>
                        <div style={lbl}>Behavioral Signal Feature Importance (SHAP)</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {SHAP_FEATURES.map(f => (
                                <div key={f.feature}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{f.feature}</span>
                                        <span style={{ fontSize: '0.6875rem', color: f.positive ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                                            {f.positive ? '+' : ''}{f.contribution.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div style={{ height: 6, background: 'var(--border-subtle)', borderRadius: 3, position: 'relative' }}>
                                        {f.positive ? (
                                            <div style={{
                                                position: 'absolute', left: '50%',
                                                width: `${Math.abs(f.contribution) / maxShap * 48}%`,
                                                height: '100%', background: '#10b981', borderRadius: '0 3px 3px 0',
                                            }} />
                                        ) : (
                                            <div style={{
                                                position: 'absolute',
                                                right: '50%',
                                                width: `${Math.abs(f.contribution) / maxShap * 48}%`,
                                                height: '100%', background: '#ef4444', borderRadius: '3px 0 0 3px',
                                            }} />
                                        )}
                                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--text-muted)', opacity: 0.3 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Behavioral cohort grid */}
                    <div style={card}>
                        <div style={lbl}>Behavioral Retention Cohort</div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 2 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'left' }}>Cohort</th>
                                        {BEHAVIORAL_COHORT.cols.map(c => (
                                            <th key={c} style={{ padding: '4px 6px', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>{c}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {BEHAVIORAL_COHORT.rows.map((row, ri) => (
                                        <tr key={row}>
                                            <td style={{ padding: '3px 6px', fontSize: '0.5625rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row}</td>
                                            {BEHAVIORAL_COHORT.cols.map((_, ci) => {
                                                const val = BEHAVIORAL_COHORT.values[ri][ci];
                                                if (val === null) return <td key={ci} style={{ padding: '3px 2px' }}><div style={{ height: 24, borderRadius: 3, background: 'var(--border-subtle)', opacity: 0.3 }} /></td>;
                                                const c = val >= 75 ? '#10b981' : val >= 55 ? '#f59e0b' : '#ef4444';
                                                return (
                                                    <td key={ci} style={{ padding: '3px 2px' }}>
                                                        <div style={{ height: 24, borderRadius: 3, background: `${c}${Math.round(val * 2).toString(16).padStart(2, '0')}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: val > 65 ? 'var(--bg-primary)' : 'var(--text-primary)' }}>{val}%</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Row 2: Funnel + Sentiment Distribution */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                        <div style={lbl}>Behavioral Conversion Funnel</div>
                        <FunnelChart stages={ENGAGEMENT_FUNNEL} accent={accent} />
                    </div>

                    <div style={card}>
                        <div style={lbl}>Sentiment Distribution Across Pipeline</div>
                        {(() => {
                            const maxCount = Math.max(...SENTIMENT_DIST.map(b => b.count));
                            const avg = SENTIMENT_DIST.reduce((s, b, i) => s + b.count * (i - 2) * 0.4, 0) / SENTIMENT_DIST.reduce((s, b) => s + b.count, 0);
                            return (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, marginBottom: 8 }}>
                                        {SENTIMENT_DIST.map(b => (
                                            <div key={b.bucket} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end', cursor: 'default', transition: 'opacity 0.15s' }}
                                                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.8'}
                                                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}>
                                                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>{b.count}</span>
                                                <div style={{ width: '100%', background: b.color, borderRadius: '3px 3px 0 0', height: `${b.count / maxCount * 100}%`, minHeight: 4, transition: 'all 0.3s' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                                        {SENTIMENT_DIST.map(b => (
                                            <span key={b.bucket} style={{ fontSize: '0.4rem', color: 'var(--text-muted)', textAlign: 'center', flex: 1 }}>{b.bucket}</span>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 8, fontSize: '0.5625rem', color: 'var(--text-muted)' }}>
                                        Pipeline avg sentiment: <span style={{ color: accent, fontWeight: 700 }}>+0.22</span> (Positive)
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>

                {/* Row 3: Emotion Matrix */}
                <div style={card}>
                    <div style={lbl}>Call Sentiment Matrix by Interaction Type</div>
                    <EmotionMatrix
                        rows={EMOTION_MATRIX.rows}
                        cols={EMOTION_MATRIX.cols}
                        data={EMOTION_MATRIX.data}
                        colorMap={EMOTION_MATRIX.colorMap}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Analytics07Page() {
    const template = getTemplateBySlug('crm-07');
    if (!template) return null;
    const { prev, next } = getAdjacentTemplates('crm-07');
    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage="analytics" accentColor={accent}>
            <AnalyticsContent />
        </CrmLayout>
    );
}
