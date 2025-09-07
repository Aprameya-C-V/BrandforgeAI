import React, { useState, useCallback } from 'react';
import { generateStrategy } from '../services/geminiService';
import { Loader } from './Loader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const StrategyPlanner: React.FC = () => {
    const [goals, setGoals] = useState<string>('');
    const [audience, setAudience] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isCopied, copy] = useCopyToClipboard();

    const handleSubmit = useCallback(async () => {
        if (!goals || !audience) {
            setError('Please describe your goals and target audience.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await generateStrategy(goals, audience, budget);
            setResult(response);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [goals, audience, budget]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="goals" className="block text-sm font-medium text-gray-700">1. Business Goals</label>
                        <textarea id="goals" value={goals} onChange={(e) => setGoals(e.target.value)} rows={4} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900" placeholder="e.g., Increase online sales by 20% in the next quarter, build brand awareness..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">2. Target Audience</label>
                        <textarea id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} rows={4} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900" placeholder="e.g., Young professionals aged 25-35, interested in sustainable products..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">3. Approximate Budget (Optional)</label>
                        <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900" placeholder="e.g., $500/month"/>
                    </div>
                    <button onClick={handleSubmit} disabled={isLoading || !goals || !audience} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Strategy'}
                    </button>
                </div>
                
                <div className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[400px]">
                    <div className="flex justify-between items-center mb-2">
                         <h3 className="text-lg font-semibold text-gray-800">Your Marketing Strategy</h3>
                         {result && (
                            <button onClick={() => copy(result)} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                {isCopied ? <CheckIcon className="w-4 h-4 text-green-500"/> : <CopyIcon className="w-4 h-4"/>}
                                <span>{isCopied ? 'Copied!' : 'Copy Markdown'}</span>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow bg-white border border-gray-200 rounded-md p-4 overflow-y-auto">
                        {isLoading && <div className="flex justify-center items-center h-full"><Loader text="Building your strategy..."/></div>}
                        {error && <p className="text-red-500">{error}</p>}
                        {result && <MarkdownRenderer content={result} />}
                        {!isLoading && !result && !error && <p className="text-gray-500">Your generated marketing strategy will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};