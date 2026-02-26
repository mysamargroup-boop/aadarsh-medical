'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blogs.json')
      .then(response => response.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      <div className="pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">Blogs</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-10">Our Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-full flex flex-col">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              blogPosts.map(post => (
                <Link href={`/blogs/${post.slug}`} key={post.slug}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg leading-snug text-primary group-hover:text-secondary transition-colors">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-muted-foreground text-sm mb-6">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1 text-primary font-bold">Read More <ArrowRight size={14} /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
