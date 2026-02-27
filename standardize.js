
const fs = require('fs');

const drReddyPath = 'd:/aadarsh_medical/aadarsh-medical/src/data/products/dr-reddy.ts';

// Helper to sanitize price and handle strings with 'Rs.'
const sanitizePrice = (p) => {
    if (typeof p === 'number') return p;
    if (typeof p === 'string') {
        const match = p.replace(/,/g, '').match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    }
    return 0;
};

// Mapping for Taxonomy
const categoryMapping = {
    "Cardiac": { primary: "Prescription Medicines (Rx)", conditions: ["Cardiac (Heart) Care"] },
    "Anti-Infective": { primary: "Prescription Medicines (Rx)", conditions: ["Infections"] },
    "CNS": { primary: "Prescription Medicines (Rx)", conditions: ["Pain Relief"] },
    "Gastrointestinal": { primary: "Over-The-Counter (OTC)", conditions: ["Stomach Care (Acidity/Digestion)"] },
    "Dermatology": { primary: "Prescription Medicines (Rx)", conditions: ["Skin Care"] },
    "Pain & Analgesics": { primary: "Over-The-Counter (OTC)", conditions: ["Pain Relief"] },
    "Respiratory": { primary: "Over-The-Counter (OTC)", conditions: ["Cough, Cold & Flu"] },
    "VMS": { primary: "Vitamins & Supplements", conditions: [] },
    "Wellness": { primary: "Vitamins & Supplements", conditions: [] },
    "Ortho": { primary: "Prescription Medicines (Rx)", conditions: ["Pain Relief"] },
    "Gynecology": { primary: "Prescription Medicines (Rx)", conditions: ["Women's Care"] },
    "Medical Devices & Equipment": { primary: "Medical Devices & Equipments", conditions: [] },
    "OTC & Healthcare": { primary: "Over-The-Counter (OTC)", conditions: [] }
};

// Simple parser for the specific format we generated
function parseProducts(content) {
    // This is risky with regex but our format is very consistent from the previous write
    const productBlocks = content.match(/\{[\s\S]*?\},?\s*(?=\{|\s*\])/g) || [];
    const products = productBlocks.map(block => {
        const obj = {};
        const lines = block.split('\n');
        lines.forEach(line => {
            const match = line.match(/^\s*(\w+):\s*(.*?),?$/);
            if (match) {
                let [_, key, value] = match;
                value = value.trim();
                // Basic type conversion
                if (value.startsWith('"') || value.startsWith("'")) value = value.slice(1, -1);
                else if (value === 'true') value = true;
                else if (value === 'false') value = false;
                else if (!isNaN(value)) value = Number(value);
                else if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                }
                obj[key] = value;
            }
        });
        return obj;
    });
    return products;
}

const content = fs.readFileSync(drReddyPath, 'utf8');
let products = parseProducts(content);

console.log(`Initial count: ${products.length}`);

// Deduplicate by name
const uniqueProducts = [];
const seenNames = new Set();

products.forEach(p => {
    if (!p.name) return;
    const normalizedName = p.name.trim().toLowerCase();
    if (!seenNames.has(normalizedName)) {
        seenNames.add(normalizedName);

        // Apply Standardizations
        if (p.subCat && categoryMapping[p.subCat]) {
            p.primaryCategory = categoryMapping[p.subCat].primary;
            if (!p.healthConditions || p.healthConditions.length === 0) {
                p.healthConditions = categoryMapping[p.subCat].conditions;
            }
        }

        // Fix Rx flag based on primaryCategory
        if (p.primaryCategory === "Prescription Medicines (Rx)") {
            p.rx = true;
        }

        uniqueProducts.push(p);
    }
});

console.log(`Unique count: ${uniqueProducts.length}`);

// Sort by subCat then name
uniqueProducts.sort((a, b) => {
    if (a.subCat < b.subCat) return -1;
    if (a.subCat > b.subCat) return 1;
    return a.name.localeCompare(b.name);
});

// Write it back
const finalCode = `import { Product } from '../../lib/product-data';

export const drReddyProducts: Product[] = ${JSON.stringify(uniqueProducts, null, 4)};
`;

fs.writeFileSync(drReddyPath, finalCode);
console.log("SUCCESS: Deduplicated and standardized dr-reddy.ts");
