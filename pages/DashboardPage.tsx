import React from 'react';
import { AppLayout } from '../components/AppLayout';
import { FeatureCard } from '../components/FeatureCard';
import { FEATURES } from '../constants';

const DashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-charcoal mb-3">
          Your Marketing Toolkit
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Select a tool to begin. Follow the steps numerically to go from strategy to execution.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            // FIX: Added onSelect prop to handle navigation to the tool page.
            onSelect={() => window.location.hash = `/tool/${feature.id}`}
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;