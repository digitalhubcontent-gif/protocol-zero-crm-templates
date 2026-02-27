/**
 * CRM-10 — Apex Protocol
 * Data file: Compliance, security, and regulatory revenue datasets.
 */

// ─── DASHBOARD DATA ──────────────────────────────────────────────────────────

// Compliance Status Overview
export const COMPLIANCE_STATUS = {
    overall: 94,
    frameworks: [
        { name: 'SOC 2 Type II', status: 'compliant' as const, score: 98, auditDate: '2026-01-15' },
        { name: 'ISO 27001', status: 'compliant' as const, score: 96, auditDate: '2025-11-22' },
        { name: 'GDPR', status: 'warning' as const, score: 88, auditDate: '2026-02-01' },
        { name: 'HIPAA', status: 'compliant' as const, score: 95, auditDate: '2025-12-10' },
        { name: 'FedRAMP', status: 'warning' as const, score: 82, auditDate: '2026-03-01' },
    ],
};

// Revenue Security Metrics
export const SECURITY_METRICS = [
    { label: 'Revenue Under Compliance', value: '$142M', sub: '94% of total ARR', color: '#10b981' },
    { label: 'Compliance Score', value: '94/100', sub: 'Across 5 frameworks', color: '#22c55e' },
    { label: 'Open Violations', value: '3', sub: '2 warning · 1 breach', color: '#ef4444' },
    { label: 'Audit Readiness', value: '97%', sub: 'Next audit: 14 days', color: '#06b6d4' },
];

// Immutable Audit Log
export const AUDIT_LOG = [
    { timestamp: '2026-02-22 14:32:01', actor: 'System', action: 'Compliance scan completed', resource: 'SOC 2 Type II', status: 'pass' as const, hash: '0x7a3f...b2c1' },
    { timestamp: '2026-02-22 13:15:44', actor: 'Elena Rodriguez', action: 'Deal phase advanced', resource: 'Vantage Analytics ($5.1M)', status: 'approved' as const, hash: '0x4c2e...d8f3' },
    { timestamp: '2026-02-22 11:08:22', actor: 'Policy Engine', action: 'GDPR data handling violation detected', resource: 'EMEA Pipeline Data Export', status: 'violation' as const, hash: '0x9b1d...a4e7' },
    { timestamp: '2026-02-21 16:45:18', actor: 'David Park', action: 'Executive approval granted', resource: 'Deal #CR-4421 ($2.1M)', status: 'approved' as const, hash: '0x3e8a...c5f2' },
    { timestamp: '2026-02-21 09:22:55', actor: 'System', action: 'Annual compliance review scheduled', resource: 'ISO 27001', status: 'info' as const, hash: '0x6d4f...e1b8' },
    { timestamp: '2026-02-20 14:11:33', actor: 'System', action: 'Revenue data encryption verified', resource: 'All pipeline data', status: 'pass' as const, hash: '0x1a7c...f9d4' },
    { timestamp: '2026-02-20 08:30:12', actor: 'Priya Sharma', action: 'Access policy updated', resource: 'Financial reporting module', status: 'approved' as const, hash: '0x5b2e...a3c6' },
    { timestamp: '2026-02-19 17:55:09', actor: 'Policy Engine', action: 'Data retention policy warning', resource: 'APAC customer records', status: 'violation' as const, hash: '0x8f3d...b7a2' },
];

// Violation Severity Distribution
export const VIOLATION_TREND = [
    { month: 'Sep', critical: 0, warning: 2, info: 5 },
    { month: 'Oct', critical: 1, warning: 3, info: 4 },
    { month: 'Nov', critical: 0, warning: 1, info: 6 },
    { month: 'Dec', critical: 0, warning: 2, info: 3 },
    { month: 'Jan', critical: 0, warning: 1, info: 4 },
    { month: 'Feb', critical: 1, warning: 2, info: 3 },
];

// Revenue at Risk by Compliance Status
export const REVENUE_COMPLIANCE = [
    { label: 'Fully Compliant', value: 118, color: '#10b981' },
    { label: 'Warning Status', value: 18, color: '#f59e0b' },
    { label: 'Non-Compliant', value: 6, color: '#ef4444' },
];

// ─── ANALYTICS DATA ─────────────────────────────────────────────────────────

// Compliance Score History (12 months)
export const COMPLIANCE_HISTORY = [
    { x: 'Mar', value: 88 },
    { x: 'Apr', value: 89 },
    { x: 'May', value: 91 },
    { x: 'Jun', value: 90 },
    { x: 'Jul', value: 93 },
    { x: 'Aug', value: 92 },
    { x: 'Sep', value: 94 },
    { x: 'Oct', value: 93 },
    { x: 'Nov', value: 95 },
    { x: 'Dec', value: 94 },
    { x: 'Jan', value: 96 },
    { x: 'Feb', value: 94 },
];

// Framework Coverage Heatmap
export const FRAMEWORK_HEATMAP = {
    controls: ['Data Encryption', 'Access Control', 'Audit Logging', 'Data Retention', 'Incident Response', 'Vendor Management'],
    frameworks: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'FedRAMP'],
    values: [
        ['compliant', 'compliant', 'compliant', 'compliant', 'compliant'],
        ['compliant', 'compliant', 'warning', 'compliant', 'warning'],
        ['compliant', 'compliant', 'compliant', 'compliant', 'compliant'],
        ['compliant', 'warning', 'breach', 'compliant', 'warning'],
        ['compliant', 'compliant', 'compliant', 'warning', 'compliant'],
        ['warning', 'compliant', 'compliant', 'compliant', 'compliant'],
    ] as ('compliant' | 'warning' | 'breach')[][],
};

// Risk Exposure by Framework
export const FRAMEWORK_RISK = [
    { framework: 'SOC 2 Type II', controls: 142, passing: 139, failing: 3, revenue: '$142M' },
    { framework: 'ISO 27001', controls: 114, passing: 109, failing: 5, revenue: '$128M' },
    { framework: 'GDPR', controls: 89, passing: 78, failing: 11, revenue: '$47M' },
    { framework: 'HIPAA', controls: 76, passing: 72, failing: 4, revenue: '$28M' },
    { framework: 'FedRAMP', controls: 325, passing: 267, failing: 58, revenue: '$8M' },
];

// ─── PIPELINE DATA ──────────────────────────────────────────────────────────

// Controlled Phase System
export const CONTROLLED_PHASES = [
    { phase: 'Intake', value: 14, count: 28, complianceScore: 100 },
    { phase: 'Due Diligence', value: 22, count: 18, complianceScore: 97 },
    { phase: 'Risk Assessment', value: 18, count: 14, complianceScore: 92 },
    { phase: 'Legal Review', value: 12, count: 8, complianceScore: 88 },
    { phase: 'Compliance Gate', value: 8, count: 4, complianceScore: 100 },
    { phase: 'Approved', value: 42, count: 6, complianceScore: 100 },
];

// Security Classification
export const SECURITY_CLASSIFICATION = [
    { classification: 'Public', deals: 12, arr: '$8M', color: '#22c55e' },
    { classification: 'Internal', deals: 24, arr: '$32M', color: '#3b82f6' },
    { classification: 'Confidential', deals: 18, arr: '$42M', color: '#f59e0b' },
    { classification: 'Restricted', deals: 6, arr: '$28M', color: '#ef4444' },
    { classification: 'Top Secret', deals: 2, arr: '$8M', color: '#7c3aed' },
];

// Compliance Gate Register
export const GATE_REGISTER = [
    { deal: 'Vantage Analytics', arr: '$5.1M', classification: 'Confidential' as const, complianceScore: 98, gate: 'Approved' as const, reviewer: 'Compliance Team' },
    { deal: 'Global Meridian', arr: '$4.5M', classification: 'Restricted' as const, complianceScore: 94, gate: 'Approved' as const, reviewer: 'Legal + Compliance' },
    { deal: 'Nikko Group', arr: '$4.2M', classification: 'Restricted' as const, complianceScore: 72, gate: 'Blocked' as const, reviewer: 'CCO Review Required' },
    { deal: 'Nexova Industries', arr: '$3.7M', classification: 'Confidential' as const, complianceScore: 89, gate: 'Pending' as const, reviewer: 'Compliance Team' },
    { deal: 'Axon Systems', arr: '$3.2M', classification: 'Internal' as const, complianceScore: 96, gate: 'Approved' as const, reviewer: 'Auto-approved' },
    { deal: 'FedTech Inc', arr: '$2.8M', classification: 'Top Secret' as const, complianceScore: 68, gate: 'Blocked' as const, reviewer: 'CCO + CISO Review' },
    { deal: 'Atlas Corp', arr: '$2.6M', classification: 'Internal' as const, complianceScore: 91, gate: 'Pending' as const, reviewer: 'Compliance Team' },
    { deal: 'CashbackPro', arr: '$1.85M', classification: 'Confidential' as const, complianceScore: 96, gate: 'Approved' as const, reviewer: 'Compliance Team' },
    { deal: 'Corvus Data', arr: '$2.2M', classification: 'Internal' as const, complianceScore: 97, gate: 'Approved' as const, reviewer: 'Auto-approved' },
];

// ─── CONTACTS DATA ──────────────────────────────────────────────────────────

// Regulated Entity Registry
export const ENTITY_REGISTRY = [
    { entity: 'Vantage Analytics Inc.', jurisdiction: 'US-DE', regulatoryClass: 'SOX Reporter' as const, dataClassification: 'Confidential' as const, dpa: true, lastReview: '2026-02-15' },
    { entity: 'Global Meridian GmbH', jurisdiction: 'DE-EU', regulatoryClass: 'GDPR Subject' as const, dataClassification: 'Restricted' as const, dpa: true, lastReview: '2026-01-22' },
    { entity: 'Nikko Group KK', jurisdiction: 'JP-APAC', regulatoryClass: 'APPI Subject' as const, dataClassification: 'Restricted' as const, dpa: false, lastReview: '2025-12-10' },
    { entity: 'FedTech Inc.', jurisdiction: 'US-GOV', regulatoryClass: 'FedRAMP' as const, dataClassification: 'Top Secret' as const, dpa: true, lastReview: '2026-02-01' },
    { entity: 'Atlas Corp Pty Ltd', jurisdiction: 'AU-ANZ', regulatoryClass: 'Privacy Act' as const, dataClassification: 'Internal' as const, dpa: true, lastReview: '2026-02-08' },
    { entity: 'Corvus Data SA', jurisdiction: 'BR-LATAM', regulatoryClass: 'LGPD Subject' as const, dataClassification: 'Internal' as const, dpa: true, lastReview: '2026-01-30' },
];

// Access Control Matrix
export const ACCESS_MATRIX = {
    roles: ['CCO', 'CISO', 'CRO', 'VP Sales', 'AE', 'Compliance Analyst'],
    resources: ['Pipeline Data', 'Financial Reports', 'Audit Logs', 'Entity PII', 'Deal Terms', 'Compliance Configs'],
    permissions: [
        ['full', 'full', 'full', 'full', 'full', 'full'],
        ['read', 'full', 'full', 'read', 'read', 'full'],
        ['full', 'full', 'read', 'read', 'full', 'none'],
        ['full', 'read', 'none', 'none', 'full', 'none'],
        ['read', 'none', 'none', 'none', 'read', 'none'],
        ['read', 'read', 'full', 'read', 'read', 'full'],
    ] as ('full' | 'read' | 'none')[][],
};

// ─── ACTIVITY DATA ──────────────────────────────────────────────────────────

// Compliance Event Timeline
export const COMPLIANCE_EVENTS = [
    { date: '2026-02-22', type: 'scan' as const, title: 'Automated compliance scan — SOC 2', result: 'pass' as const },
    { date: '2026-02-22', type: 'violation' as const, title: 'GDPR data handling violation detected', result: 'fail' as const },
    { date: '2026-02-21', type: 'approval' as const, title: 'Executive approval — Deal #CR-4421', result: 'pass' as const },
    { date: '2026-02-21', type: 'policy' as const, title: 'Access policy update — Financial module', result: 'pass' as const },
    { date: '2026-02-20', type: 'scan' as const, title: 'Data encryption verification — all pipelines', result: 'pass' as const },
    { date: '2026-02-20', type: 'violation' as const, title: 'Data retention policy warning — APAC', result: 'warning' as const },
    { date: '2026-02-19', type: 'audit' as const, title: 'ISO 27001 annual review scheduled', result: 'info' as const },
    { date: '2026-02-18', type: 'scan' as const, title: 'HIPAA compliance scan — Healthcare deals', result: 'pass' as const },
    { date: '2026-02-17', type: 'policy' as const, title: 'Vendor management policy enforced', result: 'pass' as const },
    { date: '2026-02-16', type: 'approval' as const, title: 'Compliance gate — Axon Systems approved', result: 'pass' as const },
];

// Data Flow Monitoring
export const DATA_FLOW_MONITORING = [
    { source: 'CRM Pipeline', destination: 'Analytics DB', encrypted: true, volume: '2.4GB/day', status: 'healthy' as const },
    { source: 'Customer PII', destination: 'EMEA Archive', encrypted: true, volume: '180MB/day', status: 'healthy' as const },
    { source: 'Financial Reports', destination: 'Board Portal', encrypted: true, volume: '45MB/day', status: 'healthy' as const },
    { source: 'Deal Terms', destination: 'Legal Vault', encrypted: true, volume: '120MB/day', status: 'healthy' as const },
    { source: 'APAC Records', destination: 'Regional DB', encrypted: false, volume: '890MB/day', status: 'warning' as const },
];

// ─── REPORTS DATA ────────────────────────────────────────────────────────────

export const COMPLIANCE_REPORTS = [
    { id: 'r1', name: 'SOC 2 Audit Readiness Report', desc: 'Control status, evidence collection progress, gap analysis', icon: '🔒', frequency: 'Monthly' },
    { id: 'r2', name: 'GDPR Compliance Dashboard', desc: 'Data subject requests, retention compliance, cross-border transfer audit', icon: '🇪🇺', frequency: 'Weekly' },
    { id: 'r3', name: 'Revenue Compliance Summary', desc: 'ARR by compliance status, risk exposure, violation timeline', icon: '💰', frequency: 'Quarterly' },
    { id: 'r4', name: 'Access Control Audit', desc: 'Permission matrix, role-based access review, privilege escalation log', icon: '🔑', frequency: 'Monthly' },
    { id: 'r5', name: 'Incident Response Report', desc: 'Security incidents, response times, remediation status', icon: '🚨', frequency: 'On-demand' },
    { id: 'r6', name: 'Vendor Risk Assessment', desc: 'Third-party vendor compliance, DPA status, data handling review', icon: '📋', frequency: 'Quarterly' },
];

// ─── AUTOMATION DATA ─────────────────────────────────────────────────────────

export const POLICY_RULES = [
    {
        id: 'p1', name: 'Data Classification Enforcement', status: 'active' as const,
        trigger: 'New deal created or entity added',
        actions: ['Auto-classify data sensitivity', 'Apply encryption policy', 'Set retention period'],
        executions: 142, lastRun: '2h ago',
    },
    {
        id: 'p2', name: 'Compliance Gate Validation', status: 'active' as const,
        trigger: 'Deal phase → Compliance Gate',
        actions: ['Run framework compatibility check', 'Verify DPA status', 'Check jurisdiction requirements'],
        executions: 38, lastRun: '6h ago',
    },
    {
        id: 'p3', name: 'Violation Auto-Escalation', status: 'active' as const,
        trigger: 'Compliance score drops below 80%',
        actions: ['Notify CCO immediately', 'Block deal advancement', 'Create remediation task'],
        executions: 8, lastRun: '1d ago',
    },
    {
        id: 'p4', name: 'GDPR Data Request Handler', status: 'active' as const,
        trigger: 'Data Subject Access Request (DSAR) received',
        actions: ['Identify all PII records', 'Generate data inventory', 'Route to privacy officer'],
        executions: 24, lastRun: '3d ago',
    },
    {
        id: 'p5', name: 'Audit Trail Integrity Check', status: 'active' as const,
        trigger: 'Every 24 hours',
        actions: ['Verify hash chain integrity', 'Check for log tampering', 'Report anomalies'],
        executions: 365, lastRun: '12h ago',
    },
];

// ─── INTEGRATIONS DATA ──────────────────────────────────────────────────────

export const SECURE_INTEGRATIONS = [
    {
        category: 'Security Infrastructure',
        items: [
            { name: 'HashiCorp Vault', desc: 'Secrets management for API keys and credentials', status: 'connected' as const },
            { name: 'CrowdStrike', desc: 'Endpoint detection and response monitoring', status: 'connected' as const },
            { name: 'Snyk', desc: 'Vulnerability scanning for integration dependencies', status: 'connected' as const },
        ],
    },
    {
        category: 'Compliance Platforms',
        items: [
            { name: 'Vanta', desc: 'Continuous SOC 2 / ISO 27001 monitoring', status: 'connected' as const },
            { name: 'Drata', desc: 'Automated compliance evidence collection', status: 'available' as const },
            { name: 'OneTrust', desc: 'Privacy management and GDPR compliance', status: 'connected' as const },
        ],
    },
    {
        category: 'Identity & Access',
        items: [
            { name: 'Okta', desc: 'SSO with MFA enforcement and session management', status: 'connected' as const },
            { name: 'Azure AD', desc: 'Enterprise directory with conditional access', status: 'connected' as const },
        ],
    },
    {
        category: 'Data Protection',
        items: [
            { name: 'AWS KMS', desc: 'Encryption key management for data at rest', status: 'connected' as const },
            { name: 'Virtru', desc: 'End-to-end encryption for data in transit', status: 'available' as const },
        ],
    },
];

// ─── PRICING TIERS ──────────────────────────────────────────────────────────

export const COMPLIANCE_PLANS = [
    {
        name: 'Shield',
        price: { monthly: 1499, annual: 1199 },
        desc: 'Essential compliance monitoring with SOC 2 and GDPR coverage.',
        features: [
            { label: 'SOC 2 + GDPR framework coverage', included: true },
            { label: 'Automated compliance scoring', included: true },
            { label: 'Basic audit trail (90 days)', included: true },
            { label: 'Data classification enforcement', included: true },
            { label: 'Immutable hash-chain audit log', included: false },
            { label: 'Multi-framework compliance matrix', included: false },
            { label: 'CISO dashboard', included: false },
            { label: 'Dedicated compliance engineer', included: false },
        ],
    },
    {
        name: 'Fortress',
        price: { monthly: 4999, annual: 3999 },
        desc: 'Full compliance suite with all 5 frameworks, policy engine, and compliance gates.',
        features: [
            { label: 'All 5 framework coverage', included: true },
            { label: 'Immutable hash-chain audit log', included: true },
            { label: 'Compliance Gate workflows', included: true },
            { label: 'Multi-framework compliance matrix', included: true },
            { label: 'Policy enforcement engine', included: true },
            { label: 'CISO dashboard', included: true },
            { label: 'Unlimited audit trail retention', included: true },
            { label: 'Dedicated compliance engineer', included: false },
        ],
    },
    {
        name: 'Sovereign',
        price: { monthly: null, annual: null },
        desc: 'Defense-grade compliance with on-premise deployment, custom SLA, and white-glove support.',
        features: [
            { label: 'All Fortress features', included: true },
            { label: 'On-premise / air-gapped deployment', included: true },
            { label: 'Custom compliance framework builder', included: true },
            { label: 'Dedicated compliance engineer', included: true },
            { label: 'FedRAMP High authorization support', included: true },
            { label: 'CISO + CCO executive briefings', included: true },
            { label: 'Custom SLA (99.999% uptime)', included: true },
            { label: 'Penetration testing partnership', included: true },
        ],
    },
];
