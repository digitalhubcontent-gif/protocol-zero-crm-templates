import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'PROTOCOL_ZERO CRM Template Ecosystem pricing — 12 complete enterprise CRM design systems.',
};

const TIERS = [
    {
        name: 'Starter',
        price: '$79',
        period: 'one-time',
        description: 'Three complete CRM template systems for early-stage teams building their first enterprise CRM product.',
        features: [
            '3 CRM template variations',
            '10 internal pages per template',
            'Dark + light mode',
            'TypeScript source code',
            'React + Next.js 14',
            'Framer Motion animations',
            '12 months updates',
        ],
        highlighted: false,
        cta: 'Get Starter Pack',
    },
    {
        name: 'Ecosystem',
        price: '$149',
        period: 'one-time',
        description: 'All 12 CRM templates, the complete design system, and the full template library infrastructure. The full PROTOCOL_ZERO ecosystem.',
        features: [
            'All 12 CRM template variations',
            '10 internal pages per template',
            'Centralized template registry',
            'Shared design token system',
            'Library navigation system',
            'Dark + light mode',
            'TypeScript strict mode',
            'Reusable UI primitives',
            'Framer Motion transitions',
            'Mobile-first responsive',
            'Lifetime updates',
        ],
        highlighted: true,
        cta: 'Get Full Ecosystem',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'per project',
        description: 'White-label license, custom template variations, dedicated onboarding, and priority technical support for agencies and product teams.',
        features: [
            'Everything in Ecosystem',
            'White-label license',
            'Custom template builds',
            'Figma design files',
            'Priority support',
            'Team onboarding call',
            'Custom integrations',
        ],
        highlighted: false,
        cta: 'Contact Sales',
    },
];

const MAILTO_LINK = "https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" + encodeURIComponent("Custom Project Inquiry — PROTOCOL_ZERO") + "&body=" + encodeURIComponent("Hi,\n\nI came across your PROTOCOL_ZERO CRM templates and I am impressed with the quality of your work.\n\nI am looking for a custom solution for my project. Here are some details:\n\nProject Type: [CRM / SaaS Dashboard / Enterprise Software / Other]\nTimeline: [Flexible / Within 1 month / Within 3 months]\nBudget Range: [Open to discuss]\n\nBrief Description:\n[Please describe what you need built]\n\nLooking forward to hearing from you.\n\nBest regards,\n[Your Name]");

const FAQ = [
    { q: 'Do I need a CRM subscription to use the templates?', a: 'No. These are design and code assets — HTML, CSS, TypeScript components built with React/Next.js. There is no SaaS subscription required.' },
    { q: 'Can I use these on multiple client projects?', a: 'The Ecosystem license covers one project. For agency-scale use across multiple clients, the Enterprise white-label license is required.' },
    { q: 'What framework do the templates use?', a: 'Next.js 14 with TypeScript (strict mode), Framer Motion for animations, and a custom CSS design token system. No Tailwind required.' },
    { q: 'Are the templates production-ready?', a: 'Yes. They include full routing, theme system, responsive layouts, and accessibility compliance. You connect your data sources and go.' },
];

export default function PricingPage() {
    return (
        <div>
            <InnerNav links={[
                { href: '/about', label: 'About' },
                { href: '/analytics', label: 'Analytics' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/library', label: 'Templates' },
            ]} />

            <section className="section" style={{ paddingTop: 80, textAlign: 'center' }}>
                <div className="container">
                    <span className="badge">Pricing</span>
                    <h1 className="display-xl" style={{ margin: '20px 0 20px' }}>
                        One Purchase.<br />
                        <span className="text-gradient">Lifetime Access.</span>
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
                        No subscriptions. No seat licenses. One-time purchase delivers the complete PROTOCOL_ZERO CRM template ecosystem.
                    </p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 64 }}>
                <div className="container">
                    <div className="pricing-grid">
                        {TIERS.map((tier) => (
                            <div
                                key={tier.name}
                                className={`glass-card card-pad-lg pricing-card ${tier.highlighted ? 'pricing-card-featured' : ''}`}
                            >
                                {tier.highlighted && (
                                    <div className="pricing-popular-badge">Most Popular</div>
                                )}
                                <p className="pricing-tier-name">{tier.name}</p>
                                <div className="pricing-price-row">
                                    <span className="pricing-price">{tier.price}</span>
                                    <span className="pricing-period">{tier.period}</span>
                                </div>
                                <p className="pricing-desc">{tier.description}</p>
                                <ul className="pricing-features">
                                    {tier.features.map((f) => (
                                        <li key={f} className="pricing-feature-item">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.highlighted ? 'var(--accent-violet)' : 'var(--status-success)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {tier.name === 'Enterprise' ? (
                                    <a
                                        href={MAILTO_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`btn btn-full btn-secondary`}
                                        style={{ marginTop: 'auto', textAlign: 'center' }}
                                    >
                                        {tier.cta}
                                    </a>
                                ) : (
                                    <Link
                                        href="/library"
                                        className={`btn btn-full ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ marginTop: 'auto' }}
                                    >
                                        {tier.cta}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 720 }}>
                    <div className="section-header">
                        <h2 className="display-md">Frequently Asked Questions</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {FAQ.map((item) => (
                            <div key={item.q} className="glass-card card-pad-lg faq-item">
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{item.q}</h3>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item.a}</p>
                            </div>
                        ))}
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
        .pricing-card { display: flex; flex-direction: column; position: relative; }
        .pricing-card-featured { border-color: var(--border-accent); box-shadow: var(--shadow-glow-sm); }
        .pricing-popular-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--gradient-primary); color: white; font-size: 0.6875rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 4px 12px; border-radius: var(--radius-full); white-space: nowrap;
        }
        .pricing-tier-name { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .pricing-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; }
        .pricing-price { font-family: var(--font-display); font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); }
        .pricing-period { font-size: 0.8125rem; color: var(--text-muted); }
        .pricing-desc { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid var(--border-subtle); }
        .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; flex: 1; }
        .pricing-feature-item { display: flex; align-items: center; gap: 10px; font-size: 0.875rem; color: var(--text-secondary); }
        .faq-item { margin-bottom: 0; border-radius: var(--radius-md); }
        @media (max-width: 768px) { .inner-nav-links { display: none; } }
      `}</style>
        </div >
    );
}
