import { Metadata } from 'next';
import { products, getCategorySlug, getCategoryBySlug } from '@/lib/product-data';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  const categories = Array.from(new Set(products.map(p => p.cat)));
  return categories.map(cat => ({
    category: getCategorySlug(cat),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const catName = getCategoryBySlug(category);

  if (!catName) {
    return { title: 'Category Not Found | Adarsh Medical' };
  }

  const productCount = products.filter(p => p.cat === catName).length;

  return {
    title: `${catName} - Buy ${catName} Online | Adarsh Medical Store`,
    description: `Browse ${productCount}+ ${catName} products at Adarsh Medical Store, Garhakota. Authorized distributor of genuine ${catName.toLowerCase()} from top pharmaceutical companies. Wholesale & retail prices available.`,
    alternates: {
      canonical: `https://ad2025.in/shop/${category}/`,
    },
    openGraph: {
      title: `${catName} | Adarsh Medical Store`,
      description: `Browse ${productCount}+ ${catName} products - genuine medicines at authorized wholesale prices.`,
      url: `https://ad2025.in/shop/${category}/`,
      siteName: 'Adarsh Medical',
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const catName = getCategoryBySlug(category);

  if (!catName) {
    redirect('/shop/');
  }

  // Redirect to shop with cat filter for now — the shop page handles the filtering
  redirect(`/shop/?cat=${encodeURIComponent(catName)}`);
}
