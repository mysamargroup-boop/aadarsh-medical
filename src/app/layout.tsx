
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aadarsh MedStore | Trusted Wholesale Pharmacy',
  description: 'Aadarsh Medical Store – Authorized Wholesale Distributor of 29+ Leading Pharma Companies. Reliability you can trust.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-secondary selection:text-white">
        {children}
      </body>
    </html>
  );
}
