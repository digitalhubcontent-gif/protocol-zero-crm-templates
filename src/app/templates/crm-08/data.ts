/**
 * CRM-08 — Signal Intelligence
 * Data file: All chart datasets for PLG signal analytics pages.
 */

// ─── DASHBOARD DATA ──────────────────────────────────────────────────────────

// Intent surge timeline (60 days, with surge events)
export const INTENT_SURGE_TIMELINE: { day: string; signals: number; upper: number; lower: number; surge?: string }[] = Array.from({ length: 60 }, (_, i) => {
    const base = 380 + i * 1.7;
    const wave = Math.sin(i * 0.18) * 60 + Math.cos(i * 0.08) * 40;
    const signals = Math.max(200, Math.round(base + wave + (Math.random() - 0.5) * 30));
    const surge = i === 14 ? 'Q1 Webinar' : i === 31 ? 'G2 Review Push' : i === 44 ? 'PLG Trial Launch' : i === 57 ? 'Content Series' : undefined;
    const day = new Date(2025, 9, 1 + i).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { day, signals, upper: signals + 45, lower: signals - 35, surge };
});

// ICP fit distribution
export const ICP_DISTRIBUTION = [
    { label: 'High Fit (>80%)', count: 214, color: '#22c55e' },
    { label: 'Medium Fit (50–80%)', count: 318, color: '#06b6d4' },
    { label: 'Low Fit (<50%)', count: 89, color: '#6b7280' },
];

// Product usage funnel (PLG stages)
export const PLG_FUNNEL = [
    { label: 'Signed Up', count: 4820 },
    { label: 'Activated', count: 3241 },
    { label: 'Core Feature Used', count: 2108 },
    { label: 'Power User', count: 891 },
    { label: 'Sales Qualified', count: 362 },
];

// Signal-to-revenue scatter (25 accounts)
export const SIGNAL_SCATTER = [
    { account: 'Acme Corp', intent: 91, confidence: 87, arr: 5.8, icpTier: 'high' },
    { account: 'Globex Inc', intent: 74, confidence: 68, arr: 3.2, icpTier: 'high' },
    { account: 'Initech', intent: 55, confidence: 41, arr: 1.4, icpTier: 'medium' },
    { account: 'Umbrella Ltd', intent: 83, confidence: 79, arr: 4.5, icpTier: 'high' },
    { account: 'Soylent Sys', intent: 38, confidence: 29, arr: 0.8, icpTier: 'low' },
    { account: 'Prestige WW', intent: 68, confidence: 62, arr: 2.8, icpTier: 'high' },
    { account: 'Dunder Mif', intent: 42, confidence: 35, arr: 0.9, icpTier: 'medium' },
    { account: 'Vandelay', intent: 77, confidence: 71, arr: 3.9, icpTier: 'high' },
    { account: 'Sterling Co', intent: 29, confidence: 18, arr: 0.5, icpTier: 'low' },
    { account: 'Pied Piper', intent: 88, confidence: 84, arr: 6.2, icpTier: 'high' },
    { account: 'Hooli Corp', intent: 62, confidence: 55, arr: 2.4, icpTier: 'medium' },
    { account: 'Gringotts', intent: 71, confidence: 64, arr: 2.9, icpTier: 'high' },
    { account: 'Bluth Co', intent: 45, confidence: 38, arr: 1.1, icpTier: 'medium' },
    { account: 'Stark Ind', intent: 95, confidence: 91, arr: 8.4, icpTier: 'high' },
    { account: 'Waystar', intent: 82, confidence: 76, arr: 4.8, icpTier: 'high' },
    { account: 'Cyberdyne', intent: 53, confidence: 44, arr: 1.6, icpTier: 'medium' },
    { account: 'Weyland Corp', intent: 67, confidence: 59, arr: 2.6, icpTier: 'medium' },
    { account: 'Oscorp', intent: 35, confidence: 24, arr: 0.6, icpTier: 'low' },
    { account: 'LexCorp', intent: 79, confidence: 72, arr: 3.6, icpTier: 'high' },
    { account: 'Nakatomi', intent: 48, confidence: 41, arr: 1.3, icpTier: 'low' },
    { account: 'Tyrell Corp', intent: 86, confidence: 81, arr: 5.2, icpTier: 'high' },
    { account: 'MomCorp', intent: 58, confidence: 50, arr: 1.9, icpTier: 'medium' },
    { account: 'Planet Expr', intent: 64, confidence: 57, arr: 2.3, icpTier: 'medium' },
    { account: 'Initech 2', intent: 41, confidence: 33, arr: 0.9, icpTier: 'low' },
    { account: 'Krusty Burg', intent: 72, confidence: 66, arr: 3.1, icpTier: 'medium' },
];

// Signal Intelligence Table (12 accounts)
export const SIGNAL_TABLE = [
    { account: 'Tython Corp', icpFit: 94, intent: 91, usageLevel: 'High', signalType: 'Trial activated', confidence: 89, rep: 'SJ' },
    { account: 'Aperture Sci', icpFit: 87, intent: 83, usageLevel: 'Medium', signalType: 'Demo requested', confidence: 81, rep: 'KP' },
    { account: 'Vault-Tec', icpFit: 79, intent: 77, usageLevel: 'Medium', signalType: 'Web surge', confidence: 73, rep: 'AM' },
    { account: 'Black Mesa', icpFit: 73, intent: 68, usageLevel: 'Low', signalType: 'G2 review', confidence: 62, rep: 'SJ' },
    { account: 'Umbrella Ltd', icpFit: 91, intent: 88, usageLevel: 'High', signalType: 'Intent surge', confidence: 85, rep: 'KP' },
    { account: 'Dunder Mif', icpFit: 55, intent: 49, usageLevel: 'None', signalType: 'Content down.', confidence: 44, rep: 'DC' },
    { account: 'Soylent Sys', icpFit: 48, intent: 38, usageLevel: 'None', signalType: 'Web visit', confidence: 31, rep: 'DC' },
    { account: 'Pied Piper', icpFit: 96, intent: 94, usageLevel: 'High', signalType: 'Power user', confidence: 93, rep: 'AM' },
    { account: 'Initech', icpFit: 61, intent: 55, usageLevel: 'Low', signalType: 'Email click', confidence: 49, rep: 'SJ' },
    { account: 'Globex Inc', icpFit: 82, intent: 76, usageLevel: 'Medium', signalType: 'Demo requested', confidence: 72, rep: 'KP' },
    { account: 'Sterling Co', icpFit: 42, intent: 31, usageLevel: 'None', signalType: 'Web visit', confidence: 24, rep: 'DC' },
    { account: 'CashbackPro', icpFit: 86, intent: 84, usageLevel: 'High', signalType: 'Product activation', confidence: 82, rep: 'PS' },
    { account: 'Acme Corp', icpFit: 89, intent: 87, usageLevel: 'High', signalType: 'Intent surge', confidence: 84, rep: 'AM' },
];

// ─── ANALYTICS DATA ─────────────────────────────────────────────────────────

// Attribution waterfall (5 signal sources)
export const ATTRIBUTION_WATERFALL = [
    { label: 'Web Intent', value: 18.4, color: '#06b6d4' },
    { label: 'Product Trial', value: 14.2, color: '#22c55e' },
    { label: 'Content Download', value: 9.1, color: '#8b5cf6' },
    { label: 'Direct Outreach', value: 6.3, color: '#f59e0b' },
    { label: 'Event Attendance', value: 4.0, color: '#ec4899' },
];

// Activation cohort grid (8 months × 6 day milestones)
export const ACTIVATION_COHORT = {
    rows: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    cols: ['Day 1', 'Day 7', 'Day 14', 'Day 30', 'Day 60', 'Day 90'],
    values: [
        [100, 82, 71, 58, 47, 41],
        [100, 79, 68, 54, 43, 37],
        [100, 85, 74, 62, 51, 44],
        [100, 88, 78, 67, 55, 48],
        [100, 81, 69, 57, 45, null],
        [100, 84, 73, 61, null, null],
        [100, 87, 76, null, null, null],
        [100, 83, null, null, null, null],
    ],
};

// Signal decay curves (3 series over 60 days)
export const SIGNAL_DECAY: { label: string; color: string; halfLifeDay: number; dashed: boolean; data: { day: number; value: number }[] }[] = [
    {
        label: 'Web Intent',
        color: '#06b6d4',
        halfLifeDay: 8,
        dashed: false,
        data: [0, 4, 8, 12, 16, 20, 25, 30, 40, 50, 60].map(d => ({
            day: d,
            value: Math.round(100 * Math.exp(-d / 11.5)),
        })),
    },
    {
        label: 'Trial Signal',
        color: '#22c55e',
        halfLifeDay: 18,
        dashed: false,
        data: [0, 4, 8, 12, 16, 20, 25, 30, 40, 50, 60].map(d => ({
            day: d,
            value: Math.round(100 * Math.exp(-d / 26)),
        })),
    },
    {
        label: 'Email Signal',
        color: '#f59e0b',
        halfLifeDay: 6,
        dashed: true,
        data: [0, 4, 8, 12, 16, 20, 25, 30, 40, 50, 60].map(d => ({
            day: d,
            value: Math.round(100 * Math.exp(-d / 8.7)),
        })),
    },
];

// Campaign attribution heatmap (5 campaigns × 4 phases)
export const CAMPAIGN_ATTRIBUTION = {
    rows: ['Q1 Webinar', 'G2 Review Push', 'PLG Trial Launch', 'Content Series', 'Direct Outreach'],
    cols: ['Signal Gen.', 'Demo Booked', 'Opp. Created', 'Closed'],
    values: [
        [142, 48, 31, 18],
        [98, 34, 22, 12],
        [281, 87, 54, 31],
        [124, 29, 14, 7],
        [67, 42, 28, 16],
    ],
};

// ─── PIPELINE DATA ───────────────────────────────────────────────────────────

// Intent cluster scatter (25 accounts)
export const INTENT_CLUSTER = SIGNAL_SCATTER.map(s => ({
    account: s.account,
    icpScore: Math.round(40 + s.arr * 8),
    intentScore: s.intent,
    arr: s.arr,
    icpTier: s.icpTier,
}));

// Signal confidence line (30 days, 2 series)
export const SIGNAL_CONFIDENCE: { day: string; all: number; highIcp: number }[] = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    all: Math.round(55 + Math.sin(i * 0.3) * 10 + i * 0.4),
    highIcp: Math.round(72 + Math.cos(i * 0.25) * 8 + i * 0.3),
}));

// ─── ACTIVITY DATA ───────────────────────────────────────────────────────────

// Campaign interaction line (30 days × 4 channels)
export const CAMPAIGN_INTERACTION: { day: string; email: number; web: number; trial: number; events: number }[] = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    email: Math.round(45 + Math.sin(i * 0.4) * 18 + (Math.random() - 0.5) * 8),
    web: Math.round(78 + Math.cos(i * 0.3) * 24 + (Math.random() - 0.5) * 12),
    trial: Math.round(32 + Math.sin(i * 0.5 + 1) * 14 + (Math.random() - 0.5) * 6),
    events: Math.round(12 + Math.cos(i * 0.6 + 2) * 5 + (Math.random() - 0.5) * 3),
}));

// Channel attribution donut
export const CHANNEL_DONUT = [
    { label: 'Web Intent', value: 31, color: '#06b6d4' },
    { label: 'Product Trial', value: 24, color: '#22c55e' },
    { label: 'Email', value: 19, color: '#8b5cf6' },
    { label: 'Event/Webinar', value: 14, color: '#f59e0b' },
    { label: 'Content', value: 12, color: '#ec4899' },
];

// Response rate by signal type
export const RESPONSE_RATES = [
    { signal: 'Intent Surge (>25%)', rate: 84, color: '#22c55e' },
    { signal: 'Trial Activation', rate: 78, color: '#06b6d4' },
    { signal: 'Demo Request', rate: 91, color: '#22c55e' },
    { signal: 'Content Download', rate: 41, color: '#f59e0b' },
    { signal: 'Web Visit Only', rate: 22, color: '#ef4444' },
];

// Signal Radar Widget (6 axes)
export const SIGNAL_RADAR = {
    axes: ['Web Intent', 'Product Use', 'Email', 'Social', 'Content', 'Outreach'],
    values: [82, 71, 55, 38, 64, 47],
};

// PLG activation timeline events
export const PLG_TIMELINE = [
    { time: '2d ago', account: 'Stark Ind', event: 'Trial Day 1 — Signed up', color: '#06b6d4', type: 'signup' },
    { time: '2d ago', account: 'Pied Piper', event: 'Core Feature Used — First pipeline created', color: '#22c55e', type: 'feature' },
    { time: '3d ago', account: 'Umbrella Ltd', event: 'Invite Sent — 3 colleagues added', color: '#f59e0b', type: 'expand' },
    { time: '4d ago', account: 'Acme Corp', event: 'Demo Requested — Sales qualified', color: '#8b5cf6', type: 'demo' },
    { time: '5d ago', account: 'LexCorp', event: 'Power User Milestone — Day 12 reached', color: '#22c55e', type: 'milestone' },
    { time: '6d ago', account: 'Vault-Tec', event: 'Trial activation via G2 intent signal', color: '#06b6d4', type: 'signal' },
];

// Contacts: buying group engagement heatmap (6 members × 5 signals)
export const BUYING_GROUP_HEATMAP = {
    members: ['Alex Rivera (CEO)', 'Jordan Kim (CTO)', 'Sam Park (VP Sales)', 'Morgan Lee (Finance)', 'Casey Chen (IT)', 'Drew Fox (Champion)'],
    signals: ['Web Visit', 'Email Click', 'Product Login', 'Demo Attended', 'Content DL'],
    values: [
        [24, 12, 8, 3, 18],
        [31, 28, 45, 12, 22],
        [18, 35, 31, 8, 14],
        [8, 14, 5, 1, 9],
        [41, 22, 67, 4, 28],
        [38, 41, 72, 15, 34],
    ],
};

// Pipeline: account × buyer-role engagement heatmap (5 accounts × 5 roles)
export const PIPELINE_BUYING_HEATMAP = {
    accounts: ['Stark Industries', 'LexCorp', 'Umbrella Ltd', 'Pied Piper', 'Acme Corp'],
    roles: ['Economic Buyer', 'Champion', 'Technical', 'Legal/Finance', 'End User'],
    engagement: [
        [82, 91, 74, 38, 55],
        [47, 68, 83, 22, 41],
        [91, 88, 72, 61, 79],
        [34, 79, 91, 18, 88],
        [68, 74, 55, 42, 63],
    ],
};

// Intent scatter — alias export for pipeline page
export const INTENT_SCATTER = SIGNAL_SCATTER;
