'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CRM_TEMPLATES } from '@/lib/registry';
import { ThemeToggle } from '@/components/ThemeToggle';

const METRICS = [
  { label: 'Revenue Tracked', value: '$2.4B+' },
  { label: 'Pipeline Accuracy', value: '94.2%' },
  { label: 'Enterprise Clients', value: '1,200+' },
  { label: 'Automation Rate', value: '87%' },
];

const CAPABILITIES = [
  {
    id: 'forecasting',
    label: 'Predictive Forecasting',
    description: 'ML models trained on 18 months of pipeline data deliver deal outcome predictions with 94% accuracy across all revenue segments.',
  },
  {
    id: 'scoring',
    label: 'AI Deal Scoring',
    description: 'Real-time deal health scoring ingests 40+ behavioral signals to surface at-risk deals before they stall.',
  },
  {
    id: 'automation',
    label: 'Automation Engine',
    description: 'No-code workflow builder orchestrates multi-channel touchpoints, escalation rules, and approval chains across the entire revenue org.',
  },
  {
    id: 'analytics',
    label: 'Behavioral Analytics',
    description: 'Deep contact engagement tracking correlates email opens, site visits, and call notes into unified buyer intent profiles.',
  },
  {
    id: 'attribution',
    label: 'Revenue Attribution',
    description: 'Multi-touch attribution models map every marketing and sales interaction to closed revenue with full data lineage.',
  },
  {
    id: 'reporting',
    label: 'Smart Reporting',
    description: 'Custom report builder with 200+ data dimensions, scheduled delivery, and executive-grade visualization outputs.',
  },
];

const PREVIEW_TEMPLATES = CRM_TEMPLATES.slice(0, 6);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function HomePage() {
  return (
    <div>
      {/* ── Navbar ── */}
      <header className="brand-nav">
        <div className="brand-nav-inner container">
          <Link href="/" className="brand-logo">
            <span className="brand-logo-mark">PZ</span>
            PROTOCOL_ZERO
          </Link>
          <nav className="brand-nav-links desktop-nav">
            <Link href="/about">About</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/security">Security</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
          </nav>
          <div className="brand-nav-actions">
            <ThemeToggle />
            <Link href="/library" className="btn btn-primary btn-sm">
              Browse Templates
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="brand-hero">
        <div className="brand-hero-bg" aria-hidden="true">
          <div className="brand-hero-glow" />
          <div className="brand-hero-grid" />
        </div>
        <div className="container">
          <motion.div
            className="brand-hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="brand-hero-eyebrow">
              <span className="badge">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                Enterprise AI Platform — Version 3.2
              </span>
            </div>
            <h1 className="display-xl brand-hero-title">
              PROTOCOL_ZERO<br />
              <span className="text-gradient">CRM Intelligence</span>
            </h1>
            <p className="brand-hero-sub">
              The AI-native CRM platform built for organizations that treat revenue as infrastructure. Predictive forecasting, autonomous pipeline management, and behavioral intelligence — unified in a single operations layer.
            </p>
            <div className="brand-hero-cta">
              <Link href="/library" className="btn btn-primary btn-lg">
                Explore Templates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <Link href="/analytics" className="btn btn-secondary btn-lg">
                View AI Capabilities
              </Link>
            </div>
            <div className="brand-hero-metrics">
              {METRICS.map((m) => (
                <div key={m.label} className="brand-hero-metric">
                  <p className="brand-hero-metric-value">{m.value}</p>
                  <p className="brand-hero-metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="section brand-capabilities">
        <div className="container">
          <div className="section-header">
            <span className="badge">Core Intelligence</span>
            <h2 className="display-lg">Built on AI at Every Layer</h2>
            <p>Not a CRM with an AI add-on. PROTOCOL_ZERO is architected from the ground up around machine learning models, real-time signal processing, and autonomous decision engines.</p>
          </div>
          <div className="grid-3col">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                className="glass-card card-pad-lg brand-cap-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="brand-cap-indicator" />
                <h3 className="display-sm brand-cap-title">{cap.label}</h3>
                <p className="brand-cap-desc">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS PREVIEW ── */}
      <section className="section brand-analytics-preview">
        <div className="container">
          <div className="brand-analytics-grid">
            <div className="brand-analytics-text">
              <span className="badge">Revenue Intelligence</span>
              <h2 className="display-lg" style={{ marginTop: 16, marginBottom: 20 }}>
                Pipeline Clarity at<br />Machine Speed
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
                The PROTOCOL_ZERO analytics engine processes 10,000+ data events per minute across your entire revenue stack — surfacing actionable intelligence before your competitors can act on it.
              </p>
              <ul className="brand-analytics-list">
                {['Real-time KPI monitoring with sub-second refresh', 'Anomaly detection across 200+ revenue signals', 'Automated insight generation and executive briefings', 'Custom cohort analysis and retention modeling'].map((item) => (
                  <li key={item} className="brand-analytics-list-item">
                    <span className="brand-check-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/analytics" className="btn btn-secondary" style={{ marginTop: 8 }}>
                Explore Analytics Suite
              </Link>
            </div>
            <div className="brand-dashboard-mockup">
              <div className="brand-dashboard-header">
                <span className="brand-dashboard-title">Revenue Dashboard</span>
                <span className="badge badge-success badge-sm">
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                  Live
                </span>
              </div>
              <div className="brand-metrics-row">
                {[
                  { l: 'ARR', v: '$18.4M', c: '+23%', up: true },
                  { l: 'Win Rate', v: '41.2%', c: '+6.1pp', up: true },
                  { l: 'CAC', v: '$4,840', c: '-12%', up: false },
                ].map((m) => (
                  <div key={m.l} className="brand-mini-metric">
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.l}</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{m.v}</p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: m.up ? 'var(--status-success)' : 'var(--status-danger)', background: m.up ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', padding: '2px 6px', borderRadius: 4 }}>{m.c}</span>
                  </div>
                ))}
              </div>
              <div className="brand-chart-mockup">
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Pipeline by Stage</p>
                <div className="chart-bar-group" style={{ height: 80 }}>
                  {[60, 85, 45, 70, 55, 90, 40, 75, 65, 50, 80, 35].map((h, i) => (
                    <div
                      key={i}
                      className="chart-bar"
                      style={{
                        height: `${h}%`,
                        background: `hsl(${260 + i * 8}, 70%, ${45 + i * 2}%)`,
                        opacity: 0.7 + (i % 3) * 0.1,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <span key={m} style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{m}</span>
                  ))}
                </div>
              </div>
              <div className="brand-pipeline-preview">
                <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Active Deals</p>
                {[
                  { name: 'Meridian Corp', stage: 'Negotiation', val: '$280K', pct: 85 },
                  { name: 'Axon Systems', stage: 'Demo Scheduled', val: '$140K', pct: 60 },
                  { name: 'Corvus Data', stage: 'Proposal', val: '$95K', pct: 45 },
                ].map((d) => (
                  <div key={d.name} className="brand-deal-row">
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{d.name}</p>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{d.stage}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-violet)', marginBottom: 4 }}>{d.val}</p>
                      <div style={{ width: 80, height: 3, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${d.pct}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEMPLATE LIBRARY PREVIEW ── */}
      <section className="section brand-library-preview">
        <div className="container">
          <div className="section-header">
            <span className="badge">Template Ecosystem</span>
            <h2 className="display-lg">12 Enterprise CRM Systems</h2>
            <p>Each template is a complete, production-ready CRM design system — with 10 internal pages, distinct layout philosophy, and full dark/light mode support.</p>
          </div>
          <div className="grid-3col" style={{ gap: 20 }}>
            {PREVIEW_TEMPLATES.map((tmpl, i) => (
              <motion.div
                key={tmpl.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link href={`/templates/${tmpl.slug}`} className="brand-template-card glass-card card-pad-lg">
                  <div className="brand-template-card-header">
                    <span
                      className="brand-template-id"
                      style={{ color: tmpl.accentColor }}
                    >
                      {String(tmpl.order).padStart(2, '0')}
                    </span>
                    <span className="badge badge-neutral badge-sm">{tmpl.category}</span>
                  </div>
                  <h3 className="display-sm brand-template-name">{tmpl.name}</h3>
                  <p className="brand-template-tagline">{tmpl.tagline}</p>
                  <div className="brand-template-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <div
                    className="brand-template-accent-bar"
                    style={{ background: tmpl.accentColor }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/library" className="btn btn-primary btn-lg">
              View All 12 Templates
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="section brand-security">
        <div className="container">
          <div className="brand-security-grid">
            <div>
              <span className="badge">Enterprise Security</span>
              <h2 className="display-lg" style={{ marginTop: 16, marginBottom: 20 }}>
                Infrastructure-Grade<br />Security Architecture
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                PROTOCOL_ZERO is built on a zero-trust security model. Every data operation is encrypted, permissioned, and auditable. Purpose-built for organizations operating under strict compliance requirements.
              </p>
              <Link href="/security" className="btn btn-secondary" style={{ marginTop: 32 }}>
                View Security Architecture
              </Link>
            </div>
            <div className="brand-security-badges">
              {[
                { name: 'SOC 2 Type II', desc: 'Independently audited' },
                { name: 'ISO 27001', desc: 'Certified' },
                { name: 'GDPR', desc: 'Compliant' },
                { name: 'HIPAA', desc: 'Ready' },
                { name: 'AES-256', desc: 'Encryption at rest' },
                { name: 'TLS 1.3', desc: 'In transit' },
              ].map((b) => (
                <div key={b.name} className="glass-card card-pad-md brand-security-badge">
                  <p className="brand-security-badge-name">{b.name}</p>
                  <p className="brand-security-badge-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="brand-cta-box glass-card card-pad-lg">
            <h2 className="display-lg" style={{ marginBottom: 16 }}>
              Deploy Your AI CRM<br />
              <span className="text-gradient">Infrastructure Today</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.8 }}>
              12 complete CRM systems. 10 pages each. Fully typed, production-ready, and built for scale.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/library" className="btn btn-primary btn-lg">
                Browse Template Library
              </Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="brand-footer">
        <div className="container">
          <div className="brand-footer-grid">
            <div>
              <Link href="/" className="brand-logo" style={{ marginBottom: 16 }}>
                <span className="brand-logo-mark">PZ</span>
                PROTOCOL_ZERO
              </Link>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 280 }}>
                AI-powered enterprise CRM intelligence. Built for revenue organizations that operate at scale.
              </p>
            </div>
            <div>
              <p className="brand-footer-heading">Platform</p>
              <nav className="brand-footer-links">
                <Link href="/analytics">Analytics</Link>
                <Link href="/security">Security</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/docs">Documentation</Link>
              </nav>
            </div>
            <div>
              <p className="brand-footer-heading">Templates</p>
              <nav className="brand-footer-links">
                <Link href="/library">All Templates</Link>
                <Link href="/library?filter=Enterprise">Enterprise</Link>
                <Link href="/library?filter=AI-Focused">AI-Focused</Link>
                <Link href="/library?filter=Analytics-Heavy">Analytics</Link>
              </nav>
            </div>
            <div>
              <p className="brand-footer-heading">Company</p>
              <nav className="brand-footer-links">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>
          </div>
          <div className="brand-footer-bottom">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              © 2026 PROTOCOL_ZERO. All rights reserved.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
              v3.2.1 — System Nominal
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        /* ── Brand Nav ── */
        .brand-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 68px;
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border-subtle);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .brand-nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .brand-logo-mark {
          width: 30px;
          height: 30px;
          background: var(--gradient-primary);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6875rem;
          font-weight: 800;
          color: white;
          letter-spacing: 0.05em;
        }
        .brand-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .brand-nav-links a {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .brand-nav-links a:hover { color: var(--text-primary); }
        .brand-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        /* ── Hero ── */
        .brand-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
        }
        .brand-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .brand-hero-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%);
        }
        .brand-hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }
        .brand-hero-content {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }
        .brand-hero-eyebrow { margin-bottom: 28px; }
        .brand-hero-title {
          margin-bottom: 24px;
          line-height: 1.0;
        }
        .brand-hero-sub {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .brand-hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .brand-hero-metrics {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
          padding-top: 40px;
          border-top: 1px solid var(--border-subtle);
        }
        .brand-hero-metric { text-align: center; }
        .brand-hero-metric-value {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .brand-hero-metric-label {
          font-size: 0.8125rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        /* ── Capabilities ── */
        .brand-capabilities { background: var(--bg-secondary); }
        .brand-cap-card { position: relative; overflow: hidden; }
        .brand-cap-indicator {
          width: 32px;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 2px;
          margin-bottom: 20px;
        }
        .brand-cap-title {
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .brand-cap-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.75;
        }
        /* ── Analytics Preview ── */
        .brand-analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .brand-analytics-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }
        .brand-analytics-list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .brand-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          color: var(--status-success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        /* ── Dashboard Mockup ── */
        .brand-dashboard-mockup {
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(20px);
        }
        .brand-dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .brand-dashboard-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .brand-metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .brand-mini-metric {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 12px;
        }
        .brand-chart-mockup {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
        }
        .brand-pipeline-preview { }
        .brand-deal-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          gap: 16px;
        }
        .brand-deal-row:last-child { border-bottom: none; }
        /* ── Template Cards ── */
        .brand-library-preview { background: var(--bg-secondary); }
        .brand-template-card {
          display: block;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          transition: border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
        }
        .brand-template-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-glow-sm);
        }
        .brand-template-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .brand-template-id {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .brand-template-name {
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .brand-template-tagline {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .brand-template-arrow {
          color: var(--text-muted);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }
        .brand-template-card:hover .brand-template-arrow {
          color: var(--text-primary);
          transform: translateX(4px);
        }
        .brand-template-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0.6;
          border-radius: 0 0 16px 16px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition-base);
        }
        .brand-template-card:hover .brand-template-accent-bar {
          transform: scaleX(1);
        }
        /* ── Security ── */
        .brand-security-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .brand-security-badges {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .brand-security-badge { text-align: center; }
        .brand-security-badge-name {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .brand-security-badge-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        /* ── CTA Box ── */
        .brand-cta-box {
          text-align: center;
          padding: 80px 48px !important;
          background: var(--bg-secondary) !important;
          position: relative;
          overflow: hidden;
        }
        .brand-cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-glow);
          pointer-events: none;
        }
        /* ── Footer ── */
        .brand-footer {
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          padding: 64px 0 32px;
        }
        .brand-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .brand-footer-heading {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .brand-footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .brand-footer-links a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .brand-footer-links a:hover { color: var(--text-primary); }
        .brand-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* ── Responsive ── */
        @media (max-width: 900px) {
          .brand-analytics-grid, .brand-security-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .brand-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .brand-hero-metrics { gap: 24px; }
          .brand-footer-grid { grid-template-columns: 1fr; }
          .brand-footer-bottom { flex-direction: column; gap: 8px; }
          .brand-security-badges { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
