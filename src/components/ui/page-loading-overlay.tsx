"use client";

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/snow-ball-loading-spinner';

export function PageLoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsVisible(false), 850);
    return () => window.clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
    if (isVisible) return;

    const unmountTimer = window.setTimeout(() => setIsMounted(false), 260);
    return () => window.clearTimeout(unmountTimer);
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[7000] flex items-center justify-center bg-white/85 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <LoadingSpinner />
    </div>
  );
}
