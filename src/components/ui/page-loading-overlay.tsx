"use client";

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/snow-ball-loading-spinner';

export function PageLoadingOverlay() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-white/85 backdrop-blur-sm">
      <LoadingSpinner />
    </div>
  );
}
