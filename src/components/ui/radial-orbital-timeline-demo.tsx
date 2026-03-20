"use client";

import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { radialTimelineData } from '@/data/timeline';

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={radialTimelineData} />;
}

export default {
  RadialOrbitalTimelineDemo,
};
