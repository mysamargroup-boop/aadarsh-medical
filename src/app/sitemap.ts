import { MetadataRoute } from 'next';
import { products } from '@/lib/product-data';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ad2025.in';

    // Base routes
    const routes = ['', '/shop', '/about', '/contact', '/bank-details', '/inquiry'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Unique categories for sitemap
    // Safely get categories, filtering out any undefined/null
    const categories = Array.from(new Set(
        (products || [])
            .filter(p => p && (p.cat || p.primaryCategory))
            .map(p => p.cat || p.primaryCategory || '')
    )).filter(cat => cat.length > 0);

    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/shop?cat=${encodeURIComponent(cat)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Product detail pages
    const productRoutes = (products || []).map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...routes, ...categoryRoutes, ...productRoutes];
}
