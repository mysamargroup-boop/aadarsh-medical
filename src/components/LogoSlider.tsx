"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const companies = [
  { name: 'Mankind', src: '/images/partners/converted-mankind.webp', pdfUrl: 'https://drive.google.com/file/d/1NZL4vl9XgOcmwFQwyyYjS1t3BWGTTIHk/view?usp=drive_link' },
  { name: 'Aristo', src: '/images/partners/converted-aristo.webp', pdfUrl: 'https://drive.google.com/file/d/1EZYt_OMZuT1_UIYfboKwqebDjdNM50NU/view?usp=drive_link' },
  { name: "Dr. Reddy's", src: '/images/partners/converted-dr-reddy.webp', pdfUrl: 'https://drive.google.com/file/d/1ACwhcefxThaQ0SU1mgv0xYjENfcuF47m/view?usp=drive_link' },
  { name: 'Lupin', src: '/images/partners/converted-lupin.webp', pdfUrl: 'https://drive.google.com/file/d/1HuWr4v4ga6z-aYr_NT5supOdCPNzZOj9/view?usp=drive_link' },
  { name: 'Macleods', src: '/images/partners/converted-macleods.webp', pdfUrl: 'https://drive.google.com/file/d/1yvqoFU5WhHPKqGtogQ-ESFa3wQpHyfBW/view?usp=drive_link' },
  { name: 'Sarabhai', src: '/images/partners/converted-sarabhai.webp', pdfUrl: 'https://drive.google.com/file/d/1YrYXoqCngrT5kKqoWH4iuzYtabDrJGit/view?usp=drive_link' },
  { name: 'Sushima', src: '/images/partners/converted-sushima.webp', pdfUrl: 'https://drive.google.com/file/d/1bjnASIxDk0kXRDRUAxRrPZlF3HFZyVEJ/view?usp=drive_link' },
  { name: 'Torrent Pharma', src: '/images/partners/converted-torrent-pharma.webp', pdfUrl: 'https://drive.google.com/file/d/1EpO-kBHhN3sdaw4dCiSQXtD6kkqSEkIn/view?usp=drive_link' },
  { name: 'Tynor', src: '/images/partners/converted-tynor.webp', pdfUrl: 'https://drive.google.com/file/d/17JpLfSUVb2BvQIN20A_sjWW44ufy7XDg/view?usp=drive_link' },
  { name: 'Alembic', src: '/images/partners/converted-alembic.webp', pdfUrl: 'https://drive.google.com/file/d/1KWHuo0j6T8UKEyOC3TqIrC04A_s_4SXW/view?usp=drive_link' },
  { name: 'Glenmark', src: '/images/partners/converted-glenmark.webp', pdfUrl: '#' }, 
  { name: 'Medigrip', src: '/images/partners/converted-medigrip.webp', pdfUrl: 'https://drive.google.com/file/d/1FGeGGI2MLAgJeXtvwN6b4t1i0QY9VRfd/view?usp=drive_link' },
  { name: 'Troikaa', src: '/images/partners/converted-troikaa.webp', pdfUrl: 'https://drive.google.com/file/d/16Ls5MKgr7H37UwMWKom3QBTJ2aaZRD9d/view?usp=drive_link' },
  { name: 'Univentis', src: '/images/partners/converted-univentis.webp', pdfUrl: 'https://drive.google.com/file/d/1Te1v4TVqBYqhKYls6sRvH3wHtErV20po/view?usp=drive_link' },
  { name: 'Welcomevet', src: '/images/partners/converted-welcomevet.webp', pdfUrl: 'https://drive.google.com/file/d/1UehpABPuy9NWakVZUYbis6dqqKBls5xz/view?usp=drive_link' },
  { name: 'Mankind Prime', src: '/images/partners/converted-mankind-prime.webp', pdfUrl: 'https://drive.google.com/file/d/1LO7b6pW1S0hrZ0ghYI9iRwSsNfQVeONI/view?usp=drive_link' },
];

export function LogoSlider() {
  return (
    <section className="pt-12 pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-muted-foreground font-semibold uppercase tracking-wider text-sm mb-2">Authorized Distributor of</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mt-2">
          <h2 className="text-primary font-headline font-bold text-3xl">Our Pharma Partners</h2>
          <Link href="/brands" className="text-secondary text-sm font-semibold hover:underline bg-secondary/10 px-4 py-1.5 rounded-full inline-block">
            View All
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll hover:pause whitespace-nowrap gap-8 py-4 w-max">
          {[...companies, ...companies].map((company, index) => {
             const Wrapper = company.pdfUrl !== '#' ? 'a' : 'div';
             const wrapperProps = company.pdfUrl !== '#' ? { href: company.pdfUrl, target: "_blank", rel: "noopener noreferrer" } : {};
             return (
              <Wrapper
                key={index}
                {...wrapperProps}
                className={cn(
                  "inline-flex items-center justify-center p-6 bg-white border border-muted rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300 min-w-[200px] h-[100px] group relative focus:outline-none",
                  company.pdfUrl !== '#' ? "cursor-pointer" : "cursor-default"
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={company.src}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 scale-110"
                  />
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
