import React from 'react';
import { FEATURES } from '../constants';

const Logo: React.FC = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#008080" />
                <stop offset="100%" stopColor="#40E0D0" />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#logoGrad)" />
        <path d="M2 17l10 5 10-5" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M2 12l10 5 10-5" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
    </svg>
);

const LandingPage: React.FC = () => {
    return (
        <div className="font-open-sans text-charcoal bg-off-white">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-medium-gray">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="flex items-center space-x-3">
                        <Logo />
                        <span className="text-xl font-bold font-montserrat text-charcoal">BrandForge AI</span>
                    </a>
                    <a href="#/dashboard" className="bg-deep-teal text-white font-semibold px-6 py-2 rounded-md hover:bg-light-teal hover:text-charcoal transition-colors duration-300">
                        Get Started
                    </a>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-20 md:py-32 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat mb-4">
                    Unlock <span className="text-deep-teal">Big Marketing Power</span> on a Small Business Budget.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
                    BrandForge AI is your all-in-one toolkit for creating stunning visuals, compelling copy, and winning marketing strategies—instantly.
                </p>
                <a href="#/dashboard" className="bg-deep-teal text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-light-teal hover:text-charcoal transition-colors duration-300 transform hover:scale-105 inline-block">
                    Start Forging Your Brand &rarr;
                </a>
            </main>

            {/* Features Section */}
            <section id="features" className="bg-white py-20 sm:py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat">Everything You Need to Build a Brand</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">
                            From initial idea to final campaign, our suite of AI tools streamlines your entire marketing workflow.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map(feature => (
                             <div key={feature.id} className="bg-off-white p-8 rounded-xl border border-medium-gray/50">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                                    <feature.Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">{feature.title.substring(3)}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section className="bg-off-white py-20 md:py-32">
                 <div className="container mx-auto px-6 text-center">
                     <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                        Ready to Build a Brand They'll Remember?
                     </h2>
                     <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
                        Stop guessing and start creating. Launch your next big idea with BrandForge AI today.
                     </p>
                     <a href="#/dashboard" className="bg-soft-orange text-charcoal font-bold text-lg px-8 py-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 transform hover:scale-105 inline-block">
                        Get Started for Free
                    </a>
                 </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-medium-gray py-8">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>Conceptualization by Aprameya, built with Google AI Studio. Powered by Gemini.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;