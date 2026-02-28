import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aadarsh MedStore | Trusted Wholesale Pharma Distributor & Medical Supplies',
  description: 'Aadarsh Medical Store - Central India\'s leading wholesale pharmaceutical distributor. Genuine medicines, surgical equipment, and veterinary supplies from 29+ top brands at competitive wholesale prices.',
  keywords: 'wholesale pharmacy, medical store, pharma distributor, generic medicines, healthcare supplies, surgical equipment, veterinary medicines',
  authors: [{ name: 'Aadarsh MedStore' }],
  openGraph: {
    title: 'Aadarsh MedStore | Trusted Wholesale Pharmacy',
    description: 'Reliable pharmaceutical supply chain serving hospitals and retailers since 2015.',
    url: 'https://aadarshmedstore.com',
    siteName: 'Aadarsh MedStore',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadarsh MedStore | Wholesale Pharma',
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
