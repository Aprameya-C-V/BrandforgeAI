import React, { useState, useCallback } from 'react';
import { generateLogo } from '../services/geminiService';
import { Loader } from './Loader';
import { useDownload } from '../hooks/useDownload';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const LogoGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A minimalist line art logo of a steaming coffee cup combined with a leaf, in earthy tones of brown and green, clean and modern.');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const download = useDownload();

    const handleSubmit = useCallback(async () => {
        if (!prompt) {
            setError('Please describe the logo you want to create.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResultImage(null);

        try {
            const logoImage = await generateLogo(prompt);
            setResultImage(logoImage);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    const handleDownload = () => {
        if (resultImage) {
            download(resultImage, 'brandforge-logo.png');
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="logo-prompt" className="block text-sm font-medium text-charcoal">1. Describe Your Logo</label>
                        <textarea id="logo-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={6} className="mt-1 block w-full bg-white border border-medium-gray rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-deep-teal focus:border-deep-teal sm:text-sm text-charcoal" placeholder="e.g., A shield logo with a lion's head, in gold and royal blue..."></textarea>
                         <p className="mt-2 text-xs text-gray-500">Be descriptive! Mention style (e.g., minimalist, vintage), elements, and colors.</p>
                    </div>
                    
                    <button onClick={handleSubmit} disabled={isLoading || !prompt} className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-teal hover:bg-light-teal hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:bg-medium-gray disabled:cursor-not-allowed transition-colors">
                        {isLoading ? 'Generating...' : 'Generate Logo'}
                    </button>
                </div>
                
                <div className="flex flex-col items-center justify-center bg-light-gray rounded-lg p-4 min-h-[300px]">
                    {isLoading && <Loader text="Forging your logo..."/>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {resultImage && (
                        <div className="space-y-4 text-center">
                            <h3 className="text-lg font-semibold text-charcoal">Generated Logo</h3>
                            <div className="relative group bg-white p-4 rounded-lg shadow-md">
                                <img src={resultImage} alt="Generated logo" className="w-64 h-64 object-contain"/>
                                <button onClick={handleDownload} className="absolute top-2 right-2 bg-charcoal bg-opacity-60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Download Logo">
                                    <DownloadIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    )}
                    {!isLoading && !resultImage && !error && <p className="text-gray-500">Your generated logo will appear here.</p>}
                </div>
            </div>
        </div>
    );
};