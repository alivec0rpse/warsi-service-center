"use client";

import React, { useEffect, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BentoItemProps = {
  className?: string;
  children: React.ReactNode;
};

const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);
    return () => item.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6',
        className
      )}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(260px circle at var(--mouse-x) var(--mouse-y), rgba(17,17,17,0.08), transparent 48%)',
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CyberneticBentoGrid = () => {
  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
            Full Service Range
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Services built for real workshop needs
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
            From denting and paint restoration to mechanical repair, AC work, electrical diagnostics,
            and custom fabrication, every job follows the same goal: practical quality with clear delivery.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          <BentoItem className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <Badge className="border-neutral-900 bg-neutral-900 text-white">Most Requested</Badge>
                <h2 className="mt-3 text-xl font-semibold text-neutral-900 sm:text-2xl">
                  Denting, painting, and complete body restoration
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Panel damage correction, repainting, color change, and premium finishing for cars,
                  bikes, and scooters.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Automobile paint and body restoration"
                className="h-44 w-full rounded-xl object-cover sm:h-52"
                loading="lazy"
              />
            </div>
          </BentoItem>

          <BentoItem>
            <h2 className="text-lg font-semibold text-neutral-900">Mechanical repairs</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Diagnostics, repair jobs, new parts installation, and engine tuning by experienced technicians.
            </p>
          </BentoItem>

          <BentoItem>
            <h2 className="text-lg font-semibold text-neutral-900">Electrical and AC works</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Electrical troubleshooting, wiring fixes, AC gas refill, and complete cooling system care.
            </p>
          </BentoItem>

          <BentoItem className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">Custom workshop builds</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Custom body kits, suspension setups, custom-made parts, and exhaust work tailored to your build.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
                alt="Custom vehicle workshop build"
                className="h-44 w-full rounded-xl object-cover sm:h-52 lg:h-64"
                loading="lazy"
              />
            </div>
          </BentoItem>

          <BentoItem className="sm:col-span-2 lg:col-span-2">
            <h2 className="text-lg font-semibold text-neutral-900">Detailing and protection</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Washing, polishing, and Teflon coating to keep vehicles cleaner, protected, and ready for everyday use.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <a href="tel:9756544613">Call 9756544613</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:adiwarsi953@gmail.com">Get a Quote</a>
              </Button>
            </div>
          </BentoItem>

          <BentoItem>
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">Household repainting</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Repainting for almirahs, cabinets, and household metal items with workshop-grade finishing.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
                alt="Household cabinet repainting"
                className="h-28 w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </BentoItem>
        </div>
      </div>
    </section>
  );
};
