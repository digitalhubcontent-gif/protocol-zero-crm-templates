import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerNav } from '@/components/InnerNav';

export const metadata: Metadata = {
    title: 'Documentation',
    description: 'Getting started guide for the PROTOCOL_ZERO CRM Template Ecosystem.',
};

const SECTIONS = [
    {
        id: 'quickstart',
        title: 'Quick Start',
        items: [
            { title: 'Project Structure Overview', desc: 'Understanding the registry, template system, and shared components.' },
            { title: 'Installation & Setup', desc: 'Node.js requirements, dependency installation, and first run.' },
            { title: 'Running in Development', desc: 'Starting the dev server and navigating the template library.' },
        ],
    },
    {
        id: 'templates',
        title: 'Working with Templates',
        items: [
            { title: 'Template Registry', desc: 'How to read and modify the centralized template configuration.' },
            { title: 'Adding a New Template', desc: 'Step-by-step guide to creating CRM_13 or beyond.' },
            { title: 'CrmLayout Component', desc: 'Understanding the shared layout wrapper and navigation system.' },
            { title: 'TemplateNav Configuration', desc: 'Modifying or extending the internal page tab navigation.' },
        ],
    },
    {
        id: 'design',
        title: 'Design System',
        items: [
            { title: 'CSS Token System', desc: 'Complete reference for all design tokens and their usage.' },
            { title: 'Dark / Light Mode', desc: 'How the ThemeProvider works and how to extend theme tokens.' },
            { title: 'UI Primitives', desc: 'Button, Card, Badge, MetricCard, DataTable, Section API reference.' },
            { title: 'Typography Scale', desc: 'Font families, size classes, and responsive scaling.' },
        ],
    },
    {
        id: 'deployment',
        title: 'Deployment',
        items: [
            { title: 'Vercel Deployment', desc: 'One-command deploy to Vercel with zero configuration required.' },
            { title: 'Environment Configuration', desc: 'Optional environment variables and build configuration.' },
            { title: 'Production Optimization', desc: 'Build output analysis, image optimization, and performance tuning.' },
        ],
    },
];

export default function DocsPage() {
    return (
        <div>
            <InnerNav links={[
                { href: '/about', label: 'About' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/library', label: 'Templates' },
            ]} />

            <section className="section" style={{ paddingTop: 80 }}>
                <div className="container">
                    <div style={{ maxWidth: 640 }}>
                        <span className="badge">Documentation</span>
                        <h1 className="display-xl" style={{ margin: '20px 0 24px' }}>
                            Getting Started with<br />
                            <span className="text-gradient">PROTOCOL_ZERO</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Everything you need to configure, customize, and deploy the PROTOCOL_ZERO CRM template ecosystem.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'start' }}>
                        <div className="docs-sidebar">
                            <p className="docs-sidebar-heading">Contents</p>
                            {SECTIONS.map((s) => (
                                <a key={s.id} href={`#${s.id}`} className="docs-sidebar-link">{s.title}</a>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                            <div className="glass-card card-pad-lg docs-install">
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Quick Install</p>
                                <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--accent-cyan)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <span><span style={{ color: 'var(--text-muted)' }}>$</span> cd &quot;PREMIUM TEMPLATES&quot;</span>
                                    <span><span style={{ color: 'var(--text-muted)' }}>$</span> npm install</span>
                                    <span><span style={{ color: 'var(--text-muted)' }}>$</span> npm run dev</span>
                                    <span><span style={{ color: 'var(--text-muted)' }}>→</span> <span style={{ color: 'var(--status-success)' }}>Ready on http://localhost:3000</span></span>
                                </div>
                            </div>

                            {SECTIONS.map((section) => (
                                <div key={section.id} id={section.id}>
                                    <h2 className="display-sm" style={{ marginBottom: 24 }}>{section.title}</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {section.items.map((item) => (
                                            <div key={item.title} className="glass-card card-pad-md docs-item">
                                                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontSize: '0.9375rem' }}>{item.title}</p>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
        .docs-sidebar { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 4px; }
        .docs-sidebar-heading { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 8px; }
        .docs-sidebar-link { font-size: 0.875rem; color: var(--text-secondary); padding: 6px 0; transition: color var(--transition-fast); }
        .docs-sidebar-link:hover { color: var(--text-primary); }
        .docs-item { border-radius: var(--radius-md); }
        @media (max-width: 768px) {
          .inner-nav-links { display: none; }
          .docs-sidebar { display: none; }
          .section .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
