import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'About',
    description: 'The mission, technology, and philosophy behind PROTOCOL_ZERO enterprise CRM intelligence.',
};

const PILLARS = [
    {
        id: 'ai-native',
        title: 'AI-Native Architecture',
        body: 'Every component of PROTOCOL_ZERO is built with machine learning as a first-order concern — not as an addon. From data ingestion to UI rendering, intelligence is embedded in the infrastructure.',
    },
    {
        id: 'enterprise-grade',
        title: 'Enterprise-Grade Security',
        body: 'SOC 2 Type II certified. Zero-trust access model. AES-256 encryption at rest and TLS 1.3 in transit. Built to operate inside the strictest compliance frameworks on the planet.',
    },
    {
        id: 'precision',
        title: 'Precision Over Features',
        body: 'We do not build features. We solve revenue problems. Every product decision is evaluated against a single standard: does this make your revenue team meaningfully more effective?',
    },
    {
        id: 'modular',
        title: 'Modular by Design',
        body: 'PROTOCOL_ZERO modules operate independently or as a unified platform. Deploy what you need today. Expand into adjacent capabilities as your operation matures.',
    },
];

const TECH_STACK = [
    { cat: 'AI / ML', items: ['GPT-4 Pipeline Intelligence', 'XGBoost Deal Scoring', 'LSTM Forecasting', 'Behavioral Clustering'] },
    { cat: 'Infrastructure', items: ['Multi-region Kubernetes', 'Kafka Event Streaming', 'PostgreSQL + TimescaleDB', 'Redis Cache Layer'] },
    { cat: 'Security', items: ['Zero-trust IAM', 'RBAC with Attribute Control', 'Real-time Audit Logs', 'Encrypted Field Storage'] },
];

export default function AboutPage() {
    return (
        <div className="about-page">
            <InnerNav links={[
                { href: '/library', label: 'Templates' },
                { href: '/analytics', label: 'Analytics' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/contact', label: 'Contact' },
            ]} />

            <section className="section inner-hero">
                <div className="container">
                    <div style={{ maxWidth: 720 }}>
                        <span className="badge">About</span>
                        <h1 className="display-xl" style={{ margin: '20px 0 24px' }}>
                            Revenue Infrastructure<br />
                            <span className="text-gradient">for the AI Era</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 600 }}>
                            PROTOCOL_ZERO was founded on the premise that CRM systems had failed to evolve with the rise of machine learning. Most platforms bolt AI onto legacy architectures. We rebuilt from zero.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section about-mission">
                <div className="container">
                    <div className="about-mission-grid">
                        <div className="about-mission-statement glass-card card-pad-lg">
                            <div className="glow-line glow-line-left" />
                            <h2 className="display-md" style={{ marginBottom: 20 }}>Our Mission</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1rem' }}>
                                To give every revenue organization — regardless of size — access to the same quality of AI-driven intelligence that was previously available only to companies with dedicated data science teams and eight-figure technology budgets.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1rem', marginTop: 16 }}>
                                We measure our success by one metric: the revenue outcomes of the organizations that run on our platform.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { label: 'Founded', value: '2021' },
                                { label: 'Enterprise Clients', value: '1,200+' },
                                { label: 'Countries', value: '48' },
                                { label: 'Uptime SLA', value: '99.99%' },
                            ].map((s) => (
                                <div key={s.label} className="glass-card card-pad-md about-stat">
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</p>
                                    <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-violet)', letterSpacing: '-0.02em' }}>{s.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header section-header-left">
                        <span className="badge">Core Principles</span>
                        <h2 className="display-lg" style={{ marginTop: 16 }}>What We Stand For</h2>
                    </div>
                    <div className="grid-2col">
                        {PILLARS.map((p) => (
                            <div key={p.id} className="glass-card card-pad-lg">
                                <h3 className="display-sm" style={{ marginBottom: 12 }}>{p.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header section-header-left">
                        <span className="badge">Technology</span>
                        <h2 className="display-lg" style={{ marginTop: 16 }}>The Stack Behind the Platform</h2>
                    </div>
                    <div className="grid-3col">
                        {TECH_STACK.map((cat) => (
                            <div key={cat.cat} className="glass-card card-pad-lg">
                                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 16 }}>{cat.cat}</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {cat.items.map((item) => (
                                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-violet)', flexShrink: 0 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div className="container">
                    <h2 className="display-lg" style={{ marginBottom: 16 }}>Start with the Template Ecosystem</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.8 }}>Explore 12 complete CRM design systems built on PROTOCOL_ZERO's intelligence layer.</p>
                    <Link href="/library" className="btn btn-primary btn-lg">Browse Templates</Link>
                </div>
            </section>

            <footer style={{ padding: '24px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>← Back to PROTOCOL_ZERO</Link>
                </div>
            </footer>

            <style>{`
        .inner-nav {
          position: sticky; top: 0; z-index: 100;
          height: 60px;
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border-subtle);
          backdrop-filter: blur(20px);
        }
        .inner-nav .container {
          height: 100%; display: flex; align-items: center; justify-content: space-between;
        }
        .brand-logo-sm {
          font-family: var(--font-display); font-size: 0.875rem; font-weight: 700;
          letter-spacing: 0.04em; color: var(--text-primary);
        }
        .inner-nav-links {
          display: flex; gap: 28px;
        }
        .inner-nav-links a {
          font-size: 0.875rem; color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .inner-nav-links a:hover { color: var(--text-primary); }
        .inner-hero { padding-top: 80px; }
        .about-mission-grid {
          display: grid; grid-template-columns: 1fr 280px; gap: 32px; align-items: start;
        }
        .about-stat { display: flex; flex-direction: column; }
        @media (max-width: 768px) {
          .about-mission-grid { grid-template-columns: 1fr; }
          .inner-nav-links { display: none; }
        }
      `}</style>
        </div>
    );
}
