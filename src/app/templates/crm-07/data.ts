/**
 * CRM-07 — Behavioral Intelligence
 * Data file: All chart datasets for behavioral/sentiment analytics pages.
 */

// ─── DASHBOARD DATA ──────────────────────────────────────────────────────────

export const ACCOUNTS = [
    'Acme Corp', 'Globex Inc', 'Initech', 'Umbrella Ltd', 'Soylent Systems',
    'Prestige Worldwide', 'Dunder Mifflin', 'Vandelay Ind', 'Sterling Cooper', 'Pied Piper',
    'Hooli Corp', 'Gringotts', 'Bluth Company', 'Stark Industries', 'Waystar Royco',
];

// 15 accounts × 30 days of intent score data (0–100)
export const BEHAVIORAL_HEATMAP: { account: string; days: number[] }[] = ACCOUNTS.map((account, ai) => ({
    account,
    days: Array.from({ length: 30 }, (_, di) => {
        const base = 30 + ai * 3;
        const noise = Math.sin(ai * 1.7 + di * 0.4) * 20 + Math.cos(di * 0.3 + ai) * 15;
        return Math.min(100, Math.max(0, Math.round(base + noise)));
    }),
}));

// 90-day sentiment trend (-1.0 to +1.0)
export const SENTIMENT_TREND: { date: string; value: number; event?: string }[] = Array.from({ length: 90 }, (_, i) => {
    const base = 0.15;
    const oscillation = Math.sin(i * 0.12) * 0.3 + Math.cos(i * 0.07) * 0.2;
    const noise = (Math.random() - 0.5) * 0.15;
    const value = Math.max(-1, Math.min(1, +(base + oscillation + noise).toFixed(2)));
    const date = new Date(2025, 9, 1 + i).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const event = i === 12 ? 'Major Demo' : i === 31 ? 'Negotiation' : i === 58 ? 'Executive Briefing' : i === 75 ? 'Contract Review' : undefined;
    return { date, value, event };
});

// Buying committee radar (5 axes, 3 deals)
export const COMMITTEE_RADAR = {
    axes: ['Economic Authority', 'Technical Validation', 'Engagement Depth', 'User Champion', 'Exec Sponsor'],
    deals: [
        { label: 'Acme Corp', color: '#8b5cf6', values: [82, 75, 91, 68, 55] },
        { label: 'Globex Inc', color: '#06b6d4', values: [45, 88, 62, 95, 30] },
        { label: 'Initech', color: '#10b981', values: [71, 55, 78, 40, 85] },
    ],
};

// Confidence-weighted revenue (6 months, 2 series)
export const REVENUE_PROJECTION: { month: string; value: number }[][] = [
    // AI confidence-weighted (conservative)
    [
        { month: 'Jan', value: 18.2 }, { month: 'Feb', value: 21.5 },
        { month: 'Mar', value: 24.8 }, { month: 'Apr', value: 28.1 },
        { month: 'May', value: 31.4 }, { month: 'Jun', value: 35.2 },
    ],
    // Unweighted pipeline (optimistic)
    [
        { month: 'Jan', value: 24.5 }, { month: 'Feb', value: 29.3 },
        { month: 'Mar', value: 34.1 }, { month: 'Apr', value: 39.8 },
        { month: 'May', value: 45.2 }, { month: 'Jun', value: 52.1 },
    ],
];

// Buyer Intelligence Matrix
export const BUYER_MATRIX = [
    { account: 'Acme Corp', intent: 89, sentiment: 0.42, risk: 12, engagement: 9.2, action: 'Accelerate close', confidence: 87, intentDelta: 14 },
    { account: 'Globex Inc', intent: 74, sentiment: 0.18, risk: 28, engagement: 7.1, action: 'Schedule exec touch', confidence: 71, intentDelta: 8 },
    { account: 'Initech', intent: 61, sentiment: -0.24, risk: 52, engagement: 5.8, action: 'Sentiment recovery', confidence: 55, intentDelta: -5 },
    { account: 'Umbrella Ltd', intent: 93, sentiment: 0.61, risk: 8, engagement: 9.8, action: 'Close priority', confidence: 91, intentDelta: 22 },
    { account: 'Soylent Systems', intent: 48, sentiment: 0.05, risk: 35, engagement: 4.2, action: 'Re-qualification needed', confidence: 43, intentDelta: 2 },
    { account: 'Prestige WW', intent: 82, sentiment: 0.38, risk: 19, engagement: 8.4, action: 'Expand committee', confidence: 78, intentDelta: 11 },
    { account: 'Dunder Mifflin', intent: 55, sentiment: -0.31, risk: 61, engagement: 3.9, action: 'Escalate to manager', confidence: 48, intentDelta: -8 },
    { account: 'Vandelay Ind', intent: 71, sentiment: 0.22, risk: 24, engagement: 6.7, action: 'Demo follow-up', confidence: 66, intentDelta: 6 },
    { account: 'Sterling Cooper', intent: 37, sentiment: -0.45, risk: 74, engagement: 2.1, action: 'Risk review + pause', confidence: 31, intentDelta: -12 },
    { account: 'CashbackPro', intent: 82, sentiment: 0.48, risk: 14, engagement: 8.4, action: 'Advance to close', confidence: 81, intentDelta: 12 },
    { account: 'Pied Piper', intent: 88, sentiment: 0.55, risk: 9, engagement: 9.1, action: 'Fast-track priority', confidence: 84, intentDelta: 18 },
];

// SHAP feature importance
export const SHAP_FEATURES = [
    { feature: 'Engagement Depth', contribution: 28.4, positive: true },
    { feature: 'Committee Size', contribution: 21.7, positive: true },
    { feature: 'Sentiment Score', contribution: 18.3, positive: true },
    { feature: 'ICP Match', contribution: 14.1, positive: true },
    { feature: 'Response Latency', contribution: -10.2, positive: false },
    { feature: 'Champion Access', contribution: 9.8, positive: true },
    { feature: 'Contract History', contribution: -5.4, positive: false },
];

// Behavioral cohort grid (8 cohorts × 6 time periods)
export const BEHAVIORAL_COHORT = {
    rows: ['Q1\'23', 'Q2\'23', 'Q3\'23', 'Q4\'23', 'Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24'],
    cols: ['0m', '3m', '6m', '12m', '18m', '24m'],
    values: [
        [100, 88, 79, 65, 54, 48],
        [100, 91, 83, 71, 62, 55],
        [100, 85, 76, 61, 49, 42],
        [100, 93, 87, 74, 68, 61],
        [100, 89, 81, 69, 58, null],
        [100, 87, 78, 64, null, null],
        [100, 92, 84, null, null, null],
        [100, 90, null, null, null, null],
    ],
};

// Engagement funnel (6 stages)
export const ENGAGEMENT_FUNNEL = [
    { label: 'Signal Detected', count: 2840 },
    { label: 'Committee Identified', count: 1920 },
    { label: 'Multi-Threaded', count: 1241 },
    { label: 'Sentiment Positive', count: 842 },
    { label: 'High Confidence (>70%)', count: 521 },
    { label: 'Won', count: 287 },
];

// Sentiment distribution histogram (-1.0 to +1.0, 6 buckets)
export const SENTIMENT_DIST = [
    { bucket: '-1.0 to -0.6', count: 18, color: '#ef4444' },
    { bucket: '-0.6 to -0.2', count: 34, color: '#f97316' },
    { bucket: '-0.2 to +0.2', count: 89, color: '#6b7280' },
    { bucket: '+0.2 to +0.6', count: 124, color: '#22c55e' },
    { bucket: '+0.6 to +1.0', count: 67, color: '#10b981' },
];

// Pipeline: stage + intent bubble data (20 deals)
export const STAGE_INTENT_BUBBLES = [
    { phase: 'Awareness', intent: 24, arr: 0.8, sentiment: 'neutral' },
    { phase: 'Discovery', intent: 41, arr: 1.2, sentiment: 'positive' },
    { phase: 'Evaluation', intent: 67, arr: 2.4, sentiment: 'positive' },
    { phase: 'Decision', intent: 83, arr: 4.1, sentiment: 'positive' },
    { phase: 'Decision', intent: 71, arr: 3.2, sentiment: 'neutral' },
    { phase: 'Evaluation', intent: 55, arr: 1.8, sentiment: 'negative' },
    { phase: 'Discovery', intent: 38, arr: 0.9, sentiment: 'neutral' },
    { phase: 'Awareness', intent: 18, arr: 0.5, sentiment: 'negative' },
    { phase: 'Closed', intent: 91, arr: 5.8, sentiment: 'positive' },
    { phase: 'Decision', intent: 76, arr: 2.9, sentiment: 'positive' },
    { phase: 'Evaluation', intent: 48, arr: 1.4, sentiment: 'neutral' },
    { phase: 'Discovery', intent: 62, arr: 2.1, sentiment: 'positive' },
    { phase: 'Closed', intent: 85, arr: 3.6, sentiment: 'positive' },
    { phase: 'Awareness', intent: 29, arr: 0.7, sentiment: 'neutral' },
    { phase: 'Evaluation', intent: 73, arr: 3.8, sentiment: 'negative' },
    { phase: 'Decision', intent: 88, arr: 6.2, sentiment: 'positive' },
    { phase: 'Discovery', intent: 44, arr: 1.1, sentiment: 'neutral' },
    { phase: 'Evaluation', intent: 61, arr: 2.7, sentiment: 'positive' },
    { phase: 'Awareness', intent: 35, arr: 0.6, sentiment: 'negative' },
    { phase: 'Decision', intent: 79, arr: 4.5, sentiment: 'positive' },
];

// Committee depth histogram
export const COMMITTEE_DEPTH = [
    { size: '1 member', count: 12 },
    { size: '2 members', count: 28 },
    { size: '3 members', count: 47 },
    { size: '4 members', count: 38 },
    { size: '5 members', count: 21 },
    { size: '6+ members', count: 14 },
];

// Interaction frequency (60 days, 2 series)
export const INTERACTION_FREQUENCY: { week: string; all: number; quality: number }[] = [
    { week: 'Wk 1', all: 142, quality: 67 },
    { week: 'Wk 2', all: 168, quality: 81 },
    { week: 'Wk 3', all: 154, quality: 74 },
    { week: 'Wk 4', all: 189, quality: 92 },
    { week: 'Wk 5', all: 201, quality: 98 },
    { week: 'Wk 6', all: 178, quality: 88 },
    { week: 'Wk 7', all: 215, quality: 112 },
    { week: 'Wk 8', all: 234, quality: 118 },
];

// Call outcome emotion matrix (5×5)
export const EMOTION_MATRIX = {
    rows: ['Discovery Call', 'Product Demo', 'Business Review', 'Negotiation', 'Exec Briefing'],
    cols: ['Very Positive', 'Positive', 'Neutral', 'Concerned', 'Negative'],
    colorMap: {
        'Very Positive': '#10b981',
        'Positive': '#34d399',
        'Neutral': '#6b7280',
        'Concerned': '#f59e0b',
        'Negative': '#ef4444',
    },
    data: [
        [18, 42, 28, 8, 4],
        [22, 38, 24, 12, 4],
        [12, 35, 31, 16, 6],
        [8, 24, 29, 26, 13],
        [31, 41, 19, 6, 3],
    ],
};

// Activity: Intent spike correlation scatter (20 deals)
export const INTENT_SCATTER = Array.from({ length: 20 }, (_, i) => ({
    interactions: 5 + Math.round(Math.sin(i * 0.7) * 8 + i * 1.2),
    intentDelta: Math.round(Math.cos(i * 0.5) * 15 + i * 0.8 + 2),
    arr: 0.5 + Math.random() * 6,
}));

// Contact: authority heatmap (6 contacts × 3 phases)
export const AUTHORITY_HEATMAP = {
    contacts: ['Sarah Kim (CFO)', 'Mike Rod (VP Eng)', 'Lisa Park (Champion)', 'Tom Wells (Legal)', 'Amy Chen (IT)', 'Dan Fox (Ops)'],
    phases: ['Discovery', 'Evaluation', 'Decision'],
    values: [
        [85, 72, 91],
        [41, 88, 65],
        [95, 78, 87],
        [22, 45, 71],
        [38, 82, 44],
        [55, 61, 38],
    ],
};
