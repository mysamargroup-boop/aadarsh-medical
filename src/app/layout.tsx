import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ad2025.in'),
  title: 'Adarsh Medical | Trusted Pharma Distributor & Medical Supplies',
  description: 'Adarsh Medical Store - Central India\'s leading pharmaceutical distributor in Garhakota, Sagar MP. Genuine medicines, surgical equipment, and veterinary supplies from 29+ top brands like Dr. Reddy\'s, Mankind, Macleods, Aristo & Lupin at authorized wholesale prices.',
  keywords: ['pharma distributor', 'medical store', 'medical supplies Garhakota', 'Adarsh Medical', 'wholesale medicines', 'Sagar MP', 'Dr Reddys distributor', 'Mankind distributor', 'surgical equipment', 'veterinary medicines'],
  alternates: {
    canonical: 'https://ad2025.in/',
  },
  openGraph: {
    title: 'Adarsh Medical Store | Authorized Pharmaceutical Distributor',
    description: 'Central India\'s trusted pharma distributor. 2500+ products from 29+ leading pharmaceutical companies. Medicines, surgical supplies & veterinary products.',
    url: 'https://ad2025.in/',
    siteName: 'Adarsh Medical',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adarsh Medical | Trusted Pharma Distributor',
    description: 'Central India\'s trusted pharma distributor with 2500+ products from 29+ leading brands.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "Adarsh Medical",
  "image": "https://ad2025.in/favicon.png",
  "@id": "https://ad2025.in",
  "url": "https://ad2025.in",
  "telephone": "+91 9630080706",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ghanta Ghar, Jagdish ward",
    "addressLocality": "Garhakota",
    "addressRegion": "MP",
    "postalCode": "470229",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.9317,
    "longitude": 79.1350
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "10:00",
    "closes": "20:30"
  },
  "sameAs": [
    "https://www.facebook.com/share/15ffXat1id/",
    "https://www.instagram.com/samar_group_sagar/"
  ]
};

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-secondary selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
