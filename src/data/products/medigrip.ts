import { Product } from '@/lib/product-data';

export const medigripProducts: Product[] = [
    {
        id: 'medigrip-1',
        name: 'PreciDress™ T-Ag Transparent Film Adhesive Dressing With Silver Pad',
        company: 'Medigrip',
        price: 0,
        img: '/products/generic-aid.jpg', // Fallback
        rx: false,
        material: 'Silver Pad',
        packing: 'Box',
        format: 'Aid',
        description: 'PreciDress™ T-Ag Transparent Film Adhesive Dressing (with Silver Pad) is a sterile, hypoallergenic, conformable, post-operative surgical dressing with a central absorbent and non-adherent pad. The non-adherent pad helps in moist wound healing and painless dressing removal. Added silver ions (Ag+) provide enhanced anti-bacterial protection. This dressing is breathable, waterproof, low maintenance, and acts as a bacteria and viral barrier, protecting against infections.',
        cat: 'Surgical Dressings',
        subCat: 'Adhesive Dressings',
        primaryCategory: 'Medical Devices & Equipments',
    },
    {
        id: 'medigrip-2',
        name: 'Medigrip Non-Woven Adhesive Dressing (Non-Woven Island Dressing)',
        company: 'Medigrip',
        price: 0,
        img: '/products/generic-aid.jpg', // Fallback
        rx: false,
        material: 'Non-Woven Fabric',
        packing: 'Box',
        format: 'Aid',
        description: 'Non-woven Adhesive Dressing is a sterile, hypoallergenic, post-operative, conformable adhesive dressing. It has a breathable soft cloth backing with a central non-adherent absorbent pad. It is an all-in-one, sterile, cost-effective dressing that conforms well to body contours.',
        cat: 'Surgical Dressings',
        subCat: 'Adhesive Dressings',
        primaryCategory: 'Medical Devices & Equipments',
    }
];
