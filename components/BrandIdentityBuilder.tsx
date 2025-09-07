import React, { useState, useCallback } from 'react';
import { generateBrandIdentity, generateLogo } from '../services/geminiService';
import { Loader } from './Loader';
import type { BrandIdentityResult } from '../types';
import { useDownload } from '../hooks/useDownload';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const BrandIdentityBuilder: React.FC = () => {
    const [businessInfo, setBusinessInfo] = useState<string>('A cozy, eco-friendly coffee shop called "The Daily Grind" that serves artisanal coffee and locally sourced pastries.');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<BrandIdentityResult | null>(null);
    const download = useDownload();

    const handleSubmit = useCallback(async () => {
        if (!businessInfo) {
            setError('Please describe your business.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            setLoadingText('Generating brand concepts...');
            const identity = await generateBrandIdentity(businessInfo);

            setLoadingText('Creating your logo...');
            const logoImage = await generateLogo(identity.logoDescription);
            
            setResult({ ...identity, logoImage });

        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
            setLoadingText('');
        }
    }, [businessInfo]);
    
    const handleDownload = () => {
        if (result?.logoImage) {
            download(result.logoImage, 'logo.png');
        }
    };


    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="business-info" className="block text-sm font-medium text-gray-700">1. Describe Your Business</label>
                <textarea id="business-info" value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)} rows={4} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-gray-900" placeholder="e.g., A modern tech startup that builds productivity apps..."></textarea>
            </div>
            
            <button onClick={handleSubmit} disabled={isLoading || !businessInfo} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isLoading ? 'Generating...' : 'Generate Brand Identity'}
            </button>
            
            <div className="mt-6 min-h-[300px] bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                 {isLoading && <Loader text={loadingText}/>}
                 {error && <p className="text-red-500">{error}</p>}
                 {result && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center space-y-4">
                            <h3 className="text-lg font-semibold">Generated Logo</h3>
                             <div className="relative group bg-gray-200 p-4 rounded-lg">
                                <img src={result.logoImage} alt="Generated logo" className="w-48 h-48 object-contain rounded-md shadow-lg"/>
                                <button onClick={handleDownload} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Download Logo">
                                    <DownloadIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Color Palette</h3>
                                <div className="flex flex-wrap gap-4">
                                    {result.colorPalette.map(color => (
                                        <div key={color.hex} className="text-center">
                                            <div className="w-16 h-16 rounded-md border-2 border-gray-300" style={{backgroundColor: color.hex}}></div>
                                            <p className="text-sm mt-1">{color.name}</p>
                                            <p className="text-xs text-gray-600">{color.hex}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold mb-2">Typography</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold text-gray-600">Headline:</span> {result.typography.headline}</p>
                                    <p><span className="font-semibold text-gray-600">Body:</span> {result.typography.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
                 {!isLoading && !result && !error && <p className="text-gray-500">Your generated brand identity will appear here.</p>}
            </div>
        </div>
    );
};