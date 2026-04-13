import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ad2025.in';

    // Blog slugs — UPDATE this list when adding new blogs
    const blogSlugs = [
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
        'rahatgarh', 'rehli', 'banda', 'chhatarpur'
    ];

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

    // Add individual blog post URLs for Google to crawl
    blogSlugs.forEach(slug => {
        routes.push({
            url: `${baseUrl}/blogs/${slug}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    // Add Wholesale City SEO Pages for Google to crawl
    wholesaleCities.forEach(city => {
        routes.push({
            url: `${baseUrl}/wholesale/${city}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7, // Higher priority for B2B local landing pages
        });
    });

    return routes;
}
