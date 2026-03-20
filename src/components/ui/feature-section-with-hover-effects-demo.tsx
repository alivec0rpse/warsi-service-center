import React from 'react';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';

function FeaturesSectionWithHoverEffectsDemo() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute left-0 top-0 w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export { FeaturesSectionWithHoverEffectsDemo };
