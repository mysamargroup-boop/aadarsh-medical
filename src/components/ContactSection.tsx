
"use client"

import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Get in Touch</span>
            <h2 className="text-primary font-headline font-bold text-4xl md:text-5xl mt-2 mb-6">Partner With Us Today</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you're a small pharmacy or a large hospital chain, we're ready to serve your pharmaceutical needs with unmatched reliability.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                  <UserIcon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Managing Director</p>
                  <p className="text-primary font-headline font-bold text-xl">Abhishek Kumar</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Phone Number</p>
                  <p className="text-primary font-headline font-bold text-xl">+91 9630080706</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase">Location</p>
                  <p className="text-primary font-headline font-bold text-xl">Aadarsh MedStore, Central India Hub</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-8 h-14 font-bold shadow-lg shadow-green-500/20">
                <a href="https://wa.me/919630080706" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" /> Message on WhatsApp
                </a>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 font-bold shadow-lg shadow-primary/20">
                <a href="https://wa.me/join/yourgroup" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2" /> Join WhatsApp Group
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-muted/20 p-8 md:p-12 rounded-[3rem] border border-white shadow-inner relative overflow-hidden group">
            <div className="faint-pattern absolute inset-0 opacity-10" />
            <h3 className="relative z-10 text-primary font-headline font-bold text-2xl mb-8">Send an Inquiry</h3>
            <form className="relative z-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-secondary outline-none font-medium" />
                <input type="tel" placeholder="Mobile Number" className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-secondary outline-none font-medium" />
              </div>
              <input type="text" placeholder="Organization / Pharmacy Name" className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-secondary outline-none font-medium" />
              <textarea placeholder="List products or your inquiry details..." rows={4} className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-secondary outline-none font-medium resize-none" />
              <Button className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-bold text-lg group">
                Submit Inquiry <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function UserIcon({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
