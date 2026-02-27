import { notFound } from 'next/navigation';
import { getTemplateBySlug, getAdjacentTemplates } from '@/lib/registry';
import { CrmLayout } from '@/components/crm-layout/CrmLayout';
import {
    SAMPLE_METRICS,
    SAMPLE_PIPELINE,
    SAMPLE_CONTACTS,
    SAMPLE_ACTIVITY,
    TEMPLATE_PRICING,
    AI_FEATURES,
    INTEGRATIONS,
    CASE_STUDIES,
} from '@/lib/data';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import type { Metadata } from 'next';

const VALID_PAGES = [
    'dashboard',
    'analytics',
    'pipeline',
    'contact',
    'activity',
    'reports',
    'automation',
    'integrations',
    'pricing',
    'features',
] as const;

type ValidPage = (typeof VALID_PAGES)[number];

type Props = {
    params: { slug: string; page: ValidPage };
};

export async function generateStaticParams() {
    const slugs = [
        'crm-01', 'crm-02', 'crm-03', 'crm-04', 'crm-05', 'crm-06',
        'crm-07', 'crm-08', 'crm-09', 'crm-10', 'crm-11', 'crm-12',
    ];
    return slugs.flatMap((slug) =>
        VALID_PAGES.map((page) => ({ slug, page }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const template = getTemplateBySlug(params.slug);
    if (!template) return {};
    const pageLabel = params.page.charAt(0).toUpperCase() + params.page.slice(1);
    return {
        title: `${pageLabel} — ${template.name}`,
        description: `${pageLabel} page for ${template.name} CRM template. ${template.tagline}`,
    };
}

export default function TemplatePage({ params }: Props) {
    const template = getTemplateBySlug(params.slug);
    if (!template) return notFound();
    if (!VALID_PAGES.includes(params.page)) return notFound();

    const { prev, next } = getAdjacentTemplates(params.slug);
    const accent = template.accentColor;
    const page = params.page;

    return (
        <CrmLayout template={template} prevTemplate={prev} nextTemplate={next} currentPage={page} accentColor={accent}>
            <PageContent page={page} accent={accent} templateName={template.name} slug={params.slug} />
        </CrmLayout>
    );
}

function PageContent({ page, accent, templateName, slug }: { page: ValidPage; accent: string; templateName: string; slug: string }) {
    switch (page) {
        case 'dashboard':
            return <DashboardPage accent={accent} />;
        case 'analytics':
            return <AnalyticsPage accent={accent} />;
        case 'pipeline':
            return <PipelinePage accent={accent} />;
        case 'contact':
            return <ContactPage accent={accent} />;
        case 'activity':
            return <ActivityPage accent={accent} />;
        case 'reports':
            return <ReportsPage accent={accent} />;
        case 'automation':
            return <AutomationPage accent={accent} />;
        case 'integrations':
            return <IntegrationsPage accent={accent} />;
        case 'pricing':
            return <PricingPage accent={accent} />;
        case 'features':
            return <FeaturesPage accent={accent} templateName={templateName} slug={slug} />;
        default:
            return notFound();
    }
}

/* ========== DASHBOARD ========== */
function DashboardPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Live overview of pipeline health and revenue performance.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
                {SAMPLE_METRICS.map((m) => (
                    <MetricCard key={m.label} metric={m} accentColor={accent} />
                ))}
            </div>
            {/* Mini chart bars */}
            <div className="glass-card card-pad-lg" style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Revenue Trend — FY2026</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Monthly ARR (in thousands)</p>
                    </div>
                    <Badge variant="success" dot>Live</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
                    {[62, 70, 66, 75, 82, 78, 88, 91, 86, 94, 99, 106].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ flex: 1, width: '100%', background: i === 11 ? accent : `${accent}35`, borderRadius: '3px 3px 0 0', alignSelf: 'flex-end', height: `${(h / 106) * 100}%` }} />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <span key={m} style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{m}</span>
                    ))}
                </div>
            </div>
            {/* Recent activity */}
            <div className="glass-card card-pad-lg">
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 20 }}>Recent Activity</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {SAMPLE_ACTIVITY.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${accent}15`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: 2 }}>{item.description}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.timestamp} · {item.user}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ========== ANALYTICS ========== */
function AnalyticsPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Analytics</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Deep analysis of revenue patterns, conversion rates, and cycle metrics.</p>
            </div>
            {/* Key metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 32 }}>
                {SAMPLE_METRICS.map((m) => (
                    <MetricCard key={m.label} metric={m} accentColor={accent} />
                ))}
            </div>
            {/* Funnel visualization */}
            <div className="glass-card card-pad-lg" style={{ marginBottom: 32 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 24 }}>Conversion Funnel</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SAMPLE_PIPELINE.map((stage, i) => (
                        <div key={stage.name} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 60px 80px', alignItems: 'center', gap: 16 }}>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{stage.name}</span>
                            <div style={{ height: 8, background: 'var(--border-card)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${stage.percentage}%`, height: '100%', background: `${accent}${(40 + i * 10).toString(16).padStart(2, '0')}`, borderRadius: 4, transition: 'width 1s ease' }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stage.count}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: accent, textAlign: 'right' }}>{stage.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* AI model performance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                    { label: 'Forecast Model Accuracy', value: '94.2%', sub: 'LSTM rolling 90-day model. Last validated 2h ago.' },
                    { label: 'Deal Score AUC', value: '0.91', sub: 'XGBoost ensemble. 40+ behavioral signals.' },
                    { label: 'Churn Prediction Precision', value: '88%', sub: 'Survival analysis on 18-month cohort.' },
                    { label: 'Attribution Coverage', value: '100%', sub: 'Shapley value across all tracked touchpoints.' },
                ].map((s) => (
                    <div key={s.label} className="glass-card card-pad-md" style={{ borderLeft: `3px solid ${accent}` }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', marginBottom: 6 }}>{s.value}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========== PIPELINE ========== */
function PipelinePage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="display-md" style={{ marginBottom: 8 }}>Pipeline</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Manage and track all active deals across your sales stages.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Badge variant="info">124 Open</Badge>
                    <Badge variant="success">12 Won</Badge>
                    <Badge variant="danger">8 Lost</Badge>
                </div>
            </div>
            {/* Pipeline stage summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
                {SAMPLE_PIPELINE.map((stage) => (
                    <div key={stage.name} className="glass-card card-pad-lg">
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{stage.name}</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', marginBottom: 4 }}>{stage.value}</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{stage.count} deals</p>
                        <div style={{ height: 2, background: 'var(--border-card)', borderRadius: 1, marginTop: 12 }}>
                            <div style={{ width: `${stage.percentage}%`, height: '100%', background: accent, borderRadius: 1 }} />
                        </div>
                    </div>
                ))}
            </div>
            {/* Deal list */}
            <div className="glass-card card-pad-lg">
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 20 }}>Active Deals</p>
                <DataTable records={SAMPLE_CONTACTS} />
            </div>
        </div>
    );
}

/* ========== CONTACT ========== */
function ContactPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="display-md" style={{ marginBottom: 8 }}>Contact Records</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Unified view of all contacts, stakeholders, and account champions.</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" style={{ transition: 'all 0.2s cubic-bezier(.4,0,.2,1)' }}>Filter</button>
                    <button className="btn btn-primary btn-sm" style={{ background: accent, border: 'none', boxShadow: `0 4px 12px ${accent}40`, transition: 'all 0.2s cubic-bezier(.4,0,.2,1)' }}>+ Add Contact</button>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                {[{ l: 'Total Contacts', v: '4,821' }, { l: 'Active Accounts', v: '1,204' }, { l: 'New This Month', v: '187' }, { l: 'At Risk', v: '43' }].map((s) => (
                    <div key={s.l} className="glass-card card-pad-md">
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>{s.l}</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{s.v}</p>
                    </div>
                ))}
            </div>
            <div className="glass-card card-pad-lg">
                <DataTable records={SAMPLE_CONTACTS} />
            </div>
        </div>
    );
}

/* ========== ACTIVITY ========== */
function ActivityPage({ accent }: { accent: string }) {
    const typeColors: Record<string, string> = {
        call: '#10b981', email: '#06b6d4', meeting: accent, deal: '#f59e0b', note: 'var(--text-muted)',
    };
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Activity Feed</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Real-time log of all team interactions and deal events.</p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
                <div style={{ flex: 1 }}>
                    {SAMPLE_ACTIVITY.map((item, i) => (
                        <div key={item.id} style={{ display: 'flex', gap: 16, paddingBottom: 24, marginBottom: 24, borderBottom: i < SAMPLE_ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${typeColors[item.type]}15`, border: `1px solid ${typeColors[item.type]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColors[item.type] }} />
                                </div>
                                {i < SAMPLE_ACTIVITY.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border-subtle)', marginTop: 8 }} />}
                            </div>
                            <div style={{ flex: 1, paddingTop: 4 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <Badge variant="neutral" size="sm">{item.type}</Badge>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                                </div>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.5 }}>{item.description}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>by {item.user}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ width: 280, flexShrink: 0 }}>
                    <div className="glass-card card-pad-md">
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Activity Breakdown</p>
                        {[{ type: 'call', count: 48 }, { type: 'email', count: 124 }, { type: 'meeting', count: 36 }, { type: 'deal', count: 22 }].map((a) => (
                            <div key={a.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: typeColors[a.type] }} />
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{a.type}</span>
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ========== REPORTS ========== */
function ReportsPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Reports</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Scheduled and on-demand revenue intelligence reports.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                {[
                    { name: 'Weekly Pipeline Review', schedule: 'Every Monday 07:00', status: 'active', desc: 'Pipeline health, deal velocity, and stage conversion rates for the week.' },
                    { name: 'Monthly Revenue Close', schedule: 'Last day of month', status: 'active', desc: 'Full ARR reconciliation, win/loss analysis, and next-month forecast.' },
                    { name: 'AI Deal Score Report', schedule: 'Daily 06:00', status: 'active', desc: 'Top 20 deals by risk-adjusted close probability and recommended actions.' },
                    { name: 'Quarterly Business Review', schedule: 'End of quarter', status: 'paused', desc: 'Executive summary of revenue performance, team metrics, and market trends.' },
                    { name: 'Churn Risk Alert', schedule: 'Real-time', status: 'active', desc: 'Instant notification when account health score drops below threshold.' },
                    { name: 'Capacity Planning Report', schedule: 'Weekly Friday', status: 'active', desc: 'Headcount vs pipeline ratio analysis and hiring signal detection.' },
                ].map((report) => (
                    <div key={report.name} className="glass-card card-pad-lg">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{report.name}</p>
                            <Badge variant={report.status === 'active' ? 'success' : 'warning'} size="sm">{report.status}</Badge>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>{report.desc}</p>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{report.schedule}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========== AUTOMATION ========== */
function AutomationPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Automation Engine</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>No-code workflow automation for revenue process orchestration.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
                {[{ l: 'Active Workflows', v: '47' }, { l: 'Actions/Day', v: '1,240' }, { l: 'Time Saved/Week', v: '38h' }].map((s) => (
                    <div key={s.l} className="glass-card card-pad-md" style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: accent, letterSpacing: '-0.03em', marginBottom: 4 }}>{s.v}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</p>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                    { name: 'Deal Stuck Alert', trigger: 'Deal inactive > 5 days', action: 'Email AE + update CRM stage', runs: 234 },
                    { name: 'Champion Change Response', trigger: 'Contact role changes', action: 'Alert rep + schedule call', runs: 88 },
                    { name: 'Trial-to-Paid Sequence', trigger: 'Trial day 8 incomplete', action: 'Send value email + book extension call', runs: 412 },
                    { name: 'At-Risk Account Escalation', trigger: 'Health score < 40', action: 'Create CSM task + notify VP', runs: 67 },
                    { name: 'AI Score Drop Alert', trigger: 'Deal score drops > 15 pts', action: 'Slack rep + add to pipeline review', runs: 145 },
                    { name: 'New Contact Enrichment', trigger: 'New contact created', action: 'Auto-enrich from Apollo + assign to rep', runs: 891 },
                ].map((wf) => (
                    <div key={wf.name} className="glass-card card-pad-md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', alignItems: 'center', gap: 20 }}>
                        <div>
                            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{wf.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trigger: {wf.trigger}</p>
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{wf.action}</p>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: accent }}>{wf.runs}</p>
                            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>runs/mo</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========== INTEGRATIONS ========== */
function IntegrationsPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="display-md" style={{ marginBottom: 8 }}>Integrations</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Connect your existing revenue stack to PROTOCOL_ZERO.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                {INTEGRATIONS.map((cat) => (
                    <div key={cat.cat} className="glass-card card-pad-lg">
                        <p style={{ fontSize: '0.6875rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 20 }}>{cat.cat}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {cat.items.map((item) => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--bg-secondary)', borderRadius: 6 }}>
                                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item}</span>
                                    <Badge variant="success" size="sm" dot>Connected</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========== PRICING ========== */
function PricingPage({ accent }: { accent: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 48, textAlign: 'center' }}>
                <h1 className="display-md" style={{ marginBottom: 12 }}>Pricing</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>Simple pricing aligned to revenue outcomes. No seat taxes.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {TEMPLATE_PRICING.map((tier) => (
                    <div key={tier.name} className={`glass-card card-pad-lg ${tier.highlighted ? 'pricing-featured' : ''}`} style={{ display: 'flex', flexDirection: 'column', ...(tier.highlighted ? { borderColor: `${accent}50`, boxShadow: `0 0 40px ${accent}15` } : {}) }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{tier.name}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.04em', color: tier.highlighted ? accent : 'var(--text-primary)' }}>{tier.price}</span>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{tier.period}</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)' }}>{tier.description}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, flex: 1 }}>
                            {tier.features.map((f) => (
                                <li key={f} style={{ display: 'flex', gap: 8, fontSize: '0.875rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={tier.highlighted ? accent : 'var(--status-success)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className={`btn btn-full ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`} style={tier.highlighted ? { background: accent } : {}}>
                            {tier.cta}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========== FEATURES ========== */
function FeaturesPage({ accent, templateName, slug }: { accent: string; templateName: string; slug: string }) {
    return (
        <div style={{ padding: 40, minHeight: '80vh' }}>
            <div style={{ marginBottom: 48 }}>
                <h1 className="display-md" style={{ marginBottom: 12 }}>Platform Features</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 560 }}>
                    {templateName} ships with the complete PROTOCOL_ZERO intelligence stack — 6 AI systems, 40+ signals, and real-time pipeline scoring.
                </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 48 }}>
                {AI_FEATURES.map((f, i) => (
                    <div key={f.id} className="glass-card card-pad-lg" style={{ borderLeft: `3px solid ${accent}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: accent, fontWeight: 700 }}>0{i + 1}</span>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</h3>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{f.desc}</p>
                    </div>
                ))}
            </div>
            {/* Case studies */}
            <h2 className="display-sm" style={{ marginBottom: 24 }}>Client Impact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {CASE_STUDIES.map((cs) => (
                    <div key={cs.id} className="glass-card card-pad-lg">
                        <p style={{ fontSize: '0.6875rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 8 }}>{cs.industry}</p>
                        <h3 className="display-sm" style={{ marginBottom: 12 }}>{cs.result}</h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{cs.detail}</p>
                        <div style={{ display: 'flex', gap: 16 }}>
                            {cs.metrics.map((m) => (
                                <div key={m.l}>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: accent }}>{m.v}</p>
                                    <p style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
