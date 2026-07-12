// demo.tsx
'use client';

import ClippedMediaGallery from '@/components/ui/clip-path-image';
import React from 'react';

const ClippedMediaGalleryDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-cream-dark/30 min-h-[500px]">
      <div className="w-full max-w-4xl border border-sand rounded-lg shadow-sm p-6 bg-cream">
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-display font-medium text-walnut">
            Content Demonstration
          </h3>
          <ClippedMediaGallery />
        </div>
      </div>
    </div>
  );
};

export { ClippedMediaGalleryDemo as DemoOne };
