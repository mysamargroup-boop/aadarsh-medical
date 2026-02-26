export interface Product {
  id: string;
  name: string;
  company: string;
  cat: string;
  price: number;
  img: string;
  rx: boolean;
  molecules: string;
  packing: string;
  format: 'Tablets' | 'Suspension' | 'Injection' | 'Other';
  description: string;
  type?: 'Popular' | 'Focus';
}

export const products: Product[] = [
  {
    id: "dr-reddy-1",
    name: "Cefiwok CV",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 320.50,
    img: "https://picsum.photos/seed/dr1/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefixime 200 mg + Clavulanic acid 125 mg",
    packing: "10x1x10's",
    description: "Cefiwok CV is a potent combination antibiotic. Cefixime belongs to the cephalosporin group and works by inhibiting bacterial cell wall synthesis. Clavulanic acid is a beta-lactamase inhibitor that prevents bacteria from destroying Cefixime, making it highly effective against resistant bacterial strains."
  },
  {
    id: "dr-reddy-2",
    name: "Cefiwok-O Tablets",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 192.50,
    img: "https://picsum.photos/seed/dr2/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefixime 200mg + Ofloxacin 200mg",
    packing: "10x10's",
    description: "A dual-action antibiotic combining Cefixime (Cephalosporin) and Ofloxacin (Fluoroquinolone). This combination provides a broad spectrum of activity against both aerobic and anaerobic bacteria, commonly used for complicated respiratory and urinary tract infections."
  },
  {
    id: "dr-reddy-3",
    name: "Fluerma 150",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 13.40,
    img: "https://picsum.photos/seed/dr3/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Fluconazole 150mg",
    packing: "50X1X1",
    description: "Fluerma 150 contains Fluconazole, a powerful antifungal medication. It works by stopping the growth of certain types of fungus and is used to treat a variety of fungal and yeast infections."
  },
  {
    id: "dr-reddy-4",
    name: "Norilet OZ Tablets",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 107.80,
    img: "https://picsum.photos/seed/dr4/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Ofloxacin 200mg + Ornidazole 500mg",
    packing: "20x10's",
    description: "A combination medicine used to treat gastrointestinal infections such as acute diarrhea or dysentery. Ofloxacin kills bacteria while Ornidazole kills amoeba and other infectious microorganisms."
  },
  {
    id: "dr-reddy-5",
    name: "ORO-CV Tablets",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 208.36,
    img: "https://picsum.photos/seed/dr5/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Amoxycillin 500mg + Clavulanic Acid 125mg",
    packing: "10x1x10's",
    description: "A gold-standard antibiotic combination. Amoxycillin is a broad-spectrum penicillin, and Clavulanic Acid protects it from being broken down by bacterial enzymes, ensuring efficacy against a wide range of common infections."
  },
  {
    id: "dr-reddy-6",
    name: "Podoxim 200 Tablets",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 208.50,
    img: "https://picsum.photos/seed/dr6/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefpodoxime Tablets 200mg",
    packing: "10x10's",
    description: "Podoxim 200 contains Cefpodoxime, a third-generation cephalosporin antibiotic. It is highly effective against a variety of bacterial infections, including those of the respiratory tract, urinary tract, and skin."
  },
  {
    id: "dr-reddy-7",
    name: "Podoxim CV DS",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 135.00,
    img: "https://picsum.photos/seed/dr7/600/600",
    rx: true,
    format: "Suspension",
    molecules: "Cefpodoxime 50mg + Clavulanic acid 31.25mg",
    packing: "8x1x30 ml",
    description: "A pediatric dry suspension combining Cefpodoxime and Clavulanic Acid. This formulation provides enhanced stability and efficacy for treating moderate to severe bacterial infections in children."
  },
  {
    id: "dr-reddy-8",
    name: "Podoxim DS 100 (Glass)",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 174.75,
    img: "https://picsum.photos/seed/dr8/600/600",
    rx: true,
    format: "Suspension",
    molecules: "Cefpodoxime 100mg/5ml",
    packing: "3 X 4 X 2 X 1",
    description: "High-strength Cefpodoxime oral suspension in a premium glass bottle for better stability. Used for treating various bacterial infections in children where a 100mg/5ml concentration is required."
  },
  {
    id: "dr-reddy-10",
    name: "Podoxim-Cv 200 Tablets",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 396.00,
    img: "https://picsum.photos/seed/dr10/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefpodoxime proxetil 200mg + Clavulanic Acid 125mg",
    packing: "10X1X10's",
    description: "A powerful combination of Cefpodoxime Proxetil and Clavulanic Acid. This medication is used for treating more resistant bacterial infections of the lungs, throat, and urinary tract."
  },
  {
    id: "dr-reddy-13",
    name: "Powercef Injection",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 71.01,
    img: "https://picsum.photos/seed/dr13/600/600",
    rx: true,
    format: "Injection",
    molecules: "Ceftriaxone 1g with WFI",
    packing: "20x1x1's",
    description: "Powercef (Ceftriaxone) is a broad-spectrum injectable antibiotic used for serious infections like meningitis, sepsis, and surgical prophylaxis. Supplied with Sterile Water for Injection."
  },
  {
    id: "dr-reddy-14",
    name: "Powercef T",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 224.95,
    img: "https://picsum.photos/seed/dr14/600/600",
    rx: true,
    format: "Injection",
    molecules: "Ceftriaxone + Tazobactam",
    packing: "25 X 1",
    description: "A combination of Ceftriaxone and Tazobactam. Tazobactam is a beta-lactamase inhibitor that extends the spectrum of Ceftriaxone to include many beta-lactamase-producing bacteria."
  },
  {
    id: "dr-reddy-15",
    name: "Powercef-S Injection",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 202.50,
    img: "https://picsum.photos/seed/dr15/600/600",
    rx: true,
    format: "Injection",
    molecules: "Ceftriaxone & Sulbactam 1.5g",
    packing: "10x1x1's",
    description: "A premium injectable combination of Ceftriaxone and Sulbactam. Used for severe hospital-acquired infections and cases where resistance to single-agent antibiotics is suspected."
  },
  {
    id: "dr-reddy-16",
    name: "Tricefuro 250",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 302.15,
    img: "https://picsum.photos/seed/dr16/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefuroxime Axetil 250mg",
    packing: "10 X 1 X 10",
    description: "Tricefuro contains Cefuroxime Axetil, a second-generation cephalosporin. It is highly effective against respiratory tract infections, sinus infections, and skin infections."
  },
  {
    id: "dr-reddy-17",
    name: "Tricefuro 500",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 586.04,
    img: "https://picsum.photos/seed/dr17/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefuroxime Axetil 500mg",
    packing: "10 X 1 X 10",
    description: "Double strength Cefuroxime Axetil for more severe or chronic bacterial infections. Ensures high peak plasma concentrations for effective bacterial eradication."
  },
  {
    id: "dr-reddy-18",
    name: "Tricefuro CV",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 650.50,
    img: "https://picsum.photos/seed/dr18/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Cefuroxime Axetil + Clavulanic Acid",
    packing: "10X1X10",
    description: "Advanced combination of Cefuroxime and Clavulanic Acid. This combination overcomes bacterial resistance, providing a reliable treatment option for complex infections."
  },
  {
    id: "dr-reddy-19",
    name: "Fapenro 200",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 660.00,
    img: "https://picsum.photos/seed/dr19/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Faropenem 200mg",
    packing: "10 X 1 X 6",
    description: "Fapenro 200 contains Faropenem, a unique penem antibiotic. It has a broad spectrum of activity and is often used for severe respiratory and skin infections that do not respond to other antibiotics."
  },
  {
    id: "dr-reddy-20",
    name: "Fapenro ER 300",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 830.00,
    img: "https://picsum.photos/seed/dr20/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Faropenem 300mg Extended Release",
    packing: "10 X 1 X 6",
    description: "Extended-release Faropenem for sustained therapeutic levels and improved patient compliance. Ideal for once-daily dosing in chronic or severe bacterial infections."
  },
  {
    id: "dr-reddy-21",
    name: "Rifinimx 200",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 251.50,
    img: "https://picsum.photos/seed/dr21/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Rifaximin 200mg",
    packing: "10 X 1 X 10",
    description: "Rifinimx 200 contains Rifaximin, a non-absorbable antibiotic. It acts locally in the gastrointestinal tract and is used to treat traveler's diarrhea and irritable bowel syndrome."
  },
  {
    id: "dr-reddy-22",
    name: "Rifinimx 400",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 520.25,
    img: "https://picsum.photos/seed/dr22/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Rifaximin 400mg",
    packing: "10 X 1 X 10",
    description: "Standard dose Rifaximin for the prevention of hepatic encephalopathy recurrence and treatment of small intestinal bacterial overgrowth (SIBO)."
  },
  {
    id: "dr-reddy-23",
    name: "Rifinimx 550",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 602.25,
    img: "https://picsum.photos/seed/dr23/600/600",
    rx: true,
    format: "Tablets",
    molecules: "Rifaximin 550mg",
    packing: "10 X 1 X 10",
    description: "High-dose Rifaximin specifically indicated for the reduction in risk of overt hepatic encephalopathy recurrence in adults."
  },
  {
    id: "dr-reddy-24",
    name: "Tri-Cefuro Inj",
    company: "Dr. Reddy's",
    cat: "Pharmaceuticals",
    price: 386.02,
    img: "https://picsum.photos/seed/dr24/600/600",
    rx: true,
    format: "Injection",
    molecules: "Cefuroxime 1500mg with WFI",
    packing: "8 X 1 X 1",
    description: "Injectable Cefuroxime (1.5g) for intensive care settings. Provides broad-spectrum coverage against many Gram-positive and Gram-negative organisms."
  }
];
