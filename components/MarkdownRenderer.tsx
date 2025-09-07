import React from 'react';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    
    const renderLine = (line: string): string => {
        // Bold text: **text**
        return line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-charcoal">$1</strong>');
    };

    const renderTable = (block: string): JSX.Element | null => {
        const lines = block.split('\n').filter(line => line.trim().startsWith('|'));
        if (lines.length < 2) return null; // Header and separator line are required

        const headerLine = lines[0];
        const bodyLines = lines.slice(2);

        const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean);
        const rows = bodyLines.map(rowLine => rowLine.split('|').map(c => c.trim()).filter(Boolean));

        return (
            <div className="overflow-x-auto my-6 border border-medium-gray rounded-lg">
                <table className="min-w-full divide-y divide-medium-gray text-sm">
                    <thead className="bg-light-gray">
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i} scope="col" className="px-4 py-3 text-left font-semibold text-charcoal">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-medium-gray bg-white">
                        {rows.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j} className="px-4 py-3 text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: renderLine(cell) }}></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const blocks = content.split('\n\n');

    const elements = blocks.map((block, i) => {
        // Check for table
        if (block.includes('|') && block.includes('---')) {
            return <div key={i}>{renderTable(block)}</div>;
        }

        const lines = block.split('\n');

        // Headings
        if (lines[0].startsWith('### ')) {
            return <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-deep-teal font-montserrat" dangerouslySetInnerHTML={{ __html: renderLine(lines[0].substring(4))}}></h3>;
        }
        if (lines[0].startsWith('## ')) {
            return <h2 key={i} className="text-xl font-bold mt-5 mb-3 text-deep-teal font-montserrat" dangerouslySetInnerHTML={{ __html: renderLine(lines[0].substring(3))}}></h2>;
        }
        
        // Unordered List
        if (lines.every(line => line.trim().startsWith('- '))) {
            return (
                <ul key={i} className="list-disc list-inside space-y-2 text-gray-700 pl-4 my-4">
                    {lines.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: renderLine(item.trim().substring(2)) }}></li>
                    ))}
                </ul>
            );
        }

        // Paragraphs
        return <p key={i} className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: lines.map(renderLine).join('<br/>') }}></p>;
    });

    return <div className="prose">{elements}</div>;
};