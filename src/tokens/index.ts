/**
 * TOKENS — PUBLIC INDEX
 * Single import point for the entire token system.
 */

export * from './core';
export * from './semantic';
export * from './motion';
export * from './charts';
export * from './components';

// Template overrides
export { monolithicEnterpriseDark } from './templates/monolithic-enterprise.dark';
export { monolithicEnterpriseLight } from './templates/monolithic-enterprise.light';
export { aiCommandCenterDark } from './templates/ai-command-center.dark';
export { aiCommandCenterLight } from './templates/ai-command-center.light';
export { financialIntelligenceDark } from './templates/financial-intelligence.dark';
export { financialIntelligenceLight } from './templates/financial-intelligence.light';
export { minimalPrecisionLight } from './templates/minimal-precision.light';
export { minimalPrecisionDark } from './templates/minimal-precision.dark';
export { pipelineCommandDark } from './templates/pipeline-command.dark';
export { pipelineCommandLight } from './templates/pipeline-command.light';
export { neuralAnalyticsDark } from './templates/neural-analytics.dark';
export { neuralAnalyticsLight } from './templates/neural-analytics.light';
export { behavioralIntelligenceDark } from './templates/behavioral-intelligence.dark';
export { behavioralIntelligenceLight } from './templates/behavioral-intelligence.light';
export { signalIntelligenceDark } from './templates/signal-intelligence.dark';
export { signalIntelligenceLight } from './templates/signal-intelligence.light';
export { sovereignGovernanceDark } from './templates/sovereign-governance.dark';
export { sovereignGovernanceLight } from './templates/sovereign-governance.light';
export { apexProtocolDark } from './templates/apex-protocol.dark';
export { apexProtocolLight } from './templates/apex-protocol.light';
export { dataMeridianDark } from './templates/data-meridian.dark';
export { dataMeridianLight } from './templates/data-meridian.light';
export { obsidianOperationsDark } from './templates/obsidian-operations.dark';
export { obsidianOperationsLight } from './templates/obsidian-operations.light';

// ─── TEMPLATE TOKEN REGISTRY ──────────────────────────────────────────────────
import { monolithicEnterpriseDark as crm01Dark } from './templates/monolithic-enterprise.dark';
import { monolithicEnterpriseLight as crm01Light } from './templates/monolithic-enterprise.light';
import { aiCommandCenterDark as crm02Dark } from './templates/ai-command-center.dark';
import { aiCommandCenterLight as crm02Light } from './templates/ai-command-center.light';
import { financialIntelligenceDark as crm03Dark } from './templates/financial-intelligence.dark';
import { financialIntelligenceLight as crm03Light } from './templates/financial-intelligence.light';
import { minimalPrecisionLight as crm04Light } from './templates/minimal-precision.light';
import { minimalPrecisionDark as crm04Dark } from './templates/minimal-precision.dark';
import { pipelineCommandDark as crm05Dark } from './templates/pipeline-command.dark';
import { pipelineCommandLight as crm05Light } from './templates/pipeline-command.light';
import { neuralAnalyticsDark as crm06Dark } from './templates/neural-analytics.dark';
import { neuralAnalyticsLight as crm06Light } from './templates/neural-analytics.light';
import { behavioralIntelligenceDark as crm07Dark } from './templates/behavioral-intelligence.dark';
import { behavioralIntelligenceLight as crm07Light } from './templates/behavioral-intelligence.light';
import { signalIntelligenceDark as crm08Dark } from './templates/signal-intelligence.dark';
import { signalIntelligenceLight as crm08Light } from './templates/signal-intelligence.light';
import { sovereignGovernanceDark as crm09Dark } from './templates/sovereign-governance.dark';
import { sovereignGovernanceLight as crm09Light } from './templates/sovereign-governance.light';
import { apexProtocolDark as crm10Dark } from './templates/apex-protocol.dark';
import { apexProtocolLight as crm10Light } from './templates/apex-protocol.light';
import { dataMeridianDark as crm11Dark } from './templates/data-meridian.dark';
import { dataMeridianLight as crm11Light } from './templates/data-meridian.light';
import { obsidianOperationsDark as crm12Dark } from './templates/obsidian-operations.dark';
import { obsidianOperationsLight as crm12Light } from './templates/obsidian-operations.light';

type TokenOverride = { cssVars: Record<string, string> };

export const TOKEN_REGISTRY: Record<string, { dark: TokenOverride; light: TokenOverride }> = {
    'crm-01': { dark: crm01Dark, light: crm01Light },
    'crm-02': { dark: crm02Dark, light: crm02Light },
    'crm-03': { dark: crm03Dark, light: crm03Light },
    'crm-04': { dark: crm04Dark, light: crm04Light },
    'crm-05': { dark: crm05Dark, light: crm05Light },
    'crm-06': { dark: crm06Dark, light: crm06Light },
    'crm-07': { dark: crm07Dark, light: crm07Light },
    'crm-08': { dark: crm08Dark, light: crm08Light },
    'crm-09': { dark: crm09Dark, light: crm09Light },
    'crm-10': { dark: crm10Dark, light: crm10Light },
    'crm-11': { dark: crm11Dark, light: crm11Light },
    'crm-12': { dark: crm12Dark, light: crm12Light },
};

/**
 * Resolve CSS variables for a given template + mode.
 * Falls back to crm-01 dark if template is not registered.
 */
export function resolveTemplateTokens(
    templateSlug: string,
    mode: 'dark' | 'light' = 'dark'
): Record<string, string> {
    const entry = TOKEN_REGISTRY[templateSlug];
    if (!entry) {
        return TOKEN_REGISTRY['crm-01'].dark.cssVars;
    }
    return entry[mode].cssVars;
}
