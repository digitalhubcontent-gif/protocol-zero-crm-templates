/**
 * Inject CashbackPro into inline data arrays in actual page.tsx files.
 * Targets integration pages, contact pages, activity pages across all templates.
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'src', 'app', 'templates');

// Build targeted replacements for each template's page files
const injections = [
    // ─── CRM-01 ──────────────────────────────
    {
        file: path.join(base, 'crm-01', 'integrations', 'page.tsx'),
        find: "            { name: 'QuickBooks', desc: 'Invoice and payment status sync', status: 'Available', key: '#64748b' },",
        replace: "            { name: 'CashbackPro', desc: 'Cashback rewards and affiliate partnership engine', status: 'Connected', key: '#10b981' },\n            { name: 'QuickBooks', desc: 'Invoice and payment status sync', status: 'Available', key: '#64748b' },"
    },
    // CRM-01 landing page — clients list
    {
        file: path.join(base, 'crm-01', 'page.tsx'),
        find: "const clients = ['Salesforce', 'Snowflake', 'Stripe', 'Databricks', 'NetSuite', 'Slack', 'Gong', 'Outreach'];",
        replace: "const clients = ['Salesforce', 'Snowflake', 'Stripe', 'CashbackPro', 'Databricks', 'NetSuite', 'Slack', 'Outreach'];"
    },

    // ─── CRM-02 ──────────────────────────────
    {
        file: path.join(base, 'crm-02', 'integrations', 'page.tsx'),
        find: "            { key: 'PAGERDUTY', name: 'PagerDuty', desc: 'Critical deal risk escalation routing', status: 'AVAILABLE', latency: '—' },",
        replace: "            { key: 'CASHBACKPRO', name: 'CashbackPro', desc: 'Rewards and cashback event signal pipeline', status: 'CONNECTED', latency: '3s' },\n            { key: 'PAGERDUTY', name: 'PagerDuty', desc: 'Critical deal risk escalation routing', status: 'AVAILABLE', latency: '—' },"
    },

    // ─── CRM-04 ──────────────────────────────
    {
        file: path.join(base, 'crm-04', 'integrations', 'page.tsx'),
        find: "    { name: 'PartnerStack', cat: 'Partner', status: 'Available', sync: '—', records: '—', icon: '◉' },",
        replace: "    { name: 'CashbackPro', cat: 'Partner', status: 'Connected', sync: '8 min ago', records: '6,420', icon: '💰' },\n    { name: 'PartnerStack', cat: 'Partner', status: 'Available', sync: '—', records: '—', icon: '◉' },"
    },
];

// Now find and inject into remaining templates (CRM-03, 05-12)
// These import from their data.ts which we already updated, but let's also check if they have inline page data.
const templateDirs = ['crm-03', 'crm-05', 'crm-06', 'crm-07', 'crm-08', 'crm-09', 'crm-10', 'crm-11', 'crm-12'];

templateDirs.forEach(slug => {
    const integrationsFile = path.join(base, slug, 'integrations', 'page.tsx');
    if (fs.existsSync(integrationsFile)) {
        const content = fs.readFileSync(integrationsFile, 'utf8');
        // Check if this page imports from data.ts or has inline data
        if (content.includes('CashbackPro')) {
            console.log(`SKIP (already has CashbackPro): ${slug}/integrations/page.tsx`);
        } else if (content.includes("from '../data'") || content.includes("from '../../data'") || content.includes("from '../data.ts'")) {
            console.log(`IMPORT-BASED (data.ts already updated): ${slug}/integrations/page.tsx`);
        } else {
            console.log(`CHECK MANUALLY: ${slug}/integrations/page.tsx (may have inline data)`);
        }
    } else {
        console.log(`NO FILE: ${slug}/integrations/page.tsx`);
    }

    // Check contacts page
    const contactsFile = path.join(base, slug, 'contacts', 'page.tsx');
    if (fs.existsSync(contactsFile)) {
        const content = fs.readFileSync(contactsFile, 'utf8');
        if (content.includes('CashbackPro')) {
            console.log(`SKIP (already has CashbackPro): ${slug}/contacts/page.tsx`);
        } else if (content.includes("from '../data'") || content.includes("from '../../data'")) {
            console.log(`IMPORT-BASED: ${slug}/contacts/page.tsx`);
        } else {
            console.log(`CHECK MANUALLY: ${slug}/contacts/page.tsx`);
        }
    }

    // Check activity page
    const activityFile = path.join(base, slug, 'activity', 'page.tsx');
    if (fs.existsSync(activityFile)) {
        const content = fs.readFileSync(activityFile, 'utf8');
        if (content.includes('CashbackPro')) {
            console.log(`SKIP (already has CashbackPro): ${slug}/activity/page.tsx`);
        } else if (content.includes("from '../data'") || content.includes("from '../../data'")) {
            console.log(`IMPORT-BASED: ${slug}/activity/page.tsx`);
        } else {
            console.log(`CHECK MANUALLY: ${slug}/activity/page.tsx`);
        }
    }

    // Check dashboard page
    const dashboardFile = path.join(base, slug, 'dashboard', 'page.tsx');
    if (fs.existsSync(dashboardFile)) {
        const content = fs.readFileSync(dashboardFile, 'utf8');
        if (content.includes('CashbackPro')) {
            console.log(`SKIP (already has CashbackPro): ${slug}/dashboard/page.tsx`);
        } else if (content.includes("from '../data'") || content.includes("from '../../data'")) {
            console.log(`IMPORT-BASED: ${slug}/dashboard/page.tsx`);
        } else {
            console.log(`CHECK MANUALLY: ${slug}/dashboard/page.tsx`);
        }
    }
});

// Execute the direct injections
let totalChanges = 0;

injections.forEach(({ file, find, replace }) => {
    if (!fs.existsSync(file)) {
        console.log('SKIP (not found):', path.relative(process.cwd(), file));
        return;
    }
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('CashbackPro')) {
        console.log('SKIP (already injected):', path.relative(process.cwd(), file));
        return;
    }
    if (content.includes(find)) {
        content = content.replace(find, replace);
        fs.writeFileSync(file, content, 'utf8');
        console.log('UPDATED:', path.relative(process.cwd(), file));
        totalChanges++;
    } else {
        console.log('WARN: Pattern not found in', path.relative(process.cwd(), file));
    }
});

console.log('\n=== Direct page injections:', totalChanges, '===');
