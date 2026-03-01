import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aadarsh Medical | Trusted Wholesale Pharma Distributor & Medical Supplies',
  description: 'Aadarsh Medical Store (AD2025) - Central India\'s leading wholesale pharmaceutical distributor. Genuine medicines, surgical equipment, and veterinary supplies from 29+ top brands at competitive wholesale prices.',
  keywords: 'wholesale pharmacy, medical store, pharma distributor, generic medicines, healthcare supplies, surgical equipment, veterinary medicines, AD2025, Aadarsh Medical',
  authors: [{ name: 'Aadarsh Medical' }],
  metadataBase: new URL('https://ad2025.in'),
  openGraph: {
    title: 'Aadarsh Medical | Trusted Wholesale Pharmacy',
    description: 'Reliable pharmaceutical supply chain serving hospitals and retailers since 2015.',
    url: 'https://ad2025.in',
    siteName: 'Aadarsh Medical',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadarsh Medical | Wholesale Pharma',
    description: 'Authorized distributor for 29+ leading pharmaceutical brands.',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
