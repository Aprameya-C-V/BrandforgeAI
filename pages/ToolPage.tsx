import React from 'react';
import { AppLayout } from '../components/AppLayout';
import { VisualStudio } from '../components/VisualStudio';
import { ContentEngine } from '../components/ContentEngine';
import { StrategyPlanner } from '../components/StrategyPlanner';
import { BrandIdentityBuilder } from '../components/BrandIdentityBuilder';
import { SocialPostGenerator } from '../components/SocialPostGenerator';
import { LogoGenerator } from '../components/LogoGenerator';
import { FEATURES } from '../constants';
// FIX: Import the new MarketResearchTool component
import { MarketResearchTool } from '../components/MarketResearchTool';

interface ToolPageProps {
    toolId: string;
}

const ToolPage: React.FC<ToolPageProps> = ({ toolId }) => {

    const activeFeature = FEATURES.find(f => f.id === toolId);

    const renderFeatureComponent = () => {
        switch (toolId) {
            case 'visual-studio':
                return <VisualStudio />;
            case 'brand-identity':
                return <BrandIdentityBuilder />;
            case 'logo-generator':
                return <LogoGenerator />;
            case 'content-engine':
                return <ContentEngine />;
            case 'strategy-planner':
                return <StrategyPlanner />;
            case 'social-post':
                return <SocialPostGenerator />;
            // FIX: Add a case to render the MarketResearchTool
            case 'market-research':
                return <MarketResearchTool />;
            default:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Tool not found</h2>
                        <p className="mt-2 text-gray-600">Please select a tool from the dashboard.</p>
                        <a href="#/dashboard" className="mt-4 inline-block text-deep-teal hover:underline">
                            &larr; Back to Dashboard
                        </a>
                    </div>
                );
        }
    };

    if (!activeFeature) {
        return (
            <AppLayout>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Invalid Tool</h2>
                    <p className="mt-2 text-gray-600">The tool you are looking for does not exist.</p>
                    <a href="#/dashboard" className="mt-4 inline-block text-deep-teal hover:underline">
                        &larr; Back to Dashboard
                    </a>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2">
                    <a href="#/dashboard" className="hover:underline">Dashboard</a>
                    <span className="mx-2">&gt;</span>
                    <span>{activeFeature.title}</span>
                </div>
                <h1 className="text-3xl font-bold font-montserrat text-charcoal">{activeFeature.title}</h1>
                <p className="mt-2 text-gray-600 max-w-3xl">{activeFeature.description}</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-medium-gray/70 shadow-sm">
                {renderFeatureComponent()}
            </div>
        </AppLayout>
    );
};

export default ToolPage;
