import { products, getProductUrl } from '@/lib/product-data';
import CollectionDetailClient from './CollectionDetailClient';

export function generateStaticParams() {
  return products.map((product) => {
    const url = getProductUrl(product);
    // url format: /collections/{catSlug}/{subCatSlug}/{productSlug}-{id}
    const slug = url.replace('/collections/', '').split('/');
    return { slug };
  });
}

export default function ProductDetailPage() {
  return <CollectionDetailClient />;
}
