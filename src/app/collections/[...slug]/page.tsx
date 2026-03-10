import { products, getProductUrl } from '@/lib/product-data';
import CollectionDetailClient from './CollectionDetailClient';
import { Metadata } from 'next';

export function generateStaticParams() {
  return products.map((product) => {
    const url = getProductUrl(product);
    // url format: /collections/{catSlug}/{subCatSlug}/{productSlug}-{id}
    const slug = url.replace('/collections/', '').split('/');
    return { slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const url = `/collections/${slug.join('/')}/`;
  const productId = slug[slug.length - 1].split('-').pop();
  const product = products.find(p => p.id === productId);

  if (!product) return { title: 'Product Not Found | Adarsh Medical' };

  return {
    title: `${product.name} | Adarsh Medical`,
    description: `Buy ${product.name} (${product.company}) at wholesale prices. ${product.description.slice(0, 150)}...`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | Adarsh Medical`,
      description: product.description,
      images: [product.img],
    }
  };
}

export default function ProductDetailPage() {
  return <CollectionDetailClient />;
}
