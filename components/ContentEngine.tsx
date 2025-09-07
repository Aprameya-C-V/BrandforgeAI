import React, { useState, useCallback } from 'react';
import { generateContentIdeas } from '../services/geminiService';
import { Loader } from './Loader';
import type { ContentIdea } from '../types';
import { HiOutlineLightBulb } from 'react-icons/hi';

const FormatIcon: React.FC<{ format: string }> = ({ format }) => {
    // A simple component to return an emoji based on format
    switch (format.toLowerCase()) {
        case 'blog post': return <span>📄</span>;
        case 'short video (reels/shorts)': return <span>🎬</span>;
        case 'infographic': return <span>📊</span>;
        case 'email newsletter': return <span>📧</span>;
        case 'podcast episode': return <span>🎙️</span>;
        default: return <span>💡</span>;
    }
};

export const ContentEngine: React.FC = () => {
    const [topic, setTopic] = useState<string>('sustainable fashion');
    const [audience, setAudience] = useState<string>('eco-conscious millennials');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<ContentIdea[] | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!topic || !audience) {
            setError('Please provide a topic and target audience.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const ideas = await generateContentIdeas(topic, audience);
            setResults(ideas);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [topic, audience]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-4">
                     <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">1. Primary Topic or Keyword</label>
                        <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900" placeholder="e.g., artisanal coffee, productivity software" />
                    </div>
                     <div>
                        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">2. Target Audience</label>
                        <input type="text" id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900" placeholder="e.g., busy professionals, college students" />
                    </div>
                     <button onClick={handleSubmit} disabled={isLoading || !topic || !audience} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating Ideas...' : 'Generate Content Ideas'}
                    </button>
                </div>
                 <div className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[400px]">
                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Content Ideas</h3>
                     <div className="flex-grow bg-white border border-gray-200 rounded-md p-2 overflow-y-auto">
                        {isLoading && <div className="flex justify-center items-center h-full"><Loader text="Brainstorming..."/></div>}
                        {error && <p className="text-red-500 p-4">{error}</p>}
                        {results && (
                            <div className="space-y-4 p-2">
                                {results.map((idea, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl pt-1"><FormatIcon format={idea.format} /></div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{idea.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{idea.description}</p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {idea.keywords.map(kw => (
                                                        <span key={kw} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{kw}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!isLoading && !results && !error && 
                            <div className="text-center text-gray-500 pt-16">
                                <HiOutlineLightBulb className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2">Content ideas will appear here.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
