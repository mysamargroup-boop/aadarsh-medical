"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    content: string;
    readTime?: string;
    image?: string;
}

export default function BlogPostClient() {
    const [post, setPost] = useState<BlogPost | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params.slug) {
            fetch('/blogs.json')
                .then(response => response.json())
                .then(data => {
                    const blogPost = data.find((p: BlogPost) => p.slug === params.slug);
                    setPost(blogPost);
                });
        }
    }, [params.slug]);

    // Push AdSense ads after content loads
    useEffect(() => {
        if (post) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {}
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {}
        }
    }, [post]);

    if (!post) {
        return (
            <main className="min-h-screen bg-muted/20">
                <Header />
                <div className="pt-28 md:pt-36 pb-20">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-3/4 mb-8" />
                        <Skeleton className="h-[300px] w-full rounded-2xl mb-8" />
                        <div className="prose lg:prose-xl max-w-none">
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-5/6 mb-4" />
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-muted/20">
            <Header />
            {/* Reduced top padding here to fix the empty space */}
            <div className="pt-28 md:pt-36 pb-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                        <ChevronRight size={14} />
                        <span className="text-primary font-bold truncate max-w-[200px]">{post.title}</span>
                    </nav>

                    <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                        <span className="flex items-center gap-1"><Calendar size={16} /> {post.date}</span>
                        {post.readTime && <span className="flex items-center gap-1"><Clock size={16} /> {post.readTime}</span>}
                    </div>

                    {/* Blog Hero Image filled into the empty space */}
                    {post.image && (
                        <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-md relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* ADSENSE AD SLOT — Top of Article */}
                    <div id="ad-slot-top" className="my-6 text-center">
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-5604436069422278"
                            data-ad-slot="auto"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        />
                    </div>

                    <article className="prose lg:prose-xl max-w-none bg-white p-6 md:p-12 rounded-2xl shadow-sm prose-headings:text-primary prose-headings:font-headline prose-p:leading-relaxed prose-a:text-secondary prose-a:font-semibold hover:prose-a:text-primary prose-table:border prose-td:border prose-td:px-4 prose-td:py-3 prose-th:border prose-th:px-4 prose-th:py-3 prose-th:bg-muted/50">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* ADSENSE AD SLOT — Bottom of Article */}
                        <div id="ad-slot-bottom" className="my-8 text-center not-prose">
                            <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-5604436069422278"
                                data-ad-slot="auto"
                                data-ad-format="auto"
                                data-full-width-responsive="true"
                            />
                        </div>

                        {/* Updated Author Box - E-A-T Signal for Google */}
                        <div className="mt-12 bg-muted/30 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-muted not-prose">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
                                <span className="text-primary font-bold text-2xl">AKP</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1 text-center sm:text-left">Abhishek Kumar Patel</h3>
                                <p className="text-secondary font-semibold text-sm mb-3 text-center sm:text-left">M.Pharm | Founder, Adarsh Medical Stores</p>
                                <p className="text-muted-foreground text-sm leading-relaxed text-center sm:text-left">
                                    With over 25 years of experience in the pharmaceutical industry, Abhishek is the Secretary of Aushadhi Vikreta Sangh, Garhakota. He is dedicated to providing authentic medical information and genuine healthcare products to Central India.
                                </p>
                            </div>
                        </div>

                        <p className="mt-8 text-xs text-muted-foreground italic border-t pt-6">
                            <strong>Disclaimer:</strong> This article is for informational purposes only and should not be considered medical advice. Always consult with a healthcare professional for any health concerns or before starting a new medication.
                        </p>
                    </article>
                </div>
            </div>
            <Footer />
        </main>
    );
}
