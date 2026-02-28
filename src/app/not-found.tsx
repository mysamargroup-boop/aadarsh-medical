
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-muted/20 flex flex-col pt-24 md:pt-32">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            <div className="text-[12rem] font-headline font-bold text-primary/5 select-none leading-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center text-secondary border border-muted/20 transform -rotate-12 transition-transform hover:rotate-0 duration-500">
                <Search size={64} className="opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-headline font-bold text-primary">?</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">Medicine Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              We couldn't find the medical supplies or page you were looking for. It may have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="outline" className="rounded-2xl border-primary text-primary hover:bg-primary/5 h-14 px-8 font-bold border-2">
              <Link href="/shop">
                <Search className="mr-2" size={20} /> Browse Inventory
              </Link>
            </Button>
            <Button asChild className="rounded-2xl gradient-button text-white shadow-xl shadow-secondary/20 h-14 px-10 font-bold border-none">
              <Link href="/">
                <Home className="mr-2" size={20} /> Return Home
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-muted/30">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Need immediate assistance?</p>
            <Button asChild variant="link" className="text-secondary font-bold text-base">
              <Link href="/#contact">Contact Support Team</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
