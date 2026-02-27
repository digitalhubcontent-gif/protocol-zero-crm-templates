import React from 'react';
import Link from 'next/link';
import styles from './TemplateNav.module.css';

interface TemplateNavProps {
    templateSlug: string;
    currentPage: string;
    accentColor: string;
}

const PAGES = [
    { id: 'landing', label: 'Overview', path: '' },
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', path: '/analytics' },
    { id: 'pipeline', label: 'Pipeline', path: '/pipeline' },
    { id: 'contact', label: 'Contacts', path: '/contact' },
    { id: 'activity', label: 'Activity', path: '/activity' },
    { id: 'reports', label: 'Reports', path: '/reports' },
    { id: 'automation', label: 'Automation', path: '/automation' },
    { id: 'integrations', label: 'Integrations', path: '/integrations' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'features', label: 'Features', path: '/features' },
] as const;

export function TemplateNav({ templateSlug, currentPage, accentColor }: TemplateNavProps) {
    return (
        <nav className={styles.nav} aria-label="Template pages">
            <div className={styles.inner}>
                <div className={styles.scroll}>
                    {PAGES.map((page) => {
                        const isActive = currentPage === page.id;
                        const href = `/templates/${templateSlug}${page.path}`;
                        return (
                            <Link
                                key={page.id}
                                href={href}
                                className={styles.tab}
                                data-active={isActive}
                                style={isActive ? { color: accentColor, borderBottomColor: accentColor } : undefined}
                            >
                                {page.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
