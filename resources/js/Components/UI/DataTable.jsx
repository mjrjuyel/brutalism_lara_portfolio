import React from 'react';
import { cn } from '@/Utils/cn';

export default function DataTable({ columns = [], data = [], actions, emptyMessage = "No data available.", className }) {
  return (
    <div className={cn("w-full overflow-auto rounded-md border border-border bg-card", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className="h-12 px-4 text-left align-middle font-mono font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="h-12 px-4 text-right align-middle font-mono font-medium text-muted-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="p-4 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted even:bg-muted/20"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 align-middle text-right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
