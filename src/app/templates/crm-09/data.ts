/**
 * CRM-09 — Sovereign Enterprise
 * Data file: Executive governance datasets for revenue oversight.
 */

// ─── DASHBOARD DATA ──────────────────────────────────────────────────────────

// Executive Revenue Bridge waterfall segments
export const REVENUE_BRIDGE = [
    { label: 'Beginning ARR', value: 142, type: 'start' as const, color: '#3b82f6' },
    { label: 'New Business', value: 18, type: 'positive' as const, color: '#22c55e' },
    { label: 'Expansion', value: 9, type: 'positive' as const, color: '#22c55e' },
    { label: 'Contraction', value: -4, type: 'negative' as const, color: '#ef4444' },
    { label: 'Churn', value: -2, type: 'negative' as const, color: '#ef4444' },
    { label: 'Net ARR', value: 163, type: 'end' as const, color: '#3b82f6' },
];

// Geographic performance regions
export const GEO_REGIONS = [
    { id: 'AMER', label: 'AMER', value: 89, budget: '$89M', attainment: 108 },
    { id: 'EMEA', label: 'EMEA', value: 47, budget: '$47M', attainment: 97 },
    { id: 'APAC', label: 'APAC', value: 31, budget: '$31M', attainment: 82 },
    { id: 'LATAM', label: 'LATAM', value: 12, budget: '$12M', attainment: 71 },
    { id: 'ANZ', label: 'ANZ', value: 8, budget: '$8M', attainment: 94 },
];

// Contract Duration Distribution
export const CONTRACT_DURATION = [
    { label: 'Monthly', value: 4.2, color: '#ef4444' },
    { label: 'Quarterly', value: 8.1, color: '#f59e0b' },
    { label: '1 Year', value: 31.4, color: '#3b82f6' },
    { label: '2 Year', value: 42.8, color: '#22c55e' },
    { label: '3+ Year', value: 26.5, color: '#22c55e' },
];

// Forecast Accuracy Trend (8 quarters)
export const FORECAST_ACCURACY = [
    { quarter: "Q3'24", deviation: 2.1, exceeded: true },
    { quarter: "Q4'24", deviation: -4.8, exceeded: false },
    { quarter: "Q1'25", deviation: 1.3, exceeded: true },
    { quarter: "Q2'25", deviation: -2.7, exceeded: false },
    { quarter: "Q3'25", deviation: 3.6, exceeded: true },
    { quarter: "Q4'25", deviation: 0.8, exceeded: true },
    { quarter: "Q1'26", deviation: -1.2, exceeded: false },
    { quarter: "Q2'26", deviation: 3.2, exceeded: true },
];

// Board Revenue Register table
export const BOARD_REGISTER = [
    { division: 'Enterprise Americas', arr: '$42M', renewalDate: '09/2026', riskTier: 'Low' as const, phase: 'Commit', category: 'Commit' as const, sponsor: 'Sarah Chen' },
    { division: 'Mid-Market EMEA', arr: '$18M', renewalDate: '11/2026', riskTier: 'Medium' as const, phase: 'Approval', category: 'Upside' as const, sponsor: 'Marcus Webb' },
    { division: 'Strategic APAC', arr: '$14M', renewalDate: '08/2026', riskTier: 'High' as const, phase: 'Discovery', category: 'Pipeline' as const, sponsor: 'Lin Zhao' },
    { division: 'Global Technology', arr: '$31M', renewalDate: '12/2026', riskTier: 'Low' as const, phase: 'Commit', category: 'Commit' as const, sponsor: 'James Okafor' },
    { division: 'Healthcare Division', arr: '$22M', renewalDate: '07/2026', riskTier: 'Medium' as const, phase: 'Proposal', category: 'Upside' as const, sponsor: 'Elena Rodriguez' },
    { division: 'Financial Services', arr: '$28M', renewalDate: '10/2026', riskTier: 'Low' as const, phase: 'Commit', category: 'Commit' as const, sponsor: 'David Park' },
    { division: 'Government Sector', arr: '$8M', renewalDate: '06/2026', riskTier: 'High' as const, phase: 'Qualification', category: 'Pipeline' as const, sponsor: 'Priya Sharma' },
    { division: 'Retail & Commerce', arr: '$15M', renewalDate: '01/2027', riskTier: 'Low' as const, phase: 'Commit', category: 'Commit' as const, sponsor: 'Alex Rivera' },
];

// Risk Escalations
export const RISK_ESCALATIONS = [
    { asset: 'Strategic APAC — Nikko Group', arr: '$4.2M', issue: 'Champion left organization, executive sponsor unresponsive for 3 weeks', severity: 'Critical' as const },
    { asset: 'Government Sector — FedTech Inc', arr: '$2.8M', issue: 'Budget freeze announced for Q3, procurement approval stalled', severity: 'High' as const },
];

// ─── ANALYTICS DATA ─────────────────────────────────────────────────────────

// Multi-Year ARR Projection (6 quarters, base + upside)
export const ARR_PROJECTION = {
    base: [
        { x: "Q3'26", value: 168 },
        { x: "Q4'26", value: 175 },
        { x: "Q1'27", value: 183 },
        { x: "Q2'27", value: 192 },
        { x: "Q3'27", value: 201 },
        { x: "Q4'27", value: 211 },
    ],
    upside: [
        { x: "Q3'26", value: 174 },
        { x: "Q4'26", value: 186 },
        { x: "Q1'27", value: 198 },
        { x: "Q2'27", value: 212 },
        { x: "Q3'27", value: 228 },
        { x: "Q4'27", value: 245 },
    ],
};

// Churn Cohort Matrix
export const CHURN_COHORT = {
    rows: ['Q1\'24', 'Q2\'24', 'Q3\'24', 'Q4\'24', 'Q1\'25', 'Q2\'25'],
    cols: ['Year 1', 'Year 2', 'Year 3'],
    values: [
        [94, 87, 81],
        [92, 84, null],
        [96, 89, null],
        [91, null, null],
        [93, null, null],
        [95, null, null],
    ] as (number | null)[][],
};

// Revenue by Segment
export const REVENUE_SEGMENTS = [
    { segment: 'Financial Services', arr: 38, expansion: 8, churn: -2 },
    { segment: 'Healthcare', arr: 28, expansion: 5, churn: -3 },
    { segment: 'Technology', arr: 42, expansion: 12, churn: -1 },
    { segment: 'Manufacturing', arr: 22, expansion: 4, churn: -4 },
    { segment: 'Government', arr: 14, expansion: 2, churn: -1 },
];

// Risk Tier Distribution (treemap nodes)
export const RISK_TREEMAP = [
    { id: 'r1', label: 'Nikko Group', value: 42, riskScore: 9, arr: '$4.2M' },
    { id: 'r2', label: 'FedTech Inc', value: 28, riskScore: 8, arr: '$2.8M' },
    { id: 'r3', label: 'Atlas Corp', value: 18, riskScore: 7, arr: '$1.8M' },
    { id: 'r4', label: 'Meridian', value: 45, riskScore: 3, arr: '$4.5M' },
    { id: 'r5', label: 'Axon Systems', value: 32, riskScore: 2, arr: '$3.2M' },
    { id: 'r6', label: 'Corvus Data', value: 22, riskScore: 5, arr: '$2.2M' },
    { id: 'r7', label: 'Vantage', value: 51, riskScore: 1, arr: '$5.1M' },
    { id: 'r8', label: 'Nexova', value: 37, riskScore: 4, arr: '$3.7M' },
];

// ─── PIPELINE DATA ──────────────────────────────────────────────────────────

// Governance Phase Distribution
export const GOV_PHASES = [
    { phase: 'Qualification', value: 28, count: 42 },
    { phase: 'Discovery', value: 22, count: 34 },
    { phase: 'Proposal', value: 18, count: 21 },
    { phase: 'Approval', value: 14, count: 12 },
    { phase: 'Commit', value: 44, count: 8 },
    { phase: 'Closed', value: 37, count: 6 },
];

// Large Deal Tracker
export const LARGE_DEALS = [
    { account: 'Vantage Analytics', arr: '$5.1M', phase: 'Commit', sponsor: 'James Okafor', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q2\'26' },
    { account: 'Global Meridian', arr: '$4.5M', phase: 'Commit', sponsor: 'Sarah Chen', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q2\'26' },
    { account: 'Nikko Group', arr: '$4.2M', phase: 'Discovery', sponsor: 'Lin Zhao', risk: 'High' as const, approval: 'Pending' as const, closeQ: 'Q3\'26' },
    { account: 'Nexova Industries', arr: '$3.7M', phase: 'Proposal', sponsor: 'Elena Rodriguez', risk: 'Medium' as const, approval: 'Pending' as const, closeQ: 'Q3\'26' },
    { account: 'Axon Systems', arr: '$3.2M', phase: 'Approval', sponsor: 'Marcus Webb', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q2\'26' },
    { account: 'FedTech Inc', arr: '$2.8M', phase: 'Qualification', sponsor: 'Priya Sharma', risk: 'High' as const, approval: 'Blocked' as const, closeQ: 'Q4\'26' },
    { account: 'Atlas Corp', arr: '$2.6M', phase: 'Proposal', sponsor: 'David Park', risk: 'Medium' as const, approval: 'Pending' as const, closeQ: 'Q3\'26' },
    { account: 'Corvus Data', arr: '$2.2M', phase: 'Commit', sponsor: 'Alex Rivera', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q2\'26' },
    { account: 'CashbackPro Technologies', arr: '$1.85M', phase: 'Proposal', sponsor: 'Sarah Chen', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q3\'26' },
    { account: 'Pinnacle Holdings', arr: '$1.9M', phase: 'Discovery', sponsor: 'James Okafor', risk: 'Medium' as const, approval: 'Pending' as const, closeQ: 'Q3\'26' },
    { account: 'Citadel Tech', arr: '$1.6M', phase: 'Approval', sponsor: 'Sarah Chen', risk: 'Low' as const, approval: 'Approved' as const, closeQ: 'Q2\'26' },
];

// Risk Exposure Donut
export const RISK_DONUT = [
    { label: 'Low Risk', value: 62, color: '#3b82f6' },
    { label: 'Medium Risk', value: 26, color: '#f59e0b' },
    { label: 'High Risk', value: 12, color: '#ef4444' },
];

// Close Date Timeline
export const CLOSE_TIMELINE = [
    { asset: 'Vantage Analytics', days: 12, arr: '$5.1M' },
    { asset: 'Global Meridian', days: 18, arr: '$4.5M' },
    { asset: 'Axon Systems', days: 24, arr: '$3.2M' },
    { asset: 'Corvus Data', days: 28, arr: '$2.2M' },
    { asset: 'Citadel Tech', days: 35, arr: '$1.6M' },
    { asset: 'Nexova Industries', days: 62, arr: '$3.7M' },
    { asset: 'Atlas Corp', days: 78, arr: '$2.6M' },
    { asset: 'Nikko Group', days: 95, arr: '$4.2M' },
    { asset: 'Pinnacle Holdings', days: 105, arr: '$1.9M' },
    { asset: 'FedTech Inc', days: 142, arr: '$2.8M' },
];

// Approval workflow data
export const APPROVAL_QUEUE = { pending: 4, approvedThisWeek: 7, lastApproved: { id: 'CR-4421', value: '$2.1M' } };

// ─── CONTACTS DATA ──────────────────────────────────────────────────────────

// Executive Relationship Network
export const EXEC_NETWORK_NODES = [
    { id: 'n1', label: 'Sarah Chen', role: 'Champion', size: 9, color: '#22c55e' },
    { id: 'n2', label: 'James Okafor', role: 'C-Suite', size: 8, color: '#ef4444' },
    { id: 'n3', label: 'Marcus Webb', role: 'Champion', size: 7, color: '#22c55e' },
    { id: 'n4', label: 'Lin Zhao', role: 'Finance', size: 6, color: '#f59e0b' },
    { id: 'n5', label: 'Elena Rodriguez', role: 'Operations', size: 7, color: '#06b6d4' },
    { id: 'n6', label: 'David Park', role: 'C-Suite', size: 8, color: '#ef4444' },
    { id: 'n7', label: 'Priya Sharma', role: 'Legal', size: 5, color: '#a78bfa' },
    { id: 'n8', label: 'Alex Rivera', role: 'Champion', size: 6, color: '#22c55e' },
];
export const EXEC_NETWORK_EDGES = [
    { from: 'n1', to: 'n2', strength: 3 },
    { from: 'n1', to: 'n3', strength: 2 },
    { from: 'n2', to: 'n6', strength: 3 },
    { from: 'n3', to: 'n5', strength: 2 },
    { from: 'n4', to: 'n7', strength: 1 },
    { from: 'n5', to: 'n8', strength: 2 },
    { from: 'n6', to: 'n4', strength: 2 },
    { from: 'n1', to: 'n8', strength: 1 },
    { from: 'n3', to: 'n7', strength: 1 },
];

// Org Hierarchy Tree
export const ORG_TREE = [
    { id: 'o1', label: 'James Okafor', role: 'CEO', level: 0, status: 'engaged' as const },
    { id: 'o2', label: 'Sarah Chen', role: 'CRO', level: 1, parentId: 'o1', status: 'engaged' as const },
    { id: 'o3', label: 'David Park', role: 'CFO', level: 1, parentId: 'o1', status: 'neutral' as const },
    { id: 'o4', label: 'Lin Zhao', role: 'COO', level: 1, parentId: 'o1', status: 'unengaged' as const },
    { id: 'o5', label: 'Marcus Webb', role: 'VP Sales', level: 2, parentId: 'o2', status: 'engaged' as const },
    { id: 'o6', label: 'Elena Rodriguez', role: 'VP CS', level: 2, parentId: 'o2', status: 'engaged' as const },
    { id: 'o7', label: 'Priya Sharma', role: 'VP Legal', level: 2, parentId: 'o3', status: 'blocker' as const },
    { id: 'o8', label: 'Alex Rivera', role: 'Dir Sales', level: 3, parentId: 'o5', status: 'engaged' as const },
    { id: 'o9', label: 'Taylor Kim', role: 'Dir Ops', level: 3, parentId: 'o5', status: 'neutral' as const },
];

// Engagement Depth by Account
export const ENGAGEMENT_DEPTH = [
    { account: 'Vantage Analytics', score: 9.2 },
    { account: 'Global Meridian', score: 8.7 },
    { account: 'Axon Systems', score: 8.1 },
    { account: 'Corvus Data', score: 7.4 },
    { account: 'Nexova Industries', score: 6.8 },
    { account: 'Citadel Tech', score: 5.9 },
    { account: 'Atlas Corp', score: 4.2 },
    { account: 'Nikko Group', score: 3.1 },
    { account: 'FedTech Inc', score: 2.4 },
];

// Influence Heatmap
export const INFLUENCE_HEATMAP = {
    stakeholders: ['Sarah Chen', 'James Okafor', 'Marcus Webb', 'Elena Rodriguez', 'David Park', 'Priya Sharma'],
    phases: ['Qualification', 'Discovery', 'Proposal', 'Approval', 'Commit', 'Closed'],
    values: [
        [9, 8, 9, 10, 10, 9],
        [3, 4, 6, 9, 10, 10],
        [8, 9, 7, 5, 4, 3],
        [2, 5, 8, 9, 8, 7],
        [1, 2, 3, 8, 9, 10],
        [1, 1, 4, 7, 5, 3],
    ],
};

// ─── ACTIVITY DATA ──────────────────────────────────────────────────────────

// Executive Meeting Trend (24 weeks)
export const EXEC_MEETING_TREND: { week: string; meetings: number }[] = Array.from({ length: 24 }, (_, i) => ({
    week: `W${i + 1}`,
    meetings: Math.round(5 + Math.sin(i * 0.4) * 2.5 + Math.cos(i * 0.2) * 1.5 + (Math.random() - 0.5) * 2),
}));

// Engagement Frequency by Account
export const ENGAGEMENT_FREQUENCY = [
    { account: 'Vantage Analytics', interactions: 42 },
    { account: 'Global Meridian', interactions: 38 },
    { account: 'Axon Systems', interactions: 31 },
    { account: 'Corvus Data', interactions: 28 },
    { account: 'Nexova Industries', interactions: 24 },
    { account: 'Atlas Corp', interactions: 18 },
    { account: 'Nikko Group', interactions: 12 },
    { account: 'FedTech Inc', interactions: 8 },
];

// Activity by Region Heat Map
export const REGION_ACTIVITY = {
    regions: ['AMER', 'EMEA', 'APAC', 'LATAM', 'ANZ'],
    types: ['Exec Meeting', 'Proposal Review', 'QBR', 'Board Interaction', 'RFP Response'],
    values: [
        [42, 18, 12, 8, 14],
        [28, 14, 8, 4, 9],
        [18, 8, 6, 2, 7],
        [8, 4, 3, 1, 3],
        [6, 3, 4, 1, 2],
    ],
};

// Proposal Conversion Trend (8 quarters)
export const PROPOSAL_CONVERSION = [
    { quarter: "Q3'24", rate: 34, benchmark: 32 },
    { quarter: "Q4'24", rate: 37, benchmark: 32 },
    { quarter: "Q1'25", rate: 36, benchmark: 33 },
    { quarter: "Q2'25", rate: 41, benchmark: 33 },
    { quarter: "Q3'25", rate: 39, benchmark: 34 },
    { quarter: "Q4'25", rate: 44, benchmark: 34 },
    { quarter: "Q1'26", rate: 42, benchmark: 35 },
    { quarter: "Q2'26", rate: 47, benchmark: 35 },
];

// ─── REPORTS DATA ────────────────────────────────────────────────────────────

export const BOARD_REPORTS = [
    { id: 'r1', name: 'Quarterly Revenue Review', desc: 'Revenue bridge waterfall + attainment vs target + regional map', icon: '📊', lastGenerated: '2 days ago' },
    { id: 'r2', name: 'Regional Performance Report', desc: 'Per-region ARR, attainment %, growth YoY, top strategic assets', icon: '🌍', lastGenerated: '5 days ago' },
    { id: 'r3', name: 'Risk & Exposure Summary', desc: 'Risk treemap + high-risk asset list + renewal schedule + concentration index', icon: '⚠️', lastGenerated: '1 week ago' },
    { id: 'r4', name: 'Expansion Analysis', desc: 'Expansion ARR trend, expansion by segment, top expansion accounts', icon: '📈', lastGenerated: '3 days ago' },
    { id: 'r5', name: 'Forecast Variance Report', desc: '8-quarter accuracy trend, commit vs actual, CRO recommendations', icon: '🎯', lastGenerated: '1 day ago' },
    { id: 'r6', name: 'Executive Relationship Report', desc: 'Network graph, multi-thread depth by account, engagement scores', icon: '🤝', lastGenerated: '4 days ago' },
];

// ─── AUTOMATION DATA ─────────────────────────────────────────────────────────

export const GOV_AUTOMATIONS = [
    {
        id: 'a1', name: 'High-Risk Escalation', status: 'active' as const,
        trigger: 'Risk Tier changes to High',
        actions: ['Auto-notify CRO', 'Create executive review task', 'Flag in Board Register'],
        executions: 24, lastRun: '4h ago',
    },
    {
        id: 'a2', name: 'Executive Review Trigger', status: 'active' as const,
        trigger: 'Deal ARR > $500K',
        actions: ['Require executive sponsor assignment', 'Block phase advance until assigned'],
        executions: 18, lastRun: '1d ago',
    },
    {
        id: 'a3', name: 'Multi-Approval Gate', status: 'active' as const,
        trigger: 'Deals > $1M stage advance',
        actions: ['AE → Manager → VP → CRO approval chain', 'Log each approval with timestamp'],
        executions: 8, lastRun: '2d ago',
    },
    {
        id: 'a4', name: 'Renewal Alert Escalation', status: 'active' as const,
        trigger: '90-day renewal + confidence < 80%',
        actions: ['Trigger exec outreach', 'Schedule QBR', 'Notify account team'],
        executions: 12, lastRun: '6h ago',
    },
    {
        id: 'a5', name: 'Forecast Deviation Alert', status: 'paused' as const,
        trigger: 'Committed forecast changes by > 5%',
        actions: ['Auto-notify board reporting team', 'Generate variance report'],
        executions: 3, lastRun: '1w ago',
    },
];

// Approval Gate Steps
export const APPROVAL_STEPS = [
    { role: 'Account Executive', status: 'approved' as const, timestamp: '2026-02-18 14:22' },
    { role: 'Sales Manager', status: 'approved' as const, timestamp: '2026-02-19 09:15' },
    { role: 'VP of Sales', status: 'pending' as const, timestamp: null },
    { role: 'CRO', status: 'waiting' as const, timestamp: null },
];
