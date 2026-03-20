"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Wrench, Home } from 'lucide-react';

import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  link: string;
  icon?: React.ReactNode;
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -14,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.22,
      }}
      className={cn(
        'fixed inset-x-0 top-3 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full border border-neutral-200 bg-white/95 px-3 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur sm:top-4 sm:px-4',
        className
      )}
    >
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              'relative flex items-center space-x-1 rounded-full px-3 py-1.5 text-neutral-600 transition-colors hover:text-neutral-900'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden text-sm font-medium sm:block">{navItem.name}</span>
          </a>
        ))}
        <a
          href="tel:9756544613"
          className="relative rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900"
        >
          <span>Call Now</span>
          <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        </a>
    </motion.div>
  );
};

export function FloatingNavDemo() {
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
