/**
 * CRM-04 — Minimal Precision
 * Template-specific sample data
 * Swiss editorial, monochrome, precision-first terminology.
 */

// ─── STRATEGIC OPPORTUNITY REGISTER ─────────────────────────────────────────
export const STRATEGIC_OPPORTUNITIES = [
    { org: 'Nexus Global Partners', sector: 'Consulting', value: 2400, fit: 9.2, partner: 'James Reilly', phase: 'Final Review', cycleDays: 62, confidence: 91 },
    { org: 'Meridian Advisory Group', sector: 'Finance', value: 1800, fit: 8.8, partner: 'Claire Hu', phase: 'Proposal', cycleDays: 44, confidence: 78 },
    { org: 'Vantage Capital LLC', sector: 'Private Equity', value: 3200, fit: 8.4, partner: 'Marcus Webb', phase: 'Due Diligence', cycleDays: 88, confidence: 84 },
    { org: 'Apex Strategy Advisors', sector: 'Management', value: 960, fit: 8.1, partner: 'Sarah Chen', phase: 'Initial', cycleDays: 18, confidence: 62 },
    { org: 'Strata Partners', sector: 'Operations', value: 1400, fit: 7.8, partner: 'James Reilly', phase: 'Proposal', cycleDays: 31, confidence: 71 },
    { org: 'Horizon Ventures', sector: 'Venture', value: 2100, fit: 7.4, partner: 'Claire Hu', phase: 'Due Diligence', cycleDays: 74, confidence: 68 },
    { org: 'Pinnacle Advisors', sector: 'Consulting', value: 680, fit: 6.9, partner: 'Marcus Webb', phase: 'Initial', cycleDays: 14, confidence: 48 },
    { org: 'Orion Capital Group', sector: 'Finance', value: 4800, fit: 6.4, partner: 'Sarah Chen', phase: 'Final Review', cycleDays: 112, confidence: 74 },
    { org: 'Solace Strategic', sector: 'Management', value: 540, fit: 5.8, partner: 'James Reilly', phase: 'Initial', cycleDays: 22, confidence: 38 },
    { org: 'CashbackPro', sector: 'Finance', value: 1850, fit: 8.4, partner: 'Claire Hu', phase: 'Negotiation', cycleDays: 44, confidence: 82 },
    { org: 'Clearwater Group', sector: 'Operations', value: 820, fit: 5.2, partner: 'Claire Hu', phase: 'Proposal', cycleDays: 37, confidence: 42 },
];

// ─── SECTOR DISTRIBUTION ──────────────────────────────────────────────────────
export const SECTOR_DISTRIBUTION = [
    { sector: 'Finance', arr: 14200, pipeline: 32400, partners: 4, yoyGrowth: 18.4, engagements: 14 },
    { sector: 'Consulting', arr: 11000, pipeline: 23800, partners: 3, yoyGrowth: 12.1, engagements: 11 },
    { sector: 'Private Equity', arr: 9300, pipeline: 19600, partners: 2, yoyGrowth: 22.6, engagements: 9 },
    { sector: 'Management', arr: 7100, pipeline: 12400, partners: 3, yoyGrowth: 8.2, engagements: 7 },
    { sector: 'Operations', arr: 4900, pipeline: 8200, partners: 2, yoyGrowth: 6.8, engagements: 5 },
    { sector: 'Venture', arr: 3400, pipeline: 5600, partners: 2, yoyGrowth: 31.4, engagements: 4 },
];

// Alias for compatibility
export const SECTOR_DIST = SECTOR_DISTRIBUTION;

// ─── PARTNER PERFORMANCE RADAR ────────────────────────────────────────────────
export const RADAR_PARTNERS = [
    { partner: 'James Reilly', axes: { conversion: 72, dealSize: 68, cycleLength: 81, fitScore: 84, referral: 56 } },
    { partner: 'Claire Hu', axes: { conversion: 64, dealSize: 84, cycleLength: 74, fitScore: 78, referral: 72 } },
    { partner: 'Marcus Webb', axes: { conversion: 58, dealSize: 92, cycleLength: 62, fitScore: 70, referral: 48 } },
    { partner: 'Sarah Chen', axes: { conversion: 80, dealSize: 70, cycleLength: 68, fitScore: 88, referral: 84 } },
];

// ─── QUADRANT CHART (Deal size vs strategic fit) ──────────────────────────────
export const QUADRANT_DATA = [
    { org: 'Nexus Global', x: 2400, y: 9.2, confidence: 91, quadrant: 'Pursue' },
    { org: 'Meridian Advisory', x: 1800, y: 8.8, confidence: 78, quadrant: 'Pursue' },
    { org: 'Vantage Capital', x: 3200, y: 8.4, confidence: 84, quadrant: 'Pursue' },
    { org: 'Apex Strategy', x: 960, y: 8.1, confidence: 62, quadrant: 'Develop' },
    { org: 'Strata Partners', x: 1400, y: 7.8, confidence: 71, quadrant: 'Develop' },
    { org: 'Horizon Ventures', x: 2100, y: 7.4, confidence: 68, quadrant: 'Pursue' },
    { org: 'Pinnacle Advisors', x: 680, y: 6.9, confidence: 48, quadrant: 'Develop' },
    { org: 'Orion Capital', x: 4800, y: 6.4, confidence: 74, quadrant: 'Qualify' },
    { org: 'Solace Strategic', x: 540, y: 5.8, confidence: 38, quadrant: 'Deprioritize' },
    { org: 'Clearwater Group', x: 820, y: 5.2, confidence: 42, quadrant: 'Deprioritize' },
];

// ─── COHORT RETAINED/LOST ─────────────────────────────────────────────────────
export const COHORT_RL = [
    { cohort: "Q1'24", q1: 'R', q2: 'R', q3: 'R', q4: 'R' },
    { cohort: "Q2'24", q1: 'R', q2: 'D', q3: 'R', q4: 'R' },
    { cohort: "Q3'24", q1: 'R', q2: 'R', q3: 'D', q4: 'R' },
    { cohort: "Q4'24", q1: 'D', q2: 'R', q3: 'R', q4: 'D' },
    { cohort: "Q1'25", q1: 'R', q2: 'R', q3: 'R', q4: null },
    { cohort: "Q2'25", q1: 'R', q2: 'R', q3: null, q4: null },
    { cohort: "Q3'25", q1: 'R', q2: null, q3: null, q4: null },
    { cohort: "Q4'25", q1: null, q2: null, q3: null, q4: null },
];

// ─── COHORT NRR RETENTION (pct values for heatmap) ────────────────────────────
export const COHORT_RETENTION_04 = [
    { cohort: "Q1'24", q0: 100, q1: 112, q2: 118, q3: 124, q4: 122, q5: 116 },
    { cohort: "Q2'24", q0: 100, q1: 104, q2: 108, q3: 114, q4: 110, q5: null },
    { cohort: "Q3'24", q0: 100, q1: 98, q2: 104, q3: 112, q4: null, q5: null },
    { cohort: "Q4'24", q0: 100, q1: 106, q2: 114, q3: null, q4: null, q5: null },
    { cohort: "Q1'25", q0: 100, q1: 109, q2: null, q3: null, q4: null, q5: null },
    { cohort: "Q2'25", q0: 100, q1: null, q2: null, q3: null, q4: null, q5: null },
];

// ─── PARTNER LOAD ─────────────────────────────────────────────────────────────
export const PARTNER_LOAD = [
    { partner: 'James Reilly', totalValue: 24.8, engagements: 12 },
    { partner: 'Claire Hu', totalValue: 21.4, engagements: 10 },
    { partner: 'Marcus Webb', totalValue: 18.2, engagements: 9 },
    { partner: 'Sarah Chen', totalValue: 19.6, engagements: 9 },
];

// ─── INTERACTION HISTORY ──────────────────────────────────────────────────────
export const INTERACTION_HISTORY = [
    { date: 'Mar 18, 2026', contact: 'James Liu', type: 'Executive Meeting', notes: 'Q2 strategic roadmap reviewed. Multi-year expansion confirmed. Budget allocated.', outcome: 'Positive' },
    { date: 'Mar 14, 2026', contact: 'Priya Singh', type: 'Contract Review Call', notes: 'Legal redlines returned. No material concerns. Both parties aligned on terms.', outcome: 'Neutral' },
    { date: 'Mar 12, 2026', contact: 'Alan Thompson', type: 'Board Briefing', notes: 'Board confirmed acquisition rationale. Green light for final proposal by EOQ.', outcome: 'Positive' },
    { date: 'Mar 08, 2026', contact: 'Don Wu', type: 'Renewal Discussion', notes: 'Budget constraints raised. Requesting pricing flexibility — 10% discount asked.', outcome: 'Risk' },
    { date: 'Mar 04, 2026', contact: 'Ben Ross', type: 'Strategic Discussion', notes: 'Partner introduced CFO. Market expansion opportunity discussed. Strong mutual fit.', outcome: 'Positive' },
    { date: 'Feb 26, 2026', contact: 'Maya Roshan', type: 'Decision Review', notes: 'Procurement team requested postponement. Q3 retainer budget under review.', outcome: 'Risk' },
    { date: 'Feb 18, 2026', contact: 'James Liu', type: 'Executive Meeting', notes: 'Expansion into APAC discussed. Vantage to introduce 3 sister entities.', outcome: 'Positive' },
];

// Alias
export const INTERACTIONS = INTERACTION_HISTORY;

// ─── PRINCIPALS ───────────────────────────────────────────────────────────────
export const PRINCIPALS = [
    { name: 'Alan Thompson', title: 'Board Chair', org: 'Nexus Global', role: 'Champion', sentiment: 'Positive', authority: 5, influence: 9.2, decisionMaker: true, email: 'a.thompson@nexusglobal.com', lastEngaged: 'Mar 18, 2026' },
    { name: 'James Liu', title: 'CEO', org: 'Vantage Capital', role: 'Champion', sentiment: 'Positive', authority: 5, influence: 9.0, decisionMaker: true, email: 'j.liu@vantagecap.com', lastEngaged: 'Mar 18, 2026' },
    { name: 'Priya Singh', title: 'CFO', org: 'Vantage Capital', role: 'Finance', sentiment: 'Positive', authority: 4, influence: 7.8, decisionMaker: true, email: 'p.singh@vantagecap.com', lastEngaged: 'Mar 14, 2026' },
    { name: 'Don Wu', title: 'CFO', org: 'Orion Capital', role: 'Finance', sentiment: 'Cautious', authority: 4, influence: 7.4, decisionMaker: true, email: 'd.wu@orioncap.com', lastEngaged: 'Mar 08, 2026' },
    { name: 'Maya Roshan', title: 'VP Operations', org: 'Pinnacle', role: 'Operations', sentiment: 'Cautious', authority: 3, influence: 5.8, decisionMaker: false, email: 'm.roshan@pinnacle.co', lastEngaged: 'Feb 26, 2026' },
    { name: 'Ben Ross', title: 'Partner', org: 'Horizon', role: 'Champion', sentiment: 'Positive', authority: 3, influence: 6.4, decisionMaker: false, email: 'b.ross@horizonvc.com', lastEngaged: 'Mar 04, 2026' },
    { name: 'Sophie Chen', title: 'MD', org: 'Meridian', role: 'Decision', sentiment: 'Positive', authority: 5, influence: 8.6, decisionMaker: true, email: 's.chen@meridianadv.com', lastEngaged: 'Mar 02, 2026' },
    { name: 'Lucas Ferreira', title: 'VP Strategy', org: 'Strata Partners', role: 'Operations', sentiment: 'Neutral', authority: 3, influence: 5.2, decisionMaker: false, email: 'l.ferreira@strata.co', lastEngaged: 'Feb 18, 2026' },
];

// ─── DECISION TRIGGERS ────────────────────────────────────────────────────────
export const DECISION_TRIGGERS = [
    { trigger: 'No executive touch in 14+ days', action: 'Alert Partner + Schedule Briefing', urgency: 'High' },
    { trigger: 'Fit Score < 7 before proposal', action: 'Require Partner Review', urgency: 'Medium' },
    { trigger: 'Deal value > $2M', action: 'Weekly Senior Oversight Flag', urgency: 'High' },
    { trigger: 'Cycle Days > 90', action: 'Escalate to Partnership Director', urgency: 'High' },
    { trigger: 'Confidence < 60%', action: 'Request Updated Assessment', urgency: 'Medium' },
    { trigger: 'Phase = Final Review for 30+ days', action: 'Executive Call Trigger', urgency: 'High' },
    { trigger: 'Partner has 5+ active opps', action: 'Load Balancing Review', urgency: 'Low' },
    { trigger: 'Sector > 30% of total ARR', action: 'Diversification Alert', urgency: 'Medium' },
    { trigger: 'NRR drops below 95% in cohort', action: 'Retention Risk Flag', urgency: 'High' },
];
