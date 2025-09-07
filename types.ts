import type { IconType } from 'react-icons';

export interface Feature {
  id: string;
  title: string;
  description: string;
  Icon: IconType;
  gradient: string;
  Component: React.FC;
}

export interface BrandIdentityResult {
    logoDescription: string;
    colorPalette: {
        name: string;
        hex: string;
    }[];
    typography: {
        headline: string;
        body: string;
    };
    logoImage?: string;
}

export interface SocialPost {
    platform: string;
    content: string;
    visualSuggestion: string;
}

export interface ContentIdea {
    title: string;
    format: string;
    description: string;
    keywords: string[];
}
