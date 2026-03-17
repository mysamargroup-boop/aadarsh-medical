import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product Categories | Browse by Category | Adarsh Medical Store',
    description: 'Browse medicines by category - Drugs, OTC & Healthcare, Medical Devices, Surgical Supplies, Orthopaedic Aids, Veterinary Medicines & more at Adarsh Medical Store.',
    alternates: {
        canonical: 'https://ad2025.in/categories/',
    },
    openGraph: {
        title: 'Product Categories | Adarsh Medical Store',
        description: 'Browse medicines by category at Adarsh Medical Store, Garhakota.',
        url: 'https://ad2025.in/categories/',
        siteName: 'Adarsh Medical',
    },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
