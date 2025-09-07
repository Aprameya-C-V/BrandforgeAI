import {
    HiOutlineSparkles,
    HiOutlineColorSwatch,
    HiOutlinePencilAlt,
    HiOutlineGlobeAlt,
    HiOutlineTrendingUp,
    HiOutlineChatAlt2,
    HiOutlineLightBulb
} from 'react-icons/hi';
import type { Feature } from './types';
import { StrategyPlanner } from './components/StrategyPlanner';
import { BrandIdentityBuilder } from './components/BrandIdentityBuilder';
import { LogoGenerator } from './components/LogoGenerator';
import { VisualStudio } from './components/VisualStudio';
import { ContentEngine } from './components/ContentEngine';
import { SocialPostGenerator } from './components/SocialPostGenerator';
import { MarketResearchTool } from './components/MarketResearchTool';


export const FEATURES: Feature[] = [
    {
        id: 'strategy-planner',
        title: '1. Strategy Planner',
        description: 'Define your business goals and target audience to generate a comprehensive, actionable marketing strategy.',
        Icon: HiOutlineTrendingUp,
        gradient: 'from-teal-400 to-blue-500',
        Component: StrategyPlanner,
    },
    {
        id: 'market-research',
        title: '2. Market Research',
        description: 'Get up-to-date market analysis on any topic, company, or product using the power of Google Search.',
        Icon: HiOutlineGlobeAlt,
        gradient: 'from-blue-400 to-indigo-500',
        Component: MarketResearchTool,
    },
    {
        id: 'brand-identity',
        title: '3. Brand Identity Builder',
        description: 'Describe your business to generate a complete brand identity, including logo concepts, color palettes, and typography.',
        Icon: HiOutlineColorSwatch,
        gradient: 'from-orange-400 to-pink-500',
        Component: BrandIdentityBuilder,
    },
    {
        id: 'logo-generator',
        title: '4. Logo Generator',
        description: 'Create a unique, professional logo by simply describing what you envision. Perfect for a quick visual identity.',
        Icon: HiOutlineSparkles,
        gradient: 'from-pink-500 to-rose-500',
        Component: LogoGenerator,
    },
    {
        id: 'content-engine',
        title: '5. Content Engine',
        description: 'Generate a list of tailored content ideas, including blog posts, videos, and social media campaigns, to engage your audience.',
        Icon: HiOutlineLightBulb,
        gradient: 'from-purple-400 to-indigo-500',
        Component: ContentEngine,
    },
    {
        id: 'social-post',
        title: '6. Social Post Generator',
        description: 'Instantly create engaging posts for various social media platforms, complete with text and visual suggestions.',
        Icon: HiOutlineChatAlt2,
        gradient: 'from-green-400 to-teal-500',
        Component: SocialPostGenerator,
    },
     {
        id: 'visual-studio',
        title: '7. Visual Studio',
        description: 'Edit images with text prompts. Remove backgrounds, add objects, or completely change the scene of your product photos.',
        Icon: HiOutlinePencilAlt,
        gradient: 'from-yellow-400 to-orange-500',
        Component: VisualStudio,
    },
];
