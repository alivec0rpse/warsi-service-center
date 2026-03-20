"use client";

import { Heart } from 'lucide-react';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2 text-neutral-900">
              <Icons.logo className="w-8" />
              <h2 className="text-lg font-bold">Warsi Service Center</h2>
            </a>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Professional automobile service center offering comprehensive solutions
              for cars, bikes, and scooters since 1962.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" asChild>
                <a href="tel:9756544613">Call 9756544613</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:adiwarsi953@gmail.com">Send Email</a>
              </Button>
            </div>

            <div className="mt-4">
              <a
                href="https://x.com/compose/tweet?text=I%20just%20checked%20out%20Warsi%20Service%20Center%20in%20Nainital!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" className="gap-2">
                  Share Your Thoughts
                  <Icons.twitter className="h-4 w-4" />
                </Button>
              </a>
            </div>

            <p className="mt-5 text-sm text-neutral-500">
              © {new Date().getFullYear()} Warsi Service Center. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>
                  <a href="/" className="hover:text-neutral-900">Home</a>
                </li>
                <li>
                  <a href="/services" className="hover:text-neutral-900">Services</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-neutral-900">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
                Core Services
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Denting & Painting</li>
                <li>Mechanical Repairs</li>
                <li>Electrical & AC Works</li>
                <li>Custom Modding</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
                Visit Us
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Nainital, Uttarakhand, India</li>
                <li>
                  <a href="https://warsi.qzz.io" className="hover:text-neutral-900">
                    warsi.qzz.io
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/place/Warsi+Service+Center/@29.254019,79.5394076,17z/data=!3m1!4b1!4m6!3m5!1s0x39a09ba50c512d7f:0xdec385b6745cebe5!8m2!3d29.254019!4d79.5419825!16s%2Fg%2F11y6sm5sw8?entry=ttu&g_ep=EgoyMDI1MDEwNy4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900"
                  >
                    Get Directions
                  </a>
                </li>
                <li>
                  <div className="mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                    <iframe
                      title="Warsi Service Center map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.9637984389!2d79.53940757615342!3d29.254018955586382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09ba50c512d7f%3A0xdec385b6745cebe5!2sWarsi%20Service%20Center!5e0!3m2!1sen!2sin!4v1767801569207!5m2!1sen!2sin"
                      className="h-28 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center border-t border-neutral-200 pt-6">
          <p className="text-center text-3xl font-bold uppercase tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-b from-neutral-600 to-neutral-900 md:text-5xl lg:text-7xl">
            Warsi Service Center
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-neutral-600">
          Made with{' '}
          <Heart className="mx-1 inline h-4 w-4 text-neutral-900" />
          by{' '}
          <a
            href="https://github.com/alivec0rpse"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-neutral-900 underline underline-offset-4"
          >
            alivec0rpse
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
