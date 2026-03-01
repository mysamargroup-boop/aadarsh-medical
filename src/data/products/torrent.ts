import { Product } from '@/lib/product-data';

export const torrentProducts: Product[] = [
    {
        id: 'torrent-1',
        name: 'ACYCLOSURE P',
        company: 'Torrent Pharma',
        price: 64.80,
        img: '/products/generic-aid.jpg', // Fallback
        rx: true,
        molecules: 'Aceclofenac 100mg + Paracetamol 325mg',
        packing: "Strip of 10's",
        format: 'Tablets',
        description: 'Aceclofenac & Paracetamol Tablets',
        cat: 'Medicines',
        subCat: 'Analgesics',
        primaryCategory: 'Prescription Medicines',
    },
    {
        id: 'torrent-2',
        name: 'ALLERFEX M',
        company: 'Torrent Pharma',
        price: 127.50,
        img: '/products/generic-aid.jpg', // Fallback
        rx: true,
        molecules: 'Fexofenadine 120mg + Montelukast 10mg',
        packing: "Strip of 10's",
        format: 'Tablets',
        description: 'Fexofenadine Hydrochloride & Montelukast Tablets',
        cat: 'Medicines',
        subCat: 'Anti-Allergics',
        primaryCategory: 'Prescription Medicines',
    },
    {
        id: 'torrent-3',
        name: 'AMPOXIN CV 375',
        company: 'Torrent Pharma',
        price: 206.40,
        img: '/products/generic-aid.jpg', // Fallback
        rx: true,
        molecules: 'Amoxycillin 250 mg + Potassium Clav 125 mg',
        packing: "Strip of 10's",
        format: 'Tablets',
        description: 'Amoxycillin And Potassium Clavulanate Tablets I.P.',
        cat: 'Medicines',
        subCat: 'Antibiotics',
        primaryCategory: 'Prescription Medicines',
    }
];
