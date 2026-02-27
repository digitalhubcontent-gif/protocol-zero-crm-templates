/**
 * CRM-03 — Financial Intelligence
 * Template-specific sample data
 * Financial terminology: Deal→Revenue Instrument, Pipeline→Exposure Book, Contact→Authorized Representative
 */

// ─── CANDLESTICK (Weekly Revenue Variance) ────────────────────────────────────
export const CANDLE_DATA = [
    { week: 'W1', open: -0.8, close: 1.2, high: 2.1, low: -1.4 },
    { week: 'W2', open: 1.2, close: 2.8, high: 3.6, low: 0.8 },
    { week: 'W3', open: 2.8, close: 1.4, high: 3.1, low: 0.6 },
    { week: 'W4', open: 1.4, close: -0.4, high: 2.0, low: -1.2 },
    { week: 'W5', open: -0.4, close: 0.9, high: 1.8, low: -1.0 },
    { week: 'W6', open: 0.9, close: 2.4, high: 3.2, low: 0.4 },
    { week: 'W7', open: 2.4, close: 3.8, high: 4.4, low: 1.9 },
    { week: 'W8', open: 3.8, close: 2.2, high: 4.1, low: 1.8 },
    { week: 'W9', open: 2.2, close: 3.1, high: 3.9, low: 1.6 },
    { week: 'W10', open: 3.1, close: 4.2, high: 5.0, low: 2.6 },
    { week: 'W11', open: 4.2, close: 3.4, high: 4.8, low: 3.0 },
    { week: 'W12', open: 3.4, close: 4.6, high: 5.2, low: 3.0 },
];

// ─── TREEMAP (Revenue by Sector + Risk Score) ─────────────────────────────────
export const SECTOR_TREEMAP = [
    { id: 'tech', label: 'Technology', value: 164, riskScore: 4, arr: '$164M' },
    { id: 'fin', label: 'Financial Services', value: 118, riskScore: 6, arr: '$118M' },
    { id: 'health', label: 'Healthcare', value: 84, riskScore: 3, arr: '$84M' },
    { id: 'energy', label: 'Energy', value: 56, riskScore: 7, arr: '$56M' },
    { id: 'mfg', label: 'Manufacturing', value: 38, riskScore: 8, arr: '$38M' },
    { id: 'other', label: 'Other', value: 22, riskScore: 5, arr: '$22M' },
];

// ─── WATERFALL (ARR Bridge) ───────────────────────────────────────────────────
export const ARR_WATERFALL = [
    { label: 'Booked ARR', value: 482, type: 'base' },
    { label: 'Expansion', value: 28, type: 'positive' },
    { label: 'Contraction', value: -12, type: 'negative' },
    { label: 'Attrition Risk', value: -8, type: 'negative' },
    { label: 'Projected Earnings', value: 490, type: 'total' },
];

// ─── SCENARIOS ────────────────────────────────────────────────────────────────
export const SCENARIOS = {
    base: {
        forecastVariance: '+1.8%', volatilityIndex: '0.27', contractedARR: '$482M',
        revenueAtRisk: '$31.4M', deferredExposure: '$18.2M', nrr: '118%',
        avgContractTerm: '28.4 mo', liquidityHorizon: '14.6 mo',
    },
    conservative: {
        forecastVariance: '-2.1%', volatilityIndex: '0.41', contractedARR: '$410M',
        revenueAtRisk: '$48.6M', deferredExposure: '$22.4M', nrr: '104%',
        avgContractTerm: '26.1 mo', liquidityHorizon: '11.2 mo',
    },
    aggressive: {
        forecastVariance: '+6.4%', volatilityIndex: '0.18', contractedARR: '$578M',
        revenueAtRisk: '$22.1M', deferredExposure: '$13.6M', nrr: '134%',
        avgContractTerm: '31.8 mo', liquidityHorizon: '18.4 mo',
    },
};

// ─── REVENUE INSTRUMENT LEDGER ────────────────────────────────────────────────
export const INSTRUMENT_LEDGER = [
    { id: 'RI-0841', counterparty: 'Cortex Systems LLC', arr: 42.8, term: 36, rating: 'AAA', remaining: 28, renewalProb: 94, exposureScore: 18 },
    { id: 'RI-0392', counterparty: 'Helios Capital Group', arr: 38.4, term: 24, rating: 'AA', remaining: 11, renewalProb: 62, exposureScore: 71 },
    { id: 'RI-0217', counterparty: 'Axiom Financial Corp', arr: 31.2, term: 12, rating: 'BBB', remaining: 4, renewalProb: 48, exposureScore: 88 },
    { id: 'RI-0654', counterparty: 'Meridian Health Sys', arr: 28.6, term: 36, rating: 'AA', remaining: 22, renewalProb: 87, exposureScore: 24 },
    { id: 'RI-0731', counterparty: 'Novu Technologies', arr: 24.1, term: 24, rating: 'A', remaining: 18, renewalProb: 79, exposureScore: 31 },
    { id: 'RI-0118', counterparty: 'Vanta Industries', arr: 19.8, term: 60, rating: 'BB', remaining: 44, renewalProb: 72, exposureScore: 45 },
    { id: 'RI-0956', counterparty: 'Quantum Dynamics Inc', arr: 17.4, term: 12, rating: 'B', remaining: 3, renewalProb: 34, exposureScore: 92 },
    { id: 'RI-0482', counterparty: 'Sentinel Solutions', arr: 14.2, term: 24, rating: 'CCC', remaining: 8, renewalProb: 28, exposureScore: 96 },
    { id: 'RI-0339', counterparty: 'Atlas Biomedical', arr: 12.8, term: 36, rating: 'A', remaining: 31, renewalProb: 91, exposureScore: 14 },
    { id: 'RI-0635', counterparty: 'CashbackPro Technologies', arr: 18.6, term: 24, rating: 'AA', remaining: 18, renewalProb: 88, exposureScore: 22 },
    { id: 'RI-0621', counterparty: 'Pinnacle Logistics', arr: 10.3, term: 12, rating: 'BB', remaining: 7, renewalProb: 55, exposureScore: 68 },
];

// ─── COHORT RETENTION (NRR %) ─────────────────────────────────────────────────
export const COHORT_DATA = [
    { cohort: "Q1'23", q0: 100, q1: 112, q2: 124, q3: 131, q4: 128, q5: 119, q6: 114, q7: 108 },
    { cohort: "Q2'23", q0: 100, q1: 108, q2: 118, q3: 122, q4: 116, q5: 110, q6: 104, q7: null },
    { cohort: "Q3'23", q0: 100, q1: 114, q2: 126, q3: 134, q4: 128, q5: 122, q6: null, q7: null },
    { cohort: "Q4'23", q0: 100, q1: 106, q2: 112, q3: 108, q4: 102, q5: null, q6: null, q7: null },
    { cohort: "Q1'24", q0: 100, q1: 116, q2: 128, q3: 136, q4: null, q5: null, q6: null, q7: null },
    { cohort: "Q2'24", q0: 100, q1: 110, q2: 118, q3: null, q4: null, q5: null, q6: null, q7: null },
    { cohort: "Q3'24", q0: 100, q1: 118, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null },
    { cohort: "Q4'24", q0: 100, q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null },
];

// ─── TORNADO CHART data ───────────────────────────────────────────────────────
export const TORNADO_DATA = [
    { label: 'New Instrument Volume', downside: -18.4, base: 490, upside: 24.6 },
    { label: 'Attrition Risk Rate', downside: -14.2, base: 490, upside: 8.1 },
    { label: 'Avg Contract Term', downside: -9.6, base: 490, upside: 12.4 },
    { label: 'Expansion Rate', downside: -6.2, base: 490, upside: 16.8 },
    { label: 'FX Impact (USD/EUR)', downside: -4.8, base: 490, upside: 3.6 },
];

// ─── CURRENCY TICKER ─────────────────────────────────────────────────────────
export const CURRENCY_PAIRS = [
    { pair: 'USD/EUR', rate: '0.9218', change: '-0.0008', dir: 'down' },
    { pair: 'USD/GBP', rate: '0.7892', change: '+0.0012', dir: 'up' },
    { pair: 'USD/SGD', rate: '1.3421', change: '+0.0024', dir: 'up' },
    { pair: 'USD/JPY', rate: '149.82', change: '-0.18', dir: 'down' },
];

// ─── AUTHORIZED REPS ─────────────────────────────────────────────────────────
export const AUTHORIZED_REPS = [
    { name: 'Sarah Chen', title: 'CFO', authority: 5, lastEvent: '2 days ago', sentiment: 'Positive', influence: 9.4, champion: true },
    { name: 'Marcus Webb', title: 'VP Finance', authority: 4, lastEvent: '5 days ago', sentiment: 'Neutral', influence: 7.2, champion: false },
    { name: 'Dr. Lisa Park', title: 'General Counsel', authority: 3, lastEvent: '1 week ago', sentiment: 'Positive', influence: 6.8, champion: false },
    { name: 'James Okoye', title: 'Head of Operations', authority: 3, lastEvent: '2 weeks ago', sentiment: 'Cautious', influence: 5.4, champion: false },
    { name: 'Nicole Alvarez', title: 'Dir. Financial Risk', authority: 2, lastEvent: '3 days ago', sentiment: 'Positive', influence: 6.1, champion: true },
];

// ─── AUTOMATION RULES ────────────────────────────────────────────────────────
export const RISK_RULES = [
    { id: 'RR-001', name: 'High Exposure Alert', condition: 'Exposure Score', op: '>', threshold: '75', action: 'Escalate to VP', affected: 3, lastFired: '8h ago', status: 'ACTIVE' },
    { id: 'RR-002', name: 'Low Renewal Probability', condition: 'Renewal Probability', op: '<', threshold: '50%', action: 'Alert Coverage Analyst', affected: 2, lastFired: '1d ago', status: 'ACTIVE' },
    { id: 'RR-003', name: 'Volatility Spike', condition: 'Volatility Index', op: '>', threshold: '0.40', action: 'Create Risk Report', affected: 0, lastFired: '3d ago', status: 'ACTIVE' },
    { id: 'RR-004', name: 'Rating Downgrade', condition: 'Credit Rating', op: 'drops below', threshold: 'BBB', action: 'Flag for Review', affected: 1, lastFired: '5d ago', status: 'ACTIVE' },
    { id: 'RR-005', name: 'Contract Expiry 30d', condition: 'Days to Expiry', op: '<', threshold: '30', action: 'Launch Renewal Seq', affected: 4, lastFired: '2h ago', status: 'ACTIVE' },
];

// ─── INTEGRATIONS ────────────────────────────────────────────────────────────
export const INTEGRATIONS_03 = [
    { cat: 'ERP & Finance', name: 'SAP S/4HANA', status: 'LIVE', sync: '4m ago', records: '284K', compliance: ['SOX', 'GDPR'] },
    { cat: 'ERP & Finance', name: 'Oracle Financials Cloud', status: 'LIVE', sync: '12m ago', records: '196K', compliance: ['SOX'] },
    { cat: 'ERP & Finance', name: 'NetSuite', status: 'LIVE', sync: '1h ago', records: '48K', compliance: ['SOX', 'PCI'] },
    { cat: 'BI & Analytics', name: 'Snowflake', status: 'LIVE', sync: '8m ago', records: '1.2M', compliance: ['GDPR'] },
    { cat: 'BI & Analytics', name: 'Tableau', status: 'LIVE', sync: '2h ago', records: 'N/A', compliance: [] },
    { cat: 'BI & Analytics', name: 'Looker', status: 'SETUP', sync: 'Pending', records: 'N/A', compliance: ['GDPR'] },
    { cat: 'Market Data', name: 'Bloomberg Terminal API', status: 'LIVE', sync: 'Real-time', records: 'Live', compliance: ['GDPR'] },
    { cat: 'Market Data', name: 'S&P Capital IQ', status: 'LIVE', sync: '15m ago', records: 'Live', compliance: [] },
    { cat: 'CRM Core', name: 'Salesforce FSC', status: 'LIVE', sync: '3m ago', records: '62K', compliance: ['SOX', 'GDPR'] },
    { cat: 'Identity', name: 'Okta SSO', status: 'LIVE', sync: 'Managed', records: '820', compliance: ['SOX'] },
    { cat: 'Revenue', name: 'CashbackPro Rewards', status: 'LIVE', sync: '8m ago', records: '41K', compliance: ['PCI-DSS'] },
];
