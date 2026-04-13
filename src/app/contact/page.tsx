import { Metadata } from 'next';
import { ContactContent } from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Adarsh Medical Store Garhakota — Phone, WhatsApp, Email',
    description: 'Contact Adarsh Medical Store, Garhakota, Sagar MP. Call +91 9630080706, WhatsApp for medicine orders, or visit our store at Ghanta Ghar, Jagdish Ward. Open Mon-Sat 10AM-8:30PM.',
    keywords: ['contact adarsh medical', 'medical store phone number garhakota', 'medicine delivery garhakota', 'pharmacy contact sagar MP'],
    alternates: {
        canonical: 'https://ad2025.in/contact/',
    },
    openGraph: {
        title: 'Contact Adarsh Medical Store | Garhakota, Sagar MP',
        description: 'Call +91 9630080706 or WhatsApp for medicine orders. Visit: Ghanta Ghar, Jagdish Ward, Garhakota.',
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
