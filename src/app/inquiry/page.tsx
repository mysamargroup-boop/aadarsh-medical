import { Metadata } from 'next';
import { InquiryContent } from './InquiryClient';

export const metadata: Metadata = {
    title: 'Wholesale Inquiry | Adarsh Medical Store — Bulk Medicine Orders Garhakota',
    description: 'Submit a wholesale inquiry to Adarsh Medical Store, Garhakota. Authorized distributor for 29+ pharma brands. Bulk orders for hospitals, clinics, and retailers in Sagar MP and Central India.',
    keywords: ['wholesale medicines inquiry', 'bulk medicine order garhakota', 'pharma distributor inquiry sagar MP', 'hospital medicine supply'],
    alternates: {
        canonical: 'https://ad2025.in/inquiry/',
    },
    openGraph: {
        title: 'Wholesale Medicine Inquiry | Adarsh Medical Store',
        description: 'Partner with us for reliable pharmaceutical distribution. 29+ brands, competitive pricing, prompt delivery across Central India.',
    },
};

export default function InquiryPage() {
    return <InquiryContent />;
}
