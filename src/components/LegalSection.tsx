
"use client"

import React from 'react';
import { ShieldCheck, FileText, BadgeCheck } from 'lucide-react';

export function LegalSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-white flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-primary font-headline font-bold text-3xl mb-4">Compliant & Certified</h2>
            <p className="text-muted-foreground leading-relaxed">
              We operate with full transparency and strictly adhere to medical wholesale regulations in India. Your trust is our core asset.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-muted/50 p-6 rounded-3xl border border-muted flex items-start gap-4">
              <div className="mt-1 text-secondary">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">GST Identification</p>
                <p className="text-primary font-secondary font-bold text-lg">23AZQPP5467M1ZJ</p>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-3xl border border-muted flex items-start gap-4">
              <div className="mt-1 text-accent">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Retail Drug Licenses</p>
                <p className="text-primary font-secondary font-bold text-sm">20-223/36/2015</p>
                <p className="text-primary font-secondary font-bold text-sm">21-224/36/2015</p>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-3xl border border-muted flex items-start gap-4 sm:col-span-2">
              <div className="mt-1 text-primary">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Wholesale Drug Licenses</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 mt-1">
                  <p className="text-primary font-secondary font-bold">20B/461/36/2017</p>
                  <p className="text-primary font-secondary font-bold">21B/462/36/2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
