import BlogPostClient from './BlogPostClient';

// All blog slugs from public/blogs.json
// These must be listed for Next.js static export
// UPDATE THIS LIST whenever you add a new blog post to blogs.json
export function generateStaticParams() {
  return [
    { slug: 'monsoon-diseases-prevention-medicines-india-guide' },
    { slug: 'first-aid-kit-medicines-indian-household-guide' },
    { slug: 'antibiotic-resistance-india-safe-use-guide' },
    { slug: 'calcium-iron-deficiency-women-india-supplements-guide' },
    { slug: 'complete-guide-to-acidity-medicines-omeprazole-pantoprazole' },
    { slug: 'cefixime-antibiotic-complete-guide-uses-dosage-side-effects' },
    { slug: 'diabetes-management-metformin-glimepiride-complete-guide' },
    { slug: 'antifungal-creams-guide-clotrimazole-ketoconazole-skin-infections' },
    { slug: 'ors-oral-rehydration-solution-guide-dehydration-treatment' },
    { slug: 'blood-pressure-medications-guide-amlodipine-telmisartan' },
    { slug: 'pain-relief-medicines-guide-paracetamol-ibuprofen-diclofenac' },
    { slug: 'vitamin-d-deficiency-symptoms-treatment-supplements-guide' },
  ];
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
