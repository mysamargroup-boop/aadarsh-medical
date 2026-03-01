"use client"

import React from 'react';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, MessageSquare, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartDrawer({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

    const handleCheckout = () => {
        const phoneNumber = "+919000000000"; // Placeholder - User can change this later

        let message = `*Enquiry from Aadarsh Medical*\n\n`;
        message += `I want to enquire about the following products:\n\n`;

        items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (${item.company})\n`;
            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: ₹${item.price}/ea\n\n`;
        });

        message += `*Total Items:* ${totalItems}\n`;
        message += `*Approx Total:* ₹${totalPrice.toFixed(2)}\n\n`;
        message += `Please confirm the availability and wholesale pricing.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-muted/20 shadow-2xl">
                <SheetHeader className="p-6 border-b border-muted/10 medical-gradient-hero text-white">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-white flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Your Enquiry Cart
                        </SheetTitle>
                    </div>
                    <p className="text-white/70 text-xs font-medium">Add products to enquire about wholesale pricing</p>
                </SheetHeader>

                <ScrollArea className="flex-1 p-6">
                    {items.length === 0 ? (
                        <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-40">
                            <ShoppingCart className="w-16 h-16 mb-4 text-primary" />
                            <h3 className="text-lg font-bold text-primary">Your cart is empty</h3>
                            <p className="text-sm mt-1">Browse products and add them to your enquiry list</p>
                            <Button
                                variant="outline"
                                className="mt-6 rounded-full border-primary text-primary font-bold"
                                onClick={() => onOpenChange(false)}
                            >
                                Start Browsing
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted/30 shrink-0 border border-muted/10">
                                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-primary truncate leading-tight mb-0.5">{item.name}</h4>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">{item.company}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5 border border-muted/10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white rounded-md transition-colors text-primary"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-6 text-center text-xs font-bold text-primary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white rounded-md transition-colors text-primary"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <p className="text-xs font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="p-6 border-t border-muted/10 flex-col gap-4 mt-auto sm:flex-col bg-muted/5">
                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground font-medium">Subtotal</span>
                                <span className="font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between text-base">
                                <span className="font-bold text-primary">Total Enquiry Val</span>
                                <span className="font-bold text-secondary text-lg">₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleCheckout}
                            className="w-full h-12 rounded-xl gradient-button text-white font-bold text-sm shadow-lg border-none flex gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Proceed to WhatsApp Enquiry
                        </Button>

                        <Button
                            variant="ghost"
                            onClick={() => clearCart()}
                            className="w-full text-muted-foreground hover:text-red-500 text-xs font-medium"
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Clear All Items
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
