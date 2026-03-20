import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ['trusted', 'complete', 'expert', 'quality', 'custom'],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-8 py-14 sm:py-16 lg:py-24 flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-3 rounded-full border border-border bg-white px-4 text-mono-700 shadow-sm">
              Since 1962 in Nainital <MoveRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex max-w-4xl gap-4 flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl tracking-tight text-center font-semibold leading-tight">
              <span className="text-mono-700">Warsi Service Center delivers</span>
              <span className="relative flex min-h-[1.2em] w-full justify-center overflow-hidden text-center py-1 sm:py-2">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-mono-900"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title} vehicle care
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-7 sm:leading-8 tracking-tight text-muted-foreground max-w-2xl text-center mx-auto px-2">
              Denting, painting, mechanical repairs, welding, AC service, electrical
              work, custom body kits, suspension setups, and detailing for cars,
              bikes, and scooters. Built mobile-first for customers who just want
              to call, visit, and get the job done fast.
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-3 h-12 rounded-full px-6 border-mono-200 bg-white text-mono-900 hover:bg-mono-100" variant="outline" asChild>
              <a href="tel:9756544613">
                Call 9756544613 <PhoneCall className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" className="gap-3 h-12 rounded-full px-6 bg-mono-900 text-white hover:bg-mono-700 shadow-soft" asChild>
              <a href="/services">
                View services <MoveRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-mono-200 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold text-mono-900">15+</div>
              <p className="mt-1 text-sm text-muted-foreground">services under one roof</p>
            </div>
            <div className="rounded-2xl border border-mono-200 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold text-mono-900">Cars, bikes, scooters</div>
              <p className="mt-1 text-sm text-muted-foreground">repair, restore, customize</p>
            </div>
            <div className="rounded-2xl border border-mono-200 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold text-mono-900">Nainital</div>
              <p className="mt-1 text-sm text-muted-foreground">local workshop with long-term trust</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
