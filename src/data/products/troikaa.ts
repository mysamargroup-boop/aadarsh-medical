import { Product } from '@/lib/product-data';

export const troikaaProducts: Product[] = [
    {
        id: "troikaa-1",
        name: "Levotroy I.V.",
        company: "Troikaa",
        price: 200,
        img: "/products/generic-aid.jpg", // Setting fallback image
        rx: true,
        molecules: "Levofloxacin Hemihydrate 500mg, Dextrose 5.0% W/v",
        sizes: "100 ml",
        packing: "100 ml bottle",
        format: "Liquid",
        description: "Levofloxacin infusion for severe bacterial infections.",
        cat: "Pharmaceuticals",
        subCat: "Anti-Infectives",
        primaryCategory: "Prescription Medicines"
    },
    {
        id: "troikaa-2",
        name: "Chymotroy Forte",
        company: "Troikaa",
        price: 4000,
        img: "/products/generic-aid.jpg", // Setting fallback image
        rx: true,
        molecules: "1,00,000 Armour units of enzymatic activity (Trypsin & chymotrypsin 6:1)",
        sizes: "10x20 Tablets",
        packing: "10 blisters of 20 tablets",
        format: "Tablets",
        description: "Enzyme supplement containing Trypsin and Chymotrypsin.",
        cat: "Pharmaceuticals",
        subCat: "Pain & Inflammation",
        primaryCategory: "Prescription Medicines"
    },
    {
        id: "troikaa-3",
        name: "Amitroy 500",
        company: "Troikaa",
        price: 99,
        img: "/products/generic-aid.jpg", // Setting fallback image
        rx: true,
        molecules: "Amikacin Sulphate 500 mg",
        sizes: "2 ml",
        packing: "1 vial in monocarton",
        format: "Injection",
        description: "Amikacin Sulphate injection for bacterial infections.",
        cat: "Pharmaceuticals",
        subCat: "Anti-Infectives",
        primaryCategory: "Prescription Medicines"
    }
];
