import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'PROTOCOL_ZERO | AI-Powered CRM Intelligence',
    template: '%s | PROTOCOL_ZERO',
  },
  description:
    'PROTOCOL_ZERO is an enterprise-grade AI-powered CRM platform with predictive forecasting, behavioral analytics, and automated revenue operations. Premium CRM template ecosystem.',
  keywords:
    'AI CRM, enterprise CRM, predictive sales forecasting, revenue intelligence, CRM templates, SaaS CRM',
  authors: [{ name: 'PROTOCOL_ZERO' }],
  openGraph: {
    title: 'PROTOCOL_ZERO | AI-Powered CRM Intelligence',
    description:
      'Enterprise AI-powered CRM with predictive forecasting, pipeline intelligence, and automated revenue operations.',
    type: 'website',
    siteName: 'PROTOCOL_ZERO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050508',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
