import { Metadata } from 'next';
import { BankDetailsContent } from './BankDetailsClient';

export const metadata: Metadata = {
    title: 'Bank Details for Payments | Adarsh Medical Store — SBI Account Info',
    description: 'Official bank account details for Adarsh Medical Store, Garhakota. Make secure payments via NEFT, RTGS, or UPI to our verified State Bank of India account. GST registered dealer.',
    keywords: ['adarsh medical bank details', 'pharmacy payment sagar', 'medicine wholesale payment'],
    alternates: {
        canonical: 'https://ad2025.in/bank-details/',
    },
    openGraph: {
        title: 'Bank Details | Adarsh Medical Store',
        description: 'Official SBI bank account information for wholesale and retail payments to Adarsh Medical Store.',
    },
};

export default function BankDetailsPage() {
    return <BankDetailsContent />;
}
