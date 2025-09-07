import React from 'react';
import { Header } from './Header';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
                {children}
            </main>
            <footer className="text-center py-6 text-gray-500 text-sm border-t border-medium-gray mt-12">
                <p>Conceptualization by Aprameya, built with Google AI Studio. Powered by Gemini.</p>
            </footer>
        </div>
    );
};