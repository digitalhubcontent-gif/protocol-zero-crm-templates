'use client';

import React, { useEffect } from 'react';
import { resolveTemplateTokens } from '@/tokens';
import { useTheme } from '@/components/ThemeProvider';

interface TemplateThemeProviderProps {
    templateSlug: string;
    children: React.ReactNode;
}

/**
 * TemplateThemeProvider
 * Injects template-specific CSS custom properties onto its wrapper element.
 * This is the bridge between the TypeScript token system and the CSS layer.
 *
 * Usage: Wrap page content in CrmLayout.
 * Children consume tokens via var(--token-name) in their styles.
 */
export function TemplateThemeProvider({
    templateSlug,
    children,
}: TemplateThemeProviderProps) {
    const { theme } = useTheme();
    // Force CRM-03 to always be dark mode
    const mode = templateSlug === 'crm-03' ? 'dark' : (theme === 'light' ? 'light' : 'dark');

    // Inject CSS vars into a dedicated element so they scope correctly
    // and cascade from this point down, without polluting :root
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const vars = resolveTemplateTokens(templateSlug, mode);
        Object.entries(vars).forEach(([key, val]) => {
            el.style.setProperty(key, val);
        });
    }, [templateSlug, mode]);

    return (
        <div ref={ref} data-template={templateSlug} data-mode={mode} style={{ display: 'contents' }}>
            {children}
        </div>
    );
}
