import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Health Blog | Adarsh Medical Store — Medicine Guides, Health Tips & Expert Advice',
    description: 'Read expert health articles from Adarsh Medical Store, Garhakota. Guides on acidity, diabetes, blood pressure, pain relief, antibiotics, vitamins, monsoon health, and first aid. Written by M.Pharm qualified pharmacist.',
    keywords: [
        'health blog', 'medicine guide', 'pharmacy blog garhakota', 'health tips india',
        'acidity medicine guide', 'diabetes management', 'blood pressure medicines',
        'pain relief guide', 'vitamin D deficiency', 'monsoon diseases india',
        'first aid kit medicines', 'antibiotic resistance', 'Adarsh Medical blog'
    ],
    alternates: {
        canonical: 'https://ad2025.in/blogs/',
    },
    openGraph: {
        title: 'Health Blog | Adarsh Medical Store',
        description: 'Expert health guides and medicine information from a trusted pharmacist with 25+ years experience. Garhakota, Sagar MP.',
        url: 'https://ad2025.in/blogs/',
    },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
