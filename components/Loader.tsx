import React from 'react';

interface LoaderProps {
  text: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4 bg-gray-200/50 rounded-lg">
        <div className="w-8 h-8 border-4 border-t-teal-500 border-r-teal-500 border-b-gray-300 border-l-gray-300 rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );
};