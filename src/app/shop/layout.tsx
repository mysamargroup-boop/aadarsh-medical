import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop Medicines & Medical Supplies | Adarsh Medical Store',
    description: 'Browse 2500+ medicines, surgical equipment, orthopaedic aids & veterinary supplies from 29+ top pharmaceutical brands. Wholesale & retail pricing available at Adarsh Medical Store, Garhakota.',
    alternates: {
        canonical: 'https://ad2025.in/shop/',
    },
    openGraph: {
        title: 'Shop Pharma Products | Adarsh Medical Store',
        description: 'Browse 2500+ products - medicines, surgical supplies, orthopaedic aids & veterinary products at authorized wholesale prices.',
        url: 'https://ad2025.in/shop/',
        siteName: 'Adarsh Medical',
    },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
