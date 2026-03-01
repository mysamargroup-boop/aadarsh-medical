"use client"

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Phone",
            details: ["+91 9630080706", "+91 9243967137"],
            action: "tel:+919630080706"
        },
        {
            icon: Mail,
            title: "Email",
            details: ["adarshmedicalstores2020@gmail.com"],
            action: "mailto:adarshmedicalstores2020@gmail.com"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Ghanta Ghar, Jagdish ward,", "Garhakota Dist Sagar, MP, 470229"],
            action: "https://maps.google.com/?q=Aadarsh+Medical+Store+Garhakota"
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: ["Monday - Saturday", "10:00 AM - 8:30 PM"],
            action: null
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            <div className="flex-grow pt-28 pb-20">
                {/* Hero Section */}
                <div className="bg-primary relative overflow-hidden text-white py-20 mb-16">
                    <div className="absolute inset-0 opacity-10 background-pattern-dots" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-secondary/80 mix-blend-multiply" />

                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6">Get in Touch</h1>
                        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                            Have questions about our wholesale products or need assistance? Our team is here to help you.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Contact Info Cards */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                        <method.icon size={120} />
                                    </div>
                                    <div className="w-14 h-14 bg-emerald-50 text-secondary rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <method.icon size={28} />
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary mb-3 relative z-10">{method.title}</h3>
                                    <div className="space-y-1 relative z-10">
                                        {method.details.map((detail, idx) => (
                                            <p key={idx} className="text-muted-foreground">{detail}</p>
                                        ))}
                                    </div>
                                    {method.action && (
                                        <a href={method.action} target={method.action.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className="inline-block mt-4 text-sm font-bold text-secondary hover:text-primary transition-colors relative z-10">
                                            {method.title === 'Visit Us' ? 'Get Directions →' : 'Reach Out →'}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />

                            <h2 className="text-3xl font-headline font-bold text-primary mb-2">Send us a Message</h2>
                            <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary ml-1">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 9876543210"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary ml-1">Email Address (Optional)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary ml-1">Subject</label>
                                        <select
                                            required
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none"
                                        >
                                            <option value="" disabled>Select a subject</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Wholesale Orders">Wholesale Orders</option>
                                            <option value="Product Availability">Product Availability</option>
                                            <option value="Feedback / Other">Feedback / Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary ml-1">Your Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isSubmitted}
                                    className={`w-full h-14 rounded-2xl font-bold text-lg transition-all ${isSubmitted ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : 'gradient-button border-none'}`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : isSubmitted ? (
                                        <span className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Message Sent Successfully!
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-white">
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
