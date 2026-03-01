import { Product } from '@/lib/product-data';

export const laborateProducts: Product[] = [
    {
        id: 'laborate-1',
        name: 'LABDIC RELIEF TABLETS',
        company: 'Laborate',
        price: 0, // Not provided
        img: '/products/generic-aid.jpg', // Fallback
        rx: true,
        molecules: 'Diclofenac 50mg + Paracetamol 325mg + Cetirizine 5 mg + Magnesium Trisilicate 100 mg',
        packing: '50x10 Tablets',
        format: 'Tablets',
        description: 'Used to treat common cold symptoms, Headache, Body Ache, Fever, Toothache and any other types of Pain full conditions',
        cat: 'Pharmaceuticals',
        subCat: 'Pain & Inflammation',
        primaryCategory: 'Prescription Medicines',
    },
    {
        id: 'laborate-2',
        name: 'LABDIC RELIEF (Gel)',
        company: 'Laborate',
        price: 0, // Not provided
        img: '/products/generic-aid.jpg', // Fallback
        rx: false,
        molecules: 'Diclofenac Diethylamine 1.16%w/w Eq. to Diclofenac 1 % w/w + Linseed Oil 3% + Methyl Salicylate 8% w/w + Menthol 2%w/w',
        sizes: '10gm, 30gm',
        packing: 'Tube',
        format: 'Gel',
        description: 'Pain relief gel which provides effective relief from muscle pain, strains, sprains, spasms and cramps',
        cat: 'OTC & Healthcare',
        subCat: 'Pain Relief',
        primaryCategory: 'OTC',
    },
    {
        id: 'laborate-3',
        name: 'LABDIC RELIEF Balm',
        company: 'Laborate',
        price: 0, // Not provided
        img: '/products/generic-aid.jpg', // Fallback
        rx: false,
        material: 'Balm', // Or molecules, but material fits balm better if no specific molecules are given
        sizes: '25g',
        packing: 'Jar',
        format: 'Ointment',
        description: 'Cold, Flu, Headache, Migrane, Muscle and bone aches',
        cat: 'OTC & Healthcare',
        subCat: 'Pain Relief',
        primaryCategory: 'OTC',
    }
];
