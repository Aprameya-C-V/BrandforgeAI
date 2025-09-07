import React from 'react';

const Logo: React.FC = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#grad1)" opacity="0.6"/>
        <path d="M2 12l10 5 10-5-10-5-10 5z" fill="url(#grad2)"/>
        <defs>
            <linearGradient id="grad1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#008080"/>
                <stop offset="1" stopColor="#40E0D0"/>
            </linearGradient>
            <linearGradient id="grad2" x1="12" y1="7" x2="12" y2="17" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#40E0D0"/>
                <stop offset="1" stopColor="#008080"/>
            </linearGradient>
        </defs>
    </svg>
);


export const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
    <nav className="container mx-auto px-4 py-3">
      <a href="#" className="flex items-center space-x-3">
        <Logo />
        <span className="text-xl font-bold text-gray-900">BrandForge AI</span>
      </a>
    </nav>
  </header>
);
