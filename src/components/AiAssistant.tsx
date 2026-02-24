
"use client"

import React, { useState } from 'react';
import { Send, X, Search, Sparkles, Plus, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { productSearchAssistant, type ProductSearchOutput } from '@/ai/flows/product-search-assistant';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProductSearchOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await productSearchAssistant({ query });
      setResult(response);
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button - WhatsApp themed, no sparkle badge */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-[#128C7E] transition-all duration-300 group"
      >
        <WhatsAppIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Interface Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <Card className="relative w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden border-none animate-in fade-in zoom-in duration-300">
            <CardHeader className="medical-gradient-dark text-background p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Bot size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">Aadarsh AI Assistant</CardTitle>
                    <p className="text-background/70 text-sm">Find medicines & alternatives instantly</p>
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

            <CardContent className="flex-1 overflow-y-auto p-6 bg-muted/30">
              <div className="space-y-6">
                {!result && !isLoading && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      <Search size={40} />
                    </div>
                    <h3 className="font-headline font-bold text-xl text-primary mb-2">How can I help you today?</h3>
                    <p className="text-muted-foreground mb-6">Ask me about specific medicines, treatments, or alternatives.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["Best painkiller for kids?", "Alternative to Paracetamol", "Veterinary allergy meds", "Surgical gloves variety"].map(hint => (
                        <button 
                          key={hint}
                          onClick={() => setQuery(hint)}
                          className="px-4 py-2 bg-white rounded-full text-sm border hover:border-secondary hover:text-secondary transition-all"
                        >
                          {hint}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-primary/20" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-primary/10 rounded w-3/4" />
                      <div className="h-4 bg-primary/10 rounded w-1/2" />
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/20">
                      <p className="text-primary font-medium leading-relaxed">{result.responseMessage}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.foundProducts.length > 0 && (
                        <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                          <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-secondary" /> Found Products
                          </h4>
                          <ul className="space-y-2">
                            {result.foundProducts.map(p => (
                              <li key={p} className="flex items-center gap-2 text-sm text-primary/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {result.suggestedAlternatives.length > 0 && (
                        <div className="bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
                          <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Alternatives
                          </h4>
                          <ul className="space-y-2">
                            {result.suggestedAlternatives.map(p => (
                              <li key={p} className="flex items-center gap-2 text-sm text-primary/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {result.categoryRecommendations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {result.categoryRecommendations.map(cat => (
                          <span key={cat} className="px-3 py-1 bg-white border border-muted text-xs font-bold rounded-full text-muted-foreground uppercase tracking-tight">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>

            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask for medicines, alternatives..."
                  className="pr-20 h-14 rounded-xl border-muted focus-visible:ring-secondary"
                />
                <Button 
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 top-2 h-10 bg-primary hover:bg-secondary text-primary-foreground"
                >
                  <Send size={18} />
                </Button>
              </form>
              <p className="text-[10px] text-center mt-3 text-muted-foreground">
                AI can make mistakes. Please verify all pharmaceutical recommendations with a professional.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
