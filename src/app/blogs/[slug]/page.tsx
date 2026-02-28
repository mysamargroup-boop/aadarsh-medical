import BlogPostClient from './BlogPostClient';

// All blog slugs from public/blogs.json
// These must be listed for Next.js static export
export function generateStaticParams() {
  return [
    { slug: 'understanding-common-medications' },
    { slug: 'the-importance-of-medication-adherence' },
    { slug: 'managing-side-effects-of-medication' },
  ];
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
