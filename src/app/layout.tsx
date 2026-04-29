import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ad2025.in'),
  title: 'Adarsh Medical | Trusted Pharma Distributor & Medical Supplies',
  description: 'Adarsh Medical Store - Central India\'s leading pharmaceutical distributor in Garhakota, Sagar MP. Genuine medicines, surgical equipment, and veterinary supplies from 29+ top brands like Dr. Reddy\'s, Mankind, Macleods, Aristo & Lupin at authorized wholesale prices.',
  keywords: [
    'pharma distributor', 'medical store', 'medical supplies Garhakota', 'Adarsh Medical',
    'wholesale medicines', 'Sagar MP', 'Dr Reddys distributor', 'Mankind distributor',
    'surgical equipment', 'veterinary medicines',
    // LOCAL SEO: Both common spellings for Google search
    'aadarsh medical store garhakota', 'adarsh medical store garhakota',
    'medical store near me garhakota', 'dawai ki dukan garhakota',
    'medicine shop sagar MP', 'pharmacy garhakota sagar',
    'medical store garhakota madhya pradesh'
  ],
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
  "alternateName": ["Aadarsh Medical Store", "Adarsh Medical Store Garhakota", "Aadarsh Medical Stores"],
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
import { SmoothScroll } from '@/components/SmoothScroll';

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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PL2GQN6Z');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8PGMNCDSEZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8PGMNCDSEZ');`,
          }}
        />
        {/* End Google tag */}
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5604436069422278"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased selection:bg-secondary selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PL2GQN6Z"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <CartProvider>
            {children}
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
