/**
 * CRM-05: Pipeline Command — Sample Data
 * Kanban-native flow velocity CRM. Terminology: Phase Gates, Flow Owners, Dwell Time, SLA.
 */
import type { KanbanColumn } from '@/components/charts/KanbanBoard';

// ─── KANBAN COLUMNS ─────────────────────────────────────────────────────────
export const KANBAN_COLUMNS: KanbanColumn[] = [
    {
        id: 'prospect', label: 'Prospecting', wipLimit: 40, slaThresholdDays: 3,
        deals: [
            { id: 'D001', account: 'Meridian Financial', arrFormatted: '$48K', ownerInitials: 'JR', dwellDays: 1, slaStatus: 'ok' },
            { id: 'D002', account: 'Apex Systems', arrFormatted: '$32K', ownerInitials: 'AL', dwellDays: 2, slaStatus: 'ok' },
            { id: 'D003', account: 'Crestline Ventures', arrFormatted: '$24K', ownerInitials: 'SM', dwellDays: 3, slaStatus: 'warning' },
            { id: 'D004', account: 'Synergy Capital', arrFormatted: '$67K', ownerInitials: 'KT', dwellDays: 1, slaStatus: 'ok' },
            { id: 'D005', account: 'Vortex Analytics', arrFormatted: '$19K', ownerInitials: 'JR', dwellDays: 4, slaStatus: 'breach' },
            { id: 'D005', account: 'CashbackPro', arrFormatted: '$185K', ownerInitials: 'SM', dwellDays: 3, slaStatus: 'ok' },
            { id: 'D006', account: 'Pinnacle Corp', arrFormatted: '$88K', ownerInitials: 'AL', dwellDays: 2, slaStatus: 'ok' },
        ],
    },
    {
        id: 'qualify', label: 'Qualification', wipLimit: 30, slaThresholdDays: 5,
        deals: [
            { id: 'D007', account: 'Nexus Global', arrFormatted: '$120K', ownerInitials: 'SM', dwellDays: 2, slaStatus: 'ok' },
            { id: 'D008', account: 'Orion Partners', arrFormatted: '$55K', ownerInitials: 'KT', dwellDays: 4, slaStatus: 'ok' },
            { id: 'D009', account: 'Halcyon Tech', arrFormatted: '$38K', ownerInitials: 'JR', dwellDays: 6, slaStatus: 'warning' },
            { id: 'D010', account: 'Strata Advisory', arrFormatted: '$74K', ownerInitials: 'AL', dwellDays: 5, slaStatus: 'warning' },
            { id: 'D011', account: 'Vantage Capital', arrFormatted: '$94K', ownerInitials: 'SM', dwellDays: 8, slaStatus: 'breach' },
            { id: 'D012', account: 'Zenith Solutions', arrFormatted: '$29K', ownerInitials: 'KT', dwellDays: 3, slaStatus: 'ok' },
            { id: 'D013', account: 'Atlas Corp', arrFormatted: '$61K', ownerInitials: 'JR', dwellDays: 7, slaStatus: 'breach' },
        ],
    },
    {
        id: 'discovery', label: 'Discovery', wipLimit: 25, slaThresholdDays: 7,
        deals: [
            { id: 'D014', account: 'Summit Equity', arrFormatted: '$156K', ownerInitials: 'AL', dwellDays: 3, slaStatus: 'ok' },
            { id: 'D015', account: 'Meridian Health', arrFormatted: '$82K', ownerInitials: 'SM', dwellDays: 5, slaStatus: 'ok' },
            { id: 'D016', account: 'Vector Systems', arrFormatted: '$47K', ownerInitials: 'KT', dwellDays: 6, slaStatus: 'ok' },
            { id: 'D017', account: 'Crest Analytics', arrFormatted: '$33K', ownerInitials: 'JR', dwellDays: 8, slaStatus: 'warning' },
            { id: 'D018', account: 'Apex Infrastructure', arrFormatted: '$210K', ownerInitials: 'AL', dwellDays: 9, slaStatus: 'warning' },
        ],
    },
    {
        id: 'demo', label: 'Demo', wipLimit: 20, slaThresholdDays: 5,
        deals: [
            { id: 'D019', account: 'Horizon Ventures', arrFormatted: '$98K', ownerInitials: 'SM', dwellDays: 7, slaStatus: 'warning' },
            { id: 'D020', account: 'Prestige Partners', arrFormatted: '$44K', ownerInitials: 'KT', dwellDays: 9, slaStatus: 'breach' },
            { id: 'D021', account: 'Catalyst Networks', arrFormatted: '$138K', ownerInitials: 'JR', dwellDays: 12, slaStatus: 'breach' },
            { id: 'D022', account: 'Frontier Capital', arrFormatted: '$67K', ownerInitials: 'AL', dwellDays: 8, slaStatus: 'breach' },
            { id: 'D023', account: 'Quantum Ops', arrFormatted: '$52K', ownerInitials: 'SM', dwellDays: 6, slaStatus: 'warning' },
            { id: 'D024', account: 'Vertex Dynamics', arrFormatted: '$178K', ownerInitials: 'KT', dwellDays: 14, slaStatus: 'breach' },
            { id: 'D025', account: 'Clarity Systems', arrFormatted: '$29K', ownerInitials: 'JR', dwellDays: 4, slaStatus: 'ok' },
        ],
    },
    {
        id: 'proposal', label: 'Proposal', wipLimit: 15, slaThresholdDays: 7,
        deals: [
            { id: 'D026', account: 'Apex Global', arrFormatted: '$240K', ownerInitials: 'AL', dwellDays: 4, slaStatus: 'ok' },
            { id: 'D027', account: 'Riverstone Inc', arrFormatted: '$88K', ownerInitials: 'SM', dwellDays: 6, slaStatus: 'ok' },
            { id: 'D028', account: 'Skyline Partners', arrFormatted: '$155K', ownerInitials: 'KT', dwellDays: 8, slaStatus: 'warning' },
            { id: 'D029', account: 'Irongate Capital', arrFormatted: '$72K', ownerInitials: 'JR', dwellDays: 5, slaStatus: 'ok' },
        ],
    },
    {
        id: 'negotiate', label: 'Negotiation', wipLimit: 10, slaThresholdDays: 10,
        deals: [
            { id: 'D030', account: 'Summit Group', arrFormatted: '$312K', ownerInitials: 'AL', dwellDays: 6, slaStatus: 'ok' },
            { id: 'D031', account: 'Pinnacle Holdings', arrFormatted: '$198K', ownerInitials: 'SM', dwellDays: 9, slaStatus: 'ok' },
            { id: 'D032', account: 'Crest Equity', arrFormatted: '$440K', ownerInitials: 'KT', dwellDays: 12, slaStatus: 'warning' },
        ],
    },
];

// ─── CUMULATIVE FLOW DATA (30 days) ─────────────────────────────────────────
export const CFD_DATA = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(2026, 1, 1 + i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    const progress = i / 30;
    return {
        date: label,
        stages: {
            'Prospecting': Math.round(58 + Math.sin(i * 0.3) * 6),
            'Qualification': Math.round(48 + Math.sin(i * 0.25) * 5),
            'Discovery': Math.round(32 + Math.sin(i * 0.4) * 4),
            'Demo': Math.round(38 + Math.sin(i * 0.2) * 8 + progress * 4), // widening = bottleneck
            'Proposal': Math.round(22 + Math.sin(i * 0.35) * 3),
            'Negotiation': Math.round(14 + Math.sin(i * 0.28) * 2),
        },
    };
});

export const CFD_STAGE_ORDER = ['Prospecting', 'Qualification', 'Discovery', 'Demo', 'Proposal', 'Negotiation'];
export const CFD_COLORS: Record<string, string> = {
    'Prospecting': '#58a6ff',
    'Qualification': '#79c0ff',
    'Discovery': '#a5d6ff',
    'Demo': '#d29922',
    'Proposal': '#3fb950',
    'Negotiation': '#56d364',
};

// ─── FUNNEL DATA ─────────────────────────────────────────────────────────────
export const FUNNEL_STAGES = [
    { label: 'New Signal', count: 240, conversionRate: undefined },
    { label: 'Qualified', count: 187, conversionRate: 78 },
    { label: 'Discovery', count: 142, conversionRate: 76 },
    { label: 'Demo', count: 98, conversionRate: 69 },
    { label: 'Proposal', count: 62, conversionRate: 63 },
    { label: 'Won', count: 28, conversionRate: 45 },
];

// ─── STAGE VELOCITY (avg dwell days vs SLA) ──────────────────────────────────
export const STAGE_VELOCITY = [
    { gate: 'Prospect', avgDwell: 2.1, slaDays: 3, status: 'ok' },
    { gate: 'Qualify', avgDwell: 5.8, slaDays: 5, status: 'warning' },
    { gate: 'Discovery', avgDwell: 6.4, slaDays: 7, status: 'ok' },
    { gate: 'Demo', avgDwell: 8.2, slaDays: 5, status: 'breach' },
    { gate: 'Proposal', avgDwell: 5.9, slaDays: 7, status: 'ok' },
    { gate: 'Negotiate', avgDwell: 7.3, slaDays: 10, status: 'ok' },
];

// ─── DEALS TABLE (dashboard) ──────────────────────────────────────────────────
export const ACTIVE_DEALS = [
    { id: 'D-441', account: 'Catalyst Networks', phase: 'Demo', dwell: 12, owner: 'JR', lastExec: '3d ago', health: 42, sla: 'breach' as const },
    { id: 'D-387', account: 'Vertex Dynamics', phase: 'Demo', dwell: 14, owner: 'KT', lastExec: '5d ago', health: 38, sla: 'breach' as const },
    { id: 'D-412', account: 'Vantage Capital', phase: 'Qualify', dwell: 8, owner: 'SM', lastExec: '1d ago', health: 64, sla: 'breach' as const },
    { id: 'D-358', account: 'Frontier Capital', phase: 'Demo', dwell: 8, owner: 'AL', lastExec: '4d ago', health: 51, sla: 'breach' as const },
    { id: 'D-399', account: 'Apex Infrastructure', phase: 'Discovery', dwell: 9, owner: 'AL', lastExec: '2d ago', health: 58, sla: 'warning' as const },
    { id: 'D-421', account: 'Halcyon Tech', phase: 'Qualify', dwell: 6, owner: 'JR', lastExec: '6h ago', health: 72, sla: 'warning' as const },
    { id: 'D-445', account: 'Skyline Partners', phase: 'Proposal', dwell: 8, owner: 'KT', lastExec: '1d ago', health: 68, sla: 'warning' as const },
    { id: 'D-388', account: 'Strata Advisory', phase: 'Qualify', dwell: 5, owner: 'SM', lastExec: '12h ago', health: 79, sla: 'warning' as const },
    { id: 'D-402', account: 'Summit Equity', phase: 'Discovery', dwell: 3, owner: 'AL', lastExec: '2h ago', health: 84, sla: 'ok' as const },
    { id: 'D-410', account: 'Irongate Capital', phase: 'Proposal', dwell: 5, owner: 'JR', lastExec: '4h ago', health: 88, sla: 'ok' as const },
];

// ─── FLOW OWNERS ─────────────────────────────────────────────────────────────
export const FLOW_OWNERS = [
    { initials: 'JR', name: 'James Reilly', deals: 22, avgDwell: 6.2, efficiency: 78, slaCompliance: 91 },
    { initials: 'AL', name: 'Aisha Lee', deals: 28, avgDwell: 7.1, efficiency: 72, slaCompliance: 86 },
    { initials: 'SM', name: 'Sam Mitchell', deals: 19, avgDwell: 5.8, efficiency: 81, slaCompliance: 94 },
    { initials: 'KT', name: 'Kai Torres', deals: 31, avgDwell: 8.9, efficiency: 64, slaCompliance: 78 },
];

// ─── RADAR DATA (Flow Owner efficiency) ──────────────────────────────────────
export const RADAR_DATA = [
    { owner: 'James Reilly', axes: [82, 74, 91, 78, 69] },
    { owner: 'Aisha Lee', axes: [67, 81, 86, 84, 72] },
    { owner: 'Sam Mitchell', axes: [88, 92, 94, 71, 84] },
    { owner: 'Kai Torres', axes: [61, 58, 78, 66, 91] },
];

// ─── AUTOMATION RULES ─────────────────────────────────────────────────────────
export const AUTOMATION_RULES = [
    { id: 'AR-01', name: 'Auto-Reassign Stale Deals', condition: 'Dwell > 7 days + no exec event', action: 'Reassign to backup owner', affected: 8, lastTriggered: '2h ago', active: true },
    { id: 'AR-02', name: 'Trigger Flow Action', condition: 'No reply in 48h', action: 'Advance to next sequence step', affected: 14, lastTriggered: '6h ago', active: true },
    { id: 'AR-03', name: 'Escalate on Dwell', condition: 'Phase gate dwell > SLA', action: 'Alert team lead', affected: 6, lastTriggered: '1d ago', active: true },
    { id: 'AR-04', name: 'WIP Overflow Alert', condition: 'Column count > WIP limit', action: 'Alert manager', affected: 2, lastTriggered: '3d ago', active: false },
    { id: 'AR-05', name: 'SLA Countdown Nudge', condition: '24h before SLA breach', action: 'Nudge flow owner', affected: 11, lastTriggered: '30m ago', active: true },
];

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────
export const INTEGRATIONS = [
    { name: 'Aircall', category: 'Dialers', status: 'connected' as const, records: '2,847 calls', lastSync: '12s ago' },
    { name: 'Dialpad', category: 'Dialers', status: 'connected' as const, records: '1,204 calls', lastSync: '45s ago' },
    { name: 'Outreach', category: 'Sequences', status: 'connected' as const, records: '8,341 nodes', lastSync: '20s ago' },
    { name: 'Salesloft', category: 'Sequences', status: 'available' as const, records: '', lastSync: '' },
    { name: 'Apollo', category: 'Sequences', status: 'available' as const, records: '', lastSync: '' },
    { name: 'Calendly', category: 'Calendar', status: 'connected' as const, records: '342 events', lastSync: '2m ago' },
    { name: 'Chili Piper', category: 'Calendar', status: 'available' as const, records: '', lastSync: '' },
    { name: 'Salesforce', category: 'CRM', status: 'connected' as const, records: '12,841 recs', lastSync: '5m ago' },
    { name: 'HubSpot', category: 'CRM', status: 'available' as const, records: '', lastSync: '' },
    { name: 'Gong', category: 'Intelligence', status: 'connected' as const, records: '4,128 calls', lastSync: '1m ago' },
    { name: 'Chorus', category: 'Intelligence', status: 'available' as const, records: '', lastSync: '' },
    { name: 'RingCentral', category: 'Dialers', status: 'available' as const, records: '', lastSync: '' },
];

// ─── REPORTS ──────────────────────────────────────────────────────────────────
export const REPORTS = [
    { id: 'R-01', name: 'Weekly Flow Summary', category: 'Performance', status: 'ready' as const, lastRun: '6h ago', stat: '87% SLA compliance' },
    { id: 'R-02', name: 'Flow Owner Conversion Report', category: 'Team', status: 'ready' as const, lastRun: '1d ago', stat: 'Avg 74% efficiency' },
    { id: 'R-03', name: 'Stage Bottleneck Analysis', category: 'Operations', status: 'generating' as const, lastRun: 'Now...', stat: 'Demo gate flagged' },
    { id: 'R-04', name: 'SLA Compliance Overview', category: 'Compliance', status: 'ready' as const, lastRun: '3d ago', stat: '12 SLA breaches' },
    { id: 'R-05', name: 'Signal Source Conversion', category: 'Marketing', status: 'scheduled' as const, lastRun: 'Tomorrow', stat: 'Referral: 68% win' },
    { id: 'R-06', name: 'Sequence Performance', category: 'Sequences', status: 'ready' as const, lastRun: '2d ago', stat: '22% reply rate' },
];
