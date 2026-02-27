import type { MetricData, PipelineStage, ContactRecord, ActivityLog, PricingTier } from './types';

export const SAMPLE_METRICS: MetricData[] = [
    { label: 'Annual Recurring Revenue', value: '$18.4M', change: '+23% YoY', trend: 'up' },
    { label: 'Win Rate', value: '41.2%', change: '+6.1pp', trend: 'up' },
    { label: 'Avg Deal Size', value: '$42,800', change: '+18%', trend: 'up' },
    { label: 'Sales Cycle Length', value: '38 days', change: '-14%', trend: 'up' },
    { label: 'Customer Acquisition Cost', value: '$4,840', change: '-12%', trend: 'down' },
    { label: 'Pipeline Coverage', value: '3.8x', change: '+0.4x', trend: 'up' },
];

export const SAMPLE_PIPELINE: PipelineStage[] = [
    { name: 'Prospecting', count: 124, value: '$3.1M', percentage: 20 },
    { name: 'Qualification', count: 87, value: '$2.4M', percentage: 15 },
    { name: 'Demo', count: 52, value: '$2.1M', percentage: 35 },
    { name: 'Proposal', count: 34, value: '$1.7M', percentage: 55 },
    { name: 'Negotiation', count: 18, value: '$1.2M', percentage: 80 },
    { name: 'Closed Won', count: 12, value: '$840K', percentage: 100 },
];

export const SAMPLE_CONTACTS: ContactRecord[] = [
    { id: 'c1', name: 'Alexandra Chen', company: 'Meridian Corp', role: 'VP of Operations', status: 'Active', value: '$280,000', lastContact: '2 days ago' },
    { id: 'c2', name: 'Marcus Webb', company: 'Axon Systems', role: 'CTO', status: 'Lead', value: '$140,000', lastContact: '5 days ago' },
    { id: 'c3', name: 'Sophia Laurent', company: 'Corvus Data', role: 'Director of IT', status: 'Prospect', value: '$95,000', lastContact: '1 week ago' },
    { id: 'c4', name: 'James Okafor', company: 'Vantage Analytics', role: 'CEO', status: 'Active', value: '$410,000', lastContact: 'Today' },
    { id: 'c5', name: 'Priya Sharma', company: 'CashbackPro', role: 'Head of Partnerships', status: 'Active', value: '$185,000', lastContact: '1 day ago' },
    { id: 'c6', name: 'Elena Rodriguez', company: 'Nexova Industries', role: 'CFO', status: 'Churned', value: '$220,000', lastContact: '3 months ago' },
];

export const SAMPLE_ACTIVITY: ActivityLog[] = [
    { id: 'a1', type: 'call', description: 'Discovery call with Alexandra Chen — confirmed budget and timeline', timestamp: '10:24 AM', user: 'S. Park' },
    { id: 'a2', type: 'email', description: 'Proposal sent to Axon Systems — 3 tiers reviewed', timestamp: '9:02 AM', user: 'R. Torres' },
    { id: 'a3', type: 'meeting', description: 'Quarterly business review with Vantage Analytics', timestamp: 'Yesterday', user: 'D. Kim' },
    { id: 'a4', type: 'deal', description: 'Corvus Data advanced to Proposal stage — $95K ACV', timestamp: 'Yesterday', user: 'S. Park' },
    { id: 'a5', type: 'deal', description: 'CashbackPro partnership deal moved to Negotiation — $185K ACV', timestamp: 'Yesterday', user: 'A. Verma' },
    { id: 'a6', type: 'note', description: 'Meridian Corp: Champion contact changed to VP Finance — update strategy', timestamp: '2 days ago', user: 'R. Torres' },
];

export const TEMPLATE_PRICING: PricingTier[] = [
    {
        name: 'Growth',
        price: '$79',
        period: '/month',
        description: 'For growing sales teams building their first structured revenue process.',
        features: ['Up to 10 users', '5,000 contacts', 'AI deal scoring', 'Pipeline analytics', 'Email integration', 'Standard support'],
        highlighted: false,
        cta: 'Start Free Trial',
    },
    {
        name: 'Scale',
        price: '$199',
        period: '/month',
        description: 'For established revenue teams that need predictive intelligence and automation.',
        features: ['Up to 50 users', '50,000 contacts', 'Predictive forecasting', 'Behavioral analytics', 'Workflow automation', 'API access', 'Priority support'],
        highlighted: true,
        cta: 'Start Free Trial',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For organizations with complex infrastructure and compliance requirements.',
        features: ['Unlimited users', 'Unlimited contacts', 'Custom AI models', 'SSO / SAML', 'Custom SLA', 'Dedicated CSM', 'On-premise option'],
        highlighted: false,
        cta: 'Contact Sales',
    },
];

export const AI_FEATURES = [
    { id: 'forecast', title: 'Predictive Forecasting', desc: 'LSTM models predict deal outcomes 90 days out with 94% accuracy.' },
    { id: 'scoring', title: 'AI Deal Scoring', desc: '40+ behavioral signals processed hourly into actionable deal health scores.' },
    { id: 'clv', title: 'Customer Lifetime Value', desc: 'Expansion probability modeling for every account in your book.' },
    { id: 'workflow', title: 'Automation Engine', desc: 'No-code workflow builder for multi-step revenue process orchestration.' },
    { id: 'behavioral', title: 'Behavioral Analytics', desc: 'Buyer intent profiling across email, calls, and web sessions.' },
    { id: 'attribution', title: 'Revenue Attribution', desc: 'Shapley value attribution across every marketing and sales touchpoint.' },
];

export const INTEGRATIONS = [
    { cat: 'Communication', items: ['Salesforce', 'HubSpot', 'Outreach', 'Salesloft', 'Apollo'] },
    { cat: 'Data & Analytics', items: ['Snowflake', 'Databricks', 'Looker', 'Tableau', 'PowerBI'] },
    { cat: 'Productivity', items: ['Slack', 'Teams', 'Notion', 'Linear', 'Jira'] },
    { cat: 'Finance', items: ['Stripe', 'Chargebee', 'CashbackPro', 'Zuora', 'QuickBooks'] },
];

export const CASE_STUDIES = [
    {
        id: 'meridian',
        company: 'Meridian Corp',
        industry: 'Financial Services',
        result: '43% increase in win rate',
        detail: 'Deployed PROTOCOL_ZERO AI deal scoring across 120-rep enterprise sales team. Win rate improved from 29% to 43% within 90 days of deployment.',
        metrics: [{ l: 'Win Rate Lift', v: '+43%' }, { l: 'Ramp Time', v: '-28 days' }, { l: 'ARR Impact', v: '+$4.2M' }],
    },
    {
        id: 'axon',
        company: 'Axon Systems',
        industry: 'Enterprise Technology',
        result: '3.2x pipeline coverage improvement',
        detail: 'Replaced manual forecasting with predictive models. Pipeline accuracy moved from 58% to 92%. Management now commits forecasts with confidence.',
        metrics: [{ l: 'Forecast Accuracy', v: '92%' }, { l: 'Pipeline Coverage', v: '3.2x' }, { l: 'Deal Velocity', v: '+31%' }],
    },
    {
        id: 'corvus',
        company: 'Corvus Data',
        industry: 'Data Infrastructure',
        result: '$12M ARR on 22-person team',
        detail: 'Scaled from $4M to $12M ARR without adding headcount. Workflow automation handled 60% of SDR prospecting sequences.',
        metrics: [{ l: 'ARR Growth', v: '3x' }, { l: 'Efficiency', v: '+60%' }, { l: 'Headcount Added', v: '0' }],
    },
];
