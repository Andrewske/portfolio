import React from 'react';
import { parseInlineMarkdown } from '~/utils/parseInlineMarkdown';

interface WorkflowTableProps {
  headers: string[];
  rows: string[][];
}

export function WorkflowTable({ headers, rows }: WorkflowTableProps): React.ReactElement {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900/50 border-b border-gray-800">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-gray-400 font-mono font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-800/50 last:border-b-0 hover:bg-gray-900/30 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-gray-300"
                >
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowTable;
