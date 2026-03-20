"use client";

import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Handshake,
  Link,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: 'phone' | 'search' | 'wrench' | 'shieldCheck' | 'handshake';
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

const timelineIconMap: Record<TimelineItem['icon'], React.ElementType> = {
  phone: Phone,
  search: Search,
  wrench: Wrench,
  shieldCheck: ShieldCheck,
  handshake: Handshake,
};

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<'orbital'>('orbital');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(timelineData[0]?.id ?? null);
  const [orbitRadius, setOrbitRadius] = useState<number>(160);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (timelineData[0]?.id) {
      setExpandedItems({ [timelineData[0].id]: true });
      setPulseEffect(
        timelineData[0].relatedIds.reduce<Record<number, boolean>>((acc, id) => {
          acc[id] = true;
          return acc;
        }, {})
      );
    }
  }, [timelineData]);

  useEffect(() => {
    const updateOrbitRadius = () => {
      if (typeof window === 'undefined') return;

      if (window.innerWidth < 640) {
        setOrbitRadius(110);
        return;
      }

      if (window.innerWidth < 1024) {
        setOrbitRadius(140);
        return;
      }

      setOrbitRadius(160);
    };

    updateOrbitRadius();
    window.addEventListener('resize', updateOrbitRadius);

    return () => {
      window.removeEventListener('resize', updateOrbitRadius);
    };
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === 'orbital') {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== 'orbital' || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = orbitRadius * Math.cos(radian) + centerOffset.x;
    const y = orbitRadius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.45,
      Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'text-white bg-neutral-900 border-neutral-900';
      case 'in-progress':
        return 'text-neutral-900 bg-neutral-100 border-neutral-900';
      case 'pending':
        return 'text-neutral-700 bg-white border-neutral-300';
      default:
        return 'text-neutral-700 bg-white border-neutral-300';
    }
  };

  const activeItem =
    timelineData.find((item) => item.id === activeNodeId) ?? timelineData[0];

  return (
    <section className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
            Our process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            From first call to final handover, the workflow stays clear
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
            Customers usually want a simple answer: what happens next. This section
            shows how service moves from contact and inspection through repair,
            quality checks, and vehicle delivery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div
            className="relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-neutral-300 bg-[radial-gradient(circle_at_center,_rgba(250,250,250,1)_0%,_rgba(255,255,255,1)_48%,_rgba(241,241,241,1)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:h-[560px] lg:h-[720px]"
            ref={containerRef}
            onClick={handleContainerClick}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(23,23,23,0.06)_0%,_transparent_56%)]" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400 sm:text-xs">
              <span>Workshop Flow</span>
              <span>Tap A Step</span>
            </div>
            <div className="relative h-full w-full max-w-5xl" ref={orbitRef}>
              <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.14)] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                <div className="absolute h-24 w-24 rounded-full border border-neutral-400/80 animate-ping opacity-70 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
                <div
                  className="absolute h-28 w-28 rounded-full border border-neutral-300 animate-ping opacity-50 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                  style={{ animationDelay: '0.5s' }}
                />
                <div className="text-center">
                  <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-neutral-900 sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                    <Wrench size={12} />
                  </div>
                  <div className="mt-2 hidden text-[9px] font-semibold uppercase tracking-[0.24em] text-white/80 lg:block">
                    Workshop
                  </div>
                </div>
              </div>

              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-dashed border-neutral-500"
                style={{
                  width: `${orbitRadius * 2 + 34}px`,
                  height: `${orbitRadius * 2 + 34}px`,
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300/80"
                style={{
                  width: `${orbitRadius * 2 - 34}px`,
                  height: `${orbitRadius * 2 - 34}px`,
                }}
              />

              {timelineData.map((item, index) => {
                const position = calculateNodePosition(index, timelineData.length);
                const isExpanded = expandedItems[item.id];
                const isRelated = isRelatedToActive(item.id);
                const isPulsing = pulseEffect[item.id];
                const Icon = timelineIconMap[item.icon];

                const nodeStyle = {
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                };

                return (
                  <div
                    key={item.id}
                    ref={(el) => (nodeRefs.current[item.id] = el)}
                    className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700"
                    style={nodeStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                  >
                    <div
                      className={`absolute -inset-1 rounded-full ${
                        isPulsing ? 'animate-pulse duration-1000' : ''
                      }`}
                      style={{
                        background:
                          'radial-gradient(circle, rgba(17,17,17,0.12) 0%, rgba(17,17,17,0) 70%)',
                        width: `${item.energy * 0.45 + 48}px`,
                        height: `${item.energy * 0.45 + 48}px`,
                        left: `-${(item.energy * 0.45 + 48 - 40) / 2}px`,
                        top: `-${(item.energy * 0.45 + 48 - 40) / 2}px`,
                      }}
                    />

                    <div
                      className={`
                      flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 transform sm:h-11 sm:w-11 lg:h-14 lg:w-14
                      ${
                        isExpanded
                          ? 'scale-150 border-neutral-900 bg-neutral-900 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]'
                          : isRelated
                            ? 'border-neutral-900 bg-neutral-100 text-neutral-900 animate-pulse'
                            : 'border-neutral-500 bg-white text-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
                      }
                    `}
                    >
                      <Icon size={17} />
                    </div>

                    <div
                      className={`
                      absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-[0.16em] transition-all duration-300 sm:top-16 sm:text-xs
                      ${isExpanded ? 'scale-125 text-neutral-900' : 'text-neutral-600'}
                    `}
                    >
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {activeItem && (
            <Card className="border-neutral-200 bg-white shadow-sm lg:sticky lg:top-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                      {activeItem.date}
                    </p>
                    <CardTitle className="mt-1 text-base text-neutral-900">
                      {activeItem.title}
                    </CardTitle>
                  </div>
                  <Badge className={getStatusStyles(activeItem.status)}>
                    {activeItem.status === 'completed'
                      ? 'Complete'
                      : activeItem.status === 'in-progress'
                        ? 'In Progress'
                        : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-neutral-600">
                <p>{activeItem.content}</p>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Zap size={12} />
                      Confidence
                    </span>
                    <span>{activeItem.energy}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-neutral-900"
                      style={{ width: `${activeItem.energy}%` }}
                    />
                  </div>
                </div>
                {activeItem.relatedIds.length > 0 && (
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="mb-2 flex items-center">
                      <Link size={10} className="mr-1 text-neutral-500" />
                      <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Connected Steps
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.relatedIds.map((relatedId) => {
                        const relatedItem = timelineData.find((i) => i.id === relatedId);
                        return (
                          <Button
                            key={relatedId}
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full border-neutral-300 bg-transparent px-3 text-xs text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                            onClick={() => toggleItem(relatedId)}
                          >
                            {relatedItem?.title}
                            <ArrowRight size={10} className="ml-1 text-neutral-500" />
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
