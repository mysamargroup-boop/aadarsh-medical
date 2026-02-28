
"use client"

import React, { useState } from 'react';
import { Send, X, MessageCircle, Bot, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface AiAssistantProps {
  externalOpen?: boolean;
  onClose?: () => void;
}

export function AiAssistant({ externalOpen, onClose }: AiAssistantProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  const setIsOpen = (val: boolean) => {
    if (externalOpen !== undefined) {
      if (!val && onClose) onClose();
    } else {
      setInternalOpen(val);
    }
  };

  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Direct WhatsApp redirection
    const whatsappNumber = "919630080706";
    const message = encodeURIComponent(`Hello Aadarsh MedStore, I have an inquiry about: ${query}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    // Reset and close
    setQuery('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Toggle Button - Desktop Only */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full items-center justify-center text-white shadow-2xl hover:bg-[#128C7E] transition-all duration-300 group"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </button>

      {/* WhatsApp Helper Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <Card className="relative w-full max-w-lg flex flex-col shadow-2xl overflow-hidden border-none animate-in fade-in zoom-in duration-300">
            <CardHeader className="medical-gradient-dark text-background p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">WhatsApp Inquiry</CardTitle>
                    <p className="text-background/70 text-sm">Send your requirements directly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-background"
                >
                  <X size={20} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-6 bg-white no-scrollbar">
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#25D366]">
                    <WhatsAppIcon className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-lg text-primary mb-2">How can we help?</h3>
                  <p className="text-muted-foreground text-sm">Type your medicine list or inquiry below and we will get back to you on WhatsApp instantly.</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Check Stock", icon: <Bot size={14} /> },
                    { label: "Wholesale Price", icon: <ShoppingCart size={14} /> },
                    { label: "New Order", icon: <Send size={14} /> },
                    { label: "Retail Inquiry", icon: <MessageCircle size={14} /> }
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => setQuery(item.label)}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-muted/30 rounded-xl text-xs font-bold text-primary hover:bg-secondary/10 hover:text-secondary border border-transparent hover:border-secondary/20 transition-all"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>

            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type your inquiry here..."
                  className="pr-20 h-14 rounded-xl border-muted focus-visible:ring-secondary"
                />
                <Button
                  type="submit"
                  disabled={!query.trim()}
                  className="absolute right-2 top-2 h-10 bg-[#25D366] hover:bg-[#128C7E] text-white"
                >
                  <Send size={18} />
                </Button>
              </form>
              <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase font-bold tracking-widest">
                Direct WhatsApp Redirection
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
