// CRM-12: Obsidian Operations — Revenue Operations Data

export const OPS_STATUS = {
    engineStatus: 'OPTIMIZED',
    capacityPct: 82,
    revenuePerRep: '$1.84M',
    activeProducers: 29,
    cacPayback: '9.4 mo',
};

export const HERO_METRICS = [
    { label: 'Revenue / Producer', value: '$1.84M', icon: '💰' },
    { label: 'Capacity Utilization', value: '82%', icon: '⚙️' },
    { label: 'CAC Payback Period', value: '9.4 mo', icon: '📈' },
];

export const SECONDARY_METRICS = [
    { label: 'Headcount Efficiency', value: '$184K ARR/FTE' },
    { label: 'Pipeline per Producer', value: '$4.2M avg' },
    { label: 'Quota Coverage', value: '3.4x' },
    { label: 'Avg Ramp Time', value: '4.5 months' },
    { label: 'Territory Coverage', value: '78%' },
];

export const CAPACITY_MATRIX = [
    { team: 'North America East', headcount: 8, arr: '$14.2M', utilization: 92, pipelineCov: 3.8, efficiency: 87, ramp: 'Ramped' as const },
    { team: 'North America West', headcount: 6, arr: '$10.8M', utilization: 88, pipelineCov: 3.2, efficiency: 82, ramp: 'Ramped' as const },
    { team: 'EMEA Enterprise', headcount: 5, arr: '$7.4M', utilization: 74, pipelineCov: 2.9, efficiency: 71, ramp: 'Ramping' as const },
    { team: 'APAC Growth', headcount: 4, arr: '$5.2M', utilization: 65, pipelineCov: 2.4, efficiency: 62, ramp: 'Ramping' as const },
    { team: 'Strategic Accounts', headcount: 3, arr: '$8.9M', utilization: 96, pipelineCov: 4.2, efficiency: 91, ramp: 'Ramped' as const },
    { team: 'Expansion Team', headcount: 2, arr: '$3.8M', utilization: 78, pipelineCov: 3.1, efficiency: 76, ramp: 'Onboarding' as const },
    { team: 'SMB Velocity', headcount: 4, arr: '$4.1M', utilization: 58, pipelineCov: 2.1, efficiency: 55, ramp: 'Ramped' as const },
    { team: 'Partner Channel', headcount: 2, arr: '$2.1M', utilization: 52, pipelineCov: 1.8, efficiency: 48, ramp: 'Ramping' as const },
];

export const ARR_PER_PRODUCER_TREND = [
    { quarter: 'Q1 23', value: 1.42, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q2 23', value: 1.51, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q3 23', value: 1.58, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q4 23', value: 1.65, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q1 24', value: 1.71, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q2 24', value: 1.78, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q3 24', value: 1.82, optimal: { low: 1.3, high: 1.8 } },
    { quarter: 'Q4 24', value: 1.84, optimal: { low: 1.3, high: 1.8 } },
];

export const HEADCOUNT_SCATTER = [
    { team: 'NA East', headcount: 8, arr: 14.2, dealSize: 128 },
    { team: 'NA West', headcount: 6, arr: 10.8, dealSize: 118 },
    { team: 'EMEA', headcount: 5, arr: 7.4, dealSize: 94 },
    { team: 'APAC', headcount: 4, arr: 5.2, dealSize: 82 },
    { team: 'Strategic', headcount: 3, arr: 8.9, dealSize: 186 },
    { team: 'Expansion', headcount: 2, arr: 3.8, dealSize: 112 },
    { team: 'SMB', headcount: 4, arr: 4.1, dealSize: 48 },
    { team: 'Partner', headcount: 2, arr: 2.1, dealSize: 64 },
];

export const CAC_PAYBACK = Array.from({ length: 24 }, (_, i) => ({
    month: i + 1,
    cost: 42000,
    revenue: Math.min(i * 4800, 86000),
}));

export const ARR_WATERFALL = [
    { label: 'Begin ARR', value: 48, type: 'start' as const },
    { label: 'New Deals', value: 12, type: 'positive' as const },
    { label: 'Expansion', value: 8, type: 'positive' as const },
    { label: 'Contraction', value: -2, type: 'negative' as const },
    { label: 'Churn', value: -4, type: 'negative' as const },
    { label: 'Net ARR', value: 62, type: 'total' as const },
];

export const NRR_TREND = [
    { quarter: 'Q1 23', value: 108 }, { quarter: 'Q2 23', value: 110 },
    { quarter: 'Q3 23', value: 112 }, { quarter: 'Q4 23', value: 114 },
    { quarter: 'Q1 24', value: 113 }, { quarter: 'Q2 24', value: 116 },
    { quarter: 'Q3 24', value: 118 }, { quarter: 'Q4 24', value: 119 },
];

export const RAMP_COHORT = [
    { quarter: 'Q1 23', m1: 8, m2: 22, m3: 42, m4: 65, m5: 82, m6: 94, m12: 100 },
    { quarter: 'Q2 23', m1: 10, m2: 25, m3: 48, m4: 68, m5: 85, m6: 96, m12: 100 },
    { quarter: 'Q3 23', m1: 12, m2: 28, m3: 52, m4: 72, m5: 88, m6: 98, m12: 100 },
    { quarter: 'Q4 23', m1: 9, m2: 24, m3: 45, m4: 64, m5: 80, m6: 92, m12: 100 },
    { quarter: 'Q1 24', m1: 11, m2: 30, m3: 55, m4: 74, m5: 90, m6: 97, m12: 100 },
    { quarter: 'Q2 24', m1: 14, m2: 32, m3: 58, m4: 76, m5: 91, m6: 98, m12: null },
    { quarter: 'Q3 24', m1: 15, m2: 35, m3: 60, m4: 78, m5: null, m6: null, m12: null },
    { quarter: 'Q4 24', m1: 13, m2: 28, m3: null, m4: null, m5: null, m6: null, m12: null },
];

export const TERRITORY_COVERAGE = [
    { territory: 'NA East', q1: 3.8, q2: 3.9, q3: 4.0, q4: 3.8, q5: 4.1, q6: 3.9 },
    { territory: 'NA West', q1: 3.2, q2: 3.0, q3: 3.4, q4: 3.2, q5: 3.5, q6: 3.3 },
    { territory: 'EMEA', q1: 2.4, q2: 2.6, q3: 2.9, q4: 2.7, q5: 2.8, q6: 2.9 },
    { territory: 'APAC', q1: 1.8, q2: 2.0, q3: 2.2, q4: 2.4, q5: 2.1, q6: 2.3 },
    { territory: 'LATAM', q1: 1.4, q2: 1.6, q3: 1.8, q4: 1.9, q5: 2.0, q6: 1.7 },
    { territory: 'MEA', q1: 1.2, q2: 1.3, q3: 1.5, q4: 1.4, q5: 1.6, q6: 1.5 },
];

export const CAPACITY_FUNNEL = [
    { label: 'Prospecting', count: 428, value: '$42.8M', conversion: 58 },
    { label: 'Qualifying', count: 248, value: '$31.2M', conversion: 52 },
    { label: 'Proposing', count: 129, value: '$22.1M', conversion: 74 },
    { label: 'Negotiating', count: 95, value: '$18.6M', conversion: 86 },
    { label: 'Won', count: 82, value: '$16.2M', conversion: 100 },
];

export const PRODUCER_LOAD = [
    { name: 'Sarah Chen', pipeline: 5.8 },
    { name: 'Mike Ross', pipeline: 5.2 },
    { name: 'Lisa Park', pipeline: 4.8 },
    { name: 'James Wilson', pipeline: 4.6 },
    { name: 'Anna Kim', pipeline: 4.2 },
    { name: 'David Lee', pipeline: 3.9 },
    { name: 'Rachel Green', pipeline: 3.4 },
    { name: 'Tom Brown', pipeline: 2.8 },
    { name: 'Emily Davis', pipeline: 2.4 },
    { name: 'Chris Taylor', pipeline: 1.8 },
];

export const ACCOUNT_CONTRIBUTION = [
    { name: 'TechCorp Industries', arr: 624 },
    { name: 'GlobalData Systems', arr: 512 },
    { name: 'CloudVault Corp', arr: 398 },
    { name: 'Nexus Platforms', arr: 342 },
    { name: 'DataFlow Inc', arr: 298 },
    { name: 'Apex Software', arr: 264 },
    { name: 'Prism Analytics', arr: 218 },
    { name: 'Quantum Labs', arr: 186 },
    { name: 'Vertex Solutions', arr: 164 },
    { name: 'Delta Corp', arr: 142 },
    { name: 'CashbackPro', arr: 185 },
];

export const RAMP_PRODUCERS = [
    { name: 'J. Cooper', startDate: '0', rampEndDate: '4.5', currentProductivity: 100, status: 'ramped' as const },
    { name: 'S. Martinez', startDate: '0', rampEndDate: '4.2', currentProductivity: 92, status: 'ramped' as const },
    { name: 'T. Anderson', startDate: '0', rampEndDate: '5.0', currentProductivity: 78, status: 'ramping' as const },
    { name: 'K. Nakamura', startDate: '0', rampEndDate: '4.8', currentProductivity: 65, status: 'ramping' as const },
    { name: 'L. Williams', startDate: '0', rampEndDate: '4.0', currentProductivity: 45, status: 'ramping' as const },
    { name: 'R. Patel', startDate: '0', rampEndDate: '5.5', currentProductivity: 28, status: 'onboarding' as const },
    { name: 'M. Chen', startDate: '0', rampEndDate: '4.5', currentProductivity: 15, status: 'onboarding' as const },
    { name: 'A. Johnson', startDate: '0', rampEndDate: '4.0', currentProductivity: 88, status: 'ramped' as const },
    { name: 'E. Thompson', startDate: '0', rampEndDate: '6.0', currentProductivity: 0, status: 'attrite' as const },
    { name: 'D. Garcia', startDate: '0', rampEndDate: '4.5', currentProductivity: 52, status: 'ramping' as const },
];

export const SCENARIOS = [
    { name: 'Conservative', headcount: 32, quota: '$1.6M', territory: 6, projectedArr: '$51.2M', utilization: 75 },
    { name: 'Base', headcount: 35, quota: '$1.8M', territory: 8, projectedArr: '$63.0M', utilization: 82 },
    { name: 'Aggressive', headcount: 42, quota: '$2.0M', territory: 10, projectedArr: '$84.0M', utilization: 90 },
];

export const OPS_REPORTS = [
    { id: 'capacity', name: 'Capacity Planning Report', icon: '📊', desc: 'Headcount vs revenue scatter + ramp cohort + coverage by territory + scenario projections.', frequency: 'Monthly' },
    { id: 'efficiency', name: 'Headcount Efficiency Report', icon: '⚡', desc: 'Revenue per FTE trend + cohort ramp analysis + efficiency index distribution.', frequency: 'Weekly' },
    { id: 'territory', name: 'Territory Coverage Analysis', icon: '🗺️', desc: 'Coverage heatmap + underserved territories + reallocation recommendations.', frequency: 'Monthly' },
    { id: 'mix', name: 'Revenue Mix Report', icon: '📦', desc: 'New vs expansion vs renewal waterfall + mix trend over 8 quarters.', frequency: 'Quarterly' },
    { id: 'cac', name: 'CAC & Payback Analysis', icon: '💰', desc: 'Payback curve + CAC trend + LTV:CAC ratio per segment.', frequency: 'Monthly' },
    { id: 'ramp', name: 'Ramp Performance Report', icon: '🚀', desc: 'Ramp timeline chart + cohort comparison + time-to-productivity by hire quarter.', frequency: 'Monthly' },
];

export const OPS_RULES = [
    { id: 'hiring', name: 'Hiring Alert Trigger', status: 'active', trigger: 'Territory coverage drops below 2.5x', actions: ['Trigger hiring request workflow', 'Notify territory lead', 'Update capacity plan'], executions: 18, lastRun: '12h ago' },
    { id: 'rebalance', name: 'Territory Rebalance', status: 'active', trigger: 'Producer utilization >95% in one territory AND <60% in another', actions: ['Flag for territory review', 'Generate rebalance report', 'Alert RevOps lead'], executions: 42, lastRun: '4h ago' },
    { id: 'ramp-milestone', name: 'Ramp Milestone Check', status: 'active', trigger: 'Producer hits month 3/4/5 ramp checkpoint', actions: ['Remind manager to assess', 'Generate coaching brief', 'Update ramp tracker'], executions: 156, lastRun: '2h ago' },
    { id: 'cac-spike', name: 'CAC Spike Alert', status: 'active', trigger: 'CAC payback period extends >2 months from target', actions: ['Notify Revenue Strategy lead', 'Generate CAC analysis', 'Flag for review'], executions: 8, lastRun: '3d ago' },
    { id: 'projection', name: 'Capacity Projection Alert', status: 'active', trigger: 'Operational projection accuracy drops >10% from baseline', actions: ['Trigger model recalibration', 'Alert data team', 'Generate drift report'], executions: 14, lastRun: '1d ago' },
];

export const OPS_INTEGRATIONS = [
    {
        category: 'HR Systems', items: [
            { name: 'Workday', status: 'connected' as const, desc: 'Headcount data, performance reviews, and comp benchmarks' },
            { name: 'BambooHR', status: 'connected' as const, desc: 'Employee lifecycle and ramp tracking data sync' },
            { name: 'Greenhouse', status: 'available' as const, desc: 'Hiring pipeline and candidate stage tracking' },
        ]
    },
    {
        category: 'ERP Systems', items: [
            { name: 'SAP', status: 'connected' as const, desc: 'Revenue actuals, financial reporting, and cost center sync' },
            { name: 'Oracle NetSuite', status: 'available' as const, desc: 'Financial management and operational analytics' },
        ]
    },
    {
        category: 'BI Platforms', items: [
            { name: 'Tableau', status: 'connected' as const, desc: 'RevOps dashboards and executive capacity reports' },
            { name: 'Power BI', status: 'connected' as const, desc: 'Embedded operational analytics and KPI tracking' },
            { name: 'Looker', status: 'available' as const, desc: 'Self-service analytics for capacity modeling' },
        ]
    },
    {
        category: 'Marketing', items: [
            { name: 'HubSpot', status: 'connected' as const, desc: 'CAC attribution and marketing spend correlation' },
            { name: 'Marketo', status: 'available' as const, desc: 'Lead-to-revenue attribution for efficiency scoring' },
        ]
    },
    {
        category: 'Data Warehouse', items: [
            { name: 'Snowflake', status: 'connected' as const, desc: 'Central data backbone for capacity modeling and scenario analysis' },
            { name: 'BigQuery', status: 'available' as const, desc: 'Google Cloud data warehouse for ML-powered projections' },
        ]
    },
];

export const OPS_PLANS = [
    {
        name: 'RevOps Core', price: { monthly: 499, annual: 399 },
        desc: 'Up to 50 producers with standard capacity model — ideal for growing teams.',
        features: [
            { label: 'Up to 50 revenue producers', included: true },
            { label: 'Capacity utilization tracking', included: true },
            { label: 'Territory coverage heatmap', included: true },
            { label: 'Standard ramp timeline', included: true },
            { label: 'Scenario modeling', included: false },
            { label: 'Custom capacity models', included: false },
        ],
    },
    {
        name: 'Capacity Intelligence', price: { monthly: 1400, annual: 1120 },
        desc: 'Up to 200 producers + scenario modeling — full operational intelligence.',
        features: [
            { label: 'Up to 200 revenue producers', included: true },
            { label: 'Multi-scenario modeling engine', included: true },
            { label: 'Ramp cohort analysis', included: true },
            { label: 'CAC payback optimization', included: true },
            { label: 'Capacity planning sliders', included: true },
            { label: 'Automated territory rebalancing', included: true },
        ],
    },
    {
        name: 'Enterprise Strategy', price: { monthly: null, annual: null },
        desc: 'Custom models + dedicated RevOps consultant — strategic capacity planning.',
        features: [
            { label: 'Unlimited producers', included: true },
            { label: 'Custom ML capacity models', included: true },
            { label: 'Dedicated RevOps consultant', included: true },
            { label: 'Board-ready capacity reports', included: true },
            { label: 'Custom data connectors', included: true },
            { label: 'SLA & uptime guarantee', included: true },
        ],
    },
];
