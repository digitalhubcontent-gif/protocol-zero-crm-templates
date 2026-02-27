'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavLink {
    href: string;
    label: string;
}

interface InnerNavProps {
    links?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
    { href: '/about', label: 'About' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/library', label: 'Templates' },
];

export function InnerNav({ links = DEFAULT_LINKS }: InnerNavProps) {
    return (
        <nav className="inner-nav">
            <div className="container">
                <Link href="/" className="brand-logo-sm">PROTOCOL_ZERO</Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div className="inner-nav-links">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
