/**
 * CRM-06: Neural Analytics — Sample Data
 * AI-first behavioral intelligence platform.
 * Terminology: Confidence Score, Signal Strength, Behavioral Profile, Intent Score.
 */

// ─── AI DEAL INTELLIGENCE ─────────────────────────────────────────────────────
export const AI_DEALS = [
    { id: 'ND-01', account: 'Nexus Capital', stage: 'Proposal', value: 240000, confidence: 91, signals: ['Champion active', 'Budget confirmed', 'Timeline set'], risks: [], momentum: 'accelerating' as const, days: 48 },
    { id: 'ND-02', account: 'Meridian Advisory', stage: 'Demo', value: 155000, confidence: 78, signals: ['CEO engaged', 'Competitive process'], risks: ['No champion'], momentum: 'holding' as const, days: 31 },
    { id: 'ND-03', account: 'Apex Infrastructure', stage: 'Discovery', value: 320000, confidence: 84, signals: ['3 stakeholders', 'Technical win'], risks: [], momentum: 'accelerating' as const, days: 22 },
    { id: 'ND-04', account: 'Vortex Systems', stage: 'Proposal', value: 88000, confidence: 62, signals: ['Proposal reviewed'], risks: ['Stale 7d', 'Budget risk'], momentum: 'decelerating' as const, days: 67 },
    { id: 'ND-05', account: 'Summit Group', stage: 'Negotiation', value: 480000, confidence: 89, signals: ['Legal engaged', 'Exec sponsor'], risks: [], momentum: 'holding' as const, days: 82 },
    { id: 'ND-06', account: 'Horizon Ventures', stage: 'Discovery', value: 112000, confidence: 55, signals: ['Initial meeting'], risks: ['No timeline', 'No champion', 'No budget'], momentum: 'decelerating' as const, days: 18 },
    { id: 'ND-07', account: 'Catalyst Corp', stage: 'Demo', value: 198000, confidence: 76, signals: ['Technical review approved'], risks: ['Competitor present'], momentum: 'holding' as const, days: 39 },
    { id: 'ND-09', account: 'CashbackPro', stage: 'Proposal', value: 185000, confidence: 84, signals: ['Champion active', 'Budget confirmed'], risks: [], momentum: 'accelerating' as const, days: 32 },
    { id: 'ND-08', account: 'Vector Analytics', stage: 'Qualify', value: 65000, confidence: 43, signals: ['Marketing inbound'], risks: ['No activity 5d'], momentum: 'decelerating' as const, days: 14 },
];

// ─── BEHAVIORAL HEATMAP ───────────────────────────────────────────────────────
export const BEHAVIORAL_HEATMAP = {
    rows: ['Email Open', 'Reply', 'Meeting Accept', 'Deck View', 'Pricing View'],
    cols: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    values: [
        [0.62, 0.74, 0.81, 0.78, 0.55],  // Email Open
        [0.28, 0.44, 0.51, 0.48, 0.22],  // Reply
        [0.31, 0.58, 0.62, 0.54, 0.18],  // Meeting Accept
        [0.44, 0.62, 0.71, 0.59, 0.33],  // Deck View
        [0.12, 0.28, 0.41, 0.38, 0.09],  // Pricing View
    ],
};

// ─── SIGNAL ATTRIBUTION HEATMAP ───────────────────────────────────────────────
export const SIGNAL_ATTRIBUTION = {
    rows: ['Inbound Email', 'Cold Outbound', 'Referral', 'Partner', 'Event Lead'],
    cols: ['Qualify', 'Discovery', 'Demo', 'Proposal', 'Won'],
    values: [
        [0.72, 0.64, 0.52, 0.44, 0.38],  // Inbound Email
        [0.51, 0.43, 0.31, 0.22, 0.14],  // Cold Outbound
        [0.84, 0.78, 0.71, 0.66, 0.61],  // Referral
        [0.77, 0.69, 0.58, 0.52, 0.48],  // Partner
        [0.68, 0.54, 0.42, 0.34, 0.29],  // Event Lead
    ],
};

// ─── CONFIDENCE TREND (last 12 weeks) ────────────────────────────────────────
export const CONFIDENCE_TREND = Array.from({ length: 12 }, (_, i) => ({
    week: `W${i + 1}`,
    predicted: 68 + Math.sin(i * 0.5) * 6 + i * 0.8,
    actual: 66 + Math.sin(i * 0.5 + 0.3) * 4 + i * 1.1,
}));

// ─── BEHAVIORAL PROFILES (contacts) ─────────────────────────────────────────
export const BEHAVIORAL_PROFILES = [
    { name: 'James Liu', org: 'Nexus Capital', intentScore: 91, lastTouched: '2h ago', responseTime: '< 1hr', meetings: 4, emailOpens: 18, profileAxes: [92, 88, 76, 95, 84] },
    { name: 'Priya Singh', org: 'Apex Infrastructure', intentScore: 84, lastTouched: '1d ago', responseTime: '< 4hrs', meetings: 2, emailOpens: 12, profileAxes: [81, 77, 88, 72, 91] },
    { name: 'Don Wu', org: 'Vortex Systems', intentScore: 58, lastTouched: '7d ago', responseTime: '2–3 days', meetings: 1, emailOpens: 4, profileAxes: [52, 44, 61, 38, 55] },
    { name: 'Sophie Chen', org: 'Meridian Advisory', intentScore: 76, lastTouched: '3d ago', responseTime: '< 1 day', meetings: 3, emailOpens: 9, profileAxes: [74, 82, 68, 79, 71] },
    { name: 'Lucas Ferreira', org: 'Summit Group', intentScore: 89, lastTouched: '4h ago', responseTime: '< 2hrs', meetings: 6, emailOpens: 22, profileAxes: [88, 91, 84, 86, 79] },
    { name: 'Maya Chen', org: 'Horizon Ventures', intentScore: 42, lastTouched: '14d ago', responseTime: '> 1 week', meetings: 0, emailOpens: 2, profileAxes: [38, 42, 31, 28, 44] },
];

// ─── AI ACTIVITY LOG ─────────────────────────────────────────────────────────
export const AI_ACTIVITY = [
    { id: 'EV-01', type: 'Meeting Completed', account: 'Nexus Capital', date: 'Mar 18', confDelta: +6, outcome: 'Advanced' as const, trigger: 'human' as const },
    { id: 'EV-02', type: 'Email Reply Received', account: 'Apex Infrastructure', date: 'Mar 17', confDelta: +3, outcome: 'Advanced' as const, trigger: 'ai' as const },
    { id: 'EV-03', type: 'Pricing View Detected', account: 'Summit Group', date: 'Mar 17', confDelta: +8, outcome: 'Advanced' as const, trigger: 'ai' as const },
    { id: 'EV-04', type: 'No Activity Flag', account: 'Vortex Systems', date: 'Mar 16', confDelta: -5, outcome: 'Stalled' as const, trigger: 'ai' as const },
    { id: 'EV-05', type: 'Champion Left', account: 'Horizon Ventures', date: 'Mar 15', confDelta: -12, outcome: 'Risk' as const, trigger: 'ai' as const },
    { id: 'EV-06', type: 'Demo Completed', account: 'Catalyst Corp', date: 'Mar 14', confDelta: +4, outcome: 'Advanced' as const, trigger: 'human' as const },
    { id: 'EV-07', type: 'Competitor Mention', account: 'Meridian Advisory', date: 'Mar 14', confDelta: -7, outcome: 'Risk' as const, trigger: 'ai' as const },
];

// ─── NEURAL REPORTS ──────────────────────────────────────────────────────────
export const NEURAL_REPORTS = [
    { id: 'NR-01', name: 'Model Performance Report', category: 'AI', status: 'ready' as const, accuracy: '91.4%', lastRun: '1h ago' },
    { id: 'NR-02', name: 'Signal Attribution Analysis', category: 'Intelligence', status: 'ready' as const, accuracy: '88.7%', lastRun: '6h ago' },
    { id: 'NR-03', name: 'Behavioral Cohort Profile', category: 'Behavioral', status: 'generating' as const, accuracy: '—', lastRun: 'Now...' },
    { id: 'NR-04', name: 'Prediction vs Actual', category: 'AI', status: 'ready' as const, accuracy: '89.1%', lastRun: '1d ago' },
    { id: 'NR-05', name: 'Intent Score Distribution', category: 'Intelligence', status: 'scheduled' as const, accuracy: '—', lastRun: 'Tomorrow' },
    { id: 'NR-06', name: 'Close Rate Cohort Analysis', category: 'Performance', status: 'ready' as const, accuracy: '86.2%', lastRun: '3d ago' },
];

// ─── AUTOMATION TRIGGERS ─────────────────────────────────────────────────────
export const NEURAL_TRIGGERS = [
    { id: 'NT-01', name: 'Confidence Drop Alert', condition: 'Confidence drops > 10% in 48h', action: 'Escalate + notify manager', lastTriggered: '3h ago', active: true },
    { id: 'NT-02', name: 'High Intent Surge', condition: 'Intent score jumps > 20 pts', action: 'Move to Fast Track queue', lastTriggered: '12h ago', active: true },
    { id: 'NT-03', name: 'Behavioral Stall Detection', condition: '5+ days no behavioral signals', action: 'Re-engage sequence triggered', lastTriggered: '1d ago', active: true },
    { id: 'NT-04', name: 'Prediction Threshold Gate', condition: 'Confidence < 40% at proposal', action: 'Flag for manager review', lastTriggered: '2d ago', active: false },
];

// ─── NEURAL INTEGRATIONS ─────────────────────────────────────────────────────
export const NEURAL_INTEGRATIONS = [
    { name: 'Gong', category: 'AI/ML', status: 'connected' as const, signalScore: 94, records: '4,128 calls', lastSync: '1m ago' },
    { name: '6sense', category: 'AI/ML', status: 'connected' as const, signalScore: 88, records: '12,400 signals', lastSync: '5m ago' },
    { name: 'Clearbit', category: 'AI/ML', status: 'connected' as const, signalScore: 79, records: '8,200 enriched', lastSync: '10m ago' },
    { name: 'OpenAI', category: 'AI/ML', status: 'connected' as const, signalScore: 91, records: 'Model active', lastSync: '30s ago' },
    { name: 'Chorus', category: 'AI/ML', status: 'available' as const, signalScore: null, records: '', lastSync: '' },
    { name: 'Salesforce', category: 'CRM', status: 'connected' as const, signalScore: null, records: '14,200 recs', lastSync: '5m ago' },
    { name: 'HubSpot', category: 'CRM', status: 'available' as const, signalScore: null, records: '', lastSync: '' },
    { name: 'Outreach', category: 'Email', status: 'connected' as const, signalScore: null, records: '3,400 seqs', lastSync: '2m ago' },
    { name: 'Apollo', category: 'Email', status: 'available' as const, signalScore: null, records: '', lastSync: '' },
    { name: 'Zoom', category: 'Calendar', status: 'connected' as const, signalScore: null, records: '824 meetings', lastSync: '15m ago' },
    { name: 'LinkedIn Sales Nav', category: 'AI/ML', status: 'available' as const, signalScore: null, records: '', lastSync: '' },
    { name: 'ZoomInfo', category: 'AI/ML', status: 'available' as const, signalScore: null, records: '', lastSync: '' },
];
