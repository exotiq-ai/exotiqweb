import React from 'react';

interface SectionSkeletonProps {
  variant?: 'fleetcopilot' | 'testimonials' | 'features' | 'default';
}

export default function SectionSkeleton({ variant = 'default' }: SectionSkeletonProps) {
  if (variant === 'fleetcopilot') {
    return (
      <div className="py-16 md:py-20 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Text Side */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded-lg w-3/4"></div>
              <div className="h-16 bg-gray-200 dark:bg-dark-700 rounded-lg w-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-lg w-5/6"></div>
              <div className="space-y-4 pt-4">
                <div className="h-20 bg-gray-200 dark:bg-dark-700 rounded-xl"></div>
                <div className="h-20 bg-gray-200 dark:bg-dark-700 rounded-xl"></div>
                <div className="h-20 bg-gray-200 dark:bg-dark-700 rounded-xl"></div>
              </div>
            </div>
            {/* Visual Side */}
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
              <div className="h-32 bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
              <div className="h-32 bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'testimonials') {
    return (
      <div className="py-16 md:py-20 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded-lg w-2/3 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-gray-100 dark:bg-dark-800 rounded-2xl space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-dark-700 rounded"></div>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-dark-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'features') {
    return (
      <div className="py-16 md:py-20 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded-lg w-1/2 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 space-y-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-dark-700 rounded-xl"></div>
                <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-3/4"></div>
                <div className="h-16 bg-gray-200 dark:bg-dark-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="py-16 md:py-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
        <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded-lg w-2/3 mx-auto mb-8"></div>
        <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 dark:bg-dark-700 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}


