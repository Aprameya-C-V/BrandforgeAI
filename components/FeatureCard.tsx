import React from 'react';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  onSelect: (id: string) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(feature.id)}
      className="group relative flex flex-col text-left bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-medium-gray/50 h-full"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.gradient} mb-4 shadow-md group-hover:scale-105 transition-transform`}>
        <feature.Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold font-montserrat text-charcoal mb-2">{feature.title.substring(3)}</h3>
      <p className="text-gray-600 flex-grow">{feature.description}</p>
      <div className="mt-4 text-deep-teal font-semibold opacity-100 transition-opacity">
        Open Tool &rarr;
      </div>
    </button>
  );
};
