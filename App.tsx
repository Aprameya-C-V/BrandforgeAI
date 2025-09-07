import React, { useState, useCallback } from 'react';
import { FEATURES } from './constants';
import { Header } from './components/Header';
import { FeatureCard } from './components/FeatureCard';
import { Modal } from './components/Modal';

const App: React.FC = () => {
    const [activeToolId, setActiveToolId] = useState<string | null>(null);

    const handleSelectTool = useCallback((id: string) => {
        setActiveToolId(id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setActiveToolId(null);
    }, []);

    const activeFeature = FEATURES.find(f => f.id === activeToolId);
    const ActiveComponent = activeFeature?.Component;

    return (
        <div className="font-open-sans text-charcoal bg-off-white">
            <Header />
            
            {/* Hero Section */}
            <main className="container mx-auto px-6 py-20 md:py-32 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold font-montserrat mb-4">
                    Unlock <span className="text-deep-teal">Big Marketing Power</span> on a Small Business Budget.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
                    BrandForge AI is your all-in-one toolkit for creating stunning visuals, compelling copy, and winning marketing strategies—instantly.
                </p>
                <a href="#tools" className="bg-deep-teal text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-light-teal hover:text-charcoal transition-colors duration-300 transform hover:scale-105 inline-block">
                    Start Forging Your Brand &rarr;
                </a>
            </main>

            {/* Tools Section */}
            <section id="tools" className="bg-white py-20 sm:py-24">
                <div className="container mx-auto px-6">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-montserrat">Your All-in-One Marketing Toolkit</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">
                            From initial idea to final campaign, our suite of AI tools streamlines your entire marketing workflow. Select a tool to begin.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {FEATURES.map((feature) => (
                          <FeatureCard
                            key={feature.id}
                            feature={feature}
                            onSelect={handleSelectTool}
                          />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="border-t border-medium-gray py-8">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>Conceptualization by Aprameya, built with Google AI Studio. Powered by Gemini.</p>
                </div>
            </footer>

            {/* Tool Modal */}
            {activeFeature && ActiveComponent && (
                <Modal
                    isOpen={!!activeToolId}
                    onClose={handleCloseModal}
                    title={activeFeature.title}
                >
                    <ActiveComponent />
                </Modal>
            )}
        </div>
    );
};

export default App;