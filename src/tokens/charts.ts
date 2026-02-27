/**
 * CHART TOKENS
 * Universal chart color semantic used across all templates.
 * Template overrides remap these via CSS custom properties.
 * No component may hardcode hex colors for charts.
 */

export interface ChartTokens {
    /** Grid lines */
    gridColor: string;
    /** Axis lines and tick marks */
    axisColor: string;
    /** Chart labels and axis text */
    labelColor: string;
    /** Legend labels */
    legendColor: string;
    /** Tooltip background */
    tooltipBg: string;
    /** Tooltip text */
    tooltipText: string;
    /** Positive / upward data series */
    positiveSeries: string;
    /** Negative / downward data series */
    negativeSeries: string;
    /** Neutral / baseline data series */
    neutralSeries: string;
    /** Primary accent data series */
    accentSeries1: string;
    /** Secondary data series */
    accentSeries2: string;
    /** Tertiary data series */
    accentSeries3: string;
}

/** CSS variable names for chart tokens — consumed by SVG charts via var() */
export const chartCssVars: Record<keyof ChartTokens, string> = {
    gridColor: '--chart-grid',
    axisColor: '--chart-axis',
    labelColor: '--chart-label',
    legendColor: '--chart-legend',
    tooltipBg: '--chart-tooltip-bg',
    tooltipText: '--chart-tooltip-text',
    positiveSeries: '--chart-positive',
    negativeSeries: '--chart-negative',
    neutralSeries: '--chart-neutral',
    accentSeries1: '--chart-accent-1',
    accentSeries2: '--chart-accent-2',
    accentSeries3: '--chart-accent-3',
};

/** Helper — returns var() string for a chart token */
export function chartVar(token: keyof ChartTokens): string {
    return `var(${chartCssVars[token]})`;
}
