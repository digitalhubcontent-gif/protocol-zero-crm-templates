import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'Analytics',
    description: 'AI-powered revenue analytics capabilities in PROTOCOL_ZERO — forecasting, deal scoring, behavioral intelligence.',
};

const AI_CAPABILITIES = [
    {
        id: 'forecasting',
        title: 'Predictive Sales Forecasting',
        category: 'Core AI',
        description: 'LSTM neural networks trained on 18+ months of pipeline history produce deal outcome probabilities recalculated every 6 hours. Models account for seasonality, seller tenure, deal complexity, and market signals.',
        metrics: [{ l: 'Accuracy', v: '94.2%' }, { l: 'Horizon', v: '90 days' }, { l: 'Retrain Cycle', v: '7 days' }],
    },
    {
        id: 'deal-score',
        title: 'AI Deal Scoring',
        category: 'Pipeline Intelligence',
        description: 'XGBoost ensemble models ingest 40+ behavioral signals — email engagement, call sentiment, champion activity, competitive mentions — to produce a real-time deal health score updated hourly.',
        metrics: [{ l: 'Signals', v: '40+' }, { l: 'Update Rate', v: 'Hourly' }, { l: 'AUC Score', v: '0.91' }],
    },
    {
        id: 'clv',
        title: 'Customer Lifetime Value Modeling',
        category: 'Revenue AI',
        description: 'Survival analysis models predict expansion potential, churn probability, and long-term CLV for every account in your book. Surface upsell timing recommendations before CS teams have to guess.',
        metrics: [{ l: 'Precision', v: '88%' }, { l: 'Look-ahead', v: '18 months' }, { l: 'Coverage', v: '100% accounts' }],
    },
    {
        id: 'behavioral',
        title: 'Behavioral Analytics',
        category: 'Contact Intelligence',
        description: 'Every interaction across email, calls, LinkedIn, and web sessions is normalized into a unified buyer intent profile. Engagement velocity signals are weighted and scored against historical win data.',
        metrics: [{ l: 'Channels', v: '8+' }, { l: 'Events/day', v: '10K+' }, { l: 'Intent Signals', v: '120+' }],
    },
    {
        id: 'attribution',
        title: 'Revenue Attribution Modeling',
        category: 'Marketing Intelligence',
        description: 'Markov chain and Shapley value attribution models assign revenue credit across every marketing and sales touchpoint. Move beyond first-touch and last-touch fallacies.',
        metrics: [{ l: 'Touch Models', v: '5 types' }, { l: 'Lookback', v: '365 days' }, { l: 'Channels', v: 'Unlimited' }],
    },
    {
        id: 'anomaly',
        title: 'Anomaly Detection',
        category: 'Monitoring',
        description: 'Isolation forest algorithms monitor 200+ KPIs in real time. When pipeline velocity drops, deal age anomalies spike, or activity patterns shift, automated alerts reach the right stakeholders immediately.',
        metrics: [{ l: 'KPIs Monitored', v: '200+' }, { l: 'Latency', v: '<30s' }, { l: 'False Positive Rate', v: '2.1%' }],
    },
];

export default function AnalyticsPage() {
    return (
        <div>
            <InnerNav links={[
                { href: '/about', label: 'About' },
                { href: '/security', label: 'Security' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/library', label: 'Templates' },
            ]} />

            <section className="section" style={{ paddingTop: 80 }}>
                <div className="container">
                    <div style={{ maxWidth: 680 }}>
                        <span className="badge">AI Analytics Suite</span>
                        <h1 className="display-xl" style={{ margin: '20px 0 24px' }}>
                            Intelligence at<br />
                            <span className="text-gradient">Every Data Layer</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Six distinct AI systems working in parallel across your revenue data. Each one purpose-built for a specific class of revenue intelligence problem.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {AI_CAPABILITIES.map((cap) => (
                            <div key={cap.id} className="glass-card card-pad-lg analytics-cap-card">
                                <div className="analytics-cap-header">
                                    <div>
                                        <span className="badge badge-neutral badge-sm" style={{ marginBottom: 10 }}>{cap.category}</span>
                                        <h2 className="display-md">{cap.title}</h2>
                                    </div>
                                    <div className="analytics-cap-metrics">
                                        {cap.metrics.map((m) => (
                                            <div key={m.l} className="analytics-mini-metric">
                                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.l}</p>
                                                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-violet)', letterSpacing: '-0.01em' }}>{m.v}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 16, maxWidth: 680 }}>{cap.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 className="display-lg" style={{ marginBottom: 16 }}>See Analytics in the Templates</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px' }}>Each CRM template includes a fully built analytics page with data visualizations and dashboard mockups.</p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/library" className="btn btn-primary btn-lg">Browse Templates</Link>
                        <Link href="/pricing" className="btn btn-secondary btn-lg">View Pricing</Link>
                    </div>
                </div>
            </section>

            <footer style={{ padding: '24px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>← Back to PROTOCOL_ZERO</Link>
                </div>
            </footer>

            <style>{`
        .inner-nav {
          position: sticky; top: 0; z-index: 100; height: 60px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border-subtle);
          backdrop-filter: blur(20px);
        }
        .inner-nav .container { height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .brand-logo-sm { font-family: var(--font-display); font-size: 0.875rem; font-weight: 700; letter-spacing: 0.04em; color: var(--text-primary); }
        .inner-nav-links { display: flex; gap: 28px; }
        .inner-nav-links a { font-size: 0.875rem; color: var(--text-secondary); transition: color var(--transition-fast); }
        .inner-nav-links a:hover { color: var(--text-primary); }
        .analytics-cap-card { }
        .analytics-cap-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .analytics-cap-metrics { display: flex; gap: 24px; flex-shrink: 0; }
        .analytics-mini-metric { text-align: right; }
        @media (max-width: 768px) {
          .analytics-cap-header { flex-direction: column; }
          .analytics-mini-metric { text-align: left; }
          .inner-nav-links { display: none; }
        }
      `}</style>
        </div>
    );
}
