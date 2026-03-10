import { Metadata } from 'next';
import { ContactContent } from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Adarsh Medical Store',
    description: 'Get in touch with Adarsh Medical Store. Have questions about our products or need assistance? Our team is here to help you.',
    alternates: {
        canonical: 'https://ad2025.in/contact',
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
