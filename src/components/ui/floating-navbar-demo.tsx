"use client";

import React from 'react';
import { Home, Phone, Wrench } from 'lucide-react';

import { FloatingNav } from '@/components/ui/floating-navbar';

export function FloatingNavbarDemo() {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <Home className="h-4 w-4 text-neutral-600" />,
    },
    {
      name: 'Services',
      link: '/services',
      icon: <Wrench className="h-4 w-4 text-neutral-600" />,
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: <Phone className="h-4 w-4 text-neutral-600" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
