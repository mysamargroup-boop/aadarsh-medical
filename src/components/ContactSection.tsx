"use client"

import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    organization: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Inquiry from Website*\n\n*Name:* ${formData.name}\n*Mobile:* ${formData.mobile}\n*Organization:* ${formData.organization}\n*Details:* ${formData.details}`;
    const whatsappNumber = "919630080706";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };
  return (
    <section id="contact" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Get in Touch</span>
            <h2 className="text-primary font-headline font-bold text-3xl md:text-4xl mt-1 mb-6">Partner With Us Today</h2>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed opacity-80">
              Whether you're a small pharmacy or a large hospital chain, we're ready to serve your pharmaceutical needs with unmatched reliability.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white">
                  <UserIcon size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Managing Director</p>
                  <p className="text-primary font-headline font-bold text-lg">Abhishek Kumar</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Contact Number</p>
                  <p className="text-primary font-headline font-bold text-lg">+91 9630080706</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Location</p>
                  <p className="text-primary font-headline font-bold text-sm">Ghanta Ghar, Jagdish ward, Garhakota Dist Sagar, MP, 470229</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Address</p>
                  <p className="text-primary font-headline font-bold text-sm">adarshmedicalstores2020@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-7 h-12 font-bold shadow-lg border-none">
                <a href="https://wa.me/919630080706" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5" /> Message on WhatsApp
                </a>
              </Button>
              <Button asChild className="gradient-button text-white rounded-full px-7 h-12 font-bold shadow-lg border-none">
                <a href="https://chat.whatsapp.com/Bo64bJcFyE31vlI4G5onFm?mode=hq2tswa" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2" size={20} /> Join Group
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-muted/30 p-8 md:p-10 rounded-[2.5rem] border border-border shadow-inner relative overflow-hidden group">
            <div className="faint-pattern absolute inset-0 opacity-10" />
            <h3 className="relative z-10 text-primary font-headline font-bold text-xl mb-8">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-sm"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Organization / Pharmacy Name"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-sm"
              />
              <textarea
                placeholder="List products or your inquiry details (e.g., ENO, Crocin, BP Machines...)"
                required
                rows={4}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-sm resize-none"
              />
              <Button type="submit" className="w-full h-12 gradient-button text-white rounded-xl font-bold text-base group border-none">
                Submit Inquiry <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
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
