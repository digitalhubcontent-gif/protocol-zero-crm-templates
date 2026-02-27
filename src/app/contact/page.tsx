import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact the PROTOCOL_ZERO team for enterprise inquiries, partnership, or technical support.',
};

export default function ContactPage() {
    return (
        <div>
            <InnerNav links={[
                { href: '/about', label: 'About' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/library', label: 'Templates' },
            ]} />

            <section className="section" style={{ paddingTop: 80 }}>
                <div className="container">
                    <div className="contact-grid">
                        <div>
                            <span className="badge">Contact</span>
                            <h1 className="display-lg" style={{ margin: '16px 0 20px' }}>
                                Get in Touch
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40 }}>
                                Enterprise inquiries, partnership discussions, and white-label licensing. Our team responds within one business day.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {[
                                    { label: 'Enterprise Sales', detail: 'Licensing, custom builds, volume pricing', href: 'mailto:sales@protocolzero.ai' },
                                    { label: 'Technical Support', detail: 'Implementation questions, integration issues', href: 'mailto:support@protocolzero.ai' },
                                    { label: 'Partnerships', detail: 'Agency programs, reseller opportunities', href: 'mailto:partnerships@protocolzero.ai' },
                                ].map((item) => (
                                    <a key={item.label} href={item.href} className="glass-card card-pad-md contact-link-card">
                                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</p>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.detail}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card card-pad-lg contact-form-card">
                            <h2 className="display-sm" style={{ marginBottom: 24 }}>Send a Message</h2>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input className="form-input" type="text" placeholder="Alex" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input className="form-input" type="text" placeholder="Morgan" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Work Email</label>
                                    <input className="form-input" type="email" placeholder="alex@company.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input className="form-input" type="text" placeholder="Acme Corporation" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select className="form-input form-select">
                                        <option value="">Select inquiry type</option>
                                        <option>Enterprise Licensing</option>
                                        <option>White-label Partnership</option>
                                        <option>Technical Support</option>
                                        <option>Custom Development</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-textarea" placeholder="Describe your project or inquiry in detail..." rows={5} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-full">
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
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
        .contact-link-card { display: block; text-decoration: none; transition: border-color var(--transition-base), transform var(--transition-base); }
        .contact-link-card:hover { border-color: var(--border-accent); transform: translateY(-2px); }
        @media (max-width: 768px) { .inner-nav-links { display: none; } }
      `}</style>
        </div>
    );
}
