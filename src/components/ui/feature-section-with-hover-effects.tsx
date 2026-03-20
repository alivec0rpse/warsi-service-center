import { cn } from '@/lib/utils';
import {
  IconBrush,
  IconCircuitBulb,
  IconDroplet,
  IconEngine,
  IconMapPin,
  IconPhoneCall,
  IconShieldCheck,
  IconWrench,
} from '@tabler/icons-react';

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: 'Denting and paint restoration',
      description:
        'From panel damage to full repaint work, the workshop handles restoration with a clean finish and practical turnaround.',
      icon: <IconBrush className="h-6 w-6" />,
    },
    {
      title: 'Mechanical and engine work',
      description:
        'Diagnostics, repairs, tuning, new parts installation, and hands-on service for everyday breakdowns or deeper workshop jobs.',
      icon: <IconEngine className="h-6 w-6" />,
    },
    {
      title: 'Electrical and AC service',
      description:
        'Electrical troubleshooting, custom wiring, AC repair, gas refill, and complete system attention when your vehicle needs it.',
      icon: <IconCircuitBulb className="h-6 w-6" />,
    },
    {
      title: 'Wash, polish, and protection',
      description:
        'Detailing, polishing, and Teflon coating services that help vehicles look sharper and stay easier to maintain.',
      icon: <IconDroplet className="h-6 w-6" />,
    },
    {
      title: 'Custom body kits and modding',
      description:
        'Body kits, suspension setup, custom body parts, exhaust work, and personalization for customers who want more than routine service.',
      icon: <IconWrench className="h-6 w-6" />,
    },
    {
      title: 'Built for cars, bikes, and scooters',
      description:
        'The workshop serves multiple vehicle types, making it easier for local customers to return for different repair and modification needs.',
      icon: <IconShieldCheck className="h-6 w-6" />,
    },
    {
      title: 'Easy to call and visit',
      description:
        'Most customers are mobile-first, so the site is centered around fast actions like calling, viewing services, and getting in touch quickly.',
      icon: <IconPhoneCall className="h-6 w-6" />,
    },
    {
      title: 'Trusted local workshop in Nainital',
      description:
        'Warsi Service Center has been serving customers since 1962 with long-term trust, local familiarity, and practical workshop experience.',
      icon: <IconMapPin className="h-6 w-6" />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
          Why customers choose us
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          One workshop for repair, restoration, detailing, and custom work
        </h2>
        <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
          The service offering stays broad, but the experience should stay simple:
          clear options, strong trust signals, and mobile-friendly actions for people
          who usually arrive from their phone.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col border-neutral-200 py-8 sm:py-10',
        index !== 0 && 'border-t md:border-t-0',
        index % 2 === 1 && 'md:border-l',
        index >= 4 && 'lg:border-t',
        index >= 4 && index % 2 === 0 && 'md:border-l-0',
        index % 4 !== 0 && 'lg:border-l'
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-4 px-6 text-neutral-500 sm:px-8 lg:px-10">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-6 text-lg font-bold sm:px-8 lg:px-10">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-neutral-900" />
        <span className="inline-block text-neutral-900 transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-6 text-sm leading-6 text-neutral-600 sm:px-8 lg:px-10">
        {description}
      </p>
    </div>
  );
};
