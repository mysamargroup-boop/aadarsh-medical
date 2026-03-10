import { Metadata } from 'next';
import { InquiryContent } from './InquiryClient';

export const metadata: Metadata = {
    title: 'Wholesale Inquiry | Adarsh Medical Store',
    description: 'Partner with Adarsh Medical for reliable pharmaceutical distribution. Fill out our inquiry form for bulk medicine requirements.',
    alternates: {
        canonical: 'https://ad2025.in/inquiry',
    },
};

export default function InquiryPage() {
    return <InquiryContent />;
}
