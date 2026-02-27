import React from 'react';
import type { MetricData } from '@/lib/types';

interface MetricCardProps {
    metric: MetricData;
    accentColor?: string;
    className?: string;
}

export function MetricCard({ metric, accentColor, className = '' }: MetricCardProps) {
    const isUp = metric.trend === 'up';
    const isDown = metric.trend === 'down';

    return (
        <div className={`metric-card glass-card card-pad-md ${className}`}>
            <p className="metric-label">{metric.label}</p>
            <p
                className="metric-value"
                style={accentColor ? { color: accentColor } : undefined}
            >
                {metric.value}
            </p>
            <div className={`metric-change ${isUp ? 'metric-up' : isDown ? 'metric-down' : 'metric-neutral'}`}>
                {isUp && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                )}
                {isDown && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                )}
                <span>{metric.change}</span>
            </div>
        </div>
    );
}
