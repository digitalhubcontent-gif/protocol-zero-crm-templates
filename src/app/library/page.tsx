'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CRM_TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/registry';
import type { TemplateCategory } from '@/lib/types';
import { ThemeToggle } from '@/components/ThemeToggle';

type FilterCategory = 'All' | TemplateCategory;

// Page configurations per template for carousel
const TEMPLATE_PAGES: Record<string, { name: string; key: string; icon: string }[]> = {
    'crm-01': [
        { name: 'Dashboard', key: 'dashboard', icon: '▤' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Reports', key: 'reports', icon: '▦' },
        { name: 'Activity', key: 'activity', icon: '◑' },
    ],
    'crm-02': [
        { name: 'Command', key: 'dashboard', icon: '◈' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Analytics', key: 'analytics', icon: '▦' },
        { name: 'Automation', key: 'automation', icon: '⚡' },
        { name: 'Reports', key: 'reports', icon: '▤' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
    ],
    'crm-03': [
        { name: 'Terminal', key: 'dashboard', icon: '▦' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Reports', key: 'reports', icon: '▤' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Activity', key: 'activity', icon: '◑' },
    ],
    'crm-04': [
        { name: 'Overview', key: 'dashboard', icon: '▤' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Reports', key: 'reports', icon: '▦' },
        { name: 'Activity', key: 'activity', icon: '◑' },
    ],
    'crm-05': [
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Dashboard', key: 'dashboard', icon: '▤' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Activity', key: 'activity', icon: '◑' },
        { name: 'Reports', key: 'reports', icon: '▦' },
    ],
    'crm-06': [
        { name: 'Neural Hub', key: 'dashboard', icon: '◈' },
        { name: 'Analytics', key: 'analytics', icon: '▦' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Activity', key: 'activity', icon: '◑' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Reports', key: 'reports', icon: '▤' },
    ],
    'crm-07': [
        { name: 'Executive', key: 'dashboard', icon: '▤' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Reports', key: 'reports', icon: '▦' },
        { name: 'Activity', key: 'activity', icon: '◑' },
    ],
    'crm-08': [
        { name: 'Workspace', key: 'dashboard', icon: '◑' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Activity', key: 'activity', icon: '▦' },
        { name: 'Reports', key: 'reports', icon: '▤' },
    ],
};

function defaultPages(slug: string): { name: string; key: string; icon: string }[] {
    return TEMPLATE_PAGES[slug] || [
        { name: 'Dashboard', key: 'dashboard', icon: '▤' },
        { name: 'Analytics', key: 'analytics', icon: '◈' },
        { name: 'Pipeline', key: 'pipeline', icon: '⇥' },
        { name: 'Contacts', key: 'contact', icon: '◎' },
        { name: 'Reports', key: 'reports', icon: '▦' },
        { name: 'Activity', key: 'activity', icon: '◑' },
    ];
}

// Carousel mockup designs vary per template
function MockupFrame({ accent, pageKey, pageIcon, pageName, order }: {
    accent: string; pageKey: string; pageIcon: string; pageName: string; order: number;
}) {
    const isDark = [2, 3, 6, 7].includes(order); // templates 2,3,6,7 prominently dark in dark mode
    const bg = isDark ? `${accent}06` : `${accent}04`;

    // Unique layout per page type
    const layouts: Record<string, React.ReactNode> = {
        dashboard: (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                    {[0.9, 0.6, 0.8].map((o, i) => (
                        <div key={i} style={{ height: 26, background: `${accent}${Math.round(o * 25).toString(16).padStart(2, '0')}`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '60%', height: 3, background: `${accent}50`, borderRadius: 2 }} />
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, background: `${accent}08`, borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <polyline points="0,45 30,30 60,38 90,22 120,28 150,15 180,20 200,12" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
                        <polygon points="0,45 30,30 60,38 90,22 120,28 150,15 180,20 200,12 200,60 0,60" fill={accent} opacity="0.08" />
                    </svg>
                </div>
            </div>
        ),
        analytics: (
            <div style={{ flex: 1, display: 'flex', gap: 5, padding: 8 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[70, 45, 85, 55, 90, 40].map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: 30, height: 3, background: `${accent}20`, borderRadius: 1, flexShrink: 0 }} />
                            <div style={{ flex: 1, height: 3, background: `${accent}${Math.round(h / 100 * 50).toString(16).padStart(2, '00')}`, borderRadius: 1 }} />
                        </div>
                    ))}
                </div>
                <div style={{ width: 56, background: `${accent}08`, borderRadius: 3, display: 'flex', alignItems: 'flex-end', padding: '4px 4px 0', gap: 3 }}>
                    {[60, 80, 50, 90, 70].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: `${accent}${Math.round(h / 100 * 60).toString(16).padStart(2, '00')}`, borderRadius: '2px 2px 0 0' }} />
                    ))}
                </div>
            </div>
        ),
        pipeline: (
            <div style={{ flex: 1, display: 'flex', gap: 4, padding: 6 }}>
                {['LEAD', 'QUAL', 'PROP', 'WIN'].map((stage, i) => (
                    <div key={stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ height: 2, background: `${accent}${i === 2 ? '70' : '30'}`, borderRadius: 1 }} />
                        {[0, 1, 2].slice(0, 3 - i).map((j) => (
                            <div key={j} style={{ background: `${accent}${j === 0 && i === 2 ? '25' : '12'}`, borderRadius: 2, padding: '3px 4px' }}>
                                <div style={{ height: 3, width: `${75 - j * 15}%`, background: `${accent}40`, borderRadius: 1 }} />
                                <div style={{ height: 2, width: '50%', background: `${accent}20`, borderRadius: 1, marginTop: 2 }} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ),
        contact: (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 6, gap: 3 }}>
                {[1, 2, 3, 4, 5].map((r) => (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 0', borderBottom: `1px solid ${accent}10` }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: `${accent}${r === 1 ? '50' : '25'}`, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ height: 3, width: `${70 - r * 8}%`, background: `${accent}40`, borderRadius: 1 }} />
                        </div>
                        <div style={{ width: 20, height: 3, background: r === 2 ? '#10b981' : r === 4 ? '#ef4444' : `${accent}25`, borderRadius: 1 }} />
                    </div>
                ))}
            </div>
        ),
        reports: (
            <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, flex: 0.4 }}>
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} style={{ background: `${accent}${i % 2 === 0 ? '15' : '08'}`, borderRadius: 3, padding: 4 }}>
                            <div style={{ height: 2, width: '80%', background: `${accent}40`, borderRadius: 1 }} />
                            <div style={{ height: 2, width: '50%', background: `${accent}25`, borderRadius: 1, marginTop: 3 }} />
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, background: `${accent}06`, borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 40">
                        {[20, 60, 35, 80, 50, 90, 45, 70].map((v, i) => (
                            <circle key={i} cx={i * 26 + 10} cy={40 - v * 0.38} r={2.5} fill={accent} opacity={0.5 + i * 0.05} />
                        ))}
                    </svg>
                </div>
            </div>
        ),
        activity: (
            <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[1, 2, 3, 4].map((r) => (
                    <div key={r} style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: `${accent}${r === 1 ? '80' : r === 2 ? '50' : '30'}`, marginTop: 2, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ height: 3, width: `${85 - r * 10}%`, background: `${accent}35`, borderRadius: 1 }} />
                            <div style={{ height: 2, width: `${50 - r * 5}%`, background: `${accent}20`, borderRadius: 1, marginTop: 3 }} />
                        </div>
                        <div style={{ width: 16, height: 2, background: `${accent}20`, borderRadius: 1, marginTop: 3 }} />
                    </div>
                ))}
            </div>
        ),
        automation: (
            <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[1, 2, 3].map((r) => (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${accent}${r === 1 ? '15' : '08'}`, borderRadius: 3, padding: '4px 6px', borderLeft: `2px solid ${accent}${r === 1 ? '80' : '40'}` }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: r < 3 ? '#10b981' : `${accent}40` }} />
                        <div style={{ flex: 1, height: 3, background: `${accent}35`, borderRadius: 1 }} />
                        <div style={{ width: 20, height: 8, background: `${accent}20`, borderRadius: 2 }} />
                    </div>
                ))}
            </div>
        ),
    };

    return (
        <div style={{ display: 'flex', height: '100%', background: bg }}>
            {/* Mini sidebar */}
            <div style={{ width: 28, background: `${accent}08`, borderRight: `1px solid ${accent}10`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0', gap: 6 }}>
                {[0.7, 0.4, 0.9, 0.5, 0.6].map((o, i) => (
                    <div key={i} style={{ width: 14, height: 3, background: `${accent}${Math.round(o * 40).toString(16).padStart(2, '00')}`, borderRadius: 2 }} />
                ))}
            </div>
            {/* Content area */}
            {layouts[pageKey] || layouts['dashboard']}
        </div>
    );
}

// Individual template carousel card
function TemplateCarouselCard({ tmpl, index }: { tmpl: typeof CRM_TEMPLATES[0]; index: number }) {
    const pages = defaultPages(tmpl.slug);
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const SLIDE_DURATION = 2800;
    const PROGRESS_TICK = 50;

    const nextSlide = useCallback(() => {
        setCurrentPage(p => (p + 1) % pages.length);
        setProgress(0);
    }, [pages.length]);

    useEffect(() => {
        if (isPaused) return;
        progressRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) return 0;
                return p + (PROGRESS_TICK / SLIDE_DURATION) * 100;
            });
        }, PROGRESS_TICK);
        intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [isPaused, nextSlide]);

    const handlePageClick = (i: number) => {
        setCurrentPage(i);
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
        // Restart
        setIsPaused(false);
    };

    const page = pages[currentPage];

    return (
        <motion.div
            key={tmpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
            layout
        >
            <Link
                href={`/templates/${tmpl.slug}`}
                className="lib-card glass-card"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Card header area with carousel */}
                <div className="lib-card-top" style={{ borderBottomColor: `${tmpl.accentColor}20`, position: 'relative', overflow: 'hidden' }}>
                    <div className="lib-card-number" style={{ color: tmpl.accentColor }}>
                        {String(tmpl.order).padStart(2, '0')}
                    </div>

                    {/* Carousel mockup frame */}
                    <div className="lib-card-mockup" style={{ background: `${tmpl.accentColor}05`, border: `1px solid ${tmpl.accentColor}15`, borderRadius: 6, overflow: 'hidden', height: 110, position: 'relative' }}>
                        {/* Top bar */}
                        <div style={{ height: 22, background: `${tmpl.accentColor}12`, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5, borderBottom: `1px solid ${tmpl.accentColor}15`, flexShrink: 0 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: `${tmpl.accentColor}60` }} />
                            <div style={{ fontSize: '0.45rem', color: tmpl.accentColor, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', opacity: 0.8 }}>
                                {page.icon} {page.name.toUpperCase()}
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                                {pages.slice(0, 4).map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={(e) => { e.preventDefault(); handlePageClick(i); }}
                                        style={{ width: i === currentPage ? 12 : 5, height: 3, borderRadius: 2, background: i === currentPage ? tmpl.accentColor : `${tmpl.accentColor}30`, transition: 'all 0.25s', cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Animated page content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                                style={{ height: 'calc(100% - 22px)', display: 'flex' }}
                            >
                                <MockupFrame
                                    accent={tmpl.accentColor}
                                    pageKey={page.key}
                                    pageIcon={page.icon}
                                    pageName={page.name}
                                    order={tmpl.order}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress bar at bottom */}
                        {!isPaused && (
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `${tmpl.accentColor}15` }}>
                                <div style={{ height: '100%', width: `${progress}%`, background: tmpl.accentColor, opacity: 0.6, transition: `width ${PROGRESS_TICK}ms linear`, borderRadius: '0 1px 1px 0' }} />
                            </div>
                        )}
                    </div>

                    {/* Page navigator pills */}
                    <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                        {pages.map((p, i) => (
                            <button
                                key={p.key}
                                onClick={(e) => { e.preventDefault(); handlePageClick(i); }}
                                style={{
                                    padding: '2px 7px',
                                    background: i === currentPage ? `${tmpl.accentColor}18` : 'transparent',
                                    border: `1px solid ${i === currentPage ? tmpl.accentColor + '40' : tmpl.accentColor + '15'}`,
                                    borderRadius: 3,
                                    fontSize: '0.5rem',
                                    color: i === currentPage ? tmpl.accentColor : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-mono)',
                                    letterSpacing: '0.04em',
                                    transition: 'all 0.15s',
                                    fontWeight: i === currentPage ? 700 : 400,
                                }}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Card body */}
                <div className="lib-card-bottom" style={{ padding: '16px 20px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="badge badge-neutral badge-sm">{tmpl.category}</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>10 pages</span>
                    </div>
                    <h2 className="display-sm lib-card-name">{tmpl.name}</h2>
                    <p className="lib-card-tagline">{tmpl.tagline}</p>
                    <div className="lib-card-cta">
                        <span>Preview Template</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </div>
                <div className="lib-card-accent-line" style={{ background: tmpl.accentColor }} />
            </Link>
        </motion.div>
    );
}

export default function LibraryPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

    const filtered = activeFilter === 'All'
        ? CRM_TEMPLATES
        : CRM_TEMPLATES.filter((t) => t.category === activeFilter);

    // Metric highlights for header
    const metrics = [
        { label: 'Templates', value: '12', sub: 'production-ready' },
        { label: 'Pages Each', value: '10', sub: 'unique layouts' },
        { label: 'Categories', value: '4', sub: 'use-case types' },
        { label: 'Dark + Light', value: '2×', sub: 'themes per template' },
    ];

    return (
        <div>
            {/* Sticky nav */}
            <nav className="lib-nav">
                <div className="container">
                    <Link href="/" className="brand-logo-sm">PROTOCOL_ZERO</Link>
                    <div className="lib-nav-right">
                        <Link href="/pricing" className="lib-nav-link">Pricing</Link>
                        <Link href="/docs" className="lib-nav-link">Docs</Link>
                        <ThemeToggle />
                        <Link href="/" className="btn btn-secondary btn-sm">Brand Site</Link>
                    </div>
                </div>
            </nav>

            {/* Hero header */}
            <section className="section" style={{ paddingTop: 80, paddingBottom: 0 }}>
                <div className="container">
                    <motion.div
                        className="lib-header"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ maxWidth: 560 }}>
                            <span className="badge" style={{ marginBottom: 16, display: 'inline-flex' }}>Template Library</span>
                            <h1 className="display-lg" style={{ marginBottom: 14 }}>
                                CRM Template Ecosystem
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1rem' }}>
                                {CRM_TEMPLATES.length} enterprise CRM design systems. Each template ships with 10 internal pages, complete dark &amp; light mode, TypeScript source, and a distinct design identity developed from the ground up.
                            </p>
                        </div>

                        {/* Premium metrics row */}
                        <div className="lib-header-stats">
                            {metrics.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    className="lib-stat"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                                >
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{s.label}</p>
                                    <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{s.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter + Grid */}
            <section className="section" style={{ paddingTop: 32 }}>
                <div className="container">
                    <div className="lib-filter-row">
                        {TEMPLATE_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat as FilterCategory)}
                                className={`lib-filter-btn ${activeFilter === cat ? 'lib-filter-active' : ''}`}
                            >
                                {cat}
                                <span className="lib-filter-count">
                                    {cat === 'All' ? CRM_TEMPLATES.length : CRM_TEMPLATES.filter((t) => t.category === cat).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="lib-grid">
                        {filtered.map((tmpl, i) => (
                            <TemplateCarouselCard key={tmpl.id} tmpl={tmpl} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA section */}
            <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="display-md" style={{ marginBottom: 14 }}>Ready to Build with PROTOCOL_ZERO?</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                            One purchase. All 12 templates. Full TypeScript source. Lifetime updates.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <Link href="/pricing" className="btn btn-primary btn-lg">View Pricing — $149</Link>
                            <Link href="/" className="btn btn-secondary btn-lg">Brand Site →</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CashbackPro Promo */}
            <section style={{ padding: '48px 0 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'var(--bg-card, rgba(255,255,255,0.04))',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 14,
                            padding: '28px 36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 24,
                            flexWrap: 'wrap',
                            backdropFilter: 'blur(12px)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Subtle accent glow */}
                        <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--accent-violet, #7c3aed)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>From the makers</p>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>CashbackPro.in</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Save on every online purchase. India&apos;s smartest cashback and rewards platform.</p>
                        </div>
                        <a
                            href="https://cashbackpro.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '10px 24px',
                                borderRadius: 8,
                                background: 'var(--accent-violet, #7c3aed)',
                                color: '#ffffff',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
                                whiteSpace: 'nowrap' as const,
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: 1,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(124,58,237,0.35)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
                        >
                            Visit CashbackPro →
                        </a>
                    </motion.div>

                    {/* Custom Development Promo */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            background: 'var(--bg-card, rgba(255,255,255,0.04))',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 14,
                            padding: '28px 36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 24,
                            flexWrap: 'wrap',
                            backdropFilter: 'blur(12px)',
                            position: 'relative',
                            overflow: 'hidden',
                            marginTop: 24,
                        }}
                    >
                        <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(56,189,248,0.06)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--chart-blue, #38bdf8)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Hire Me · Custom Development</p>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>Need a Custom Platform?</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>I build custom CRM dashboards, SaaS apps, and enterprise software. Let&apos;s discuss your vision.</p>
                        </div>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D'm%20impressed%20with%20the%20quality%20of%20your%20work.%0A%0AI'm%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" target="_blank" rel="noopener noreferrer"
                            style={{
                                padding: '10px 24px',
                                borderRadius: 8,
                                background: 'transparent',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-primary)',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
                                whiteSpace: 'nowrap' as const,
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: 1,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--text-muted)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-elevated)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            Get in Touch →
                        </a>
                    </motion.div>
                </div>
            </section>

            <footer style={{ padding: '24px 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', marginTop: 32 }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>← Back to PROTOCOL_ZERO</Link>
                </div>
            </footer>

            <style>{`
        .lib-nav { position: sticky; top: 0; z-index: 100; height: 60px; background: var(--bg-nav); border-bottom: 1px solid var(--border-subtle); backdrop-filter: blur(20px); }
        .lib-nav .container { height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .brand-logo-sm { font-family: var(--font-display); font-size: 0.875rem; font-weight: 700; letter-spacing: 0.04em; color: var(--text-primary); text-decoration: none; }
        .lib-nav-right { display: flex; align-items: center; gap: 24px; }
        .lib-nav-link { font-size: 0.875rem; color: var(--text-secondary); transition: color var(--transition-fast); text-decoration: none; }
        .lib-nav-link:hover { color: var(--text-primary); }
        .lib-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 40px; margin-bottom: 48px; flex-wrap: wrap; }
        .lib-header-stats { display: flex; gap: 36px; flex-shrink: 0; padding-top: 8px; }
        .lib-stat { text-align: center; min-width: 80px; }
        .lib-filter-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
        .lib-filter-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: var(--radius-sm);
          border: 1px solid var(--border-card); background: transparent;
          color: var(--text-secondary); font-size: 0.875rem; font-weight: 500;
          cursor: pointer; transition: all var(--transition-fast);
        }
        .lib-filter-btn:hover { border-color: var(--border-accent); color: var(--text-primary); background: var(--bg-secondary); }
        .lib-filter-active { border-color: var(--border-accent) !important; background: rgba(124,58,237,0.08) !important; color: var(--text-primary) !important; }
        .lib-filter-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 20px; height: 20px; padding: 0 6px;
          background: var(--bg-secondary); border-radius: 4px;
          font-size: 0.6875rem; font-weight: 600; color: var(--text-muted);
        }
        .lib-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .lib-card {
          display: block; position: relative; overflow: hidden;
          text-decoration: none; border-radius: var(--radius-lg);
          transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
          padding: 0;
        }
        .lib-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .lib-card-top { padding: 18px 20px 14px; border-bottom: 1px solid var(--border-subtle); }
        .lib-card-number { font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700; margin-bottom: 10px; }
        .lib-card-name { margin-bottom: 5px; color: var(--text-primary); }
        .lib-card-tagline { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }
        .lib-card-cta { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary); transition: color var(--transition-fast); }
        .lib-card:hover .lib-card-cta { color: var(--text-primary); }
        .lib-card-accent-line { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity var(--transition-base); }
        .lib-card:hover .lib-card-accent-line { opacity: 1; }
        @media (max-width: 1024px) { .lib-grid { grid-template-columns: repeat(2, 1fr); } .lib-header-stats { gap: 24px; } }
        @media (max-width: 640px) { .lib-grid { grid-template-columns: 1fr; } .lib-nav-right a:not(.btn) { display: none; } .lib-header-stats { gap: 20px; } .lib-stat { min-width: 60px; } }
      `}</style>
        </div>
    );
}
