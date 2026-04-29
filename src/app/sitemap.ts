import { MetadataRoute } from 'next';
import { products, getProductUrl, getCategorySlug, getCategoryUrl } from '@/lib/product-data';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ad2025.in';

    // Blog slugs — UPDATE this list when adding new blogs
    const blogSlugs = [
        'monsoon-diseases-prevention-medicines-india-guide',
        'first-aid-kit-medicines-indian-household-guide',
        'antibiotic-resistance-india-safe-use-guide',
        'calcium-iron-deficiency-women-india-supplements-guide',
        'complete-guide-to-acidity-medicines-omeprazole-pantoprazole',
        'cefixime-antibiotic-complete-guide-uses-dosage-side-effects',
        'diabetes-management-metformin-glimepiride-complete-guide',
        'antifungal-creams-guide-clotrimazole-ketoconazole-skin-infections',
        'ors-oral-rehydration-solution-guide-dehydration-treatment',
        'blood-pressure-medications-guide-amlodipine-telmisartan',
        'pain-relief-medicines-guide-paracetamol-ibuprofen-diclofenac',
        'vitamin-d-deficiency-symptoms-treatment-supplements-guide',
    ];

    const wholesaleCities = [
        'sagar', 'damoh', 'bina', 'khurai', 
        'rahatgarh', 'rehli', 'banda', 'chhatarpur', 'garhakota'
    ];

    // Static routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/products/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/shop/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/brands/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/bank-details/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/inquiry/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // Add individual blog post URLs
    blogSlugs.forEach(slug => {
        routes.push({
            url: `${baseUrl}/blogs/${slug}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    // Add Wholesale City SEO Pages
    wholesaleCities.forEach(city => {
        routes.push({
            url: `${baseUrl}/wholesale/${city}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        });
    });

    // Add Categories
    const categories = Array.from(new Set(products.map(p => p.cat)));
    categories.forEach(cat => {
        routes.push({
            url: `${baseUrl}${getCategoryUrl(cat)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        });
    });

    // Add ALL Products (The big one for indexing)
    products.forEach(product => {
        routes.push({
            url: `${baseUrl}${getProductUrl(product)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    return routes;
}
