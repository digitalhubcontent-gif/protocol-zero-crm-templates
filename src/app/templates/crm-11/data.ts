// CRM-11: Data Meridian — Comparative Intelligence Data

export const SEGMENT_A = { type: 'region' as const, value: 'amer', label: 'AMER' };
export const SEGMENT_B = { type: 'region' as const, value: 'emea', label: 'EMEA' };

export const COMPARATIVE_METRICS = [
    { metric: 'ARR', category: 'Revenue' as const, valueA: '$212M', valueB: '$198M', deltaAbs: '+$14M', deltaPct: 7.1, interpretation: 'A_better' as const, significant: false },
    { metric: 'NRR', category: 'Retention' as const, valueA: '114%', valueB: '107%', deltaAbs: '+7pp', deltaPct: 6.5, interpretation: 'A_better' as const, significant: false },
    { metric: 'Pipeline Coverage', category: 'Revenue' as const, valueA: '3.4x', valueB: '2.9x', deltaAbs: '+0.5x', deltaPct: 17.2, interpretation: 'A_better' as const, significant: true },
    { metric: 'Close Rate', category: 'Efficiency' as const, valueA: '28%', valueB: '22%', deltaAbs: '+6pp', deltaPct: 27.3, interpretation: 'A_better' as const, significant: true },
    { metric: 'Avg Deal Size', category: 'Revenue' as const, valueA: '$84K', valueB: '$94K', deltaAbs: '-$10K', deltaPct: -10.6, interpretation: 'B_better' as const, significant: false },
    { metric: 'Sales Cycle', category: 'Efficiency' as const, valueA: '72 days', valueB: '89 days', deltaAbs: '-17 days', deltaPct: -19.1, interpretation: 'A_better' as const, significant: true },
    { metric: 'Churn Rate', category: 'Retention' as const, valueA: '4.2%', valueB: '6.1%', deltaAbs: '-1.9pp', deltaPct: -31.1, interpretation: 'A_better' as const, significant: true },
    { metric: 'Expansion Revenue', category: 'Revenue' as const, valueA: '22%', valueB: '14%', deltaAbs: '+8pp', deltaPct: 57.1, interpretation: 'A_better' as const, significant: true },
    { metric: 'CAC Payback', category: 'Efficiency' as const, valueA: '8.2 mo', valueB: '11.4 mo', deltaAbs: '-3.2 mo', deltaPct: -28.1, interpretation: 'A_better' as const, significant: true },
    { metric: 'MQL→SQL Rate', category: 'Activity' as const, valueA: '34%', valueB: '29%', deltaAbs: '+5pp', deltaPct: 17.2, interpretation: 'A_better' as const, significant: true },
    { metric: 'Response Time', category: 'Activity' as const, valueA: '2.1 hrs', valueB: '3.8 hrs', deltaAbs: '-1.7 hrs', deltaPct: -44.7, interpretation: 'A_better' as const, significant: true },
    { metric: 'Rep Turnover', category: 'Efficiency' as const, valueA: '12%', valueB: '18%', deltaAbs: '-6pp', deltaPct: -33.3, interpretation: 'A_better' as const, significant: true },
];

export const DUAL_REVENUE_LINE = [
    { x: 'Jan', valueA: 16.2, valueB: 15.1 }, { x: 'Feb', valueA: 16.8, valueB: 15.4 },
    { x: 'Mar', valueA: 17.1, valueB: 15.9 }, { x: 'Apr', valueA: 17.5, valueB: 16.2 },
    { x: 'May', valueA: 17.9, valueB: 16.1 }, { x: 'Jun', valueA: 18.2, valueB: 16.5 },
    { x: 'Jul', valueA: 18.4, valueB: 16.8 }, { x: 'Aug', valueA: 18.8, valueB: 16.7 },
    { x: 'Sep', valueA: 19.1, valueB: 17.0 }, { x: 'Oct', valueA: 19.5, valueB: 17.2 },
    { x: 'Nov', valueA: 19.8, valueB: 17.5 }, { x: 'Dec', valueA: 20.2, valueB: 17.8 },
];

export const DELTA_WATERFALL = [
    { label: 'New Business', deltaValue: 9, type: 'positive' as const },
    { label: 'Expansion Δ', deltaValue: 4, type: 'positive' as const },
    { label: 'Churn Offset', deltaValue: -2, type: 'negative' as const },
    { label: 'NRR Delta', deltaValue: 3, type: 'positive' as const },
    { label: 'Net Delta', deltaValue: 14, type: 'total' as const },
];

export const FUNNEL_A = [
    { label: 'Lead', count: 1240, value: '$124M', conversion: 62 },
    { label: 'Qualified', count: 769, value: '$84M', conversion: 45 },
    { label: 'Proposal', count: 346, value: '$52M', conversion: 68 },
    { label: 'Negotiation', count: 235, value: '$41M', conversion: 82 },
    { label: 'Won', count: 193, value: '$34M', conversion: 100 },
];
export const FUNNEL_B = [
    { label: 'Lead', count: 1080, value: '$108M', conversion: 56 },
    { label: 'Qualified', count: 605, value: '$71M', conversion: 39 },
    { label: 'Proposal', count: 236, value: '$42M', conversion: 62 },
    { label: 'Negotiation', count: 146, value: '$32M', conversion: 76 },
    { label: 'Won', count: 111, value: '$24M', conversion: 100 },
];

export const VARIANCE_BARS = [
    { metric: 'Expansion Rev', delta: 57.1 },
    { metric: 'Response Time', delta: -44.7 },
    { metric: 'Rep Turnover', delta: -33.3 },
    { metric: 'Churn Rate', delta: -31.1 },
    { metric: 'CAC Payback', delta: -28.1 },
    { metric: 'Close Rate', delta: 27.3 },
    { metric: 'Sales Cycle', delta: -19.1 },
];

export const TOP_DELTAS = [
    { metric: 'NRR', valueA: '114%', valueB: '107%', delta: '+7pp ↑', direction: 'positive' as const },
    { metric: 'Pipeline Coverage', valueA: '3.4x', valueB: '2.9x', delta: '+0.5x ↑', direction: 'positive' as const },
    { metric: 'Close Rate', valueA: '28%', valueB: '22%', delta: '+6pp ↑', direction: 'positive' as const },
];

// Cohort retention data
export const COHORT_RETENTION_A = [
    { cohort: 'Q1 2024', m3: 94, m6: 89, m12: 82 },
    { cohort: 'Q2 2024', m3: 92, m6: 87, m12: 80 },
    { cohort: 'Q3 2024', m3: 95, m6: 91, m12: 84 },
    { cohort: 'Q4 2024', m3: 93, m6: 88, m12: 81 },
];
export const COHORT_RETENTION_B = [
    { cohort: 'Q1 2024', m3: 88, m6: 81, m12: 72 },
    { cohort: 'Q2 2024', m3: 86, m6: 79, m12: 70 },
    { cohort: 'Q3 2024', m3: 89, m6: 82, m12: 74 },
    { cohort: 'Q4 2024', m3: 87, m6: 80, m12: 71 },
];

// Sales cycle histogram
export const SALES_CYCLE_HIST = [
    { bucket: '0-30d', countA: 42, countB: 21 },
    { bucket: '31-60d', countA: 68, countB: 38 },
    { bucket: '61-90d', countA: 51, countB: 62 },
    { bucket: '91-120d', countA: 22, countB: 44 },
    { bucket: '120+d', countA: 10, countB: 28 },
];

// Rep scatter data
export const REP_SCATTER = [
    { name: 'J. Miller', deals: 14, arr: 1.8, segment: 'A', size: 128 },
    { name: 'S. Chen', deals: 18, arr: 2.2, segment: 'A', size: 122 },
    { name: 'A. Thompson', deals: 11, arr: 1.5, segment: 'A', size: 136 },
    { name: 'K. Rodriguez', deals: 16, arr: 2.0, segment: 'A', size: 125 },
    { name: 'M. Patel', deals: 22, arr: 2.8, segment: 'A', size: 127 },
    { name: 'D. Williams', deals: 9, arr: 1.2, segment: 'B', size: 133 },
    { name: 'L. Johnson', deals: 12, arr: 1.4, segment: 'B', size: 117 },
    { name: 'R. Davis', deals: 8, arr: 1.1, segment: 'B', size: 138 },
    { name: 'E. Martinez', deals: 14, arr: 1.6, segment: 'B', size: 114 },
    { name: 'P. Wilson', deals: 10, arr: 1.3, segment: 'B', size: 130 },
    { name: 'CashbackPro', deals: 18, arr: 2.4, segment: 'A', size: 185 },
];

// Pipeline mirrored stages
export const MIRRORED_STAGES = [
    { stage: 'Prospecting', countA: 124, countB: 98 },
    { stage: 'Discovery', countA: 89, countB: 72 },
    { stage: 'Demo', countA: 64, countB: 48 },
    { stage: 'Proposal', countA: 45, countB: 38 },
    { stage: 'Negotiation', countA: 28, countB: 21 },
    { stage: 'Close', countA: 18, countB: 12 },
];

// Contact penetration
export const ORG_PENETRATION_A = [
    { account: 'Acme Corp', economic: 2, champion: 3, technical: 4, legal: 1, executive: 2 },
    { account: 'GlobalTech', economic: 3, champion: 2, technical: 5, legal: 2, executive: 1 },
    { account: 'MegaCo', economic: 1, champion: 4, technical: 3, legal: 1, executive: 3 },
    { account: 'TechVault', economic: 2, champion: 2, technical: 6, legal: 0, executive: 1 },
    { account: 'DataPrime', economic: 3, champion: 1, technical: 2, legal: 2, executive: 2 },
];
export const ORG_PENETRATION_B = [
    { account: 'EuroTech', economic: 1, champion: 1, technical: 3, legal: 2, executive: 0 },
    { account: 'Nordic SaaS', economic: 2, champion: 1, technical: 4, legal: 1, executive: 1 },
    { account: 'UK Digital', economic: 1, champion: 2, technical: 2, legal: 1, executive: 0 },
    { account: 'DACH Group', economic: 0, champion: 1, technical: 3, legal: 2, executive: 1 },
    { account: 'FR Systems', economic: 1, champion: 2, technical: 2, legal: 0, executive: 0 },
];

// Channel mix
export const CHANNEL_MIX_A = [
    { channel: 'Email', pct: 34 }, { channel: 'Call', pct: 28 },
    { channel: 'Meeting', pct: 22 }, { channel: 'Social', pct: 10 }, { channel: 'Other', pct: 6 },
];
export const CHANNEL_MIX_B = [
    { channel: 'Email', pct: 42 }, { channel: 'Call', pct: 18 },
    { channel: 'Meeting', pct: 24 }, { channel: 'Social', pct: 12 }, { channel: 'Other', pct: 4 },
];

// Data sync health for integrations
export const SYNC_HEALTH_A = { segment: 'AMER', source: 'Snowflake', lastSync: '4m ago', records: 48291, coverage: 100 };
export const SYNC_HEALTH_B = { segment: 'EMEA', source: 'Snowflake', lastSync: '2h ago', records: 31877, coverage: 94 };

// Integrations
export const BI_INTEGRATIONS = [
    {
        category: 'Data Warehouse', items: [
            { name: 'Snowflake', status: 'connected' as const, desc: 'Enterprise data cloud for structured analytics' },
            { name: 'BigQuery', status: 'connected' as const, desc: 'Google serverless data warehouse' },
            { name: 'Databricks', status: 'available' as const, desc: 'Unified analytics platform for lakehouse' },
            { name: 'Redshift', status: 'available' as const, desc: 'AWS cloud-native data warehouse' },
        ]
    },
    {
        category: 'BI Platforms', items: [
            { name: 'Tableau', status: 'connected' as const, desc: 'Visual analytics and business intelligence' },
            { name: 'Looker', status: 'connected' as const, desc: 'Google Cloud BI and embedded analytics' },
            { name: 'Power BI', status: 'available' as const, desc: 'Microsoft business analytics service' },
            { name: 'Sigma', status: 'available' as const, desc: 'Cloud-first analytics and BI platform' },
        ]
    },
    {
        category: 'CRM Core', items: [
            { name: 'Salesforce', status: 'connected' as const, desc: 'CRM platform — source of truth for opportunities' },
            { name: 'HubSpot', status: 'available' as const, desc: 'Inbound marketing and sales platform' },
        ]
    },
    {
        category: 'ETL', items: [
            { name: 'dbt', status: 'connected' as const, desc: 'SQL-first transformation framework' },
            { name: 'Fivetran', status: 'connected' as const, desc: 'Automated data pipeline infrastructure' },
            { name: 'Airbyte', status: 'available' as const, desc: 'Open-source data integration engine' },
        ]
    },
];

// Pricing
export const COMPARISON_PLANS = [
    {
        name: 'Dual Analytics Core', price: { monthly: 299, annual: 239 },
        desc: '2 segments, 3 data sources — everything you need for A vs B analysis.',
        features: [
            { label: 'Two-segment comparison', included: true },
            { label: '3 data source connections', included: true },
            { label: 'Delta waterfall chart', included: true },
            { label: 'Side-by-side funnel', included: true },
            { label: 'Multi-segment modeling', included: false },
            { label: 'Custom segmentation', included: false },
        ],
    },
    {
        name: 'Multi-Segment Intelligence', price: { monthly: 899, annual: 719 },
        desc: 'Up to 8 segments with unlimited data sources — real competitive analysis.',
        features: [
            { label: 'Up to 8 segments', included: true },
            { label: 'Unlimited data sources', included: true },
            { label: 'Variance-triggered automation', included: true },
            { label: 'Comparative brief exports', included: true },
            { label: 'Cohort retention comparison', included: true },
            { label: 'Custom segmentation logic', included: true },
        ],
    },
    {
        name: 'Enterprise Modeling Engine', price: { monthly: null, annual: null },
        desc: 'Unlimited segments + custom predictive models + dedicated analyst support.',
        features: [
            { label: 'Unlimited segments', included: true },
            { label: 'Custom predictive models', included: true },
            { label: 'Dedicated analyst support', included: true },
            { label: 'Custom data connectors', included: true },
            { label: 'White-label exports', included: true },
            { label: 'SLA guarantee', included: true },
        ],
    },
];

// Reports
export const COMPARATIVE_REPORTS = [
    { id: 'region-summary', name: 'Region A vs B Summary', icon: '📊', desc: 'All 12 metrics + delta waterfall + dual funnel visualization.', frequency: 'Weekly' },
    { id: 'product-line', name: 'Product Line Comparison', icon: '📦', desc: 'Revenue composition stacked + cohort retention delta analysis.', frequency: 'Monthly' },
    { id: 'cohort-delta', name: 'Cohort Retention Delta', icon: '📈', desc: 'Side-by-side cohort grids with delta annotations per period.', frequency: 'Quarterly' },
    { id: 'forecast-model', name: 'Forecast Model Comparison', icon: '🎯', desc: 'Projection accuracy trend for A and B + model confidence.', frequency: 'Monthly' },
    { id: 'rep-productivity', name: 'Producer Productivity', icon: '👤', desc: 'Producer scatter colored by segment + productivity histogram.', frequency: 'Weekly' },
    { id: 'margin-diff', name: 'Margin Differential', icon: '💰', desc: 'Revenue per unit A vs B + sales cycle cost analysis.', frequency: 'Monthly' },
];

// Automation rules
export const VARIANCE_RULES = [
    { id: 'delta-alert', name: 'Delta Alert', status: 'active', trigger: 'Any metric delta exceeds configured threshold', actions: ['Detect delta spike', 'Notify RevOps lead', 'Log variance event'], executions: 142, lastRun: '2h ago' },
    { id: 'close-rate-gap', name: 'Close Rate Gap Trigger', status: 'active', trigger: 'A/B close rate gap widens >5pp week-over-week', actions: ['Flag for manager review', 'Generate comparison brief', 'Schedule 1:1'], executions: 28, lastRun: '1d ago' },
    { id: 'producer-variance', name: 'Producer Variance Feed', status: 'active', trigger: 'Rep productivity gap between segments >20%', actions: ['Trigger manager review', 'Generate coaching brief', 'Update segment report'], executions: 67, lastRun: '3h ago' },
    { id: 'forecast-diverge', name: 'Forecast Accuracy Divergence', status: 'active', trigger: 'Projection model accuracy diverges >8pp', actions: ['Alert model owner', 'Trigger recalibration', 'Generate drift report'], executions: 12, lastRun: '2d ago' },
    { id: 'coverage-imbalance', name: 'Pipeline Coverage Imbalance', status: 'active', trigger: 'One segment drops to <2.5x coverage', actions: ['Enable reallocation workflow', 'Notify territory lead', 'Update capacity plan'], executions: 34, lastRun: '6h ago' },
];
