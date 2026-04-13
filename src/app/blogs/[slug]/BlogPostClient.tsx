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
                <div className="pt-24 md:pt-32 pb-20">
                    <div className="max-w-5xl mx-auto px-4 md:px-8">
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-3/4 mb-8" />
                        <Skeleton className="h-4 w-1/4 mb-12" />
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
            <div className="pt-36 md:pt-48 pb-20">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
                        <ChevronRight size={14} />
                        <span className="text-primary font-bold truncate max-w-[200px]">{post.title}</span>
                    </nav>

                    {/* ADSENSE AD SLOT — Top of Article
                         This displays a responsive ad unit below the title */}
                    <div id="ad-slot-top" className="my-4 text-center">
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-5604436069422278"
                            data-ad-slot="auto"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        />
                    </div>

                    <article className="prose lg:prose-xl max-w-none bg-white p-8 md:p-12 rounded-xl shadow-sm prose-headings:text-primary prose-p:leading-loose prose-a:text-secondary prose-a:font-semibold hover:prose-a:text-primary prose-table:border prose-td:border prose-td:px-4 prose-td:py-2 prose-th:border prose-th:px-4 prose-th:py-2 prose-th:bg-muted/50">
                        <h1>{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground not-prose mb-6">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                            {post.readTime && <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* ADSENSE AD SLOT — Bottom of Article */}
                        <div id="ad-slot-bottom" className="my-6 text-center not-prose">
                            <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-5604436069422278"
                                data-ad-slot="auto"
                                data-ad-format="auto"
                                data-full-width-responsive="true"
                            />
                        </div>

                        <p className="mt-8 text-sm text-muted-foreground italic"><strong>Disclaimer:</strong> This article is for informational purposes only and should not be considered medical advice. Always consult with a healthcare professional for any health concerns or before starting a new medication.</p>
                    </article>
                </div>
            </div>
            <Footer />
        </main>
    );
}
