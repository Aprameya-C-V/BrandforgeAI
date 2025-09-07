import React, { useState, useCallback } from 'react';
import { generateSocialPosts } from '../services/geminiService';
import { Loader } from './Loader';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { SocialPost } from '../types';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'twitter': return <FaTwitter className="text-sky-500" />;
        case 'instagram': return <FaInstagram className="text-pink-600" />;
        case 'linkedin': return <FaLinkedin className="text-blue-700" />;
        default: return <span>📱</span>;
    }
};

export const SocialPostGenerator: React.FC = () => {
    const [topic, setTopic] = useState<string>('our new line of sustainable, reusable coffee cups');
    const [tone, setTone] = useState<string>('Excited and eco-friendly');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<SocialPost[] | null>(null);

    const handleSubmit = useCallback(async () => {
        if (!topic) {
            setError('Please provide a topic for the posts.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            const posts = await generateSocialPosts(topic, tone);
            setResults(posts);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [topic, tone]);

    return (
         <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <div>
                        <label htmlFor="post-topic" className="block text-sm font-medium text-gray-700">1. What is the post about?</label>
                        <textarea id="post-topic" value={topic} onChange={(e) => setTopic(e.target.value)} rows={3} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900" placeholder="e.g., A 20% off flash sale, a new blog post, a company milestone"></textarea>
                    </div>
                     <div>
                        <label htmlFor="post-tone" className="block text-sm font-medium text-gray-700">2. Desired Tone</label>
                         <input type="text" id="post-tone" value={tone} onChange={(e) => setTone(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900" placeholder="e.g., Professional, witty, friendly, urgent" />
                    </div>
                     <button onClick={handleSubmit} disabled={isLoading || !topic} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating Posts...' : 'Generate Social Posts'}
                    </button>
                </div>
                 <div className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-[400px]">
                     <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Posts</h3>
                     <div className="flex-grow bg-white border border-gray-200 rounded-md p-2 overflow-y-auto">
                        {isLoading && <div className="flex justify-center items-center h-full"><Loader text="Writing your posts..."/></div>}
                        {error && <p className="text-red-500 p-4">{error}</p>}
                        {results && (
                            <div className="space-y-4 p-2">
                                {results.map((post, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <PlatformIcon platform={post.platform} />
                                            <span className="font-bold text-gray-800">{post.platform}</span>
                                        </div>
                                        <div className="prose prose-sm max-w-none">
                                            <MarkdownRenderer content={post.content} />
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm">
                                            <p className="font-semibold text-gray-700">🎨 Visual Suggestion:</p>
                                            <p className="text-gray-600 mt-1">{post.visualSuggestion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!isLoading && !results && !error && <p className="text-gray-500 text-center pt-16">Your generated social posts will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
