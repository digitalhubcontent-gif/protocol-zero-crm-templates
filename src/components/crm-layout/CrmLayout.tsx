'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { CrmTemplate } from '@/lib/types';
import { TemplateNav } from './TemplateNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TemplateThemeProvider } from '@/providers/TemplateThemeProvider';
import { getPageTransition } from '@/tokens/motion';
import styles from './CrmLayout.module.css';

interface CrmLayoutProps {
    children: React.ReactNode;
    template: CrmTemplate;
    prevTemplate: CrmTemplate | null;
    nextTemplate: CrmTemplate | null;
    currentPage: string;
    accentColor?: string;
}

export function CrmLayout({
    children,
    template,
    prevTemplate,
    nextTemplate,
    currentPage,
    accentColor,
}: CrmLayoutProps) {
    const router = useRouter();
    const accent = accentColor ?? template.accentColor;
    const transition = getPageTransition(template.slug);

    const handlePrev = () => {
        if (prevTemplate) router.push(`/templates/${prevTemplate.slug}`);
    };

    const handleNext = () => {
        if (nextTemplate) router.push(`/templates/${nextTemplate.slug}`);
    };

    return (
        <TemplateThemeProvider templateSlug={template.slug}>
            <div className={styles.root}>
                {/* Template Navigation Bar */}
                <header className={styles.topBar}>
                    <div className={styles.topBarInner}>
                        <div className={styles.topBarLeft}>
                            <Link href="/library" className={styles.backLink}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Library
                            </Link>
                            <div className={styles.topBarDivider} aria-hidden="true" />
                            <div className={styles.templateMeta}>
                                <span className={styles.templateId} style={{ color: accent }}>
                                    {template.id.toUpperCase()}
                                </span>
                                <span className={styles.templateName}>{template.name}</span>
                            </div>
                        </div>

                        <div className={styles.topBarRight}>
                            {template.slug !== 'crm-03' && <ThemeToggle />}
                            <div className={styles.navArrows}>
                                <button
                                    onClick={handlePrev}
                                    disabled={!prevTemplate}
                                    className={styles.arrowBtn}
                                    title={prevTemplate ? `Previous: ${prevTemplate.name}` : 'First template'}
                                    aria-label={prevTemplate ? `Go to ${prevTemplate.name}` : 'No previous template'}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>
                                <span className={styles.templateCounter}>
                                    {template.order} / 12
                                </span>
                                <button
                                    onClick={handleNext}
                                    disabled={!nextTemplate}
                                    className={styles.arrowBtn}
                                    title={nextTemplate ? `Next: ${nextTemplate.name}` : 'Last template'}
                                    aria-label={nextTemplate ? `Go to ${nextTemplate.name}` : 'No next template'}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Navigation */}
                <TemplateNav
                    templateSlug={template.slug}
                    currentPage={currentPage}
                    accentColor={accent}
                />

                {/* Page Content — per-template motion profile */}
                <AnimatePresence mode="wait">
                    <motion.main
                        className={styles.content}
                        key={currentPage}
                        initial={transition.initial}
                        animate={transition.animate}
                        exit={transition.exit}
                        transition={transition.transition}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>

                {/* Template Footer */}
                <footer className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.footerNav}>
                            {prevTemplate && (
                                <Link href={`/templates/${prevTemplate.slug}`} className={styles.footerNavBtn}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                    <div>
                                        <p className={styles.footerNavLabel}>Previous Template</p>
                                        <p className={styles.footerNavName}>{prevTemplate.name}</p>
                                    </div>
                                </Link>
                            )}
                            {!prevTemplate && <div />}
                            <Link href="/library" className={styles.footerLibraryBtn}>
                                View All Templates
                            </Link>
                            {nextTemplate && (
                                <Link href={`/templates/${nextTemplate.slug}`} className={`${styles.footerNavBtn} ${styles.footerNavBtnRight}`}>
                                    <div>
                                        <p className={styles.footerNavLabel}>Next Template</p>
                                        <p className={styles.footerNavName}>{nextTemplate.name}</p>
                                    </div>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </Link>
                            )}
                            {!nextTemplate && <div />}
                        </div>
                        <div className={styles.footerBranding}>
                            <span>Powered by </span>
                            <a href="https://cashbackpro.in" className={styles.footerBrandLink}>CashbackPro.in</a>
                            <span> — India&apos;s smartest cashback platform</span>
                        </div>
                        <div className={styles.footerHireMe}>
                            <span>Need a custom template or SaaS product? </span>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=digitalhubcontent@gmail.com&su=Custom%20Project%20Inquiry%20%E2%80%94%20PROTOCOL_ZERO&body=Hi%2C%0A%0AI%20came%20across%20your%20PROTOCOL_ZERO%20CRM%20templates.%0A%0AI%20am%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D'm%20impressed%20with%20the%20quality%20of%20your%20work.%0A%0AI'm%20looking%20for%20a%20custom%20solution%20for%20my%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%5BCRM%20%2F%20SaaS%20Dashboard%20%2F%20Enterprise%20Software%20%2F%20Other%5D%0ATimeline%3A%20%5BFlexible%20%2F%20Within%201%20month%20%2F%20Within%203%20months%5D%0ABudget%20Range%3A%20%5BOpen%20to%20discuss%5D%0A%0ABrief%20Description%3A%0A%5BPlease%20describe%20what%20you%20need%20built%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D" target="_blank" rel="noopener noreferrer" className={styles.footerBrandLink}>digitalhubcontent@gmail.com</a>
                        </div>
                    </div>
                </footer>
            </div>
        </TemplateThemeProvider>
    );
}
