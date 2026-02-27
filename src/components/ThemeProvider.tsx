'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeContextValue } from '@/lib/types';

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('pz-theme') as Theme | null;
        const resolved = stored ?? 'dark';
        setTheme(resolved);
        document.documentElement.setAttribute('data-theme', resolved);
        setMounted(true);
    }, []);

    function toggleTheme() {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('pz-theme', next);
        document.documentElement.setAttribute('data-theme', next);
    }

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    return useContext(ThemeContext);
}
