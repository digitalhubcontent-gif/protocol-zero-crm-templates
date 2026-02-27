import React from 'react';
import type { ContactRecord } from '@/lib/types';

interface DataTableProps {
    records: ContactRecord[];
    className?: string;
}

const statusColors: Record<ContactRecord['status'], string> = {
    Active: 'badge-success',
    Lead: 'badge-info',
    Prospect: 'badge-warning',
    Churned: 'badge-danger',
};

export function DataTable({ records, className = '' }: DataTableProps) {
    return (
        <div className={`data-table-wrapper ${className}`}>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Contact</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Value</th>
                        <th>Last Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((r) => (
                        <tr key={r.id}>
                            <td className="td-name">{r.name}</td>
                            <td className="td-muted">{r.company}</td>
                            <td className="td-muted">{r.role}</td>
                            <td>
                                <span className={`badge badge-sm ${statusColors[r.status]}`}>
                                    {r.status}
                                </span>
                            </td>
                            <td className="td-value">{r.value}</td>
                            <td className="td-muted">{r.lastContact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
