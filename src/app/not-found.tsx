
import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-muted/20 flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <h1 className="text-9xl font-headline font-bold text-primary/10">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <Home size={48} />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold text-primary">Page Not Found</h2>
            <p className="text-muted-foreground">
              Oops! The medicine or page you're looking for doesn't exist. It might have been moved or the URL is incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5">
              <Link href="/">
                <ArrowLeft className="mr-2" size={18} /> Go Back
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-primary text-white shadow-lg shadow-primary/20">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
