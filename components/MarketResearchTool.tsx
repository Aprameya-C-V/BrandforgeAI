import React, { useState, useCallback } from 'react';
import { performMarketResearch } from '../services/geminiService';
import { Loader } from './Loader';
import { MarkdownRenderer } from './MarkdownRenderer';

export const MarketResearchTool: React.FC = () => {
    const [topic, setTopic] = useState<string>('eco-friendly coffee subscription box');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ summary: string; sources: any[] } | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!topic) {
            setError('Please enter a topic, company, or product.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await performMarketResearch(topic);
            setResult(response);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [topic]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="research-topic" className="block text-sm font-medium text-gray-700">1. Enter Topic, Company, or Product</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        id="research-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border-gray-300 focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                        placeholder="e.g., 'Tesla', 'sustainable packaging industry', 'notion.so'"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !topic}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Researching...' : 'Start Research'}
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">This tool uses Google Search to provide up-to-date information.</p>
            </div>

            <div className="mt-6 min-h-[400px] bg-gray-50 rounded-lg p-4 flex flex-col">
                 {isLoading && <div className="flex justify-center items-center h-full"><Loader text="Analyzing market data..."/></div>}
                 {error && <p className="text-red-500 text-center">{error}</p>}
                 {result && (
                     <div className="flex-grow overflow-y-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Market Analysis Report</h3>
                        <div className="bg-white p-4 rounded-md border border-gray-200">
                             <MarkdownRenderer content={result.summary} />
                        </div>
                        
                        {result.sources && result.sources.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Sources</h4>
                                <ul className="list-decimal list-inside space-y-2 text-sm">
                                    {result.sources.map((source, index) => (
                                        <li key={index}>
                                            <a href={source.web?.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                               {source.web?.title || source.web?.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                 )}
                 {!isLoading && !result && !error && <p className="text-gray-500 text-center pt-16">Your market research report will appear here.</p>}
            </div>
        </div>
    );
};
