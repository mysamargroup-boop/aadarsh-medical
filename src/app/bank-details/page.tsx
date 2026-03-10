import { Metadata } from 'next';
import { BankDetailsContent } from './BankDetailsClient';

export const metadata: Metadata = {
    title: 'Bank Details | Adarsh Medical Store',
    description: 'Official bank account information for payments to Adarsh Medical Store. Find our SBI account details here.',
    alternates: {
        canonical: 'https://ad2025.in/bank-details',
    },
};

export default function BankDetailsPage() {
    return <BankDetailsContent />;
}
