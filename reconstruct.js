
const fs = require('fs');

const productDataPath = 'd:/aadarsh_medical/aadarsh-medical/src/lib/product-data.ts';
const drReddyPath = 'd:/aadarsh_medical/aadarsh-medical/src/data/products/dr-reddy.ts';

const content = fs.readFileSync(productDataPath, 'utf8');

// Extraction logic based on line markers (approximate but enough to get the text)
function getSection(startMarker, endMarker) {
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker, startIdx);
    if (startIdx === -1 || endIdx === -1) return '';
    return content.substring(startIdx + startMarker.length, endIdx);
}

const standardText = getSection('export const drReddyProducts: Product[] = [', '];');
const leoText = getSection('export const drReddyLeoProducts: Product[] = [', '];');

// Missing products
const missingText = `
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
`;

const combinedText = standardText + ',' + leoText + ',' + missingText;

// Wrap in full file
const finalContent = 'import { Product } from \'../../lib/product-data\';\n\nexport const drReddyProducts: Product[] = [\n' + combinedText + '\n];\n';

fs.writeFileSync(drReddyPath, finalContent);
console.log("SUCCESS: Reconstructed dr-reddy.ts with all data.");
