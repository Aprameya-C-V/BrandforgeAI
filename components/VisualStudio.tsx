import React, { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import { Loader } from './Loader';
import { ImageUploader } from './ImageUploader';
import { useDownload } from '../hooks/useDownload';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const VisualStudio: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('Add a small, cute robot standing next to the main subject.');
    const [image, setImage] = useState<{ data: string; mime: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ text: string, image?: string } | null>(null);
    const download = useDownload();

    const handleSubmit = useCallback(async () => {
        if (!prompt || !image) {
            setError('Please upload an image and provide an editing prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const base64Data = image.data.split(',')[1];
            const response = await editImage(prompt, base64Data, image.mime);
            setResult(response);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred while editing the image.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, image]);

    const handleImageUpload = (imageDataUrl: string, file: File) => {
        setImage({ data: imageDataUrl, mime: file.type });
        setResult(null); // Clear previous result on new image upload
    };

    const handleDownload = () => {
        if (result?.image) {
            download(result.image, 'edited-image.png');
        }
    };

    const displayImage = result?.image || image?.data;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-charcoal">1. Upload Image</label>
                        <ImageUploader onImageUpload={handleImageUpload} />
                    </div>
                    <div>
                        <label htmlFor="edit-prompt" className="block text-sm font-medium text-charcoal">2. Describe Your Edit</label>
                        <textarea id="edit-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="mt-1 block w-full bg-white border border-medium-gray rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-deep-teal focus:border-deep-teal sm:text-sm text-charcoal" placeholder="e.g., Remove the background, change the color of the shirt to blue..."></textarea>
                    </div>
                    <button onClick={handleSubmit} disabled={isLoading || !prompt || !image} className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-teal hover:bg-light-teal hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:bg-medium-gray disabled:cursor-not-allowed transition-colors">
                        {isLoading ? 'Applying Edit...' : 'Edit Image'}
                    </button>
                </div>
                
                <div className="flex flex-col items-center justify-center bg-light-gray rounded-lg p-4 min-h-[350px]">
                    {isLoading && <Loader text="Editing in progress..."/>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    
                    {displayImage && !isLoading && !error && (
                         <div className="space-y-4 text-center">
                            <h3 className="text-lg font-semibold text-charcoal">Image Preview</h3>
                             <div className="relative group bg-white p-2 rounded-lg shadow-md">
                                <img src={displayImage} alt="Preview" className="max-w-full max-h-80 object-contain"/>
                                {result?.image && (
                                    <button onClick={handleDownload} className="absolute top-2 right-2 bg-charcoal bg-opacity-60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Download Edited Image">
                                        <DownloadIcon className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                             {result?.text && <p className="text-sm text-gray-600 italic">Model says: "{result.text}"</p>}
                        </div>
                    )}

                    {!displayImage && !isLoading && !error && (
                        <div className="text-center text-gray-500">
                             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2">Your image will appear here after uploading.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
