import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'Security',
    description: 'Enterprise-grade zero-trust security architecture, compliance certifications, and data governance in PROTOCOL_ZERO.',
};

const CERTS = [
    { id: 'soc2', name: 'SOC 2 Type II', detail: 'Annual third-party audit of security, availability, and confidentiality controls.' },
    { id: 'iso', name: 'ISO 27001', detail: 'Certified information security management system across all infrastructure tiers.' },
    { id: 'gdpr', name: 'GDPR', detail: 'Full compliance with EU data protection regulation including DPA execution.' },
    { id: 'hipaa', name: 'HIPAA-Ready', detail: 'Infrastructure supports HIPAA Business Associate Agreement execution.' },
    { id: 'ccpa', name: 'CCPA', detail: 'California Consumer Privacy Act compliant data handling and deletion workflows.' },
    { id: 'fedramp', name: 'FedRAMP (Pending)', detail: 'Authorization in progress for U.S. federal government deployment.' },
];

const LAYERS = [
    {
        id: 'network',
        title: 'Network Security',
        items: ['TLS 1.3 end-to-end encryption', 'Private VPC with no public access', 'DDoS mitigation at the edge', 'Web application firewall (WAF)', 'Network-level anomaly detection'],
    },
    {
        id: 'data',
        title: 'Data Protection',
        items: ['AES-256 encryption at rest', 'Customer-managed encryption keys (CMEK)', 'Field-level encryption for PII', 'Automated daily backups with 30-day retention', 'Point-in-time recovery'],
    },
    {
        id: 'access',
        title: 'Identity & Access',
        items: ['Zero-trust access model', 'Role-based access control (RBAC)', 'Attribute-based access control (ABAC)', 'SSO via SAML 2.0 / OIDC', 'Hardware-enforced MFA'],
    },
    {
        id: 'ops',
        title: 'Security Operations',
        items: ['24/7 SOC monitoring', 'Real-time audit log streaming', 'Automated threat detection', 'Bug bounty program (HackerOne)', '90-minute incident response SLA'],
    },
];

export default function SecurityPage() {
    return (
        <div>
            <InnerNav links={[
                { href: '/about', label: 'About' },
                { href: '/analytics', label: 'Analytics' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/library', label: 'Templates' },
            ]} />

            <section className="section" style={{ paddingTop: 80 }}>
                <div className="container">
                    <div style={{ maxWidth: 720 }}>
                        <span className="badge">Enterprise Security</span>
                        <h1 className="display-xl" style={{ margin: '20px 0 24px' }}>
                            Zero-Trust Security<br />
                            <span className="text-gradient">by Architecture</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Security at PROTOCOL_ZERO is not a compliance checkbox. It is a design constraint applied at every layer of the stack — from the physical data center to the API surface to the UI.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-header section-header-left">
                        <span className="badge">Compliance</span>
                        <h2 className="display-lg" style={{ marginTop: 16 }}>Certifications & Frameworks</h2>
                    </div>
                    <div className="grid-3col">
                        {CERTS.map((c) => (
                            <div key={c.id} className="glass-card card-pad-lg">
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-violet)', letterSpacing: '0.06em', marginBottom: 10 }}>{c.name}</p>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header section-header-left">
                        <span className="badge">Architecture</span>
                        <h2 className="display-lg" style={{ marginTop: 16 }}>Defense-in-Depth Layers</h2>
                    </div>
                    <div className="grid-2col">
                        {LAYERS.map((layer) => (
                            <div key={layer.id} className="glass-card card-pad-lg">
                                <h3 className="display-sm" style={{ marginBottom: 20 }}>{layer.title}</h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {layer.items.map((item) => (
                                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--status-success)', flexShrink: 0 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="glass-card card-pad-lg" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
                        <h2 className="display-md" style={{ marginBottom: 16 }}>Security Review Available</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
                            Enterprise teams can request our security documentation package — including penetration test reports, audit results, data flow diagrams, and DPA templates.
                        </p>
                        <Link href="/contact" className="btn btn-primary">Request Security Documentation</Link>
                    </div>
                </div>
            </section>

            <footer style={{ padding: '24px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>← Back to PROTOCOL_ZERO</Link>
                </div>
            </footer>

            <style>{`
        .inner-nav { position: sticky; top: 0; z-index: 100; height: 60px; background: var(--bg-nav); border-bottom: 1px solid var(--border-subtle); backdrop-filter: blur(20px); }
        .inner-nav .container { height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .brand-logo-sm { font-family: var(--font-display); font-size: 0.875rem; font-weight: 700; letter-spacing: 0.04em; color: var(--text-primary); }
        .inner-nav-links { display: flex; gap: 28px; }
        .inner-nav-links a { font-size: 0.875rem; color: var(--text-secondary); transition: color var(--transition-fast); }
        .inner-nav-links a:hover { color: var(--text-primary); }
        @media (max-width: 768px) { .inner-nav-links { display: none; } }
      `}</style>
        </div>
    );
}
