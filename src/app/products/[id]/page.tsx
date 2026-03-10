import { products, getProductUrl } from '@/lib/product-data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) return { title: 'Product Not Found | Adarsh Medical' };

  // Use the canonical URL from the collections structure
  const canonicalUrl = getProductUrl(product);

  return {
    title: `${product.name} | Adarsh Medical`,
    description: `Buy ${product.name} (${product.company}) at wholesale prices. ${product.description.slice(0, 150)}...`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Adarsh Medical`,
      description: product.description,
      images: [product.img],
    }
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
