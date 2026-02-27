
const fs = require('fs');
const path = require('path');

const drReddyPath = 'd:/aadarsh_medical/aadarsh-medical/src/data/products/dr-reddy.ts';
const productDataPath = 'd:/aadarsh_medical/aadarsh-medical/src/lib/product-data.ts';

function extractProducts(filePath, arrayName) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');

    // Look for the array start after the variable declaration
    const regex = new RegExp(`(?:const|let|var)\\s+${arrayName}\\s*:\\s*Product\\[\\]\\s*=\\s*\\[`, 'g');
    let match = regex.exec(content);
    if (!match) {
        const simpleRegex = new RegExp(`(?:const|let|var)\\s+${arrayName}\\s*=\\s*\\[`, 'g');
        match = simpleRegex.exec(content);
    }

    if (!match) return [];

    let bracketCount = 1;
    let i = match.index + match[0].length;
    let productsText = '';
    while (bracketCount > 0 && i < content.length) {
        if (content[i] === '[') bracketCount++;
        if (content[i] === ']') bracketCount--;
        if (bracketCount > 0) productsText += content[i];
        i++;
    }

    try {
        // Strip everything that isn't valid JS object notation for eval
        // This includes comments and trailing commas
        let cleaned = productsText
            .replace(/\/\/.*$/gm, '') // Remove single line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi line comments
            .replace(/,(\s*[\]}])/g, '$1') // Remove trailing commas
            .trim();

        // Wrap in [] and evaluate as JS
        const array = new Function('return [' + cleaned + ']')();
        return array;
    } catch (e) {
        console.error(`Error parsing ${arrayName} in ${filePath}:`, e);
        return [];
    }
}

const drReddyProducts1 = extractProducts(drReddyPath, 'drReddyProducts');
const drReddyProducts2 = extractProducts(productDataPath, 'drReddyProducts');
const drReddyLeoProducts = extractProducts(productDataPath, 'drReddyLeoProducts');

console.log(`Extracted from dr-reddy.ts: ${drReddyProducts1.length}`);
console.log(`Extracted from product-data.ts (standard): ${drReddyProducts2.length}`);
console.log(`Extracted from product-data.ts (leo): ${drReddyLeoProducts.length}`);

// Merge all
let all = [...drReddyProducts1, ...drReddyProducts2, ...drReddyLeoProducts];

// Add the 4 missing ones
all.push(
    {
        name: "Wokadine Dusting Powder",
        company: "Dr. Reddy's (Leo)",
        cat: "Drugs",
        subCat: "Dermatology",
        price: 105.50,
        img: "https://picsum.photos/seed/wokadinepowder/600/600",
        rx: false,
        molecules: "Povidone-Iodine 5% w/w",
        packing: "1x10g",
        format: "Powder",
        description: "Wokadine Dusting Powder is an antiseptic and disinfectant agent primarily used to prevent and treat various skin infections in minor burns, cuts, and abrasions.",
        usage: "Clean the affected area and sprinkle a sufficient amount of powder 1-3 times daily. Wash hands before and after application.",
        benefits: "Provides broad-spectrum antimicrobial action, killing bacteria, fungi, and viruses while maintaining a clean environment for wound healing.",
        sideEffects: "Skin irritation, redness, or itching at the site of application.",
        storage: "Store below 25°C in a cool, dry place away from sunlight.",
        primaryCategory: "OTC",
        healthConditions: ["Infections", "Skin Care"]
    },
    {
        name: "Wokadine Ointment",
        company: "Dr. Reddy's (Leo)",
        cat: "Drugs",
        subCat: "Dermatology",
        price: 108.60,
        img: "https://picsum.photos/seed/wokadineointment/600/600",
        rx: false,
        molecules: "Povidone-Iodine 5% w/w",
        packing: "1x15g",
        format: "Ointment",
        description: "Wokadine Ointment is a potent antiseptic used for the treatment and prevention of infections in various skin injuries including burns and cuts.",
        usage: "Apply a small amount to the cleaned and dried affected area 1-3 times daily.",
        benefits: "Offers strong antiseptic action against a wide range of microbes, protecting broken skin and promoting faster healing.",
        sideEffects: "Application site reactions like redness, itching, or temporary skin discoloration.",
        storage: "Store below 30°C in a cool, dry place.",
        primaryCategory: "OTC",
        healthConditions: ["Infections", "Skin Care"]
    },
    {
        name: "Supamove Spray",
        company: "Dr. Reddy's (Leo)",
        cat: "Drugs",
        subCat: "Pain & Analgesics",
        price: 236.00,
        img: "https://picsum.photos/seed/supamovespray/600/600",
        rx: false,
        molecules: "Diclofenac Diethylamine (1.16%) + Linseed Oil (3%) + Methyl Salicylate (10%) + Menthol (5%)",
        packing: "1x35g",
        format: "Spray",
        description: "Supamove Spray is a fast-acting topical analgesic for rapid relief from musculoskeletal pain, sprains, and joint stiffness.",
        usage: "Spray from a distance of 5-8 cm on the affected area 3-4 times a day. Do not spray on open wounds.",
        benefits: "Provides a cooling sensation followed by deep pain relief, reducing inflammation and improving mobility.",
        sideEffects: "Occasional skin irritation or redness at the site of application.",
        storage: "Store below 30°C. Protect from heat and direct sunlight.",
        primaryCategory: "OTC",
        healthConditions: ["Pain Relief"]
    },
    {
        name: "Supamove Hot Gel",
        company: "Dr. Reddy's (Leo)",
        cat: "Drugs",
        subCat: "Pain & Analgesics",
        price: 179.53,
        img: "https://picsum.photos/seed/supamovehotgel/600/600",
        rx: false,
        molecules: "Diclofenac + Methyl Salicylate + Menthol + Capsaicin",
        packing: "1x30g",
        format: "Gel",
        description: "Supamove Hot Gel provides targeted warming relief for chronic joint and muscle pain, stiffness, and soft tissue inflammation.",
        usage: "Gently massage onto the affected area 3-4 times daily.",
        benefits: "Triple action relief that reduces inflammation, enhances flexibility, and provides soothing deep-heat comfort.",
        sideEffects: "Temporary redness or burning sensation due to warming agents.",
        storage: "Store in a cool, dry place below 30°C.",
        primaryCategory: "OTC",
        healthConditions: ["Pain Relief"]
    }
);

// Deduplicate
const unique = [];
const seen = new Set();
all.forEach(p => {
    if (!p || !p.name) return;
    const key = `${p.name.trim().toLowerCase()}-${(p.company || 'Dr. Reddy\'s').trim().toLowerCase()}`;
    if (!seen.has(key)) {
        unique.push(p);
        seen.add(key);
    }
});

console.log(`Total Unified Unique Products: ${unique.length}`);

// Mapping for standardization
const subCatToCondition = {
    'Anti-Infectives': ['Infections'],
    'Dermatology': ['Skin Care'],
    'Gastrointestinal': ['Stomach Care'],
    'Gastro Intestinal': ['Stomach Care'],
    'Gynecology': ['Women\'s Care'],
    'Pain & Analgesics': ['Pain Relief'],
    'VMS': ['Vitamins & Supplements'],
    'Respiratory': ['Cough, Cold & Flu', 'Respiratory Care'],
    'Cardiac': ['Cardiac (Heart) Care'],
    'CNS': ['Brain & Mind'],
    'Hygiene': ['Personal Care & Wellness'],
    'Diagnostics': ['Health Screening']
};

unique.forEach(p => {
    p.company = p.company || "Dr. Reddy's";

    // Primary Category
    if (!p.primaryCategory) {
        if (p.rx) p.primaryCategory = 'Prescription Medicines';
        else if (p.cat === 'Medical Devices & Equipment' || p.subCat === 'Diagnostics') p.primaryCategory = 'Medical Devices & Equipments';
        else if (p.cat === 'Personal Care & Wellness' || p.subCat === 'Hygiene') p.primaryCategory = 'Personal Care & Wellness';
        else if (p.subCat === 'VMS' || p.subCat === 'Vitamins & Supplements') p.primaryCategory = 'Vitamins & Supplements';
        else p.primaryCategory = 'OTC';
    }

    // Health Conditions
    if (!p.healthConditions || p.healthConditions.length === 0) {
        p.healthConditions = subCatToCondition[p.subCat] || ['General Wellness'];
    }
});

// Sort
unique.sort((a, b) => {
    const sA = (a.subCat || 'Other').toLowerCase();
    const sB = (b.subCat || 'Other').toLowerCase();
    if (sA < sB) return -1;
    if (sA > sB) return 1;
    return a.name.localeCompare(b.name);
});

// Re-id
unique.forEach((p, i) => {
    p.id = `dr-reddy-${i + 1}`;
});

let out = "import { Product } from '../../lib/product-data';\n\nexport const drReddyProducts: Product[] = [\n";
unique.forEach(p => {
    out += "    {\n";
    const order = ['id', 'name', 'company', 'price', 'img', 'rx', 'molecules', 'packing', 'format', 'description', 'usage', 'benefits', 'sideEffects', 'storage', 'cat', 'subCat', 'primaryCategory', 'healthConditions', 'targetAudience'];
    order.forEach(k => {
        if (p[k] !== undefined) {
            let v = p[k];
            if (typeof v === 'string') v = `"${v.replace(/"/g, '\\"')}"`;
            else if (Array.isArray(v)) v = `[${v.map(item => `"${item.replace(/"/g, '\\"')}"`).join(', ')}]`;
            out += `        ${k}: ${v},\n`;
        }
    });
    out += "    },\n";
});
out += "];\n";

fs.writeFileSync(drReddyPath, out);
console.log("SUCCESS: dr-reddy.ts updated.");
